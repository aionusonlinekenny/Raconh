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
 *author luzh
 *create 2018.4.9
 *description
*/
var MapStatusInfoCMD = /** @class */ (function (_super) {
    __extends(MapStatusInfoCMD, _super);
    function MapStatusInfoCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.MAP_STATUS_INFO;
        return _this;
    }
    MapStatusInfoCMD.prototype.receive = function (pi) {
        if (Manager.model.getMap().mapCVO.id != MapConst.ID_HOME)
            return;
        var statusInfo;
        var roleInfo;
        Manager.model.getGameobject().removeGameObjectByType(GameObjectType.STATUE);
        roleInfo = Manager.pool.create(RoleInfo);
        roleInfo.id = pi.readInt64();
        statusInfo = Manager.pool.create(StatusGameObjectInfo, roleInfo.id, roleInfo);
        statusInfo.parse(pi);
        Manager.model.getGameobject().addGameObject(statusInfo);
    };
    return MapStatusInfoCMD;
}(BaseCMD));
//# sourceMappingURL=MapStatusInfoCMD.js.map