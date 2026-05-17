var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *author Anydo
 *create 2017-11-17
 *description
*/
var SkillConfigMoveInfo = (function () {
    function SkillConfigMoveInfo() {
    }
    SkillConfigMoveInfo.prototype.reuse = function (configStr, angleCom) {
        //延迟秒数&起始速度(每秒的移动像素)&加速度&相对起始点的X偏移(左减右加)&相对起始点的Y偏移(上加下减)
        var arr = configStr.split("&");
        this.delayTime = parseFloat(arr[0]);
        var tspeed = parseFloat(arr[1]);
        var tspeedAdd = parseFloat(arr[2]);
        var tempX = parseInt(arr[3]);
        var tempY = parseInt(arr[4]);
        var vd1 = new Vector2D(tempX, tempY);
        var tAngle = (vd1.angle * 180) / Math.PI; //弧度转角度
        tAngle = -tAngle;
        tAngle = (tAngle + 360) % 360;
        tAngle = (tAngle + angleCom + 360) % 360;
        tAngle = tAngle * Math.PI / 180; //角度转弧度
        var vd2 = new Vector2D(1, 0);
        vd2.angle = tAngle;
        vd2.length = vd1.length;
        this.moveDisX = Number(vd2.x.toFixed(3));
        this.moveDisY = Number(vd2.y.toFixed(3));
        vd2.length = tspeed;
        this.speedX = Number(vd2.x.toFixed(3));
        this.speedY = Number(vd2.y.toFixed(3));
        vd2.length = tspeedAdd;
        this.speedAddX = Number(vd2.x.toFixed(3));
        this.speedAddY = Number(vd2.y.toFixed(3));
    };
    SkillConfigMoveInfo.prototype.unuse = function () {
        this.delayTime = 0;
        this.moveDisX = 0;
        this.moveDisY = 0;
        this.startX = 0;
        this.startY = 0;
        this.targetX = 0;
        this.targetY = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.speedAddX = 0;
        this.speedAddY = 0;
        this.runTime = 0;
    };
    SkillConfigMoveInfo.prototype.setStart = function (startX, startY) {
        this.runTime = 0;
        this.startX = startX;
        this.startY = startY;
        this.targetX = startX + this.moveDisX;
        this.targetY = startY + this.moveDisY;
    };
    SkillConfigMoveInfo.prototype.getRunDiS = function (interval) {
        this.runTime += interval;
        var ttime = this.runTime / 1000;
        var disX = this.speedX * ttime + 0.5 * this.speedAddX * ttime * ttime;
        var disY = this.speedY * ttime + 0.5 * this.speedAddY * ttime * ttime;
        return [disX, disY];
    };
    SkillConfigMoveInfo.prototype.dispose = function () {
    };
    return SkillConfigMoveInfo;
}());
__reflect(SkillConfigMoveInfo.prototype, "SkillConfigMoveInfo", ["cw.IPool", "cw.IDispose"]);
//# sourceMappingURL=SkillConfigMoveInfo.js.map