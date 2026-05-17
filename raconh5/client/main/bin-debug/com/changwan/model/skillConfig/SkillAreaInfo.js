var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *author Anydo
 *create 2017-11-17
 *description
*/
var SkillAreaInfo = (function () {
    function SkillAreaInfo() {
    }
    SkillAreaInfo.prototype.reuse = function (configStr, rotation) {
        var arr = configStr.split(",");
        this.dis = parseInt(arr[0]);
        this.angleCom = parseInt(arr[1]);
        this.showTime = parseInt(arr[2]);
        this.scaleX = parseInt(arr[3]);
        this.scaleY = parseInt(arr[4]);
        this.angleSelf = parseInt(arr[5]);
        this.rotation = rotation;
        this.moveConfig = arr[6];
    };
    SkillAreaInfo.prototype.unuse = function () {
        this.dis = 0;
        this.angleCom = 0;
        this.showTime = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.angleSelf = 0;
        this.rotation = 0;
        this.moveConfig = "";
    };
    SkillAreaInfo.prototype.dispose = function () {
    };
    return SkillAreaInfo;
}());
__reflect(SkillAreaInfo.prototype, "SkillAreaInfo", ["cw.IPool", "cw.IDispose"]);
//# sourceMappingURL=SkillAreaInfo.js.map