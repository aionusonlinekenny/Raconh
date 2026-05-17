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
 * 请求盟会战数据协议
 * luzhihong
 * create 2018.2.1
 */
var ClubBFInfoCMD = (function (_super) {
    __extends(ClubBFInfoCMD, _super);
    function ClubBFInfoCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CLUB_BF_INFO;
        return _this;
    }
    ClubBFInfoCMD.prototype.receive = function (pi) {
        // array('name' => 'gtype', 'type' => 'int8', 'desc' => '下次盟会战，盟会类型(类型为0则是第一场)'),
        // array('name' => 'win_cnt', 'type' => 'int32', 'desc' => '连胜数'),
        // array('name' => 'enter_ts', 'type' => 'int32', 'desc' => '可进入战场时间戳(秒)'),
        var clubID = pi.readByte();
        var winCount = pi.readInt();
        var enterCD = pi.readInt();
        Manager.model.getClubBF().dispatchEvent(new ClubBFEvent(ClubBFEvent.INFO_UPDATE, { clubID: clubID, winCount: winCount, enterCD: enterCD }));
    };
    return ClubBFInfoCMD;
}(BaseCMD));
__reflect(ClubBFInfoCMD.prototype, "ClubBFInfoCMD");
//# sourceMappingURL=ClubBFInfoCMD.js.map