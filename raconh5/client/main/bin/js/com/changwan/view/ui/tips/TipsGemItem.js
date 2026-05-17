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
var TipsGemItem = /** @class */ (function (_super) {
    __extends(TipsGemItem, _super);
    function TipsGemItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("tips", "TipsGemItemSkin");
        _this._gemId = 0;
        return _this;
    }
    TipsGemItem.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._bg.width = 70;
        this._bg.height = 70;
        this._attrTxt.multiline = false;
        this._attrTxt.height = 24;
    };
    TipsGemItem.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        if (this._gemId != 0) {
            this.updateView();
        }
    };
    TipsGemItem.prototype.setData = function (gemId) {
        if (this._gemId == gemId)
            return;
        this._gemId = gemId;
        if (this._loadComplete) {
            this.updateView();
        }
    };
    TipsGemItem.prototype.updateView = function () {
        var iteminfo = ItemsCVO.getCvo(this._gemId);
        if (this._path != null)
            Manager.loader.remove(this._path, this.onLoadComplete, this);
        this._path = Manager.path.getIconPath(iteminfo.imgId);
        // Manager.loader.getRes(this._path.url, this.onLoadComplete, this);
        Manager.loader.load(this._path, this.onLoadComplete, this);
        this._nameTxt.text = iteminfo.name;
        var arrvo = Manager.pool.create(AttrVO, iteminfo.attr);
        var vo = arrvo.attrInfos[0];
        vo.sign = "+";
        this._attrTxt.text = vo.desc();
        Manager.pool.push(arrvo);
    };
    TipsGemItem.prototype.onLoadComplete = function (loader) {
        this._itemImg.texture = loader.data;
    };
    TipsGemItem.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        if (this._path != null) {
            Manager.loader.remove(this._path, this.onLoadComplete, this);
            this._path = null;
        }
        this._itemImg.texture = null;
        this._nameTxt.text = "";
        this._attrTxt.text = "";
        this._gemId = 0;
    };
    TipsGemItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this._path != null) {
            Manager.loader.remove(this._path, this.onLoadComplete, this);
            this._path = null;
        }
        ObjectUtil.removes(this._attrTxt, this._nameTxt, this._itemImg);
        this._itemImg = null;
        this._nameTxt = null;
        this._attrTxt = null;
    };
    return TipsGemItem;
}(UIComponent));
//# sourceMappingURL=TipsGemItem.js.map