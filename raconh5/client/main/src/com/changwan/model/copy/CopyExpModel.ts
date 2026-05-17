/**
 * 经验副本model
 * luzh
 * create 2018.1.10
*/
class CopyExpModel extends egret.EventDispatcher
{
    public constructor()
    {
        super();
        this.needGuide = false;
    }

    //总能进入次数
    public get totalCount():number
    {
        return CopyExpConfigCVO.free_count + Manager.model.getCopy().getBuyCount(CopyConst.TYPE_EXP);
    }

    private _enterCount:number = 0;//已挑战次数
    public get leftCount():number
    {
        return this.totalCount - this._enterCount;
    }
    private _nextTime:number = 0;//下次可进入时间戳(秒)
    public get nextLeftTime():number
    {
        let left:number = this._nextTime - Manager.model.getLogin().serverTimeInfo.serverTime/1000;
        return left > 0 ? left : 0;
    }
    public scoreID:number;//评分id
    public hardLvl:number;//难度id
    /** 
     * 副本信息
	 * @param enterCount 已挑战次数
	 * @param buyCount 已购买次数
	 * @param nextTime 下次可进入时间戳(秒)
	 * @param scoreID 评分id
	 * @param hardLvl 难度id
     */
    public setInfos(enterCount:number, nextTime:number, scoreID:number, hardLvl:number):void
    {
        if(this._enterCount == enterCount && this._nextTime == nextTime && this.scoreID == scoreID && this.hardLvl == hardLvl) return;
        this._enterCount = enterCount;
        this._nextTime = nextTime;
        this.scoreID = scoreID;
        this.hardLvl = hardLvl;
        this.dispatchEvent(new CopyEvent(CopyEvent.EXP_INFO_UPDATE));
    }
    
    private _inspireRate:number=0;//鼓舞加成
    public get inspireRate():number{return this._inspireRate;}
    public set inspireRate(value:number)
    {
        if(this._inspireRate == value) return;
        this._inspireRate = value;
        this.dispatchEvent(new CopyEvent(CopyEvent.EXP_INSPIRE));
    }
    
    private _exp:number=0;//获得经验
    public get exp():number{return this._exp;}
    public set exp(value:number)
    {
        if(this._exp == value) return;
        this._exp = value;
        this.dispatchEvent(new CopyEvent(CopyEvent.EXP_GAINS));
    }
    
    private _kills:number=0;//击杀数
    public get kills():number{return this._kills;}
    public set kills(value:number)
    {
        if(this._kills == value) return;
        this._kills = value;
        this.dispatchEvent(new CopyEvent(CopyEvent.EXP_KILLS));
    }
    
    private _wave:number=0;//波数
    public get wave():number{return this._wave;}
    public set wave(value:number)
    {
        if(this._wave == value) return;
        this._wave = value;
        this.dispatchEvent(new CopyEvent(CopyEvent.EXP_WAVE));
    }

    public initData(wave:number, rate:number, kills:number, exp:number):void
    {
        this.wave = wave;
        this.inspireRate = rate;
        this.kills = kills;
        this.exp = exp;
        this.dispatchEvent(new CopyEvent(CopyEvent.EXP_DATA_INIT));
    }

    public clean():void
    {
        this._inspireRate = 0;
        this._wave = 0;
        this._kills = 0;
        this._exp = 0;
    }

    /**是否需要副本引导 */
    public needGuide:boolean;
}