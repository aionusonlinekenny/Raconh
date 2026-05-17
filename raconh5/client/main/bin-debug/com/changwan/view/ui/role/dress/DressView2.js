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
 * 装扮主界面
 * liangyan
 * create 2017-11-27
*/
var DressView2 = (function (_super) {
    __extends(DressView2, _super);
    function DressView2(args) {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this._showArgs = args;
        _this.start();
        _this.addEvent();
        _this.initData();
        return _this;
    }
    DressView2.prototype.start = function () {
        _super.prototype.start.call(this);
        this.width = 720;
        this.height = 1280;
        this._bgImg = Manager.pool.create(BitmapRemote);
        this._bgImg.x = 5;
        this._bgImg.y = 118;
        this._bgImg.load(PathInfo.getPath("res/common/common_back4.png", LoaderType.IMAGE), 710, 180);
        this.addChild(this._bgImg);
        this._funList = new BaseHScrollerList();
        this._funList.width = 615;
        this._funList.height = 144;
        this._funList.x = 54;
        this._funList.y = 126;
        this._funList.skinName = "BaseHScrollerListSkin";
        this.addChild(this._funList);
        this._menuBtnContent = [];
        if (OpenCVO.isOpen(OpenConst.ID_TITLE))
            this._menuBtnContent.push({ typeImg: "title_btn_png" });
        if (OpenCVO.isOpen(OpenConst.ID_CLOAK))
            this._menuBtnContent.push({ typeImg: "clothes_btn_png" });
        this._funList.initBtnListData(DressTypeBtn, this._menuBtnContent);
        this._funList.itemList.layout.gap = 13;
        this._funList.validateNow();
    };
    DressView2.prototype.initData = function () {
        if (this._showArgs != null && this._showArgs.length > 0) {
            this._funList.itemList.selectedIndex = parseInt(this._showArgs.shift());
        }
        else
            this._funList.itemList.selectedIndex = DressType.TITLE;
        this._funList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
    };
    DressView2.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._funList.itemList.addEventListener(eui.UIEvent.CHANGE, this.onFunSelectHandler, this);
        Manager.model.getDress().fashionModel.addEventListener(FashionEvent.UPDATE, this.onFashionUpdate, this);
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onItemUpdate, this);
    };
    DressView2.prototype.removeEvent = function () {
        this._funList.itemList.removeEventListener(eui.UIEvent.CHANGE, this.onFunSelectHandler, this);
        Manager.model.getDress().fashionModel.removeEventListener(FashionEvent.UPDATE, this.onFashionUpdate, this);
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onItemUpdate, this);
        _super.prototype.removeEvent.call(this);
    };
    DressView2.prototype.onItemUpdate = function (e) {
        if (e.params != ItemsType.BAG)
            return;
        this.invalidate("drawItem");
    };
    DressView2.prototype.onFashionUpdate = function (e) {
        this.invalidate("drawFashion");
    };
    DressView2.prototype.drawFashion = function () {
        var btn = this._funList.itemList.getElementAt(DressType.CLOTHES);
        if (btn)
            btn.showRedIcon(Manager.model.getDress().fashionModel.hasCanActive);
    };
    DressView2.prototype.drawTitle = function () {
        var btn = this._funList.itemList.getElementAt(DressType.TITLE);
        if (btn)
            btn.showRedIcon(Manager.model.getDress().titleModel.hasCanActive);
    };
    DressView2.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawFashion();
        this.drawTitle();
    };
    DressView2.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid("drawFashion", "drawItem"))
            this.drawFashion();
        if (this.isInvalid("drawItem"))
            this.drawTitle();
    };
    DressView2.prototype.onFunSelectHandler = function (e) {
        var index = this._funList.itemList.selectedIndex;
        if (index == -1)
            return;
        var isBack = false;
        switch (index) {
            case DressType.TITLE:
                isBack = !OpenCVO.isOpen(OpenConst.ID_TITLE, true);
                break;
            case DressType.CLOTHES:
                isBack = !OpenCVO.isOpen(OpenConst.ID_CLOAK, true);
                break;
        }
        if (isBack)
            this._funList.itemList.selectedIndex = index = 0;
        if (this._curView) {
            this._curView.dispose();
            this._curView = null;
        }
        switch (index) {
            case DressType.CLOTHES:
                this._curView = new FashionView2(this._showArgs ? parseInt(this._showArgs[0]) : null);
                break;
            case DressType.TITLE:
                this._curView = new TitleView2(this._showArgs ? parseInt(this._showArgs[0]) : null);
                break;
        }
        if (this._curView && !this._curView.parent)
            this.addChild(this._curView);
    };
    DressView2.prototype.reuse = function (args) {
        this._showArgs = args;
        _super.prototype.reuse.call(this);
        // if(this._funList.itemList.selectedIndex != index) 
        // {
        //     this._funList.itemList.selectedIndex = index;
        //     this._funList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
        // }
    };
    DressView2.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this._funList.dispose();
        this._funList = null;
        this._menuBtnContent.length = 0;
        this._menuBtnContent = null;
        this._curView.dispose();
        this._curView = null;
    };
    DressView2.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._bgImg, this._funList);
        if (this._bgImg)
            Manager.pool.push(this._bgImg);
        this._bgImg = null;
        this._funList.dispose();
        this._funList = null;
        this._menuBtnContent.length = 0;
        this._menuBtnContent = null;
        if (this._curView) {
            this._curView.dispose();
            this._curView = null;
        }
    };
    return DressView2;
}(RenderSprite));
__reflect(DressView2.prototype, "DressView2");
//# sourceMappingURL=DressView2.js.map