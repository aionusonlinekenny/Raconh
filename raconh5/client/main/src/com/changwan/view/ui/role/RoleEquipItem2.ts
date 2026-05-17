class RoleEquipItem2 extends egret.DisplayObjectContainer
{
    private _equipItem:EquipItem;
    private _addImg:BitmapRes;
    private _pos:number;

    public constructor(pos:number)
    {
        super();
        this._pos = pos;
        this.touchChildren = false;
        this.touchEnabled = true;
        this.start();
        this.addEvent();
    }

    private start():void
    {
        this._equipItem = Manager.pool.create(EquipItem);
        this._equipItem.width = 141;
        this._equipItem.height = 141;
        this._equipItem.skinName = "BaseGoodsSkin";
        this._equipItem.clear();
        this.addChild(this._equipItem);

        this._addImg = BitmapRes.create("role_add_png", 38, 38, 65, 65);
        this.addChild(this._addImg);
    }

    private addEvent():void
    {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    }

    private removeEvent():void
    {
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    }

	private onClickHandler(e:egret.TouchEvent):void
	{
		if(this._equipItem && this._equipItem.baseId > 0)
        {
            Manager.view.show(ViewID.EquipTips, this._equipItem.cvo, this._equipItem._data);
        }
        else
        {
            let info:ItemsModelInfo = Manager.model.getItems().getCanUseBestEquip(this._pos);
            if(info)
            {
                Manager.control.getItems().moveItems(info.storagetype, ItemsType.EQUIE, info.pos);
            }
        }
	}

    public dispose():void
    {
        if(this.parent != null)this.parent.removeChild(this);
        if(this._equipItem != null)
        {
            Manager.pool.push(this._equipItem);
            this._equipItem = null;
        }
        if(this._addImg != null)
        {
            Manager.pool.push(this._addImg);
            this._addImg = null;
        }
    }

    public clear():void
    {
        this._equipItem.clear();   
		this._equipItem.selected = false;
		this._addImg.visible = true;
    }

    public updateRoleInfo(info:ItemsModelInfo):void
    {
        this._equipItem.data = info;
        this._addImg.visible = false;
    }
}
