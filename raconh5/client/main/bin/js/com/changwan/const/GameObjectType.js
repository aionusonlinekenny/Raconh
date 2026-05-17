/**
 * 角色类型
 */
var GameObjectType = /** @class */ (function () {
    function GameObjectType() {
    }
    Object.defineProperty(GameObjectType, "monsterTypes", {
        get: function () {
            return [this.MONSTER_NORMAL, this.MONSTER_BOSS];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObjectType, "needSortTypes", {
        /**
         * 需要排序的类型
         */
        get: function () {
            return [this.SELF, this.OTHER, this.MONSTER_NORMAL, this.MONSTER_BOSS, this.NPC, this.COLLECT, this.PET, this.SELF_PET, this.SCENE_ROBOT, this.STATUE];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObjectType, "types", {
        get: function () {
            return [this.SELF, this.OTHER, this.MONSTER_NORMAL, this.MONSTER_BOSS, this.NPC, this.COLLECT, this.DROP, this.PET, this.SELF_PET, this.JUMP_POINT, this.SCENE_EFF, this.SCENE_ROBOT, this.STATUE];
        },
        enumerable: true,
        configurable: true
    });
    GameObjectType.isPlayer = function (type) {
        return (type == this.SELF || type == this.OTHER);
    };
    GameObjectType.isMonster = function (type) {
        return type == this.MONSTER_NORMAL || type == this.MONSTER_BOSS;
    };
    GameObjectType.EMPTY = 0;
    GameObjectType.SELF = 1;
    GameObjectType.OTHER = 2;
    GameObjectType.MONSTER_NORMAL = 4;
    GameObjectType.MONSTER_BOSS = 8;
    GameObjectType.NPC = 16;
    GameObjectType.COLLECT = 32;
    GameObjectType.DROP = 64;
    GameObjectType.PET = 128;
    GameObjectType.SELF_PET = 256;
    GameObjectType.JUMP_POINT = 512;
    GameObjectType.SCENE_EFF = 1024;
    GameObjectType.SCENE_ROBOT = 2048;
    GameObjectType.STATUE = 4096; //雕像
    return GameObjectType;
}());
//# sourceMappingURL=GameObjectType.js.map