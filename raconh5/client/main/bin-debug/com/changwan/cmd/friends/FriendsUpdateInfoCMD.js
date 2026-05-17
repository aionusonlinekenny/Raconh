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
 * 好友信息更新协议
 * liangyan
 * create 2017-11-06
*/
var FriendsUpdateInfoCMD = (function (_super) {
    __extends(FriendsUpdateInfoCMD, _super);
    function FriendsUpdateInfoCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.FRIENDS_UPDATE_INFO;
        return _this;
    }
    FriendsUpdateInfoCMD.prototype.receive = function (pi) {
        var count = pi.readShort();
        while (count > 0) {
            var id = pi.readInt64();
            var info = Manager.model.getFriends().getFriendsByID(id);
            if (info != null) {
                info.isOnline = pi.readByte() == 1;
                info.level = pi.readShort();
                info.lastOnlineTime = pi.readInt64();
                info.corpsName = pi.readUTF();
                info.vip = pi.readByte();
                Manager.model.getFriends().updateFriendsInfo(info, true);
            }
            count--;
        }
    };
    return FriendsUpdateInfoCMD;
}(BaseCMD));
__reflect(FriendsUpdateInfoCMD.prototype, "FriendsUpdateInfoCMD");
//# sourceMappingURL=FriendsUpdateInfoCMD.js.map