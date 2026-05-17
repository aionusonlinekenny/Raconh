/**
 * 盟会战积分奖励
 * luzh
 * create 2018.1.30
 */
 class ClubBFScoreRewardsCVO
{
    public id:number;
    public score:number;
    public rewards:Array<GainLossVO>;


    private static _cvos:Array<ClubBFScoreRewardsCVO>;

    /*解析表*/
    public static parse(bytes:egret.ByteArray):void
    {
        this._cvos = [];
        let cvo:ClubBFScoreRewardsCVO;
        let rowCount:number = bytes.readShort();
        for (let j = 0; j < rowCount; j++)
        {
            cvo = new ClubBFScoreRewardsCVO();
            cvo.id = bytes.readByte();
            cvo.score = bytes.readInt()
            cvo.rewards = GainLossVO.parse(bytes.readUTF());
            this._cvos.push(cvo);
        }
    }

    public static getCVOs():Array<ClubBFScoreRewardsCVO>
    {
        return this._cvos;
    }

    public static sortFun(a:ClubBFScoreRewardsCVO, b:ClubBFScoreRewardsCVO)
    {
        if(a.hasGet && !b.hasGet) return 1;
        if(!a.hasGet && b.hasGet) return -1;
        return (a.id < b.id ? -1 : 1); 
    }

    
    public static get hasCanGet():boolean
    {
        for(let i:number=this._cvos.length-1; i>=0; i--)
        {
            if(this._cvos[i].canGet) return true;
        }
        return false;
    }
    //---------------------------------------------------------------------
    /*已领取*/
    public get hasGet():boolean
    {
        return Manager.model.getClubBF().hasGet(this.id);
    }
    /*可领取*/
    public get canGet():boolean
    {
        if(this.hasGet) return false;
        return this.score <= Manager.model.getClubBF().score;
    }
}
