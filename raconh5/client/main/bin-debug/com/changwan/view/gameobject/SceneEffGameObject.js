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
 * 场景特效对象视图类
 * liangyan
 * create 2017-12-29
*/
var SceneEffGameObject = (function (_super) {
    __extends(SceneEffGameObject, _super);
    // private _temp:egret.Shape;
    function SceneEffGameObject() {
        return _super.call(this) || this;
    }
    SceneEffGameObject.prototype.start = function () {
        _super.prototype.start.call(this);
        this._elementShow = Manager.pool.create(ElementNoAliveAnimation, this);
        // this._temp = Manager.pool.create(egret.Shape);
        // this._temp.graphics.beginFill(0xff0000, 0.5);
        // this._temp.graphics.drawCircle(0,0,50);
        // this._temp.graphics.endFill();
        // this.addChild(this._temp);
    };
    SceneEffGameObject.prototype.reuse = function (info) {
        this._sceneEffInfo = info;
        _super.prototype.reuse.call(this, info);
    };
    SceneEffGameObject.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        Manager.pool.push(this._elementShow);
        this._elementShow = null;
        // this.removeChild(this._temp);
        // this._temp = null;
        this._sceneEffInfo.isInMapFlag = false;
        this._sceneEffInfo = null;
    };
    SceneEffGameObject.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this._elementShow.drawSceneStageEffect();
    };
    SceneEffGameObject.prototype.playShow = function () {
        this._elementShow.play();
    };
    SceneEffGameObject.prototype.disposeSelf = function () {
        Manager.pool.push(this._elementShow);
        this._elementShow = null;
        _super.prototype.disposeSelf.call(this);
        // this.removeChild(this._temp);
        // this._temp = null;
        this._sceneEffInfo.isInMapFlag = false;
        this._sceneEffInfo = null;
    };
    return SceneEffGameObject;
}(GameObject));
__reflect(SceneEffGameObject.prototype, "SceneEffGameObject");
//# sourceMappingURL=SceneEffGameObject.js.map