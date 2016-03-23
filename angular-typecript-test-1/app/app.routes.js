var Application;
(function (Application) {
    var Routes = (function () {
        function Routes() {
        }
        Routes.configureRoutes = function ($routeProvider, $stateProvider) {
            //$routeProvider
            //    .when("/guest", {
            //    controller: "Application.Controllers.GuestController",
            //    templateUrl: "app/views/guest.html",
            //    controllerAs: "guestCtrl"
            //}).when("/login",{ 
            //    controller: "Application.Controllers.AuthController",
            //    templateUrl: "app/views/login.html",
            //    controllerAs: "authCtrl"
            //}).when("/logout", {
            //    controller: "Application.Controllers.AuthController",
            //    templateUrl: "app/views/logout.html",
            //    controllerAs: "authCtrl"
            //});
            //$routeProvider.otherwise({ redirectTo: "/login" });
            $stateProvider.state('root', {
                url: "",
                views: {
                    'header': {
                        templateUrl: "app/views/header.html",
                        controller: "Application.Controllers.AuthController",
                        controllerAs: "authCtrl"
                    }
                }
            }).state('root.guest', {
                url: '/guest',
                views: {
                    'container@': {
                        controller: "Application.Controllers.GuestController",
                        templateUrl: "app/views/guest.html",
                        controllerAs: "guestCtrl"
                    }
                }
            }).state('login', {
                url: '/login',
                views: {
                    'container': {
                        controller: "Application.Controllers.AuthController",
                        templateUrl: "app/views/login.html",
                        controllerAs: "authCtrl"
                    }
                }
            });
        };
        Routes.$inject = ["$routeProvider", "$stateProvider"];
        return Routes;
    })();
    Application.Routes = Routes;
})(Application || (Application = {}));
