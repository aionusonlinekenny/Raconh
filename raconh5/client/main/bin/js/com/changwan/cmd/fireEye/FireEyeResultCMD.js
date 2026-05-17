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
 * 火眼金睛活动结算数据
 * liangyan
 * create 2018-03-27
*/
var FireEyeResultCMD = /** @class */ (function (_super) {
    __extends(FireEyeResultCMD, _super);
    function FireEyeResultCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.FIRE_EYE_ACT_DATA;
        return _this;
    }
    FireEyeResultCMD.prototype.receive = function (pi) {
        var info = new FireEyeResultInfo();
        var count = pi.readShort();
        var id;
        var name;
        while (count > 0) {
            id = pi.readInt64();
            name = pi.readUTF();
            if (id == Manager.model.self.id) {
                info.selfScore = pi.readInt();
                info.selfTime = pi.readShort();
            }
            else {
                info.enemyName = name;
                info.enemyScore = pi.readInt();
                info.enemyTime = pi.readShort();
            }
            count--;
        }
        count = pi.readShort();
        info.gainGoods = [];
        var goodsInfo;
        while (count > 0) {
            goodsInfo = new ItemsModelInfo();
            goodsInfo.id = count;
            goodsInfo.base_id = pi.readInt();
            goodsInfo.bind = pi.readByte() == 1;
            goodsInfo.quantity = pi.readInt();
            info.gainGoods.push(goodsInfo);
            count--;
        }
        Manager.model.getFireEye().actResultData = info;
        if (Manager.control.getFireEye().banView != null) {
            Manager.control.getFireEye().banView.dispose();
            Manager.control.getFireEye().banView = null;
        }
        if (Manager.control.getFireEye().finishView != null) {
            Manager.control.getFireEye().finishView.dispose();
            Manager.control.getFireEye().finishView = null;
        }
        Manager.link.link(LinkType.PANEL_FIRE_EYE, 3);
    };
    return FireEyeResultCMD;
}(BaseCMD));
//# sourceMappingURL=FireEyeResultCMD.js.map