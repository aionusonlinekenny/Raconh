/**
 * pzx
 * create 2018-3-15
 * 冲榜竞技CVO
*/
class SrvRankCVO {
	private static _data:Object = {};
    private static _openViewTaps:Object ={};

	public id:number;
	/**活动排序 */
	public sort:number;
	/**活动类型
墨宠榜：1
等级榜：2
绝学榜：3
命格榜：4
铸魂榜：5
宝石榜：6
战力榜：7 */
	public type:number;
/**排名/阶段
第一名：1
第2-3名：2
第4-10名：3
4(含4)之后为阶段奖励 */
	public rank:number;

/**参数例表*/
    public conList:ConditionVO[];
	/**奖励显示*/
	public losse:string;
/**底图
等级达到(srvRank_dengjidadao_png)，
战力达到（srvRank_zhanli_png）,
阶段达到（srvRank_jieduandadao_png） */
    public di_img:string;


    private _isReward:boolean

    public setReward():void
    {
        this._isReward=true;
    }
    /** 是否已领奖 */
    public isReward():boolean
    {
        return this._isReward;
    }
    /** 已领奖的排序沉底 */
    public get isSortNum():number
    {
        if(this._isReward)
        {
            return 1;
        }
        else
        {
            return 0;
        }
    }

    /** 检测是否可领奖 */
    public checkReward():boolean
    {
        if(this._isReward ||this.conList.length== 0) return false;
        for(let cvo of this.conList)
        {
            if(!cvo.isSatisfy())
            {
                return false;
            }
        }
        return true;
    }

    public condStr():string
    {
        let str:string="";
        if(this.type == SrvRankType.LEVE_TYPE)
        {
            if(this.conList[1])
            {
                str = this.conList[1].value+"z";
            }
            str += this.conList[0].value+"j";
        }
        else
        {
            str = "" + this.conList[0].value;
        }
        return str;
    }



	public static parse(bytes:egret.ByteArray):void
    {
        let pageCount:number = bytes.readByte();
        let tableCount:number = bytes.readShort();
        var info:SrvRankCVO;
        
        for(let i:number = 0; i < tableCount; i++)
        {
            info = new SrvRankCVO();
            info.id =bytes.readShort();
            info.sort = bytes.readShort();
            info.type = bytes.readByte();
			info.rank = bytes.readByte();
			info.conList =  ConditionVO.getVOList(bytes.readUTF());
			info.losse = bytes.readUTF();
            info.di_img = bytes.readUTF();
            let view_tap:number = bytes.readByte();
            if(!this._openViewTaps[info.type])
            {
                this._openViewTaps[info.type] = view_tap;
            }
            this._data[info.id] = info;
        }

    }
    /**信息 */
    public static cvo(id:number):SrvRankCVO
    {
        return this._data[id];
    }

    public static cvos(type:number):SrvRankCVO[]
    {
        let arr:SrvRankCVO[] = [];
        for(let key in this._data)
        {
            let cvo:SrvRankCVO = this._data[key];
            if(cvo.type == type)
            {
                arr.push(cvo);
            }
        }
        return arr;
    }

    public static setstatus(type:number,rank:number,statu:number)
    {
        for(let key in this._data)
        {
            let cvo:SrvRankCVO = this._data[key];
            if(cvo.type == type && cvo.rank == rank)
            {
                if(statu == 1)
                {
                    cvo.setReward();
                }
            }
        }
    }
/** 排行榜界面标签 */
    public static rankPanelTap(type:number):number
    {
        let i:number = this._openViewTaps[type];
        return i;
    }
}
	