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
 * 进入战场协议
 * luzhihong
 * create 2018.2.1
 */
var ClubBFEnterCMD = /** @class */ (function (_super) {
    __extends(ClubBFEnterCMD, _super);
    function ClubBFEnterCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CLUB_BF_ENTER;
        return _this;
    }
    ClubBFEnterCMD.prototype.receive = function (pi) {
        // array('name' => 'def_gtype', 'type' => 'int8', 'desc' => '防守方盟会类型'),
        // array('name' => 'atk_buff_id', 'type' => 'int32', 'desc' => '攻击方战意buff_id'),
        // array('name' => 'atk_buff_lev', 'type' => 'int8', 'desc' => '攻击方战意buff等级'),
        var defClubType = pi.readByte();
        var buffID = pi.readInt();
        var buffLv = pi.readByte();
        var winCount = pi.readInt();
        var model = Manager.model.getClubBF();
        model.defClubType = defClubType;
        model.winCount = winCount;
        if (buffID > 0)
            model.atkBuffCVO = BuffCVO.getCVO(buffID, buffLv);
        else
            model.atkBuffCVO = null;
        Manager.view.show(100 /* ClubBFMiniView */);
    };
    return ClubBFEnterCMD;
}(BaseCMD));
//# sourceMappingURL=ClubBFEnterCMD.js.map