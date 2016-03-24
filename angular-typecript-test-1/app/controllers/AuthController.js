var Application;
(function (Application) {
    var Controllers;
    (function (Controllers) {
        var AuthController = (function () {
            function AuthController(authService, scope, location) {
                var _this = this;
                this.login = function (userName, password) {
                    Controllers.CommonController.showPreloader();
                    _this._authService.login(userName, password)
                        .then(function (response) {
                        if (response.status == 200) {
                            _this._authService.setCookies(Application.Constants.COOKIE_NAME, response.data, 60);
                            _this._authService.setCookies(Application.Constants.COOKIE_USERNAME, userName, 60);
                            _this._location.path("/guest");
                        }
                        else {
                            Materialize.toast("Wrong UserName or Password", 4000, "red rounded");
                        }
                    }).catch(function (error) {
                        Materialize.toast("Wrong UserName or Password", 4000, "red rounded");
                    }).finally(function () {
                        Controllers.CommonController.hidePreloader();
                    });
                };
                this.logout = function () {
                    _this._authService.logout();
                    _this._location.path("/login");
                };
                this.getUserName = function () {
                    return _this._authService.getCookies(Application.Constants.COOKIE_USERNAME);
                };
                this._authService = authService;
                this._scope = scope;
                this._location = location;
                Controllers.CommonController.hidePreloader();
            }
            AuthController.$inject = ["Application.Services.AuthService", "$scope", "$location"];
            return AuthController;
        })();
        Controllers.AuthController = AuthController;
        angular.module("Application")
            .controller("Application.Controllers.AuthController", AuthController);
    })(Controllers = Application.Controllers || (Application.Controllers = {}));
})(Application || (Application = {}));
//# sourceMappingURL=AuthController.js.map