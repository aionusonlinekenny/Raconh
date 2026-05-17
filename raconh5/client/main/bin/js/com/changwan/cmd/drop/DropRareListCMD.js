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
 * 珍稀掉落列表信息
 * luzhihong
 * create 2017-11-20
 */
var DropRareListCMD = /** @class */ (function (_super) {
    __extends(DropRareListCMD, _super);
    function DropRareListCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.DROP_RARE_LIST;
        return _this;
    }
    DropRareListCMD.prototype.receive = function (pi) {
        // array('name'=>'items', 'type'=>'arr', 'desc'=>'掉落物品', 'vars'=>array(
        //     array('name'=>'id', 'type'=>'int32', 'desc'=>'物品base_id'),
        //     array('name' => 'bind', 'type' => 'int8', 'desc' => '是否绑定'),
        //     array('name' => 'quantity', 'type' => 'int16', 'desc' => '数量'),
        //     array('name' => 'exattr', 'type' => 'arr', 'record' => 'exattr', 'desc' => '特殊信息','vars'=> array(
        //         array('name' => 'type', 'type' => 'int16', 'desc' => '信息类型'),
        //         array('name' => 'target', 'type' => 'int32', 'desc' => '信息目标'),
        //         array('name' => 'value', 'type' => 'int32', 'desc' => '信息数字值'),
        //         array('name' => 'desc', 'type' => 'string', 'desc' => '信息字符值(如装备刻字, 物品署名字)'),)),
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
        Manager.control.getDrop().showAlert(infos);
    };
    return DropRareListCMD;
}(BaseCMD));
//# sourceMappingURL=DropRareListCMD.js.map