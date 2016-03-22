(function () {
    var app = angular.module("Application", ['ngRoute', 'ngCookies']);
    app.config(Application.Routes.configureRoutes)
        .run(Application.Run.run);
})();
