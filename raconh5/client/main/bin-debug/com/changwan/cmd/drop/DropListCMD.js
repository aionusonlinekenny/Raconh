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
 * 掉落列表信息
 * luzhihong
 * create 2017-11-20
 */
var DropListCMD = (function (_super) {
    __extends(DropListCMD, _super);
    function DropListCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.DROP_LIST;
        return _this;
    }
    DropListCMD.prototype.receive = function (pi) {
        // array('name'=>'map', 'type'=>'int32', 'desc'=>'地图base_id'),
        // array('name'=>'x', 'type'=>'int32', 'desc'=>'x坐标'),
        // array('name'=>'y', 'type'=>'int32', 'desc'=>'y坐标'),
        // array('name'=>'items', 'type'=>'arr', 'desc'=>'掉落物品', 'vars'=>array(
        //     array('name'=>'id', 'type'=>'int32', 'desc'=>'物品base_id'),
        //     array('name'=>'is_get', 'type'=>'int8', 'desc'=>'是否进包'),
        //     array('name'=>'quantity', 'type'=>'int32', 'desc'=>'物品数量'),
        var mapID = pi.readInt();
        if (Manager.model.getMap().getId() != mapID)
            return;
        var x = pi.readInt();
        var y = pi.readInt();
        var len = pi.readShort();
        while (len--) {
            var info = Manager.pool.create(DropGameObjectInfo, egret.getTimer());
            info.x = x;
            info.y = y;
            info.setData(pi.readInt(), pi.readByte() != 0, pi.readInt());
            Manager.model.getGameobject().addGameObject(info);
        }
    };
    return DropListCMD;
}(BaseCMD));
__reflect(DropListCMD.prototype, "DropListCMD");
//# sourceMappingURL=DropListCMD.js.map