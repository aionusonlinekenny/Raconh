class GemItemView extends UIComponent
{
	private _itemBgImg:eui.Image;
	private _itemLv:Label;
	private _kuang1:eui.Image;
	private _kuang2:eui.Image;
	private _kuang3:eui.Image;
	private _kuang4:eui.Image;
	private _addImg:eui.Image;
	private _gemImg:eui.Image;
	private _itemName:Label;
	private _redImg:eui.Image;
	private _itemTips:Label;
	private _upgradeImg:eui.Image;
	private _changeImg:eui.Image;

	private _kuangList:Array<eui.Image>;
	private _local:number;
	private _itemInfo:ItemsCVO;
	private _itemId:number;
	private _canUseItemId:number;
	private _upgradeType:number;

	private _imgPath:PathInfo;
	
	public constructor()
	{
		super();
		this.touchEnabled = true;
		this.skinName = Manager.path.getSkinName("equip", "GemItemViewSkin");
	}

	protected configUI():void
	{
		super.configUI();

		this._kuangList = [this._kuang1, this._kuang2, this._kuang3, this._kuang4];
	}

	public get itemId():number
	{
		return this._itemId;
	}

	public setInfo(local:number, itemInfo:ItemsCVO)
	{
		this._local = local;
		this._itemInfo = itemInfo;
		this._itemId = this._itemInfo.id;

		if(this._itemInfo)
		{
			// this._itemBgImg.source = "equip_gem_openBg_png";
			this._addImg.visible = false;
			let level:number = Number(String(this._itemId).substr(String(this._itemId).length-2, 2));
			this._itemLv.text = "Lv:" + level;
			this.updateBg(level);
			this._itemName.text = AttrDescTypeEx.getAttrName(this._itemInfo.attrList[0][0]);
			
			if(this._imgPath != null)Manager.loader.remove(this._imgPath,this.onLoadComplete,this);
			this._imgPath = Manager.path.getIconPath(this._itemInfo.imgId);
			Manager.loader.load(this._imgPath,this.onLoadComplete,this,ResourceGCType.COMMON);
		}
	}

	private updateBg(level:number):void
	{
		let index:number = -1;
		if(level >= 1 && level <= 3)
			index = 0;
		else if(level >= 4 && level <= 6)
			index = 1;
		else if(level >= 7 && level <= 8)
			index = 2;
		else if(level >= 9)
			index = 3;
		for(let i:number=0; i<this._kuangList.length; i++)
		{
			if(i == index)
				this._kuangList[i].visible = true;
			else
				this._kuangList[i].visible = false;
		}
	}

	private onLoadComplete(loader:Loader):void
	{
		this._gemImg.texture = loader.data;
	}

	public clean():void
	{
		this._addImg.visible = true;
		this._itemLv.text = "";
		this._itemName.text = "";
		this._gemImg.texture = null;
		this._redImg.visible = false;
		this._local = -1;
		this._itemInfo = null;
		this._itemId = 0;
		if(this._imgPath != null)Manager.loader.remove(this._imgPath,this.onLoadComplete,this);
		this._imgPath = null;
		this._canUseItemId = 0;
		this._itemTips.text = "";
		this._upgradeType = 0;
		for(let i:number=0; i<this._kuangList.length; i++)
			this._kuangList[i].visible = false;
		this._upgradeImg.visible = false;
		this._changeImg.visible = false;
	}

	public set canUseItemId(value:number)
	{
		this._canUseItemId = value;
		this._redImg.visible = (this._canUseItemId == 0 ? false : true);
	}

	public get canUseItemId():number
	{
		return this._canUseItemId;
	}

	public set upgradeType(value:number)
	{
		this._upgradeType = value;
		if(value == 2)
		{
			// this._itemTips.text = LangCVO.getContent("equip14");
			this._upgradeImg.visible = true;
		}
		else if(value == 3)
		{
			// this._itemTips.text = LangCVO.getContent("equip15");
			this._changeImg.visible = true;
		}
		else
			this._itemTips.text = "";
	}

	public get upgradeType():number
	{
		return this._upgradeType;
	}

	public get pos():number
	{
		return this._local;
	}

	public dispose():void
	{
		super.dispose();
		ObjectUtil.removes(this._kuang1, this._kuang2, this._kuang3, this._kuang4, this._upgradeImg, this._changeImg);

		this._itemBgImg = null;
		this._itemLv = null;
		this._gemImg = null;
		this._itemName = null;
		this._redImg = null;
		this._itemTips = null;
		this._itemInfo = null;
		if(this._imgPath != null)Manager.loader.remove(this._imgPath,this.onLoadComplete,this);
		this._imgPath = null;
		this._kuangList = null;
		this._upgradeImg = null;
		this._changeImg = null;
	}
}