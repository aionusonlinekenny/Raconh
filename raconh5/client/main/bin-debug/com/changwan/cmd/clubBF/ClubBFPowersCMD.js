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
 * 请求盟会战力协议
 * luzhihong
 * create 2018.2.1
 */
var ClubBFPowersCMD = (function (_super) {
    __extends(ClubBFPowersCMD, _super);
    function ClubBFPowersCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CLUB_BF_POWERS;
        return _this;
    }
    ClubBFPowersCMD.prototype.receive = function (pi) {
        // array('name' => 'list','type' => 'arr', 'tuple' => 'true','desc' => '对象列表(自行排序吧)','vars' => array(
        //     array('name' => 'gtype', 'type' => 'int8', 'desc' => '盟会类型'),
        //     array('name' => 'fc', 'type' => 'int64', 'desc' => '盟会战力'),
        // )),
        var clubPowers = [];
        var len = pi.readShort();
        while (len--) {
            clubPowers.push({ id: pi.readByte(), power: pi.readInt64() });
        }
        clubPowers.sort(this.sortByPower);
        Manager.model.getClubBF().dispatchEvent(new ClubBFEvent(ClubBFEvent.CLUB_POWERS, clubPowers));
    };
    ClubBFPowersCMD.prototype.sortByPower = function (obj0, obj1) {
        if (obj0["power"] > obj1["power"])
            return -1;
        if (obj0["power"] < obj1["power"])
            return 1;
        return 0;
    };
    return ClubBFPowersCMD;
}(BaseCMD));
__reflect(ClubBFPowersCMD.prototype, "ClubBFPowersCMD");
//# sourceMappingURL=ClubBFPowersCMD.js.map