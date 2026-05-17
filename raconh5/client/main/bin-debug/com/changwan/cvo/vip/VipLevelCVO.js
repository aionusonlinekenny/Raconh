var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * vip等级表
 * liangyan
 * create 2017-12-25
*/
var VipLevelCVO = (function () {
    function VipLevelCVO() {
    }
    Object.defineProperty(VipLevelCVO.prototype, "rewards", {
        /**物品奖励 */
        get: function () {
            if (!this._rewardsArr) {
                this._rewardsArr = [];
                var arr = this._rewardStr.split("|");
                var gain = void 0;
                for (var i = 0; i < arr.length; i++) {
                    gain = new GainLossVO(arr[i]);
                    this._rewardsArr.push(gain);
                }
            }
            return this._rewardsArr;
        },
        enumerable: true,
        configurable: true
    });
    VipLevelCVO.prototype.parseOne = function (data) {
        this.level = data.readByte();
        this.nextLimit = data.readInt();
        this._rewardStr = data.readUTF();
        this.award = data.readUTF();
        this.showEff = data.readByte() == 1;
        this.rightsDesc = data.readUTF();
        this.newItem = data.readUTF();
        this.picID = data.readShort();
        this.showID = data.readShort();
    };
    VipLevelCVO.parse = function (bytes) {
        VipLevelCVO._cvos = {};
        VipRightsCVO.cvos = {};
        var tableCount = bytes.readByte();
        var baseCount = bytes.readShort();
        VipLevelCVO.MAX_LEVEL = baseCount - 1;
        var cvo;
        for (var i = 0; i < baseCount; i++) {
            cvo = new VipLevelCVO();
            cvo.parseOne(bytes);
            VipLevelCVO._cvos[cvo.level] = cvo;
        }
        var rightsCount = bytes.readShort();
        var rights;
        for (var j = 0; j < rightsCount; j++) {
            rights = new VipRightsCVO();
            rights.parse(bytes);
            if (rights.level == 4 || rights.level == 6 || rights.level > 7) {
                var a = 0;
            }
            VipRightsCVO.cvos[rights.level] = rights;
        }
    };
    VipLevelCVO.getCVO = function (level) {
        return VipLevelCVO._cvos[level];
    };
    Object.defineProperty(VipLevelCVO.prototype, "isMax", {
        get: function () {
            return this.level == VipLevelCVO.MAX_LEVEL;
        },
        enumerable: true,
        configurable: true
    });
    return VipLevelCVO;
}());
__reflect(VipLevelCVO.prototype, "VipLevelCVO");
//# sourceMappingURL=VipLevelCVO.js.map