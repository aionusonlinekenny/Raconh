/**
 * 爬塔副本model
 * liangyan
 * create 2017-12-27
*/
class TowerCopyModel extends egret.EventDispatcher
{
    public constructor()
    {
        super();
        this._curLvl = 0;
        this._history = 0;
        // this._saodangTimes = 0;
    }

    private _curLvl:number;
    private _history:number;
    // private _saodangTimes:number;
    /**当前挑战关卡 */
    public get curLvl():number {return this._curLvl;}
    public set curLvl(value:number)
    {
        if(this._curLvl == value) return;
        this._curLvl = value;
    }
    /**历史通关数 */
    public get history():number {return this._history;}
    public set history(value:number)
    {
        if(this._history == value) return;
        this._history = value;
    }
    /**扫荡剩余次数 */
    // public get saodangTimes():number {return this._saodangTimes;}
    // public set saodangTimes(value:number)
    // {
    //     if(this._saodangTimes == value) return;
    //     this._saodangTimes = value;
    // }

    /**能否扫荡 */
    public get canSaodang():boolean
    {
        // if(this._saodangTimes <= 0) return false;
        if(this._history <= 0) return false;
        if(this._curLvl < 0) return false;
        if(this._curLvl >= this._history) return false;
        return true;
    }
    /**能否挑战 */
    public canChallenge(needCheckFight:boolean = true):boolean
    {
        if(this._history >= TowerCopyCVO.MAX_CELL) return false;
        let cvo = TowerCopyCVO.getCVO(this._curLvl + 1);
        if(cvo == null) cvo = TowerCopyCVO.getCVO(this._curLvl);
        if(!cvo.isAllCondSatisfy()) return false;
        let self = Manager.model.self;
        if(needCheckFight && self.attrInfo.fight < cvo.fightAdvise) return false;
        return true;
    }
}