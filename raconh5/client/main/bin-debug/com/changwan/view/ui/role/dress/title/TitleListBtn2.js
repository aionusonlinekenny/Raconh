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
 * 称号列表按钮
 * liangyan
 * create 2017-11-29
*/
var TitleListBtn2 = (function (_super) {
    __extends(TitleListBtn2, _super);
    function TitleListBtn2() {
        var _this = _super.call(this) || this;
        _this.start();
        _this.addEvent();
        return _this;
    }
    TitleListBtn2.prototype.start = function () {
        _super.prototype.start.call(this);
        this.width = 239;
        this.height = 60;
        this._btn = new Button();
        this._btn.skinName = "Button6Skin";
        this.addChild(this._btn);
    };
    TitleListBtn2.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    TitleListBtn2.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.LAYOUT))
            this.drawData();
    };
    TitleListBtn2.prototype.drawData = function () {
        var cvos = TitleCVO.getCvosByType(this._type);
        if (!cvos)
            return;
        var count = 0;
        cvos.forEach(function (cvo, i) {
            if (cvo.isActived)
                count++;
        });
        this._btn.label = StringUtils.setParam(LangCVO.getContent("title" + this._type), count, cvos.length);
    };
    TitleListBtn2.prototype.getHeight = function () {
        return this._btn.height;
    };
    TitleListBtn2.prototype.reuse = function (value) {
        this._type = value;
        _super.prototype.reuse.call(this);
        // this.invalidate(InvalidationType.DATA);
    };
    TitleListBtn2.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        // this._btn.dispose();
        // this._btn = null;
        this._type = -1;
    };
    TitleListBtn2.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.remove(this._btn);
        if (this._btn)
            this._btn.dispose();
        this._btn = null;
    };
    return TitleListBtn2;
}(RenderSprite));
__reflect(TitleListBtn2.prototype, "TitleListBtn2");
//# sourceMappingURL=TitleListBtn2.js.map