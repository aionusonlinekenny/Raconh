/**
 * 珍希掉落容器
 * pzx
 * create 18.2.1
 */
class RareDropView extends UIComponent{
	private _scroll:BaseHScrollerList;
	private _model:RareDropModel;

	public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("boss/rareDrop", "RareDropViewSkin");
    }
    protected configUI():void
    {
        super.configUI();
		this._model = Manager.model.getBoss().rareDropModel;
		this._scroll.initBtnListData(RareDropItem, [], true);
		Manager.control.getBoss().rareDropQuery();
        this.touchChildren = true;
        this._scroll.touchChildren = true;
    }

    protected addEvent():void
    {
        super.addEvent();
		this._model.addEventListener(BossEvent.RAREDROP_QUIER_EVENT,this.drawData,this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
		this._model.removeEventListener(BossEvent.RAREDROP_QUIER_EVENT,this.drawData,this);
    }

    private drawData():void
	{
		this._scroll.dataProvider(this._model.list);
    }

    public dispose():void
    {
        super.dispose();
        this._model = null;
		this._scroll.dispose();
    }
}