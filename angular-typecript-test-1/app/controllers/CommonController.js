var Application;
(function (Application) {
    var Controllers;
    (function (Controllers) {
        var CommonController = (function () {
            function CommonController() {
            }
            CommonController.showContent = function (content) {
                jQuery(content).show();
            };
            CommonController.hideContent = function (content) {
                jQuery(content).hide();
            };
            CommonController.showPreloader = function () {
                jQuery('.preloader').show();
            };
            CommonController.hidePreloader = function () {
                jQuery('.preloader').hide();
            };
            CommonController.initModals = function () {
                $('.modal-trigger').leanModal({
                    dismissible: true,
                    complete: function () {
                        $('.deleteId').val('');
                    } // Callback for Modal close
                });
            };
            return CommonController;
        })();
        Controllers.CommonController = CommonController;
        angular.module("Application")
            .controller("Application.Controllers.CommonController", CommonController);
    })(Controllers = Application.Controllers || (Application.Controllers = {}));
})(Application || (Application = {}));
//# sourceMappingURL=CommonController.js.map