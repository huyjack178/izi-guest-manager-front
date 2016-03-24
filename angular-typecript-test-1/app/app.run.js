var Application;
(function (Application) {
    var Run = (function () {
        function Run() {
        }
        Run.run = function ($rootScope, $location, $cookies) {
            $rootScope.$on('$stateChangeStart', function (event, next, current) {
                var cookie = $cookies.get(Application.Constants.COOKIE_NAME);
                if (cookie == null) {
                    $location.path('/login');
                }
                else {
                }
            });
        };
        Run.$inject = ['$rootScope', '$location', '$cookies'];
        return Run;
    })();
    Application.Run = Run;
})(Application || (Application = {}));
//# sourceMappingURL=app.run.js.map