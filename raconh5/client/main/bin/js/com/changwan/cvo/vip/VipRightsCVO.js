/**
 * vip特权表
 * liangyan
 * create 2017-12-25
*/
var VipRightsCVO = /** @class */ (function () {
    function VipRightsCVO() {
    }
    VipRightsCVO.prototype.parse = function (data) {
        this.level = data.readByte();
        this.shopOpen = data.readByte() == 1;
        this.coinCopyBuy = data.readByte();
        this.expCopyBuy = data.readByte();
        this.freeSign = data.readByte();
        this.copySweep = data.readByte();
        this.treeShake = data.readByte();
        this.arenaAdd = data.readByte();
    };
    VipRightsCVO.getCVO = function (level) {
        return VipRightsCVO.cvos[level];
    };
    return VipRightsCVO;
}());
//# sourceMappingURL=VipRightsCVO.js.map