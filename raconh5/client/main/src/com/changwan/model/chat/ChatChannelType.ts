/**
 * 聊天频道类型
 * liangyan
 * create 2017-11-13
*/
class ChatChannelType
{
    /** 系统*/		
	public static SYSTEM:number = 999;
	/** 世界*/		
	public static WORLD:number = 1;
	/** 好友*/		
	public static FRIENDS:number = 2;
	/** 帮派*/		
	public static CORPS:number = 3;

	public static getChannelByIndex(index:number):number
	{
		switch(index)
		{
			case 0:
				return this.SYSTEM;
			case 1:
				return this.WORLD;
			case 2:
				return this.CORPS;
		}
	}
}