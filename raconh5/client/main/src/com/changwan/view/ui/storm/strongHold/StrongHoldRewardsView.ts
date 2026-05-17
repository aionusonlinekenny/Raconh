/**
 * 江湖风云占领据点获得的奖励视图
 * luzh
 * 2018-4.20
 */
class StrongHoldRewardsView extends Sprite
{
    private _back:BitmapRes;
    private _icon:BitmapRes;
    private _txt:TextField;

	public constructor()
    {
        super();
    }

	protected start():void
	{
		super.start();

        this._back = BitmapRes.create("common_back2_png", 0, 0, 230, 90);
        this.addChild(this._back);
        
        this._icon = BitmapRes.create("panel_gold_54_png", 108, 45);
        this.addChild(this._icon);
        
        this._txt = TextField.create(220, 70, Color.DEF, 24);
        this._txt.move(4, 12);
        HtmlUtil.setTextFlow(this._txt, LangCVO.getContent("storm7"));
        this.addChild(this._txt);
	}

    public dispose():void
    {
        super.dispose();
        ObjectUtil.pushes(this._back, this._icon, this._txt);
        this._back = null;
        this._icon = null;
        this._txt = null;
    }
}