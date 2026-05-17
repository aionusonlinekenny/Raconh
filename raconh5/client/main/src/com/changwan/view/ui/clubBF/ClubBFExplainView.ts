/**
 * 盟会战说明界面
 * luzh 
 * 2018.1.29
 */
class ClubBFExplainView extends UIComponent implements IViewManager
{
	private _basePopView:BasePopUpView;
	private _group0:eui.Group;
	private _group1:eui.Group;
	private _group2:eui.Group;
	private _group3:eui.Group;
	private _txt0:Label;
	private _txt1:Label;
	private _txt2:Label;
	private _txt3:Label;
	private _line0:eui.Image;
	private _line1:eui.Image;
	private _line2:eui.Image;
	private _btn:Button;

	public constructor()
	{
		super();
		this.skinName = Manager.path.getSkinName("clubBF", "ClubBFExplainSkin");
		this.touchChildren = true;
	}

	protected configUI():void
	{
		super.configUI();

        HtmlUtil.setTextFlow(this._txt0, LangCVO.getContent("clubBF1"));
        HtmlUtil.setTextFlow(this._txt1, LangCVO.getContent("clubBF2"));
        HtmlUtil.setTextFlow(this._txt2, LangCVO.getContent("clubBF3"));
        HtmlUtil.setTextFlow(this._txt3, LangCVO.getContent("clubBF4"));

        this._line0.y = this._txt0.y + this._txt0.height + 15;
        this._line1.y = this._txt1.y + this._txt1.height + 15;
        this._line2.y = this._txt2.y + this._txt2.height + 15;
        
        this._group1.y = this._group0.y + this._group0.height + 5;
        this._group2.y = this._group1.y + this._group1.height + 5;
        this._group3.y = this._group2.y + this._group2.height + 5;

        this._btn.y = this._group3.y + this._group3.height + 28;
        this._basePopView.viewY = 135;
        this._basePopView.bgHeight = this._group3.y + this._group3.height;

		this.onResizeHandler(null);
	}

	protected addEvent():void
	{
		super.addEvent();

		GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._basePopView.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
	}

	protected removeEvent():void
	{
		GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._basePopView.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);

		super.removeEvent();
	}

	private onResizeHandler(e:GlobalEvent):void
	{
		this.x = Math.round((Manager.config.gameWidth - this.width) / 2);
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
		Manager.view.hide(ViewID.ClubBFExplainView)
	}

	public show():void
	{
        if(this.parent == null) Manager.layer.tipsLayer.addChild(this);
	}

	public hide():void
	{
        this.dispose();
	}

	public dispose():void
	{
		super.dispose();
		ObjectUtil.removes(this._group0,this._group1,this._group2,this._group3,this._line0,this._line1,this._line2);
		ObjectUtil.disposes(this._basePopView,this._txt0,this._txt1,this._txt2,this._txt3,this._btn);
		this._basePopView = null;
		this._group0 = null;
		this._group1 = null;
		this._group2 = null;
		this._group3 = null;
		this._txt0 = null;
		this._txt1 = null;
		this._txt2 = null;
		this._txt3 = null;
		this._line0 = null;
		this._line1 = null;
		this._line2 = null;
		this._btn = null;
	}
}