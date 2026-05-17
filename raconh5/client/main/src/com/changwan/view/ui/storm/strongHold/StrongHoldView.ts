/**
 * 江湖风云区域视图
 * luzh
 * 2018-4.20
 */
class StrongHoldView extends RenderSprite
{
    private _back:BitmapRemote;
    private _icon1:BitmapRes;
    private _icon2:BitmapRes;
    private _icon3:BitmapRes;
    private _items:Array<StrongHoldItem>;
    private _infoView:StormInfoView;

    public constructor()
    {
        super();
    }

    public start():void
    {
        super.start();
        
        this._back = Manager.pool.create(BitmapRemote);
        this._back.y = 100;
        this.addChild(this._back);
        
        this._icon1 = BitmapRes.create("storm_icon_1");
        this.addChild(this._icon1);
        this._icon2 = BitmapRes.create("storm_icon_2");
        this.addChild(this._icon2);
        this._icon3 = BitmapRes.create("storm_icon_3");
        this.addChild(this._icon3);

        this._items = [];
        let item:StrongHoldItem;
        for(let i:number=0; i<7; i++)
        {
            item = ObjectUtil.createObj(StrongHoldItem);
            this.addChild(item);
            this._items.push(item);
        }
        
        this._infoView = ObjectUtil.createObj(StormInfoView);
        this.addChild(this._infoView);
    }

    public set fieldID(value:number)
    {
        let cvos:Array<StormStrongHoldCVO> = StormStrongHoldCVO.getCVOsByFieldID(value);
        for(let i:number=0; i<7; i++)
        {
            this._items[i].cvo = cvos[i];
        }
    }

    public reuse():void
    {
        super.reuse();
		this.touchChildren = true;
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.pushes(this._back, this._icon1, this._icon2, this._icon3, this._infoView);
        for(let i:number=this._items.length-1; i>=0; i--)
        {
            ObjectUtil.dispose(this._items[i]);
        }
        this._back = null;
        this._icon1 = null;
        this._icon2 = null;
        this._icon3 = null;
        this._items = null;
        this._infoView = null;
    }
}