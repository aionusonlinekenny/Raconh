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
 * 初始化
 * luzh
 * create 2017-12-19
*/
var FashionInitCMD = (function (_super) {
    __extends(FashionInitCMD, _super);
    function FashionInitCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.FASHION_INIT;
        return _this;
    }
    FashionInitCMD.prototype.receive = function (pi) {
        // array('name'=>'id', 'type'=>'int16', 'desc'=>'时装ID'),
        // array('name'=>'fashion_list','type'=>'arr','tuple'=>'true','record'=>'fashion_info','desc'=>'时装列表','vars'=>array(
        //    array('name'=>'fashion_id','type'=>'int16','desc'=>'时装id'),
        //    array('name'=>'valid','type'=>'int32','desc'=>'到期时间戳'),
        //    array('name'=>'star','type'=>'int8','desc'=>'时装星数'),
        // )),
        Manager.model.getDress().fashionModel.curID = pi.readShort();
        var len = pi.readShort();
        while (len--) {
            var id = pi.readShort();
            var cvo = FashionCVO.getCVO(id);
            if (cvo)
                cvo.setTimeAndStar(pi.readInt(), pi.readByte());
        }
    };
    return FashionInitCMD;
}(BaseCMD));
__reflect(FashionInitCMD.prototype, "FashionInitCMD");
//# sourceMappingURL=FashionInitCMD.js.map