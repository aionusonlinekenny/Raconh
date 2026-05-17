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
 * 卸下称号
 * liangyan
 * create 2017-11-28
*/
var TitleTakeOffCMD = (function (_super) {
    __extends(TitleTakeOffCMD, _super);
    function TitleTakeOffCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.TITLE_TAKE_OFF;
        return _this;
    }
    TitleTakeOffCMD.prototype.processOut = function (pkg) {
        pkg.writeShort(this.id);
    };
    TitleTakeOffCMD.prototype.receive = function (pi) {
        //操作结果(0:失败 1:成功)
        var result = pi.readByte() == 1;
        if (result) {
            var cvo = TitleCVO.getCVO(this.id);
            Manager.model.getDress().titleModel.dispatchEvent(new TitleEvent(TitleEvent.TITLE_TAKE_OFF, cvo.templateID));
        }
    };
    return TitleTakeOffCMD;
}(BaseCMD));
__reflect(TitleTakeOffCMD.prototype, "TitleTakeOffCMD");
//# sourceMappingURL=TitleTakeOffCMD.js.map