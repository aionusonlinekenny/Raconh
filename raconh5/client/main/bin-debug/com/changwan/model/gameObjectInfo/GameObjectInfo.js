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
var GameObjectInfo = (function (_super) {
    __extends(GameObjectInfo, _super);
    function GameObjectInfo() {
        var _this = _super.call(this) || this;
        _this._index9 = new egret.Point(0, 0);
        _this._indexes = new egret.Point(0, 0);
        return _this;
    }
    Object.defineProperty(GameObjectInfo.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObjectInfo.prototype, "indexes", {
        get: function () {
            return this._indexes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObjectInfo.prototype, "index9", {
        get: function () {
            return this._index9;
        },
        set: function (value) {
            this._index9 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObjectInfo.prototype, "view", {
        get: function () {
            return this._view;
        },
        enumerable: true,
        configurable: true
    });
    GameObjectInfo.prototype.getType = function () {
        return GameObjectType.EMPTY;
    };
    GameObjectInfo.prototype.isType = function (goType) {
        return ((this.getType() & goType) == goType);
    };
    GameObjectInfo.prototype.unuse = function () {
        this.removeEvent();
        this._id = 0;
        this._view = null;
    };
    GameObjectInfo.prototype.reuse = function (id) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this._id = id;
        this.start();
        this.addEvent();
    };
    GameObjectInfo.prototype.start = function () {
        this.x = 0;
        this.y = 0;
        this.isInMapFlag = false;
        this.farToSelf = 0;
        this._index9.x = 0;
        this._index9.y = 0;
        this._indexes.x = 0;
        this._indexes.y = 0;
    };
    GameObjectInfo.prototype.addEvent = function () {
    };
    GameObjectInfo.prototype.removeEvent = function () {
    };
    GameObjectInfo.prototype.createGameObject = function () {
        return null;
    };
    GameObjectInfo.prototype.updatePostion = function (x, y, isForce) {
        if (isForce === void 0) { isForce = false; }
        if (this.x == x && this.y == y && !isForce)
            return;
        // let oldPos:egret.Point = new egret.Point(this.x, this.y);
        this.x = x;
        this.y = y;
        this._indexes = IndexUtil.getIndexByXY(x, y);
        this.index9 = IndexUtil.getIndex9ByXY(this.x, this.y);
        if (this._view != null)
            this._view.eventPosition();
        // this.checkSelfPosSync(oldPos);
        // this.dispatchEvent(new GameObjectEvent(GameObjectEvent.GO_POSITION));
    };
    // private checkSelfPosSync(oldPos:egret.Point):void
    // {
    //     //野外地图(单人)，九宫格改变同步位置；多人地图，小格子改变同步位置
    //     if(!(this instanceof SelfGameObjectInfo)) return;
    //     let oldIndex:egret.Point;
    //     let noChange:boolean = true;
    //     if(Manager.model.getMap().mapCVO.isFieldMap)
    //     {
    //         oldIndex = IndexUtil.getIndex9ByXY(oldPos.x, oldPos.y);
    //         noChange = this.index9.equals(oldIndex);
    //     }
    //     else
    //     {
    //         oldIndex = IndexUtil.getIndexByXY(oldPos.x, oldPos.y);
    //         noChange = this._indexes.equals(oldIndex);
    //     }
    //     if(!noChange) Manager.control.getMap().cmdSelfWalkPosSync(this.x, this.y);
    // }
    GameObjectInfo.prototype.dispose = function () {
        this.removeEvent();
        this._index9 = null;
        this._indexes = null;
        this._view = null;
    };
    GameObjectInfo.prototype.remove = function (onlyView, isImmediately, delayTime) {
        if (isImmediately === void 0) { isImmediately = true; }
        if (delayTime === void 0) { delayTime = 2000; }
        if (this._view != null) {
            this._view.eventRemove(onlyView ? true : isImmediately, delayTime);
            this._view = null;
        }
        if (!onlyView) {
            if (isImmediately)
                Manager.pool.push(this);
        }
    };
    return GameObjectInfo;
}(egret.EventDispatcher));
__reflect(GameObjectInfo.prototype, "GameObjectInfo", ["cw.IPool", "cw.IDispose"]);
//# sourceMappingURL=GameObjectInfo.js.map