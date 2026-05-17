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
/**删除物品通知 */
var DeleteItemReturnCMD = /** @class */ (function (_super) {
    __extends(DeleteItemReturnCMD, _super);
    function DeleteItemReturnCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_DIELETE_ITEM_REUTNR;
        return _this;
    }
    DeleteItemReturnCMD.prototype.receive = function (pi) {
        Manager.model.getItems().dletelItems(pi);
    };
    return DeleteItemReturnCMD;
}(BaseCMD));
//# sourceMappingURL=DeleteItemReturnCMD.js.map