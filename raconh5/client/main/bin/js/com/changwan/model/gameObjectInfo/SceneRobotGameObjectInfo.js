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
 *create 2018-1-19
 *description
*/
var SceneRobotGameObjectInfo = /** @class */ (function (_super) {
    __extends(SceneRobotGameObjectInfo, _super);
    function SceneRobotGameObjectInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SceneRobotGameObjectInfo.prototype, "cvo", {
        get: function () { return this._cvo; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneRobotGameObjectInfo.prototype, "infoMonster", {
        get: function () { return this._infoMonster; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneRobotGameObjectInfo.prototype, "infoPlayer", {
        get: function () { return this._infoPlayer; },
        enumerable: true,
        configurable: true
    });
    SceneRobotGameObjectInfo.prototype.getType = function () { return GameObjectType.SCENE_ROBOT; };
    SceneRobotGameObjectInfo.prototype.canHited = function (showMsg) {
        if (showMsg === void 0) { showMsg = true; }
        return false;
    };
    SceneRobotGameObjectInfo.prototype.getTotalBlood = function () { return 0; };
    SceneRobotGameObjectInfo.prototype.getBlood = function () { return 0; };
    SceneRobotGameObjectInfo.prototype.addEvent = function () {
        if (this._cvo.mapResID != Manager.model.getMap().mapCVO.res)
            return;
        Manager.model.self.addEventListener(GameObjectEvent.GO_INDEX9, this.__update9Scale, this);
    };
    SceneRobotGameObjectInfo.prototype.removeEvent = function () {
        Manager.model.self.removeEventListener(GameObjectEvent.GO_INDEX9, this.__update9Scale, this);
    };
    SceneRobotGameObjectInfo.prototype.reuse = function (id, cvo) {
        this._cvo = cvo;
        _super.prototype.reuse.call(this, id);
        this.createPlayerInfo();
        this.createMonsterInfo();
    };
    SceneRobotGameObjectInfo.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this._cvo = null;
        if (this._infoPlayer) {
            Manager.pool.push(this._infoPlayer);
            this._infoPlayer = null;
        }
        if (this._infoMonster) {
            Manager.pool.push(this._infoMonster);
            this._infoMonster = null;
        }
    };
    SceneRobotGameObjectInfo.prototype.createMonsterInfo = function () {
        if (this._cvo.monsterId == 0)
            return null;
        this._infoMonster = Manager.pool.create(MonsterGameObjectInfo, this._cvo.monsterId * 1000, this._cvo.monsterId);
        this._infoMonster.isSceneRobot = true;
        this._infoMonster.setActionStr(FigureAction.ATTACK1);
        this._infoMonster.setDirection(Direction.getDir(this._cvo.posxMon, this._cvo.posyMon, 0, 0));
    };
    SceneRobotGameObjectInfo.prototype.createPlayerInfo = function () {
        var id = this._cvo.id + Manager.model.self.id;
        var roleInfo = Manager.pool.create(RoleInfo);
        roleInfo.id = id;
        this._infoPlayer = Manager.pool.create(PlayerGameObjectInfo, id, roleInfo);
        this._infoPlayer.isSceneRobot = true;
        if (this._cvo.playerStyId != 0) {
            var styleCvo = SceneRobotStyleCVO.getCVO(this._cvo.playerStyId);
            this._infoPlayer.attrInfo.nickName = styleCvo.playerName;
            this._infoPlayer.attrInfo.career = styleCvo.career;
            this._infoPlayer.updateStyle(styleCvo.clothes, styleCvo.weapon, styleCvo.wing);
        }
        else {
            this.randomPlayerStyle();
        }
        this._infoPlayer.setActionStr(FigureAction.ATTACK1);
        this._infoPlayer.setDirection(Direction.getDir(0, 0, this._cvo.posxMon, this._cvo.posyMon));
    };
    SceneRobotGameObjectInfo.prototype.randomPlayerStyle = function () {
        if (this._cvo.playerStyId != 0)
            return;
        var self = Manager.model.self;
        this._infoPlayer.attrInfo.nickName = SceneRobotNameCVO.getRandomName();
        this._infoPlayer.attrInfo.career = (Math.random() > 0.5) ? 1 : 2;
        var clothes = this.changeStyleID(self.attrInfo.clothes, this._infoPlayer.attrInfo.career, 1);
        var weapon = this.changeStyleID(self.attrInfo.weapon, this._infoPlayer.attrInfo.career, 2);
        var wing = (self.attrInfo.career == this._infoPlayer.attrInfo.career) ? self.attrInfo.wing : 0;
        this._infoPlayer.updateStyle(clothes, weapon, wing);
    };
    /**
     * 根据职业转换资源ID
     * resouceID 原始资源ID
     * career 职业
     * flag 1衣服 2武器
     */
    SceneRobotGameObjectInfo.prototype.changeStyleID = function (resouceID, career, flag) {
        if (flag == 1) {
            return (career == 1) ? (resouceID % 100 + 1000) : (resouceID % 100 + 2000);
        }
        else if (flag == 2) {
            return (career == 1) ? (resouceID % 100 + 9000) : (resouceID % 100 + 8000);
        }
    };
    SceneRobotGameObjectInfo.prototype.__update9Scale = function (e) {
        if (Manager.model.self.isIn9Scale(this, 2)) {
            if (!this.isInMapFlag)
                Manager.model.getGameobject().addGameObject(this);
        }
        else {
            this.remove(true);
        }
    };
    SceneRobotGameObjectInfo.prototype.createGameObject = function () {
        if (this._view == null)
            this._view = Manager.pool.create(SceneRobotGameObject, this);
        return this._view;
    };
    SceneRobotGameObjectInfo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._cvo = null;
        if (this._infoPlayer) {
            Manager.pool.push(this._infoPlayer);
            this._infoPlayer = null;
        }
        if (this._infoMonster) {
            Manager.pool.push(this._infoMonster);
            this._infoMonster = null;
        }
    };
    return SceneRobotGameObjectInfo;
}(GameObjectInfo));
//# sourceMappingURL=SceneRobotGameObjectInfo.js.map