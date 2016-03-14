var Application;
(function (Application) {
    var Directives;
    (function (Directives) {
        var RepeatDoneDirective = (function () {
            function RepeatDoneDirective() {
            }
            RepeatDoneDirective.$inject = ["$scope"];
            return RepeatDoneDirective;
        })();
        Directives.RepeatDoneDirective = RepeatDoneDirective;
    })(Directives = Application.Directives || (Application.Directives = {}));
})(Application || (Application = {}));
