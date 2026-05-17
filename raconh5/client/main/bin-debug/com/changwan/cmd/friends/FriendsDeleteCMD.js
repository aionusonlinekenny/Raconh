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
 * 好友/黑名单删除
 * liangyan
 * create 2017-11-09
*/
var FriendsDeleteCMD = (function (_super) {
    __extends(FriendsDeleteCMD, _super);
    function FriendsDeleteCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.FRIENDS_DELETE;
        return _this;
    }
    FriendsDeleteCMD.prototype.processOut = function (pkg) {
        pkg.writeInt64(this.id);
        pkg.writeByte(this.friendsType);
        pkg.writeUTF(this.name);
    };
    FriendsDeleteCMD.prototype.receive = function (pi) {
        var type = pi.readByte();
        var id = pi.readInt64();
        Manager.model.getFriends().removeFriendsByID(id);
    };
    return FriendsDeleteCMD;
}(BaseCMD));
__reflect(FriendsDeleteCMD.prototype, "FriendsDeleteCMD");
//# sourceMappingURL=FriendsDeleteCMD.js.map