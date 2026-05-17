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
 * 火眼金睛选中物品
 * liangyan
 * create 2018-03-27
*/
var FireEyeSelectSpecialCMD = (function (_super) {
    __extends(FireEyeSelectSpecialCMD, _super);
    function FireEyeSelectSpecialCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.FIRE_EYE_SELECT;
        return _this;
    }
    FireEyeSelectSpecialCMD.prototype.receive = function (pi) {
        var cvoID = pi.readShort();
        var count = pi.readShort();
        var infos = new Array();
        var goodsInfo;
        while (count > 0) {
            goodsInfo = new ItemsModelInfo();
            goodsInfo.base_id = pi.readInt();
            goodsInfo.bind = pi.readByte() == 1;
            goodsInfo.quantity = pi.readInt();
            infos.push(goodsInfo);
            count--;
        }
        //哇！你发现了招财小猫咪！获得了
        var str = LangCVO.getContent("fireEye16");
        for (var i = 0; i < infos.length; i++) {
            goodsInfo = infos[i];
            //{0}<font color='{1}'>{2}</font>
            str += LangCVO.getContent("fireEye17", goodsInfo.cvo.name, Color.GREEN_STR_2, goodsInfo.quantity);
            if (i != infos.length - 1)
                str += "、";
        }
        FloatTips.addTips(str, Color.ORANGE);
    };
    return FireEyeSelectSpecialCMD;
}(BaseCMD));
__reflect(FireEyeSelectSpecialCMD.prototype, "FireEyeSelectSpecialCMD");
//# sourceMappingURL=FireEyeSelectSpecialCMD.js.map