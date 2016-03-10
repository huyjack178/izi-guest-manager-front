var Application;
(function (Application) {
    var Routes = (function () {
        function Routes() {
        }
        Routes.configureRoutes = function ($routeProvider) {
            $routeProvider.when("/guest", {
                controller: "Application.Controllers.GuestController",
                templateUrl: "app/views/guest.html",
                controllerAs: "guestCtrl"
            });
            $routeProvider.otherwise({ redirectTo: "/guest" });
        };
        Routes.$inject = ["$routeProvider"];
        return Routes;
    })();
    Application.Routes = Routes;
})(Application || (Application = {}));
//# sourceMappingURL=app.routes.js.map