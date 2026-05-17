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
 * 挑战BOSS结算协议
 * luzhihong
 * create 2018.2.1
 */
var ClubBFChallengeBossResultCMD = /** @class */ (function (_super) {
    __extends(ClubBFChallengeBossResultCMD, _super);
    function ClubBFChallengeBossResultCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CLUB_BF_CHALLENGE_BOSS_RESULT;
        return _this;
    }
    ClubBFChallengeBossResultCMD.prototype.receive = function (pi) {
        // array('name' => 'combat_res', 'type' => 'int8', 'desc' => '战斗结果，0失败，1胜利'),
        // array('name' => 'hurt', 'type' => 'int64', 'desc' => '对boss造成的伤害值'),
        // array('name' => 'boss_hp', 'type' => 'int64', 'desc' => 'boss剩余血量'),
        // array('name' => 'boss_max_hp', 'type' => 'int64', 'desc' => 'boss最大血量'),
        // array('name'=>'items','type'=>'arr',  'record'=>'item_cli','desc'=>'获得返回','vars' => array(
        //     array('name'=>'base_id', 'type'=>'int32', 'desc'=>'物品id'),
        //     array('name'=>'bind', 'type'=>'int8', 'desc'=>'是否绑定'),
        //     array('name'=>'quantity', 'type'=>'int32', 'desc'=>'数量'),
        // )),
        var data = {};
        data["isWin"] = pi.readByte() != 0;
        data["hurt"] = pi.readInt64();
        data["boss_hp"] = pi.readInt64();
        data["boss_max_hp"] = pi.readInt64();
        var infos = [];
        var len0 = pi.readShort();
        var info;
        while (len0--) {
            info = new ItemsModelInfo();
            info.base_id = pi.readInt();
            info.bind = pi.readByte() != 1;
            info.quantity = pi.readInt();
            // let len1:number = pi.readShort();
            // let exarr:ExattrItemsinfo
            // while(len1--)
            // {
            //     exarr = new ExattrItemsinfo();
            //     exarr.type = pi.readShort();
            //     exarr.target = pi.readInt();
            //     exarr.value = pi.readInt();
            //     exarr.desc = pi.readUTF();
            //     info.infoList.push(exarr);
            // }
            infos.push(info);
        }
        infos.sort(CopyModel.sortResultItems);
        data["infos"] = infos;
        Manager.model.getAuto().autoHook = false;
        Manager.view.show(98 /* ClubBF1v1Result */, true, data);
    };
    return ClubBFChallengeBossResultCMD;
}(BaseCMD));
//# sourceMappingURL=ClubBFChallengeBossResultCMD.js.map