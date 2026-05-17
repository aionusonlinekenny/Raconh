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
var GMContentItem = (function (_super) {
    __extends(GMContentItem, _super);
    // private _isSetData:boolean = false;
    function GMContentItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("debug", "GMContentItemSkin");
        return _this;
    }
    GMContentItem.prototype.dataChanged = function () {
        this._content.text = this.data;
        this._content.height = this._content.textHeight;
        this.height = this._content.textHeight + 5;
        // if(!this._isSetData)
        // {
        // 	this._isSetData = true;
        // 	GameDispatcher.getInstance().dispatchEventWith(BaseUIEvent.ITEM_RENDERER_COMPLETE, false);
        // }
    };
    GMContentItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._content);
        if (this._content)
            this._content.dispose();
        this._content = null;
    };
    return GMContentItem;
}(ItemRenderer));
__reflect(GMContentItem.prototype, "GMContentItem");
//# sourceMappingURL=GMContentItem.js.map