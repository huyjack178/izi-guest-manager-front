var Application;
(function (Application) {
    var Services;
    (function (Services) {
        var AuthService = (function () {
            function AuthService($http, $cookies) {
                var _this = this;
                this.serverUrl = "https://izi-manager-server.herokuapp.com/";
                this.login = function (userName, password) {
                    var authData = btoa(userName + ':' + password);
                    var config = {
                        headers: {
                            "Authorization": "Basic " + authData
                        }
                    };
                    var result = _this.httpService.post(_this.serverUrl + "member/login", null, config)
                        .then(function (response) { return response; });
                    console.log(result);
                    return result;
                };
                this.logout = function () {
                    _this.cookiesService.remove(Application.Constants.COOKIE_NAME);
                };
                this.setCookies = function (cookieName, authData, exdays) {
                    var d = new Date();
                    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                    _this.cookiesService.put(cookieName, authData, { expires: d.toUTCString() });
                };
                this.getCookies = function (cookieName) {
                    return _this.cookiesService.get(cookieName);
                };
                this.httpService = $http;
                this.cookiesService = $cookies;
            }
            AuthService.$inject = ["$http", "$cookies"];
            return AuthService;
        })();
        Services.AuthService = AuthService;
        var GuestService = (function () {
            function GuestService($http) {
                var _this = this;
                this.serverUrl = "https://izi-manager-server.herokuapp.com/";
                this.getUser = function () {
                    var result = _this.httpService.get(_this.serverUrl + "guests")
                        .then(function (response) { return response.data; })
                        .catch(function (error) { return error; });
                    console.log(result);
                    return result;
                };
                this.addUser = function (user) {
                    var result = _this.httpService.post(_this.serverUrl + "guests", user)
                        .then(function (response) { return (response); })
                        .catch(function (error) { return error; });
                    console.log(result);
                    return result;
                };
                this.updateUser = function (user) {
                    var result = _this.httpService.put(_this.serverUrl + "guest" + "/" + user.id, user)
                        .then(function (response) { return (response); })
                        .catch(function (error) { return error; });
                    console.log(result);
                    return result;
                };
                this.deleteUser = function (id) {
                    var result = _this.httpService.delete(_this.serverUrl + "guest" + "/" + id)
                        .then(function (response) { return (response); })
                        .catch(function (error) { return error; });
                    console.log(result);
                    return result;
                };
                this.httpService = $http;
            }
            GuestService.$inject = ["$http"];
            return GuestService;
        })();
        Services.GuestService = GuestService;
        angular.module("Application")
            .service("Application.Services.GuestService", GuestService)
            .service("Application.Services.AuthService", AuthService);
    })(Services = Application.Services || (Application.Services = {}));
})(Application || (Application = {}));
