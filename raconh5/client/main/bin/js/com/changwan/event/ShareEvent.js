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
 * 分享事件
 * pzx
 * create 2018-3-1６
 */
var ShareEvent = /** @class */ (function (_super) {
    __extends(ShareEvent, _super);
    function ShareEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 更新数据
     */
    ShareEvent.SHARE_UPDATE = "SHARE_UPDATE";
    return ShareEvent;
}(BaseEvent));
//# sourceMappingURL=ShareEvent.js.map