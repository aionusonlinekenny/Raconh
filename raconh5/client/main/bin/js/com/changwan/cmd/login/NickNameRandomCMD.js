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
// 随机名字
var NickNameRandomCMD = /** @class */ (function (_super) {
    __extends(NickNameRandomCMD, _super);
    function NickNameRandomCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.NICKNAME_RONDOM;
        return _this;
    }
    NickNameRandomCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this.career);
        pkg.writeInt(this.serverID);
    };
    NickNameRandomCMD.prototype.receive = function (pi) {
        //错误码:0-成功，-1-失败，-2名字用完了
        var code = pi.readByte();
        var name = pi.readUTF();
        switch (code) {
            case 0:
                Manager.model.getLogin().dispatchEvent(new LoginEvent(LoginEvent.RANDOM_NAME, name));
                break;
            case -1:
                alert("失败");
                FloatTips.addTips("失败");
                break;
            case -2:
                alert("名字用完了");
                break;
            default:
                break;
        }
    };
    return NickNameRandomCMD;
}(BaseCMD));
//# sourceMappingURL=NickNameRandomCMD.js.map