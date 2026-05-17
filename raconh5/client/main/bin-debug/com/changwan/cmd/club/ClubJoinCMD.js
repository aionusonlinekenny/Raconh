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
 * 宗主数据更新
 */
var ClubJoinCMD = (function (_super) {
    __extends(ClubJoinCMD, _super);
    function ClubJoinCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CLUB_JOIN;
        return _this;
    }
    ClubJoinCMD.prototype.processOut = function (pkg) {
        pkg.writeInt64(this.clubId);
        pkg.writeByte(this.isRecomment);
    };
    ClubJoinCMD.prototype.receive = function (pi) {
        var list = [];
        var len = pi.readShort();
        for (var i = 0; i < len; i++) {
            var info = new ItemsModelInfo();
            info.base_id = pi.readInt();
            info.bind = pi.readByte() == 1 ? true : false;
            info.quantity = pi.readInt();
            list.push(info);
        }
        Manager.control.getDrop().showAlert(list);
        Manager.view.hide(38 /* ClubPanel */);
        Manager.link.link(LinkType.PANEL_CLUB, 0);
    };
    return ClubJoinCMD;
}(BaseCMD));
__reflect(ClubJoinCMD.prototype, "ClubJoinCMD");
//# sourceMappingURL=ClubJoinCMD.js.map