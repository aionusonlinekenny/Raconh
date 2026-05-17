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
 * 请求称号信息
 * liangyan
 * create 2017-11-28
*/
var TitleListCMD = (function (_super) {
    __extends(TitleListCMD, _super);
    function TitleListCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.TITLE_REQUEST;
        return _this;
    }
    TitleListCMD.prototype.receive = function (pi) {
        var useLen = pi.readShort();
        var cvo;
        while (useLen > 0) {
            cvo = TitleCVO.getCVO(pi.readShort());
            cvo.isActived = true;
            useLen--;
        }
        var limitLen = pi.readShort();
        while (limitLen > 0) {
            cvo = TitleCVO.getCVO(pi.readShort());
            cvo.isActived = true;
            cvo.time = pi.readInt();
            limitLen--;
        }
        Manager.model.getDress().titleModel.dispatchEvent(new TitleEvent(TitleEvent.TITLE_LIST));
    };
    return TitleListCMD;
}(BaseCMD));
__reflect(TitleListCMD.prototype, "TitleListCMD");
//# sourceMappingURL=TitleListCMD.js.map