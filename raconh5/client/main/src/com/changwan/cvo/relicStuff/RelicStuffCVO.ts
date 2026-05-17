/**
 * 神器
 * pzx
 * 18.3.9
 */
class RelicStuffCVO {
	private static _cvos:RelicStuffCVO[];
	/** id*/
	public id:number;
	/** 名*/
	public name:string;
	/** 描述 */
	public desc:string
/**条件 */
	public cond:string;
/** 效果 */
	public effect:string;
/**展示资源位置 */
	public ani_id:string
/**资源坐标(x|y) */
	public point:string;
/**主界面小模型资源 */
	public mainAni_id:string;

	public list:RelicStuffDebrisCVO[];

	//是否激活
	private _isAct:boolean;

	public setisAct():void
	{
		this._isAct = true;
	}

    /** 是否激活 */
	public isActivity():boolean
	{
		return this._isAct;
	}
	/** 获取碎片列表 */
	public getDebrisList():RelicStuffDebrisCVO[]
	{
		if(!this.list)
		{
			let arr:ConditionVO[] = ConditionVO.getVOList(this.cond);
			let list:RelicStuffDebrisCVO[]=[];
			for(let con of arr)
			{
				let desCvo:RelicStuffDebrisCVO = RelicStuffDebrisCVO.cvo(con.value);
				list.push(desCvo);
			}
			list = ArrayUtil.sortOn(list,["des_id"]);
			this.list = list;
		}
		return this.list;
	}
	/** 检测是否可以激活 */
	public checkIsActivity():boolean
	{
		if(this._isAct) return false;
		let list:RelicStuffDebrisCVO[] = this.getDebrisList();
		for(let cvo of list)
		{
			if(!cvo.isActivity())
			{
				return false;
			}
		}
		return true;
	}
	/** 获得战斗力 */
	public getFightNum():number
	{
		let fig:number = 0;
		let list:RelicStuffDebrisCVO[] = this.getDebrisList();
		for(let cvo of list)
		{
			if(cvo.isActivity())
			{
				let vo:AttrVO = cvo.attrVO;
				fig += vo.getFighting();
			}
		}
		return fig;
	}

	public static parse(bytes:egret.ByteArray):void
    {
		this._cvos = [];
		let pageCount:number = bytes.readByte();
        let tableCount:number = bytes.readShort();
        for (var i = 0; i < tableCount; i++)
        {
			var item:RelicStuffCVO = new RelicStuffCVO();
			item.id = bytes.readByte();
			item.name = bytes.readUTF();
			item.desc = bytes.readUTF();
			item.cond = bytes.readUTF();
			item.effect = bytes.readUTF();
			item.ani_id = bytes.readUTF();
			item.point = bytes.readUTF();
			item.mainAni_id = bytes.readUTF();
			this._cvos.push(item);
        }
		RelicStuffDebrisCVO.parse(bytes);
    }

	public static cvos():RelicStuffCVO[]
	{
		return this._cvos;
	}
	/** 设置激活神器 */
	public static setActivity(id:number):void
	{
		for(let i:number = this._cvos.length -1 ;i>-1;i--)
		{
			let cvo:RelicStuffCVO = this._cvos[i];
			if(cvo.id == id)
			{
				cvo.setisAct();
				break;
			}
		}
	}
	public static cvo(id:number):RelicStuffCVO
	{
		for(let cvo of this._cvos)
		{
			if(cvo.id == id)
			{
				return cvo;
			}
		}
		return null;
	}

}