/**
 *author Anydo
 *create 2017-11-17
 *description
*/
var SkillLineInfo = /** @class */ (function () {
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
//# sourceMappingURL=SkillLineInfo.js.map