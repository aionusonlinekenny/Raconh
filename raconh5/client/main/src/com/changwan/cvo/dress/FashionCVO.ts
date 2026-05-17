/**
 * 服饰模板表
 * luzh
 * create 2017-12-18
*/
class FashionCVO
{
    private static _cvos:Object;
    private static _all:Array<FashionCVO>;
    public static TYPE_ARR:Array<number> = [];
	
    /**唯一id */
	public id:number; 
    /**资源id */
	public resID:number; 
    /**职业（1、2） */
	public career:number; 
    /**时装名 */
	public name:string; 
    /**名字图片id */
	public nameID:number; 
    /**类型 */
	public type:number; 
    /**描述 */
    public desc:string;
    /**激活消耗 */
	// public loss:GainLossVO; 
    /**显示顺序 */
    public sort:number;
		

    /*解析表*/
    public static parseCVOs(bytes:egret.ByteArray):void
    {
        let pageCount:number = bytes.readByte();
        FashionCVO.parse(bytes);
        FashionStarCVO.parse(bytes);
    }
    
    /*解析表*/
    public static parse(bytes:egret.ByteArray):void
    {
        FashionCVO._cvos = [];
        let cvo:FashionCVO;
        let rowCount:number = bytes.readShort();
        for (let i = 0; i < rowCount; i++)
        {
            cvo = new FashionCVO();
            cvo.id = bytes.readShort();
            cvo.resID = bytes.readInt();
            cvo.career = bytes.readByte();
            cvo.name = bytes.readUTF();
            cvo.nameID = bytes.readShort();
            cvo.type = bytes.readByte();
            cvo.desc = bytes.readUTF();
            // cvo.loss = new GainLossVO(bytes.readUTF());
            let sort = bytes.readShort();

            FashionCVO._cvos[cvo.id] = cvo;
            if(FashionCVO.TYPE_ARR.indexOf(cvo.type) == -1) FashionCVO.TYPE_ARR.push(cvo.type);
        }
        FashionCVO.TYPE_ARR.sort((a:number, b:number) => { return (a > b ? 1 : -1);});
    }

	public static getCVO(id:number):FashionCVO
	{
		if(this._cvos[id]) return this._cvos[id];
		return null;
	}

    public static getCvosByTypeAndCareer(type:number, career:number):Array<FashionCVO>
	{
		let result:Array<FashionCVO> = [];
        let cvo:FashionCVO;
		for(let key in this._cvos)
		{
            cvo = this._cvos[key];
			if(cvo.type == type && cvo.career == career) result.push(cvo);
		}
		return result;
	}
    
    public static getCvosByCareer(career:number):Array<FashionCVO>
	{
		let result:Array<FashionCVO> = [];
        let cvo:FashionCVO;
		for(let key in this._cvos)
		{
            cvo = this._cvos[key];
			if(cvo.career == career) result.push(cvo);
		}
		return result;
	}


    //-----------------------------------------------------------------------
    //星数
    public star:number = 0;//

    //有效时间（-1永久，0未激活，大于0到期时间）
    public endTime:number = 0;
    //是否永久激活
    public get isForever():boolean
    {
        return this.endTime == -1;
    }
    //剩余时间
    public get leftTime():number
    {
        return Math.floor(this.endTime - Manager.model.getLogin().serverTimeInfo.serverTime/1000);
    }
    //是否已激活
    public get isActived():boolean
    {
        return this.endTime == -1 || this.endTime != 0;
    }
    //是否穿戴中
    public get isWearing():boolean
    {
        return Manager.model.getDress().fashionModel.curID == this.id;
    }
    
    /**设置时间 星数 */
    public setTimeAndStar(endTime:number, star:number):void
    {
        if(this.endTime == endTime && this.star == star) return;
        this.endTime = endTime;
        this.star = star;
        Manager.model.getDress().fashionModel.dispatchEvent(new FashionEvent(FashionEvent.UPDATE, this));
    }


    public get canActiveOrUp():boolean
    {
        let cvo:FashionStarCVO = this.star < FashionStarCVO.MAX_STAR ? FashionStarCVO.getCVO(this.id, this.star + 1) : null;
        return cvo && cvo.loss.isEnough();
    }
}