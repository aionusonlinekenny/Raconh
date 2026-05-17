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
 * npc对象信息类
 * chenhuang
 * create
 * update devil 2017-11-07
*/
var NPCGameObjectInfo = /** @class */ (function (_super) {
    __extends(NPCGameObjectInfo, _super);
    function NPCGameObjectInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(NPCGameObjectInfo.prototype, "cvo", {
        get: function () {
            return this._cvo;
        },
        enumerable: true,
        configurable: true
    });
    NPCGameObjectInfo.prototype.getType = function () {
        return GameObjectType.NPC;
    };
    NPCGameObjectInfo.prototype.canHited = function (showMsg) {
        if (showMsg === void 0) { showMsg = true; }
        return false;
    };
    NPCGameObjectInfo.prototype.getTotalBlood = function () {
        return 0;
    };
    NPCGameObjectInfo.prototype.getBlood = function () {
        return 0;
    };
    NPCGameObjectInfo.prototype.addEvent = function () {
        Manager.model.self.addEventListener(GameObjectEvent.GO_INDEX9, this.__update9Scale, this);
    };
    NPCGameObjectInfo.prototype.removeEvent = function () {
        Manager.model.self.removeEventListener(GameObjectEvent.GO_INDEX9, this.__update9Scale, this);
    };
    NPCGameObjectInfo.prototype.reuse = function (id, cvo) {
        this._cvo = cvo;
        _super.prototype.reuse.call(this, id);
    };
    NPCGameObjectInfo.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this._cvo = null;
    };
    NPCGameObjectInfo.prototype.__update9Scale = function (e) {
        if (Manager.model.self.isIn9Scale(this, 3)) {
            if (!this.isInMapFlag)
                Manager.model.getGameobject().addGameObject(this);
        }
        else {
            this.remove(true);
        }
    };
    NPCGameObjectInfo.prototype.createGameObject = function () {
        if (this._view == null)
            this._view = Manager.pool.create(NPCGameObject, this);
        return this._view;
    };
    NPCGameObjectInfo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._cvo = null;
    };
    return NPCGameObjectInfo;
}(GameObjectInfo));
//# sourceMappingURL=NPCGameObjectInfo.js.map