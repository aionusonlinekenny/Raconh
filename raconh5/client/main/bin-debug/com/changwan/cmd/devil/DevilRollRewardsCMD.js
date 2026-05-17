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
/**
 * 魔神降临摇奖奖励
 * liangyan
 * create 2018-04-21
*/
var DevilRollRewardsCMD = (function (_super) {
    __extends(DevilRollRewardsCMD, _super);
    function DevilRollRewardsCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.DEVIL_ROLL_REWARDS;
        return _this;
    }
    DevilRollRewardsCMD.prototype.receive = function (pi) {
        var count = pi.readShort();
        var infos = new Array();
        var info;
        while (count > 0) {
            info = new ItemsModelInfo();
            info.base_id = pi.readInt();
            info.bind = pi.readByte() == 1;
            info.quantity = pi.readInt();
            var extraCount = pi.readShort();
            var extraInfo = void 0;
            for (var i = 0; i < extraCount; i++) {
                extraInfo = new ExattrItemsinfo();
                extraInfo.type = pi.readShort();
                extraInfo.target = pi.readInt();
                extraInfo.value = pi.readInt();
                extraInfo.desc = pi.readUTF();
                info.infoList.push(extraInfo);
            }
            infos.push(info);
            count--;
        }
        Manager.control.getDrop().showAlert(infos);
    };
    return DevilRollRewardsCMD;
}(BaseCMD));
__reflect(DevilRollRewardsCMD.prototype, "DevilRollRewardsCMD");
//# sourceMappingURL=DevilRollRewardsCMD.js.map