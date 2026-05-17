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
 * 星星视图
 * liangyan
 * create 2017-12-18
*/
var StarView = /** @class */ (function (_super) {
    __extends(StarView, _super);
    function StarView() {
        var _this = _super.call(this) || this;
        _this.skinName = "";
        return _this;
    }
    StarView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
    };
    StarView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
    };
    StarView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
    };
    StarView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawLayout();
        this.drawData();
    };
    StarView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.LAYOUT))
            this.drawLayout();
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    StarView.prototype.drawLayout = function () {
        var star;
        for (var i = 0; i < this._sum; i++) {
            star = Manager.pool.create(BitmapRes, this._greyName);
            star.x = this._gap * i;
            this.addChild(star);
            this._stars.push(star);
        }
    };
    StarView.prototype.drawData = function () {
        if (this._sum < this._num)
            this._num = this._sum;
        if (this._num > 0) {
            for (var i = 0; i < this._num; i++) {
                this._stars[i].reuse(this._brightName, null, null);
            }
        }
        else {
            for (var i = this._sum - 1; i >= this._num; i--) {
                this._stars[i].reuse(this._greyName, null, null);
            }
        }
    };
    StarView.prototype.clearStar = function (isRemove) {
        if (isRemove === void 0) { isRemove = false; }
        if (!this._stars)
            return;
        this._stars.forEach(function (child, i) {
            if (isRemove)
                ObjectUtil.remove(child);
            Manager.pool.push(child);
            child = null;
        });
        this._stars.length = 0;
    };
    /**更新星星，num=0代表置灰所有 */
    StarView.prototype.update = function (num) {
        this._num = num;
        this.invalidate(InvalidationType.DATA);
    };
    StarView.prototype.reuse = function (sum, gap, greyName, brightName) {
        if (greyName === void 0) { greyName = "common_star49_grey_png"; }
        if (brightName === void 0) { brightName = "common_star49_bright_png"; }
        this._sum = sum ? sum : 0;
        this._gap = gap ? gap : 0;
        this._greyName = greyName;
        this._brightName = brightName;
        this._stars = [];
        _super.prototype.reuse.call(this);
    };
    StarView.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.clearStar();
        this._sum = this._gap = this._num = 0;
        this._greyName = this._brightName = "";
    };
    StarView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.clearStar(true);
        this._sum = this._gap = this._num = 0;
        this._greyName = this._brightName = "";
    };
    return StarView;
}(UIComponent));
//# sourceMappingURL=StarView.js.map