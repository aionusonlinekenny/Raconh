/**
 * 称号列表按钮
 * liangyan
 * create 2017-11-29
*/
class TitleListBtn2 extends RenderSprite
{
    private _btn:Button;

    private _type:number;

    public constructor()
    {
        super();
        this.start();
        this.addEvent();
    }

    protected start():void
    {
        super.start();

        this.width = 239;
        this.height = 60;

        this._btn = new Button();
        this._btn.skinName = "Button6Skin";
        this.addChild(this._btn);
    }

    protected drawAll():void
    {
        super.drawAll();
        this.drawData();
    }

    protected draw():void
    {
        super.draw();
        if(this.isInvalid(InvalidationType.LAYOUT)) this.drawData();
    }

    private drawData():void
    {
        let cvos = TitleCVO.getCvosByType(this._type);
        if(!cvos) return;
        let count = 0;
        cvos.forEach((cvo, i) => 
        {
            if(cvo.isActived) count++;
        })
        this._btn.label = StringUtils.setParam(LangCVO.getContent("title" + this._type), count, cvos.length);
    }

    public getHeight():number
    {
        return this._btn.height;
    }

    public reuse(value:number):void
    {
        this._type = value;
        super.reuse();
        // this.invalidate(InvalidationType.DATA);
    }

    public unuse():void
    {
        super.unuse();
        // this._btn.dispose();
        // this._btn = null;

        this._type = -1;
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.remove(this._btn);
        if(this._btn)
            this._btn.dispose();
        this._btn = null;
    }
}