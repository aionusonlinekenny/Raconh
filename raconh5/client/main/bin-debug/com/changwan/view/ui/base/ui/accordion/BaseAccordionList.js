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
 * 可折叠列表
 * liangyan
 * create 2017-11-29
*/
var BaseAccordionList = (function (_super) {
    __extends(BaseAccordionList, _super);
    function BaseAccordionList() {
        var _this = _super.call(this) || this;
        _this.start();
        _this.addEvent();
        return _this;
    }
    BaseAccordionList.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.addEventListener(BaseUIEvent.ACCORDION_CHANGE_H, this.sortElement, this);
        Manager.model.addEventListener(BaseUIEvent.ACCORDION_BEFORE_OPEN, this.closeAll, this);
    };
    BaseAccordionList.prototype.removeEvent = function () {
        Manager.model.removeEventListener(BaseUIEvent.ACCORDION_CHANGE_H, this.sortElement, this);
        Manager.model.removeEventListener(BaseUIEvent.ACCORDION_BEFORE_OPEN, this.closeAll, this);
        _super.prototype.removeEvent.call(this);
    };
    BaseAccordionList.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawLayout();
    };
    BaseAccordionList.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.LAYOUT))
            this.drawLayout();
    };
    BaseAccordionList.prototype.drawLayout = function () {
        if (!this._datas || this._datas.length == 0)
            return;
        var len = this._datas ? this._datas.length : 0;
        var maxScrollerH = this._listH - (len * this._btnH) - (len - 1) * this._listGap;
        var element;
        for (var i = 0; i < len; i++) {
            element = Manager.pool.create(BaseAccordionElement, this._datas[i], this._itemGap, maxScrollerH);
            element.y = this._y;
            this.addChild(element);
            this._elements.push(element);
            this._y += element.height + this._listGap;
        }
        Manager.model.dispatchEvent(new BaseUIEvent(BaseUIEvent.ACCORDION_COMPOSING_COMPLETE));
    };
    BaseAccordionList.prototype.sortElement = function (e) {
        if (!this._elements)
            return;
        var element;
        var curY = 0;
        for (var i = 0; i < this._elements.length; i++) {
            element = this._elements[i];
            element.y = curY;
            curY += element.getHeight() + this._listGap;
        }
    };
    BaseAccordionList.prototype.closeAll = function (e) {
        if (!this._elements)
            return;
        var element;
        var curY = 0;
        for (var i = 0; i < this._elements.length; i++) {
            element = this._elements[i];
            if (element.isShow)
                element.isShow = false;
        }
    };
    BaseAccordionList.prototype.setdefault = function (data) {
        if (!this._elements)
            return;
        if (data == null)
            return;
        for (var i = 0; i < this._elements.length; i++) {
            if (this._elements[i].getData().indexOf(data) != -1)
                this._elements[i].setDefault();
        }
    };
    /**
     * 折叠菜单
     * @params 列表元素{列表元素按钮，列表元素子项，子项数据，按钮文本}
     * @params 折叠菜单高度
     * @params 按钮高度
     * @params 列表元素间隔
     * @params 列表元素子项间隔
     */
    BaseAccordionList.prototype.reuse = function (datas, listHeight, btnH, listGap, itemGap) {
        if (listGap === void 0) { listGap = 0; }
        if (itemGap === void 0) { itemGap = 0; }
        this.touchChildren = true;
        this._datas = datas;
        this._listH = listHeight;
        this._btnH = btnH;
        this._listGap = listGap;
        this._itemGap = itemGap;
        this._elements = [];
        this._y = 0;
        _super.prototype.reuse.call(this);
        this.invalidate(InvalidationType.LAYOUT);
    };
    BaseAccordionList.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this._elements.forEach(function (child, i) {
            // Manager.pool.push(child);
            child.dispose();
            child = null;
        });
        this._elements.length = 0;
        this._elements = null;
        this._datas = null;
        this._y = 0;
    };
    BaseAccordionList.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._elements.forEach(function (child, i) {
            ObjectUtil.remove(child);
            // Manager.pool.push(child);
            child.dispose();
            child = null;
        });
        this._elements.length = 0;
        this._elements = null;
        this._datas = null;
        this._y = 0;
    };
    return BaseAccordionList;
}(RenderSprite));
__reflect(BaseAccordionList.prototype, "BaseAccordionList");
//# sourceMappingURL=BaseAccordionList.js.map