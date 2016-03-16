module Application {
    export class Routes {
        static $inject = ["$routeProvider"];
        static configureRoutes($routeProvider: ng.route.IRouteProvider) {
            $routeProvider
                .when("/guest", {
                controller: "Application.Controllers.GuestController",
                templateUrl: "app/views/guest.html",
                controllerAs: "guestCtrl"
            }).when("/login",{ 
                controller: "Application.Controllers.AuthController",
                templateUrl: "app/views/login.html",
                controllerAs: "authCtrl"
            }).when("/", {
                controller: "Application.Controllers.AuthController",
                templateUrl: "index.html",
                controllerAs: "authCtrl"
            });

            $routeProvider.otherwise({ redirectTo: "/login" });
        }
    }
}