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
 * 请求挑战列表协议
 * luzhihong
 * create 2018.2.1
 */
var ClubBFListCMD = /** @class */ (function (_super) {
    __extends(ClubBFListCMD, _super);
    function ClubBFListCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CLUB_BF_LIST;
        return _this;
    }
    ClubBFListCMD.prototype.receive = function (pi) {
        //  array('name' => 'def_list', 'type' => 'arr', 'tuple' => 'true', 'desc' => '防守方列表（自行排序）', 'vars' => array(
        //                     array('name' => 'id', 'type' => 'int64', 'desc' => '角色id'),
        //                     array('name' => 'name', 'type' => 'string', 'desc' => '角色名'),
        //                     array('name' => 'career', 'type' => 'int8', 'desc' => '职业'),
        //                     array('name' => 'fc', 'type' => 'int32', 'desc' => '战力'),
        //                     array('name' => 'win_cnt', 'type' => 'int16', 'desc' => '连胜次数'),
        //                 )),
        //                 array('name' => 'atk_list', 'type' => 'arr', 'tuple' => 'true', 'desc' => '攻击方列表（自行排序）', 'vars' => array(
        //                     array('name' => 'id', 'type' => 'int64', 'desc' => '角色id'),
        //                     array('name' => 'name', 'type' => 'string', 'desc' => '角色名'),
        //                     array('name' => 'career', 'type' => 'int8', 'desc' => '职业'),
        //                     array('name' => 'fc', 'type' => 'int32', 'desc' => '战力'),
        //                     array('name' => 'win_cnt', 'type' => 'int16', 'desc' => '连胜次数'),
        //                 )),
        //                 array('name' => 'robotlist', 'type' => 'arr', 'tuple' => 'true', 'desc' => '攻击方方机器人列表（自行排序）', 'vars' => array(
        //                     array('name' => 'id', 'type' => 'int32', 'desc' => '机器人唯一id'),
        //                     array('name' => 'id', 'type' => 'int32', 'desc' => '机器人表格id'),
        //                 )),
        var defList = [];
        var info;
        var len = pi.readShort();
        while (len--) {
            info = new ClubBFPlayerInfo(true);
            info.parsePlayer(pi);
            defList.push(info);
        }
        var atkList = [];
        len = pi.readShort();
        while (len--) {
            info = new ClubBFPlayerInfo(false);
            info.parsePlayer(pi);
            atkList.push(info);
        }
        len = pi.readShort();
        while (len--) {
            info = new ClubBFPlayerInfo(false);
            info.parseRobot(pi);
            atkList.push(info);
        }
        Manager.model.getClubBF().dispatchEvent(new ClubBFEvent(ClubBFEvent.PLAYER_LIST_UPDATE, { defList: defList, atkList: atkList }));
    };
    return ClubBFListCMD;
}(BaseCMD));
//# sourceMappingURL=ClubBFListCMD.js.map