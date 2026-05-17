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
 * 公告
 * liangyan
 * create 2017-11-14
*/
var ChatNoticeCMD = (function (_super) {
    __extends(ChatNoticeCMD, _super);
    function ChatNoticeCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CHAT_NOTICE;
        return _this;
    }
    ChatNoticeCMD.prototype.receive = function (pi) {
        var id = pi.readShort();
        var len = pi.readShort();
        var arr = [];
        var child;
        for (var i = 0; i < len; i++) {
            child = {};
            child.type = pi.readByte();
            child.content = pi.readUTF();
            arr.push(child);
        }
        var textCvo = TextDataCVO.getCVO(id);
        if (textCvo) {
            var content = textCvo.content;
            content = Manager.model.getChat().parseLink(content, arr);
            switch (textCvo.position) {
                case 54:
                case 55:
                    this.showFloatTips(content);
                    break;
                case 0:
                case 6:
                case 7:
                    this.showChannelMsg(content);
                    break;
                case 51:
                    this.showSysNotice(content);
                    break;
                case 52:
                    this.showChannelMsg(content);
                    this.showSysNotice(content);
                    break;
                case 82:
                    this.showBackNotice(content);
                    break;
            }
        }
    };
    ChatNoticeCMD.prototype.showFloatTips = function (str) {
        FloatTips.addTips(str, Color.RED);
    };
    ChatNoticeCMD.prototype.showChannelMsg = function (str) {
        var chatInfo = new ChatInfo();
        chatInfo.type = ChatChannelType.SYSTEM;
        chatInfo.htmlText = str;
        chatInfo.parseInfo();
        Manager.model.getChat().pushInfo(chatInfo, chatInfo.type);
    };
    ChatNoticeCMD.prototype.showSysNotice = function (str) {
        SystemNoticeView.instance.show(str);
    };
    ChatNoticeCMD.prototype.showBackNotice = function (str) {
        Manager.view.show(0 /* BackgroundNoticeView */, str);
    };
    return ChatNoticeCMD;
}(BaseCMD));
__reflect(ChatNoticeCMD.prototype, "ChatNoticeCMD");
//# sourceMappingURL=ChatNoticeCMD.js.map