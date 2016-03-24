module Application.Controllers {
    export class GuestController {
        _guestService: Application.Interfaces.IUserService;

        static $inject = ["Application.Services.GuestService"];

        constructor(guestService: Application.Services.GuestService
            , authService: Application.Services.AuthService) {
            this._guestService = guestService;
        }

        _guests: Array<Application.Interfaces.IUser>;
        _guestDTO: Application.Interfaces.IUser;
        _currentGuestIndex: number = -1;

        public initialize = () => {
            CommonController.showPreloader();
            CommonController.hideContent('.main-content');

            this._guestService.getUser().then((data) => {
                this._guests = data
            }).catch((error: any) => {
                Materialize.toast("Error! Can't add guests!", 4000, "red");
            }).finally(() => {
                CommonController.hidePreloader();
                CommonController.showContent('.main-content');
            });
        }

        public addGuest = (guest: Application.Interfaces.IUser) => {
            CommonController.showPreloader();
            CommonController.hideContent('.main-content');

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
                CommonController.hidePreloader();
                CommonController.showContent('.main-content');
            });
        }

        public updateGuest = (guest: Application.Interfaces.IUser) => {
            CommonController.showPreloader();
            CommonController.hideContent('.main-content');
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
                CommonController.hidePreloader();
                CommonController.showContent('.main-content');
            });
        }

        public deleteGuest = (guestId: string) => {
            CommonController.showPreloader();
            CommonController.hideContent('.main-content');

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
                CommonController.hidePreloader();
                CommonController.showContent('.main-content');
            });
        }

        public initModals = () => {
            CommonController.initModals();
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

        private createNew(guest: Application.Interfaces.IUser): Application.Interfaces.IUser {
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

    angular.module("Application")
        .controller("Application.Controllers.GuestController", GuestController);
}