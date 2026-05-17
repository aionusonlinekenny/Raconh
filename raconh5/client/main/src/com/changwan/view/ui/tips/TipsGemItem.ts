class TipsGemItem extends UIComponent
{
	private _bg:eui.Image;
	private _itemImg:eui.Image;
	private _nameTxt:Label;
	private _attrTxt:Label;
	private _path:PathInfo;
	private _gemId:number;
	public constructor() {
		super();
        this.skinName = Manager.path.getSkinName("tips", "TipsGemItemSkin");
		this._gemId = 0;
	}
	protected configUI():void
	{
		super.configUI();
		this._bg.width = 70;
		this._bg.height = 70;
		this._attrTxt.multiline = false;
		this._attrTxt.height = 24;
	}
	protected drawAll():void
	{
		super.drawAll();
		if(this._gemId!=0)
		{
			this.updateView();
		}
	}

	public setData(gemId:number)
	{
		if(this._gemId == gemId) return;
		this._gemId = gemId;
		if(this._loadComplete)
		{
			this.updateView();
		}
	}
	private updateView():void
	{
		let iteminfo:ItemsCVO= ItemsCVO.getCvo(this._gemId);
		if(this._path != null)Manager.loader.remove(this._path,this.onLoadComplete,this);
		this._path = Manager.path.getIconPath(iteminfo.imgId);
		// Manager.loader.getRes(this._path.url, this.onLoadComplete, this);
		Manager.loader.load(this._path,this.onLoadComplete,this);
		this._nameTxt.text = iteminfo.name;
		let arrvo:AttrVO = Manager.pool.create(AttrVO,iteminfo.attr);
		let vo:AttrVoInfo = arrvo.attrInfos[0];
		vo.sign = "+";
		this._attrTxt.text = vo.desc();
		Manager.pool.push(arrvo);
	}
	private onLoadComplete(loader:Loader):void
	{
		this._itemImg.texture = loader.data;
	}
	public unuse():void
	{
		super.unuse();
		if(this._path != null) 
		{
			Manager.loader.remove(this._path,this.onLoadComplete,this);
			this._path = null;
		}
		this._itemImg.texture = null;
		this._nameTxt.text = "";
		this._attrTxt.text = "";
		this._gemId=0;
	}
	public dispose():void
	{
		super.dispose();
		if(this._path != null) 
		{
			Manager.loader.remove(this._path,this.onLoadComplete,this);
			this._path = null;
		}
		ObjectUtil.removes(this._attrTxt,this._nameTxt,this._itemImg);
		this._itemImg= null;
		this._nameTxt= null;
		this._attrTxt= null;
	}
}