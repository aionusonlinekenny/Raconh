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
var ChuangongAwardItem = /** @class */ (function (_super) {
    __extends(ChuangongAwardItem, _super);
    function ChuangongAwardItem() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.start();
        return _this;
    }
    ChuangongAwardItem.prototype.start = function () {
        _super.prototype.start.call(this);
        this.item = Manager.pool.create(BaseGoods);
        this.addChild(this.item);
        this.recommendImg = BitmapRes.create("common_itemRecommend_png", 16, 17, 82, 84);
        this.addChild(this.recommendImg);
        this.bei = TextField.create(73, 25);
        this.bei.move(14, 65);
        this.bei.textColor = Color.WHITE;
        this.bei.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.bei.textAlign = egret.HorizontalAlign.CENTER;
        this.bei.fontFamily = "Microsoft YaHei";
        this.bei.size = 25;
        this.bei.text = LangCVO.getContent("training2", 2);
        this.bei.rotation = 314;
        this.addChild(this.bei);
        this.count = TextField.create(100, 24);
        this.count.move(13, 91);
        this.count.textColor = Color.WHITE;
        this.count.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.count.textAlign = egret.HorizontalAlign.RIGHT;
        this.count.fontFamily = "Microsoft YaHei";
        this.count.size = 24;
        this.count.text = "100000";
        this.addChild(this.count);
    };
    ChuangongAwardItem.prototype.addObject = function () {
        var arge = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arge[_i] = arguments[_i];
        }
        if (arge) {
            for (var _a = 0, arge_1 = arge; _a < arge_1.length; _a++) {
                var obj = arge_1[_a];
                if (obj && !obj.parent)
                    obj.parent.addChild(obj);
            }
        }
    };
    ChuangongAwardItem.prototype.removeObject = function () {
        var arge = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arge[_i] = arguments[_i];
        }
        if (arge) {
            for (var _a = 0, arge_2 = arge; _a < arge_2.length; _a++) {
                var obj = arge_2[_a];
                if (obj && obj.parent)
                    obj.parent.removeChild(obj);
            }
        }
    };
    ChuangongAwardItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this.item, this.recommendImg, this.bei, this.count);
        if (this.item)
            Manager.pool.push(this.item);
        this.item = null;
        if (this.recommendImg)
            Manager.pool.push(this.recommendImg);
        this.recommendImg = null;
        if (this.bei)
            Manager.pool.push(this.bei);
        this.bei = null;
        if (this.count)
            Manager.pool.push(this.count);
        this.count = null;
    };
    return ChuangongAwardItem;
}(Sprite));
//# sourceMappingURL=ChuangongAwardItem.js.map