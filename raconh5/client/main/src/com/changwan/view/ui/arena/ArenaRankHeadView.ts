/**
 *author Anydo
 *create 2018-1-4
 *description 
*/
class ArenaRankHeadView extends UIComponent
{
    private _num:NumImgView2;
    private _imageHead:BitmapRemote;
    private _pic1:eui.Image;
    private _pic2:eui.Image;
    private _txtName:Label;
    private _txtPower:Label;
    private _btnPK:Button;

    private _info:ArenaRankInfo;
    
    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("arena", "ArenaRankHeadViewSkin");
        this.touchChildren = true;
    }

    protected configUI():void
    {
        super.configUI();
        this._num = Manager.pool.create(NumImgView2);
        this._num.y = 133;
        this.addChild(this._num);
    }

    protected addEvent():void
    {
        super.addEvent();
        this._btnPK.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
        if(this._btnPK) this._btnPK.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
    }

    private onBtnClickHandler(e:egret.TouchEvent):void
	{
        if(e != null && Manager.model.getGuide().curID == GuideID.CLUB_JOIN) return;
        Manager.model.getArena().PKHandler(this._info.rank, this._info.power, this._info.playerName);
    }

    public set info(value:ArenaRankInfo)
    {
        this._info = value;
        this.setSecondValue(this._info.rank);
        this._txtName.text = this._info.playerName;
        this._txtPower.text = LangCVO.getContent("arena11") + this._info.power;
        this._imageHead.load(Manager.path.getRoleHeadPath(2, this._info.career));
    }

    public clickFun():void
    {
        this.onBtnClickHandler(null);
    }

    private setSecondValue(value:number):void
    {
        if(this._num == null) return;
        this._num.setValue(value, "nums_vip_", 25, 0);
        let tempW:number = String(value).length * 25;
        this._num.x = (244 - tempW) / 2;
        this._pic1.x = this._num.x - 38;
        this._pic2.x = this._num.x + tempW + 10;
    }

    public dispose():void
    {
        super.dispose();
        if(this._loadComplete)
        {
            if(this._imageHead)
                this._imageHead.dispose();
            this._imageHead = null;
            if(this._txtName)
                this._txtName.dispose();
            this._txtName = null;
            if(this._txtPower)
                this._txtPower.dispose();
            this._txtPower = null;
            if(this._btnPK)
                this._btnPK.dispose();
            this._btnPK = null;
            this._pic1 = null;
            this._pic2 = null;
            if(this._num)
                Manager.pool.push(this._num);
            this._num = null;
        }
        this._info = null;
    }
}