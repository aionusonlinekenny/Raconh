/**
 * 称号模板表
 * liangyan
 * create 2017-11-28
*/
class TitleCVO extends DressBaseCVO
{
    private static _cvos:Object;
    private static _all:Array<TitleCVO>;
    public static TITLE_TYPE_ARR:Array<number> = [1, 2, 3];
	
    /**称号类型 */
	public type:number; 
    /**平台名字 */
    public platform:string;
    /**激活消耗 */
    public loss:GainLossVO;
    /**是否唯一 1:是 0:否*/
    public isUnique:boolean;
    /**弹框id */
    public popupID:number;
    /**资源高度 */
    public resH:number;
    /**获取途径 */
    public getWay:string;
    /**显示顺序 */
    public sortIndex:number;
    /**是否有激活展示 1:是 0:否*/
    public actShow:boolean;
    /**称号类型str */
    public typeStr:string;
    /**根据盟会id显示列表 */
    public guildID:number;
		
	public parseOne(data:egret.ByteArray)
	{
		this._templateID = data.readShort();
        this.resID = data.readShort();
		this.name = data.readUTF();
        this.platform = data.readUTF();
		this.type = data.readByte();
		this.description = data.readUTF();
        this.loss = new GainLossVO(data.readUTF());
		this._baseAttrCfg = data.readUTF();
		this.time = data.readInt();
        this.isUnique = data.readByte() == 1;
        this.popupID = data.readShort();
        this.resH = data.readShort();
        this.getWay = data.readUTF();
        this.sortIndex = data.readByte();
        this.actShow = data.readByte() == 1;
        this.guildID = data.readByte();
		
		this.dressType = DressType.TITLE;
        this.parseType();
	}

    private parseType():void
    {
        let str = "";
        switch(this.type)
        {
            case 1:
                str = "普通称号";
            break;
            case 2:
                str = "稀世称号";
            break;
            case 3:
                str = "至尊称号";
            break;
        }
        this.typeStr = str;
    }
		
	public static parse(datas:egret.ByteArray):void
	{
		TitleCVO._cvos = {};
        var pageCount:number = datas.readByte();
        var tableCount:number = datas.readShort();
        let cvo:TitleCVO;
        for (let i = 0; i < tableCount; i++)
        {
            cvo = new TitleCVO();
            cvo.parseOne(datas);
            TitleCVO._cvos[cvo.templateID] = cvo;
        }
	}

    public static getAll():Array<TitleCVO>
    {
        if(!TitleCVO._all)
        {
            TitleCVO._all = [];
            for(let key in this._cvos)
            {
                TitleCVO._all.push(this._cvos[key]);
            }
            if(TitleCVO._all.length > 1) TitleCVO._all.sort((a:TitleCVO, b:TitleCVO) => { return (a.sortIndex > b.sortIndex ? 1 : -1);});
        }
		return TitleCVO._all;
    }
		
	public static getCVO(id:number):TitleCVO
	{
		if(this._cvos[id]) return this._cvos[id];
		return null;
	}

    public static getCvosByType(type:number):Array<TitleCVO>
	{
		let result:Array<TitleCVO> = [];
        let cvo:TitleCVO;
        let selfGuild = Manager.model.self.attrInfo.guildID % 10;
		for(let key in this._cvos)
		{
            cvo = this._cvos[key];
			if(cvo.type == type)
            {
                if(cvo.guildID > 0)
                {
                    if(cvo.guildID == selfGuild) result.push(cvo);
                }
                else result.push(cvo);
            }
		}
        if(result.length > 1) result.sort((a:TitleCVO, b:TitleCVO) => { return (a.sortIndex > b.sortIndex ? 1 : -1);});
		return result;
	}

    public get isUsing():boolean
    {
        return Manager.model.self.attrInfo.titleId == this.templateID;
    }
}