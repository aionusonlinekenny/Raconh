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
 * 聊天私聊信息
 * liangyan
 * create 2017-11-14
*/
var ChatPrivateMsgCMD = (function (_super) {
    __extends(ChatPrivateMsgCMD, _super);
    function ChatPrivateMsgCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CHAT_PRIVATE_MSG;
        return _this;
    }
    ChatPrivateMsgCMD.prototype.processOut = function (pkg) {
        pkg.writeInt64(this.id);
        ;
        pkg.writeUTF(this.name);
        pkg.writeUTF(this.msg);
        pkg.writeByte(this.isAuto);
    };
    ChatPrivateMsgCMD.prototype.receive = function (pi) {
        var info = new FriendsChatInfo();
        info.targetID = pi.readInt64();
        info.targetName = pi.readUTF();
        info.targetCareer = pi.readByte();
        info.targetVip = pi.readByte();
        info.fromID = pi.readInt64();
        info.fromName = pi.readUTF();
        info.fromCareer = pi.readByte();
        info.type = pi.readByte();
        info.fromVip = pi.readByte();
        info.content = pi.readUTF();
        info.zhuansheng = pi.readByte();
        info.level = pi.readShort();
        info.headID = pi.readByte();
        info.corpsName = pi.readUTF();
        info.isAuto = pi.readByte() == 1;
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
        info.time = Manager.model.getLogin().serverTimeInfo.serverTime / 1000;
        Manager.model.getFriends().pushChatData(info, info.isSelf ? info.targetID : info.fromID);
    };
    return ChatPrivateMsgCMD;
}(BaseCMD));
__reflect(ChatPrivateMsgCMD.prototype, "ChatPrivateMsgCMD");
//# sourceMappingURL=ChatPrivateMsgCMD.js.map