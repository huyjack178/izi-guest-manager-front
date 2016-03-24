var Application;
(function (Application) {
    var Services;
    (function (Services) {
        var GuestService = (function () {
            function GuestService($http, authService) {
                var _this = this;
                this.getUser = function () {
                    var result = _this.httpService.get(Application.Configs.ServerConfig.ServerUrl + "guests", _this.authService.getAuthDataConfig())
                        .then(function (response) { return response.data; })
                        .catch(function (error) { return error; });
                    console.log(result);
                    return result;
                };
                this.addUser = function (user) {
                    var result = _this.httpService.post(Application.Configs.ServerConfig.ServerUrl + "guests", user, _this.authService.getAuthDataConfig())
                        .then(function (response) { return (response); })
                        .catch(function (error) { return error; });
                    console.log(result);
                    return result;
                };
                this.updateUser = function (user) {
                    var result = _this.httpService.put(Application.Configs.ServerConfig.ServerUrl + "guest" + "/" + user.id, user, _this.authService.getAuthDataConfig())
                        .then(function (response) { return (response); })
                        .catch(function (error) { return error; });
                    console.log(result);
                    return result;
                };
                this.deleteUser = function (id) {
                    var result = _this.httpService.delete(Application.Configs.ServerConfig.ServerUrl + "guest" + "/" + id, _this.authService.getAuthDataConfig())
                        .then(function (response) { return (response); })
                        .catch(function (error) { return error; });
                    console.log(result);
                    return result;
                };
                this.httpService = $http;
                this.authService = authService;
            }
            GuestService.$inject = ["$http", "Application.Services.AuthService"];
            return GuestService;
        })();
        Services.GuestService = GuestService;
        angular.module("Application")
            .service("Application.Services.GuestService", GuestService);
    })(Services = Application.Services || (Application.Services = {}));
})(Application || (Application = {}));
//# sourceMappingURL=GuestService.js.map