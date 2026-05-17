/**
 * luzhihong
 * create 2017.12.25
 */
class BossModel extends egret.EventDispatcher
{
    public static CHALLENGE_MAX:number = 10;//挑战次数上限

    public rareDropModel:RareDropModel = new RareDropModel;

    public constructor()
    {
        super();
    }


    public challengeNum:number=0;//可挑战次数
    public recoverTime:number=0;//次数恢复时间
    /*设置挑战次数和恢复时间*/
    public setNumAndTime(curNum:number, curTime:number):void
    {
        if(this.challengeNum == curNum && this.recoverTime == curTime) return;
        this.challengeNum = curNum;
        this.recoverTime = curTime;
        this.dispatchEvent(new BossEvent(BossEvent.CHALLENGE_TIMES));
    }
    
    /*关注列表*/
    private _attentionList:Array<number> = [];
    /*设置关注列表*/
    public setAttentions(list:Array<number>)
    {
        this._attentionList = list;
        this.dispatchEvent(new BossEvent(BossEvent.ATTENTION));
    }
    /*是否已关注*/
    public isAttention(id:number):boolean
    {
        return this._attentionList.indexOf(id) != -1;
    }

    /*敌对玩家列表*/
    private _enemyList:Array<BossPlayerInfo> = [];
    public get enemyList():Array<BossPlayerInfo>{return this._enemyList;}
    public set enemyList(value:Array<BossPlayerInfo>)
    {
        this._enemyList = value;
        this.dispatchEvent(new BossEvent(BossEvent.ENEMY_LIST));
    }
    public getEnemyByID(id:number):BossPlayerInfo
    {
        for(let i:number=this._enemyList.length-1; i>=0; i--)
        {
            if(this._enemyList[i].id == i) return this._enemyList[i];
        }
        return null;
    }




    //------------------
    public get privateChallenge():boolean
    {
        let cvos:CopyCVO[] = CopyCVO.getCVOsByType(CopyConst.TYPE_BOSS_PRIVATE);
        for(let i:number=0, len:number=cvos.length; i<len; i++)
        {
            if(cvos[i].isAllCondSatisfy()) return true;
        }
        return false;
    }
      
    public get publicChallenge():boolean
    {
        let cvos:BossCVO[] = BossCVO.getCVOs();
        for(let i:number=0, len:number=cvos.length; i<len; i++)
        {
            if(cvos[i].condVo.isSatisfy() && this.challengeNum > 0) return true;
        }
        return false;
    }  
}