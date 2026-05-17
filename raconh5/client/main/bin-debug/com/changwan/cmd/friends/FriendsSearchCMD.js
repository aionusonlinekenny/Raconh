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
 * 好友搜索协议
 * liangyan
 * create 2017-11-06
*/
var FriendsSearchCMD = (function (_super) {
    __extends(FriendsSearchCMD, _super);
    function FriendsSearchCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.FRIENDS_SEARCH;
        return _this;
    }
    FriendsSearchCMD.prototype.processOut = function (pkg) {
        pkg.writeUTF(this.name);
        pkg.writeInt(Manager.model.getLogin().serverId);
    };
    FriendsSearchCMD.prototype.receive = function (pi) {
        var id = pi.readInt64();
        if (id > 0) {
            // 唯一id
            // 玩家名字
            // 玩家等级
            // 玩家是否在线（1是 0否）
            // 帮会名字（预留，暂写死“假数据”）
            // 玩家职业（预留，暂写死0）
            // 玩家vip等级（预留，暂写死0）
            var info = new FriendsPlayerInfo();
            info.id = id;
            info.nickName = pi.readUTF();
            info.level = pi.readShort();
            info.isOnline = pi.readByte() == 1;
            info.corpsName = pi.readUTF();
            info.career = pi.readByte();
            info.vip = pi.readByte();
            info.fightSum = pi.readInt();
            info.type = FriendsType.SEARCH;
            var model = Manager.model.getFriends();
            model.searchInfos = [];
            model.addSearchInfo(info);
            model.dispatchEvent(new FriendsEvent(FriendsEvent.SEARCH_SUCC));
        }
        else
            FloatTips.addTips(LangCVO.getContent("friends2"), Color.RED); //该角色不在线，无法添加好友
    };
    return FriendsSearchCMD;
}(BaseCMD));
__reflect(FriendsSearchCMD.prototype, "FriendsSearchCMD");
//# sourceMappingURL=FriendsSearchCMD.js.map