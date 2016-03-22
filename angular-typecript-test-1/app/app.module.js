(function () {
    var app = angular.module("Application", ['ngRoute']);
    app.config(Application.Routes.configureRoutes)
        .run(Application.Routes.run);
})();
//# sourceMappingURL=app.module.js.map