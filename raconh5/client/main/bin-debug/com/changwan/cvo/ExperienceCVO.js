var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 经验表
 */
var ExperienceCVO = (function () {
    function ExperienceCVO() {
        this._data = {};
    }
    ExperienceCVO.prototype.parse = function (bytes) {
        var tableCount = bytes.readShort();
        var info;
        for (var i = 0; i < tableCount; i++) {
            info = new ExperienceInfo(bytes);
            this._data[info.level] = info;
        }
    };
    ExperienceCVO.prototype.getLevel = function (level) {
        return this._data[level];
    };
    return ExperienceCVO;
}());
__reflect(ExperienceCVO.prototype, "ExperienceCVO");
var ExperienceInfo = (function () {
    function ExperienceInfo(bytes) {
        if (bytes) {
            this.level = bytes.readShort();
            this.exp = bytes.readDouble();
            this.totalExp = bytes.readDouble();
        }
    }
    return ExperienceInfo;
}());
__reflect(ExperienceInfo.prototype, "ExperienceInfo");
//# sourceMappingURL=ExperienceCVO.js.map