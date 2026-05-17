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
 * 盟主战活动图标
 * Simon
 * create 2018-2-7
*/
var ClubLeaderWarActivityIcon2 = (function (_super) {
    __extends(ClubLeaderWarActivityIcon2, _super);
    function ClubLeaderWarActivityIcon2(imageContainer01, imageContainer, container1) {
        return _super.call(this, imageContainer01, imageContainer, container1) || this;
    }
    ClubLeaderWarActivityIcon2.prototype.onTouchHandler = function (e) {
        if (!this._cvo || !this._cvo.isAllCondSatisfy(true))
            return;
        Manager.link.linkStr(this._cvo.viewStr);
    };
    return ClubLeaderWarActivityIcon2;
}(ActBaseIcon2));
__reflect(ClubLeaderWarActivityIcon2.prototype, "ClubLeaderWarActivityIcon2");
//# sourceMappingURL=ClubLeaderWarActivityIcon2.js.map