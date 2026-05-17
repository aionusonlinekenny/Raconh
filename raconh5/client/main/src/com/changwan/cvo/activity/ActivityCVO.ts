/**
 * 活跃度表
 * luzhihong
 * create 2017-11-22
 */
 class ActivityCVO
{
    private static _cvos:Array<ActivityCVO>;

    public static ID_YANWU = 12;

    /*id*/
    public id:number;
    /*排序*/
    public rank:number;
    /*类型*/
    public type:number;
    /*时间描述*/
    public timeDesc:string;
    /*活动图标表id*/
    public iconID:number;
    /*描述*/
    public description:string;
    /*总进度*/
    public need:number;
    /*活跃度奖励*/
    public value:number;
    /*物品奖励*/
    public gain:GainLossVO;
    /*链接(第1个是系统开放id)*/
    public linkArr:Array<string>;


    public get isOpen():boolean
    {
        return OpenCVO.isOpen(this.openID);
    }
    public get openID():number
    {
        return this.linkArr.length > 0 ? parseInt(this.linkArr[0]) : 0;
    }

    /*解析表*/
    public static parseCVOs(bytes:egret.ByteArray):void
    {
        let tabCount:number = bytes.readByte();
        ActivityCVO.parse(bytes);
        ActivityScheduleCVO.parse(bytes);
    }
    /*解析表*/
    public static parse(bytes:egret.ByteArray):void
    {
        ActivityCVO._cvos = [];
        let cvo:ActivityCVO;
        let rowCount:number = bytes.readShort();
        for (let j = 0; j < rowCount; j++)
        {
            cvo = new ActivityCVO();
            cvo.id = bytes.readShort();
            cvo.rank = bytes.readShort();
            cvo.type = bytes.readByte();
            cvo.timeDesc = bytes.readUTF();
            cvo.iconID = bytes.readShort();
            cvo.description = bytes.readUTF();
            cvo.need = bytes.readInt();
            cvo.value = bytes.readInt();
            cvo.gain = new GainLossVO(bytes.readUTF());
            cvo.linkArr = bytes.readUTF().split("|");
            this._cvos.push(cvo);
        }
    }

    public static getCVOsType(type:number):Array<ActivityCVO>
    {
        let arr:Array<ActivityCVO> = [];
        for(let i:number=this._cvos.length-1; i>=0; i--)
        {
            if(this._cvos[i].type == type) arr.push(this._cvos[i]);
        }
        return arr;
    }

    public static hasCanget(type:number = -1):boolean
    {
        for(let i:number=this._cvos.length-1; i>=0; i--)
        {
            if((type == -1 || this._cvos[i].type == type) && this._cvos[i].canGet) return true;
        }
        return false;
    }

    //-------------------------------------------------------------------
    /*是否已领取*/
    public get hasGet():boolean
    {
        return Manager.model.getActivity().dailyHasGet(this.id);
    }
    /*是否能领取*/
    public get canGet():boolean
    {
        return this.finishCount >= this.need && !this.hasGet;
    }
    /*已完成数量*/
    public get finishCount():number
    {
        return Manager.model.getActivity().dailyFinishCount(this.id);
    }
}