module Application {
    export class Routes {
        static $inject = ["$routeProvider", '$rootScope', '$location'];
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
            }).when("/logout", {
                controller: "Application.Controllers.AuthController",
                templateUrl: "app/views/login.html",
                controllerAs: "authCtrl"
            });

            $routeProvider.otherwise({ redirectTo: "/login" });
        }

        static run($rootScope: ng.IRootScopeService, $location: ng.ILocationService) {
            $rootScope.$on('$locationChangeStart', (event, next, current) => {
                $location.path('/login');
            })
        }
    }
}