/**
 * 称号事件
 * liangyan
 * create 2017-11-29
*/
class TitleEvent extends BaseEvent
{
    /**选中称号 */
    public static TITLE_SELECTED:string = "TITLE_SELECTED";

    /**称号列表刷新 */
    public static TITLE_LIST:string = "TITLE_LIST";
    /**称号激活成功 */
    public static TITLE_ACT_SUCC:string = "TITLE_ACT_SUCC";
    /**称号穿戴 */
    public static TITLE_WEAR:string = "TITLE_WEAR";
    /**称号卸下 */
    public static TITLE_TAKE_OFF:string = "TITLE_TAKE_OFF";
    /**称号获得 */
    public static TITLE_GAIN:string = "TITLE_GAIN";
    /**称号删除 */
    public static TITLE_DELETE:string = "TITLE_DELETE";
}