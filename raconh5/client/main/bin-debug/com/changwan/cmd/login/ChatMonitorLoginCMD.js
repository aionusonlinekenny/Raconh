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
// TypeScript file
var ChatMonitorLoginCMD = (function (_super) {
    __extends(ChatMonitorLoginCMD, _super);
    function ChatMonitorLoginCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CHAT_MONITOR_LOGIN;
        return _this;
    }
    ChatMonitorLoginCMD.prototype.processOut = function (pkg) {
        pkg.writeInt(this.time);
        pkg.writeUTF(this.account);
        pkg.writeUTF(this.sign);
    };
    return ChatMonitorLoginCMD;
}(BaseCMD));
__reflect(ChatMonitorLoginCMD.prototype, "ChatMonitorLoginCMD");
//# sourceMappingURL=ChatMonitorLoginCMD.js.map