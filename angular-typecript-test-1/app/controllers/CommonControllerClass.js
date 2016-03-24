var CommonControllerClass = (function () {
    function CommonControllerClass() {
    }
    CommonControllerClass.prototype.showContent = function (content) {
        jQuery(content).show();
    };
    CommonControllerClass.prototype.hideContent = function (content) {
        jQuery(content).hide();
    };
    CommonControllerClass.prototype.showPreloader = function () {
        jQuery('.preloader').show();
    };
    CommonControllerClass.prototype.hidePreloader = function () {
        jQuery('.preloader').hide();
    };
    return CommonControllerClass;
})();
