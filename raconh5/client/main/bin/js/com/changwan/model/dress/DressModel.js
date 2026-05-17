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
 * 装扮model
 * liangyan
 * create 2017-11-28
*/
var DressModel = /** @class */ (function (_super) {
    __extends(DressModel, _super);
    function DressModel() {
        var _this = _super.call(this) || this;
        _this.titleModel = new TitleModel();
        _this.fashionModel = new FashionModel();
        return _this;
    }
    /**检测可操作（称号、时装） */
    DressModel.prototype.checkCanOperate = function () {
        var bol = this.titleModel.hasCanActive;
        if (bol)
            return true;
        else
            bol = this.fashionModel.hasCanActive;
        if (bol)
            return true;
        else
            return false;
    };
    return DressModel;
}(egret.EventDispatcher));
//# sourceMappingURL=DressModel.js.map