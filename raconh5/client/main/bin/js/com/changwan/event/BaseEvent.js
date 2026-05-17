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
var BaseEvent = /** @class */ (function (_super) {
    __extends(BaseEvent, _super);
    function BaseEvent(type, params, bubbles, cancelable) {
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        _this.params = params;
        return _this;
    }
    return BaseEvent;
}(egret.Event));
//# sourceMappingURL=BaseEvent.js.map