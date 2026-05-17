var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GMCmdListCMD = (function (_super) {
    __extends(GMCmdListCMD, _super);
    function GMCmdListCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_ADMIN_ALL;
        return _this;
    }
    GMCmdListCMD.prototype.processOut = function (pkg) {
        pkg.writeUTF(this.str);
    };
    GMCmdListCMD.prototype.receive = function (pi) {
        var list = [];
        var len = pi.readShort();
        for (var i = 0; i < len; i++) {
            var type = pi.readUTF();
            var cmd = pi.readUTF();
            var desc = pi.readUTF();
            var example = pi.readUTF();
            list.push({ type: type, cmd: cmd, desc: desc, example: example });
        }
        GM.instance.getCMDList(list);
    };
    return GMCmdListCMD;
}(BaseCMD));
__reflect(GMCmdListCMD.prototype, "GMCmdListCMD");
//# sourceMappingURL=GMCmdListCMD.js.map