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
var ClubBFClearCDCMD = (function (_super) {
    __extends(ClubBFClearCDCMD, _super);
    function ClubBFClearCDCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CLUB_BF_CLEAR_CD;
        return _this;
    }
    ClubBFClearCDCMD.prototype.receive = function (pi) {
        // array('name' => 'fight_ts', 'type' => 'int32', 'desc' => '可挑战时间戳(秒)'),
        var model = Manager.model.getClubBF();
        model.cdEndTime = pi.readInt();
        if (model.cd > 0)
            Manager.view.show(101 /* ClubBFClearCDBtn */);
        else {
            Manager.view.hide(101 /* ClubBFClearCDBtn */);
        }
    };
    return ClubBFClearCDCMD;
}(BaseCMD));
__reflect(ClubBFClearCDCMD.prototype, "ClubBFClearCDCMD");
//# sourceMappingURL=ClubBFClearCDCMD.js.map