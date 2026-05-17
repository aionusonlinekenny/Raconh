/**
 * 自定义UI控件事件
 * liangyan
 * create 2017-11-29
*/
class BaseUIEvent extends BaseEvent
{
    public static ITEM_RENDERER_COMPLETE:string = "ITEM_RENDERER_COMPLETE";
    /**折叠菜单展开/收缩 */
    public static ACCORDION_CHANGE_H:string = "ACCORDION_CHANGE_H";
    /**折叠菜单设置默认选中 */
    public static ACCORDION_SET_DEFAULT:string = "ACCORDION_SET_DEFAULT";
    /**折叠菜单完成排版 */
    public static ACCORDION_COMPOSING_COMPLETE:string = "ACCORDION_COMPOSING_COMPLETE";
    /**折叠菜单展开前收缩其余 */
    public static ACCORDION_BEFORE_OPEN:string = "ACCORDION_BEFORE_OPEN";
}