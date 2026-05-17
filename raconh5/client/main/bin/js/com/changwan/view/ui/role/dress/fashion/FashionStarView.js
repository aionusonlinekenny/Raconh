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
 * 服饰星阶视图
 * luzh
 * create 2017-12-18
*/
var FashionStarView = /** @class */ (function (_super) {
    __extends(FashionStarView, _super);
    function FashionStarView() {
        var _this = _super.call(this) || this;
        _this.STAR_W = 25;
        _this.STAR_H = 23;
        _this.touchEnabled = _this.touchChildren = false;
        _this._back = BitmapRes.create("skill_back1_png", 0, 0, 30, 30);
        _this._back.scale9Grid = new egret.Rectangle(8, 6, 126, 22);
        _this._back.height = 30;
        _this.addChild(_this._back);
        _this._stars = [];
        var star;
        for (var i = 0; i < FashionStarCVO.MAX_STAR; i++) {
            star = BitmapRes.create("common_star_grey_png", 0, 0, _this.STAR_W, _this.STAR_H);
            _this.addChild(star);
            _this._stars.push(star);
        }
        return _this;
    }
    Object.defineProperty(FashionStarView.prototype, "level", {
        set: function (value) {
            if (this._curLv == value)
                return;
            this._curLv = value;
            for (var i = 0; i < FashionStarCVO.MAX_STAR; i++) {
                this._stars[i].source = i < this._curLv ? "common_star_bright_png" : "common_star_grey_png";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FashionStarView.prototype, "backAlpha", {
        set: function (value) {
            this._back.alpha = value;
        },
        enumerable: true,
        configurable: true
    });
    FashionStarView.prototype.reuse = function (padding, width, height) {
        if (height === void 0) { height = 30; }
        _super.prototype.reuse.call(this);
        this._back.width = width;
        this._back.height = height;
        var starCount = FashionStarCVO.MAX_STAR;
        var starsW = this.STAR_W * starCount + padding * (starCount - 1);
        var startX = (width - starsW) / 2;
        for (var i = 0; i < starCount; i++) {
            this._stars[i].x = startX + (this.STAR_W + padding) * i;
            this._stars[i].y = (height - this.STAR_H) / 2 - 1;
        }
    };
    FashionStarView.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
    };
    FashionStarView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._back);
        if (this._back)
            Manager.pool.push(this._back);
        this._back = null;
        if (this._stars) {
            for (var i = 0; i < this._stars.length; i++) {
                Manager.pool.push(this._stars[i]);
                this._stars[i] = null;
            }
        }
        this._stars = null;
    };
    return FashionStarView;
}(Sprite));
//# sourceMappingURL=FashionStarView.js.map