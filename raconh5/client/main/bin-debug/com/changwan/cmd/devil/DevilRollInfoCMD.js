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
 * 魔神降临摇奖数据
 * liangyan
 * create 2018-04-10
*/
var DevilRollInfoCMD = (function (_super) {
    __extends(DevilRollInfoCMD, _super);
    function DevilRollInfoCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.DEVIL_ROLL_INFO;
        return _this;
    }
    DevilRollInfoCMD.prototype.receive = function (pi) {
        var maxName = pi.readUTF();
        var maxValue = pi.readShort();
        var view = Manager.view.getView(153 /* DevilRollDiceView */);
        if (view)
            view.updateMax(maxName, maxValue);
    };
    return DevilRollInfoCMD;
}(BaseCMD));
__reflect(DevilRollInfoCMD.prototype, "DevilRollInfoCMD");
//# sourceMappingURL=DevilRollInfoCMD.js.map