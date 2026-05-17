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
 *create 2017-11-4
 *description
*/
var MapPlayerAddCMD = (function (_super) {
    __extends(MapPlayerAddCMD, _super);
    function MapPlayerAddCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.MAP_PLAYER_ADD;
        return _this;
    }
    MapPlayerAddCMD.prototype.receive = function (pi) {
        if (!Manager.model.getMap().mapDataLoadComplete)
            return;
        var playerInfo;
        var roleInfo;
        var len = pi.readShort();
        for (var i = 0; i < len; i++) {
            var id = pi.readInt64();
            playerInfo = Manager.model.getGameobject().getPlayerGameObject(id);
            if (playerInfo == null) {
                roleInfo = Manager.pool.create(RoleInfo);
                roleInfo.id = id;
                playerInfo = Manager.pool.create(PlayerGameObjectInfo, id, roleInfo);
                playerInfo.parse(pi);
                Manager.model.getGameobject().addGameObject(playerInfo);
            }
            else {
                Trace.trace("Error:MapPlayerAddCMD:receive", "服务器乱发信息过来！");
                playerInfo.parse(pi);
            }
        }
    };
    return MapPlayerAddCMD;
}(BaseCMD));
__reflect(MapPlayerAddCMD.prototype, "MapPlayerAddCMD");
//# sourceMappingURL=MapPlayerAddCMD.js.map