var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RoleInfo = (function () {
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
__reflect(RoleInfo.prototype, "RoleInfo", ["cw.IPool", "cw.IDispose"]);
//# sourceMappingURL=RoleInfo.js.map