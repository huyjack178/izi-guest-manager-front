module Application {
    export class Routes {
        static $inject = ["$routeProvider", "$stateProvider"];
        static configureRoutes($routeProvider: ng.route.IRouteProvider, $stateProvider: ng.ui.IStateProvider) {
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
            }).state('root.account', {
                url: '/account',
                views: {
                    'container@': {
                        controller: "Application.Controllers.AccountController",
                        templateUrl: "app/views/account.html",
                        controllerAs: "accountCtrl"
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
        }
    }
}