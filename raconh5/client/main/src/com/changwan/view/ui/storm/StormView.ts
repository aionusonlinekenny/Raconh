/**
 * 江湖风云
 * luzh
 * 2018-4.20
 */
class StormView extends RenderSprite
{
    private _back:BitmapRemote;
    private _items:Array<StormFieldItem>;
    private _infoView:StormInfoView;
    private _txt:TextField;

    public constructor()
    {
        super();
    }

    public start():void
    {
        super.start();
        
        this._back = Manager.pool.create(BitmapRemote, Manager.path.getStormPath("back.jpg"));
        this._back.y = 115;
        this.addChild(this._back);

        this._items = [];
        let cvos:Object = StormFieldCVO.getCVOs();
        let cvo:StormFieldCVO;
        let item:StormFieldItem;
        for(let key in cvos)
        {
            cvo = cvos[key];
            item = ObjectUtil.createObj(StormFieldItem, cvo.id, cvo.pos);
            this.addChild(item);
            this._items.push(item);
        }

        this._infoView = ObjectUtil.createObj(StormInfoView);
        this.addChild(this._infoView);
        
        this._txt = TextField.create(300, 40, Color.DEF, 26);
        this._txt.move(18, 120);
        this._txt.text = LangCVO.getContent("storm1") + Manager.model.self.attrInfo.guildName;
        this.addChild(this._txt);
    }

    public reuse():void
    {
        super.reuse();
		this.touchChildren = true;
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.disposes(this._back, this._infoView);
        for(let i:number=this._items.length-1; i>=0; i--)
        {
            ObjectUtil.dispose(this._items[i]);
        }
        this._back = null;
        this._items = null;
        this._infoView = null;
    }
}