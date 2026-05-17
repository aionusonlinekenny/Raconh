/**
 * 聊天信息
 * liangyan
 * create 2017-11-13
*/
class ChatInfo
{
    public constructor()
	{
		this._head = "";
		this._content = "";
		this._htmlText = "";
		this._text = "";
        this._props = [];
	}
		
	private _head:string;
	public get head():string{return this._head;}
		
	private _content:string;
	public get content():string{return this._content;}

	private _career:number;
	public get career():number{return this._career;}
	public set career(value:number){this._career = value;}

	private _type:number;
	public get type():number{return this._type;}
	public set type(value:number){this._type = value;}
		
	private _fromID:number;
	public get fromID():number{return this._fromID;}
	public set fromID(value:number){this._fromID = value;}
		
	private _fromName:string;
	public get fromName():string{return this._fromName;}
	public set fromName(value:string){this._fromName = value;}
		
	private _systemType:number;
	public get systemType():number{return this._systemType;}
	public set systemType(value:number){this._systemType = value;}
		
    private _vipLvl:number;
    public get vipLvl():number{return this._vipLvl;}
	public set vipLvl(value:number){this._vipLvl = value;}

    private _htmlText:string;
    public get htmlText():string{return this._htmlText;}
	public set htmlText(value:string){this._htmlText = value;}

	private _text:string;
    public get text():string{return this._text;}
	public set text(value:string){this._text = value;}

	private _props:Array<ChatGoodsInfo>;
    public get props():Array<ChatGoodsInfo>{return this._props;}

    private _level:number;
    public get level():number{return this._level;}
	public set level(value:number){this._level = value;}

	private _headID:number;
    public get headID():number{return this._headID;}
	public set headID(value:number){this._headID = value;}

	private _platDatas:Array<any>;
    public get platDatas():Array<any>{return this._platDatas;}
	public set platDatas(value:Array<any>){this._platDatas = value;}

	private _hasDraw:boolean;
    public get hasDraw():boolean{return this._hasDraw;}
	public set hasDraw(value:boolean){this._hasDraw = value;}

	private getTxtByHtml(html:string):string
	{
		return this.removeHtml(html);
	}
		
	private get getHeadLen():number
	{
		return this.getTextByHtmlText(this._head).length;
	}
		
	public parseInfo():void
	{
		this._hasDraw = false;
		this.parseHead();
		this._content += this._head;//"<font letterspacing ='" + 1 + "'>" + this._head + "</font>";
			
		let ht:string = "";
        if(this._htmlText != "") ht = this.pingContentII(this._htmlText);
		if(this._text) ht = this.pingContent(this._text);
			
        ht = Manager.model.getChat().checkPropInfo(ht, this.getTextByHtmlText(ht), this._props);
			
		ht = ht.replace(new RegExp("#[0-9a-f]{6}","i"), this.getChannelColor(this._type));
			
		this._content += ht;
	}

    private getTextByHtmlText(html:string):string
	{
		let tf = new eui.Label();
		tf.textFlow = (new egret.HtmlTextParser).parser(html);
		return tf.text;
	}
		
	/**
	 * @param noticeType 世界公告的类型(SystemMsgCMD调用)
	 */		
	private parseHead():void
	{
		switch(this._type)
		{
			case ChatChannelType.CORPS:
				this._head = this.addColor(this.getChannelColor(this._type),"盟会",3);
				this.addVipFace("" + this._vipLvl);
				this._head += this.getHumanStr(this._fromName,this._fromID, this._fromName) + this.addColor(this.getChannelColor(this._type),"：",1);
				break;
			case ChatChannelType.WORLD:
				this._head = this.addColor(this.getChannelColor(this._type),"世界",3);
				this.addVipFace("" + this._vipLvl);
				this._head += this.getHumanStr(this._fromName,this._fromID, this._fromName) + this.addColor(this.getChannelColor(this._type),"：",1);
				break;
			case ChatChannelType.SYSTEM:
				this._head = this.getSystemHeadStr() + " ";
				break;
		}
	}
		
	private addVipFace(vipLevel:string):void
	{
		let lvl = Number(vipLevel);
		if(lvl > 0) this._head += "   ";
	}
		
	private pingContent(text:string):string
	{
		return "<p><FONT SIZE='12' COLOR='" + Color.WHITE_STR + "' LETTERSPACING='" + 1 + "' LEADING='" + 7 + "'>" + this.removeHtml(text) + "</FONT></p>";
	}
		
	private pingContentII(text:string):string
	{
		return "<FONT SIZE='12' COLOR='" + Color.WHITE_STR + "'>" + text + "</FONT>";
	}
		
	private addColor(color:string,text:string,addFlag:number):string
	{
		if(text == "") return "";
		switch(addFlag)
		{
			case 1:
				return this.getHtmlStr(text,color);
			case 2:
				return this.getHtmlStr(" " + text + " ",color);
			case 3:
				return this.getHtmlStr("[" + text + "]",color);
		}
		return "";
	}
		
	private getHumanStr(name:string,id:number,text:string):string
	{
		let color:string = Color.GREEN_STR;;//this.getChannelColor(this._type);
		return "<u><font color='" + color + "'>" + text + "</font></u>";//<a href='event:" + "human|"+name+"|"+id + "'>" + text + "</a></font></u>";
	}
		
	private getHtmlStr(msg:string,color:string):string
	{
		if(msg == "") return "";
		return "<font color ='" + color +"'>" + msg + "</font>";
	}
		
	private getSystemHeadStr():string
	{
		let head:string;
		let color:string;
		switch(this._systemType)
		{
			default:
                head = "[系统]";
				color = Color.RED_STR;
				break;
		}
		return this.addColor(color,head,1);
	}
		
	private getChannelColor(type:number):string
	{
		switch(type)
		{
			case ChatChannelType.CORPS:
				return Color.BLUE_STR;
			case ChatChannelType.SYSTEM:
				return Color.RED_STR;
			case ChatChannelType.WORLD:
				return Color.ORANGE_STR;
		}
		return Color.DEF_STR;
	}

    private removeWhiteSpace(str:string):string
	{
		return str = str.replace(/[ | ]/g,"");
	}
    private removeHtml(html:string):string
	{
		return html.replace(/<[^>]*>/g,"");
	}
}