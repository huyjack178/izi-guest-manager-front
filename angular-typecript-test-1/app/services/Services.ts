module Application.Services {
    export class AuthService implements Application.Interfaces.IAuthService {
        serverUrl: string = "https://izi-manager-server.herokuapp.com/"
        //serverUrl: string = "http://localhost:8001/"

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
            var result = this.httpService.post(this.serverUrl + "member/login", null, config)
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
            var authData = this.getCookies(Constants.COOKIE_NAME);

            var config: ng.IRequestShortcutConfig = {
                headers: {
                    "Authorization": authData
                }
            };

            return config;
        }
    }

    export class GuestService implements Application.Interfaces.IUserService {
        serverUrl: string = "https://izi-manager-server.herokuapp.com/"
        //serverUrl: string = "http://localhost:8001/"

        httpService: ng.IHttpService;
        authService: Application.Interfaces.IAuthService;

        static $inject = ["$http", "Application.Services.AuthService"];

        constructor($http: ng.IHttpService, authService: Application.Services.AuthService) {
            this.httpService = $http;
            this.authService = authService;
        }

        getUser = () => {
            var result = this.httpService.get(this.serverUrl + "guests", this.authService.getAuthDataConfig())
                .then((response: any): ng.IPromise<any> => response.data)
                .catch((error: any): ng.IPromise<any> => error);

            console.log(result);

            return result;
        }

        addUser = (user: Interfaces.IUser) => {
            var result = this.httpService.post(this.serverUrl + "guests", user, this.authService.getAuthDataConfig())
                .then((response: any): ng.IPromise<any> => (response))
                .catch((error: any): ng.IPromise<any> => error);

            console.log(result);

            return result;
        }

        updateUser = (user: Interfaces.IUser) => {
            var result = this.httpService.put(this.serverUrl + "guest" + "/" + user.id, user, this.authService.getAuthDataConfig())
                .then((response: any): ng.IPromise<any> => (response))
                .catch((error: any): ng.IPromise<any> => error);

            console.log(result);

            return result;
        }

        deleteUser = (id: string) => {
            var result = this.httpService.delete(this.serverUrl + "guest" + "/" + id, this.authService.getAuthDataConfig())
                .then((response: any): ng.IPromise<any> => (response))
                .catch((error: any): ng.IPromise<any> => error);

            console.log(result);

            return result;
        }
    }

    angular.module("Application")
        .service("Application.Services.GuestService", GuestService)
        .service("Application.Services.AuthService", AuthService);
}