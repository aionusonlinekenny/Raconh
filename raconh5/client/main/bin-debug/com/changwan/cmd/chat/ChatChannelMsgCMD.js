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
 * 频道聊天消息
 * liangyan
 * create 2017-11-14
*/
var ChatChannelMsgCMD = (function (_super) {
    __extends(ChatChannelMsgCMD, _super);
    function ChatChannelMsgCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CHAT_CHANNEL_MSG;
        return _this;
    }
    ChatChannelMsgCMD.prototype.processOut = function (pkg) {
        //频道
        //聊天内容
        pkg.writeByte(this.channel);
        pkg.writeUTF(this.content);
    };
    ChatChannelMsgCMD.prototype.receive = function (pi) {
        // 频道
        // 角色ID
        // 发送者名称
        // 玩家类型 (0:普通玩家 1:GM 2:指导员)
        // VIP等级
        // 聊天内容
        // 头像id
        // 等级
        // 平台数据
        // 数据类型
        // 数据数值
        var type = pi.readByte();
        var info = new ChatInfo();
        info.fromID = pi.readInt64();
        info.fromName = pi.readUTF();
        info.career = pi.readByte();
        info.type = pi.readByte();
        info.type = type;
        info.vipLvl = pi.readByte();
        info.htmlText = pi.readUTF();
        info.headID = pi.readByte();
        info.level = pi.readShort();
        var arr = [];
        var child;
        var len = pi.readShort();
        for (var i = 0; i < len; i++) {
            child = {};
            child.platType = pi.readByte();
            child.platData = pi.readInt();
            arr.push(child);
        }
        info.platDatas = arr;
        info.parseInfo();
        var friend = Manager.model.getFriends().getFriendsByID(info.fromID);
        if (friend && friend.type == FriendsType.BLACK)
            return;
        Manager.model.getChat().pushInfo(info, type);
    };
    return ChatChannelMsgCMD;
}(BaseCMD));
__reflect(ChatChannelMsgCMD.prototype, "ChatChannelMsgCMD");
//# sourceMappingURL=ChatChannelMsgCMD.js.map