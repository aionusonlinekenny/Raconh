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
 * 挑战玩家结算协议
 * luzhihong
 * create 2018.2.1
 */
var ClubBF1v1ResultCMD = (function (_super) {
    __extends(ClubBF1v1ResultCMD, _super);
    function ClubBF1v1ResultCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CLUB_BF_1V1_RESULT;
        return _this;
    }
    ClubBF1v1ResultCMD.prototype.receive = function (pi) {
        // array('name' => 'combat_res', 'type' => 'int8', 'desc' => '战斗结果，0失败，1胜利'),
        // array('name' => 'self_fc', 'type' => 'int32', 'desc' => '自己的战力'),
        // array('name' => 'tar_fc', 'type' => 'int32', 'desc' => '对方战力'),
        // array('name' => 'name', 'type' => 'string', 'desc' => '挑战的玩家名'),
        // array('name'=>'items','type'=>'arr',  'record'=>'item_cli','desc'=>'获得返回','vars' => array(
        //     array('name'=>'base_id', 'type'=>'int32', 'desc'=>'物品id'),
        //     array('name'=>'bind', 'type'=>'int8', 'desc'=>'是否绑定'),
        //     array('name'=>'quantity', 'type'=>'int32', 'desc'=>'数量'),
        // )),
        var data = {};
        data["isWin"] = pi.readByte() != 0;
        data["myPower"] = pi.readInt();
        data["enemyPower"] = pi.readInt();
        data["enemyName"] = pi.readUTF();
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
        Manager.view.show(98 /* ClubBF1v1Result */, false, data);
        Manager.control.getClubBF().hidePKHead();
    };
    return ClubBF1v1ResultCMD;
}(BaseCMD));
__reflect(ClubBF1v1ResultCMD.prototype, "ClubBF1v1ResultCMD");
//# sourceMappingURL=ClubBF1v1ResultCMD.js.map