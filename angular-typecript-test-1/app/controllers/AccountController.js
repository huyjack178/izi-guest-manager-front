var Application;
(function (Application) {
    var Controllers;
    (function (Controllers) {
        var AccountController = (function () {
            function AccountController(accountService) {
                var _this = this;
                this._currentIndex = -1;
                this.initialize = function () {
                    _this.getAccounts();
                };
                this.getAccounts = function () {
                    _this._accountService.getAccounts().then(function (data) {
                        _this._accounts = data;
                    });
                };
                this.addAccount = function (account) {
                    console.log(account);
                    _this._accountService.createAccount(account)
                        .then(function (response) {
                        _this._accounts.push(account);
                    });
                };
                this.deleteAccount = function (userName) {
                    _this._accountService.deleteAccount(userName)
                        .then(function (response) {
                        _this._accounts.splice(_this._currentIndex, 1);
                    });
                };
                this.initModals = function () {
                    Controllers.CommonController.initModals();
                };
                this.openDelModalOf = function (index) {
                    _this._currentIndex = index;
                };
                this.getCurrentUserName = function () {
                    if (_this._currentIndex > -1) {
                        var currentAccount = _this._accounts[_this._currentIndex];
                        if (currentAccount != null)
                            return currentAccount.username;
                    }
                };
                this._accountService = accountService;
            }
            AccountController.$inject = ["Application.Services.AccountService"];
            return AccountController;
        })();
        Controllers.AccountController = AccountController;
        angular.module("Application")
            .controller("Application.Controllers.AccountController", AccountController);
    })(Controllers = Application.Controllers || (Application.Controllers = {}));
})(Application || (Application = {}));
//# sourceMappingURL=AccountController.js.map