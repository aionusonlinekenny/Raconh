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
var GameObject = (function (_super) {
    __extends(GameObject, _super);
    function GameObject() {
        var _this = _super.call(this) || this;
        _this._isImmediately = true;
        return _this;
    }
    Object.defineProperty(GameObject.prototype, "info", {
        get: function () {
            return this._info;
        },
        enumerable: true,
        configurable: true
    });
    GameObject.prototype.reuse = function (info) {
        this._info = info;
        this._info.isInMapFlag = true;
        _super.prototype.reuse.call(this);
    };
    GameObject.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        if (!this._isImmediately)
            Manager.pool.push(this._info);
        this._isImmediately = true;
        this._isInitialize = false;
        this._info.isInMapFlag = false;
        this._info = null;
        if (this._shadow) {
            Manager.pool.push(this._shadow);
            this._shadow = null;
        }
        Manager.render.remove(this.immediatelyDispose, this);
    };
    GameObject.prototype.eventPosition = function () {
        this.move(this._info.x, this._info.y);
        if (this._shadow) {
            this._shadow.x = this._info.x - 58.5;
            this._shadow.y = this._info.y - 20.5;
        }
    };
    GameObject.prototype.eventRemove = function (isImmediately, delayTime) {
        this._isImmediately = isImmediately;
        if (isImmediately)
            this.immediatelyDispose();
        else
            this.delayDispose(delayTime);
    };
    GameObject.prototype.delayDispose = function (delayTime) {
        this.removeEvent();
        Manager.render.add(this.immediatelyDispose, this, delayTime, 1);
    };
    GameObject.prototype.immediatelyDispose = function () {
        Manager.control.getMap().removeGameObject(this);
    };
    GameObject.prototype.start = function () {
        _super.prototype.start.call(this);
        var goType = this.info.getType();
        if (goType != GameObjectType.DROP && goType != GameObjectType.JUMP_POINT && goType != GameObjectType.SCENE_EFF) {
            this._shadow = Manager.pool.create(BitmapRes, "common_shadow_png");
            Manager.layer.shadowLayer.addChild(this._shadow);
        }
    };
    GameObject.prototype.__addedToStage = function (e) {
        if (this._isInitialize)
            return;
        this._isInitialize = true;
        _super.prototype.__addedToStage.call(this, e);
        this.reset();
    };
    /**
     * 填加进场景中执行
     */
    GameObject.prototype.reset = function () {
        this.eventPosition();
    };
    GameObject.prototype.disposeSelf = function () {
        this._info.isInMapFlag = false;
        Manager.render.remove(this.immediatelyDispose, this);
        _super.prototype.disposeSelf.call(this);
        this._info = null;
        if (this._shadow) {
            Manager.pool.push(this._shadow);
            this._shadow = null;
        }
    };
    return GameObject;
}(RenderSprite));
__reflect(GameObject.prototype, "GameObject");
//# sourceMappingURL=GameObject.js.map