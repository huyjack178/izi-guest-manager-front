var Application;
(function (Application) {
    var Services;
    (function (Services) {
        var AuthService = (function () {
            function AuthService($http) {
                var _this = this;
                this.serverUrl = "https://izi-manager-server.herokuapp.com/";
                this.localUrl = "http://localhost:8001/";
                this.login = function (userName, password) {
                    var authData = btoa(userName + ':' + password);
                    var config = {
                        headers: {
                            "Authorization": "Basic " + authData
                        }
                    };
                    var result = _this.httpService.post(_this.localUrl + "member/login", null, config)
                        .then(function (response) { return response; });
                    console.log(result);
                    return result;
                };
                this.logout = function () {
                    document.cookie = null;
                    window.location.href = window.location.pathname + "#/login";
                };
                this.setCookies = function (cookieName, authData, exdays) {
                    var date = new Date();
                    date.setTime(date.getTime() + (exdays * 24 * 60 * 1000));
                    var expires = "expires=" + date.toUTCString();
                    document.cookie = cookieName + "=" + authData + ";" + expires;
                };
                this.getCookies = function (cookieName) {
                    var name = cookieName + "=";
                    var ca = document.cookie.split(';');
                    for (var i = 0; i < ca.length; i++) {
                        var c = ca[i];
                        while (c.charAt(0) == ' ')
                            c = c.substring(1);
                        if (c.indexOf(name) == 0)
                            return c.substring(name.length, c.length);
                    }
                    return "";
                };
                this.httpService = $http;
            }
            AuthService.$inject = ["$http"];
            return AuthService;
        })();
        Services.AuthService = AuthService;
        var GuestService = (function () {
            function GuestService($http) {
                var _this = this;
                this.serverUrl = "https://izi-manager-server.herokuapp.com/";
                this.localUrl = "http://localhost:8001/";
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
