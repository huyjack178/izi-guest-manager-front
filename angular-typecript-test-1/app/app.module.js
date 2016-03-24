(function () {
    var app = angular.module("Application", ['ngRoute', 'ngCookies', 'ui.router']);
    app.config(Application.Routes.configureRoutes)
        .run(Application.Run.run);
})();
//# sourceMappingURL=app.module.js.map