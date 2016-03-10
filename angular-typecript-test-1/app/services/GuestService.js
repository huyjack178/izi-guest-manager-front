var Application;
(function (Application) {
    var Services;
    (function (Services) {
        var GuestService = (function () {
            function GuestService($http) {
                var _this = this;
                this.serverUrl = "https://izi-guest-manager.herokuapp.com/";
                this.localUrl = "http://localhost:8001/";
                this.getUser = function () {
                    var result = _this.httpService.get(_this.localUrl + "guests")
                        .then(function (response) { return response.data; });
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
