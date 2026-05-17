class BaseFuncBtn extends ItemRenderer
{
	private _effect:eui.Group;
	private _redIcon:eui.Image;
	private _changeEffect:Animation;
	
	public constructor()
	{
		super();

		this.skinName = Manager.path.getSkinName("common", "BaseFuncBtnSkin");

		if(!this._changeEffect)
		{
			this._changeEffect = Manager.animation.createEffectAnimation("funcChange");
			this._changeEffect.width = 258;
			this._changeEffect.height = 258;
			this._changeEffect.x = -76;
			this._changeEffect.y = -60;
		}
        if(!this._changeEffect.parent)
			this._effect.addChild(this._changeEffect);

		this._changeEffect.visible = false;
	}

	protected createChildren():void
	{
		super.createChildren();
		GameDispatcher.getInstance().dispatchEventWith(BaseUIEvent.ITEM_RENDERER_COMPLETE, false, BaseFuncBtn); //这里如以后有扩展可再修改
	}

	public setIconShow(boo:boolean):void
	{
		if(this.data)
		{
			if(boo)
			this.data.showRedIcon = true;
			else
			delete this.data.showRedIcon;
		}
		if(this._loadCompltet)
		{
			this._redIcon.visible = boo;
			return;
		}
	}

	protected dataChanged():void
    {
		this._changeEffect.visible = this.data.isSelected;
		this._redIcon.visible = this.data.showRedIcon as boolean;
	}

	public set isSelected(value:boolean)
	{
		this._changeEffect.visible = this.data.isSelected = value;
	}

	public dispose():void
	{
		if(this._effect && this._effect.parent)
			this._effect.parent.removeChild(this._effect);
		this._effect = null;
		if(this._redIcon && this._redIcon.parent)
			this._redIcon.parent.removeChild(this._redIcon)
		this._redIcon = null;
		if(this._changeEffect)
			Manager.pool.push(this._changeEffect);
		this._changeEffect = null;
		super.dispose();
	}
}