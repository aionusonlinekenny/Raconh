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
 * 自定义UI控件事件
 * liangyan
 * create 2017-11-29
*/
var BaseUIEvent = /** @class */ (function (_super) {
    __extends(BaseUIEvent, _super);
    function BaseUIEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseUIEvent.ITEM_RENDERER_COMPLETE = "ITEM_RENDERER_COMPLETE";
    /**折叠菜单展开/收缩 */
    BaseUIEvent.ACCORDION_CHANGE_H = "ACCORDION_CHANGE_H";
    /**折叠菜单设置默认选中 */
    BaseUIEvent.ACCORDION_SET_DEFAULT = "ACCORDION_SET_DEFAULT";
    /**折叠菜单完成排版 */
    BaseUIEvent.ACCORDION_COMPOSING_COMPLETE = "ACCORDION_COMPOSING_COMPLETE";
    /**折叠菜单展开前收缩其余 */
    BaseUIEvent.ACCORDION_BEFORE_OPEN = "ACCORDION_BEFORE_OPEN";
    return BaseUIEvent;
}(BaseEvent));
//# sourceMappingURL=BaseUIEvent.js.map