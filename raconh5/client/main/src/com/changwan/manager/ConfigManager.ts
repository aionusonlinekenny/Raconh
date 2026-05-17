class ConfigManager
{
    /**
	 * 资源地址
	 */
	public resourceUrl:string = "resource/";
    /**
	 * api地址
	 */
	public apiUrl:string = "";
    /**
	 * 平台类型
	 */
	public platform:string = "";
    /**
	 * 游戏显示区域宽高
	 */
	public gameWidth:number;
	public gameHeight:number;
	/**
	 * 地图切块大小
	 */
	public tiledMapSize:number = 256;
	/**
	 * 地图小格子尺寸
	 */
	public gridWH:number = 40;
	/**
	 * 九宫格宽
	 */
	public scale9W:number = 240;
	/**
	 * 九宫格高
	 */
	public scale9H:number = 400;

	/**
	 * 客户端总版本号，一改全改
	 */
	public clientVersion:number = 5;

	/**
	 * 是否自动生成exml文件列表
	 */
	public autoGenerateExmlsList:boolean = true;

	/**
	 * 默认字体
	 */
	public defaultFont:string = "Microsoft YaHei";

	public constructor()
	{
		egret.TextField.default_fontFamily = this.defaultFont;
		egret.TextField.default_size = 24;
	}

	/**
	 * 对相对路径进行root+计算,也就是将相对路径转换成绝对路径. 
	 */		
	public rootToURL(url:string):string
	{
		if (url.indexOf(this.resourceUrl) > -1)return url;
		return this.resourceUrl + url;
	}

	public parse(content:string):void
	{
		let list:Array<string> = content.split("\r\n");
		let len:number = list.length;
		let arr:Array<string>;
		for(let i:number = 0 ; i < len; i ++)
		{
			if(list[i] != null && list[i].indexOf("=") != -1)
			{
				arr = list[i].split("=");
				this[arr[0]] = this.parseValue(arr[1]);
			}
		}
	}

	private parseValue(value:string):any
	{
		if(value == "true") return true;
		else if(value == "false") return false;
		let num:number = parseInt(value);
		if(!isNaN(num)) return num;
		return value;
	}
}