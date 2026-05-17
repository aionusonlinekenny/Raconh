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
 * 背包
 * pzx
 * 2018.4.9
 */
var BagView2 = /** @class */ (function (_super) {
    __extends(BagView2, _super);
    function BagView2(thisParent) {
        var _this = _super.call(this) || this;
        _this.PAGE_SIZE = 30;
        _this.COL = 5;
        _this.SPACING = -20;
        _this._curnum = 1;
        _this._curPage = 0;
        _this._curLocal = 0;
        _this._thisParent = thisParent;
        _this.skinName = Manager.path.getSkinName("bag", "BagViewSkin");
        _this.touchChildren = true;
        return _this;
    }
    BagView2.prototype.configUI = function () {
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
        this._model.sortBagList();
        if (this._pageGroup == null) {
            this._pageGroup = new UiPageGroup(5);
            this._pageGroup.touchEnabled = false;
            this._pageGroup.touchChildren = false;
            this.addChild(this._pageGroup);
            this._pageGroup.x = 260;
            this._pageGroup.y = 910;
        }
        this._pageGroup.onSelection(0);
    };
    // public reuse(thisParent:BagPanel):void
    // {
    // 	super.reuse();
    // 	this._thisParent = thisParent;
    // }
    // public unuse():void
    // {
    // 	super.unuse();
    // 	this._thisParent = null;
    // 	this._model = null;
    // 	this._contentTxt.text="";
    // }
    BagView2.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawView();
    };
    BagView2.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid("drawView"))
            this.drawView();
    };
    BagView2.prototype.addEvent = function () {
        this._model.addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.updateView, this);
        this._container.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginTouchHandler, this);
        this._rongLianBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._diuHuanBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    BagView2.prototype.removeEvent = function () {
        this._model.removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.updateView, this);
        this._container.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginTouchHandler, this);
        this._container.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveHandler, this);
        this._rongLianBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._diuHuanBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    BagView2.prototype.onClickHandler = function (e) {
        if (e.target == this._rongLianBtn) {
            this._thisParent.show(2);
            return;
        }
        if (e.target == this._diuHuanBtn) {
            if (Manager.model.getMap().getId() == MapConst.ID_HOME || Manager.model.getMap().mapCVO.isFieldMap) {
                if (OpenCVO.isOpen(OpenConst.ID_MARKET, true)) {
                    Manager.link.link(2, 10003);
                }
            }
            else {
                FloatTips.addTips(LangCVO.getContent("bag2"), Color.RED); //此地图不能摆摊
            }
            return;
        }
    };
    BagView2.prototype.updateView = function (e) {
        if (e === void 0) { e = null; }
        if (!e || e.params == ItemsType.BAG)
            this.invalidate("drawView");
    };
    BagView2.prototype.drawView = function () {
        if (this._curItem) {
            var arr = this._model.bagList;
            var infoList = [];
            for (var i = this._curPage * this.PAGE_SIZE; i < (this._curPage + 1) * this.PAGE_SIZE; i++) {
                infoList.push(arr[i]);
            }
            this._curItem.updateItemInfo(infoList);
        }
        else {
            var arr = this._model.bagList;
            var infoList = [];
            for (var i = this._curPage * this.PAGE_SIZE; i < (this._curPage + 1) * this.PAGE_SIZE; i++) {
                infoList.push(arr[i]);
            }
            this._itemObject1 = Manager.pool.create(ItemObject, infoList, this.COL, this.SPACING);
            this._itemObject1.touchChildren = true;
            this._itemObject2 = Manager.pool.create(ItemObject, [], this.COL, this.SPACING);
            this._itemObject2.touchChildren = true;
            this._itemObject1.x = 50;
            this._itemObject2.x = 50 + (141 + this.SPACING) * 5 + 30;
            this._itemObject2.y = this._itemObject1.y = 130;
            this._itemContainer.addChild(this._itemObject1);
            this._itemContainer.addChild(this._itemObject2);
            this._curItem = this._itemObject1;
        }
        this._contentTxt.text = this._model.bagList.length + "/" + this._model.bagTotal;
    };
    BagView2.prototype.onBeginTouchHandler = function (e) {
        this._beginPoint = e.stageX;
        this._container.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveHandler, this);
    };
    BagView2.prototype.onMoveHandler = function (e) {
        var offset = this._beginPoint - e.stageX;
        if (Math.abs(offset) > 80) {
            if (this._curPage >= this._pageGroup.totalpage - 1 && offset > 0)
                return;
            if (this._curPage == 0 && offset < 0)
                return;
            this._container.touchChildren = false;
            this.handlerMove(offset);
            this._container.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginTouchHandler, this);
            this._container.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveHandler, this);
        }
    };
    BagView2.prototype.handlerMove = function (offset) {
        var arr = this._model.bagList;
        var infoList = [];
        var item;
        var item2;
        if (this._curnum != 1) {
            item = this._itemObject1;
            item2 = this._itemObject2;
        }
        else {
            item = this._itemObject2;
            item2 = this._itemObject1;
        }
        //向左
        if (offset > 70) {
            this._curPage = this._pageGroup.page + 1;
            for (var i = this._curPage * this.PAGE_SIZE; i < (this._curPage + 1) * this.PAGE_SIZE; i++) {
                infoList.push(arr[i]);
            }
            item.updateItemInfo(infoList);
            item.x = item2.x + ((141 + this.SPACING) * 5 + 30);
            egret.Tween.get(this._itemContainer, { loop: false }).to({ x: -((141 + this.SPACING) * 5 + 30) * this._curPage }, 500).call(this.moveComplete, this);
        }
        //向右
        if (offset < -70) {
            this._curPage = this._pageGroup.page - 1;
            for (var i = this._curPage * this.PAGE_SIZE; i < (this._curPage + 1) * this.PAGE_SIZE; i++) {
                infoList.push(arr[i]);
            }
            item.updateItemInfo(infoList);
            item.x = item2.x - ((141 + this.SPACING) * 5 + 30);
            egret.Tween.get(this._itemContainer, { loop: false }).to({ x: -((141 + this.SPACING) * 5 + 30) * this._curPage }, 500).call(this.moveComplete, this);
        }
        this._curItem = item;
    };
    BagView2.prototype.moveComplete = function () {
        if (this._curnum != 1) {
            this._curnum = 1;
        }
        else {
            this._curnum = 2;
        }
        this._pageGroup.onSelection(this._curPage);
        this._container.touchChildren = true;
        this._container.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginTouchHandler, this);
    };
    BagView2.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        egret.Tween.removeTweens(this._itemContainer);
        this._container.mask = null;
        ObjectUtil.removes(this._contentTxt, this._pageGroup, this._itemObject1, this._itemObject2, this._itemContainer, this._container, this._rongLianBtn, this._diuHuanBtn, this._curItem);
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
        if (this._curItem)
            this._curItem.dispose();
        this._curItem = null;
        if (this._itemContainer)
            Manager.pool.push(this._itemContainer);
        this._itemContainer = null;
        if (this._container)
            Manager.pool.push(this._container);
        this._container = null;
        if (this._rongLianBtn)
            this._rongLianBtn.dispose();
        this._rongLianBtn = null;
        if (this._diuHuanBtn)
            this._diuHuanBtn.dispose();
        this._diuHuanBtn = null;
        this._model = null;
    };
    return BagView2;
}(UIComponent));
//# sourceMappingURL=BagView2.js.map