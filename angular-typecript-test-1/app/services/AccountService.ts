module Application.Services {
    export class AccountService implements Application.Interfaces.IAccountService {
        private _httpService: ng.IHttpService;
        private _authService: Application.Interfaces.IAuthService;

        static $inject = ["$http", "Application.Services.AuthService"]

        constructor($http: ng.IHttpService, authService: Application.Services.AuthService) {
            this._httpService = $http;
            this._authService = authService;
        }

        getAccounts = (): ng.IPromise<any> => {
            var result = this._httpService.get(Configs.ServerConfig.ServerUrl + "accounts", this._authService.getAuthDataConfig())
                .then((response: any): ng.IPromise<any> => (response.data))

            console.log(result);

            return result;
        }

        getAccount = (): ng.IPromise<any> => {
            return null;
        }

        createAccount = (account: Application.Interfaces.IAccount): ng.IPromise<any> => {
            var result = this._httpService.post(Configs.ServerConfig.ServerUrl + "accounts", account, this._authService.getAuthDataConfig())
                .then((response: any): ng.IPromise<any> => (response))

            console.log(result);
            return result;
        }

        updateAccount = (account: Application.Interfaces.IAccount): ng.IPromise<any> => {
            return null;
        }

        deleteAccount = (userName: string): ng.IPromise<any> => {
            var result = this._httpService.delete(Configs.ServerConfig.ServerUrl + "account/" + userName, this._authService.getAuthDataConfig())
                .then((response: any): ng.IPromise<any> => (response))

            console.log(result)
            return result;
        }
    }

    angular.module("Application")
        .service("Application.Services.AccountService", AccountService);
}