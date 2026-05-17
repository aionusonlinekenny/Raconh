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
 * 仓库
 * Simon
 * 2018.4.9
 */
var DepotView2 = /** @class */ (function (_super) {
    __extends(DepotView2, _super);
    function DepotView2() {
        var _this = _super.call(this) || this;
        _this.PAGE_SIZE = 35;
        _this.COL = 5;
        _this.SPACING = -20;
        _this._curPage = 0;
        _this._curLocal = 0;
        _this.skinName = Manager.path.getSkinName("bag", "depotViewSkin");
        _this.touchChildren = true;
        return _this;
    }
    DepotView2.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._container = Manager.pool.create(Sprite);
        this._container.touchEnabled = true;
        this._container.touchChildren = true;
        this.addChild(this._container);
        this._itemContainer = Manager.pool.create(Sprite);
        this._itemContainer.touchChildren = true;
        this._container.addChild(this._itemContainer);
        this._container.mask = new egret.Rectangle(50, 140, 640, 900);
        this._model = Manager.model.getItems();
        this._model.sortDepotList();
        if (!this._pageGroup) {
            this._pageGroup = new UiPageGroup(2);
            this._pageGroup.touchEnabled = false;
            this._pageGroup.touchChildren = false;
            this.addChild(this._pageGroup);
            this._pageGroup.x = 320;
            this._pageGroup.y = 1040;
        }
        this._pageGroup.onSelection(0);
    };
    DepotView2.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawView();
    };
    DepotView2.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid("drawView"))
            this.drawView();
    };
    DepotView2.prototype.addEvent = function () {
        this._model.addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.updateView, this);
        this._container.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginTouchHandler, this);
    };
    DepotView2.prototype.removeEvent = function () {
        this._model.removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.updateView, this);
        this._container.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginTouchHandler, this);
        this._container.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveHandler, this);
        this._container.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEndTouchHandler, this);
        this._container.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEndTouchHandler, this);
    };
    DepotView2.prototype.updateView = function (e) {
        if (e === void 0) { e = null; }
        if (!e || e.params == ItemsType.DEPOT)
            this.invalidate("drawView");
    };
    DepotView2.prototype.drawView = function () {
        var arr = this._model.depotList;
        var infoList = [];
        for (var i = this._curPage * this.PAGE_SIZE; i < (this._curPage + 1) * this.PAGE_SIZE; i++) {
            infoList.push(arr[i]);
        }
        if (this._itemObject1) {
            this._itemObject1.updateItemInfo(infoList);
        }
        else {
            this._itemObject1 = Manager.pool.create(ItemObject, infoList, this.COL, this.SPACING);
        }
        this._itemObject1.touchChildren = true;
        if (this._curPage == 0)
            this._itemObject1.x = 50;
        else if (this._curPage == 1)
            this._itemObject1.x = 50 + (141 + this.SPACING) * 5 + 30;
        this._itemObject1.y = 130;
        this._itemContainer.addChild(this._itemObject1);
        this._contentTxt.text = this._model.depotList.length + "/" + this._model.deoptTotal;
    };
    DepotView2.prototype.onBeginTouchHandler = function (e) {
        this._beginPoint = e.stageX;
        this._container.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginTouchHandler, this);
        this._container.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveHandler, this);
        this._container.addEventListener(egret.TouchEvent.TOUCH_END, this.onEndTouchHandler, this);
        this._container.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEndTouchHandler, this);
    };
    DepotView2.prototype.onMoveHandler = function (e) {
        this._container.touchChildren = false;
        var offset = this._beginPoint - e.stageX;
        if (Math.abs(offset) > 80) {
            this._container.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveHandler, this);
            this.handlerMove(offset);
        }
    };
    DepotView2.prototype.handlerMove = function (offset) {
        if (this._curPage == 1 && offset > 0)
            offset = 0;
        if (this._curPage == 0 && offset < 0)
            offset = 0;
        this._itemContainer.x = this._curLocal - offset;
        if (this._itemContainer.x < -((141 + this.SPACING) * 5 + 30))
            this._itemContainer.x = -((141 + this.SPACING) * 5 + 30);
        else if (this._itemContainer.x > 0)
            this._itemContainer.x = 0;
        var arr = this._model.depotList;
        var infoList = [];
        //向左
        if (offset > 20) {
            if (!this._itemObject2) {
                this._curPage = 1;
                for (var i = this._curPage * this.PAGE_SIZE; i < (this._curPage + 1) * this.PAGE_SIZE; i++) {
                    infoList.push(arr[i]);
                }
                this._itemObject2 = Manager.pool.create(ItemObject, infoList, this.COL, this.SPACING);
                this._itemObject2.touchChildren = true;
                this._itemObject2.x = 50 + (141 + this.SPACING) * 5 + 30;
                this._itemObject2.y = 130;
                this._itemContainer.addChild(this._itemObject2);
                egret.Tween.get(this._itemContainer).to({ x: -((141 + this.SPACING) * 5 + 30) }, 500).call(this.moveComplete, this);
            }
        }
        //向右
        if (offset < -20) {
            if (!this._itemObject2) {
                this._curPage = 0;
                for (var i = this._curPage * this.PAGE_SIZE; i < (this._curPage + 1) * this.PAGE_SIZE; i++) {
                    infoList.push(arr[i]);
                }
                this._itemObject2 = Manager.pool.create(ItemObject, infoList, this.COL, this.SPACING);
                this._itemObject2.x = 50;
                this._itemObject2.y = 130;
                this._itemContainer.addChild(this._itemObject2);
                egret.Tween.get(this._itemContainer).to({ x: 0 }, 500).call(this.moveComplete, this);
            }
        }
    };
    DepotView2.prototype.moveComplete = function () {
        this._curLocal = this._itemContainer.x;
        this._itemObject1.updateItemInfo(this._itemObject2.getItemInfo());
        this._itemObject1.x = this._itemObject2.x;
        this._itemObject1.y = this._itemObject2.y;
        Manager.pool.push(this._itemObject2);
        this._itemObject2 = null;
        this._pageGroup.onSelection(this._curPage);
    };
    DepotView2.prototype.onEndTouchHandler = function (e) {
        if (e === void 0) { e = null; }
        this._container.touchChildren = true;
        this._container.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginTouchHandler, this);
        this._container.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveHandler, this);
        this._container.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEndTouchHandler, this);
        this._container.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEndTouchHandler, this);
    };
    DepotView2.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        egret.Tween.removeTweens(this._itemContainer);
        this._container.mask = null;
        ObjectUtil.removes(this._contentTxt, this._pageGroup, this._itemObject1, this._itemObject2, this._itemContainer, this._container);
        if (this._contentTxt)
            this._contentTxt.dispose();
        this._contentTxt = null;
        if (this._pageGroup)
            this._pageGroup.dispose();
        this._pageGroup = null;
        if (this._itemObject1)
            this._itemObject1.dispose();
        this._itemObject1 = null;
        if (this._itemObject2)
            this._itemObject2.dispose();
        this._itemObject2 = null;
        if (this._itemContainer)
            Manager.pool.push(this._itemContainer);
        this._itemContainer = null;
        if (this._container)
            Manager.pool.push(this._container);
        this._container = null;
        this._model = null;
    };
    return DepotView2;
}(UIComponent));
//# sourceMappingURL=DepotView2.js.map