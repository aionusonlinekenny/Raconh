/**
 * 服饰列表按钮
 * Simon
 * create 2018-4-16
*/
class FashionListBtn2 extends RenderSprite
{
    private _btn:Button;
    private _cvos:Array<FashionCVO>;

    public constructor()
    {
        super();
        this.touchEnabled = true;
        this.start();
        this.addEvent();
    }

    protected start():void
    {
        super.start();

        this.height = 60;

        this._btn = new Button();
        this._btn.skinName = "Button6Skin";
        this.addChild(this._btn);
    }

    protected addEvent():void
    {
        super.addEvent();
        Manager.model.getDress().fashionModel.addEventListener(FashionEvent.UPDATE, this.onUpdate, this);
    }

    protected removeEvent():void
    {
        Manager.model.getDress().fashionModel.removeEventListener(FashionEvent.UPDATE, this.onUpdate, this);
        super.removeEvent();
    }

    private onUpdate(e:FashionEvent):void
    {
        if(this._cvos[0].type == (e.params as FashionCVO).type) this.invalidate("drawUpdate");
    }

    protected drawUpdate():void
	{
        let count = 0;
        this._cvos.forEach((cvo:FashionCVO, i:number) => 
        {
            if(cvo.isActived) count++;
        })
        this._btn.label = StringUtils.setParam(LangCVO.getContent("title" + this._cvos[0].type), count, this._cvos.length);
	}

	protected draw():void
	{
		super.draw();
		if(this.isInvalid("drawUpdate")) this.drawUpdate();
	}

    protected drawAll():void
    {
        super.drawAll();
        this.drawUpdate();
    }

    public getHeight():number
    {
        return this._btn.height;
    }

    public reuse(value:Array<FashionCVO>):void
    {
        this._cvos = value;
        super.reuse();
    }

    public unuse():void
    {
        super.unuse();
        this._cvos = null;
    }

    public disposeSelf():void
    {
        super.disposeSelf();
        ObjectUtil.remove(this._btn);
        if(this._btn)
            this._btn.dispose();
        this._btn = null;
        this._cvos = null;
    }
}