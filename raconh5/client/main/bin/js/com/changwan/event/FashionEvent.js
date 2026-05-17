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
 * 服饰Event
 * luzhihong
 * create 2017-12-19
 */
var FashionEvent = /** @class */ (function (_super) {
    __extends(FashionEvent, _super);
    function FashionEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**选中服饰 */
    FashionEvent.SELECTED = "SELECTED";
    //时效和星数更新
    FashionEvent.UPDATE = "UPDATE";
    //穿戴更新
    FashionEvent.WEARING = "WEARING";
    return FashionEvent;
}(BaseEvent));
//# sourceMappingURL=FashionEvent.js.map