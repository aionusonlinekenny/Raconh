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
 *liangyan
 *create 2017-11-02
*/
var FriendsControl = /** @class */ (function (_super) {
    __extends(FriendsControl, _super);
    function FriendsControl() {
        return _super.call(this) || this;
    }
    FriendsControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.FRIENDS_LIST, FriendsListCMD);
        Manager.socket.addCMD(Protocol.FRIENDS_BATCH_OPERATE, FriendsBatchOperateCMD);
        Manager.socket.addCMD(Protocol.FRIENDS_SEARCH, FriendsSearchCMD);
        Manager.socket.addCMD(Protocol.FRIENDS_UPDATE_INFO, FriendsUpdateInfoCMD);
        Manager.socket.addCMD(Protocol.FRIENDS_ADD, FriendsAddCMD);
        Manager.socket.addCMD(Protocol.FRIENDS_SUGGEST_CHANGE, FriendsSuggestChangeCMD);
        Manager.socket.addCMD(Protocol.FRIENDS_DELETE, FriendsDeleteCMD);
    };
    /**请求好友列表 */
    FriendsControl.prototype.listRequest = function () {
        var cmd = Manager.socket.getCMD(Protocol.FRIENDS_LIST);
        cmd.send();
    };
    /**批量操作
     * 操作类型（0删除 1添加）
     * 好友类型（1好友 2黑名单）
     */
    FriendsControl.prototype.batchOperate = function (operateType, friendsType, ids) {
        var cmd = Manager.socket.getCMD(Protocol.FRIENDS_BATCH_OPERATE);
        cmd.operateType = operateType;
        cmd.friendsType = friendsType;
        cmd.ids = ids;
        cmd.send();
    };
    /**搜索好友 */
    FriendsControl.prototype.searchFriends = function (key) {
        var cmd = Manager.socket.getCMD(Protocol.FRIENDS_SEARCH);
        cmd.name = key;
        cmd.send();
    };
    /**好友信息更新 */
    FriendsControl.prototype.updateInfo = function () {
        var cmd = Manager.socket.getCMD(Protocol.FRIENDS_UPDATE_INFO);
        cmd.send();
    };
    /**
     * 好友添加
     * 好友类型（1好友 2黑名单）
     */
    FriendsControl.prototype.addFriends = function (id, friendsType, name) {
        if (name === void 0) { name = ""; }
        var cmd = Manager.socket.getCMD(Protocol.FRIENDS_ADD);
        cmd.id = id;
        cmd.friendsType = friendsType;
        cmd.name = name;
        cmd.send();
    };
    /**
     * 好友删除
     * 好友类型（1好友 2黑名单）
     */
    FriendsControl.prototype.deleteFriends = function (id, friendsType, name) {
        if (name === void 0) { name = ""; }
        var cmd = Manager.socket.getCMD(Protocol.FRIENDS_DELETE);
        cmd.id = id;
        cmd.friendsType = friendsType;
        cmd.name = name;
        cmd.send();
    };
    /**换一批推荐好友 */
    FriendsControl.prototype.changeSuggest = function () {
        var cmd = Manager.socket.getCMD(Protocol.FRIENDS_SUGGEST_CHANGE);
        cmd.send();
    };
    return FriendsControl;
}(BaseControl));
//# sourceMappingURL=FriendsControl.js.map