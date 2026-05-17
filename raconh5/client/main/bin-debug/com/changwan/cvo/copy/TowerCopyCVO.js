var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 爬塔副本表
 * liangyan
 * create 2017-12-27
*/
var TowerCopyCVO = (function () {
    function TowerCopyCVO() {
    }
    Object.defineProperty(TowerCopyCVO.prototype, "monster", {
        /**怪物模板表 */
        get: function () {
            if (!this._monCvo)
                this._monCvo = MonsterCVO.getCVO(this._monsterID);
            return this._monCvo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TowerCopyCVO.prototype, "firstRewards", {
        /**首通奖励 */
        get: function () {
            if (!this._firstArr) {
                this._firstArr = [];
                var arr = this._firstStr.split("|");
                var gain = void 0;
                for (var i = 0; i < arr.length; i++) {
                    gain = new GainLossVO(arr[i]);
                    this._firstArr.push(gain);
                }
            }
            return this._firstArr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TowerCopyCVO.prototype, "saodangRewards", {
        /**扫荡奖励 */
        get: function () {
            if (!this._saodangArr) {
                this._saodangArr = [];
                var arr = this._saodangStr.split("|");
                var gain = void 0;
                for (var i = 0; i < arr.length; i++) {
                    gain = new GainLossVO(arr[i]);
                    this._saodangArr.push(gain);
                }
            }
            return this._saodangArr;
        },
        enumerable: true,
        configurable: true
    });
    TowerCopyCVO.prototype.parseOne = function (data) {
        this.cell = data.readShort();
        this.parseMonster(data.readUTF());
        this.fightAdvise = data.readInt();
        this.conditions = ConditionVO.getVOList(data.readUTF());
        this.unlockDesc = data.readUTF().split("|");
        this.isBoss = data.readByte() == 1;
        this._firstStr = data.readUTF();
        this._saodangStr = data.readUTF();
    };
    TowerCopyCVO.prototype.parseMonster = function (str) {
        var reg = /{|}| /g;
        str = str.replace(reg, "");
        var arr = str.split(",");
        this._monsterID = parseInt(arr[0]);
    };
    TowerCopyCVO.parse = function (bytes) {
        TowerCopyCVO._cvos = [];
        var cvo;
        var rowCount = bytes.readShort();
        for (var i = 0; i < rowCount; i++) {
            cvo = new TowerCopyCVO();
            cvo.parseOne(bytes);
            TowerCopyCVO._cvos[cvo.cell] = cvo;
        }
        TowerCopyCVO.MAX_CELL = rowCount;
    };
    TowerCopyCVO.getCVO = function (cell) {
        return TowerCopyCVO._cvos[cell];
    };
    /**满足所有开启条件 */
    TowerCopyCVO.prototype.isAllCondSatisfy = function (showTips) {
        if (showTips === void 0) { showTips = false; }
        var conds = this.conditions;
        var len = conds ? conds.length : 0;
        var vo;
        for (var i = 0; i < len; i++) {
            vo = conds[i];
            if (!vo.isSatisfy(null, showTips))
                return false;
        }
        return true;
    };
    Object.defineProperty(TowerCopyCVO.prototype, "isMax", {
        /**是否为最高层 */
        get: function () {
            return this.cell == TowerCopyCVO.MAX_CELL;
        },
        enumerable: true,
        configurable: true
    });
    return TowerCopyCVO;
}());
__reflect(TowerCopyCVO.prototype, "TowerCopyCVO");
//# sourceMappingURL=TowerCopyCVO.js.map