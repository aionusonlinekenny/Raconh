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
 *
 * pzx
 * create 2018-3-16
 * 分享
 *
*/
var ShareModel = (function (_super) {
    __extends(ShareModel, _super);
    function ShareModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShareModel.prototype.returnQuery = function (reward, share) {
        var cvo = ShareCVO.cvo();
        cvo.setReward(reward);
        cvo.setStatus(share);
        this.dispatchEvent(new ShareEvent(ShareEvent.SHARE_UPDATE));
    };
    ShareModel.prototype.returnShareInfo = function (status) {
        var cvo = ShareCVO.cvo();
        cvo.setStatus(status);
        this.dispatchEvent(new ShareEvent(ShareEvent.SHARE_UPDATE));
    };
    ShareModel.prototype.returnShareReward = function (status) {
        var cvo = ShareCVO.cvo();
        cvo.setReward(status);
        this.dispatchEvent(new ShareEvent(ShareEvent.SHARE_UPDATE));
    };
    return ShareModel;
}(egret.EventDispatcher));
__reflect(ShareModel.prototype, "ShareModel");
//# sourceMappingURL=ShareModel.js.map