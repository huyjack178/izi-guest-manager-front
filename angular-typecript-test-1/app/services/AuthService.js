var Application;
(function (Application) {
    var Services;
    (function (Services) {
        var AuthService = (function () {
            function AuthService($http, $cookies) {
                var _this = this;
                this.login = function (userName, password) {
                    var authData = btoa(userName + ':' + password);
                    var config = {
                        headers: {
                            "Authorization": "Basic " + authData
                        }
                    };
                    var result = _this.httpService.post(Application.Configs.ServerConfig.ServerUrl + "account/login", null, config)
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
                this.getAuthDataConfig = function () {
                    var authData = _this.getCookies(Application.Constants.COOKIE_NAME);
                    var config = {
                        headers: {
                            "Authorization": authData
                        }
                    };
                    return config;
                };
                this.httpService = $http;
                this.cookiesService = $cookies;
            }
            AuthService.$inject = ["$http", "$cookies"];
            return AuthService;
        })();
        Services.AuthService = AuthService;
        angular.module("Application")
            .service("Application.Services.AuthService", AuthService);
    })(Services = Application.Services || (Application.Services = {}));
})(Application || (Application = {}));
//# sourceMappingURL=AuthService.js.map