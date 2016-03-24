var Application;
(function (Application) {
    var Services;
    (function (Services) {
        var GuestService = (function () {
            function GuestService($http, authService) {
                var _this = this;
                this.serverUrl = "https://izi-manager-server.herokuapp.com/";
                this.getUser = function () {
                    var result = _this.httpService.get(_this.serverUrl + "guests", _this.authService.getAuthDataConfig())
                        .then(function (response) { return response.data; })
                        .catch(function (error) { return error; });
                    console.log(result);
                    return result;
                };
                this.addUser = function (user) {
                    var result = _this.httpService.post(_this.serverUrl + "guests", user, _this.authService.getAuthDataConfig())
                        .then(function (response) { return (response); })
                        .catch(function (error) { return error; });
                    console.log(result);
                    return result;
                };
                this.updateUser = function (user) {
                    var result = _this.httpService.put(_this.serverUrl + "guest" + "/" + user.id, user, _this.authService.getAuthDataConfig())
                        .then(function (response) { return (response); })
                        .catch(function (error) { return error; });
                    console.log(result);
                    return result;
                };
                this.deleteUser = function (id) {
                    var result = _this.httpService.delete(_this.serverUrl + "guest" + "/" + id, _this.authService.getAuthDataConfig())
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
