/**
 *liangyan
 *create 2017-11-02
*/
class FriendsControl extends BaseControl
{
    public constructor()
    {
        super();
    }

    protected addCMD():void
    {
        Manager.socket.addCMD(Protocol.FRIENDS_LIST, FriendsListCMD);
        Manager.socket.addCMD(Protocol.FRIENDS_BATCH_OPERATE, FriendsBatchOperateCMD);
        Manager.socket.addCMD(Protocol.FRIENDS_SEARCH, FriendsSearchCMD);
        Manager.socket.addCMD(Protocol.FRIENDS_UPDATE_INFO, FriendsUpdateInfoCMD);
        Manager.socket.addCMD(Protocol.FRIENDS_ADD, FriendsAddCMD);
        Manager.socket.addCMD(Protocol.FRIENDS_SUGGEST_CHANGE, FriendsSuggestChangeCMD);
        Manager.socket.addCMD(Protocol.FRIENDS_DELETE, FriendsDeleteCMD);
    }
    /**请求好友列表 */
    public listRequest():void
	{
		let cmd:FriendsListCMD = Manager.socket.getCMD(Protocol.FRIENDS_LIST) as FriendsListCMD;
		cmd.send();
	}
    /**批量操作
     * 操作类型（0删除 1添加）
     * 好友类型（1好友 2黑名单）
     */
    public batchOperate(operateType:number, friendsType:number, ids:Array<number>):void
    {
        let cmd:FriendsBatchOperateCMD = Manager.socket.getCMD(Protocol.FRIENDS_BATCH_OPERATE) as FriendsBatchOperateCMD;
        cmd.operateType = operateType;
        cmd.friendsType = friendsType;
        cmd.ids = ids;
		cmd.send();
    }
    /**搜索好友 */
    public searchFriends(key:string):void
    {
        let cmd:FriendsSearchCMD = Manager.socket.getCMD(Protocol.FRIENDS_SEARCH) as FriendsSearchCMD;
        cmd.name = key;
        cmd.send();
    }
    /**好友信息更新 */
    public updateInfo():void
    {
        let cmd:FriendsUpdateInfoCMD = Manager.socket.getCMD(Protocol.FRIENDS_UPDATE_INFO) as FriendsUpdateInfoCMD;
        cmd.send();
    }
    /**
     * 好友添加
     * 好友类型（1好友 2黑名单）
     */
	public addFriends(id:number, friendsType:number, name:string = ""):void
	{
		let cmd:FriendsAddCMD = Manager.socket.getCMD(Protocol.FRIENDS_ADD) as FriendsAddCMD;
		cmd.id = id;
        cmd.friendsType = friendsType;
		cmd.name = name;
		cmd.send();
	}
    /**
     * 好友删除
     * 好友类型（1好友 2黑名单）
     */
	public deleteFriends(id:number, friendsType:number, name:string = ""):void
	{
		let cmd:FriendsDeleteCMD = Manager.socket.getCMD(Protocol.FRIENDS_DELETE) as FriendsDeleteCMD;
		cmd.id = id;
        cmd.friendsType = friendsType;
		cmd.name = name;
		cmd.send();
	}
    /**换一批推荐好友 */
    public changeSuggest():void
    {
        let cmd:FriendsSuggestChangeCMD = Manager.socket.getCMD(Protocol.FRIENDS_SUGGEST_CHANGE) as FriendsSuggestChangeCMD;
        cmd.send();
    }
}