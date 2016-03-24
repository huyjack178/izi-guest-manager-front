module Application.Controllers {
    export class AccountController {
        private _accountService: Application.Interfaces.IAccountService;

        static $inject = ["Application.Services.AccountService"];

        constructor(accountService: Application.Services.AccountService) {
            this._accountService = accountService;
        }

        public _accounts: Array<Application.Interfaces.IAccount>;
        private _currentIndex: number = -1;

        initialize = () => {
            this.getAccounts();
        };

        getAccounts = () => {
            this._accountService.getAccounts().then((data: any) => {
                this._accounts = data;
            });
        };

        addAccount = (account: Application.Interfaces.IAccount) => {
            console.log(account);
            this._accountService.createAccount(account)
                .then((response: any): any => {
                    this._accounts.push(account)
                })
        }

        deleteAccount = (userName: string) => {
            this._accountService.deleteAccount(userName)
                .then((response: any): any => {
                    this._accounts.splice(this._currentIndex, 1)
                });
        }

        public initModals = () => {
            CommonController.initModals();
        }

        public openDelModalOf = (index: number) => {
            this._currentIndex = index;
        }

        public getCurrentUserName = (): string => {
            if (this._currentIndex > -1) {
                var currentAccount = this._accounts[this._currentIndex];
                if (currentAccount != null)
                    return currentAccount.username;
            }
        }
    }

    angular.module("Application")
        .controller("Application.Controllers.AccountController", AccountController);
}