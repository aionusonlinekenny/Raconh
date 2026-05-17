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
 * drq
 * 聚元 Item
 * 2018.4.3
 */
var JuyuanItem = /** @class */ (function (_super) {
    __extends(JuyuanItem, _super);
    function JuyuanItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("juyuan", "JuyuanItemSkin");
        return _this;
    }
    JuyuanItem.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        if (!this._bimfont) {
            this._bimfont = Manager.pool.create(NumImgView2);
            this._bimfont.x = 238 + 115 + 10;
            this._bimfont.y = 526;
            this.addChild(this._bimfont);
        }
    };
    JuyuanItem.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    JuyuanItem.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    JuyuanItem.prototype.drawData = function () {
        //标题
        this._popupView.titleImg.source = "zhu_name0" + (this._index + 1) + "_png";
        //图标
        this._ballImg.source = "juyuan_icon_" + (this._index + 1) + "_png";
        if (this._data) {
            //战力
            var attr = this._data.attr;
            var attvo = Manager.pool.create(AttrVO, attr);
            var fight = attvo.getFighting();
            this._bimfont.setValue(fight, "nums_fighting_", 28);
            //各属性
            this._text01.text = attvo.attrInfos[0].desc();
            this._text02.text = attvo.attrInfos[1].desc();
            this._text03.text = attvo.attrInfos[2].desc();
            this._text04.text = attvo.attrInfos[3].desc();
            Manager.pool.push(attvo);
        }
        else {
            //战力
            this._bimfont.setValue(0, "nums_fighting_", 28);
            //各属性
            this._text01.text = LangCVO.getContent("juyuan19") + "+0";
            this._text02.text = LangCVO.getContent("juyuan20") + "+0";
            this._text03.text = LangCVO.getContent("juyuan21") + "+0";
            this._text04.text = LangCVO.getContent("juyuan22") + "+0";
        }
    };
    JuyuanItem.prototype.show = function (data, index) {
        this._data = data;
        this._index = index;
        _super.prototype.show.call(this);
    };
    JuyuanItem.prototype.onTouchCloseHandler = function (e) {
        Manager.view.hide(139 /* JuyuanItem */);
    };
    JuyuanItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.remove(this._ballImg);
        ObjectUtil.disposes(this._text01, this._text02, this._text03, this._text04);
        this._ballImg = null;
        this._text01 = null;
        this._text02 = null;
        this._text03 = null;
        this._text04 = null;
        this._bimfont.dispose();
        this._bimfont = null;
        this._data = null;
        this._index = null;
    };
    return JuyuanItem;
}(PopUpView));
//# sourceMappingURL=JuyuanItem.js.map