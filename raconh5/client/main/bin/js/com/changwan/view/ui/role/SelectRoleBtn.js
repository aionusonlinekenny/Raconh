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
var SelectRoleBtn = /** @class */ (function (_super) {
    __extends(SelectRoleBtn, _super);
    function SelectRoleBtn() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("role", "SelectRoleBtnSkin");
        return _this;
    }
    return SelectRoleBtn;
}(ItemRenderer));
//# sourceMappingURL=SelectRoleBtn.js.map