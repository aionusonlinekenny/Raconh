/**
 * 银币副本buff解锁界面
 * luzhihong
 * create 2018.1.19
 */
class CopyBuffUnlockView extends UIComponent implements IViewManager
{
    private _btn:eui.Image;
    private _coolingImg:CoolingImage;
    private _endTime:number;
    private _totalTime:number;
    
    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("activity", "CopyBuffUnlockViewSkin");
        this.touchChildren = true;
    }

    public show(left:number, totalTime:number):void
    {
        this._endTime = left + egret.getTimer()/1000;
        this._totalTime = totalTime;
        if(this.parent == null)
        {
            Manager.layer.tipsLayer.addChildAt(this, 0);
            this.onResizeHandler(null);
        }
    }

    public hide():void
    {
        this.dispose();
    }

    protected configUI():void
    {
        super.configUI();
        this._coolingImg = new CoolingImage(50);
        this._coolingImg.x = this._btn.x + 55;
        this._coolingImg.y = this._btn.y + 55;
        this.addChildAt(this._coolingImg, 0);

        Manager.render.add(this.countDown, this, 200);
        this.countDown();
    }
    
    private countDown():void
    {
        let left:number = this._endTime - egret.getTimer()/1000;
        if(left > 0) this._coolingImg.setSchedule(this._totalTime - left, this._totalTime);
        else Manager.view.hide(ViewID.CopyBuffUnlockView);
    }

    protected addEvent():void
    {
        super.addEvent();

        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
    }

    protected removeEvent():void
    {
        super.removeEvent();

        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
    }

    private onResizeHandler(e:GlobalEvent):void
    {
        this.x = Math.round((Manager.config.gameWidth - this.width) >> 1);
        this.y = Math.round((Manager.config.gameHeight - this.height) >> 1);
    }

    private _lastClickTime:number=0;
    private onClickHandler(e:egret.TouchEvent):void
    {
        if(egret.getTimer() - this._lastClickTime < 200) return;
        this._lastClickTime = egret.getTimer();
        
        Manager.control.getCopy().buffUnlock();
        Manager.view.hide(ViewID.CopyExpResultView);
    }

    public dispose():void
    {
        Manager.render.remove(this.countDown, this);
        super.dispose();
        ObjectUtil.remove(this._btn);
        ObjectUtil.dispose(this._coolingImg);
        this._btn = null;
        this._coolingImg = null;
    }
}