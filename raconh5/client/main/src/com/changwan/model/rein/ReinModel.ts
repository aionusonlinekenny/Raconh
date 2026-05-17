/**
 * 转生model
 * liangyan
 * create 2017-12-14
*/
class ReinModel extends egret.EventDispatcher
{
    public constructor()
    {
        super();
        this.init();
    }

    private init():void
    {
        this._bossCount = 0;
    }

    private _bossCount:number;
    public set bossCount(value:number)
    {
        if(this._bossCount == value) return;
        this._bossCount = value;
        this.dispatchEvent(new ReinEvent(ReinEvent.REIN_BOSS_UPDATE));
    }
    public get bossCount():number {return this._bossCount;}

    public getCheckCanRein():boolean
    {
        let level = Manager.model.self.attrInfo.zhuanshu;
        if(level == ReinCVO.maxLevel) return false;
        let allFinish = true;
        let reinCvo = ReinCVO.getCvo(level);
        if(!reinCvo.loss.isEnough())allFinish = false;
        else
        {
            for(let i = 0; i < reinCvo.condArr.length; i++)
            {
                if(!reinCvo.condArr[i].isSatisfy())
                {
                    allFinish = false;
                    break;
                }
            }
        }

        // if(!reinCvo.loss.isEnough()) allFinish = false;
        return allFinish;
    }
}