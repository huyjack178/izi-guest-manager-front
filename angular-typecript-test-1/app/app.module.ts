((): void => {
    var app = angular.module("Application", ['ngRoute']);
    app.config(Application.Routes.configureRoutes);
})()