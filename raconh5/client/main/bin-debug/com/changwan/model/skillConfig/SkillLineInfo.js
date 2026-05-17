var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *author Anydo
 *create 2017-11-17
 *description
*/
var SkillLineInfo = (function () {
    function SkillLineInfo() {
    }
    SkillLineInfo.prototype.reuse = function (configStr, rotation, autoOverturn) {
        var arr = configStr.split(",");
        this.dis = parseInt(arr[0]);
        this.angle = parseInt(arr[1]);
        if (autoOverturn)
            this.angle *= -1;
        this.showTime = parseInt(arr[2]);
        this.autoOverturn = autoOverturn;
        this.rotation = rotation;
        this.moveConfig = arr[3];
    };
    SkillLineInfo.prototype.unuse = function () {
        this.dis = 0;
        this.angle = 0;
        this.showTime = 0;
        this.autoOverturn = false;
        this.rotation = 0;
        this.moveConfig = "";
    };
    SkillLineInfo.prototype.dispose = function () {
    };
    return SkillLineInfo;
}());
__reflect(SkillLineInfo.prototype, "SkillLineInfo", ["cw.IPool", "cw.IDispose"]);
//# sourceMappingURL=SkillLineInfo.js.map