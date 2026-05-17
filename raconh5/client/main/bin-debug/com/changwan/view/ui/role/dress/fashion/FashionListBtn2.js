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
 * 服饰列表按钮
 * Simon
 * create 2018-4-16
*/
var FashionListBtn2 = (function (_super) {
    __extends(FashionListBtn2, _super);
    function FashionListBtn2() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this.start();
        _this.addEvent();
        return _this;
    }
    FashionListBtn2.prototype.start = function () {
        _super.prototype.start.call(this);
        this.height = 60;
        this._btn = new Button();
        this._btn.skinName = "Button6Skin";
        this.addChild(this._btn);
    };
    FashionListBtn2.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.getDress().fashionModel.addEventListener(FashionEvent.UPDATE, this.onUpdate, this);
    };
    FashionListBtn2.prototype.removeEvent = function () {
        Manager.model.getDress().fashionModel.removeEventListener(FashionEvent.UPDATE, this.onUpdate, this);
        _super.prototype.removeEvent.call(this);
    };
    FashionListBtn2.prototype.onUpdate = function (e) {
        if (this._cvos[0].type == e.params.type)
            this.invalidate("drawUpdate");
    };
    FashionListBtn2.prototype.drawUpdate = function () {
        var count = 0;
        this._cvos.forEach(function (cvo, i) {
            if (cvo.isActived)
                count++;
        });
        this._btn.label = StringUtils.setParam(LangCVO.getContent("title" + this._cvos[0].type), count, this._cvos.length);
    };
    FashionListBtn2.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid("drawUpdate"))
            this.drawUpdate();
    };
    FashionListBtn2.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawUpdate();
    };
    FashionListBtn2.prototype.getHeight = function () {
        return this._btn.height;
    };
    FashionListBtn2.prototype.reuse = function (value) {
        this._cvos = value;
        _super.prototype.reuse.call(this);
    };
    FashionListBtn2.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this._cvos = null;
    };
    FashionListBtn2.prototype.disposeSelf = function () {
        _super.prototype.disposeSelf.call(this);
        ObjectUtil.remove(this._btn);
        if (this._btn)
            this._btn.dispose();
        this._btn = null;
        this._cvos = null;
    };
    return FashionListBtn2;
}(RenderSprite));
__reflect(FashionListBtn2.prototype, "FashionListBtn2");
//# sourceMappingURL=FashionListBtn2.js.map