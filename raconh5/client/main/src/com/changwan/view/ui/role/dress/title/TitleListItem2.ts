/**
 * 称号列表展开子项
 * liangyan
 * create 2017-11-29
*/
class TitleListItem2 extends RenderSprite
{
    private _back:BitmapRes;
    private _img:BitmapRemote;
    private _isWearing:BitmapRes;
    private _redIcon:BitmapRes;

    private _cvo:TitleCVO;
    private _selected:boolean;

    private readonly RED_ICON = "red_icon";

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
        this.height = 91;

        this._back = BitmapRes.create("common_bg1_normal_png", 0, 0, 238, 91);
        this._back.touchEnabled = true;
        this.addChild(this._back);

        this._img = Manager.pool.create(BitmapRemote);
        this.addChild(this._img);

        this._isWearing = BitmapRes.create("common_dangqian_png", 0, 0, 40, 64);
        this.addChild(this._isWearing);

        this._redIcon = BitmapRes.create("common_red_icon_png", 206, -3, 35, 35);
        this.addChild(this._redIcon);
    }

    protected addEvent():void
    {
        super.addEvent();
        this._back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        Manager.model.getDress().titleModel.addEventListener(TitleEvent.TITLE_SELECTED, this.onSelectedHandler, this);
        Manager.model.getDress().titleModel.addEventListener(TitleEvent.TITLE_LIST, this.onTitleHandler, this);
        Manager.model.getDress().titleModel.addEventListener(TitleEvent.TITLE_ACT_SUCC, this.onTitleHandler, this);
        Manager.model.getDress().titleModel.addEventListener(TitleEvent.TITLE_WEAR, this.onTitleHandler, this);
        Manager.model.getDress().titleModel.addEventListener(TitleEvent.TITLE_TAKE_OFF, this.onTitleHandler, this);
        Manager.model.getDress().titleModel.addEventListener(TitleEvent.TITLE_GAIN, this.onTitleHandler, this);
        Manager.model.getDress().titleModel.addEventListener(TitleEvent.TITLE_DELETE, this.onTitleHandler, this);
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onItemHandler, this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
        this._back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        Manager.model.getDress().titleModel.removeEventListener(TitleEvent.TITLE_SELECTED, this.onSelectedHandler, this);
        Manager.model.getDress().titleModel.removeEventListener(TitleEvent.TITLE_LIST, this.onTitleHandler, this);
        Manager.model.getDress().titleModel.removeEventListener(TitleEvent.TITLE_ACT_SUCC, this.onTitleHandler, this);
        Manager.model.getDress().titleModel.removeEventListener(TitleEvent.TITLE_WEAR, this.onTitleHandler, this);
        Manager.model.getDress().titleModel.removeEventListener(TitleEvent.TITLE_TAKE_OFF, this.onTitleHandler, this);
        Manager.model.getDress().titleModel.removeEventListener(TitleEvent.TITLE_GAIN, this.onTitleHandler, this);
        Manager.model.getDress().titleModel.removeEventListener(TitleEvent.TITLE_DELETE, this.onTitleHandler, this);
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onItemHandler, this);
    }

    protected drawAll():void
    {
        super.drawAll();
        this.drawData();
        this.drawRedIcon();
    }

    protected draw():void
    {
        super.draw();
        if(this.isInvalid(InvalidationType.DATA)) this.drawData();
        if(this.isInvalid(this.RED_ICON)) this.drawRedIcon();
    }

    private drawData():void
    {
        if(!this._cvo) return;
        this._img.reuse(null);
        this._img.load(Manager.path.getTitlePath(this._cvo.resID));
        this._img.x = 20;
        this._img.y = 20;
        this._cvo.isActived ? this._img.filters = null : FilterUtil.setGrayFilter(this._img);
        this._back.reuse(this._selected ? "common_xuanzhong1_png" : "common_bg1_normal_png", null, null, 239, 91);
        this._isWearing.visible = this._cvo.isUsing;
        if(this._cvo == Manager.model.getDress().titleModel.defaultData)
        {
            this.onTouchHandler(null);
            Manager.model.getDress().titleModel.defaultData = null;
        }
    }

    private drawRedIcon():void
    {
        this._redIcon.visible = this._cvo.loss.isEnough();
    }

    private onTouchHandler(e:egret.TouchEvent):void
    {
        if(this._selected) return;
        Manager.model.getDress().titleModel.dispatchEvent(new TitleEvent(TitleEvent.TITLE_SELECTED, this._cvo.templateID));
    }

    private onSelectedHandler(e:BaseUIEvent):void
    {
        if(this._cvo.templateID != e.params) this._selected = false;
        else this._selected = true;
        this._back.reuse(this._selected ? "common_xuanzhong1_png" : "common_bg1_normal_png", null, null, 238, 91);
    }

    private onTitleHandler(e:TitleEvent):void
    {
        if(e.type == TitleEvent.TITLE_LIST || e.params == this._cvo.templateID) this.invalidate(InvalidationType.DATA);
    }

    private onItemHandler(e:ItemsEvent):void
    {
        if(e.params == ItemsType.BAG) this.invalidate(this.RED_ICON);
    }

    public reuse(cvo:TitleCVO):void
    {
        this.touchChildren = true;
        this._cvo = cvo;
        this._selected = false;
        super.reuse();
    }

    public unuse():void
    {
        super.unuse();
        // if(this._back)
        // {
        //     Manager.pool.push(this._back);
        //     this._back = null;
        // }
        // if(this._btn)
        // {
        //     this._btn.dispose();
        //     this._btn = null;
        // }
        // if(this._img)
        // {
        //     Manager.pool.push(this._img);
        //     this._img = null;
        // }
        // if(this._isWearing)
        // {
        //     this._isWearing.bitmapData = null;
        //     this._isWearing = null;
        // }

        // this._cvo = null;
        // this._selected = false;
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.removes(this._back, this._img, this._isWearing, this._redIcon);
        if(this._back)
        {
            Manager.pool.push(this._back);
            this._back = null;
        }
        if(this._img)
        {
            Manager.pool.push(this._img);
            this._img = null;
        }
        if(this._isWearing)
        {
            Manager.pool.push(this._isWearing);
            this._isWearing = null;
        }
        if(this._redIcon)
            Manager.pool.push(this._redIcon);
        this._redIcon = null;

        this._cvo = null;
        this._selected = false;
    }
}