class AnimationCVO
{
    private static _cvos:Object;

	/** 唯一ID */
	public id:string;
	/** 关键帧数组 */
	public frames:number[];
	/** 总帧数 */
	public totalFrame:number;
	/** 循环次数,0表示无数次 */		
	public wrapMode:number;
	/** 特效X偏移量 */		
	public offsetX:number;
	/** 特效Y偏移量 */	
	public offsetY:number;
	/** 等比缩放 */		
	public scale:number;
	/** 是否在人物脚底播放 (如果在脚底则填加到AliveInfo.footContainer层) */		
	public isInFeet:boolean;

// 是否长驻内存
// 0不长驻
// 1男长驻
// 2女长驻
// 3男女长驻
	public stayMemory:number;
	
	public constructor()
    {}

    public static parse(bytes:egret.ByteArray):void
    {
        AnimationCVO._cvos = {};
        var tableCount:number = bytes.readByte();
        for (var i = 0; i < tableCount; i++)
        {
            var count:number = bytes.readShort();
            for (var j = 0; j < count; j++)
            {
                var item:AnimationCVO = new AnimationCVO();
                item.id = bytes.readUTF();
                item.frames = ArrayUtil.parseStringToArray(bytes.readUTF());
                item.totalFrame = bytes.readShort();
                item.wrapMode = bytes.readByte();
                item.offsetX = bytes.readShort();
                item.offsetY = bytes.readShort();
				item.scale = bytes.readShort() / 100;
                item.isInFeet = bytes.readBoolean();
				item.stayMemory = bytes.readByte();
                AnimationCVO._cvos[item.id] = item;
            }
        }
    }
	
	public static getCVO(id:string):AnimationCVO
	{
		if(AnimationCVO._cvos[id] == null)
		{
			FloatTips.addTips("重要报错：特效表没有 "+id+" 的对应数据！", Color.RED);
			var one:AnimationCVO = new AnimationCVO();
			one.id = id;
			one.frames = [];
			one.totalFrame = 0;
			one.wrapMode = 1;
			one.offsetX = 0;
			one.offsetY = 0;
			one.scale = 1;
			one.isInFeet = false;
			one.stayMemory = 0;
			return one;
		}
		return AnimationCVO._cvos[id] as AnimationCVO;
	}
	
	// /**
	//  * 创建自定义特效数据
	//  */		
	// public static createCVO(id:string,frames:number[],totalFrame:number,wrapMode:number,offsetX:number = 0,offsetY:number = 0):void
	// {
	// 	let cvo:AnimationCVO = new AnimationCVO();
	// 	cvo.id = id;
	// 	cvo.frames = frames;
	// 	cvo.totalFrame = totalFrame;
	// 	cvo.wrapMode = wrapMode;
	// 	cvo.offsetX = offsetX;
	// 	cvo.offsetY = offsetY;
	// 	AnimationCVO._cvos[cvo.id] = cvo;
	// }
}