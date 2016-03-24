module Application.Services {
    export class AuthService implements Application.Interfaces.IAuthService {
        httpService: ng.IHttpService
        cookiesService: ng.cookies.ICookiesService;

        static $inject = ["$http", "$cookies"];

        constructor($http: ng.IHttpService, $cookies: ng.cookies.ICookiesService) {
            this.httpService = $http;
            this.cookiesService = $cookies;
        }

        login = (userName: string, password: string) => {
            var authData = btoa(userName + ':' + password);

            var config: ng.IRequestShortcutConfig = {
                headers: {
                    "Authorization": "Basic " + authData
                }
            }
            var result = this.httpService.post(Configs.ServerConfig.ServerUrl + "account/login", null, config)
                .then((response: any): ng.IPromise<any> => response);

            console.log(result);
            return result;
        }

        logout = () => {
            this.cookiesService.remove(Application.Constants.COOKIE_NAME);
        }

        setCookies = (cookieName: string, authData: any, exdays: number) => {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));

            this.cookiesService.put(cookieName, authData, { expires: d.toUTCString() });
        }

        getCookies = (cookieName: string): string => {
            return this.cookiesService.get(cookieName);
        }

        getAuthDataConfig = (): ng.IRequestShortcutConfig => {
            var authData = this.getCookies(Application.Constants.COOKIE_NAME);

            var config: ng.IRequestShortcutConfig = {
                headers: {
                    "Authorization": authData
                }
            };

            return config;
        }
    }

    angular.module("Application")
        .service("Application.Services.AuthService", AuthService);
}