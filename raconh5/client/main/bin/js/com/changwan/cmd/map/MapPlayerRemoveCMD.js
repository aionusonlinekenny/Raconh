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
var MapPlayerRemoveCMD = /** @class */ (function (_super) {
    __extends(MapPlayerRemoveCMD, _super);
    function MapPlayerRemoveCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.MAP_PLAYER_REMOVE;
        return _this;
    }
    MapPlayerRemoveCMD.prototype.receive = function (pi) {
        var count = pi.readShort();
        while (count > 0) {
            var id = pi.readInt64();
            var info = Manager.model.getGameobject().getPlayerGameObject(id);
            if (info) {
                Manager.model.getGameobject().removeGameObject(info);
            }
            count--;
        }
    };
    return MapPlayerRemoveCMD;
}(BaseCMD));
//# sourceMappingURL=MapPlayerRemoveCMD.js.map