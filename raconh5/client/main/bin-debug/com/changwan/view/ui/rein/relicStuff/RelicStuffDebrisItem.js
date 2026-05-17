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
 * 神器item
 * pzx
 * create 18.3.8
 */
var RelicStuffDebrisItem = (function (_super) {
    __extends(RelicStuffDebrisItem, _super);
    function RelicStuffDebrisItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("relicStuff", "RelicStuffDebrisItemSkin");
        _this.touchChildren = false;
        _this.touchEnabled = true;
        return _this;
    }
    RelicStuffDebrisItem.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
    };
    RelicStuffDebrisItem.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
    };
    RelicStuffDebrisItem.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
    };
    RelicStuffDebrisItem.prototype.touchHandler = function () {
        Manager.view.show(124 /* RelicStuffAttrView */, this._cvo);
    };
    RelicStuffDebrisItem.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
    };
    RelicStuffDebrisItem.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    RelicStuffDebrisItem.prototype.setData = function (data) {
        this._cvo = data;
        this.invalidate(InvalidationType.DATA);
    };
    RelicStuffDebrisItem.prototype.drawData = function () {
        this._itemBit.load(Manager.path.getRelicStuffPath("fargment/fargment" + this._cvo.des_id), 60, 60);
        var name = this._cvo.name;
        if (this._cvo.isActivity()) {
            name = HtmlUtil.addColorTag(name, "#00ff00");
        }
        else {
            name = HtmlUtil.addColorTag(name, Color.WHITE_STR);
        }
        name = HtmlUtil.addUTag(name);
        HtmlUtil.setTextFlow(this._nameTxt, name);
        this._desId = this._cvo.des_id;
        this._redIcon.visible = this._cvo.checkisActivity();
    };
    Object.defineProperty(RelicStuffDebrisItem.prototype, "cvo", {
        get: function () {
            return this._cvo;
        },
        enumerable: true,
        configurable: true
    });
    RelicStuffDebrisItem.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
    };
    RelicStuffDebrisItem.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.clear();
    };
    RelicStuffDebrisItem.prototype.clear = function (isRemove) {
        if (isRemove === void 0) { isRemove = false; }
        this._itemBit.dispose();
        this._itemBit = null;
        this._nameTxt.dispose();
        this._nameTxt = null;
        this._cvo = null;
        this.removeChild(this._redIcon);
        this._redIcon = null;
    };
    RelicStuffDebrisItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.clear(true);
    };
    return RelicStuffDebrisItem;
}(UIComponent));
__reflect(RelicStuffDebrisItem.prototype, "RelicStuffDebrisItem");
//# sourceMappingURL=RelicStuffDebrisItem.js.map