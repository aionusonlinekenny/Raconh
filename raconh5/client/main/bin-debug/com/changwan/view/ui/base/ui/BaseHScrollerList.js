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
var BaseHScrollerList = (function (_super) {
    __extends(BaseHScrollerList, _super);
    function BaseHScrollerList() {
        var _this = _super.call(this) || this;
        _this.isInit = false;
        _this.skinName = Manager.path.getSkinName("common", "BaseHScrollerListSkin");
        _this.touchChildren = true;
        return _this;
    }
    /**
     * clz:对象类
     * data:对象数据
     * canMove:是否允许滚动
     */
    BaseHScrollerList.prototype.initBtnListData = function (clz, data, canMove) {
        if (canMove === void 0) { canMove = false; }
        if (this.itemList) {
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    if (i == 0)
                        data[i].isSelected = true;
                    else
                        data[i].isSelected = false;
                }
            }
            this.itemList.dataProvider = new eui.ArrayCollection(data);
            this.itemList.itemRenderer = clz;
            this.itemList.allowMultipleSelection = false;
            this.itemList.width = this.width;
            this.itemList.height = this.height;
        }
        if (this.scroller) {
            this.scroller.scrollPolicyV = eui.ScrollPolicy.OFF;
            if (canMove)
                this.scroller.scrollPolicyH = eui.ScrollPolicy.ON;
            else
                this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        }
        this.isInit = true;
    };
    BaseHScrollerList.prototype.dataProvider = function (data) {
        this.itemList.dataProvider = new eui.ArrayCollection(data);
    };
    BaseHScrollerList.prototype.dispose = function () {
        this.scroller.stopAnimation();
        if (this.scroller)
            this.scroller.dispose();
        this.scroller = null;
        if (this.itemList)
            this.itemList.dispose();
        this.itemList = null;
        _super.prototype.dispose.call(this);
    };
    return BaseHScrollerList;
}(UIComponent));
__reflect(BaseHScrollerList.prototype, "BaseHScrollerList");
//# sourceMappingURL=BaseHScrollerList.js.map