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
var FireEyeSelectItemCMD = (function (_super) {
    __extends(FireEyeSelectItemCMD, _super);
    function FireEyeSelectItemCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.FIRE_EYE_SELECT;
        return _this;
    }
    FireEyeSelectItemCMD.prototype.processOut = function (pkg) {
        pkg.writeShort(this.id);
        pkg.writeShort(this.cvoID);
    };
    FireEyeSelectItemCMD.prototype.receive = function (pi) {
        var newData = new FireEyeGoodsData();
        newData.uniqueID = pi.readShort();
        newData.cvoID = pi.readShort();
        newData.x = pi.readInt();
        newData.y = pi.readInt();
        newData.scale = pi.readInt();
        newData.rotation = pi.readInt();
        newData.selected = pi.readByte() == 1;
        Manager.model.getFireEye().wrongTimes = pi.readByte();
        var stamp = pi.readInt();
        var isRight = Manager.model.getFireEye().wrongTimes == 0;
        if (!isRight)
            Manager.view.getView(136 /* FireEyePanel */).drawStatus(this.id, null);
        else
            Manager.view.getView(136 /* FireEyePanel */).drawStatus(this.id, newData);
    };
    return FireEyeSelectItemCMD;
}(BaseCMD));
__reflect(FireEyeSelectItemCMD.prototype, "FireEyeSelectItemCMD");
//# sourceMappingURL=FireEyeSelectItemCMD.js.map