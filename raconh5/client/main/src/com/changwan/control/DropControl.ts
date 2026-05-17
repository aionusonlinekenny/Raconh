/**
 * 掉落控制器
 * luzhihong
 * create 2017-11-17
 */
class DropControl extends BaseControl
{


    public constructor()
    {
        super();
    }

    protected addCMD():void
    {
        Manager.socket.addCMD(Protocol.DROP_LIST, DropListCMD);
        Manager.socket.addCMD(Protocol.DROP_RARE_LIST, DropRareListCMD);
    }

    //珍稀掉落弹出框start-------------------------------------------------------------------
    private _dropAlert:DropAlert;
    public showAlert(infos:Array<ItemsModelInfo>):void
    {
        if(this._dropAlert == null) this._dropAlert = Manager.pool.create(DropAlert, infos);
        else this._dropAlert.reuse(infos);
    }
    public hideAlert():void
    {
        if(this._dropAlert)
            this._dropAlert.unuse();
    }
    //珍稀掉落弹出框end-------------------------------------------------------------------

    
    //打野效率弹出框start-------------------------------------------------------------------
    private _efficiencyAlert:EfficiencyAlert;
    public showEfficiencyAlert(lastSilver:number, lastExp:number, curSilver:number, curExp:number):void
    {
        if(this._efficiencyAlert == null) 
        {
            this._efficiencyAlert = Manager.pool.create(EfficiencyAlert, lastSilver, lastExp, curSilver, curExp);
        }
        else this._efficiencyAlert.reuse(lastSilver, lastExp, curSilver, curExp);
        this._efficiencyAlert.x = (Manager.config.gameWidth - 478) >> 1;
        this._efficiencyAlert.y = (Manager.config.gameHeight - 250) >> 1;
    }
    public hideEfficiencyAlert():void
    {
        if(this._efficiencyAlert)
            this._efficiencyAlert.unuse();
    }
    //打野效率弹出框end-------------------------------------------------------------------
}