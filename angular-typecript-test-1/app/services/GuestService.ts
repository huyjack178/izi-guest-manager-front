module Application.Services {
    export class GuestService implements Application.Interfaces.IUserService {
        httpService: ng.IHttpService
        static $inject = ["$http"];

        constructor($http: ng.IHttpService) {
            this.httpService = $http;
        }

        serverUrl: string = "https://izi-manager-server.herokuapp.com/"
        localUrl: string = "http://localhost:8001/"

        getUser = () => {
            var result = this.httpService.get(this.serverUrl + "guests")
                .then((response: any): ng.IPromise<any> => response.data)

            console.log(result);

            return result;
        }

        addUser = (user: Interfaces.IUser) => {
            var result = this.httpService.post(this.serverUrl + "guests", user)
                .then((response: any): ng.IPromise<any> => (response))

            console.log(result);

            return result;
        }

        updateUser = (user: Interfaces.IUser) => {
            var result = this.httpService.put(this.serverUrl + "guest" + "/" + user.id, user)
                .then((response: any): ng.IPromise<any> => (response));

            console.log(result);

            return result;
        }

        deleteUser = (id: string) => {
            var result = this.httpService.delete(this.serverUrl + "guest" + "/" + id)
                .then((response: any): ng.IPromise<any> => (response));

            console.log(result);

            return result;
        }
    }

    angular.module("Application").service("Application.Services.GuestService", GuestService);
}