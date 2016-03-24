module Application.Interfaces {
    export interface IAuthService {
        login: (userName: string, password: string) => ng.IPromise<any>

        logout: () => any

        setCookies: (cookieName: string, data: any, exdays: number) => any

        getCookies: (cookieName: string) => string

        getAuthDataConfig: () => ng.IRequestShortcutConfig
    }
}