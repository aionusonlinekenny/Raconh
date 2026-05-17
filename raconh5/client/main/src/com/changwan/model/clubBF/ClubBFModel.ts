/**
 * 盟会战model
 * luzh
 * 2018.1.30
 */
class ClubBFModel extends egret.EventDispatcher
{

    public constructor()
    {
        super();
    }

    private _scoreRewardReset:boolean;
    private _scoreRewardHasCanGet:boolean;
    /*个人积分数*/
    private _score:number=0;
    public get score():number{return this._score;}
    public set score(value:number)
    {
        if(this._score == value) return;
        this._score = value;

        this._scoreRewardReset = true;
        this.dispatchEvent(new ClubBFEvent(ClubBFEvent.SCORE_UPDATE));
    }
    
    /*盟会战积分奖励已领取id列表*/
    private _hasGetIDs:Array<number> = [];
    public set hasGetIDs(value:Array<number>)
    {
        if(this._hasGetIDs == value) return;
        this._hasGetIDs = value;

        this._scoreRewardReset = true;
        this.dispatchEvent(new ClubBFEvent(ClubBFEvent.REWARES_GET_STATE));
    }
    public addGetID(id:number)
    {
        if(this.hasGet(id)) return;
        this._hasGetIDs.push(id);

        this._scoreRewardReset = true;
        this.dispatchEvent(new ClubBFEvent(ClubBFEvent.REWARES_GET_STATE));
    }
    public hasGet(id:number):boolean
    {
        return this._hasGetIDs.indexOf(id) != -1;
    }

    public get hasCanGet():boolean
    {
        if(!OpenCVO.isOpen(OpenConst.ID_CLUB_WAR)) return false;
        if(this._scoreRewardReset) this._scoreRewardHasCanGet = ClubBFScoreRewardsCVO.hasCanGet;
        return this._scoreRewardHasCanGet;
    }




    /*攻击方战意BUFF*/
    private _atkBuffCVO:BuffCVO;
    public get atkBuffCVO():BuffCVO{return this._atkBuffCVO;}
    public set atkBuffCVO(value:BuffCVO)
    {
        if(this._atkBuffCVO == value) return;
        this._atkBuffCVO = value;
        this.dispatchEvent(new ClubBFEvent(ClubBFEvent.ATTACK_BUFF_UPDATE));
    }
    
    /*防守方盟会类型*/
    public defClubType:number;
    public get isSelfDef():boolean{return this.defClubType == Manager.model.self.attrInfo.guildType;}

    public winCount:number;

    /*攻击方战意BUFF*/
    private _clubBFHasBuy:boolean;
    public get clubBFHasBuy():boolean{return this._clubBFHasBuy;}
    public set clubBFHasBuy(value:boolean)
    {
        if(this._clubBFHasBuy == value) return;
        this._clubBFHasBuy = value;
        this.dispatchEvent(new ClubBFEvent(ClubBFEvent.CLUB_BUFF_BUY));
    }


    /*自动挑战*/
    public autoChallenge:boolean;


    
    /*清除CD不再提示*/
    public cdClearNotAlert:boolean;
    /*清除CD不再提示*/
    private _cdEndTime:number;
    public set cdEndTime(value:number)
    {
        if(this._cdEndTime == value) return;
        this._cdEndTime = value;
        this.dispatchEvent(new ClubBFEvent(ClubBFEvent.CD_UPDATE));
    }
    public get cd():number
    {
        let left:number = 0;
        if(this._cdEndTime > 0) left = Math.ceil(this._cdEndTime - Manager.model.getLogin().serverTimeInfo.serverTime/1000);
        return left > 0 ? left : 0;
    }

    /*是否已进入挑战区*/
    private _hasEnterChallengeArea:boolean;
    public get hasEnterChallengeArea():boolean{return this._hasEnterChallengeArea;}
    public set hasEnterChallengeArea(value:boolean)
    {
        if(this._hasEnterChallengeArea == value) return;
        this._hasEnterChallengeArea = value;

        if(this._hasEnterChallengeArea) Manager.view.show(ViewID.ClubBFChallengePanel);
        this.dispatchEvent(new ClubBFEvent(ClubBFEvent.CHALLENGE_AREA_STATE));
    }
    
    /*清空数据*/
    public clear():void
    {
        this.hasEnterChallengeArea = false;
        this.autoChallenge = false;
        this._clubBFHasBuy = false;
        this._cdEndTime = 0
        this._atkBuffCVO = null;
    }
}