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
 * 称号列表展开子项
 * liangyan
 * create 2017-11-29
*/
var TitleListItem2 = (function (_super) {
    __extends(TitleListItem2, _super);
    function TitleListItem2() {
        var _this = _super.call(this) || this;
        _this.RED_ICON = "red_icon";
        _this.touchChildren = true;
        _this.start();
        _this.addEvent();
        return _this;
    }
    TitleListItem2.prototype.start = function () {
        _super.prototype.start.call(this);
        this.width = 238;
        this.height = 91;
        this._back = BitmapRes.create("common_bg1_normal_png", 0, 0, 238, 91);
        this._back.touchEnabled = true;
        this.addChild(this._back);
        this._img = Manager.pool.create(BitmapRemote);
        this.addChild(this._img);
        this._isWearing = BitmapRes.create("common_dangqian_png", 0, 0, 40, 64);
        this.addChild(this._isWearing);
        this._redIcon = BitmapRes.create("common_red_icon_png", 206, -3, 35, 35);
        this.addChild(this._redIcon);
    };
    TitleListItem2.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        Manager.model.getDress().titleModel.addEventListener(TitleEvent.TITLE_SELECTED, this.onSelectedHandler, this);
        Manager.model.getDress().titleModel.addEventListener(TitleEvent.TITLE_LIST, this.onTitleHandler, this);
        Manager.model.getDress().titleModel.addEventListener(TitleEvent.TITLE_ACT_SUCC, this.onTitleHandler, this);
        Manager.model.getDress().titleModel.addEventListener(TitleEvent.TITLE_WEAR, this.onTitleHandler, this);
        Manager.model.getDress().titleModel.addEventListener(TitleEvent.TITLE_TAKE_OFF, this.onTitleHandler, this);
        Manager.model.getDress().titleModel.addEventListener(TitleEvent.TITLE_GAIN, this.onTitleHandler, this);
        Manager.model.getDress().titleModel.addEventListener(TitleEvent.TITLE_DELETE, this.onTitleHandler, this);
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onItemHandler, this);
    };
    TitleListItem2.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        Manager.model.getDress().titleModel.removeEventListener(TitleEvent.TITLE_SELECTED, this.onSelectedHandler, this);
        Manager.model.getDress().titleModel.removeEventListener(TitleEvent.TITLE_LIST, this.onTitleHandler, this);
        Manager.model.getDress().titleModel.removeEventListener(TitleEvent.TITLE_ACT_SUCC, this.onTitleHandler, this);
        Manager.model.getDress().titleModel.removeEventListener(TitleEvent.TITLE_WEAR, this.onTitleHandler, this);
        Manager.model.getDress().titleModel.removeEventListener(TitleEvent.TITLE_TAKE_OFF, this.onTitleHandler, this);
        Manager.model.getDress().titleModel.removeEventListener(TitleEvent.TITLE_GAIN, this.onTitleHandler, this);
        Manager.model.getDress().titleModel.removeEventListener(TitleEvent.TITLE_DELETE, this.onTitleHandler, this);
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onItemHandler, this);
    };
    TitleListItem2.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
        this.drawRedIcon();
    };
    TitleListItem2.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
        if (this.isInvalid(this.RED_ICON))
            this.drawRedIcon();
    };
    TitleListItem2.prototype.drawData = function () {
        if (!this._cvo)
            return;
        this._img.reuse(null);
        this._img.load(Manager.path.getTitlePath(this._cvo.resID));
        this._img.x = 20;
        this._img.y = 20;
        this._cvo.isActived ? this._img.filters = null : FilterUtil.setGrayFilter(this._img);
        this._back.reuse(this._selected ? "common_xuanzhong1_png" : "common_bg1_normal_png", null, null, 239, 91);
        this._isWearing.visible = this._cvo.isUsing;
        if (this._cvo == Manager.model.getDress().titleModel.defaultData) {
            this.onTouchHandler(null);
            Manager.model.getDress().titleModel.defaultData = null;
        }
    };
    TitleListItem2.prototype.drawRedIcon = function () {
        this._redIcon.visible = this._cvo.loss.isEnough();
    };
    TitleListItem2.prototype.onTouchHandler = function (e) {
        if (this._selected)
            return;
        Manager.model.getDress().titleModel.dispatchEvent(new TitleEvent(TitleEvent.TITLE_SELECTED, this._cvo.templateID));
    };
    TitleListItem2.prototype.onSelectedHandler = function (e) {
        if (this._cvo.templateID != e.params)
            this._selected = false;
        else
            this._selected = true;
        this._back.reuse(this._selected ? "common_xuanzhong1_png" : "common_bg1_normal_png", null, null, 238, 91);
    };
    TitleListItem2.prototype.onTitleHandler = function (e) {
        if (e.type == TitleEvent.TITLE_LIST || e.params == this._cvo.templateID)
            this.invalidate(InvalidationType.DATA);
    };
    TitleListItem2.prototype.onItemHandler = function (e) {
        if (e.params == ItemsType.BAG)
            this.invalidate(this.RED_ICON);
    };
    TitleListItem2.prototype.reuse = function (cvo) {
        this.touchChildren = true;
        this._cvo = cvo;
        this._selected = false;
        _super.prototype.reuse.call(this);
    };
    TitleListItem2.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        // if(this._back)
        // {
        //     Manager.pool.push(this._back);
        //     this._back = null;
        // }
        // if(this._btn)
        // {
        //     this._btn.dispose();
        //     this._btn = null;
        // }
        // if(this._img)
        // {
        //     Manager.pool.push(this._img);
        //     this._img = null;
        // }
        // if(this._isWearing)
        // {
        //     this._isWearing.bitmapData = null;
        //     this._isWearing = null;
        // }
        // this._cvo = null;
        // this._selected = false;
    };
    TitleListItem2.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._back, this._img, this._isWearing, this._redIcon);
        if (this._back) {
            Manager.pool.push(this._back);
            this._back = null;
        }
        if (this._img) {
            Manager.pool.push(this._img);
            this._img = null;
        }
        if (this._isWearing) {
            Manager.pool.push(this._isWearing);
            this._isWearing = null;
        }
        if (this._redIcon)
            Manager.pool.push(this._redIcon);
        this._redIcon = null;
        this._cvo = null;
        this._selected = false;
    };
    return TitleListItem2;
}(RenderSprite));
__reflect(TitleListItem2.prototype, "TitleListItem2");
//# sourceMappingURL=TitleListItem2.js.map