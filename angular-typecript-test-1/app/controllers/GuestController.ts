module Application.Controllers {
    export class GuestController {

        _guestService: Application.Interfaces.IUserService;

        static $inject = ["Application.Services.GuestService"];

        constructor(guestService: Application.Services.GuestService) {
            this._guestService = guestService;
        }

        guests: Array<Application.Interfaces.IUser>;
        
        private initialize = () => {
            this._guestService.getUser().then((data) => {
                this.guests = data
            });
        }

        private addGuest = (guest: Application.Interfaces.IUser) => {
            this._guestService.addUser(guest).then((data) => {
                console.log(data)
            });
        }
    }

    angular.module("Application").controller("Application.Controllers.GuestController", GuestController);
}