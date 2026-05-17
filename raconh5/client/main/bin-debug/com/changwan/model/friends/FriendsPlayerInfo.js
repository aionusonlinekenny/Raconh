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
 *liangyan
 *create 2017-11-02
*/
var FriendsPlayerInfo = (function (_super) {
    __extends(FriendsPlayerInfo, _super);
    function FriendsPlayerInfo() {
        var _this = _super.call(this) || this;
        /**总战力 */
        _this.fightSum = 0;
        return _this;
    }
    FriendsPlayerInfo.prototype.parse = function (pi) {
        this.serverID = pi.readInt();
        this.fightSum = pi.readInt();
        // this.type = pi.readByte();
        this.nickName = pi.readUTF();
        this.level = pi.readShort();
        this.isOnline = pi.readByte() == 1;
        // let a = pi.readByte();//性别
        this.lastOnlineTime = pi.readInt64();
        this.corpsName = pi.readUTF();
        this.career = pi.readByte();
        this.vip = pi.readByte();
    };
    Object.defineProperty(FriendsPlayerInfo.prototype, "onlineStatus", {
        get: function () {
            if (this.isOnline)
                return "<font color='#38B800'>在线</font>";
            var offTime = Manager.model.getLogin().serverTimeInfo.serverTime / 1000 - this.lastOnlineTime;
            //离线显示规则，60分钟以内显示离线XX分钟，离线1-23小时则显示离线XX小时，离线1-7天则显示离线X天，7天以上显示离线7天以上
            var min = offTime / 60;
            if (min <= 60)
                return "<font color='#5A5B59'>离线" + Math.floor(min) + "分钟</font>";
            var hour = offTime / 3600;
            if (hour < 24)
                return "<font color='#5A5B59'>离线" + Math.floor(hour) + "小时</font>";
            var day = offTime / 86400;
            if (day <= 7)
                return "<font color='#5A5B59'>离线" + Math.floor(day) + "天</font>";
            return "<font color='#5A5B59'>离线7天以上</font>";
        },
        enumerable: true,
        configurable: true
    });
    return FriendsPlayerInfo;
}(RoleInfo));
__reflect(FriendsPlayerInfo.prototype, "FriendsPlayerInfo");
//# sourceMappingURL=FriendsPlayerInfo.js.map