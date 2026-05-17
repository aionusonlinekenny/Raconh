/**
 * 盟会战攻击BUFF属性界面（战意）
 * luzh 
 * 2018.1.29
 */
class ClubBFAttackBuffView extends UIComponent implements IViewManager
{
    private _icon:BitmapRemote;
    private _txt0:Label;
    private _txt1:Label;
    private _txt2:Label;
    private _btnClose:eui.Image;
    private _model:ClubBFModel;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("clubBF", "ClubBFAttackBuffSkin");
        this.touchChildren = true;
    }

    public show():void
    {
        if(this.parent == null) Manager.layer.tipsLayer.addChildAt(this, 0);
    }

    public hide():void
    {
        this.dispose();
    }

    protected configUI():void
    {
        super.configUI();
        this._model = Manager.model.getClubBF();

        this._icon.load(Manager.path.getClubBFPath("zhanyi.png"));
        HtmlUtil.setTextFlow(this._txt0, LangCVO.getContent("clubBF7", this._model.winCount));//防守方连胜{0}次，攻方获得以下战意属性

        this.updateClubBuff(null);
        this.onResizeHandler(null);
    }

    protected addEvent():void
    {
        super.addEvent();
        // this._btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._model.addEventListener(ClubBFEvent.ATTACK_BUFF_UPDATE, this.updateClubBuff, this);
		GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    }

    protected removeEvent():void
    {
        // this._btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._model.removeEventListener(ClubBFEvent.ATTACK_BUFF_UPDATE, this.updateClubBuff, this);
		GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        super.removeEvent();
    }

	private updateClubBuff(e:ClubBFEvent):void
    {
        if(this._model.atkBuffCVO == null) return;
        let infos:Array<AttrVoInfo> = this._model.atkBuffCVO.attrVo.attrInfos;
        let str1:string = "";
        let str2:string = "";
        for(let i:number=0,len:number=infos.length; i<len; i++)
        {
            if(i%2 == 0) str1 += infos[i].desc(true, Color.GREEN_STR) + "\n";
            else str2 += infos[i].desc(true, Color.GREEN_STR) + "\n";
        }
        HtmlUtil.setTextFlow(this._txt1, str1);
        HtmlUtil.setTextFlow(this._txt2, str2);
    }

	private onResizeHandler(e:GlobalEvent):void
	{
        this.x = Math.round((Manager.config.gameWidth - this.width)>>1);
        this.y = 351;
	}

    private onTouchHandler(e:egret.TouchEvent):void
    {
        Manager.view.hide(ViewID.ClubBFAttackBuffView);
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.disposes(this._icon, this._txt0, this._txt1, this._txt2);
        ObjectUtil.remove(this._btnClose);
        this._icon = null;
        this._txt0 = null;
        this._txt1 = null;
        this._txt2 = null;
        this._btnClose = null;
        this._model = null;
    }
}