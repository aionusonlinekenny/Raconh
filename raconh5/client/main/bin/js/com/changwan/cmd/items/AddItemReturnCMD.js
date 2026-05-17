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
/**存储空间增加物品 */
var AddItemReturnCMD = /** @class */ (function (_super) {
    __extends(AddItemReturnCMD, _super);
    function AddItemReturnCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_ADD_ITEM_RETURN;
        return _this;
    }
    AddItemReturnCMD.prototype.receive = function (pi) {
        Manager.model.getItems().addTemsList(pi);
    };
    return AddItemReturnCMD;
}(BaseCMD));
//# sourceMappingURL=AddItemReturnCMD.js.map