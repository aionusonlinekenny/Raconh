class LifeGridListItem extends ItemRenderer{
	private _titleTxt:Label;
	private _list:ItemObject[];
	private _txtList:egret.TextField[];
	private _itemInfoList:ItemsModelInfo[];
	public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("lifeGrid/lifegridview", "LifeGridListItemSkin");
		this._list = [];
		this._txtList = [];
		this._itemInfoList = [];
    }
    protected createChildren():void
    {
        super.createChildren();
    }

  
	protected dataChanged():void
    {
		let arr:ItemsCVO[] = this.data;
		let con:string = arr[0].condition;
		let condit:ConditionVO = new ConditionVO(con);
		this._titleTxt.text = StringUtils.setParam(LangCVO.getContent("lifeGrid4"),condit.value2);
		let ln:number = arr.length>this._list.length?arr.length:this._list.length;
		for(let i:number= 0;i<ln;i++)
		{
			if(this._list[i]== null)
			{
				this._list[i] = Manager.pool.create(ItemObject)
				this._list[i].x = i%4 * 150;
				this._list[i].y = Math.floor(i/4) * 150 + 50;
				this.addChild(this._list[i]);
			}
			let goods:ItemObject = this._list[i];
			if(this._txtList[i]== null)
			{
				this._txtList[i] =	Manager.pool.create(egret.TextField);
				this._txtList[i].x = goods.x;
				this._txtList[i].y = goods.y + 130;
				this._txtList[i].width = 141;
				this._txtList[i].textAlign = "center";
				this._txtList[i].textColor = 0x7C6E62;
				this._txtList[i].fontFamily = "Microsoft YaHei";
				this.addChild(this._txtList[i]);
			}
			let txt:egret.TextField = this._txtList[i];
			if(arr[i])
			{
				let itemInfo:ItemsModelInfo = Manager.pool.create(ItemsModelInfo);
				itemInfo.id = i + 1;
				itemInfo.base_id = arr[i].id;
				this._itemInfoList.push(itemInfo);
				goods.updateItemInfo([itemInfo]);
				txt.text = arr[i].name;
				goods.visible = true;
				txt.visible = true;
			}
			else
			{
				goods.visible = false;
				txt.visible = false;
			}
		}
		this.height = this._txtList[arr.length-1].y + 35;
	}

    public dispose():void
    {
        super.dispose();
	   this._titleTxt.dispose();
	   this._titleTxt = null;
	   this._txtList.forEach((obj,i)=>{
		   this.removeChild(obj);
		   Manager.pool.push(obj)
	   })
	   this._txtList = null;

	   this._list.forEach((obj,i)=>{
		   this.removeChild(obj);
		   Manager.pool.push(obj)
	   })
	   this._list = null;
	   if(this._itemInfoList)
	   {
			for(let info of this._itemInfoList)
			{
				if(info) Manager.pool.push(info);
				info = null;
			}
			this._itemInfoList = null;
	   }
    }
}