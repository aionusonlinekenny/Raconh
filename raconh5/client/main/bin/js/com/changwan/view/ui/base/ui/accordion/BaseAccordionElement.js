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
 * 折叠列表元素
 * liangyan
 * create 2017-11-29
*/
var BaseAccordionElement = /** @class */ (function (_super) {
    __extends(BaseAccordionElement, _super);
    function BaseAccordionElement() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this._y = 0;
        return _this;
    }
    BaseAccordionElement.prototype.onTouchHandler = function (e) {
        if (e != null && !this._isShow)
            Manager.model.dispatchEvent(new BaseUIEvent(BaseUIEvent.ACCORDION_BEFORE_OPEN));
        if (!this._isShow) {
            this._scroller.y = this._btn.getHeight();
            this.onMoveComplete(true);
        }
        else {
            this._scroller.y = this._hideY;
            this.onMoveComplete(false);
        }
    };
    BaseAccordionElement.prototype.onMoveComplete = function (needAdd) {
        this._isShow = needAdd;
        if (!this._isShow) {
            if (this._scroller.parent)
                this._scroller.parent.removeChild(this._scroller);
        }
        else {
            if (!this._scroller.parent)
                this.addChild(this._scroller);
        }
        Manager.model.dispatchEvent(new BaseUIEvent(BaseUIEvent.ACCORDION_CHANGE_H));
    };
    BaseAccordionElement.prototype.clearGroup = function () {
        var num = this._group.numChildren;
        for (var i = 0; i < num; i++) {
            var child = this._group.getChildAt(0);
            if (child) {
                this._group.removeChild(child);
                // Manager.pool.push(child);
                child.dispose();
                child = null;
            }
        }
    };
    Object.defineProperty(BaseAccordionElement.prototype, "data", {
        set: function (value) {
            if (!value)
                return;
            var clazz = value.btn;
            this._btn = Manager.pool.create(clazz, value.label);
            this._btn.touchEnabled = true;
            this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            if (!this._btn.parent)
                this.addChild(this._btn);
            this._scroller = new egret.ScrollView();
            this._scroller.horizontalScrollPolicy = "off";
            this._scroller.scrollSpeed = 0.01;
            this._scroller.bounces = false;
            this._group = new eui.Group();
            this._group.scrollEnabled = true;
            this._data = value;
            var len = value.datas.length;
            var child;
            clazz = value.item;
            for (var i = 0; i < len; i++) {
                child = Manager.pool.create(clazz, value.datas[i]);
                child.y = this._y;
                this._group.addChild(child);
                this._y += child.height + this._itemGap;
            }
            this._group.width = child ? child.width : 0;
            this._group.height = this._y;
            this._scroller.x = this._btn.x;
            this._hideY = this._scroller.y = -this._y + this._btn.getHeight();
            this._scroller.setContent(this._group);
            this._scroller.width = child ? child.width : 0;
            this._scroller.height = this._y > this._maxScrollerH ? this._maxScrollerH : this._y;
        },
        enumerable: true,
        configurable: true
    });
    BaseAccordionElement.prototype.getData = function () {
        return this._data.datas;
    };
    BaseAccordionElement.prototype.setDefault = function () {
        this.onTouchHandler(null);
    };
    Object.defineProperty(BaseAccordionElement.prototype, "isShow", {
        get: function () {
            return this._isShow;
        },
        set: function (value) {
            if (this._isShow == value)
                return;
            this.onTouchHandler(null);
        },
        enumerable: true,
        configurable: true
    });
    BaseAccordionElement.prototype.getHeight = function () {
        var result = 0;
        if (this._isShow && this._scroller != null)
            result += this._scroller.height;
        if (this._btn)
            result += this._btn.getHeight();
        return result;
    };
    BaseAccordionElement.prototype.reuse = function (value, itemGap, maxScrollerH) {
        this._isShow = false;
        this.touchChildren = true;
        this._itemGap = itemGap;
        this._maxScrollerH = maxScrollerH;
        this.data = value;
    };
    BaseAccordionElement.prototype.unuse = function () {
        if (this._btn) {
            this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            // Manager.pool.push(this._btn);
            this._btn.dispose();
            this._btn = null;
        }
        if (this._scroller) {
            this._scroller.removeContent();
            this._scroller = null;
        }
        if (this._group) {
            this._group.mask = null;
            this.clearGroup();
            this._group = null;
        }
        this._y = 0;
        this._isShow = false;
        this._data = null;
    };
    BaseAccordionElement.prototype.dispose = function () {
        if (this._btn) {
            ObjectUtil.removes(this._btn);
            this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._btn.dispose();
            this._btn = null;
        }
        if (this._scroller) {
            this._scroller.removeContent();
            ObjectUtil.removes(this._scroller);
            this._scroller = null;
        }
        if (this._group) {
            this._group.mask = null;
            this.clearGroup();
            ObjectUtil.remove(this._group);
            this._group = null;
        }
        this._data = null;
    };
    return BaseAccordionElement;
}(egret.DisplayObjectContainer));
//# sourceMappingURL=BaseAccordionElement.js.map