package handler

import (
	"embed"
	"io/fs"
	"net/http"

	"github.com/ac0d3r/hyuga/internal/config"
	"github.com/ac0d3r/hyuga/internal/db"
	"github.com/ac0d3r/hyuga/internal/oob"
	"github.com/ac0d3r/hyuga/internal/record"
	"github.com/ac0d3r/hyuga/pkg/event"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

type restfulHandler struct {
	db       *db.DB
	cnf      *config.Web
	oob      *config.OOB
	eventbus *event.EventBus
	recorder *record.Recorder
}

var _ Register = (*restfulHandler)(nil)

func NewRESTfulHandler(db *db.DB,
	cnf *config.Web,
	oob *config.OOB,
	eventbus *event.EventBus,
	recorder *record.Recorder) Register {

	return &restfulHandler{
		db:       db,
		cnf:      cnf,
		oob:      oob,
		eventbus: eventbus,
		recorder: recorder,
	}
}

//go:embed dist
var dist embed.FS

type embedFileSystem struct {
	http.FileSystem
}

func (e embedFileSystem) Exists(prefix string, path string) bool {
	_, err := e.Open(path)
	return err == nil
}

func EmbedFolder(fsEmbed embed.FS, targetPath string) static.ServeFileSystem {
	fsys, err := fs.Sub(fsEmbed, targetPath)
	if err != nil {
		panic(err)
	}
	return embedFileSystem{
		FileSystem: http.FS(fsys),
	}
}

func (r *restfulHandler) RegisterHandler(g *gin.Engine) {
	g.Use(r.oobHttp())                                  // oob http log
	g.Use(static.Serve("/", EmbedFolder(dist, "dist"))) // static file
	g.NoRoute(func(c *gin.Context) { c.Status(http.StatusNotFound) })

	v2 := g.Group("/api/v2")
	v2.GET("/login", r.login)
	v2.POST("/userlogin", r.loginuser)
	v2.GET("/githuboauth", r.githuboauth)

	user := v2.Group("user")
	user.Use(r.userToken())
	{
		user.GET("/info", r.info)            // get user info
		user.Any("/record", r.record)        // stream record
		user.POST("/notify", r.notify)       // set user notify
		user.POST("/rebinding", r.rebinding) // set user rebinding
		user.POST("/reset", r.reset)         // reset user api token
		user.POST("/resetsid", r.resetSid)   // reset user api token and Sid
		user.POST("/logout", r.logout)       // logout
	}
	record := v2.Group("record")
	{
		record.GET("/all", r.all) // get all record
	}
}

func (r *restfulHandler) oobHttp() gin.HandlerFunc {
	httplog := oob.NewHTTP(&r.oob.DNS, r.recorder)

	return func(c *gin.Context) {
		host, _ := oob.SplitHostPort(c.Request.Host)
		logrus.Debugf("oobHttp host: %s", host)
		if host != r.oob.DNS.Main {
			httplog.Record(c)
			c.Abort()
		}
	}
}

func (r *restfulHandler) userToken() gin.HandlerFunc {
	return func(c *gin.Context) {
		token, err := c.Cookie("token")
		if err != nil || token == "" {
			ReturnUnauthorized(c, errUnauthorizedAccess)
			c.Abort()
			return
		}

		user, err := r.db.GetUserByToken(token, false)
		if err != nil || user == nil {
			ReturnUnauthorized(c, errUnauthorizedAccess)
			c.Abort()
			return
		}

		c.Set("sid", user.Sid)
		c.Set("token", user.Token)
		c.Next()
	}
}
