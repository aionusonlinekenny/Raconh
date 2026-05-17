var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 寻宝积分参数
 * pzx
 * create 18.2.7
 */
var ArtifactIntegralCVO = (function () {
    function ArtifactIntegralCVO() {
        this._state = 0;
    }
    ArtifactIntegralCVO.prototype.setIsReward = function (value) {
        this._state = value;
    };
    /** 是否已领奖 */
    ArtifactIntegralCVO.prototype.isReward = function () {
        return this._state;
    };
    ArtifactIntegralCVO.parse = function (bytes) {
        this._cvos = [];
        var tableCount = bytes.readShort();
        for (var i = 0; i < tableCount; i++) {
            var item = new ArtifactIntegralCVO();
            item.id = bytes.readShort();
            item.type = bytes.readByte();
            item.args = bytes.readShort();
            item.rewards = bytes.readUTF();
            this._cvos.push(item);
        }
    };
    ArtifactIntegralCVO.setisReward = function (type, args, reward) {
        for (var _i = 0, _a = this._cvos; _i < _a.length; _i++) {
            var cvo = _a[_i];
            if (cvo.type == type && cvo.args == args) {
                cvo.setIsReward(reward);
            }
        }
    };
    /** 返回当前积分cvo */
    ArtifactIntegralCVO.getCurIntegralCvo = function () {
        var ln = this._cvos.length;
        var maxindex;
        for (var i = 0; i < ln; i++) {
            var cvo = this._cvos[i];
            if (cvo.type == ArtifactType.integral_type) {
                if (cvo.isReward() == 0) {
                    //未领就返回当前cvo
                    return cvo;
                }
                maxindex = i;
            }
        }
        //全部已领取，返回最大积分的cvo
        return this._cvos[maxindex];
    };
    ArtifactIntegralCVO.getIsFristCvo = function () {
        var point = Manager.model.getArtifact().getTenCount();
        var args;
        if (point == 0) {
            args = ArtifactType.FIRST_TYPE_ONE;
        }
        else if (point < ArtifactType.FIRST_TYPE_FIRE) {
            args = ArtifactType.FIRST_TYPE_FIRE;
        }
        else {
            return null;
        }
        var ln = this._cvos.length;
        for (var i = 0; i < ln; i++) {
            var cvo = this._cvos[i];
            if (cvo.type == ArtifactType.is_First_type) {
                if (cvo.args == args) {
                    //未领就返回当前cvo
                    return cvo;
                }
            }
        }
        return null;
    };
    return ArtifactIntegralCVO;
}());
__reflect(ArtifactIntegralCVO.prototype, "ArtifactIntegralCVO");
//# sourceMappingURL=ArtifactIntegralCVO.js.map