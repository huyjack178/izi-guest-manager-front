module Application.Services {
    export class AuthService implements Application.Interfaces.IAuthService {
        serverUrl: string = "https://izi-manager-server.herokuapp.com/"
        //serverUrl: string = "http://localhost:8001/"

        httpService: ng.IHttpService
        static $inject = ["$http"];

        constructor($http: ng.IHttpService) {
            this.httpService = $http;
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
            document.cookie = null;
        }

        setCookies = (cookieName: string, authData: any, exdays: number) => {
            var date = new Date();
            date.setTime(date.getTime() + (exdays * 24 * 60 * 1000));
            var expires = "expires=" + date.toUTCString();
            document.cookie = cookieName + "=" + authData + ";" + expires;
        }

        getCookies = (cookieName: string): string => {
            var name = cookieName + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1);
                if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
            }
            return "";
        }
    }

    export class GuestService implements Application.Interfaces.IUserService {
        serverUrl: string = "https://izi-manager-server.herokuapp.com/"
        //serverUrl: string = "http://localhost:8001/"

        httpService: ng.IHttpService
        static $inject = ["$http"];

        constructor($http: ng.IHttpService) {
            this.httpService = $http;
        }

        getUser = () => {
            var result = this.httpService.get(this.serverUrl + "guests")
                .then((response: any): ng.IPromise<any> => response.data)
                .catch((error: any): ng.IPromise<any> => error);

            console.log(result);

            return result;
        }

        addUser = (user: Interfaces.IUser) => {
            var result = this.httpService.post(this.serverUrl + "guests", user)
                .then((response: any): ng.IPromise<any> => (response))
                .catch((error: any): ng.IPromise<any> => error);

            console.log(result);

            return result;
        }

        updateUser = (user: Interfaces.IUser) => {
            var result = this.httpService.put(this.serverUrl + "guest" + "/" + user.id, user)
                .then((response: any): ng.IPromise<any> => (response))
                .catch((error: any): ng.IPromise<any> => error);

            console.log(result);

            return result;
        }

        deleteUser = (id: string) => {
            var result = this.httpService.delete(this.serverUrl + "guest" + "/" + id)
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