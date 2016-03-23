var Application;
(function (Application) {
    var Constants = (function () {
        function Constants() {
        }
        Object.defineProperty(Constants, "COOKIE_NAME", {
            get: function () { return "member"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Constants, "COOKIE_USERNAME", {
            get: function () { return "iziusername"; },
            enumerable: true,
            configurable: true
        });
        return Constants;
    })();
    Application.Constants = Constants;
})(Application || (Application = {}));
