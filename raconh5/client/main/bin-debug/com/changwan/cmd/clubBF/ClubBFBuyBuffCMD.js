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
 * 清除挑战cd协议
 * luzhihong
 * create 2018.2.1
 */
var ClubBFBuyBuffCMD = (function (_super) {
    __extends(ClubBFBuyBuffCMD, _super);
    function ClubBFBuyBuffCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CLUB_BF_BUY_BUFF;
        return _this;
    }
    ClubBFBuyBuffCMD.prototype.receive = function (pi) {
        // array('name' => 'res', 'type' => 'int8', 'desc' => '结果，0失败，1成功，2其他人已购买'),
        var state = pi.readByte();
        Manager.model.getClubBF().clubBFHasBuy = state != 0;
    };
    return ClubBFBuyBuffCMD;
}(BaseCMD));
__reflect(ClubBFBuyBuffCMD.prototype, "ClubBFBuyBuffCMD");
//# sourceMappingURL=ClubBFBuyBuffCMD.js.map