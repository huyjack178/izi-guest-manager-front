module Application.Directives {
    export class RepeatDoneDirective implements ng.IDirective {
        private _scope: ng.IScope;
        static $inject = ["$scope"];

    }
}