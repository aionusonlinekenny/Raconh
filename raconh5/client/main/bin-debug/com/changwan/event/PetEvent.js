var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 宠物事件
 * liangyan
 * create 2017-12-16
*/
var PetEvent = (function (_super) {
    __extends(PetEvent, _super);
    function PetEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**宠物全部信息 */
    PetEvent.ALL_INFO = "ALL_INFO";
    /**宠物进阶 */
    PetEvent.UPGRADE = "UPGRADE";
    /**宠物技能更新 */
    PetEvent.UPGRADE_SKILL = "UPGRADE_SKILL";
    /**宠物资质丹使用 */
    PetEvent.ZZD_USE = "ZZD_USE";
    /**宠物悟性丹使用 */
    PetEvent.WXD_USE = "WXD_USE";
    /**宠物总属性更新 */
    PetEvent.UPDATE_ALL_ATTR = "UPDATE_ALL_ATTR";
    /**宠物幻化 */
    PetEvent.HUANHUA = "HUANHUA";
    /**宠物物品外形列表更新 */
    PetEvent.ITEM_STYLE_LIST = "ITEM_STYLE_LIST";
    return PetEvent;
}(BaseEvent));
__reflect(PetEvent.prototype, "PetEvent");
//# sourceMappingURL=PetEvent.js.map