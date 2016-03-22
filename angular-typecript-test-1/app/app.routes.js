var Application;
(function (Application) {
    var Routes = (function () {
        function Routes() {
        }
        Routes.configureRoutes = function ($routeProvider) {
            $routeProvider
                .when("/guest", {
                controller: "Application.Controllers.GuestController",
                templateUrl: "app/views/guest.html",
                controllerAs: "guestCtrl"
            }).when("/login", {
                controller: "Application.Controllers.AuthController",
                templateUrl: "app/views/login.html",
                controllerAs: "authCtrl"
            }).when("/logout", {
                controller: "Application.Controllers.AuthController",
                templateUrl: "app/views/login.html",
                controllerAs: "authCtrl"
            });
            $routeProvider.otherwise({ redirectTo: "/login" });
        };
        Routes.$inject = ["$routeProvider", '$rootScope', '$location'];
        return Routes;
    })();
    Application.Routes = Routes;
})(Application || (Application = {}));
