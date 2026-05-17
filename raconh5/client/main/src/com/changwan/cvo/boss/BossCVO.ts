/**
 * BOSS表
 * luzhihong
 * create 2017-12-27
 */
 class BossCVO
{
    private static _cvos:Object;

    /*id*/
    public id:number;
    /*怪物ID*/
    public bossID:number;
    private _bossCVO:MonsterCVO
    public get boss():MonsterCVO
    {
        if(!this._bossCVO) this._bossCVO = MonsterCVO.getCVO(this.bossID);
        return this._bossCVO;
    }
    /*pk模式*/
    public pkMode:number;
    /*展示奖励*/
    public show:Array<GainLossVO>;
    /*进入条件*/
    public condVo:ConditionVO;

    /*解析表*/
    public static parse(bytes:egret.ByteArray):void
    {
        BossCVO._cvos = [];
        let cvo:BossCVO;
        let tabCount:number = bytes.readByte();
        let rowCount:number = bytes.readShort();
        for (let j = 0; j < rowCount; j++)
        {
            cvo = new BossCVO();
            cvo.id = bytes.readByte();
            cvo.bossID = ArrayUtil.parseStringToArray(bytes.readUTF())[0];;
            cvo.pkMode = bytes.readByte();
            cvo.show = GainLossVO.parse(bytes.readUTF())
            cvo.condVo = new ConditionVO(bytes.readUTF());

            BossCVO._cvos[cvo.id] = cvo;
        }
    }

    
    public static getCVO(id:number):BossCVO
    {
        return BossCVO._cvos[id];
    }
    
    public static getCVOs():Array<BossCVO>
    {
        let result:Array<BossCVO> = [];
  		for(let key in this._cvos)
		{
            result.push(this._cvos[key]);
		}
        return result;
    }


    //动态数据-------------------------------------------------------------
    public curBlood:number = 0;//当前血量
    public totalBlood:number = 0;//总血量
    public reviveTime:number = 0;//复活时间
    public setBossInfo(cur:number, total:number, revive:number):void
    {
        if(this.curBlood == cur && this.totalBlood == total && this.reviveTime == revive) return;
        this.curBlood = cur;
        this.totalBlood = total;
        this.reviveTime = revive;
        Manager.model.getBoss().dispatchEvent(new BossEvent(BossEvent.BLOOD_INFO, this.id));
    }
    /*是否已击杀*/
    public get isKilled():boolean{return this.curBlood == 0;}
    //剩余时间
    public get leftTime():number
    {
        return Math.floor(this.reviveTime - Manager.model.getLogin().serverTimeInfo.serverTime/1000);
    }

    /*是否已关注*/
    public get isAttention():boolean{return Manager.model.getBoss().isAttention(this.id);}
    
}