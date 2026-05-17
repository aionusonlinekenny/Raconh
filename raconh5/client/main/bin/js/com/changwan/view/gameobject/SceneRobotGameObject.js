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
var SceneRobotGameObject = /** @class */ (function (_super) {
    __extends(SceneRobotGameObject, _super);
    function SceneRobotGameObject() {
        return _super.call(this) || this;
    }
    SceneRobotGameObject.prototype.start = function () {
        _super.prototype.start.call(this);
        this._sceneRobotInfo.randomPlayerStyle();
        this._elementPlayer = Manager.pool.create(ElementPlayerAnimation, this);
        this._elementPlayer.sceneRobotFlag = 1;
        if (this._sceneRobotInfo.cvo.monsterId != 0) {
            this._elementMonster = Manager.pool.create(ElementMonsterAnimation, this);
            this._elementMonster.sceneRobotFlag = 2;
            this._shadowMonster = Manager.pool.create(BitmapRes, "common_shadow_png");
            this._shadowMonster.x = (-117 >> 1) + this._sceneRobotInfo.cvo.posxMon;
            this._shadowMonster.y = (-39 >> 1) + this._sceneRobotInfo.cvo.posyMon;
            this.addChild(this._shadowMonster);
        }
    };
    SceneRobotGameObject.prototype.reuse = function (info) {
        this._sceneRobotInfo = info;
        _super.prototype.reuse.call(this, info);
    };
    SceneRobotGameObject.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        if (this._elementPlayer) {
            Manager.pool.push(this._elementPlayer);
            this._elementPlayer = null;
        }
        if (this._elementMonster) {
            Manager.pool.push(this._elementMonster);
            this._elementMonster = null;
        }
        if (this._txtName) {
            Manager.pool.push(this._txtName);
            this._txtName = null;
        }
        if (this._shadowMonster) {
            Manager.pool.push(this._shadowMonster);
            this._shadowMonster = null;
        }
        this._sceneRobotInfo.isInMapFlag = false;
        this._sceneRobotInfo = null;
    };
    SceneRobotGameObject.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawName();
        this._elementPlayer.drawPlayerAnimation();
        if (this._elementMonster)
            this._elementMonster.drawMonster();
    };
    SceneRobotGameObject.prototype.drawName = function () {
        if (this._txtName == null) {
            this._txtName = Manager.pool.create(egret.TextField);
            this._txtName.text = this._sceneRobotInfo.infoPlayer.attrInfo.nickName;
            this._txtName.width = this._txtName.textWidth;
            this._txtName.x = -this._txtName.width >> 1;
            this._txtName.y = -180;
        }
        if (this._txtName.parent == null)
            this.addChild(this._txtName);
    };
    SceneRobotGameObject.prototype.disposeSelf = function () {
        _super.prototype.disposeSelf.call(this);
        if (this._elementPlayer) {
            Manager.pool.push(this._elementPlayer);
            this._elementPlayer = null;
        }
        if (this._elementMonster) {
            Manager.pool.push(this._elementMonster);
            this._elementMonster = null;
        }
        if (this._txtName != null) {
            Manager.pool.push(this._txtName);
            this._txtName = null;
        }
        if (this._shadowMonster) {
            Manager.pool.push(this._shadowMonster);
            this._shadowMonster = null;
        }
        this._sceneRobotInfo.isInMapFlag = false;
        this._sceneRobotInfo = null;
    };
    return SceneRobotGameObject;
}(GameObject));
//# sourceMappingURL=SceneRobotGameObject.js.map