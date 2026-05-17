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
 * update devil 填加对象池接口
 */
var Label = /** @class */ (function (_super) {
    __extends(Label, _super);
    function Label() {
        return _super.call(this) || this;
    }
    Label.prototype.dispose = function () {
        if (this.parent)
            this.parent.removeChild(this);
    };
    return Label;
}(eui.Label));
//# sourceMappingURL=Label.js.map