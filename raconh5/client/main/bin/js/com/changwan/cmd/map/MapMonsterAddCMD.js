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
 *description 地图怪物添加、更新
*/
var MapMonsterAddCMD = /** @class */ (function (_super) {
    __extends(MapMonsterAddCMD, _super);
    function MapMonsterAddCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.MAP_MONSTER_ADD;
        return _this;
    }
    MapMonsterAddCMD.prototype.receive = function (pi) {
        if (!Manager.model.getMap().mapDataLoadComplete)
            return;
        var count = pi.readShort();
        var direction;
        while (count > 0) {
            var id = pi.readInt();
            var monster = Manager.model.getGameobject().getMonsterGameObject(id);
            if (monster == null) {
                monster = Manager.pool.create(MonsterGameObjectInfo, id, pi.readShort());
                monster.parse(pi, true);
                if (monster.cvo.singleDic)
                    direction = Direction.RIGHT_TOP;
                else if (monster.cvo.birthDirIndex >= 0)
                    direction = Direction.directions[monster.cvo.birthDirIndex];
                else
                    direction = Direction.getRandomDirection();
                monster.setDirection(direction);
                if (monster.getBlood() > 0) {
                    Manager.model.getGameobject().addGameObject(monster);
                }
            }
            else {
                Trace.trace("Error:MapMonsterAddCMD:receive", "服务器不该发信息过来！");
                monster.parse(pi, false);
            }
            count--;
        }
    };
    return MapMonsterAddCMD;
}(BaseCMD));
//# sourceMappingURL=MapMonsterAddCMD.js.map