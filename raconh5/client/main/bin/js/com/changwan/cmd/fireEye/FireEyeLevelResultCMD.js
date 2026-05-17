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
 * 火眼金睛关结算数据
 * liangyan
 * create 2018-03-26
*/
var FireEyeLevelResultCMD = /** @class */ (function (_super) {
    __extends(FireEyeLevelResultCMD, _super);
    function FireEyeLevelResultCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.FIRE_EYE_LEVEL_RESULT;
        return _this;
    }
    FireEyeLevelResultCMD.prototype.receive = function (pi) {
        var info = new FireEyeLevelResultInfo();
        //自己的数据
        var selfID = pi.readInt64();
        var selfName = pi.readUTF();
        info.findCount = pi.readByte();
        info.findScore = pi.readInt();
        info.leftTime = pi.readInt();
        info.timeScore = pi.readInt();
        info.selfScore = pi.readInt();
        info.selfTime = pi.readShort();
        var count = pi.readShort();
        var goodsInfo;
        info.gainGoods = [];
        while (count > 0) {
            goodsInfo = new ItemsModelInfo();
            goodsInfo.base_id = pi.readInt();
            goodsInfo.bind = pi.readByte() == 1;
            goodsInfo.quantity = pi.readInt();
            info.gainGoods.push(goodsInfo);
            count--;
        }
        //对手的数据
        var enemyID = pi.readInt64();
        info.enemyName = pi.readUTF();
        info.enemyScore = pi.readInt();
        info.enemyTime = pi.readShort();
        info.selfWin = pi.readByte() == 1;
        if (Manager.control.getFireEye().banView != null) {
            Manager.control.getFireEye().banView.dispose();
            Manager.control.getFireEye().banView = null;
        }
        if (Manager.control.getFireEye().finishView != null) {
            Manager.control.getFireEye().finishView.dispose();
            Manager.control.getFireEye().finishView = null;
        }
        Manager.view.show(135 /* FireEyeLevelResultView */, info);
    };
    return FireEyeLevelResultCMD;
}(BaseCMD));
//# sourceMappingURL=FireEyeLevelResultCMD.js.map