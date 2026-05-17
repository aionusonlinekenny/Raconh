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
 * 场景特效视图信息类
 * liangyan
 * create 2017-12-29
*/
var SceneEffGameObjectInfo = /** @class */ (function (_super) {
    __extends(SceneEffGameObjectInfo, _super);
    function SceneEffGameObjectInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SceneEffGameObjectInfo.prototype, "cvo", {
        get: function () {
            return this._cvo;
        },
        enumerable: true,
        configurable: true
    });
    SceneEffGameObjectInfo.prototype.getType = function () {
        return GameObjectType.SCENE_EFF;
    };
    SceneEffGameObjectInfo.prototype.canHited = function (showMsg) {
        if (showMsg === void 0) { showMsg = true; }
        return false;
    };
    SceneEffGameObjectInfo.prototype.getTotalBlood = function () {
        return 0;
    };
    SceneEffGameObjectInfo.prototype.getBlood = function () {
        return 0;
    };
    SceneEffGameObjectInfo.prototype.addEvent = function () {
        if (this._cvo.mapResID != Manager.model.getMap().mapCVO.res)
            return;
        Manager.model.self.addEventListener(GameObjectEvent.GO_INDEX9, this.__update9Scale, this);
    };
    SceneEffGameObjectInfo.prototype.removeEvent = function () {
        Manager.model.self.removeEventListener(GameObjectEvent.GO_INDEX9, this.__update9Scale, this);
    };
    SceneEffGameObjectInfo.prototype.reuse = function (id, cvo) {
        this._cvo = cvo;
        _super.prototype.reuse.call(this, id);
    };
    SceneEffGameObjectInfo.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this._cvo = null;
    };
    SceneEffGameObjectInfo.prototype.playShow = function () {
        if (this._view != null)
            this._view.playShow();
    };
    SceneEffGameObjectInfo.prototype.__update9Scale = function (e) {
        if (Manager.model.self.isIn9Scale(this, 5)) {
            if (!this.isInMapFlag)
                Manager.model.getGameobject().addGameObject(this);
        }
        else {
            this.remove(true);
        }
    };
    SceneEffGameObjectInfo.prototype.createGameObject = function () {
        if (this._view == null)
            this._view = Manager.pool.create(SceneEffGameObject, this);
        return this._view;
    };
    SceneEffGameObjectInfo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._cvo = null;
    };
    return SceneEffGameObjectInfo;
}(GameObjectInfo));
//# sourceMappingURL=SceneEffGameObjectInfo.js.map