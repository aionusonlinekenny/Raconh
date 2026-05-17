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
 * 升星 item
 * drq
 *  2018.04.12
 */
var StarUpItem = (function (_super) {
    __extends(StarUpItem, _super);
    function StarUpItem() {
        var _this = _super.call(this) || this;
        _this._state = false; //是否已经选中
        _this.skinName = Manager.path.getSkinName("equip", "StarUpItemSkin");
        _this.initView();
        return _this;
    }
    StarUpItem.prototype.initView = function () {
        this._item = Manager.pool.create(BaseGoods);
        this.addChild(this._item);
    };
    StarUpItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this._item.touchEnabled = false;
        this._item.touchChildren = false;
        this.touchEnabled = false;
        this.addEvent();
        //this._item.setStar(this._data.getStar());
    };
    StarUpItem.prototype.addEvent = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    StarUpItem.prototype.removeEvent = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    StarUpItem.prototype.onClickHandler = function () {
        var view = Manager.view.getView(12 /* EquipPanel */);
        if (view.curView._itemMaindata) {
            if (this._state) {
                this._state = false;
                this.filters = [];
                for (var i = 0; i < view.curView._itemsData.length; i++) {
                    if (view.curView._itemsData[i] == this.data) {
                        view.curView._itemsData[i] = null;
                        break;
                    }
                }
            }
            else {
                this._state = true;
                //this._item.selected = true;
                this.filters = [FilterUtil.getBrightFilter(-40)];
                for (var i = 0; i < view.curView._itemsData.length; i++) {
                    if (view.curView._itemsData[i] == null) {
                        view.curView._itemsData[i] = this.data;
                        break;
                    }
                }
            }
            view.curView.createTopItem();
        }
        else {
            FloatTips.addTips(LangCVO.getContent("starUp3"), Color.RED);
        }
    };
    StarUpItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this._item.setCvo(this.data.cvo);
        this._item.setStar(this.data.getStar());
        // let info:ItemsModelInfo = this.data as ItemsModelInfo;
        // if(info)
        // {
        //     this._item.data = info;
        // }
        if (this.data.base_id) {
            this.touchEnabled = true;
        }
        else {
            this.touchEnabled = false;
        }
    };
    StarUpItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.removeEvent();
    };
    return StarUpItem;
}(ItemRenderer));
__reflect(StarUpItem.prototype, "StarUpItem");
//# sourceMappingURL=StarUpItem.js.map