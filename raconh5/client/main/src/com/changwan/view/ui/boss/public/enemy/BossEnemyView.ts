/**
 * boss敌人
 * luzh
 * create 2017-12.25
*/
class BossEnemyView extends UIComponent implements IViewManager
{
    private _btn:eui.Image;
    private _arrow:eui.Image;
    private _group:eui.Group;
    private _items:Array<BossEnemyItem>;
    private _list:Array<BossPlayerInfo>;
    private _isShow:boolean = true;

    private ITEM_HEIGHT:number = 132;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("boss", "BossEnemyViewSkin");
        this.touchChildren = true;
    }

    public show():void
    {
        if(this.parent == null) 
        {
            this.y = 250;
            Manager.layer.tipsLayer.addChild(this);
        }
    }
    public hide():void
    {
        this.dispose();
    }

    protected configUI():void
    {
        super.configUI();

        this._items = [];
    }

    protected addEvent():void
    {
        super.addEvent();
        Manager.model.getBoss().addEventListener(BossEvent.ENEMY_LIST, this.updateList, this);
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
    }
    protected removeEvent():void
    {
        Manager.model.getBoss().removeEventListener(BossEvent.ENEMY_LIST, this.updateList, this);
        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        super.removeEvent();
    }

    private onTouchHandler(e:egret.TouchEvent)
    {
        this._isShow = !this._isShow;
		this.invalidate("drawShowList");
    }

    private updateList(e:egret.TouchEvent)
    {
		this.invalidate("drawList");
    }

    private drawList():void
    {
        this._list = Manager.model.getBoss().enemyList;
        let len:number = this._list.length;
        let max:number = len >= this._items.length ? len : this._items.length;
        for(let i:number=0; i<max; i++)
        {
            if(i<len)
            {
                if(i<this._items.length)
                {
                    this._items[i].info = this._list[i];
                }
                else
                {
                    let item:BossEnemyItem = new BossEnemyItem();
                    item.y = this.ITEM_HEIGHT * i;
                    item.info = this._list[i];
                    this._items.push(item);
                }
                ObjectUtil.addOrRemove(this._items[i], this._group, true);
            }
            else
            {
                ObjectUtil.addOrRemove(this._items[i], this._group, false);
            }
        }
        if(this._isShow) this.drawShowList();
    }

    private drawShowList():void
    {
        if(this._isShow)
        {
            this._arrow.scaleY = 1;
            this.addChild(this._group);
        }
        else
        {
            this._arrow.scaleY = -1;
            ObjectUtil.remove(this._group);
        }
    }

	protected draw():void
	{
		super.draw();
		if(this.isInvalid("drawList")) this.drawList();
		if(this.isInvalid("drawShowList")) this.drawShowList();
	}

    protected drawAll():void
    {
        super.drawAll();
        this.drawList();
        this.drawShowList();
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.removes(this._btn, this._arrow, this._group);
        for(let i:number=this._items.length-1; i>=0; i--)
        {
            this._items[i].dispose();
        }
        this._btn = null;
        this._arrow = null;
        this._group = null;
        this._items = null;
        this._list = null;
    }
}