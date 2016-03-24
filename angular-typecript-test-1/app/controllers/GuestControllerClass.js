var GuestControllerClass = (function () {
    function GuestControllerClass(guestService, authService, scope) {
        var _this = this;
        this._currentGuestIndex = -1;
        this.initialize = function () {
            _this._cmnCtrl.showPreloader();
            _this._cmnCtrl.hideContent('.main-content');
            _this._guestService.getUser().then(function (data) {
                _this._guests = data;
            }).catch(function (error) {
                Materialize.toast("Error! Can't add guests!", 4000, "red");
            }).finally(function () {
                _this._cmnCtrl.hidePreloader();
                _this._cmnCtrl.showContent('.main-content');
            });
        };
        this.addGuest = function (guest) {
            _this._cmnCtrl.showPreloader();
            _this._cmnCtrl.hideContent('.main-content');
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
                _this._cmnCtrl.hidePreloader();
                _this._cmnCtrl.showContent('.main-content');
            });
        };
        this.updateGuest = function (guest) {
            _this._cmnCtrl.showPreloader();
            _this._cmnCtrl.hideContent('.main-content');
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
                _this._cmnCtrl.hidePreloader();
                _this._cmnCtrl.showContent('.main-content');
            });
        };
        this.deleteGuest = function (guestId) {
            _this._cmnCtrl.showPreloader();
            _this._cmnCtrl.hideContent('.main-content');
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
                _this._cmnCtrl.hidePreloader();
                _this._cmnCtrl.showContent('.main-content');
            });
        };
        this.initModals = function () {
            $('.modal-trigger').leanModal({
                dismissible: true,
                complete: function () {
                    $('.deleteId').val('');
                } // Callback for Modal close
            });
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
        this._authService = authService;
        this._guestService = guestService;
        this._scope = scope;
        this._cmnCtrl = new Application.Controllers.CommonController();
    }
    GuestControllerClass.prototype.createNew = function (guest) {
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
    GuestControllerClass.$inject = ["Application.Services.GuestService",
        "Application.Services.AuthService",
        "$scope"];
    return GuestControllerClass;
})();
