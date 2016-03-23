module Application {
    export class Run {
        static $inject = ['$rootScope', '$location', '$cookies']
        static run($rootScope: ng.IRootScopeService
            , $location: ng.ILocationService
            , $cookies: ng.cookies.ICookiesService) {
            $rootScope.$on('$stateChangeStart', (event, next, current) => {
                var cookie = $cookies.get(Application.Constants.COOKIE_NAME);
                if (cookie == null) {
                    $location.path('/login');
                }
                else {
                    $location.path('/guest');
                }
            })
        }
    }
}