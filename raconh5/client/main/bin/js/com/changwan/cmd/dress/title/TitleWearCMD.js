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
 * 佩戴称号
 * liangyan
 * create 2017-11-28
*/
var TitleWearCMD = /** @class */ (function (_super) {
    __extends(TitleWearCMD, _super);
    function TitleWearCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.TITLE_WEAR;
        return _this;
    }
    TitleWearCMD.prototype.processOut = function (pkg) {
        pkg.writeShort(this.id);
    };
    TitleWearCMD.prototype.receive = function (pi) {
        //操作结果(0:失败 1:成功)
        var result = pi.readByte() == 1;
        if (result) {
            var cvos = TitleCVO.getCvosByType(1);
            var cvo = TitleCVO.getCVO(this.id);
            Manager.model.getDress().titleModel.dispatchEvent(new TitleEvent(TitleEvent.TITLE_WEAR, cvo.templateID));
        }
    };
    return TitleWearCMD;
}(BaseCMD));
//# sourceMappingURL=TitleWearCMD.js.map