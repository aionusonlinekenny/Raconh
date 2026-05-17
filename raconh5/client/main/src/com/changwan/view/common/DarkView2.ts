/**
 *author Anydo
 *create 2018-4-20
 *description 
*/
class DarkView2 implements cw.IPool
{
    private _back:BitmapRes;

    private _isPanelDark:boolean;//true手机端panel遮挡 false普通模态遮挡

    public constructor()
    {   
    }

    public reuse(isPanelDark:boolean):void
    {
        this._isPanelDark = isPanelDark;
        this.initView();
        this.addEvent();
    }

    public unuse():void
    {
        this.dispose();
    }

    private initView():void
    {
        let url:string = this._isPanelDark ? "common_dark_bg_png" : "common_black_rect_png";
        let ww:number = Manager.global.gameMain.stage.$stageWidth;
        let hh:number = Manager.global.gameMain.stage.$stageHeight;
        this._back = BitmapRes.create(url, 0, 0, ww, hh);
        this._back.scale9Grid = new egret.Rectangle(2,2,16,16);
        this._back.touchEnabled = !this._isPanelDark;

        if(this._isPanelDark) Manager.layer.panelDarkLayer.addChildAt(this._back, 0);
        else Manager.layer.modalImageLayer.addChildAt(this._back, 0);
    }

    private addEvent():void
    {
        this._back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    }

    private removeEvent():void
    {
        this._back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    }

    private onResizeHandler(e:GlobalEvent):void
	{
        this._back.width = Manager.global.gameMain.stage.$stageWidth;
        this._back.height = Manager.global.gameMain.stage.$stageHeight;
	}

    private onClickHandler(e:egret.TouchEvent):void
    {
        if(Manager.view.isOpening(ViewID.BagEquipTips))
            Manager.view.hide(ViewID.BagEquipTips);
        if(Manager.view.isOpening(ViewID.EquipTips))
            Manager.view.hide(ViewID.EquipTips);
        if(Manager.view.isOpening(ViewID.ItemsTips))
            Manager.view.hide(ViewID.ItemsTips);
    }

    public setAlpha(value:number):void
    {
        this._back.alpha = value;
    }

    public dispose():void
    {
        this.removeEvent();
        Manager.pool.push(this._back);
        this._back = null;
    }
}