var Application;
(function (Application) {
    var Run = (function () {
        function Run() {
        }
        Run.run = function ($rootScope, $location) {
            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                $location.path('/login');
            });
        };
        Run.$inject = ['$rootScope', '$location'];
        return Run;
    })();
    Application.Run = Run;
})(Application || (Application = {}));
