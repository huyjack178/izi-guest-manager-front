var Application;
(function (Application) {
    var Controllers;
    (function (Controllers) {
        var GuestController = (function () {
            function GuestController(guestService) {
                var _this = this;
                this.initialize = function () {
                    _this._guestService.getUser().then(function (data) {
                        _this.guests = data;
                    });
                };
                this.addGuest = function (guest) {
                    _this._guestService.addUser(guest).then(function (data) {
                        console.log(data);
                    });
                };
                this._guestService = guestService;
            }
            GuestController.$inject = ["Application.Services.GuestService"];
            return GuestController;
        })();
        Controllers.GuestController = GuestController;
        angular.module("Application").controller("Application.Controllers.GuestController", GuestController);
    })(Controllers = Application.Controllers || (Application.Controllers = {}));
})(Application || (Application = {}));
//# sourceMappingURL=GuestController.js.map