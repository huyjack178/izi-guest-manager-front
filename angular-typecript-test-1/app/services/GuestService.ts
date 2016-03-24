module Application.Services {
    export class GuestService implements Application.Interfaces.IUserService {
        httpService: ng.IHttpService;
        authService: Application.Interfaces.IAuthService;

        static $inject = ["$http", "Application.Services.AuthService"];

        constructor($http: ng.IHttpService, authService: Application.Services.AuthService) {
            this.httpService = $http;
            this.authService = authService;
        }

        getUser = () => {
            var result = this.httpService.get(Configs.ServerConfig.ServerUrl + "guests", this.authService.getAuthDataConfig())
                .then((response: any): ng.IPromise<any> => response.data)
                .catch((error: any): ng.IPromise<any> => error);

            console.log(result);

            return result;
        }

        addUser = (user: Application.Interfaces.IUser) => {
            var result = this.httpService.post(Configs.ServerConfig.ServerUrl + "guests", user, this.authService.getAuthDataConfig())
                .then((response: any): ng.IPromise<any> => (response))
                .catch((error: any): ng.IPromise<any> => error);

            console.log(result);

            return result;
        }

        updateUser = (user: Application.Interfaces.IUser) => {
            var result = this.httpService.put(Configs.ServerConfig.ServerUrl + "guest" + "/" + user.id, user, this.authService.getAuthDataConfig())
                .then((response: any): ng.IPromise<any> => (response))
                .catch((error: any): ng.IPromise<any> => error);

            console.log(result);

            return result;
        }

        deleteUser = (id: string) => {
            var result = this.httpService.delete(Configs.ServerConfig.ServerUrl + "guest" + "/" + id, this.authService.getAuthDataConfig())
                .then((response: any): ng.IPromise<any> => (response))
                .catch((error: any): ng.IPromise<any> => error);

            console.log(result);

            return result;
        }
    }

    angular.module("Application")
        .service("Application.Services.GuestService", GuestService);
}