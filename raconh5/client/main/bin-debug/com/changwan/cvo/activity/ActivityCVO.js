var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 活跃度表
 * luzhihong
 * create 2017-11-22
 */
var ActivityCVO = (function () {
    function ActivityCVO() {
    }
    Object.defineProperty(ActivityCVO.prototype, "isOpen", {
        get: function () {
            return OpenCVO.isOpen(this.openID);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivityCVO.prototype, "openID", {
        get: function () {
            return this.linkArr.length > 0 ? parseInt(this.linkArr[0]) : 0;
        },
        enumerable: true,
        configurable: true
    });
    /*解析表*/
    ActivityCVO.parseCVOs = function (bytes) {
        var tabCount = bytes.readByte();
        ActivityCVO.parse(bytes);
        ActivityScheduleCVO.parse(bytes);
    };
    /*解析表*/
    ActivityCVO.parse = function (bytes) {
        ActivityCVO._cvos = [];
        var cvo;
        var rowCount = bytes.readShort();
        for (var j = 0; j < rowCount; j++) {
            cvo = new ActivityCVO();
            cvo.id = bytes.readShort();
            cvo.rank = bytes.readShort();
            cvo.type = bytes.readByte();
            cvo.timeDesc = bytes.readUTF();
            cvo.iconID = bytes.readShort();
            cvo.description = bytes.readUTF();
            cvo.need = bytes.readInt();
            cvo.value = bytes.readInt();
            cvo.gain = new GainLossVO(bytes.readUTF());
            cvo.linkArr = bytes.readUTF().split("|");
            this._cvos.push(cvo);
        }
    };
    ActivityCVO.getCVOsType = function (type) {
        var arr = [];
        for (var i = this._cvos.length - 1; i >= 0; i--) {
            if (this._cvos[i].type == type)
                arr.push(this._cvos[i]);
        }
        return arr;
    };
    ActivityCVO.hasCanget = function (type) {
        if (type === void 0) { type = -1; }
        for (var i = this._cvos.length - 1; i >= 0; i--) {
            if ((type == -1 || this._cvos[i].type == type) && this._cvos[i].canGet)
                return true;
        }
        return false;
    };
    Object.defineProperty(ActivityCVO.prototype, "hasGet", {
        //-------------------------------------------------------------------
        /*是否已领取*/
        get: function () {
            return Manager.model.getActivity().dailyHasGet(this.id);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivityCVO.prototype, "canGet", {
        /*是否能领取*/
        get: function () {
            return this.finishCount >= this.need && !this.hasGet;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivityCVO.prototype, "finishCount", {
        /*已完成数量*/
        get: function () {
            return Manager.model.getActivity().dailyFinishCount(this.id);
        },
        enumerable: true,
        configurable: true
    });
    ActivityCVO.ID_YANWU = 12;
    return ActivityCVO;
}());
__reflect(ActivityCVO.prototype, "ActivityCVO");
//# sourceMappingURL=ActivityCVO.js.map