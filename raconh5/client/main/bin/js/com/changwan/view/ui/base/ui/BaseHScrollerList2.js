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
var BaseHScrollerList2 = /** @class */ (function (_super) {
    __extends(BaseHScrollerList2, _super);
    function BaseHScrollerList2() {
        var _this = _super.call(this) || this;
        _this.isInit = false;
        _this.skinName = '<?xml version="1.0" encoding="utf-8"?>'
            + '<e:Skin class="BaseHScrollerListSkin" xmlns:e="http://ns.egret.com/eui" xmlns:w="http://ns.egret.com/wing" xmlns:ns1="*" >'
            + '<w:Config id="15f5cb7188c" ></w:Config>'
            + '<ns1:Scroller id="scroller" x="0" anchorOffsetX="0" anchorOffsetY="0" y="0">'
            + '<ns1:List id="itemList" x="0" y="0">'
            + '<e:layout>'
            + '<e:HorizontalLayout horizontalAlign="center" verticalAlign="middle"/>'
            + '</e:layout>'
            + '</ns1:List>'
            + '</ns1:Scroller>'
            + '</e:Skin>';
        _this.touchChildren = true;
        return _this;
    }
    /**
     * clz:对象类
     * data:对象数据
     * canMove:是否允许滚动
     */
    BaseHScrollerList2.prototype.initBtnListData = function (clz, data, canMove) {
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
    BaseHScrollerList2.prototype.dataProvider = function (data) {
        this.itemList.dataProvider = new eui.ArrayCollection(data);
    };
    BaseHScrollerList2.prototype.dispose = function () {
        if (this.scroller) {
            this.scroller.stopAnimation();
            this.scroller.dispose();
            this.scroller = null;
        }
        if (this.itemList) {
            var len = this.itemList.numChildren;
            for (var i = 0; i < len; i++) {
                ObjectUtil.dispose(this.itemList.getChildAt(0));
            }
            this.itemList.dispose();
            this.itemList = null;
        }
        _super.prototype.dispose.call(this);
    };
    return BaseHScrollerList2;
}(UIComponent));
//# sourceMappingURL=BaseHScrollerList2.js.map