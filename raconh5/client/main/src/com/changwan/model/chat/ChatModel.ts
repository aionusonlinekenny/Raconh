/**
 * 聊天model
 * liangyan
 * create 2017-11-13
*/
class ChatModel extends egret.EventDispatcher
{
	/**聊天频道消息最大数 */
	public static MAX_MSG:number = 10;

    /**当前选择聊天频道 */
    public curSelCnl:number;

    /**存储聊天频道聊天信息 */		
    private _chatDatas = {};
    public chatTopWarm:string;
	/**系统禁言结束时间戳,0无禁言，>0与系统时间比较 */		
	public disableEndTime:number;
    /**存储当前input内的装备信息 */	
	public curPropDatas:Array<ChatGoodsInfo>;

    public constructor()
    {
        super();
        this.init();
    }

    private init():void
	{
		this.chatTopWarm = "";
			
		this.curPropDatas = [];
		this.curPropDatas.length = 5;
		
		this._chatDatas = new Dictionary();
        this._chatDatas[ChatChannelType.SYSTEM] = new Array<ChatInfo>();
		this._chatDatas[ChatChannelType.WORLD] = new Array<ChatInfo>();
		this._chatDatas[ChatChannelType.CORPS] = new Array<ChatInfo>();
	}

    public pushInfo(info:ChatInfo, channel:number):void
    {
        this._chatDatas[channel].push(info);
        this.dispatchEvent(new ChatEvent(ChatEvent.ADD_CHANNEL_MSG, channel));
    }

    public getInfos(channel:number):Array<ChatInfo>
    {
        return this._chatDatas[channel];
    }

    /**是否被系统禁言 */		
	public checkDisableSendMsg():boolean
	{
		if(this.disableEndTime <= 0) return false;
        if((Manager.model.getLogin().serverTimeInfo.serverTime / 1000) > this.disableEndTime) return false;
		return true;
	}

    /** 判断装备信息体是否有效*/
	public checkPropInfo(str:string,txt:string,props:Array<ChatGoodsInfo>):string
	{
		let prop:ChatGoodsInfo;
		let tempPropName1:string;
		let tempPropName2:string;
		let tempPropName3:string;
        let length = props.length;
		for(let i = 0; i < length; i++)
		{
			prop = props[i];
			tempPropName1 = prop.goodsName;
			tempPropName2 = txt.substr(0, tempPropName1.length + 4);
				
			//剔除格式只显示装备名称,添加LinkEvent
			tempPropName3 = "<u><font color='" + prop.color + "'><a href='event:prop|"+ prop.ownerID + "|" + prop.goodsID + "'>" + prop.goodsName + "</a></font></u>";
			str = str.replace(tempPropName2,tempPropName3);
		}
		return str;
	}

	public parseLink(content:string, params:Array<any>):string
	{
		let len = params ? params.length : 0;
		let str:string;
		let links:Array<string> = [];
		for(let i = 0; i < len; i++)
        {
			let temp:Array<string>;
			switch(params[i].type)
			{
				case SysNoticeParamType.PLAYER://human|id|serverID|name
					temp = (params[i].content as string).split(",");
					str = "<u><font color='" + Color.GREEN_STR + "'><a href='event:" + "human|"+ temp[2] +"|"+ temp[1] +"|"+ temp[0] + "'>"
					 + temp[2] + "</a></font></u>";
					break;
				case SysNoticeParamType.GOODS://prop|base_id|bind|count
					temp = (params[i].content as string).split(",");
					let goodsCvo = ItemsCVO.getCvo(Number(temp[0]));
					if(!goodsCvo)
					{
						str = "查无此物id:" + temp[0];
						break;
					}
					str = "<u><font color='" + Color.getColorStrByQuality(goodsCvo.quality) + "'><a href='event:"
					 + "prop|"+ temp[0] +"|"+ temp[1] +"|"+ temp[2] + "'>"
					 + (goodsCvo ? goodsCvo.name : "查无此物id:" + temp[0]) + "</a></font></u>";
					break;
				case SysNoticeParamType.NUMBER:
				case SysNoticeParamType.STRING:
					str = params[i].content;
					break;
				case SysNoticeParamType.OPEN_PANEL://panel|id
					str = "<u><font color='" + Color.GREEN_STR + "'><a href='event:" + "panel|"+ params[i].content + "'>" + params[i].content + "</a></font></u>";
					break;
				case SysNoticeParamType.GOODS_LIST:
					temp = (params[i].content as string).split(",");
					let arrLen = temp ? Number(temp.length / 3) : 0;
					let arr:Array<string>;
					let goodsInfo:ItemsCVO;
					str = "";
					for(let i = 0; i < arrLen; i++)
					{
						arr = temp.splice(0, 3);
						goodsInfo = ItemsCVO.getCvo(Number(arr[0]));
						if(!goodsInfo)
						{
							str = "查无此物id:" + arr[0];
							break;
						}
						str += "<u><font color='" + Color.getColorStrByQuality(goodsInfo.quality) + "'><a href='event:"
						 + "prop|"+ arr[0] +"|"+ arr[1] +"|"+ arr[2] + "'>"
					 	 + (goodsInfo ? goodsInfo.name : "查无此物id:" + arr[0]) + "</a></font></u>";
						if(i != arrLen-1) str += "，";
					}
					break;
			}
			links.push(str);
        }
		content = StringUtils.setParamArr(content, links);
		return content;
	}
}