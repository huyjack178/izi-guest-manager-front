var Application;
(function (Application) {
    var Services;
    (function (Services) {
        var GuestService = (function () {
            function GuestService($http) {
                var _this = this;
                this.serverUrl = "https://izi-manager-server.herokuapp.com/";
                this.localUrl = "http://localhost:8001/";
                this.getUser = function () {
                    var result = _this.httpService.get(_this.serverUrl + "guests")
                        .then(function (response) { return response.data; });
                    console.log(result);
                    return result;
                };
                this.addUser = function (user) {
                    var result = _this.httpService.post(_this.serverUrl + "guests", user)
                        .then(function (response) { return (response); });
                    console.log(result);
                    return result;
                };
                this.updateUser = function (user) {
                    var result = _this.httpService.put(_this.serverUrl + "guest" + "/" + user.id, user)
                        .then(function (response) { return (response); });
                    console.log(result);
                    return result;
                };
                this.deleteUser = function (id) {
                    var result = _this.httpService.delete(_this.serverUrl + "guest" + "/" + id)
                        .then(function (response) { return (response); });
                    console.log(result);
                    return result;
                };
                this.httpService = $http;
            }
            GuestService.$inject = ["$http"];
            return GuestService;
        })();
        Services.GuestService = GuestService;
        angular.module("Application").service("Application.Services.GuestService", GuestService);
    })(Services = Application.Services || (Application.Services = {}));
})(Application || (Application = {}));
//# sourceMappingURL=GuestService.js.map