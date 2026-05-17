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
var SysNoticItem = /** @class */ (function (_super) {
    __extends(SysNoticItem, _super);
    function SysNoticItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("sysnotice", "SysnoticeItemSkin");
        return _this;
    }
    SysNoticItem.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.touchChildren = false;
        this.touchEnabled = true;
    };
    SysNoticItem.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this._passTxt.text = "";
        this._nameTxt.text = "";
        this._redIcon.visible = false;
        this._ilingquImg.visible = false;
        this._effectImg.visible = false;
        this._cvo = null;
        if (this._itemImg) {
            if (this._itemImg.filters)
                this._itemImg.filters = null;
            Manager.pool.push(this._itemImg);
            this._itemImg = null;
        }
    };
    SysNoticItem.prototype.setData = function (value) {
        this._cvo = value;
        this.invalidate(InvalidationType.DATA);
    };
    SysNoticItem.prototype.getCvo = function () {
        return this._cvo;
    };
    SysNoticItem.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    SysNoticItem.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    SysNoticItem.prototype.drawData = function () {
        if (this._itemImg == null) {
            this._itemImg = Manager.pool.create(BitmapRemote);
            this._itemImg.x = 40;
            this._itemImg.y = 55;
            this.addChild(this._itemImg);
            this.swapChildren(this._itemImg, this._ilingquImg);
        }
        this._itemImg.load(Manager.path.getSysnoticePath("icon/" + this._cvo.icon));
        this._nameTxt.text = this._cvo.name;
        this._passTxt.text = StringUtils.setParam(LangCVO.getContent("SysNotice1"), this._cvo.pass);
        if (this._cvo.state == 1) {
            this._redIcon.visible = false;
            this._ilingquImg.visible = true;
            this._gridImg.filters = null;
            this._itemImg.filters = null;
        }
        else {
            if (Manager.model.getTask().getTaskIdComplete(this._cvo.open_task_id)) {
                this._redIcon.visible = true;
                this._gridImg.filters = null;
                this._itemImg.filters = null;
            }
            else {
                this._redIcon.visible = false;
                FilterUtil.setGrayFilter(this._gridImg);
                FilterUtil.setGrayFilter(this._itemImg);
            }
        }
    };
    SysNoticItem.prototype.setReadIconShow = function (value) {
        this._redIcon.visible = value;
        this._ilingquImg.visible = true;
    };
    SysNoticItem.prototype.statusEffectImg = function (value) {
        this._effectImg.visible = value;
    };
    SysNoticItem.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
        this._ilingquImg.visible = false;
        this._effectImg.visible = false;
    };
    SysNoticItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this._loadComplete == false)
            return;
        this._passTxt.dispose();
        this._passTxt = null;
        this._nameTxt.dispose();
        this._nameTxt = null;
        this._gridImg.filters = null;
        ObjectUtil.removes(this._redIcon, this._ilingquImg, this._effectImg, this._gridImg);
        this._redIcon = null;
        this._ilingquImg = null;
        this._effectImg = null;
        this._gridImg = null;
        if (this._itemImg) {
            Manager.pool.push(this._itemImg);
            this._itemImg.filters = null;
            this._itemImg = null;
        }
        this._cvo = null;
    };
    return SysNoticItem;
}(UIComponent));
//# sourceMappingURL=SysNoticItem.js.map