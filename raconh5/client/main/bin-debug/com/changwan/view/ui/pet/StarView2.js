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
 * 星星视图
 * liangyan
 * create 2017-12-18
*/
var StarView2 = (function (_super) {
    __extends(StarView2, _super);
    function StarView2(sum, gap, greyName, brightName) {
        if (greyName === void 0) { greyName = "common_star49_grey_png"; }
        if (brightName === void 0) { brightName = "common_star49_bright_png"; }
        var _this = _super.call(this) || this;
        _this._sum = sum ? sum : 0;
        _this._gap = gap ? gap : 0;
        _this._greyName = greyName;
        _this._brightName = brightName;
        _this._stars = [];
        _this.start();
        _this.addEvent();
        return _this;
    }
    // public reuse(sum:number, gap:number, greyName:string = "common_star49_grey_png", brightName:string = "common_star49_bright_png"):void
    // {
    //     this._sum = sum ? sum : 0;
    //     this._gap = gap ? gap : 0;
    //     this._greyName = greyName;
    //     this._brightName = brightName;
    //     this._stars = [];
    //     super.reuse();
    // }
    // public unuse():void
    // {
    //     super.unuse();
    //     this.clearStar();
    //     this._sum = this._gap = this._num = 0;
    //     this._greyName = this._brightName = "";
    // }
    StarView2.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawLayout();
        this.drawData();
    };
    StarView2.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.LAYOUT))
            this.drawLayout();
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    StarView2.prototype.drawLayout = function () {
        var star;
        for (var i = 0; i < this._sum; i++) {
            star = Manager.pool.create(BitmapRes, this._greyName);
            star.x = this._gap * i;
            this.addChild(star);
            this._stars.push(star);
        }
    };
    StarView2.prototype.drawData = function () {
        if (this._sum < this._num)
            this._num = this._sum;
        if (this._num > 0) {
            for (var i = 0; i < this._num; i++) {
                this._stars[i].source = (this._brightName);
            }
        }
        else {
            for (var i = this._sum - 1; i >= this._num; i--) {
                this._stars[i].source = (this._greyName);
            }
        }
    };
    StarView2.prototype.clearStar = function () {
        if (!this._stars)
            return;
        var len = this._stars.length;
        for (var i = 0; i < len; i++) {
            Manager.pool.push(this._stars[i]);
        }
        this._stars.length = 0;
    };
    /**更新星星，num=0代表置灰所有 */
    StarView2.prototype.update = function (num) {
        this._num = num;
        this.invalidate(InvalidationType.DATA);
    };
    StarView2.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.clearStar();
        this._sum = this._gap = this._num = 0;
        this._greyName = this._brightName = "";
        this._stars = null;
    };
    return StarView2;
}(RenderSprite));
__reflect(StarView2.prototype, "StarView2");
//# sourceMappingURL=StarView2.js.map