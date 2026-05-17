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
 * 激活称号
 * liangyan
 * create 2017-11-28
*/
var TitleActiveCMD = /** @class */ (function (_super) {
    __extends(TitleActiveCMD, _super);
    function TitleActiveCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.TITLE_ACTIVE;
        return _this;
    }
    TitleActiveCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this.type);
        pkg.writeInt(this.id);
    };
    TitleActiveCMD.prototype.receive = function (pi) {
        //操作结果(0:失败 1:成功)
        var result = pi.readByte() == 1;
        if (result) {
            var cvo = TitleCVO.getCVO(pi.readShort());
            cvo.isActived = true;
            Manager.model.getDress().titleModel.dispatchEvent(new TitleEvent(TitleEvent.TITLE_ACT_SUCC, cvo.templateID));
        }
    };
    return TitleActiveCMD;
}(BaseCMD));
//# sourceMappingURL=TitleActiveCMD.js.map