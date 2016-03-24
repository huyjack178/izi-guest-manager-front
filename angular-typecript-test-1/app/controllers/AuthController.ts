module Application.Controllers {
    export class AuthController {
        _authService: Application.Interfaces.IAuthService;
        _scope: ng.IScope;
        _location: ng.ILocationService;

        static $inject = ["Application.Services.AuthService", "$scope", "$location"];
        constructor(authService: Application.Interfaces.IAuthService
            , scope: ng.IScope
            , location: ng.ILocationService) {
            this._authService = authService;
            this._scope = scope;
            this._location = location;
            CommonController.hidePreloader();
        }

        public login = (userName: string, password: string) => {
            CommonController.showPreloader();

            this._authService.login(userName, password)
                .then((response: any) => {
                    if (response.status == 200) {
                        this._authService.setCookies(Application.Constants.COOKIE_NAME, response.data, 60);
                        this._authService.setCookies(Application.Constants.COOKIE_USERNAME, userName, 60);
                        this._location.path("/guest");
                    }
                    else {
                        Materialize.toast("Wrong UserName or Password", 4000, "red rounded");
                    }
                }).catch((error: any) => {
                    Materialize.toast("Wrong UserName or Password", 4000, "red rounded");
                }).finally(() => {
                    CommonController.hidePreloader();
                });
        }

        public logout = () => {
            this._authService.logout()
            this._location.path("/login")
        }

        public getUserName = (): string => {
            return this._authService.getCookies(Application.Constants.COOKIE_USERNAME);
        }
    }

    angular.module("Application")
        .controller("Application.Controllers.AuthController", AuthController);
}