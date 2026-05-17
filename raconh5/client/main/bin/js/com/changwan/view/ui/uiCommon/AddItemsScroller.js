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
 * 2017.11.6
 * 滑动组件
 */
var AddItemsScroller = /** @class */ (function (_super) {
    __extends(AddItemsScroller, _super);
    function AddItemsScroller() {
        var _this = _super.call(this) || this;
        _this.MIN_SCORX = 80;
        _this.MAX_SCORW = 200;
        _this.MAX_BG_W = 220;
        /**总数 */
        _this._totalTount = 10;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("uiCommon", "AddItemsScrollerSKin");
        return _this;
    }
    AddItemsScroller.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
    };
    AddItemsScroller.prototype.addEvent = function () {
        this._barBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.addMoveEvent, this);
        this._barBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.endFun, this);
        this._jiaBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.countFun, this);
        this._jianBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.countFun, this);
    };
    AddItemsScroller.prototype.addMoveEvent = function (e) {
        this.offsetX = e.stageX - this._barBtn.x;
        this.addChild(this._barBtn);
        this._barBtn.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.moveFun, this);
    };
    AddItemsScroller.prototype.countFun = function (e) {
        var btn = e.currentTarget;
        switch (btn) {
            case this._jiaBtn:
                this._current++;
                if (this._current > this._totalTount) {
                    this._current = this._totalTount;
                }
                break;
            case this._jianBtn:
                this._current--;
                if (this._current < 1) {
                    this._current = 1;
                }
                break;
        }
        this.updateBarX2(this._current);
    };
    AddItemsScroller.prototype.updateBarX2 = function (value) {
        var c = value / this._totalTount;
        this._barBtn.x = c * this.MAX_SCORW + this.MIN_SCORX;
        this._progreImg.width = c * this.MAX_BG_W;
        this._kunGro.x = this._barBtn.x - 5;
        this._countTxt.text = this._current + "";
    };
    AddItemsScroller.prototype.moveFun = function (e) {
        this._barBtn.x = e.stageX - this.offsetX;
        if (this._barBtn.x <= this.MIN_SCORX) {
            this._barBtn.x = 80;
        }
        else if (this._barBtn.x > 280) {
            this._barBtn.x = 280;
        }
        this._kunGro.x = this._barBtn.x - 5;
        this.updateBarX(Math.round(this._barBtn.x));
    };
    AddItemsScroller.prototype.endFun = function (e) {
        this._barBtn.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.moveFun, this);
    };
    AddItemsScroller.prototype.updateBarX = function (value) {
        value = value - this.MIN_SCORX;
        var c = value / this.MAX_SCORW;
        this._progreImg.width = c * this.MAX_BG_W;
        this._current = Math.round(c * this._totalTount);
        if (this._current == 0) {
            this._current = 1;
            this.updateBarX2(1);
        }
        else {
            this._countTxt.text = "" + this._current;
        }
    };
    /**设置总数 */
    AddItemsScroller.prototype.setData = function (value, total) {
        if (total === void 0) { total = false; }
        this._totalTount = value;
        if (total) {
            this._current = value;
        }
        else {
            this._current = 1;
        }
        this.invalidate(InvalidationType.DATA);
    };
    Object.defineProperty(AddItemsScroller.prototype, "current", {
        /**进度数量 */
        get: function () {
            return this._current;
        },
        enumerable: true,
        configurable: true
    });
    AddItemsScroller.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    AddItemsScroller.prototype.draw = function () {
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    AddItemsScroller.prototype.drawData = function () {
        this.updateBarX2(this._current);
    };
    AddItemsScroller.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
    };
    AddItemsScroller.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this._current = 1;
        this._countTxt.text = "";
    };
    AddItemsScroller.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._jianBtn.dispose();
        this._jianBtn = null;
        this._jiaBtn.dispose();
        this._jiaBtn = null;
        this._countTxt.dispose();
        this._countTxt = null;
        this._barBtn.dispose();
        this._barBtn = null;
        ObjectUtil.removes(this._kunGro, this._progreImg);
        this._kunGro = null;
        this._progreImg = null;
    };
    return AddItemsScroller;
}(UIComponent));
//# sourceMappingURL=AddItemsScroller.js.map