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
 * 删除称号
 * liangyan
 * create 2017-11-28
*/
var TitleDeleteCMD = /** @class */ (function (_super) {
    __extends(TitleDeleteCMD, _super);
    function TitleDeleteCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.TITLE_DELETE;
        return _this;
    }
    TitleDeleteCMD.prototype.receive = function (pi) {
        var id = pi.readShort();
        var cvo = TitleCVO.getCVO(id);
        cvo.isActived = false;
        Manager.model.getDress().titleModel.dispatchEvent(new TitleEvent(TitleEvent.TITLE_DELETE, cvo.templateID));
    };
    return TitleDeleteCMD;
}(BaseCMD));
//# sourceMappingURL=TitleDeleteCMD.js.map