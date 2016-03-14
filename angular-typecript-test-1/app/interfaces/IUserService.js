var Application;
(function (Application) {
    var Models;
    (function (Models) {
        var GuestModel = (function () {
            function GuestModel() {
                this.id = "";
            }
            return GuestModel;
        })();
        Models.GuestModel = GuestModel;
    })(Models = Application.Models || (Application.Models = {}));
})(Application || (Application = {}));
