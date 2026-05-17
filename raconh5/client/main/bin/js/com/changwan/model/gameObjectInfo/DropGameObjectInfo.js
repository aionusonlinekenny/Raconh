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
 * drop对象信息类
 * luzh
 * update 2017-11-17
*/
var DropGameObjectInfo = /** @class */ (function (_super) {
    __extends(DropGameObjectInfo, _super);
    function DropGameObjectInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DropGameObjectInfo.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.item = null;
        this.count = 0;
        this.isGet = false;
    };
    DropGameObjectInfo.prototype.getType = function () {
        return GameObjectType.DROP;
    };
    DropGameObjectInfo.prototype.addEvent = function () {
        // Manager.model.self.addEventListener(GameObjectEvent.GO_INDEX9, this.__update9Scale, this);
    };
    DropGameObjectInfo.prototype.removeEvent = function () {
        // Manager.model.self.removeEventListener(GameObjectEvent.GO_INDEX9, this.__update9Scale, this);
    };
    // private __update9Scale(e:GameObjectEvent):void
    // {
    //     if(Manager.model.self.isIn9Scale(this))
    //     {
    //         if(!this.isInMapFlag) Manager.model.getGameobject().addGameObject(this);
    //     }
    //     else 
    //     {
    //         this.remove(true);
    //     }
    // }
    DropGameObjectInfo.prototype.createGameObject = function () {
        if (this._view == null)
            this._view = Manager.pool.create(DropGameObject, this);
        return this._view;
    };
    DropGameObjectInfo.prototype.setData = function (temID, isGet, count) {
        this.item = ItemsCVO.getCvo(temID);
        this.isGet = isGet;
        this.count = count;
    };
    DropGameObjectInfo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.item = null;
        this.count = 0;
    };
    return DropGameObjectInfo;
}(GameObjectInfo));
//# sourceMappingURL=DropGameObjectInfo.js.map