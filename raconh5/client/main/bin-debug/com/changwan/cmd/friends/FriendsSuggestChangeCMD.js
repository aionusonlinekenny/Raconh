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
 * 换一批推荐好友
 * liangyan
 * create 2017-11-07
*/
var FriendsSuggestChangeCMD = (function (_super) {
    __extends(FriendsSuggestChangeCMD, _super);
    function FriendsSuggestChangeCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.FRIENDS_SUGGEST_CHANGE;
        return _this;
    }
    FriendsSuggestChangeCMD.prototype.receive = function (pi) {
        var count = pi.readShort();
        // 唯一id
        // 玩家名字
        // 玩家等级
        // 玩家是否在线（1是 0否）
        // 帮会名字（预留，暂写死“假数据”）
        // 玩家职业（预留，暂写死0）
        // 玩家vip等级（预留，暂写死0）
        Manager.model.getFriends().searchInfos = [];
        var info;
        while (count > 0) {
            info = new FriendsPlayerInfo();
            info.id = pi.readInt64();
            info.nickName = pi.readUTF();
            info.level = pi.readShort();
            info.isOnline = pi.readByte() == 1;
            info.corpsName = pi.readUTF();
            info.career = pi.readByte();
            info.vip = pi.readByte();
            info.type = FriendsType.SEARCH;
            info.fightSum = pi.readInt();
            Manager.model.getFriends().addSearchInfo(info);
            count--;
        }
        Manager.model.getFriends().dispatchEvent(new FriendsEvent(FriendsEvent.CHANGE_SUGGEST));
    };
    return FriendsSuggestChangeCMD;
}(BaseCMD));
__reflect(FriendsSuggestChangeCMD.prototype, "FriendsSuggestChangeCMD");
//# sourceMappingURL=FriendsSuggestChangeCMD.js.map