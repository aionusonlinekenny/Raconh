var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WalkType = (function () {
    function WalkType() {
    }
    /** 走路 */
    WalkType.WALK = 1;
    /** 冲刺 */
    WalkType.SPRINT = 2;
    /** 跳跃 */
    WalkType.JUMP = 3;
    /** 滑行 */
    WalkType.SLIDE = 4;
    /** 风筝上行 */
    WalkType.KITE = 5;
    /** 水面上行 */
    WalkType.WATER = 6;
    return WalkType;
}());
__reflect(WalkType.prototype, "WalkType");
//# sourceMappingURL=WalkType.js.map