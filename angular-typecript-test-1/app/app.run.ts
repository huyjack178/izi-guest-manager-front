module Application {
    export class Run {
        static run($rootScope: ng.IRootScopeService, $location: ng.ILocationService) {
            $rootScope.$on('$locationChangeStart', (event, next, current) => {
                $location.path('/login');
            })
        }
    }
}