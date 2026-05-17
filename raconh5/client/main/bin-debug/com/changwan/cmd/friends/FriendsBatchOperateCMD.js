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
 * 好友批量删除协议
 * liangyan
 * create 2017-11-06
*/
var FriendsBatchOperateCMD = (function (_super) {
    __extends(FriendsBatchOperateCMD, _super);
    function FriendsBatchOperateCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.FRIENDS_BATCH_OPERATE;
        return _this;
    }
    FriendsBatchOperateCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this.operateType);
        pkg.writeByte(this.friendsType);
        var length = this.ids.length;
        pkg.writeShort(length);
        for (var i = 0; i < length; i++) {
            pkg.writeInt64(this.ids[i]);
        }
    };
    FriendsBatchOperateCMD.prototype.receive = function (pi) {
        //操作结果（1成功 0失败） 
        var result = pi.readByte() == 1;
        if (result) {
            FloatTips.addTips("成功添加好友", Color.GREEN);
            Manager.control.getFriends().changeSuggest();
        }
    };
    return FriendsBatchOperateCMD;
}(BaseCMD));
__reflect(FriendsBatchOperateCMD.prototype, "FriendsBatchOperateCMD");
//# sourceMappingURL=FriendsBatchOperateCMD.js.map