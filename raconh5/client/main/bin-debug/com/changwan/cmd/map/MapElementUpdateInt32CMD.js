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
 *create 2017-11-6
 *description
*/
var MapElementUpdateInt32CMD = (function (_super) {
    __extends(MapElementUpdateInt32CMD, _super);
    function MapElementUpdateInt32CMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.MAP_ELEMENT_ATTR_UPDATE_32;
        return _this;
    }
    MapElementUpdateInt32CMD.prototype.receive = function (pi) {
        var id = pi.readInt64();
        var info = Manager.model.getGameobject().getGameObject(id);
        if (info != null)
            info.updatePartAttr(pi, 1);
    };
    return MapElementUpdateInt32CMD;
}(BaseCMD));
__reflect(MapElementUpdateInt32CMD.prototype, "MapElementUpdateInt32CMD");
//# sourceMappingURL=MapElementUpdateInt32CMD.js.map