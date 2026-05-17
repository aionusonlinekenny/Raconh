/**
 * 快捷菜单功能类型
 * liangyan
 * create 2017-11-07
*/
var ShortcutMenuFunType = /** @class */ (function () {
    function ShortcutMenuFunType() {
    }
    /**
     * 根据点击类型，获取按钮数组
     */
    ShortcutMenuFunType.getLabelsByType = function (type) {
        var result = new Array();
        switch (type) {
            case ShortcutMenuType.FRIENDS:
                result.push(this.PRIVATE_CHAT, this.DELETE, this.BLACK_LIST);
                break;
            case ShortcutMenuType.SEARCH:
                result.push(this.PRIVATE_CHAT, this.BLACK_LIST, this.ADD_FRIENDS);
                break;
            case ShortcutMenuType.BLACK:
                result.push(this.DELETE);
                break;
            case ShortcutMenuType.CHAT:
                result.push(this.ADD_FRIENDS, this.DELETE, this.BLACK_LIST);
                break;
        }
        return result;
    };
    ShortcutMenuFunType.getIconName = function (id) {
        var str = "";
        switch (id) {
            case this.PRIVATE_CHAT:
                str = "shortcut_chat_png";
                break;
            case this.OBSERVE_EQUIPT:
                str = "shortcut_watch_png";
                break;
            case this.DELETE:
                str = "shortcut_delete_png";
                break;
            case this.BLACK_LIST:
                str = "shortcut_black_png";
                break;
            case this.ADD_FRIENDS:
                str = "shortcut_friends_png";
                break;
            case this.FIGHT:
                str = "";
                break;
        }
        return str;
    };
    /**私聊 */
    ShortcutMenuFunType.PRIVATE_CHAT = 1;
    /**查看 */
    ShortcutMenuFunType.OBSERVE_EQUIPT = 2;
    /**删除 */
    ShortcutMenuFunType.DELETE = 3;
    /**黑名单 */
    ShortcutMenuFunType.BLACK_LIST = 4;
    /**加好友 */
    ShortcutMenuFunType.ADD_FRIENDS = 5;
    /**决斗 */
    ShortcutMenuFunType.FIGHT = 6;
    return ShortcutMenuFunType;
}());
//# sourceMappingURL=ShortcutMenuFunType.js.map