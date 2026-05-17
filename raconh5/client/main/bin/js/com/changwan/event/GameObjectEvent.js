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
var GameObjectEvent = /** @class */ (function (_super) {
    __extends(GameObjectEvent, _super);
    function GameObjectEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameObjectEvent.GO_POSITION = "GO_POSITION"; //位置变化
    GameObjectEvent.GO_INDEX9 = "GO_INDEX9"; //地图所在9宫格变化
    GameObjectEvent.GO_TITLE = "GO_TITLE"; //称号变化
    return GameObjectEvent;
}(BaseEvent));
//# sourceMappingURL=GameObjectEvent.js.map