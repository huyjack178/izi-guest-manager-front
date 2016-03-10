module Application.Interfaces {
    export interface IUserService {
        getUser: () => ng.IPromise<any>
    }

    export interface IUser {
        fullname: string
        email: string
        phone: string
        address: string
        hometown: string
    }
}