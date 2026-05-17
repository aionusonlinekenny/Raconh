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
 *author Anydo
 *create 2017-11-1
 *description 移除怪物
*/
var MapMonsterRemoveCMD = (function (_super) {
    __extends(MapMonsterRemoveCMD, _super);
    function MapMonsterRemoveCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.MAP_MONSTER_REMOVE;
        return _this;
    }
    MapMonsterRemoveCMD.prototype.receive = function (pi) {
        var count = pi.readShort();
        while (count > 0) {
            var id = pi.readInt();
            var info = Manager.model.getGameobject().getMonsterGameObject(id);
            if (info) {
                Manager.model.getGameobject().removeGameObject(info);
            }
            count--;
        }
    };
    return MapMonsterRemoveCMD;
}(BaseCMD));
__reflect(MapMonsterRemoveCMD.prototype, "MapMonsterRemoveCMD");
//# sourceMappingURL=MapMonsterRemoveCMD.js.map