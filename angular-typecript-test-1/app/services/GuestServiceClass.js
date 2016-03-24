var GuestServiceModule;
(function (GuestServiceModule) {
    var GuestServiceClass = (function () {
        function GuestServiceClass($http, authService) {
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
        GuestServiceClass.$inject = ["$http", "Application.Services.AuthService"];
        return GuestServiceClass;
    })();
    GuestServiceModule.GuestServiceClass = GuestServiceClass;
})(GuestServiceModule || (GuestServiceModule = {}));
