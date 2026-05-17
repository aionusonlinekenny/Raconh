/**
 *liangyan
 *create 2017-11-02
*/
class FriendsModel extends egret.EventDispatcher
{
    public infos:Array<FriendsPlayerInfo>;
    public chatDatas:Object;
	public searchInfos:Array<FriendsPlayerInfo>;

    public constructor()
    {
        super();
		this.infos = [];
		this.chatDatas = {};
    }

    /**列表添加 */		
	public addFriends(friend:FriendsPlayerInfo, needAlert:boolean = true):void
	{
		if(this.infos.indexOf(friend) != -1) return;
		this.infos.push(friend);
		if(!this.chatDatas.hasOwnProperty("" + friend.id)) this.chatDatas[friend.id] = new Array<FriendsChatInfo>();
		this.dispatchEvent(new FriendsEvent(FriendsEvent.ADD_PLAYER));
		if(needAlert) FloatTips.addTips("添加成功", Color.GREEN);
	}
    /**请求添加好友（用ID）*/
    public addFriendByID(id:number):void
	{
        Manager.control.getFriends().addFriends(id, FriendsType.FRIEND);
	}
	/**请求添加好友（用昵称）*/		
	public addFriendByName(name:string): void
	{
		Manager.control.getFriends().addFriends(0, FriendsType.FRIEND, name);
	}
    /**列表移除 by id*/
	public removeFriendsByID(id:number):void
	{
		let info:FriendsPlayerInfo = this.getFriendsByID(id);
		if(info != null)
		{
			let type = info.type;
			this.removeFriendsByInfo(info);
			delete this.chatDatas[id];
            this.dispatchEvent(new FriendsEvent(FriendsEvent.DELETE_PLAYER));
		}
	}
    /**列表移除 by info */
	public removeFriendsByInfo(info:FriendsPlayerInfo):void
	{
		let index = this.infos.indexOf(info);
		if(index != -1) this.infos.splice(index, 1);
	}
    /**更新信息 */	
	public updateFriendsInfo(friend:FriendsPlayerInfo, needReSort:boolean = false):void
	{
        this.dispatchEvent(new FriendsEvent(FriendsEvent.UPDATE_PLAYER));
	}
    /**根据类型获取信息 */
	public getFriendsByType(type:number, needOnline:boolean=false):Array<FriendsPlayerInfo>
	{
        let result:Array<FriendsPlayerInfo> = [];
		for(let i = 0; i < this.infos.length; i ++)
		{
			if((this.infos[i].type & type) == type)
			{
				if(needOnline)
                {
					if(this.infos[i].isOnline) result.push(this.infos[i]);
				}
				else result.push(this.infos[i]);
			}
		}
		return result;
	}
    /**根据id获取信息 */
	public getFriendsByID(id:number):FriendsPlayerInfo
	{
		for(let i = 0; i < this.infos.length; i ++)
		{
			if(this.infos[i].id == id) return this.infos[i];
		}
		return null;
	}
    /**根据id、类型获取信息 */
	public getFriendsByIDAndType(id:number, type:number):FriendsPlayerInfo
	{
		for(let i = 0; i < this.infos.length; i ++)
		{
			if(this.infos[i].id == id && (this.infos[i].type & type) == type) return this.infos[i];
		}
		return null;
	}
	/**根据名字获取信息 */	
	public getFriendsByName(name:String):FriendsPlayerInfo
	{
		for(let i = 0; i < this.infos.length; i ++)
		{
			if(this.infos[i].nickName == name) return this.infos[i];
		}
		return null;
	}
	/**检测是否为好友 */
	public checkIsFriend(id:number):boolean
	{
		for(let i = 0; i < this.infos.length; i ++)
		{
			if(this.infos[i].id == id)
			{
				if(this.isFriend(this.infos[i].type)) return true;
				else return false;
			}
		}
		return false;
	}
	/**检测是否为好友类型 */	
	public isFriend(type:number):boolean
	{
		if((type & FriendsType.FRIEND) == FriendsType.FRIEND) return true;
		return false;
	}
	/**根据id检查是否在type分组里 */
	public checkFriendsBeingByID(id:number, type:number):boolean
	{
		let info:FriendsPlayerInfo = this.getFriendsByID(id);
		if(info != null && ((info.type & type) == type)) return true;
		return false;
	}
	/**根据name检查是否在type分组里 */
	public checkFriendsBeingByName(name:string, type:number):boolean
	{
		if((this.getFriendsByName(name) != null) && ((this.getFriendsByName(name).type & type) == type)) return true;
		else return false;
	}
	/**搜索列表添加 */		
	public addSearchInfo(info:FriendsPlayerInfo):void
	{
		this.searchInfos.push(info);
	}
	/**获取批量删除列表 */
	public getBatchDelInfos():Array<FriendsPlayerInfo>
	{
		let result:Array<FriendsPlayerInfo> = [];
		let length = this.infos.length;
		let offDays:number;
		for(let i = 0; i < length; i++)
		{
			offDays = (Manager.model.getLogin().serverTimeInfo.serverTime / 1000 - this.infos[i].lastOnlineTime) / 86400;
			if(offDays >= 3) result.push(this.infos[i]);
		}
		result.sort((a:FriendsPlayerInfo, b:FriendsPlayerInfo) => { return (a.lastOnlineTime > b.lastOnlineTime ? 1 : -1) });
		return result;
	}
	/**添加聊天消息 */
	public pushChatData(info:FriendsChatInfo, id:number):void
	{
		if(!this.chatDatas.hasOwnProperty("" + id)) this.chatDatas[id] = new Array<FriendsChatInfo>();
		this.chatDatas["" + id].push(info);
		this.dispatchEvent(new ChatEvent(ChatEvent.ADD_PRIVATE_MSG));
		this.dispatchEvent(new FriendsEvent(FriendsEvent.SHOW_HIDE_TIPS));
	}
	/**根据id获取聊天记录 */
	public getChatData(id:number):Array<FriendsChatInfo>
	{
		if(!this.chatDatas.hasOwnProperty("" + id)) return null;
		return this.chatDatas[id];
	}
	/**是否有未读消息 */
	public get hasUnReadMsg():boolean
	{
		let infos:Array<FriendsChatInfo>;
		let selfID = Manager.model.self.id;
		for(let key in this.chatDatas)
		{
			infos = this.chatDatas[key] as Array<FriendsChatInfo>
			let len = infos ? infos.length : 0;
			let info:FriendsChatInfo;
			for(let i = 0; i < len; i++)
			{
				info = infos[i];
				if(!info.hasDraw && info.fromID != selfID) return true;
			}
		}
		return false;
	}
}