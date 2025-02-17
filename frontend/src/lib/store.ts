import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';

export interface State {
    githubOauth: string,
    logged: boolean
    sid: string
    token: string
    user: {
        name: string,
        avatar: string,
        sid: string,
        token: string,
        rebinding: string[],
        data: {
            subdomain: string,
            nsdomain: string,
            rdomain: string,
            ldap: string,
            rmi: string,
        }
        notify: {
            enable: boolean,
            bark: {
                key: string,
                server: string,
            },
            dingtalk: {
                token: string,
                secret: string,
            },
            lark: {
                token: string,
                secret: string,
            },
            feishu: {
                token: string,
                secret: string,
            },
            serverchan: {
                user_id: string,
                send_key: string,
            },
        },
    }
};

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
    state: {
        githubOauth: '',
        logged: false,
        sid: '',
        token: '',
        user: {
            name: '',
            avatar: '',
            sid: '',
            token: '',
            rebinding: [],
            data: {
                subdomain: '',
                nsdomain: '',
                rdomain: '',
                ldap: '',
                rmi: '',
            },
            notify: {
                enable: false,
                bark: {
                    key: '',
                    server: '',
                },
                dingtalk: {
                    token: '',
                    secret: '',
                },
                lark: {
                    token: '',
                    secret: '',
                },
                feishu: {
                    token: '',
                    secret: '',
                },
                serverchan: {
                    user_id: '',
                    send_key: '',
                },
            },
        }
    }
});

export function useStore() {
    return baseUseStore(key)
};