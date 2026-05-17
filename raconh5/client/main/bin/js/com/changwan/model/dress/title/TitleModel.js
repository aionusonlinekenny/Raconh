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
 * 称号model
 * liangyan
 * create 2017-11-28
*/
var TitleModel = /** @class */ (function (_super) {
    __extends(TitleModel, _super);
    function TitleModel() {
        var _this = _super.call(this) || this;
        Manager.control.getDress().titleRequest();
        return _this;
    }
    Object.defineProperty(TitleModel.prototype, "hasCanActive", {
        get: function () {
            if (!OpenCVO.isOpen(OpenConst.ID_TITLE))
                return false;
            var cvos = TitleCVO.getAll();
            for (var i = 0; i < cvos.length; i++) {
                if (cvos[i].loss.isEnough())
                    return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    return TitleModel;
}(egret.EventDispatcher));
//# sourceMappingURL=TitleModel.js.map