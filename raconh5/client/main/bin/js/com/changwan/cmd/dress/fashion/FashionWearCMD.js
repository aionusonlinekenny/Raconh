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
 * 时装穿戴与卸下
 * luzh
 * create 2017-12-19
*/
var FashionWearCMD = /** @class */ (function (_super) {
    __extends(FashionWearCMD, _super);
    function FashionWearCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.FASHION_WEAR;
        return _this;
    }
    FashionWearCMD.prototype.processOut = function (pkg) {
        // array('name'=>'id', 'type'=>'int16', 'desc'=>'时装ID')),
        pkg.writeShort(this.id);
    };
    FashionWearCMD.prototype.receive = function (pi) {
        // array('name'=>'id', 'type'=>'int16', 'desc'=>'时装ID')),
        Manager.model.getDress().fashionModel.curID = pi.readShort();
    };
    return FashionWearCMD;
}(BaseCMD));
//# sourceMappingURL=FashionWearCMD.js.map