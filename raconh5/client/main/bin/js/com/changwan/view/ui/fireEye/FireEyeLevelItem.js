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
 * 火眼金睛关卡目标子项
 * liangyan
 * create 2018-03-28
*/
var FireEyeLevelItem = /** @class */ (function (_super) {
    __extends(FireEyeLevelItem, _super);
    function FireEyeLevelItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("fireEye", "FireEyeLevelItemSkin");
        return _this;
    }
    FireEyeLevelItem.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
    };
    FireEyeLevelItem.prototype.reuse = function (str) {
        _super.prototype.reuse.call(this);
        HtmlUtil.setTextFlow(this._txt, str);
        // this._txt.width = this._txt.textWidth + 10;
    };
    FireEyeLevelItem.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this._txt.text = "";
    };
    FireEyeLevelItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.remove(this._txt);
        this._txt.dispose();
        this._txt = null;
    };
    return FireEyeLevelItem;
}(UIComponent));
//# sourceMappingURL=FireEyeLevelItem.js.map