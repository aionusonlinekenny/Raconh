/**
 * 宠物喂养界面
 * liangyan
 * create 2017-12-16
*/
class PetFeedView extends UIComponent implements IViewManager
{
    private _baseView:BasePopUpView;
    private _item0:PetFeedItem;
    private _item1:PetFeedItem;

    public constructor()
    {
        super();
        this.touchChildren = true;
        this.skinName = Manager.path.getSkinName("pet", "PetFeedViewSkin");
    }

    protected configUI():void
    {
        super.configUI();
        this._baseView.titleImg.source = "pet_feed_label2_png";
        this._baseView.diImgVisible = false;
        this._baseView.bgHeight = 370;
    }

    protected addEvent():void
    {
        super.addEvent();
        this._baseView.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    }

    protected removeEvent():void
    {
        this._baseView.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        super.removeEvent();
    }

    protected drawAll():void
    {
        super.drawAll();
        this.drawLayout();
    }

    protected draw():void
    {
        super.draw();
        if(this.isInvalid(InvalidationType.LAYOUT)) this.drawLayout();
    }

    private drawLayout():void
    {
        this._item0.reuse(ItemsConst.PET_ZZD);
        this._item1.reuse(ItemsConst.PET_WXD);
    }

    private onTouchHandler(e:egret.TouchEvent):void
    {
        Manager.view.hide(ViewID.PetFeedView);
    }

    private onResizeHandler(e:GlobalEvent):void
    {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
    }

    public show():void
    {
        if(!this.parent)
        {
            this.onResizeHandler(null);
            Manager.layer.tipsLayer.addChild(this);
            this.invalidate(InvalidationType.LAYOUT);
        }
    }

    public hide():void
    {
        if(this.parent) this.dispose();
    }

    public reuse():void
    {
        super.reuse();
    }

    public unuse():void
    {
        super.unuse();
        this._baseView.dispose();
        this._baseView = null;
        this._item0.dispose();
        this._item0 = null;
        this._item1.dispose();
        this._item1 = null;
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.removes(this._baseView, this._item0, this._item1);
        this._baseView.dispose();
        this._baseView = null;
        this._item0.dispose();
        this._item0 = null;
        this._item1.dispose();
        this._item1 = null;
    }
}