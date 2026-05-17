/**
 * 经验副本model
 * luzh
 * create 2018.1.10
*/
class CopySilverModel extends egret.EventDispatcher
{
    public constructor()
    {
        super();
        this.needGuide = false;
    }

        //总能进入次数
    public get totalCount():number
    {
        return CopyExpConfigCVO.silver_free_count + Manager.model.getCopy().getBuyCount(CopyConst.TYPE_SILVER);
    }

    public get leftCount():number
    {
        let cvo:CopyCVO = CopyCVO.getCVO(CopyConst.ID_SILVER);
        return this.totalCount - cvo.enterNum;
    }

    private _cd:number = 0;//下次可进入时间戳(秒)
    public set cd(value:number)
    {
        if(this._cd == value) return;
        this._cd = value;
        this.dispatchEvent(new CopyEvent(CopyEvent.SILVER_COOLING));
    }
    public get nextLeftTime():number
    {
        let left:number = this._cd - Manager.model.getLogin().serverTimeInfo.serverTime/1000;
        return left > 0 ? left : 0;
    }

    public boxesData:Object;

    public rate:number;

    /**是否需要副本引导 */
    public needGuide:boolean;
}