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
 * 盟会战结算协议
 * luzhihong
 * create 2018.2.1
 */
var ClubBFResultCMD = (function (_super) {
    __extends(ClubBFResultCMD, _super);
    function ClubBFResultCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CLUB_BF_RESULT;
        return _this;
    }
    ClubBFResultCMD.prototype.receive = function (pi) {
        // array('name' => 'def_gtype', 'type' => 'int8', 'desc' => '防守方盟会类型'),
        // array('name' => 'win_gtype', 'type' => 'int8', 'desc' => '占领城池的盟会类型'),
        // array('name' => 'win_cnt', 'type' => 'int32', 'desc' => '连胜数'),
        // array('name' => 'score', 'type' => 'int32', 'desc' => '个人积分数'),
        // array('name' => 'guild_rank', 'type' => 'int32', 'desc' => '盟会积分排名'),
        // array('name'=>'items','type'=>'arr',  'record'=>'item_cli','desc'=>'获得返回','vars' => array(
        //     array('name'=>'base_id', 'type'=>'int32', 'desc'=>'物品id'),
        //     array('name'=>'bind', 'type'=>'int8', 'desc'=>'是否绑定'),
        //     array('name'=>'quantity', 'type'=>'int32', 'desc'=>'数量'),
        // )),
        // array('name' => 'guild_score_list', 'type' => 'arr', 'desc' => '盟会积分', 'vars' => array(
        //     array('name' => 'gtype', 'type' => 'int8', 'desc' => '盟会类型'),
        //     array('name' => 'score', 'type' => 'int32', 'desc' => '盟会积分'),
        // )),
        var defClubType = pi.readByte();
        var winClubType = pi.readByte();
        var winCount = pi.readInt();
        var score = pi.readInt();
        var rank = pi.readInt();
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
        var clubScores = {};
        len0 = pi.readShort();
        while (len0--) {
            clubScores[pi.readByte()] = pi.readInt();
        }
        Manager.view.show(99 /* ClubBFResult */, defClubType, winClubType, winCount, score, rank, infos, clubScores);
    };
    return ClubBFResultCMD;
}(BaseCMD));
__reflect(ClubBFResultCMD.prototype, "ClubBFResultCMD");
//# sourceMappingURL=ClubBFResultCMD.js.map