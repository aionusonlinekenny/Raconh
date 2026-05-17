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
 * 服饰model
 * luzh
 * create 2017-12-19
*/
var FashionModel = /** @class */ (function (_super) {
    __extends(FashionModel, _super);
    function FashionModel() {
        var _this = _super.call(this) || this;
        /**设置时间 星数 */
        _this._curID = 0;
        Manager.control.getDress().fashionInit();
        return _this;
    }
    Object.defineProperty(FashionModel.prototype, "curID", {
        get: function () { return this._curID; },
        set: function (value) {
            if (this._curID == value)
                return;
            this._curID = value;
            this.dispatchEvent(new FashionEvent(FashionEvent.WEARING, this._curID));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FashionModel.prototype, "hasCanActive", {
        get: function () {
            if (!OpenCVO.isOpen(OpenConst.ID_DRESS))
                return false;
            var cvos = FashionCVO.getCvosByCareer(Manager.model.self.attrInfo.career);
            for (var i = 0; i < cvos.length; i++) {
                if (cvos[i].canActiveOrUp)
                    return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    return FashionModel;
}(egret.EventDispatcher));
//# sourceMappingURL=FashionModel.js.map