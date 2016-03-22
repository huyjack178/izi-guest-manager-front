module Application {
    export class Run {
        static $inject = ['$rootScope', '$location', '$cookiesProvider']
        static run($rootScope: ng.IRootScopeService
            , $location: ng.ILocationService
            , $cookie: ng.cookies.ICookiesService) {

            $rootScope.$on('$locationChangeStart', (event, next, current) => {
                var cookie = $cookie.get("member");
                if (cookie == null)
                    $location.path('/login');
                
            })
        }
    }
}