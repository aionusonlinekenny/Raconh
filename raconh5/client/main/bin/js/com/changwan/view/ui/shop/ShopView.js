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
 * pzx
 * create 18.3.6
 */
var ShopView = /** @class */ (function (_super) {
    __extends(ShopView, _super);
    function ShopView() {
        var _this = _super.call(this) || this;
        _this.configUI();
        _this.addEvent();
        return _this;
    }
    ShopView.prototype.configUI = function () {
        this._sp = Manager.pool.create(egret.Shape);
        this._sp.x = 11;
        this._sp.y = 120;
        this.addChild(this._sp);
        this._sp.graphics.beginFill(0, 0.2);
        this._sp.graphics.drawRect(0, 0, 700, 1019);
        this._sp.graphics.endFill();
        this._mode = Manager.model.getShop();
        this._currentView = Manager.pool.create(egret.DisplayObjectContainer);
        this._vScroller = new egret.ScrollView();
        this._vScroller.x = 10;
        this._vScroller.y = 120;
        this._vScroller.width = 700;
        this._vScroller.height = 1015;
        this._vScroller.horizontalScrollPolicy = "off";
        this._vScroller.setContent(this._currentView);
        this.addChild(this._vScroller);
        this._vScroller.scrollSpeed = 0.01;
        this._itemArr = [];
        this.touchChildren = true;
    };
    ShopView.prototype.addEvent = function () {
        this._mode.addEventListener(ShopEvent.SHOP_UPDATE_EVENT, this.updateView, this);
        this._mode.addEventListener(ShopEvent.SHOP_BUY_EVENT, this.breakBuyFun, this);
    };
    ShopView.prototype.removeEvent = function () {
        this._mode.removeEventListener(ShopEvent.SHOP_UPDATE_EVENT, this.updateView, this);
        this._mode.removeEventListener(ShopEvent.SHOP_BUY_EVENT, this.breakBuyFun, this);
    };
    /**购买成功返回 */
    ShopView.prototype.breakBuyFun = function () {
        FloatTips.addTips(LangCVO.getContent("shop1"));
        this._list = this._mode.getList(this._type);
        this.updateView();
    };
    ShopView.prototype.updateView = function () {
        if (this._list == null) {
            this._list = this._mode.getList(this._type);
        }
        var arr = ShopCVO.getShopTypeLists(this._type);
        var ln = arr.length > this._itemArr.length ? arr.length : this._itemArr.length;
        var h = Math.floor(arr.length / 3) + 1;
        for (var i = 0; i < ln; i++) {
            var item = void 0;
            if (this._itemArr[i] === undefined) {
                item = Manager.pool.create(ShopItem);
                item.x = i % 3 * 235;
                item.y = Math.floor(i / 3) * 335;
                this._currentView.addChild(item);
                this._itemArr.push(item);
            }
            else {
                item = this._itemArr[i];
            }
            if (arr[i]) {
                var vo = arr[i];
                var j = this._list.get(vo.id);
                if (j) {
                    vo.setCount(j);
                }
                else {
                    vo.setCount(0);
                }
                item.visible = true;
                item.setData(vo);
            }
            else {
                item.visible = false;
            }
        }
        this._currentView.height = h * 335;
    };
    ShopView.prototype.onFuncBtnChangeHandler = function (value) {
        this._type = value;
        this._list = this._mode.getList(this._type);
        this._vScroller.scrollTop = 0;
        if (this._list) {
            this.updateView();
        }
    };
    ShopView.prototype.dispose = function () {
        this.removeEvent();
        if (this._vScroller) {
            this._vScroller.removeContent();
            this.removeChild(this._vScroller);
            this._vScroller = null;
        }
        if (this._sp) {
            Manager.pool.push(this._sp);
            this._sp = null;
        }
        if (this._currentView) {
            Manager.pool.push(this._currentView);
            this._currentView = null;
        }
        if (this._itemArr) {
            this._itemArr.forEach(function (item, i) {
                Manager.pool.push(item);
            });
            this._itemArr = null;
        }
        this._list = null;
        this._mode = null;
        if (this.parent)
            this.parent.removeChild(this);
    };
    return ShopView;
}(egret.DisplayObjectContainer));
//# sourceMappingURL=ShopView.js.map