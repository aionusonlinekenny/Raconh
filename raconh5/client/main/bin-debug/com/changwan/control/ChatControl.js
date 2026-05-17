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
 * 聊天controller
 * liangyan
 * create 2017-11-13
*/
var ChatControl = (function (_super) {
    __extends(ChatControl, _super);
    function ChatControl() {
        return _super.call(this) || this;
    }
    ChatControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.CHAT_CHANNEL_MSG, ChatChannelMsgCMD);
        Manager.socket.addCMD(Protocol.CHAT_PRIVATE_MSG, ChatPrivateMsgCMD);
        Manager.socket.addCMD(Protocol.CHAT_NOTICE, ChatNoticeCMD);
        Manager.socket.addCMD(Protocol.EXP_ADD, ExpAddCMD);
        Manager.socket.addCMD(Protocol.KILL_RECORD, KillRecordCMD);
    };
    /**频道聊天 */
    ChatControl.prototype.channelChat = function (channel, content) {
        var cmd = Manager.socket.getCMD(Protocol.CHAT_CHANNEL_MSG);
        cmd.channel = channel;
        cmd.content = content;
        cmd.send();
    };
    /**私聊 */
    ChatControl.prototype.privateChat = function (id, name, msg, isAuto) {
        var cmd = Manager.socket.getCMD(Protocol.CHAT_PRIVATE_MSG);
        cmd.id = id;
        cmd.name = name;
        cmd.msg = msg;
        cmd.isAuto = isAuto;
        cmd.send();
    };
    ChatControl.prototype.showChatView = function (isShow) {
        if (isShow) {
            if (!this._chatView) {
                this._chatView = new ChatView();
                this._chatView.reuse();
            }
            Manager.layer.uiLayer.addChild(this._chatView);
        }
        else
            ObjectUtil.remove(this._chatView);
    };
    return ChatControl;
}(BaseControl));
__reflect(ChatControl.prototype, "ChatControl");
//# sourceMappingURL=ChatControl.js.map