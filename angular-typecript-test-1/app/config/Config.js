var Application;
(function (Application) {
    var Configs;
    (function (Configs) {
        var ServerConfig = (function () {
            function ServerConfig() {
            }
            ServerConfig.ServerUrl = "https://izi-manager-server.herokuapp.com/";
            return ServerConfig;
        })();
        Configs.ServerConfig = ServerConfig;
    })(Configs = Application.Configs || (Application.Configs = {}));
})(Application || (Application = {}));
