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
 * 采集物对象信息类
 * Simon
 * create 2018-3-12
*/
var CollectionGameObjectInfo = (function (_super) {
    __extends(CollectionGameObjectInfo, _super);
    function CollectionGameObjectInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CollectionGameObjectInfo.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.effectName = null;
        this.isGet = false;
        this.target = null;
        this.callback = null;
    };
    CollectionGameObjectInfo.prototype.getType = function () {
        return GameObjectType.COLLECT;
    };
    CollectionGameObjectInfo.prototype.addEvent = function () {
        // Manager.model.self.addEventListener(GameObjectEvent.GO_INDEX9, this.__update9Scale, this);
    };
    CollectionGameObjectInfo.prototype.removeEvent = function () {
        // Manager.model.self.removeEventListener(GameObjectEvent.GO_INDEX9, this.__update9Scale, this);
    };
    // private __update9Scale(e:GameObjectEvent):void
    // {
    //     if(Manager.model.self.isIn9Scale(this, 3))
    //     {
    //         if(!this.isInMapFlag) Manager.model.getGameobject().addGameObject(this);
    //     }
    //     else 
    //     {
    //         this.remove(true);
    //     }
    // }
    CollectionGameObjectInfo.prototype.createGameObject = function () {
        if (this._view == null)
            this._view = Manager.pool.create(CollectionGameObject, this);
        return this._view;
    };
    CollectionGameObjectInfo.prototype.setData = function (name, isGet, callback, target) {
        if (callback === void 0) { callback = null; }
        if (target === void 0) { target = null; }
        this.effectName = name;
        this.isGet = isGet;
        this.callback = callback;
        this.target = target;
    };
    CollectionGameObjectInfo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.effectName = null;
        this.target = null;
        this.callback = null;
    };
    return CollectionGameObjectInfo;
}(GameObjectInfo));
__reflect(CollectionGameObjectInfo.prototype, "CollectionGameObjectInfo");
//# sourceMappingURL=CollectionGameObjectInfo.js.map