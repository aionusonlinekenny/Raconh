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
 * pzx
 * 18.3.16
 * 分享查询
 *  */
var ShareQueryCMD = (function (_super) {
    __extends(ShareQueryCMD, _super);
    function ShareQueryCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_SHARE_QUERY;
        return _this;
    }
    ShareQueryCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this.type);
    };
    ShareQueryCMD.prototype.receive = function (ip) {
        // array('name'=>'is_rewarded', 'type'=>'int8', 'desc'=>'0-未领取 1-已领取'),
        //         array('name'=>'status', 'type'=>'int8', 'desc'=>'0-未分享 1-已分享'),
        var is_rewarded = ip.readByte();
        var status = ip.readByte();
        Manager.model.getshare().returnQuery(is_rewarded, status);
    };
    return ShareQueryCMD;
}(BaseCMD));
__reflect(ShareQueryCMD.prototype, "ShareQueryCMD");
//# sourceMappingURL=ShareQueryCMD.js.map