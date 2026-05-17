/**
 * 服饰列表展开子项
 * Simon
 * create 2018-4-16
*/
class FashionListItem2 extends RenderSprite
{
    private _back:BitmapRes;
    private _iconBack:BitmapRes;
    private _starBack:BitmapRes;
    private _img:BitmapRemote;
    private _iconWear:BitmapRes;
    private _redIcon:BitmapRes;
    private _name:TextField;
    private _desc:TextField;

    private _model:FashionModel;
    // private _stars:FashionStarView;
    private _cvo:FashionCVO;
    private _selected:boolean;

    public constructor()
    {
        super();
        this.touchChildren = true;
        this.start();
        this.addEvent();
    }

    protected start():void
    {
        super.start();

        this.width = 238;
        this.height = 119;

        this._model = Manager.model.getDress().fashionModel;

        this._back = BitmapRes.create("common_bg1_normal_png", 0, 0, 238, 119);
        this._back.touchEnabled = true;
        this.addChild(this._back);

        this._iconBack = BitmapRes.create("common_itemBg_png", 0, -11, 141, 141);
        this.addChild(this._iconBack);

        this._starBack = BitmapRes.create("skill_back1_png", 132, 67, 92, 24);
        this._starBack.height = 30;
        this.addChild(this._starBack);

        this._img = Manager.pool.create(BitmapRemote);
        this._img.x = 25;
        this._img.y = 18;
        this.addChild(this._img);

        this._iconWear = BitmapRes.create("common_dangqian_png", 0, 0, 40, 64);
        this.addChild(this._iconWear);

        this._redIcon = BitmapRes.create("common_red_icon_png", 206, 0, 35, 35);
        this.addChild(this._redIcon);

        this._name = TextField.create(110, 22);
        this._name.move(123,28);
        this._name.textColor = Color.DEF;
        this._name.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._name.textAlign = egret.HorizontalAlign.CENTER;
        this._name.fontFamily = "Microsoft YaHei";
        this._name.size = 22;
        this.addChild(this._name);

        this._desc = TextField.create(110, 22);
        this._desc.move(123,70);
        this._desc.textColor = Color.DEF;
        this._desc.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._desc.textAlign = egret.HorizontalAlign.CENTER;
        this._desc.fontFamily = "Microsoft YaHei";
        this._desc.size = 22;
        this.addChild(this._desc);
    }

    protected drawAll():void
    {
        super.drawAll();
        this.drawWearing();
        this.drawUpdate();
        this.drawRedIcon();
    }

    protected draw():void
	{
		super.draw();
		if(this.isInvalid("drawWearing")) this.drawWearing();
		if(this.isInvalid("drawUpdate")) this.drawUpdate();
		if(this.isInvalid("drawUpdate", "drawItemUpdate")) this.drawRedIcon();
	}

    protected addEvent():void
    {
        super.addEvent();
        this._back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._model.addEventListener(FashionEvent.WEARING, this.onWearing, this);
        this._model.addEventListener(FashionEvent.UPDATE, this.onUpdate, this);
        this._model.addEventListener(FashionEvent.SELECTED, this.onSelectedHandler, this);
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onItemUpdate, this);
    }

    protected removeEvent():void
    {
        this._back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        if(this._model)
        {
            this._model.removeEventListener(FashionEvent.WEARING, this.onWearing, this);
            this._model.removeEventListener(FashionEvent.UPDATE, this.onUpdate, this);
            this._model.removeEventListener(FashionEvent.SELECTED, this.onSelectedHandler, this);
        }
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onItemUpdate, this);
        super.removeEvent();
    }

    private onTouchHandler(e:egret.TouchEvent):void
    {
        if(this._selected) return;
        this._model.dispatchEvent(new FashionEvent(FashionEvent.SELECTED, this._cvo));
    }

    private onWearing(e:FashionEvent):void
    {
        this.invalidate("drawWearing");
    }

    private drawWearing():void
    {
        this._iconWear.visible = this._cvo.isWearing;
    }

    private onUpdate(e:FashionEvent):void
    {
        if(this._cvo.id == (e.params as FashionCVO).id) this.invalidate("drawUpdate");
    }

    private drawUpdate():void
    {
        if(this._cvo.isActived)
        {
            this._iconBack.filters = null
            this._starBack.visible = true;
            this._desc.text = "星数：" + this._cvo.star;
            this._desc.textColor = Color.GREEN;
        }
        else
        {
            FilterUtil.setGrayFilter(this._iconBack);
            this._starBack.visible = false;
            this._desc.text = this._cvo.desc;
            this._desc.textColor = Color.DEF;
        }
        if(this._cvo == Manager.model.getDress().fashionModel.defaultData)
        {
            this.onTouchHandler(null);
            Manager.model.getDress().fashionModel.defaultData = null;
        }
    }

    private onSelectedHandler(e:BaseUIEvent):void
    {
        this.selected = this._cvo.id == (e.params as FashionCVO).id;
    }

    private set selected(value:boolean)
    {
        if(this._selected == value) return;
        this._selected = value;
        this._back.source = this._selected ? "common_xuanzhong1_png" : "common_bg1_normal_png";
    }

    private onItemUpdate(e:ItemsEvent):void
    {
        if(e.params == ItemsType.BAG) this.invalidate("drawItemUpdate");
    }

    private drawRedIcon():void
    {
        this._redIcon.visible = this._cvo.canActiveOrUp;
    }

    public reuse(cvo:FashionCVO):void
    {
        this._cvo = cvo;
        super.reuse();

        let starCVO:FashionStarCVO = FashionStarCVO.getCVO(this._cvo.id, 1);
        this._img.load(Manager.path.getIconPath(starCVO.loss.item.cvo.imgId));
        this._back.source = this._selected ? "common_xuanzhong1_png" : "common_bg1_normal_png";
        this._name.text = this._cvo.name;
    }

    public unuse():void
    {
        super.unuse();
        this._model = null;
        this._cvo = null;
        this._selected = false;
    }

    public dispostSelf():void
    {
        super.disposeSelf();

        ObjectUtil.removes(this._back, this._iconBack, this._img, this._iconWear, this._redIcon, this._name, this._desc);

        if(this._back)
            Manager.pool.push(this._back);
        this._back = null;

        if(this._iconBack)
            Manager.pool.push(this._iconBack);
        this._iconBack = null;

        if(this._img)
            Manager.pool.push(this._img);
        this._img = null;

        if(this._iconWear)
            Manager.pool.push(this._iconWear);
        this._iconWear = null;

        if(this._redIcon)
            Manager.pool.push(this._redIcon);
        this._redIcon = null;

        if(this._name)
            Manager.pool.push(this._name);
        this._name = null;

        if(this._desc)
            Manager.pool.push(this._desc);
        this._desc = null;

        this._model = null;

        if(this._starBack)
            Manager.pool.push(this._starBack);
        this._starBack = null;

        this._cvo = null;
    }
}