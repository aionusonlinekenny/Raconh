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
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super.call(this) || this;
    }
    Button.prototype.dispose = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    Button.prototype.move = function (x, y) {
        this.x = x;
        this.y = y;
    };
    Button.prototype.setSize = function (width, height) {
        this.width = width;
        this.height = height;
    };
    return Button;
}(eui.Button));
//# sourceMappingURL=Button.js.map