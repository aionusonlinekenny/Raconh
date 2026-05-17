class SysNoticItem extends UIComponent{
	private _passTxt:Label;
	private _nameTxt:Label;
	private _redIcon:eui.Image;
	private _ilingquImg:eui.Image
	private _effectImg:eui.Image;
	private _itemImg:BitmapRemote;
	private _cvo:SysNoteiceCVO;
	private _gridImg:eui.Image;
	public constructor() {
		super();
		this.skinName = Manager.path.getSkinName("sysnotice", "SysnoticeItemSkin");
	}
	public configUI():void
	{
		super.configUI();
		this.touchChildren = false;
		this.touchEnabled = true;
	}
	public unuse():void
	{
		super.unuse();
		this._passTxt.text = "";
		this._nameTxt.text = "";
		this._redIcon.visible = false;
		this._ilingquImg.visible = false;
		this._effectImg.visible = false;
		this._cvo = null;
		
		if(this._itemImg) {
			if(this._itemImg.filters) this._itemImg.filters = null;
			Manager.pool.push(this._itemImg);
			this._itemImg = null;
		}
	}
	public setData(value:SysNoteiceCVO):void
	{
		this._cvo = value;
		this.invalidate(InvalidationType.DATA);
	}
	public getCvo():SysNoteiceCVO
	{
		return this._cvo;
	}
	protected drawAll():void
	{
		super.drawAll();
		this.drawData();
	}
	protected draw():void
	{
		super.draw();
		if(this.isInvalid(InvalidationType.DATA)) this.drawData();
	}
	private drawData():void
	{
		if(this._itemImg == null)
		{
			this._itemImg = Manager.pool.create(BitmapRemote);
			this._itemImg.x = 40;
			this._itemImg.y = 55;
			this.addChild(this._itemImg);
			this.swapChildren(this._itemImg,this._ilingquImg);
		}
		this._itemImg.load(Manager.path.getSysnoticePath("icon/"+this._cvo.icon));
		this._nameTxt.text = this._cvo.name;
		this._passTxt.text = StringUtils.setParam(LangCVO.getContent("SysNotice1"),this._cvo.pass);
		if(this._cvo.state == 1)
		{
			this._redIcon.visible = false;
			this._ilingquImg.visible = true;
			this._gridImg.filters = null;
			this._itemImg.filters = null;
		}
		else
		{
			if(Manager.model.getTask().getTaskIdComplete(this._cvo.open_task_id))
			{
				this._redIcon.visible  = true;
				this._gridImg.filters = null;
				this._itemImg.filters = null;
			}
			else
			{
				this._redIcon.visible  = false;
				FilterUtil.setGrayFilter(this._gridImg);
				FilterUtil.setGrayFilter(this._itemImg);
			}
		}

	}
	public setReadIconShow(value:boolean):void
	{
		this._redIcon.visible = value;
		this._ilingquImg.visible = true;
	}
	public statusEffectImg(value:boolean):void
	{
		this._effectImg.visible = value;
	}
	public reuse():void
	{
		super.reuse();
		this._ilingquImg.visible = false;
		this._effectImg.visible = false;
	}
	public dispose():void
	{
		super.dispose();
		if(this._loadComplete== false) return;
		this._passTxt.dispose();
		this._passTxt = null;
		this._nameTxt.dispose();
		this._nameTxt = null;
		this._gridImg.filters = null;
		ObjectUtil.removes(this._redIcon,this._ilingquImg,this._effectImg,this._gridImg);
		this._redIcon= null;
		this._ilingquImg= null;
		this._effectImg= null;
		this._gridImg= null;
		if(this._itemImg) 
		{
			Manager.pool.push(this._itemImg);
			this._itemImg.filters = null;
			this._itemImg = null;
		}
		this._cvo=null;
	}
}