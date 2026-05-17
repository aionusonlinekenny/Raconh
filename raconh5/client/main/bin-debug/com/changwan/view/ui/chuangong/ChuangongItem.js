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
var ChuangongItem = (function (_super) {
    __extends(ChuangongItem, _super);
    function ChuangongItem() {
        var _this = _super.call(this) || this;
        _this._num = 0;
        _this._loadComplete = false;
        _this.start();
        return _this;
    }
    ChuangongItem.prototype.start = function () {
        _super.prototype.start.call(this);
        this._bgImg = BitmapRes.create("copy_exp_back_1_png", 0, 0, 396, 101);
        this.addChild(this._bgImg);
        this._percent = BitmapRes.create("nums_vip2_percent_png", 60, 27, 35, 40);
        this.addChild(this._percent);
        this._txt1 = TextField.create(110, 22);
        this._txt1.move(117, 17);
        this._txt1.textColor = Color.WHITE;
        this._txt1.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._txt1.textAlign = egret.HorizontalAlign.LEFT;
        this._txt1.fontFamily = "Microsoft YaHei";
        this._txt1.size = 22;
        this._txt1.text = LangCVO.getContent("training9");
        this.addChild(this._txt1);
        this._txt2 = TextField.create(110, 22);
        this._txt2.move(117, 55);
        this._txt2.textColor = Color.WHITE;
        this._txt2.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._txt2.textAlign = egret.HorizontalAlign.LEFT;
        this._txt2.fontFamily = "Microsoft YaHei";
        this._txt2.size = 22;
        this._txt2.text = LangCVO.getContent("training10");
        this.addChild(this._txt2);
        this.value = TextField.create(171, 22);
        this.value.move(230, 17);
        this.value.textColor = Color.WHITE;
        this.value.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.value.textAlign = egret.HorizontalAlign.LEFT;
        this.value.fontFamily = "Microsoft YaHei";
        this.value.size = 22;
        this.value.text = "";
        this.addChild(this.value);
        this.value2 = TextField.create(150, 22);
        this.value2.move(230, 55);
        this.value2.textColor = Color.WHITE;
        this.value2.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.value2.textAlign = egret.HorizontalAlign.LEFT;
        this.value2.fontFamily = "Microsoft YaHei";
        this.value2.size = 22;
        this.value2.text = "0";
        this.addChild(this.value2);
        this._numView = Manager.pool.create(NumImgView2);
        this._numView.y = this._percent.y;
        this.addChild(this._numView);
        this._loadComplete = true;
        this.setNum();
    };
    ChuangongItem.prototype.setValue = function (value) {
        this._num = value;
        if (this._loadComplete)
            this.setNum();
    };
    ChuangongItem.prototype.setNum = function () {
        this._numView.setValue(this._num, "nums_vip2_", -18);
        this._numView.x = 58 - (this._numView.width + 20) / 2;
        this._percent.x = this._numView.x + this._numView.width - 15;
    };
    ChuangongItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._bgImg, this._percent, this._txt1, this._txt2, this.value, this.value2, this._numView);
        if (this._bgImg)
            Manager.pool.push(this._bgImg);
        this._bgImg = null;
        if (this._percent)
            Manager.pool.push(this._percent);
        this._percent = null;
        if (this._txt1)
            Manager.pool.push(this._txt1);
        this._txt1 = null;
        if (this._txt2)
            Manager.pool.push(this._txt2);
        this._txt2 = null;
        if (this.value)
            Manager.pool.push(this.value);
        this.value = null;
        if (this.value2)
            Manager.pool.push(this.value2);
        this.value2 = null;
        if (this._numView)
            Manager.pool.push(this._numView);
        this._numView = null;
    };
    return ChuangongItem;
}(Sprite));
__reflect(ChuangongItem.prototype, "ChuangongItem");
//# sourceMappingURL=ChuangongItem.js.map