var Application;
(function (Application) {
    var Services;
    (function (Services) {
        var AccountService = (function () {
            function AccountService($http, authService) {
                var _this = this;
                this.getAccounts = function () {
                    var result = _this._httpService.get(Application.Configs.ServerConfig.ServerUrl + "accounts", _this._authService.getAuthDataConfig())
                        .then(function (response) { return (response.data); });
                    console.log(result);
                    return result;
                };
                this.getAccount = function () {
                    return null;
                };
                this.createAccount = function (account) {
                    var result = _this._httpService.post(Application.Configs.ServerConfig.ServerUrl + "accounts", account, _this._authService.getAuthDataConfig())
                        .then(function (response) { return (response); });
                    console.log(result);
                    return result;
                };
                this.updateAccount = function (account) {
                    return null;
                };
                this.deleteAccount = function (userName) {
                    var result = _this._httpService.delete(Application.Configs.ServerConfig.ServerUrl + "account/" + userName, _this._authService.getAuthDataConfig())
                        .then(function (response) { return (response); });
                    console.log(result);
                    return result;
                };
                this._httpService = $http;
                this._authService = authService;
            }
            AccountService.$inject = ["$http", "Application.Services.AuthService"];
            return AccountService;
        })();
        Services.AccountService = AccountService;
        angular.module("Application")
            .service("Application.Services.AccountService", AccountService);
    })(Services = Application.Services || (Application.Services = {}));
})(Application || (Application = {}));
//# sourceMappingURL=AccountService.js.map