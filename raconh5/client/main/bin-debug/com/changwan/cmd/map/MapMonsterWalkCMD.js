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
 *description 怪物走路
*/
var MapMonsterWalkCMD = (function (_super) {
    __extends(MapMonsterWalkCMD, _super);
    function MapMonsterWalkCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.MAP_MONSTER_WALK;
        return _this;
    }
    MapMonsterWalkCMD.prototype.receive = function (pi) {
        var monsterID = pi.readInt();
        var monster = Manager.model.getGameobject().getMonsterGameObject(monsterID);
        if (monster == null)
            return;
        if (!monster.getAliveFlag())
            return;
        var walkType = pi.readByte();
        var len = pi.readShort();
        var path = [];
        for (var i = 0; i < len; i++)
            path.push(new egret.Point(pi.readShort(), pi.readShort()));
        // if(path.length > 0 && !(path[0].x == monster.x && path[0].y == monster.y)) path.unshift(monster.position);
        if (path.length > 0 && !(path[0].x == monster.x && path[0].y == monster.y))
            path.unshift(new egret.Point(monster.x, monster.y));
        if (path.length > 0) {
            path = monster.handleCurentPath(path, monster.x, monster.y);
            monster.walk(path, walkType);
        }
    };
    return MapMonsterWalkCMD;
}(BaseCMD));
__reflect(MapMonsterWalkCMD.prototype, "MapMonsterWalkCMD");
//# sourceMappingURL=MapMonsterWalkCMD.js.map