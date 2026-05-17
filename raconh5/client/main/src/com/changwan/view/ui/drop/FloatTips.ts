/**
 * 浮动文本提示
 * luzhihong
 * create 2017-11-20
 */
class FloatTips
{
	private static _canAdd:boolean = true;
    private static _infoList:Array<FloatTipsInfo> = [];
    private static _itemList:Array<FloatTipsItem> = [];

    public static canAdd(value:boolean):void
    {
        this._canAdd = true;
        if(this._infoList.length > 0) this.addTipsItem();
    }

    public static addTips(str:string, color:number = Color.WHITE)
    {
		this._infoList.push(new FloatTipsInfo(str, color));
        if(this._canAdd) this.addTipsItem()
    }

    private static addTipsItem():void
    {
        this._canAdd = false;
        let item:FloatTipsItem = Manager.pool.create(FloatTipsItem, this._infoList.shift());
        this._itemList.push(item);
        for(var i:number=0, len=this._itemList.length; i<len-1; i++)
        {
            this._itemList[i].index = len-i-1;
        }
    }

    public static removeTipsItem(item:FloatTipsItem):void
    {
        if(item != null)
        {
            Manager.pool.push(item);
            let index:number = this._itemList.indexOf(item);
            if(index != -1) this._itemList.splice(index,1);
        }
    }
}


class FloatTipsItem extends UIComponent
{
	private START_Y:number = 460;

    private _name:Label;
    
    public constructor()
    {
        super();
		this.skinName = Manager.path.getSkinName("drop", "DropTipsItemSkin");
        this.touchEnabled = false;
    }
    
	public set index(value:number)
	{
		egret.Tween.get(this).to({y: this.START_Y - (this.height+2) * value}, 250, egret.Ease.circOut);
	}

	private tweenComplete():void
	{
		FloatTips.canAdd(true);
	}

	private remove():void
	{
		FloatTips.removeTipsItem(this);
	}
    
    public reuse(info:FloatTipsInfo):void
	{
        this.touchEnabled = this.touchChildren = false;
		this._name.textColor = info.color;
        HtmlUtil.setTextFlow(this._name, info.str);
		this.x = (Manager.config.gameWidth - this.width) >> 1;
		this.y = this.START_Y;
		this.alpha = 0;
		Manager.layer.tipsLayer.addChild(this);

		egret.Tween.get(this).to({alpha: 1}, 300).call(this.tweenComplete, this);
		Manager.render.add(this.remove, this, 1800, 1);
    }

	public unuse():void
	{
        egret.Tween.removeTweens(this);
		Manager.render.remove(this.remove, this);
		super.unuse();
	}
    
	public dispose():void
	{
        egret.Tween.removeTweens(this);
		Manager.render.remove(this.remove, this);
		super.dispose();
	}

}


class FloatTipsInfo
{
	public str:string;
	public color:number;
	    
    public constructor(str:string, color:number = Color.DEF)
    {
		this.str = str;
		this.color = color;
    }
}