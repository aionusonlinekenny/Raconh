var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 好友聊天信息
 * liangyan
 * create 2017-11-03
*/
var FriendsChatInfo = (function () {
    function FriendsChatInfo() {
        /** */
        this.hasDraw = false;
    }
    Object.defineProperty(FriendsChatInfo.prototype, "fromID", {
        get: function () { return this._fromID; },
        set: function (v) {
            this._fromID = v;
            this._isSelf = (this._fromID == Manager.model.self.id);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FriendsChatInfo.prototype, "isSelf", {
        get: function () {
            return this._isSelf;
        },
        enumerable: true,
        configurable: true
    });
    return FriendsChatInfo;
}());
__reflect(FriendsChatInfo.prototype, "FriendsChatInfo");
//# sourceMappingURL=FriendsChatInfo.js.map