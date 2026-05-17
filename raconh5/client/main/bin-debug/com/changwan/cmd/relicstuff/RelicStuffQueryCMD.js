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
 * pzx
 * 18.3.9
 *神器查询
 *  */
var RelicStuffQueryCMD = (function (_super) {
    __extends(RelicStuffQueryCMD, _super);
    function RelicStuffQueryCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_RELICSTUFF_QUERY;
        return _this;
    }
    RelicStuffQueryCMD.prototype.receive = function (ip) {
        //  array('name'=>'relic_list', 'type'=>'arr', 'desc'=>'神器列表', 'vars'=>array(
        //             array('name'=>'id', 'type'=>'int8', 'desc'=>'神器id'),
        //         )),
        //         array('name'=>'piece_list', 'type'=>'arr', 'desc'=>'碎片列表', 'vars'=>array(
        //             array('name'=>'id', 'type'=>'int8', 'desc'=>'碎片id'),
        //         )),
        var ln = ip.readShort();
        for (var i = 0; i < ln; i++) {
            var id = ip.readByte();
            RelicStuffCVO.setActivity(id);
        }
        ln = ip.readShort();
        for (var i = 0; i < ln; i++) {
            var id = ip.readByte();
            RelicStuffDebrisCVO.setActivity(id);
        }
        Manager.model.getrelicstuff().query();
    };
    return RelicStuffQueryCMD;
}(BaseCMD));
__reflect(RelicStuffQueryCMD.prototype, "RelicStuffQueryCMD");
//# sourceMappingURL=RelicStuffQueryCMD.js.map