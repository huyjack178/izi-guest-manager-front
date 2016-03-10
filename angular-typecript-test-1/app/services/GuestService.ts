module Application.Services {
    export class GuestService implements Application.Interfaces.IUserService {
        httpService: ng.IHttpService
        static $inject = ["$http"];

        constructor($http: ng.IHttpService) {
            this.httpService = $http;
        }

        serverUrl: string = "https://izi-guest-manager.herokuapp.com/"
        localUrl: string = "http://localhost:8001/"

        getUser = () => {
            var result = this.httpService.get(this.localUrl + "guests")
                .then((response: any): ng.IPromise<any> => response.data)

            console.log(result)

            return result
        }
    }

    angular.module("Application").service("Application.Services.GuestService", GuestService);
}