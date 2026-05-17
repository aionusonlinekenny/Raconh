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
 * 服饰列表展开子项
 * Simon
 * create 2018-4-16
*/
var FashionListItem2 = /** @class */ (function (_super) {
    __extends(FashionListItem2, _super);
    function FashionListItem2() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.start();
        _this.addEvent();
        return _this;
    }
    FashionListItem2.prototype.start = function () {
        _super.prototype.start.call(this);
        this.width = 238;
        this.height = 119;
        this._model = Manager.model.getDress().fashionModel;
        this._back = BitmapRes.create("common_bg1_normal_png", 0, 0, 238, 119);
        this._back.touchEnabled = true;
        this.addChild(this._back);
        this._iconBack = BitmapRes.create("common_itemBg_png", 0, -11, 141, 141);
        this.addChild(this._iconBack);
        this._starBack = BitmapRes.create("skill_back1_png", 132, 67, 92, 24);
        this._starBack.height = 30;
        this.addChild(this._starBack);
        this._img = Manager.pool.create(BitmapRemote);
        this._img.x = 25;
        this._img.y = 18;
        this.addChild(this._img);
        this._iconWear = BitmapRes.create("common_dangqian_png", 0, 0, 40, 64);
        this.addChild(this._iconWear);
        this._redIcon = BitmapRes.create("common_red_icon_png", 206, 0, 35, 35);
        this.addChild(this._redIcon);
        this._name = TextField.create(110, 22);
        this._name.move(123, 28);
        this._name.textColor = Color.DEF;
        this._name.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._name.textAlign = egret.HorizontalAlign.CENTER;
        this._name.fontFamily = "Microsoft YaHei";
        this._name.size = 22;
        this.addChild(this._name);
        this._desc = TextField.create(110, 22);
        this._desc.move(123, 70);
        this._desc.textColor = Color.DEF;
        this._desc.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._desc.textAlign = egret.HorizontalAlign.CENTER;
        this._desc.fontFamily = "Microsoft YaHei";
        this._desc.size = 22;
        this.addChild(this._desc);
    };
    FashionListItem2.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawWearing();
        this.drawUpdate();
        this.drawRedIcon();
    };
    FashionListItem2.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid("drawWearing"))
            this.drawWearing();
        if (this.isInvalid("drawUpdate"))
            this.drawUpdate();
        if (this.isInvalid("drawUpdate", "drawItemUpdate"))
            this.drawRedIcon();
    };
    FashionListItem2.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._model.addEventListener(FashionEvent.WEARING, this.onWearing, this);
        this._model.addEventListener(FashionEvent.UPDATE, this.onUpdate, this);
        this._model.addEventListener(FashionEvent.SELECTED, this.onSelectedHandler, this);
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onItemUpdate, this);
    };
    FashionListItem2.prototype.removeEvent = function () {
        this._back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        if (this._model) {
            this._model.removeEventListener(FashionEvent.WEARING, this.onWearing, this);
            this._model.removeEventListener(FashionEvent.UPDATE, this.onUpdate, this);
            this._model.removeEventListener(FashionEvent.SELECTED, this.onSelectedHandler, this);
        }
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onItemUpdate, this);
        _super.prototype.removeEvent.call(this);
    };
    FashionListItem2.prototype.onTouchHandler = function (e) {
        if (this._selected)
            return;
        this._model.dispatchEvent(new FashionEvent(FashionEvent.SELECTED, this._cvo));
    };
    FashionListItem2.prototype.onWearing = function (e) {
        this.invalidate("drawWearing");
    };
    FashionListItem2.prototype.drawWearing = function () {
        this._iconWear.visible = this._cvo.isWearing;
    };
    FashionListItem2.prototype.onUpdate = function (e) {
        if (this._cvo.id == e.params.id)
            this.invalidate("drawUpdate");
    };
    FashionListItem2.prototype.drawUpdate = function () {
        if (this._cvo.isActived) {
            this._iconBack.filters = null;
            this._starBack.visible = true;
            this._desc.text = "星数：" + this._cvo.star;
            this._desc.textColor = Color.GREEN;
        }
        else {
            FilterUtil.setGrayFilter(this._iconBack);
            this._starBack.visible = false;
            this._desc.text = this._cvo.desc;
            this._desc.textColor = Color.DEF;
        }
        if (this._cvo == Manager.model.getDress().fashionModel.defaultData) {
            this.onTouchHandler(null);
            Manager.model.getDress().fashionModel.defaultData = null;
        }
    };
    FashionListItem2.prototype.onSelectedHandler = function (e) {
        this.selected = this._cvo.id == e.params.id;
    };
    Object.defineProperty(FashionListItem2.prototype, "selected", {
        set: function (value) {
            if (this._selected == value)
                return;
            this._selected = value;
            this._back.source = this._selected ? "common_xuanzhong1_png" : "common_bg1_normal_png";
        },
        enumerable: true,
        configurable: true
    });
    FashionListItem2.prototype.onItemUpdate = function (e) {
        if (e.params == ItemsType.BAG)
            this.invalidate("drawItemUpdate");
    };
    FashionListItem2.prototype.drawRedIcon = function () {
        this._redIcon.visible = this._cvo.canActiveOrUp;
    };
    FashionListItem2.prototype.reuse = function (cvo) {
        this._cvo = cvo;
        _super.prototype.reuse.call(this);
        var starCVO = FashionStarCVO.getCVO(this._cvo.id, 1);
        this._img.load(Manager.path.getIconPath(starCVO.loss.item.cvo.imgId));
        this._back.source = this._selected ? "common_xuanzhong1_png" : "common_bg1_normal_png";
        this._name.text = this._cvo.name;
    };
    FashionListItem2.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this._model = null;
        this._cvo = null;
        this._selected = false;
    };
    FashionListItem2.prototype.dispostSelf = function () {
        _super.prototype.disposeSelf.call(this);
        ObjectUtil.removes(this._back, this._iconBack, this._img, this._iconWear, this._redIcon, this._name, this._desc);
        if (this._back)
            Manager.pool.push(this._back);
        this._back = null;
        if (this._iconBack)
            Manager.pool.push(this._iconBack);
        this._iconBack = null;
        if (this._img)
            Manager.pool.push(this._img);
        this._img = null;
        if (this._iconWear)
            Manager.pool.push(this._iconWear);
        this._iconWear = null;
        if (this._redIcon)
            Manager.pool.push(this._redIcon);
        this._redIcon = null;
        if (this._name)
            Manager.pool.push(this._name);
        this._name = null;
        if (this._desc)
            Manager.pool.push(this._desc);
        this._desc = null;
        this._model = null;
        if (this._starBack)
            Manager.pool.push(this._starBack);
        this._starBack = null;
        this._cvo = null;
    };
    return FashionListItem2;
}(RenderSprite));
//# sourceMappingURL=FashionListItem2.js.map