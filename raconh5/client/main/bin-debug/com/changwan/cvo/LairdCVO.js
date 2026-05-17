var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 斗地主
 * Simon
 * 2018.1.23
 */
var LairdCVO = (function () {
    function LairdCVO() {
    }
    LairdCVO.parse = function (bytes) {
        var tableCount = bytes.readByte();
        for (var i = 0; i < tableCount; i++) {
            var count = bytes.readShort();
            if (i == 0) {
                for (var j = 0; j < count; j++) {
                    var info = new LairdCVO();
                    info.id = bytes.readByte();
                    info.value = bytes.readInt();
                    this._cvo[info.id] = info;
                }
            }
            if (i == 1) {
                for (var j = 0; j < count; j++) {
                    var info = new LairdAwardInfo();
                    info.id = bytes.readByte();
                    info.award = new GainLossVO(bytes.readUTF());
                    this._awardCvo[info.id] = info;
                }
            }
            if (i == 2) {
                for (var j = 0; j < count; j++) {
                    var info = new LairdInteractInfo();
                    info.id = bytes.readByte();
                    info.type = bytes.readByte();
                    info.name = bytes.readUTF();
                    this._interactCvo[info.id] = info;
                }
            }
            if (i == 3) {
                for (var j = 0; j < count; j++) {
                    var info = new LairdExpInfo();
                    info.id = bytes.readShort();
                    info.minLevel = bytes.readShort();
                    info.maxLevel = bytes.readShort();
                    info.exp = bytes.readInt();
                    this._expCvo[info.id] = info;
                }
            }
        }
    };
    LairdCVO.getInfo = function (id) {
        return this._cvo[id];
    };
    LairdCVO.getAward = function (id) {
        return this._awardCvo[id];
    };
    LairdCVO.getInteractByType = function (type) {
        var list = [];
        for (var i in this._interactCvo) {
            if (this._interactCvo[i].type == type)
                list.push(this._interactCvo[i]);
        }
        return list;
    };
    LairdCVO.getExpInfoByLevel = function (level) {
        for (var i in this._expCvo) {
            if (level >= this._expCvo[i].minLevel && level < this._expCvo[i].maxLevel)
                return this._expCvo[i];
        }
        return null;
    };
    LairdCVO._cvo = {};
    LairdCVO._awardCvo = {};
    LairdCVO._interactCvo = {};
    LairdCVO._expCvo = {};
    return LairdCVO;
}());
__reflect(LairdCVO.prototype, "LairdCVO");
var LairdAwardInfo = (function () {
    function LairdAwardInfo() {
    }
    return LairdAwardInfo;
}());
__reflect(LairdAwardInfo.prototype, "LairdAwardInfo");
var LairdInteractInfo = (function () {
    function LairdInteractInfo() {
    }
    return LairdInteractInfo;
}());
__reflect(LairdInteractInfo.prototype, "LairdInteractInfo");
var LairdExpInfo = (function () {
    function LairdExpInfo() {
    }
    return LairdExpInfo;
}());
__reflect(LairdExpInfo.prototype, "LairdExpInfo");
//# sourceMappingURL=LairdCVO.js.map