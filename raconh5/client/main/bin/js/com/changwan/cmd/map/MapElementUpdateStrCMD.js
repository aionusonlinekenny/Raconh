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
var MapElementUpdateStrCMD = /** @class */ (function (_super) {
    __extends(MapElementUpdateStrCMD, _super);
    function MapElementUpdateStrCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.MAP_ELEMENT_ATTR_UPDATE_STR;
        return _this;
    }
    MapElementUpdateStrCMD.prototype.receive = function (pi) {
        var id = pi.readInt64();
        var info = Manager.model.getGameobject().getGameObject(id);
        if (info != null)
            info.updatePartAttr(pi, 2);
    };
    return MapElementUpdateStrCMD;
}(BaseCMD));
//# sourceMappingURL=MapElementUpdateStrCMD.js.map