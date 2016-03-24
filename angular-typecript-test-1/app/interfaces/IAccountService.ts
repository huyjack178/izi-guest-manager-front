module Application.Interfaces {
    export interface IAccountService {
        getAccounts: () => ng.IPromise<any>

        getAccount: () => ng.IPromise<any>

        createAccount: (account: IAccount) => ng.IPromise<any>

        updateAccount: (account: IAccount) => ng.IPromise<any>

        deleteAccount: (userName: string) => ng.IPromise<any>
    }

    export interface IAccount {
        username: string;

        password: string;

        role: string;
    }
}