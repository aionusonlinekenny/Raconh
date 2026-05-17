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
 * 分享图标
 * pzx
 * create 2018-3-１６
*/
var ShareIcon2 = (function (_super) {
    __extends(ShareIcon2, _super);
    function ShareIcon2(imageContainer01, imageContainer, container1) {
        return _super.call(this, imageContainer01, imageContainer, container1) || this;
    }
    ShareIcon2.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.getshare().addEventListener(ShareEvent.SHARE_UPDATE, this.__drawRed, this);
    };
    ShareIcon2.prototype.removeEvent = function () {
        Manager.model.getshare().removeEventListener(ShareEvent.SHARE_UPDATE, this.__drawRed, this);
        _super.prototype.removeEvent.call(this);
    };
    ShareIcon2.prototype.hasRedIcon = function () {
        var cvo = ShareCVO.cvo();
        if (cvo.isReward()) {
            Manager.model.getLogin().home.updateIcon(ActivityIcon.TOP, this._cvo, true);
            return false;
        }
        return (cvo.status);
    };
    return ShareIcon2;
}(ActBaseIcon2));
__reflect(ShareIcon2.prototype, "ShareIcon2");
//# sourceMappingURL=ShareIcon2.js.map