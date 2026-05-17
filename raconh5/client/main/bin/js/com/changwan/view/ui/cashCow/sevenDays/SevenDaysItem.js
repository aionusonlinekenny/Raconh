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
 *  七天登陆item
 * create 2018.1.30
 */
var SevenDaysItem = /** @class */ (function (_super) {
    __extends(SevenDaysItem, _super);
    function SevenDaysItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("cashCow\sevenDays", "SevenDaysItemSkin");
        _this.touchEnabled = true;
        _this.touchChildren = false;
        return _this;
    }
    SevenDaysItem.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
    };
    SevenDaysItem.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    SevenDaysItem.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    SevenDaysItem.prototype.setData = function (value) {
        this._cvo = value;
        this.invalidate(InvalidationType.DATA);
    };
    SevenDaysItem.prototype.drawData = function () {
        if (this._cvo) {
            this._dayImg.source = "cashCow_sevendDay_" + this._cvo.login_day_id + "_png";
            this.drawState();
        }
    };
    SevenDaysItem.prototype.drawState = function () {
        if (this._cvo.state == 1) {
            FilterUtil.setGrayFilter(this._bgImg);
            FilterUtil.setGrayFilter(this._dayImg);
            this._ilingquImg.visible = true;
            this._redIcon.visible = false;
            return;
        }
        else {
            this._bgImg.filters = null;
            this._dayImg.filters = null;
            this._ilingquImg.visible = false;
        }
        this._redIcon.visible = this._cvo.isReward();
        this._bitimg.load(Manager.path.getPanelCashCowPath("mini/mini_sevenDay_item_" + this._cvo.login_day_id, ".png"));
    };
    Object.defineProperty(SevenDaysItem.prototype, "cvo", {
        get: function () {
            return this._cvo;
        },
        enumerable: true,
        configurable: true
    });
    SevenDaysItem.prototype.showEffect = function (boo) {
        if (boo) {
            if (this._itemAni == null) {
                this._itemAni = Manager.animation.createEffectAnimation("Qiri");
                this.addChild(this._itemAni);
                this._itemAni.x = -60;
                this._itemAni.y = -74;
                return;
            }
            this._itemAni.visible = true;
            this._itemAni.play();
        }
        else {
            this._itemAni.stop();
            this._itemAni.visible = false;
        }
    };
    SevenDaysItem.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
    };
    SevenDaysItem.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.clear();
    };
    SevenDaysItem.prototype.clear = function (isRemove) {
        if (isRemove === void 0) { isRemove = false; }
        if (isRemove) {
            ObjectUtil.removes(this._ilingquImg, this._bgImg, this._dayImg, this._redIcon, this._itemAni);
        }
        this._bgImg.filters = null;
        this._dayImg.filters = null;
        this._ilingquImg = null;
        this._bgImg = null;
        this._dayImg = null;
        this._cvo = null;
        this._redIcon = null;
        if (this._itemAni)
            Manager.pool.push(this._itemAni);
        this._itemAni = null;
        Manager.pool.push(this._bitimg);
        this._bitimg = null;
    };
    SevenDaysItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.clear(true);
    };
    return SevenDaysItem;
}(UIComponent));
//# sourceMappingURL=SevenDaysItem.js.map