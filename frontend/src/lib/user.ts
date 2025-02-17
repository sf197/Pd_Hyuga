import { useCookies } from "vue3-cookies";
import { ElMessage } from 'element-plus';
import { store } from "./store";

const { cookies } = useCookies();

// message
const succ = (msg: string) => {
    ElMessage({
        message: msg,
        type: 'success',
    });
};

const warn = (msg: string) => {
    ElMessage({
        message: msg,
        type: 'warning',
    });
};

const fail = (msg: string) => {
    ElMessage({
        message: msg,
        type: 'error',
    });
};

const apihost: string = function () {
    return `${window.location.protocol}//${window.location.host}`;
}();

function isLogin(): boolean {
    return cookies.get("sid") !== null && cookies.get("token") !== null;
}

function submitLogin(username: string, password: string) {
    fetch(`${apihost}/api/v2/userlogin`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
        })
        .then((res) => res.json())
        .then((res) => {
            const { code, msg, data } = res;
            if (code === 0) {
                store.state.githubOauth = data;
                cookies.set("sid",data['sid'])
                cookies.set("token",data['token'])
                store.state.logged = true;
                succ('login success');
                location.href = "/"
            } else {
                warn(msg);
            }
        }).catch((err) => {
            fail(err.message);
        });
}

function githubOauth() {
    fetch(`${apihost}/api/v2/githuboauth`, { method: "GET" })
        .then((res) => res.json())
        .then((res) => {
            const { code, msg, data } = res;
            if (code === 0) {
                store.state.githubOauth = data;
            } else {
                warn(msg);
            }
        }).catch((err) => {
            fail(err.message);
        });
}

function logout() {
    fetch(`${apihost}/api/v2/user/logout`, { method: "POST" })
        .then((res) => res.json())
        .then((res) => {
            const { code, msg, _ } = res;
            if (code === 0) {
                // 清除 cookie
                cookies.remove("sid");
                cookies.remove("token");
                store.state.logged = false;
                succ('logout success');
            } else {
                warn(msg);
            }
        }).catch((err) => {
            fail(err.message);
        });
}

function getUserInfo(succcallback: Function) {
    fetch(`${apihost}/api/v2/user/info`, { method: "GET" })
        .then((res) => res.json())
        .then((res) => {
            const { code, msg, data } = res;
            if (code !== 0) {
                warn(msg);
            } else {
                // update user info
                store.state.user = data;
                succcallback();
            }
        }).catch((err) => {
            fail(err.message);
        });
}

function setNotify(notify: any) {
    fetch(`${apihost}/api/v2/user/notify`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notify),
    })
        .then((res) => res.json())
        .then((res) => {
            const { code, msg, _ } = res;
            if (code === 0) {
                succ('set notify success');
            } else {
                warn(msg);
            }
        }).catch((err) => {
            fail(err.message);
        });
}

function resetToken(succcallback: Function) {
    fetch(`${apihost}/api/v2/user/reset`, { method: "POST" })
        .then((res) => res.json())
        .then((res) => {
            const { code, msg, data } = res;
            if (code === 0) {
                getUserInfo(succcallback);
                succ('reset token success');
            } else {
                warn(msg);
            }
        }).catch((err) => {
            fail(err.message);
        });
}

function resetTokenSid(succcallback: Function) {
    fetch(`${apihost}/api/v2/user/resetsid`, { method: "POST" })
        .then((res) => res.json())
        .then((res) => {
            const { code, msg, data } = res;
            if (code === 0) {
                getUserInfo(succcallback);
                succ('reset token and sid success');
            } else {
                warn(msg);
            }
        }).catch((err) => {
            fail(err.message);
        });
}

function setRebinding() {
    fetch(`${apihost}/api/v2/user/rebinding`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'rebinding': store.state.user.rebinding }),
    })
        .then((res) => res.json())
        .then((res) => {
            const { code, msg, _ } = res;
            if (code === 0) {
                succ('set rebinding success');
            } else {
                warn(msg);
            }
        }).catch((err) => {
            fail(err.message);
        });
}

export {
    isLogin,
    submitLogin,
    githubOauth,
    logout,
    getUserInfo,
    setNotify,
    resetToken,
    resetTokenSid,
    setRebinding
};
