var Application;
(function (Application) {
    var Run = (function () {
        function Run() {
        }
        Run.run = function ($rootScope, $location, $cookie) {
            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                var cookie = $cookie.get("member");
                if (cookie == null)
                    $location.path('/login');
            });
        };
        Run.$inject = ['$rootScope', '$location', '$cookiesProvider'];
        return Run;
    })();
    Application.Run = Run;
})(Application || (Application = {}));
