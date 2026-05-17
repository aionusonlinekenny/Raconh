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
 * 副本结算协议
 * luzhihong
 * create 2017.12.4
 */
var CopyResultCMD = (function (_super) {
    __extends(CopyResultCMD, _super);
    function CopyResultCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.COPY_RESULT;
        return _this;
    }
    CopyResultCMD.prototype.receive = function (pi) {
        // array('name' => 'id', 'type' => 'int32', 'desc' => '副本ID'),
        // array('name' => 'res', 'type' => 'int8', 'desc' => '0 失败 1 成功'),
        // array('name'=>'list', 'type'=>'arr', 'record'=>'item', 'desc'=>'奖励', 'vars'=>array(
        //     array('name' => 'base_id', 'type' => 'int32', 'desc' => '物品基础ID'),
        //     array('name' => 'bind', 'type' => 'int8', 'desc' => '是否绑定'),
        //     array('name' => 'quantity', 'type' => 'int32', 'desc' => '数量'),
        //     array('name' => 'exattr', 'type' => 'arr', 'record' => 'exattr', 'desc' => '特殊信息','vars'=> array(
        //         array('name' => 'type', 'type' => 'int16', 'desc' => '信息类型'),
        //         array('name' => 'target', 'type' => 'int32', 'desc' => '信息目标'),
        //         array('name' => 'value', 'type' => 'int32', 'desc' => '信息数字值'),
        //         array('name' => 'desc', 'type' => 'string', 'desc' => '信息字符值(如装备刻字, 物品署名字)'),
        //     )),
        // )),
        var id = pi.readInt();
        var isSucc = pi.readByte() != 0;
        var infos = [];
        var len0 = pi.readShort();
        var info;
        while (len0--) {
            info = new ItemsModelInfo();
            info.base_id = pi.readInt();
            info.bind = pi.readByte() != 1;
            info.quantity = pi.readInt();
            var len1 = pi.readShort();
            var exarr = void 0;
            while (len1--) {
                exarr = new ExattrItemsinfo();
                exarr.type = pi.readShort();
                exarr.target = pi.readInt();
                exarr.value = pi.readInt();
                exarr.desc = pi.readUTF();
                info.infoList.push(exarr);
            }
            infos.push(info);
        }
        if (id != CopyConst.ID_MATERIAL)
            infos.sort(CopyModel.sortResultItems);
        // if(id == CopyConst.ID_TOWER)
        // {
        Manager.model.getAuto().autoHook = false;
        // }
        if (isSucc) {
            Manager.control.getCopy().showWin(id, infos, 10, Manager.control.getCopy().exit);
        }
        else {
            Manager.control.getCopy().showFail(10, Manager.control.getCopy().exit);
            Manager.model.getTask().setCopyResoult(id);
        }
    };
    return CopyResultCMD;
}(BaseCMD));
__reflect(CopyResultCMD.prototype, "CopyResultCMD");
//# sourceMappingURL=CopyResultCMD.js.map