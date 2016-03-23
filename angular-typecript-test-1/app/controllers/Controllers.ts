module Application.Controllers {

    export class CommonController {
        constructor() { }

        public showContent(content: string) {
            jQuery(content).show();
        }

        public hideContent(content: string) {
            jQuery(content).hide();
        }

        public showPreloader() {
            jQuery('.preloader').show();
        }

        public hidePreloader() {
            jQuery('.preloader').hide();
        }
    }

    export class GuestController {
        _guestService: Application.Interfaces.IUserService;
        _authService: Application.Interfaces.IAuthService;
        _cmnCtrl: Application.Controllers.CommonController;
        _scope: ng.IScope;

        static $inject = ["Application.Services.GuestService", "Application.Services.AuthService", "$scope"];

        constructor(guestService: Application.Services.GuestService
            , authService: Application.Services.AuthService
            , scope: ng.IScope) {

            this._authService = authService;
            this._guestService = guestService;
            this._scope = scope;
            this._cmnCtrl = new CommonController();
        }

        _guests: Array<Application.Interfaces.IUser>;
        _guestDTO: Application.Interfaces.IUser;
        _currentGuestIndex: number = -1;

        public initialize = () => {
            this._cmnCtrl.showPreloader();
            this._cmnCtrl.hideContent('.main-content');

            this._guestService.getUser().then((data) => {
                this._guests = data

            }).catch((error: any) => {
                Materialize.toast("Error! Can't add guests!", 4000, "red");

            }).finally(() => {
                this._cmnCtrl.hidePreloader();
                this._cmnCtrl.showContent('.main-content');
            });
        }

        public addGuest = (guest: Application.Interfaces.IUser) => {
            this._cmnCtrl.showPreloader();
            this._cmnCtrl.hideContent('.main-content');

            this._guestService.addUser(guest).then((response) => {
                if (response.status == 201) {
                    guest.id = response.data;
                    this._guests.push(this.createNew(guest));
                    Materialize.toast("Success! New guest is created", 4000, "green");
                }
                else {
                    console.log(response.status)
                    Materialize.toast("Error! Can't add guest!", 4000, "red");
                }
            }).catch((error) => {
                Materialize.toast("Error! Can't add guest", 4000, "red");
            }).finally(() => {
                this._cmnCtrl.hidePreloader();
                this._cmnCtrl.showContent('.main-content');
            });
        }

        public updateGuest = (guest: Application.Interfaces.IUser) => {
            this._cmnCtrl.showPreloader();
            this._cmnCtrl.hideContent('.main-content');
            console.log(this._guestDTO);
            this._guestService.updateUser(guest).then((response) => {
                if (response.status == 200) {
                    this._guests[this._currentGuestIndex] = guest;
                    Materialize.toast("Success! Guest is updated", 4000, "green");
                }
                else {
                    console.log(response.status)
                    Materialize.toast("Error! Can't update guest!", 4000, "red");
                }

            }).catch((error) => {
                Materialize.toast("Error! Can't update guest", 4000, "red");
            }).finally(() => {
                this._cmnCtrl.hidePreloader();
                this._cmnCtrl.showContent('.main-content');
            });
        }

        public deleteGuest = (guestId: string) => {
            this._cmnCtrl.showPreloader();
            this._cmnCtrl.hideContent('.main-content');

            this._guestService.deleteUser(guestId).then((response) => {
                if (response.status == 200) {
                    this._guests.splice(this._currentGuestIndex, 1);
                    Materialize.toast("Success! Guest is deleted", 4000, "green");
                }
                else {
                    Materialize.toast("Error! Can't delete guest!", 4000, "red");
                }
            }).catch((error) => {
                Materialize.toast("Error! Can't delete guest", 4000, "red");
            }).finally(() => {
                this._cmnCtrl.hidePreloader();
                this._cmnCtrl.showContent('.main-content');
            });
        }

        public initModals = () => {
            $('.modal-trigger').leanModal({
                dismissible: true,
                complete: function () {
                    $('.deleteId').val('');
                } // Callback for Modal close
            });
        }

        public openEditModalOf = (index: number, guest: Application.Interfaces.IUser) => {
            this._currentGuestIndex = index;
            this._guestDTO = this.createNew(guest);
        }

        public openDelModalOf = (index: number) => {
            this._currentGuestIndex = index;
        }

        public getCurrentGuestId = (): string => {
            if (this._currentGuestIndex > -1) {
                var currentGuest = this._guests[this._currentGuestIndex]
                if (currentGuest != null) {
                    return currentGuest.id;
                }
            }
        }

        public getGuestDTO = (): Application.Interfaces.IUser => {
            return this._guestDTO;
        }

        private createNew(guest: Interfaces.IUser): Interfaces.IUser {
            var newGuest: Application.Interfaces.IUser = {
                fullname: guest.fullname,
                id: guest.id,
                email: guest.email,
                address: guest.address,
                phone: guest.phone,
                hometown: guest.hometown
            }

            return newGuest;
        }
    }

    export class AuthController {
        _authService: Application.Interfaces.IAuthService;
        _scope: ng.IScope;
        _location: ng.ILocationService;
        _cmnCtrl: Application.Controllers.CommonController

        static $inject = ["Application.Services.AuthService", "$scope", "$location"];
        constructor(authService: Application.Interfaces.IAuthService
            , scope: ng.IScope
            , location: ng.ILocationService) {
            this._authService = authService;
            this._scope = scope;
            this._location = location;
            this._cmnCtrl = new CommonController();
            this._cmnCtrl.hidePreloader();
        }

        public login = (userName: string, password: string) => {
            this._cmnCtrl.showPreloader();

            this._authService.login(userName, password)
                .then((response: any) => {
                    if (response.status == 200) {
                        this._authService.setCookies(Constants.COOKIE_NAME, response.data, 60);
                        this._authService.setCookies(Constants.COOKIE_USERNAME, userName, 60);
                        this._location.path("/guest");
                    }
                    else {
                        Materialize.toast("Wrong UserName or Password", 4000, "red rounded");
                    }
                }).catch((error: any) => {
                    Materialize.toast("Wrong UserName or Password", 4000, "red rounded");
                }).finally(() => {
                    this._cmnCtrl.hidePreloader();
                });
        }

        public logout = () => {
            this._authService.logout()
            this._location.path("/login")
        }

        public getUserName = (): string => {
            return this._authService.getCookies(Constants.COOKIE_USERNAME);
        }
    }

    angular.module("Application")
        .controller("Application.Controllers.GuestController", GuestController)
        .controller("Application.Controllers.CommonController", CommonController)
        .controller("Application.Controllers.AuthController", AuthController);
}