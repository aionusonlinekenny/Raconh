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
 * 魔神降临通知摇奖
 * liangyan
 * create 2018-04-10
*/
var DevilNoticeRollCMD = (function (_super) {
    __extends(DevilNoticeRollCMD, _super);
    function DevilNoticeRollCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.DEVIL_NOTICE_ROLL;
        return _this;
    }
    DevilNoticeRollCMD.prototype.receive = function (pi) {
        Manager.view.show(153 /* DevilRollDiceView */, true);
        var endTime = pi.readInt();
        var now = Manager.model.getLogin().serverTimeInfo.serverTime / 1000;
        var delay = Math.round(endTime - now);
        if (delay > 0)
            Manager.model.getDevil().dispatchEvent(new DevilEvent(DevilEvent.DEVIL_ROLL_MAX_UPDATE, delay));
        else
            Manager.view.hide(153 /* DevilRollDiceView */);
    };
    return DevilNoticeRollCMD;
}(BaseCMD));
__reflect(DevilNoticeRollCMD.prototype, "DevilNoticeRollCMD");
//# sourceMappingURL=DevilNoticeRollCMD.js.map