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
/**
 * BOSS关注协议
 * luzhihong
 * create 2018.1.2
 */
var BossAttentionCMD = /** @class */ (function (_super) {
    __extends(BossAttentionCMD, _super);
    function BossAttentionCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.BOSS_ATTENTION;
        return _this;
    }
    BossAttentionCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this.id);
        pkg.writeByte(this.isAttention ? 1 : 0);
    };
    BossAttentionCMD.prototype.receive = function (pi) {
        var list = [];
        var len = pi.readShort();
        while (len--) {
            list.push(pi.readByte());
        }
        Manager.model.getBoss().setAttentions(list);
    };
    return BossAttentionCMD;
}(BaseCMD));
//# sourceMappingURL=BossAttentionCMD.js.map