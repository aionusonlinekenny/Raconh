class SoldierCVO
{
    private static _cvos:Object;

    public id:number;
    public resId:number;
    public name:string;
    public quality:number;
    public actCond:string;
    public actConsume:string;
    public sort:number;
    public starInfoList:{};

    public curSoldierId:number;
    public soldierInfoList:{};
    public soldierStarNum:number = 0;

    public static parse(bytes:egret.ByteArray):void
    {
        this._cvos = {};
        let tableCount:number = bytes.readByte();
        for (let i:number=0; i<tableCount; i++)
        {
            if(i == 0)
            {
                let count:number = bytes.readShort();
                for (let j:number=0; j<count; j++)
                {
                    let item:SoldierCVO = Manager.pool.create(SoldierCVO);
                    item.id = bytes.readInt();
                    item.resId = bytes.readInt();
                    item.name = bytes.readUTF();
                    item.actCond = bytes.readUTF();
                    item.quality = bytes.readByte();
                    item.actConsume = bytes.readUTF();
                    item.sort = bytes.readShort();
                    item.starInfoList = {};
                    this._cvos[item.id] = item;
                }
            }
            if(i == 1)
            {
                let count:number = bytes.readShort();
                for(let j:number=0; j<count; j++)
                {
                    let infoId:number = bytes.readInt();
                    let vo:SoldierCVO = this._cvos[infoId];
                    let item:SoldierStarCvoInfo = Manager.pool.create(SoldierStarCvoInfo);
                    item.star = bytes.readByte();
                    item.loss = bytes.readUTF();
                    item.attr = bytes.readUTF();
                    vo.starInfoList[item.star] = item;
                }
            }
        }
    }

    public static getInfo(id:number):SoldierCVO
    {
        if(!SoldierCVO._cvos) return null;
        return SoldierCVO._cvos[id];
    }

    public static getList():Array<SoldierCVO>
	{
		let arr:Array<SoldierCVO> = [];
		for(let key in this._cvos)
		{
			let info:SoldierCVO = this._cvos[key];

            // let pass:boolean = true;
            // if(info.actCond)
            // {
            //     let conList:ConditionVO[] = ConditionVO.getVOList(info.actCond);
            //     for(let con of conList)
            //     {
            //         if(!con.isSatisfy())
            //         {
            //             pass = false;
            //             break;
            //         }
            //     }
            // }
            // if(!pass) continue;

            if(Manager.model.self.attrInfo.career == 1)
            {
                if(String(info.id).substr(0,1) == "9")
					arr.push(info);
            }
            else
            {
                if(String(info.id).substr(0,1) == "8")
					arr.push(info);
            }
		}
		return arr;
	}

    public getAttrVO():AttrVO
	{
		let i:number = (this.soldierStarNum == 0) ? 1: this.soldierStarNum;//未激活取第1星的属性
		let starCvo:SoldierStarCvoInfo = this.starInfoList[i];
		return starCvo.attrVo;
	}
}

class SoldierStarCvoInfo
{
	/**星数 */
	public star:number;
	/**升星消耗 */
	public loss:string;
	/** 属性 */
	public attr:string;
    private _attrVo:AttrVO
    public get attrVo():AttrVO
    {
        if(this._attrVo == null) this._attrVo = Manager.pool.create(AttrVO, this.attr);
        return this._attrVo;
    }
    
}