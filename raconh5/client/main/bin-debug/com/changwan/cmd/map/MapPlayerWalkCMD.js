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
var MapPlayerWalkCMD = (function (_super) {
    __extends(MapPlayerWalkCMD, _super);
    function MapPlayerWalkCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.MAP_PLAYER_WALK;
        return _this;
    }
    MapPlayerWalkCMD.prototype.processOut = function (out) {
        out.writeByte(this.walkType);
        var count = this.path.length;
        out.writeShort(count);
        for (var i = 0; i < count; i++) {
            out.writeShort(this.path[i].x);
            out.writeShort(this.path[i].y);
        }
    };
    MapPlayerWalkCMD.prototype.receive = function (pi) {
        if (!Manager.model.getMap().mapDataLoadComplete)
            return;
        var id = pi.readInt64();
        var walkType = pi.readByte();
        var player = Manager.model.getGameobject().getPlayerGameObject(id);
        if (player != null && player.getAliveFlag() && !player.isType(GameObjectType.SELF)) {
            var path = [];
            var count = pi.readShort();
            while (count > 0) {
                path.push(new egret.Point(pi.readShort(), pi.readShort()));
                count--;
            }
            if (walkType == WalkType.JUMP) {
                if (path.length >= 2) {
                    var startPos = path.shift();
                    player.dispatchJumpSyn(startPos, path);
                }
            }
            else if (walkType == WalkType.SPRINT) {
                player.walk(path, WalkType.SPRINT);
            }
            else if (walkType == WalkType.SLIDE) {
                player.walk(path, WalkType.SLIDE);
            }
            else {
                if (path.length > 0) {
                    path = player.handleCurentPath(path, player.x, player.y);
                    if (path.length > 0)
                        player.walk(path, WalkType.WALK);
                }
            }
        }
    };
    return MapPlayerWalkCMD;
}(BaseCMD));
__reflect(MapPlayerWalkCMD.prototype, "MapPlayerWalkCMD");
//# sourceMappingURL=MapPlayerWalkCMD.js.map