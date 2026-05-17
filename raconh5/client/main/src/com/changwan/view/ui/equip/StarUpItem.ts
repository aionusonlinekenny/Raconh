/**
 * 升星 item
 * drq
 *  2018.04.12
 */
class StarUpItem extends ItemRenderer
{
	public _item:BaseGoods;
    public _state:boolean = false;//是否已经选中
   

	public constructor() 
    {
		super();
        this.skinName = Manager.path.getSkinName("equip", "StarUpItemSkin");
		this.initView();
	}
	
	private initView():void
    {
        this._item = Manager.pool.create(BaseGoods);
        this.addChild(this._item);
    }

    protected createChildren():void//加载完皮肤执行
    {
        super.createChildren();
        this._item.touchEnabled = false;
        this._item.touchChildren = false;
         this.touchEnabled = false;

         this.addEvent();
         //this._item.setStar(this._data.getStar());
    }

    private addEvent():void
    {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
    }

    private removeEvent():void
    {
         this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
    }

    private onClickHandler():void
    {
        let view = Manager.view.getView(ViewID.EquipPanel) as EquipPanel;
        if(view.curView._itemMaindata)
        {
            if(this._state)//已选中
            {
                this._state = false;
                this.filters = [];
                for(let i=0;i< view.curView._itemsData.length;i++)
               {
                   if(view.curView._itemsData[i] == this.data)
                   {
                       view.curView._itemsData[i] = null;
                       break;
                   }
               }
            }else{//未选中
                this._state = true;
                //this._item.selected = true;
                this.filters = [FilterUtil.getBrightFilter(-40)];
               for(let i=0;i< view.curView._itemsData.length;i++)
               {
                   if(view.curView._itemsData[i] == null)
                   {
                       view.curView._itemsData[i] = this.data;
                       break;
                   }
               }
            }
             view.curView.createTopItem();
        }else{
            FloatTips.addTips(LangCVO.getContent("starUp3"), Color.RED);
        }
    }

	protected dataChanged():void
    {
        super.dataChanged();
        this._item.setCvo(this.data.cvo);
        this._item.setStar(this.data.getStar());
        // let info:ItemsModelInfo = this.data as ItemsModelInfo;
        // if(info)
        // {
        //     this._item.data = info;
        // }
        if(this.data.base_id)
        {
            this.touchEnabled = true;
        }
        else{
            this.touchEnabled = false;
        }
    }

    public dispose():void
    {
        super.dispose();
        this.removeEvent();
    }
}