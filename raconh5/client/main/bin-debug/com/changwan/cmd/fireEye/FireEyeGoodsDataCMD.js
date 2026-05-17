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
 * 火眼金睛物品数据
 * liangyan
 * create 2018-03-26
*/
var FireEyeGoodsDataCMD = (function (_super) {
    __extends(FireEyeGoodsDataCMD, _super);
    function FireEyeGoodsDataCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.FIRE_EYE_GOODS_DATA;
        return _this;
    }
    FireEyeGoodsDataCMD.prototype.receive = function (pi) {
        var count = pi.readShort();
        Manager.model.getFireEye().curGoodsDatas = new Array();
        var data;
        while (count > 0) {
            data = new FireEyeGoodsData();
            data.uniqueID = pi.readShort();
            data.cvoID = pi.readShort();
            data.x = pi.readInt();
            data.y = pi.readInt();
            data.scale = pi.readInt();
            data.rotation = pi.readInt();
            data.selected = pi.readByte() == 1;
            Manager.model.getFireEye().curGoodsDatas.push(data);
            count--;
        }
    };
    return FireEyeGoodsDataCMD;
}(BaseCMD));
__reflect(FireEyeGoodsDataCMD.prototype, "FireEyeGoodsDataCMD");
//# sourceMappingURL=FireEyeGoodsDataCMD.js.map