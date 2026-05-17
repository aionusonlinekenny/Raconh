/**
 * BOSS表
 * luzhihong
 * create 2017-12-27
 */
var BossCVO = /** @class */ (function () {
    function BossCVO() {
        //动态数据-------------------------------------------------------------
        this.curBlood = 0; //当前血量
        this.totalBlood = 0; //总血量
        this.reviveTime = 0; //复活时间
    }
    Object.defineProperty(BossCVO.prototype, "boss", {
        get: function () {
            if (!this._bossCVO)
                this._bossCVO = MonsterCVO.getCVO(this.bossID);
            return this._bossCVO;
        },
        enumerable: true,
        configurable: true
    });
    /*解析表*/
    BossCVO.parse = function (bytes) {
        BossCVO._cvos = [];
        var cvo;
        var tabCount = bytes.readByte();
        var rowCount = bytes.readShort();
        for (var j = 0; j < rowCount; j++) {
            cvo = new BossCVO();
            cvo.id = bytes.readByte();
            cvo.bossID = ArrayUtil.parseStringToArray(bytes.readUTF())[0];
            ;
            cvo.pkMode = bytes.readByte();
            cvo.show = GainLossVO.parse(bytes.readUTF());
            cvo.condVo = new ConditionVO(bytes.readUTF());
            BossCVO._cvos[cvo.id] = cvo;
        }
    };
    BossCVO.getCVO = function (id) {
        return BossCVO._cvos[id];
    };
    BossCVO.getCVOs = function () {
        var result = [];
        for (var key in this._cvos) {
            result.push(this._cvos[key]);
        }
        return result;
    };
    BossCVO.prototype.setBossInfo = function (cur, total, revive) {
        if (this.curBlood == cur && this.totalBlood == total && this.reviveTime == revive)
            return;
        this.curBlood = cur;
        this.totalBlood = total;
        this.reviveTime = revive;
        Manager.model.getBoss().dispatchEvent(new BossEvent(BossEvent.BLOOD_INFO, this.id));
    };
    Object.defineProperty(BossCVO.prototype, "isKilled", {
        /*是否已击杀*/
        get: function () { return this.curBlood == 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BossCVO.prototype, "leftTime", {
        //剩余时间
        get: function () {
            return Math.floor(this.reviveTime - Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BossCVO.prototype, "isAttention", {
        /*是否已关注*/
        get: function () { return Manager.model.getBoss().isAttention(this.id); },
        enumerable: true,
        configurable: true
    });
    return BossCVO;
}());
//# sourceMappingURL=BossCVO.js.map