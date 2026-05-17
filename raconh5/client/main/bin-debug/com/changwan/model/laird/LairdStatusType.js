var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 斗地主身份类型
 */
var LairdStatusType = (function () {
    function LairdStatusType() {
    }
    /**自由身 */
    LairdStatusType.STATUS_FREE = 0;
    /**地主 */
    LairdStatusType.STATUS_LORD = 1;
    /**苦力 */
    LairdStatusType.STATUS_COOLY = 2;
    return LairdStatusType;
}());
__reflect(LairdStatusType.prototype, "LairdStatusType");
//# sourceMappingURL=LairdStatusType.js.map