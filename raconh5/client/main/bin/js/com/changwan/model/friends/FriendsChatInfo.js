/**
 * 好友聊天信息
 * liangyan
 * create 2017-11-03
*/
var FriendsChatInfo = /** @class */ (function () {
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
//# sourceMappingURL=FriendsChatInfo.js.map