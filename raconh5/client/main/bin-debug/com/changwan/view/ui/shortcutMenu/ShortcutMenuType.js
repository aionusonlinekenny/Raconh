var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 快捷菜单类型
 * liangyan
 * create 2017-11-06
*/
var ShortcutMenuType = (function () {
    function ShortcutMenuType() {
    }
    /**好友 */
    ShortcutMenuType.FRIENDS = 1;
    /**搜索 */
    ShortcutMenuType.SEARCH = 3;
    /**黑名单 */
    ShortcutMenuType.BLACK = 2;
    /**聊天 */
    ShortcutMenuType.CHAT = 4;
    return ShortcutMenuType;
}());
__reflect(ShortcutMenuType.prototype, "ShortcutMenuType");
//# sourceMappingURL=ShortcutMenuType.js.map