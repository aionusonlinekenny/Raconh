/**
 * 好友事件
 * liangyan
 * create 2017-11-06
*/
class FriendsEvent extends BaseEvent
{
    public static CHANGE_PLAYER_TYPE:string = "CHANGE_PLAYER_TYPE";
	public static ADD_PLAYER:string = "ADD_PLAYER";
	public static UPDATE_PLAYER:string = "UPDATE_PLAYER";
	public static DELETE_PLAYER:string = "DELETE_PLAYER";

    public static UPDATE_AFTER_DELETE:string = "UPDATE_AFTER_DELETE";
	/**查找好友成功 */
	public static SEARCH_SUCC:string = "SEARCH_SUCC";
	/**换一批推荐好友 */
	public static CHANGE_SUGGEST:string = "CHANGE_SUGGEST";
	/**空列表 */
	public static CLEAR_LIST:string = "CLEAR_LIST";
	/**显示/隐藏消息tips */
	public static SHOW_HIDE_TIPS:string = "SHOW_HIDE_TIPS";
}