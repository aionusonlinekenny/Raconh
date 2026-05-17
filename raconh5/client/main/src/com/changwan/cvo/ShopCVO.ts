/**
 * pzx 
 * 2017.11.28
 * 
 */
class ShopCVO
{
    private static _cvos:any;
/**商城类型
1、元宝；
2、神秘商城；
3、荣誉商城；
4、VIP商城 */
	public shop_type:number;
/**排序值 */
	public sort:number;
/**商品ID */
	public base_id:number;
/** 商品数量 */
	public num:number;
/**是否绑定true :绑定 */
	public bind:boolean;
/**
 * 货币类型
元宝：gold；
铜钱：coin；
荣誉：honor；
帮贡： */
	public label:string;
/** 显示原价 */
	public oldPrice:number;
/**  消费价格 */
	public price:number;
/** 每天可购买数量 
0表示无限制*/
	public limit:number;
/**永久可购买数量 
0表示无限制 */
	public limit_p:number;
/**商品tips
1-9:对应折扣
10:热卖
11：珍品
0:无标识 */
	public goods_tips:number;
/** 条件 */
	public show_cond:string;
	/** ID */
	public id:number;
/** 是否有特效
true :有特效
false：无特效 */
	public effect:boolean; 

// 已购买数量
	private _count:number;
	
	
	public constructor()
    {}

    public static parse(bytes:egret.ByteArray):void
    {
        ShopCVO._cvos = {};
		let pageCount:number = bytes.readByte();
        let tableCount:number = bytes.readShort();
        for (var i = 0; i < tableCount; i++)
        {
			var item:ShopCVO = new ShopCVO();
			item.shop_type = bytes.readByte();
			item.sort = bytes.readShort();
			item.base_id = (bytes.readUnsignedInt() << 32) | bytes.readUnsignedInt();
			item.num = bytes.readInt();
			item.bind = bytes.readByte() == 1 ? true:false;
			item.label = bytes.readUTF();
			item.oldPrice = (bytes.readUnsignedInt() << 32) | bytes.readUnsignedInt();
			item.price =(bytes.readUnsignedInt() << 32) | bytes.readUnsignedInt();
			item.limit = bytes.readInt();
			item.limit_p = bytes.readInt();
			item.goods_tips = bytes.readByte();
			item.show_cond = bytes.readUTF();
			item.id = bytes.readInt();
			item.effect = bytes.readByte() == 1 ? true:false;
			ShopCVO._cvos[item.id] = item;
            
        }
    }
	public static getShopTypeLists(type:number):Array<ShopCVO>
	{
		let arr:Array<ShopCVO> = [];
		for(let key in this._cvos)
		{
			let cvo:ShopCVO = this._cvos[key];
			if(cvo.shop_type == type)
			{
				arr.push(cvo);
			}
		}
		
		arr = ArrayUtil.sortOn(arr,["sort"]);
		return arr;
	}

	public static getCvo(id:number):ShopCVO
	{
		return this._cvos[id];
	}

	public setCount(value:number)
	{
		this._count = value;
	}
	/** 已购买数量  此变量不读表，由服务端数据传入 */
	public get count():number
	{
		return this._count;
	}
/** 通过baseId 获得shopCvo */
	public static getbaseIdCvo(baseId:number):ShopCVO
	{
		for(let key in this._cvos)
		{
			let cvo:ShopCVO = this._cvos[key];
			if(cvo.base_id == baseId)
			{
				return cvo;
			}
		}
		return null;
	}
//=======================命格独用的=============
	public get lifeIsyiyou():number
	{
		let itemCvo:ItemsCVO = ItemsCVO.getCvo(this.base_id);
		if(itemCvo.condition=="") return 0;
		let itemsModel:ItemsModel = Manager.model.getItems();
		let arr:ItemsModelInfo[]=[];
		let infoArr:ItemsModelInfo[] = itemsModel.lifeGridList;
		for(let info of infoArr)
		{
			if(info) arr.push(info);
		}
		infoArr = itemsModel.lifeGridBagList;
		for(let info of infoArr)
		{
			arr.push(info);
		}
		let isyiyou:boolean = false;
		for(let info of arr)
		{
			if(info.base_id == this.base_id)
			{
				//已有属性
				return 1;
			}
		}
		return 0;
	}
	public  get lifeislock():number
	{
		//是否解锁
		let condit:ConditionVO = new ConditionVO(this.show_cond);
		if(condit.isSatisfy())
		{
			return 0;
		}
		return 1;
	}
	public get ample():number
	{
		let frag:number = Manager.model.self.attrInfo.destinyfrig;
		if(frag<this.price)
		{
			return 1;
		}
		else 
		{
			return 0;
		}
	}
//=======================命格独用的end=============

}