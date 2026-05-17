var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
 * 聊天事件
 * liangyan
 * create 2017-11-14
*/
var ChatEvent = (function (_super) {
    __extends(ChatEvent, _super);
    function ChatEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**添加频道消息 */
    ChatEvent.ADD_CHANNEL_MSG = "ADD_CHANNEL_MSG";
    /**添加私聊消息 */
    ChatEvent.ADD_PRIVATE_MSG = "ADD_PRIVATEL_MSG";
    return ChatEvent;
}(BaseEvent));
__reflect(ChatEvent.prototype, "ChatEvent");
//# sourceMappingURL=ChatEvent.js.map