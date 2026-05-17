var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 新手剧情常量
 * liangyan
 * create 2018-03-19
*/
var RookieConst = (function () {
    function RookieConst() {
    }
    /**大招id */
    RookieConst.SKILL_ID = 1005;
    /**跳跃点表脚本类型——滑行 */
    RookieConst.SLIDE = 1;
    /**跳跃点表脚本类型——风筝 */
    RookieConst.KITE = 2;
    /**跳跃点表脚本类型——请求后端刷怪 */
    RookieConst.APPLY_MONSTER = 3;
    /**跳跃点表脚本类型——水上漂 */
    RookieConst.WATER = 4;
    /**第一个新手流程id */
    RookieConst.FIRST_ID = 101;
    /**第一段NPC对话id */
    RookieConst.FIRST_DIALOG_ID = 1001;
    return RookieConst;
}());
__reflect(RookieConst.prototype, "RookieConst");
//# sourceMappingURL=RookieConst.js.map