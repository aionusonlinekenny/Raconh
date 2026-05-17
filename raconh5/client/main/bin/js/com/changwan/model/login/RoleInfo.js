var RoleInfo = /** @class */ (function () {
    function RoleInfo() {
    }
    RoleInfo.prototype.reuse = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    RoleInfo.prototype.unuse = function () {
        this.serverID = 0;
        this.userName = "";
        this.id = 0;
    };
    RoleInfo.prototype.dispose = function () {
    };
    return RoleInfo;
}());
//# sourceMappingURL=RoleInfo.js.map