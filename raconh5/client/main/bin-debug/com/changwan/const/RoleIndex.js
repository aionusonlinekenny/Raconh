var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 角色界面索引
 * liangyan
 * create 2017-12-25
*/
var RoleIndex = (function () {
    function RoleIndex() {
    }
    /**角色 */
    RoleIndex.ROLE = 0;
    /**宠物 */
    RoleIndex.PET = 1;
    /**装扮 */
    RoleIndex.DRESS = 2;
    /**神兵 */
    RoleIndex.SOLDIER = 3;
    /**披风 */
    RoleIndex.CLOAK = 5;
    return RoleIndex;
}());
__reflect(RoleIndex.prototype, "RoleIndex");
//# sourceMappingURL=RoleIndex.js.map