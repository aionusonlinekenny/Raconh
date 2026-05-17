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
 *create 2017-11-30
 *description
*/
var BuffMapRemoveCMD = /** @class */ (function (_super) {
    __extends(BuffMapRemoveCMD, _super);
    function BuffMapRemoveCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.BUFF_MAP_REMOVE;
        return _this;
    }
    BuffMapRemoveCMD.prototype.receive = function (pi) {
        var aliveID = pi.readInt64();
        var groupID = pi.readInt();
        var alive = Manager.model.getGameobject().getGameObject(aliveID);
        if (alive == null)
            return;
        var buff = alive.getBuffById(groupID);
        if (buff != null) {
            alive.removeBuff(buff);
        }
    };
    return BuffMapRemoveCMD;
}(BaseCMD));
//# sourceMappingURL=BuffMapRemoveCMD.js.map