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
/**刷新物品数据 */
var UpdateItemReturnCMD = /** @class */ (function (_super) {
    __extends(UpdateItemReturnCMD, _super);
    function UpdateItemReturnCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_UPDATE_ITEM_RETURN;
        return _this;
    }
    UpdateItemReturnCMD.prototype.receive = function (pi) {
        Manager.model.getItems().updateItemsList(pi);
    };
    return UpdateItemReturnCMD;
}(BaseCMD));
//# sourceMappingURL=UpdateItemReturnCMD.js.map