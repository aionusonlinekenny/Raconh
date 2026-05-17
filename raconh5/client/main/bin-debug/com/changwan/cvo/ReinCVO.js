var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 转生模板表
 * liangyan
 * create 2017-12-14
*/
var ReinCVO = (function () {
    function ReinCVO() {
    }
    Object.defineProperty(ReinCVO.prototype, "showRewards", {
        /**展示奖励 */
        get: function () {
            return this.parseShowRewards(this._rewardsStr);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReinCVO.prototype, "dress", {
        /**展示时装 */
        get: function () {
            var arr = this._dressStr.split(",");
            if (arr.length <= 1)
                return -1;
            return Number(arr[Manager.model.self.attrInfo.career - 1]);
        },
        enumerable: true,
        configurable: true
    });
    ReinCVO.parse = function (bytes) {
        ReinCVO._cvos = {};
        var tableCount = bytes.readByte();
        var baseCount = bytes.readShort();
        var cvo;
        for (var i = 0; i < baseCount; i++) {
            cvo = new ReinCVO();
            cvo.parseOne(bytes);
            ReinCVO._cvos[cvo.level] = cvo;
        }
        this.maxLevel = baseCount - 1;
    };
    ReinCVO.prototype.parseOne = function (data) {
        this.level = data.readShort();
        this.parseCond(data.readUTF());
        this.loss = new GainLossVO(data.readUTF());
        this._attrStr = data.readUTF();
        this.attr = Manager.pool.create(AttrVO, this._attrStr);
        this._rewardsStr = data.readUTF();
        this._dressStr = data.readUTF();
    };
    ReinCVO.prototype.parseCond = function (str) {
        this.condArr = [];
        var arr = str.split("|");
        var cond;
        for (var i = 0; i < arr.length; i++) {
            cond = new ConditionVO(arr[i]);
            this.condArr.push(cond);
        }
    };
    ReinCVO.prototype.parseShowRewards = function (str) {
        if (this._rewards && this._rewards.length > 0)
            return this._rewards;
        this._rewards = [];
        var arr = str.split("|");
        var cond;
        var self = Manager.model.self;
        for (var i = 0; i < arr.length; i++) {
            cond = new GainLossVO(arr[i]);
            var goods = ItemsCVO.getCvo(cond.baseId);
            var needRein = (goods.needLevel / 10 - 100);
            if (goods.needCarrer == 0 || goods.needLevel == 0)
                this._rewards.push(cond);
            else if (goods.needCarrer > 0 && goods.needCarrer == self.attrInfo.career)
                this._rewards.push(cond);
            else if (needRein > 0 && needRein <= self.attrInfo.zhuanshu)
                this._rewards.push(cond);
        }
        return this._rewards;
    };
    ReinCVO.getCvo = function (level) {
        return ReinCVO._cvos[level];
    };
    Object.defineProperty(ReinCVO.prototype, "isMax", {
        get: function () {
            return this.level >= ReinCVO.maxLevel;
        },
        enumerable: true,
        configurable: true
    });
    return ReinCVO;
}());
__reflect(ReinCVO.prototype, "ReinCVO");
//# sourceMappingURL=ReinCVO.js.map