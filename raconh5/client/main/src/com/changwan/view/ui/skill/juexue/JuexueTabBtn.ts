/**
 * 绝学秘籍按钮
 * pzx
 * create 18.2.26
 */
class JuexueTabBtn extends  ItemRenderer{
	private _bgImg:eui.Image;
	private _nameImg:eui.Image;
	private _redIcon:eui.Image;
	private _touch:boolean;
	private _model:JuexueModel;
	public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("juexue", "JuexueTabBtnSkin");
    }
    protected createChildren():void
    {
        super.createChildren();
		this._model = Manager.model.getjuexue()
		this.addEvent();
    }
	private addEvent():void
	{
		this._model.addEventListener(JuexueEvent.JUEXUE_UPGRADE_EVENT,this.showRedIcon,this);
	}
	private removeEvent():void
	{
		this._model.removeEventListener(JuexueEvent.JUEXUE_UPGRADE_EVENT,this.showRedIcon,this);
	}
  
	protected dataChanged():void
    {
        super.dataChanged();
		this._nameImg.source = "juexue_esoterica"+this.data.type+"_png";
		if(this.data.isSelected)
		{
			this._touch = this.data.isSelected;
			this.setImg();
			delete this.data.isSelected;
		}
		this.showRedIcon();
    }

	private showRedIcon():void
	{
		this._redIcon.visible = this._model.checkUpgrade(this.data.type);
	}

	public isSelected(touch:boolean)
	{
		this._touch = touch;
		if(this._loadCompltet)
		{
			this.setImg();
		}
	}
	private setImg():void
	{
		if(this._touch)
		{
			this._bgImg.source = "juexue_xuanzhong_png";
		}
		else
		{
			this._bgImg.source = "juexue_weixuanzhong_png";
		}
	}
	
    public dispose():void
    {
		this.removeEvent();
		super.dispose();
		ObjectUtil.removes(this._bgImg,this._nameImg,this._redIcon);
		this._bgImg=null;
		this._nameImg=null;
		this._redIcon=null;
		this._model=null;
    }
}