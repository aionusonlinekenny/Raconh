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
 * npc对象视图类
 * chenhuang
 * create
 * update devil 2017-11-07
*/
var NPCGameObject = /** @class */ (function (_super) {
    __extends(NPCGameObject, _super);
    function NPCGameObject() {
        return _super.call(this) || this;
    }
    NPCGameObject.prototype.start = function () {
        _super.prototype.start.call(this);
        this._elementShow = Manager.pool.create(ElementNoAliveAnimation, this);
    };
    NPCGameObject.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    NPCGameObject.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    NPCGameObject.prototype.onClickHandler = function (e) {
        // if(this._npcGameObjectInfo && this._npcGameObjectInfo.cvo && this._npcGameObjectInfo.cvo.link != null)
        // {
        //     Manager.link.linkStr(this._npcGameObjectInfo.cvo.link);
        // }
        if (Manager.model.getMap().isInRookieMap())
            return; //新手地图中屏蔽点击NPC，防止打断流程
        Manager.walk.moveToNPC(this._npcGameObjectInfo.cvo);
    };
    NPCGameObject.prototype.reuse = function (info) {
        this._npcGameObjectInfo = info;
        _super.prototype.reuse.call(this, info);
        this.touchEnabled = true;
    };
    NPCGameObject.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this._npcGameObjectInfo = null;
        Manager.pool.push(this._elementShow);
        this._elementShow = null;
        if (this._txtName != null) {
            Manager.pool.push(this._txtName);
            this._txtName = null;
        }
        if (this._headIcon != null) {
            Manager.pool.push(this._headIcon);
            this._headIcon = null;
        }
    };
    NPCGameObject.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this._elementShow.drawNPC();
        this.drawNpcName();
        this.drawHeadIcon();
    };
    NPCGameObject.prototype.drawNpcName = function () {
        if (this._txtName == null)
            this._txtName = Manager.pool.create(egret.TextField);
        var nameHtml = StringUtils.setParam(LangCVO.getContent("common1"), Color.WHITE_STR, this._npcGameObjectInfo.cvo.name);
        HtmlUtil.setTextFlow(this._txtName, nameHtml);
        this._txtName.width = this._txtName.textWidth;
        this._txtName.x = -this._txtName.width >> 1;
        this._txtName.y = -this._npcGameObjectInfo.cvo.height - this._txtName.height;
        if (this._txtName.parent == null)
            this.addChild(this._txtName);
    };
    NPCGameObject.prototype.drawHeadIcon = function () {
        if (this._npcGameObjectInfo.cvo.iconRes == "")
            return;
        if (this._headIcon == null) {
            this._headIcon = Manager.pool.create(BitmapRemote);
        }
        if (!this._headIcon.parent)
            this.addChild(this._headIcon);
        this._headIcon.load(Manager.path.getNpcHeadIcon(this._npcGameObjectInfo.cvo.iconRes), -1, -1, this.onLoadNpcHeadIconComplete, this);
    };
    NPCGameObject.prototype.onLoadNpcHeadIconComplete = function () {
        if (this._headIcon) {
            this._headIcon.x = -this._headIcon.width >> 1;
            this._headIcon.y = -this._npcGameObjectInfo.cvo.height - this._txtName.height - this._headIcon.height;
        }
    };
    NPCGameObject.prototype.disposeSelf = function () {
        if (this._txtName != null) {
            Manager.pool.push(this._txtName);
            this._txtName = null;
        }
        if (this._headIcon != null) {
            Manager.pool.push(this._headIcon);
            this._headIcon = null;
        }
        this._npcGameObjectInfo = null;
        Manager.pool.push(this._elementShow);
        this._elementShow = null;
        _super.prototype.disposeSelf.call(this);
    };
    return NPCGameObject;
}(GameObject));
//# sourceMappingURL=NPCGameObject.js.map