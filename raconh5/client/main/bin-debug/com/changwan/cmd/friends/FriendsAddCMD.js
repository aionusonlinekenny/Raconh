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
 * 好友/黑名单添加
 * liangyan
 * create 2017-11-06
*/
var FriendsAddCMD = (function (_super) {
    __extends(FriendsAddCMD, _super);
    function FriendsAddCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.FRIENDS_ADD;
        return _this;
    }
    FriendsAddCMD.prototype.processOut = function (pkg) {
        pkg.writeInt64(this.id);
        pkg.writeByte(this.friendsType);
        pkg.writeUTF(this.name);
    };
    FriendsAddCMD.prototype.receive = function (pi) {
        var id = pi.readInt64();
        var info = Manager.model.getFriends().getFriendsByID(id);
        if (info == null) {
            info = new FriendsPlayerInfo();
            info.type = this.friendsType;
            info.id = id;
            info.parse(pi);
            Manager.model.getFriends().addFriends(info);
        }
        else {
            var oldType = info.type;
            info.type = this.friendsType;
            info.parse(pi);
            if (oldType != info.type) {
                Manager.model.getFriends().dispatchEvent(new FriendsEvent(FriendsEvent.CHANGE_PLAYER_TYPE));
                FloatTips.addTips("操作成功", Color.GREEN);
            }
        }
    };
    return FriendsAddCMD;
}(BaseCMD));
__reflect(FriendsAddCMD.prototype, "FriendsAddCMD");
//# sourceMappingURL=FriendsAddCMD.js.map