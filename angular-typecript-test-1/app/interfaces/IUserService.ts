module Application.Interfaces {
    export interface IUserService {
        getUser: () => ng.IPromise<any>

        addUser: (user: IUser) => ng.IPromise<any>

        updateUser: (user: IUser) => ng.IPromise<any>

        deleteUser: (id: string) => ng.IPromise<any>
    }

    export interface IUser {
        id: string
        fullname: string
        email: string
        phone: string
        address: string
        hometown: string
    }
}

module Application.Models {
    export class GuestModel implements Interfaces.IUser {
        id: string
        fullname: string
        email: string
        phone: string
        address: string
        hometown: string

        constructor() {
            this.id = "";
        }
    }
}