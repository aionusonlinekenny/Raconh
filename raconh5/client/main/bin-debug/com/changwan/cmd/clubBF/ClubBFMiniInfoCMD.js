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
 * 战场内数据协议
 * luzhihong
 * create 2018.2.1
 */
var ClubBFMiniInfoCMD = (function (_super) {
    __extends(ClubBFMiniInfoCMD, _super);
    function ClubBFMiniInfoCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CLUB_BF_MINI_INFO;
        return _this;
    }
    ClubBFMiniInfoCMD.prototype.receive = function (pi) {
        // array('name' => 'boss_hp', 'type' => 'int32', 'desc' => 'boss当前血量'),
        // array('name' => 'boss_max_hp', 'type' => 'int32', 'desc' => 'boss最大血量'),
        // array('name'=> 'score', 'type' => 'int32', 'desc' => '个人积分数'),
        // array('name' => 'guild_rank', 'type' => 'int32', 'desc' => '盟会积分排名'),
        // array('name' => 'atk_cnt', 'type' => 'int32', 'desc' => '进攻人数'),
        // array('name' => 'def_cnt', 'type' => 'int32', 'desc' => '防守人数'),
        // array('name' => 'guild_score_list', 'type' => 'arr', 'desc' => '盟会积分', 'vars' => array(
        //     array('name' => 'gtype', 'type' => 'int8', 'desc' => '盟会类型'),
        //     array('name' => 'score', 'type' => 'int32', 'desc' => '盟会积分'),
        // )),
        var data = {};
        data["bossHP"] = pi.readInt64();
        data["bossMaxHP"] = pi.readInt64();
        data["score"] = pi.readInt();
        data["rank"] = pi.readInt();
        data["atkCount"] = pi.readInt();
        data["defCount"] = pi.readInt();
        var clubScores = {};
        var len = pi.readShort();
        while (len--) {
            clubScores[pi.readByte()] = pi.readInt();
        }
        data["clubScores"] = clubScores;
        Manager.model.getClubBF().score = data["score"];
        Manager.model.getClubBF().dispatchEvent(new ClubBFEvent(ClubBFEvent.MINI_INFOS, data));
    };
    return ClubBFMiniInfoCMD;
}(BaseCMD));
__reflect(ClubBFMiniInfoCMD.prototype, "ClubBFMiniInfoCMD");
//# sourceMappingURL=ClubBFMiniInfoCMD.js.map