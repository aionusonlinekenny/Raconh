/**
 * pzx 
 * 2017.12.25
 * 命格
 */
class LifeGridCVO
{
    private static _cvos:any;
	private static _holeCvos:LifeGridHoleCvoInfo[];
	private static _huntCvos:any;

/** 命格id 跟 item_data里一样 */
	public base_id:number;
/** 等级 */
	public lev:number;
/** 升级消耗 */
	public lev_loss:string;
/** 分解获得 */
	public sep_gain:string;
/**  属性 */
	public attr:string
    /**属性 */
    private _attrVo:AttrVO
    public get attrVo():AttrVO
    {
        if(this._attrVo == null) this._attrVo = Manager.pool.create(AttrVO, this.attr);
        return this._attrVo;
    }

	private _fight:number;
/**品质 */
	public color:number;
/** 物品唯一id */
	public itemid:number;

	public attrVos():AttrVoInfo[]
	{
		return this.attrVo.attrInfos;
	}
	/**战斗力 */
	public get fightnum():number
	{
		if(!this._fight)
		{
			this._fight = this.attrVo.getFighting();
		}
		return this._fight;
	}

	
	public constructor()
    {}

    public static parse(bytes:egret.ByteArray):void
    {
        this._cvos = {};
		let pageCount:number = bytes.readByte();
        let tableCount:number = bytes.readShort();
        for (var i:number = 0; i < tableCount; i++)
        {
			var item:LifeGridCVO = new LifeGridCVO();
			item.base_id = bytes.readInt();
			item.lev = bytes.readShort();
			item.lev_loss = bytes.readUTF();
			item.sep_gain = bytes.readUTF();
			item.attr = bytes.readUTF();
			let arr:any;
			if(this._cvos[item.base_id])
			{
				arr = this._cvos[item.base_id];
			}
			else
			{
				arr = {};
				this._cvos[item.base_id] = arr;
			}
			arr[item.lev] = item;
        }

		this._holeCvos = [];
		tableCount = bytes.readShort();
        var hole:LifeGridHoleCvoInfo;
        for(let j:number = 0;j<tableCount;j++)
        {
            hole = new LifeGridHoleCvoInfo;
            hole.id = bytes.readByte();
            hole.cond = bytes.readUTF();
            this._holeCvos[hole.id] = hole;
        }

		tableCount = bytes.readShort();
        for(let j:number = 0;j<tableCount;j++)
        {
            bytes.readByte();
            bytes.readInt();
        }

		this._huntCvos ={};
		tableCount = bytes.readShort();
        var hunt:LifeGridHuntCvoInfo;
        for(let j:number = 0;j<tableCount;j++)
        {
            hunt = new LifeGridHuntCvoInfo;
            hunt.id = bytes.readByte();
			hunt.type= bytes.readByte();
            hunt.loss = bytes.readUTF();
            this._huntCvos[hunt.id] = hunt;
        }

    }

	public static get cvos():any
	{
		return this._cvos;
	}
	/**解锁条件 */
	public static getholeCvo(id:number):LifeGridHoleCvoInfo
	{
		return this._holeCvos[id];
	}
/**解锁条件例表 */
	public static getHoleCvos():LifeGridHoleCvoInfo[]
	{
		return this._holeCvos;
	}

	public static getHuntCvo(id:number):LifeGridHuntCvoInfo
	{
		return this._huntCvos[id];
	}

	public static getInfo(baseid:number,lev:number):LifeGridCVO
	{
		let arr:any = this._cvos[baseid];
		let cvo:LifeGridCVO=null;
		if(arr) cvo = arr[lev];
		return cvo;
	}
	public static getDataInfo(value:ItemsModelInfo):LifeGridCVO
	{
		let arr:any = this._cvos[value.base_id];
		let lv:number = value.infoList[0].value;
		let cvo:LifeGridCVO = arr[lv];
		cvo.itemid = value.id;
		cvo.color = value.cvo.quality;
		return cvo;
	}
	public static getMaxLeve(baseid:number):number
	{
		let lv:number = 0;
		let arr:any = this._cvos[baseid];
		for(let key in arr)
		{
			let cvo:LifeGridCVO = arr[key];
			if(cvo.lev>lv)
			{
				lv = cvo.lev;
			}
		}
		return lv;
	}

}