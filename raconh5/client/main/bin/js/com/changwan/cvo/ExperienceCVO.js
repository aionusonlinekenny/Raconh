/**
 * 经验表
 */
var ExperienceCVO = /** @class */ (function () {
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
var ExperienceInfo = /** @class */ (function () {
    function ExperienceInfo(bytes) {
        if (bytes) {
            this.level = bytes.readShort();
            this.exp = bytes.readDouble();
            this.totalExp = bytes.readDouble();
        }
    }
    return ExperienceInfo;
}());
//# sourceMappingURL=ExperienceCVO.js.map