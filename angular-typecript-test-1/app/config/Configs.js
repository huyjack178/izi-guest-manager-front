var Application;
(function (Application) {
    var Configs;
    (function (Configs) {
        var ServerConfig = (function () {
            function ServerConfig() {
            }
            //public static ServerUrl: string = "https://izi-manager-server.herokuapp.com/";
            ServerConfig.ServerUrl = "http://localhost:8001/";
            return ServerConfig;
        })();
        Configs.ServerConfig = ServerConfig;
    })(Configs = Application.Configs || (Application.Configs = {}));
})(Application || (Application = {}));
//# sourceMappingURL=Configs.js.map