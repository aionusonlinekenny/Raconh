/**
 * 快捷菜单功能类型
 * liangyan
 * create 2017-11-07
*/
class ShortcutMenuFunType
{
    /**私聊 */
    public static PRIVATE_CHAT:number = 1;
    /**查看 */
    public static OBSERVE_EQUIPT:number = 2;
    /**删除 */
    public static DELETE:number = 3;
    /**黑名单 */
    public static BLACK_LIST:number = 4;
    /**加好友 */
    public static ADD_FRIENDS:number = 5;
    /**决斗 */
    public static FIGHT:number = 6;

    /**
	 * 根据点击类型，获取按钮数组
	 */		
	public static getLabelsByType(type:number):Array<number>
	{
		let result = new Array<number>();
		switch(type)
        {
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
    }

    public static getIconName(id:number):string
    {
        let str = "";
        switch(id)
        {
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
    }
}