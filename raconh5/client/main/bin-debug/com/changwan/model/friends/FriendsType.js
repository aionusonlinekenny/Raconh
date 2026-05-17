var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *liangyan
 *create 2017-11-02
*/
var FriendsType = (function () {
    function FriendsType() {
    }
    /**好友 */
    FriendsType.FRIEND = 1;
    /**黑名单 */
    FriendsType.BLACK = 2;
    /**搜索 */
    FriendsType.SEARCH = 3;
    return FriendsType;
}());
__reflect(FriendsType.prototype, "FriendsType");
//# sourceMappingURL=FriendsType.js.map