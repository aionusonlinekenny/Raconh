/**
 *author Anydo
 *create 2017-11-17
 *description
*/
var SkillAreaInfo = /** @class */ (function () {
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
//# sourceMappingURL=SkillAreaInfo.js.map