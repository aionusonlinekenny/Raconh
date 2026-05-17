/**
 * pzx 
 * 17.12.1
 * 披风cvo
 */
class CloakCVO {
	private static _data:Object = {};

	public id:number;
	public res_id:number;
	public name:string;
	//品质
	public quality:number;
	/**激活消耗*/
	public losse:GainLossVO;
/**激活条件*/
	public act_cond:ConditionVO[];
//顺序
	public sort:number;
/**星星属性*/
	public starArr:Array<CloakStarCvoInfo>
   //已激活的星星数 0代表未激活。
	private _num:number = 0;

	public res_posetion:string;

	public setStarNum(value:number)
	{
		this._num = value;
	}
	/** 已激活的星星数 0代表未激活。服务端的数据 */
	public get num():number
	{
		return this._num;
	}

	public getattrVO():AttrVO
	{
		let i:number = (this._num == 0) ? 1 : this._num;//未激活取第1星的属性
		let starCvo:CloakStarCvoInfo = this.starArr[i];
		return starCvo.attrVo;
	}

	public static parse(bytes:egret.ByteArray):void
    {
        let pageCount:number = bytes.readByte();
        let tableCount:number = bytes.readShort();
        var info:CloakCVO;
        
        for(let i:number = 0; i < tableCount; i++)
        {
            info = new CloakCVO();
            info.id =bytes.readInt();
            info.res_id = bytes.readInt();
			info.res_posetion = bytes.readUTF();
            info.name = bytes.readUTF();
            info.quality = bytes.readByte();
			info.losse = new GainLossVO(bytes.readUTF());
			info.act_cond = ConditionVO.getVOList(bytes.readUTF());
            info.sort = bytes.readShort();
			info.starArr = [];
            this._data[info.id] = info;
        }
        tableCount = bytes.readShort();
        var item:CloakStarCvoInfo;
        for(let j:number = 0;j<tableCount;j++)
        {
            item = new CloakStarCvoInfo;
            let id:number = bytes.readInt();
            item.star = bytes.readByte();
            item.loss = bytes.readUTF();
            item.attr = bytes.readUTF();
            let vo:CloakCVO = this._data[id];
			vo.starArr[item.star] = item;
        }

    }
    /**信息 */
    public static getInfo(id:number):CloakCVO
    {
        return this._data[id];
    }
	/**
	 * 获得列表
	 */
	public static getList():CloakCVO[]
	{
		let arr:Array<CloakCVO> = [];
		for(let key in this._data)
		{
			let info:CloakCVO = this._data[key];
			let conList:ConditionVO[] = info.act_cond;
			for(let con of conList)
			{
				if(con.type == ConditionVO.CAREER && con.isSatisfy())
				{
					arr.push(info);
					break;
				}
			}
			
		}
		return arr;
	}
}

class CloakStarCvoInfo
{
	/**星数 */
	public star:number;
	/**升星消耗 */
	public loss:string;
	/** 属性 */
	public attr:string;
	/** 属性 */
    private _attrVo:AttrVO

    public get attrVo():AttrVO
    {
        if(this._attrVo == null) this._attrVo = Manager.pool.create(AttrVO, this.attr);
        return this._attrVo;
    }
}