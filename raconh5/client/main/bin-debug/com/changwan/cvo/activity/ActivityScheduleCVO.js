var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 活跃进度奖励
 * luzhihong
 * create 2017-11-22
 */
var ActivityScheduleCVO = (function () {
    function ActivityScheduleCVO() {
    }
    /*解析表*/
    ActivityScheduleCVO.parse = function (bytes) {
        ActivityScheduleCVO._cvos = [];
        var cvo;
        var rowCount = bytes.readShort();
        for (var j = 0; j < rowCount; j++) {
            cvo = new ActivityScheduleCVO();
            cvo.id = bytes.readShort();
            cvo.value = bytes.readInt();
            cvo.gains = GainLossVO.parse(bytes.readUTF());
            ActivityScheduleCVO._cvos.push(cvo);
        }
    };
    ActivityScheduleCVO.getCVOs = function () {
        return ActivityScheduleCVO._cvos;
    };
    ActivityScheduleCVO.hasCanget = function () {
        for (var i = this._cvos.length - 1; i >= 0; i--) {
            if (this._cvos[i].canGet)
                return true;
        }
        return false;
    };
    Object.defineProperty(ActivityScheduleCVO.prototype, "hasGet", {
        //-------------------------------------------------------------------
        /*是否已领取*/
        get: function () {
            return Manager.model.getActivity().dailyScheduleHasGet(this.id);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivityScheduleCVO.prototype, "canGet", {
        /*是否能领取*/
        get: function () {
            return Manager.model.getActivity().curDailyValue >= this.value && !this.hasGet;
        },
        enumerable: true,
        configurable: true
    });
    return ActivityScheduleCVO;
}());
__reflect(ActivityScheduleCVO.prototype, "ActivityScheduleCVO");
//# sourceMappingURL=ActivityScheduleCVO.js.map