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
 * 好友列表返回协议
 * liangyan
 * create 2017-11-06
*/
var FriendsListCMD = (function (_super) {
    __extends(FriendsListCMD, _super);
    function FriendsListCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.FRIENDS_LIST;
        return _this;
    }
    FriendsListCMD.prototype.receive = function (pi) {
        // 数组长度 8位
        // {
        //     唯一id
        //     服务器id
        //     总战力
        //     类型（1好友  2黑名单）
        //     玩家名字
        //     玩家等级
        //     是否在线（1是 0否）
        //     玩家性别（1男 0女）
        //     玩家上次离线时间戳
        //     帮会名字（预留，暂写死“假数据”）字符串
        //     玩家职业（预留，暂写死0）
        //     玩家vip等级（预留，暂写死0）
        // }
        Manager.model.getFriends().infos = [];
        var count = pi.readShort();
        // if(count == 0)
        // {
        //     Manager.model.getFriends().dispatchEvent(new FriendsEvent(FriendsEvent.CLEAR_LIST));
        //     return;
        // }
        /**好友 */
        var friend;
        while (count > 0) {
            friend = new FriendsPlayerInfo();
            friend.type = FriendsType.FRIEND;
            friend.id = pi.readInt64();
            friend.parse(pi);
            Manager.model.getFriends().addFriends(friend, false);
            count--;
        }
        count = pi.readShort();
        /**黑名单 */
        var black;
        while (count > 0) {
            black = new FriendsPlayerInfo();
            black.type = FriendsType.BLACK;
            black.id = pi.readInt64();
            black.parse(pi);
            Manager.model.getFriends().addFriends(black, false);
            count--;
        }
    };
    return FriendsListCMD;
}(BaseCMD));
__reflect(FriendsListCMD.prototype, "FriendsListCMD");
//# sourceMappingURL=FriendsListCMD.js.map