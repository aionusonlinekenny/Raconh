var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 聊天频道类型
 * liangyan
 * create 2017-11-13
*/
var ChatChannelType = (function () {
    function ChatChannelType() {
    }
    ChatChannelType.getChannelByIndex = function (index) {
        switch (index) {
            case 0:
                return this.SYSTEM;
            case 1:
                return this.WORLD;
            case 2:
                return this.CORPS;
        }
    };
    /** 系统*/
    ChatChannelType.SYSTEM = 999;
    /** 世界*/
    ChatChannelType.WORLD = 1;
    /** 好友*/
    ChatChannelType.FRIENDS = 2;
    /** 帮派*/
    ChatChannelType.CORPS = 3;
    return ChatChannelType;
}());
__reflect(ChatChannelType.prototype, "ChatChannelType");
//# sourceMappingURL=ChatChannelType.js.map