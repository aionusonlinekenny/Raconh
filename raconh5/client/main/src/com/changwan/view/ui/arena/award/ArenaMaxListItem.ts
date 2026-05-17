/**
 *author Anydo
 *create 2018-1-5
 *description 
*/
class ArenaMaxListItem extends UIComponent
{
    private _picStrip:eui.Image;
    private _picFull:eui.Image;
    private _picBox:eui.Image;
    private _picGeted:eui.Image;
    private _redIcon:eui.Image;
    private _txt:Label;
    private _groupHot:eui.Group;

    private _cvo:ArenaMaxRankCVO;

    private FULL_WIDTH:number = 85;
    public static WIDTH:number = 167;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("arena", "ArenaMaxListItemSkin");
        this.touchChildren = true;
    }

    protected configUI():void
	{
		super.configUI();
    }

    protected addEvent():void
    {
        super.addEvent();
        this._groupHot.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getArena().addEventListener(ArenaEvent.UPDATE_MAX_RANK_AWARD, this.updateMaxAwardData, this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
        this._groupHot.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getArena().removeEventListener(ArenaEvent.UPDATE_MAX_RANK_AWARD, this.updateMaxAwardData, this);
    }

    private updateMaxAwardData(e:ArenaEvent=null):void
	{
        let hasGet:boolean = (Manager.model.getArena().maxGetedIDs.indexOf(this._cvo.id) >= 0);
        let isFull:boolean = (Manager.model.getArena().myMaxRank <= this._cvo.rankTarget);
        this._redIcon.visible = isFull && !hasGet;
    }

    private onClickHandler(e:egret.TouchEvent):void
	{
        // if(Manager.model.getArena().maxGetedIDs.indexOf(this._cvo.id) >= 0) return;
        // if(Manager.model.getArena().myMaxRank > this._cvo.rankTarget) return;
        // Manager.control.getArena().cmdMaxRankAward(this._cvo.id);
        let enabled:boolean = true;
        if(Manager.model.getArena().maxGetedIDs.indexOf(this._cvo.id) >= 0) enabled = false;
        if(Manager.model.getArena().myMaxRank > this._cvo.rankTarget) enabled = false;
        let cbi:CallBackInfo = Manager.pool.create(CallBackInfo, this.clickCallback, this, this._cvo);
        Manager.view.show(ViewID.ArenaMaxAwardView, this._cvo.gains, enabled, cbi);
    }

    private clickCallback(cvo:ArenaMaxRankCVO):void
    {
        if((Manager.model.getArena().maxGetedIDs.indexOf(cvo.id) == -1) && (Manager.model.getArena().myMaxRank <= cvo.rankTarget))
        {
            Manager.control.getArena().cmdMaxRankAward(cvo.id);
        }
    }

    public setCVO(cvo:ArenaMaxRankCVO):void
    {
        this._cvo = cvo;
        this._txt.text = LangCVO.getContent("arena8", this._cvo.rankTarget);
    }

    public updateGetData():void
	{
        let hasGet:boolean = (Manager.model.getArena().maxGetedIDs.indexOf(this._cvo.id) >= 0);
        let isFull:boolean = (Manager.model.getArena().myMaxRank <= this._cvo.rankTarget);
        this._redIcon.visible = isFull && !hasGet;
        this._picGeted.visible = hasGet;
        this._picFull.visible = isFull;
        if(Manager.model.getArena().myMaxRank >= this._cvo.rankStart) this._picStrip.width = 0;
        else if(isFull) this._picStrip.width = this.FULL_WIDTH;
        else
        {
            this._picStrip.width = ((this._cvo.rankStart - Manager.model.getArena().myMaxRank) / (this._cvo.rankStart - this._cvo.rankTarget)) * this.FULL_WIDTH;
        }
    }

    public dispose():void
    {
        super.dispose();
        if(this._loadComplete)
        {
            this._txt.dispose();
            this._txt = null;
            this._picStrip = null;
            this._picFull = null;
            this._picBox = null;
            this._picGeted = null;
            this._redIcon = null;
            this._groupHot = null;
        }
        this._cvo = null;
    }
}