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
 * 时装升星或增加时效
 * luzh
 * create 2017-12-19
*/
var FashionUpCMD = /** @class */ (function (_super) {
    __extends(FashionUpCMD, _super);
    function FashionUpCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.FASHION_UP;
        return _this;
    }
    FashionUpCMD.prototype.processOut = function (pkg) {
        // array('name'=>'id', 'type'=>'int16', 'desc'=>'时装ID')),
        pkg.writeShort(this.id);
    };
    FashionUpCMD.prototype.receive = function (pi) {
        // array('name'=>'fashion_id', 'type'=>'int16', 'desc' =>'时装ID'),
        // array('name'=>'valid', 'type'=>'int32', 'desc' =>'到期时间戳'),
        // array('name'=>'star','type'=>'int8','desc'=>'时装星数'),
        var id = pi.readShort();
        var cvo = FashionCVO.getCVO(id);
        if (cvo)
            cvo.setTimeAndStar(pi.readInt(), pi.readByte());
    };
    return FashionUpCMD;
}(BaseCMD));
//# sourceMappingURL=FashionUpCMD.js.map