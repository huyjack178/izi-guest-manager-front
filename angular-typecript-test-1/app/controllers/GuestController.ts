module Application.Controllers {
    export class GuestController {

        _guestService: Application.Interfaces.IUserService;
        _scope: ng.IScope;

        static $inject = ["Application.Services.GuestService", "$scope"];

        constructor(guestService: Application.Services.GuestService, scope: ng.IScope) {
            this._guestService = guestService;
            this._scope = scope;
        }

        _guests: Array<Application.Interfaces.IUser>;
        _guestDTO: Application.Interfaces.IUser;
        _currentGuestIndex: number = -1;

        public initialize = () => {
            this._guestService.getUser().then((data) => {
                this._guests = data
            });
        }

        public addGuest = (guest: Application.Interfaces.IUser) => {
            this._guestService.addUser(guest).then((response) => {
                if (response.status == 201) {
                    guest.id = response.data;
                    this._guests.push(this.createNew(guest));

                    Materialize.toast("Success! New guest is created", 4000, "green");
                }
                else {
                    console.log(response.status)
                    Materialize.toast("Error!" + response.status, 4000, "red");
                }
            });
        }

        public updateGuest = (guest: Application.Interfaces.IUser) => {
            this._guestService.updateUser(guest).then((response) => {
                if (response.status == 200) {
                    this._guests[this._currentGuestIndex] = guest;
                    Materialize.toast("Success! Guest is updated", 4000, "green");
                }
            });
        }

        public deleteGuest = (guestId: string) => {
            this._guestService.deleteUser(guestId).then((response) => {
                if (response.status == 200) {
                    this._guests.splice(this._currentGuestIndex, 1);
                    Materialize.toast("Success! Guest is deleted", 4000, "green");
                }
                else {
                    Materialize.toast("Error!" + response.status, 4000, "red");
                }
            });
        }

        public initModals = () => {
            $('.modal-trigger').leanModal({
                complete: function () { $('.deleteId').val('') } // Callback for Modal close
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
                return this._guests[this._currentGuestIndex].id;
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

    angular.module("Application").controller("Application.Controllers.GuestController", GuestController);
}