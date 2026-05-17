class SysPrivilegeItem extends UIComponent{
	private _itemImg:eui.Image;
	private _titleImg:eui.Image;
	private _desImg:eui.Image;
    private _id:number;
    private _data:SysPrivilegeInfo;
	public constructor()
    {
        super();
		this.skinName = Manager.path.getSkinName("sysprivilege", "SysPrivilegeItemSkin");
    }
    
    public setId(value:number):void
    {
        this._id = value;
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

    public setData(data:SysPrivilegeInfo):void
    {
        this._data = data;
        this.invalidate(InvalidationType.DATA);
    }
    private drawData():void
    {
        if(this._data== null) return;
        let png:string = "_png"
        if(this._id == 2)
        {
            this._titleImg.source = this._data.item2_titleImg;
            this._itemImg.source = this._data.item2_itemImg;
            if(this._data.id == 1)
            {
                this._itemImg.y = (this.height -79)/2;
                this._itemImg.x = 135;
            }
            else
            {
                this._itemImg.y = -6;
                this._itemImg.x = 178;
            }
        }
        else
        {
            this._itemImg.source = "sysprivilege_item"+this._id+png;
            this._titleImg.source = "sysprivilege_title"+this._id+png;
        }
        this._desImg.source = "sysprivilege_desc"+this._data.id+"_"+this._id+png;
    }


    public reuse():void
    {
        super.reuse();
       
    }

    public unuse():void
    {
        super.unuse();
		this.clear();
    }
	
	private clear(isRemove:boolean=false):void
	{
		if(isRemove)
		{
			ObjectUtil.removes(this._itemImg,this._titleImg,this._desImg);
		}
        this._itemImg=null;
        this._titleImg=null;
        this._desImg=null;
        this._data=null;
	}

    public dispose():void
    {
        super.dispose();
        this.clear(true);
    }

}