/**
 * 市场吊牌
 * pzx
 * create 2018-4-11
 */
class MarketPlayerNameItem extends  ItemRenderer{
	private _di1Img:eui.Image;
	private _di2Img:eui.Image;
	private _name:Label;
	
	public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("market", "MarketPlayerNameItemSkin");
        this.touchChildren = false;
        this.touchEnabled = true;
    }
    protected createChildren():void
    {
        super.createChildren();
    }

  
	protected dataChanged():void
    {
        super.dataChanged();
        let info:MarketPlayNameInfo = this.data;
        this._name.text = info.name;
        this.setSelect(info.isClick);
    }

    public setSelect(boo:boolean):void
    {
        if(boo)
        {
             this._di1Img.visible = true;
             this._di2Img.visible = false;
             this._name.y = 100;
        }
        else
        {
            this._di1Img.visible = false;
            this._di2Img.visible = true;
            this._name.y = 60;
        }
        this.data.isClick = boo;
    }


    public dispose():void
    {
        ObjectUtil.removes(this._di1Img,this._di2Img);
        this._name.dispose();
        this. _di1Img=null;
        this. _di2Img=null;
        this. _name=null;
	
    }
}