var Application;
(function (Application) {
    var Controllers;
    (function (Controllers) {
        var GuestController = (function () {
            function GuestController(guestService, authService) {
                var _this = this;
                this._currentGuestIndex = -1;
                this.initialize = function () {
                    Controllers.CommonController.showPreloader();
                    Controllers.CommonController.hideContent('.main-content');
                    _this._guestService.getUser().then(function (data) {
                        _this._guests = data;
                    }).catch(function (error) {
                        Materialize.toast("Error! Can't add guests!", 4000, "red");
                    }).finally(function () {
                        Controllers.CommonController.hidePreloader();
                        Controllers.CommonController.showContent('.main-content');
                    });
                };
                this.addGuest = function (guest) {
                    Controllers.CommonController.showPreloader();
                    Controllers.CommonController.hideContent('.main-content');
                    _this._guestService.addUser(guest).then(function (response) {
                        if (response.status == 201) {
                            guest.id = response.data;
                            _this._guests.push(_this.createNew(guest));
                            Materialize.toast("Success! New guest is created", 4000, "green");
                        }
                        else {
                            console.log(response.status);
                            Materialize.toast("Error! Can't add guest!", 4000, "red");
                        }
                    }).catch(function (error) {
                        Materialize.toast("Error! Can't add guest", 4000, "red");
                    }).finally(function () {
                        Controllers.CommonController.hidePreloader();
                        Controllers.CommonController.showContent('.main-content');
                    });
                };
                this.updateGuest = function (guest) {
                    Controllers.CommonController.showPreloader();
                    Controllers.CommonController.hideContent('.main-content');
                    console.log(_this._guestDTO);
                    _this._guestService.updateUser(guest).then(function (response) {
                        if (response.status == 200) {
                            _this._guests[_this._currentGuestIndex] = guest;
                            Materialize.toast("Success! Guest is updated", 4000, "green");
                        }
                        else {
                            console.log(response.status);
                            Materialize.toast("Error! Can't update guest!", 4000, "red");
                        }
                    }).catch(function (error) {
                        Materialize.toast("Error! Can't update guest", 4000, "red");
                    }).finally(function () {
                        Controllers.CommonController.hidePreloader();
                        Controllers.CommonController.showContent('.main-content');
                    });
                };
                this.deleteGuest = function (guestId) {
                    Controllers.CommonController.showPreloader();
                    Controllers.CommonController.hideContent('.main-content');
                    _this._guestService.deleteUser(guestId).then(function (response) {
                        if (response.status == 200) {
                            _this._guests.splice(_this._currentGuestIndex, 1);
                            Materialize.toast("Success! Guest is deleted", 4000, "green");
                        }
                        else {
                            Materialize.toast("Error! Can't delete guest!", 4000, "red");
                        }
                    }).catch(function (error) {
                        Materialize.toast("Error! Can't delete guest", 4000, "red");
                    }).finally(function () {
                        Controllers.CommonController.hidePreloader();
                        Controllers.CommonController.showContent('.main-content');
                    });
                };
                this.initModals = function () {
                    Controllers.CommonController.initModals();
                };
                this.openEditModalOf = function (index, guest) {
                    _this._currentGuestIndex = index;
                    _this._guestDTO = _this.createNew(guest);
                };
                this.openDelModalOf = function (index) {
                    _this._currentGuestIndex = index;
                };
                this.getCurrentGuestId = function () {
                    if (_this._currentGuestIndex > -1) {
                        var currentGuest = _this._guests[_this._currentGuestIndex];
                        if (currentGuest != null) {
                            return currentGuest.id;
                        }
                    }
                };
                this.getGuestDTO = function () {
                    return _this._guestDTO;
                };
                this._guestService = guestService;
            }
            GuestController.prototype.createNew = function (guest) {
                var newGuest = {
                    fullname: guest.fullname,
                    id: guest.id,
                    email: guest.email,
                    address: guest.address,
                    phone: guest.phone,
                    hometown: guest.hometown
                };
                return newGuest;
            };
            GuestController.$inject = ["Application.Services.GuestService"];
            return GuestController;
        })();
        Controllers.GuestController = GuestController;
        angular.module("Application")
            .controller("Application.Controllers.GuestController", GuestController);
    })(Controllers = Application.Controllers || (Application.Controllers = {}));
})(Application || (Application = {}));
//# sourceMappingURL=GuestController.js.map