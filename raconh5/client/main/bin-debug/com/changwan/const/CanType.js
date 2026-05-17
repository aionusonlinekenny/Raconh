var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *author Anydo
 *create 2017-11-27
 *description
*/
var CanType = (function () {
    function CanType() {
    }
    /**
     * 能否走路
     */
    CanType.CAN_WALK = 1;
    /**
     * 能否攻击
     */
    CanType.CAN_HIT = 2;
    /**
     * 能否挂机
     */
    CanType.CAN_HOOK = 4;
    /**
     * 能否传送，使用小飞鞋
     */
    CanType.CAN_FLY = 8;
    /**
     * 能否操作任务
     */
    CanType.CAN_TASK = 16;
    /**
     * 能否跳跃
     */
    CanType.CAN_JUMP = 32;
    /**
     * 能否切换地图
     */
    CanType.CAN_CHANGE_MAP = 64;
    /**
     * 能否冲刺
     */
    CanType.CAN_SPRINT = 128;
    return CanType;
}());
__reflect(CanType.prototype, "CanType");
//# sourceMappingURL=CanType.js.map