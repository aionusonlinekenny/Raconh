/**
 * 活跃进度奖励
 * luzhihong
 * create 2017-11-22
 */
 class ActivityScheduleCVO
{
    private static _cvos:Array<ActivityScheduleCVO>;

    /*id*/
    public id:number;
    /*活跃度值*/
    public value:number;
    /*奖励*/
    public gains:Array<GainLossVO>;
    
    /*解析表*/
    public static parse(bytes:egret.ByteArray):void
    {
        ActivityScheduleCVO._cvos = [];
        let cvo:ActivityScheduleCVO;
        let rowCount:number = bytes.readShort();
        for (let j = 0; j < rowCount; j++)
        {
            cvo = new ActivityScheduleCVO();
            cvo.id = bytes.readShort();
            cvo.value = bytes.readInt();
            cvo.gains = GainLossVO.parse(bytes.readUTF());
            ActivityScheduleCVO._cvos.push(cvo);
        }
    }

    public static getCVOs():Array<ActivityScheduleCVO>
    {
        return ActivityScheduleCVO._cvos;
    }

    public static hasCanget():boolean
    {
        for(let i:number=this._cvos.length-1; i>=0; i--)
        {
            if(this._cvos[i].canGet) return true;
        }
        return false;
    }

    //-------------------------------------------------------------------
    /*是否已领取*/
    public get hasGet():boolean
    {
        return Manager.model.getActivity().dailyScheduleHasGet(this.id);
    }
    /*是否能领取*/
    public get canGet():boolean
    {
        return Manager.model.getActivity().curDailyValue >= this.value && !this.hasGet;
    }
}