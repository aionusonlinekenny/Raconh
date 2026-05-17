/**
 * 魔神降临进入、离开抢夺效果
 * liangyan
 * create 2018-04-24
*/
class DevilGrabEff extends egret.DisplayObjectContainer implements IViewManager
{
    private _img:BitmapRes;

    private _targetW:number;
    private _targetH:number;
    private _stageW:number;
    private _stageH:number;
    private _isShow:boolean;

    private readonly IMG_W:number = 300;
    private readonly IMG_H:number = 300;

    public constructor()
    {
        super();
        this._stageW = 0;
        this._stageH = 0;

        this.start();
        this.addEvent();
    }

    private start():void
    {
        this._img = BitmapRes.create("devil_change_map_png", 0, 0, -1, -1, this.loadFinish, this);
        this.addChild(this._img);
    }

    private addEvent():void
    {
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    }

    private removeEvent():void
    {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    }

    private onResizeHandler(e:GlobalEvent):void
    {
        if(e != null || this._stageW == 0 || this._stageH == 0)
        {
            this._stageW = Manager.global.gameMain.stage.stageWidth;
            this._stageH = Manager.global.gameMain.stage.stageHeight;
        }
        this.x = Math.round(this._stageW - this.width) / 2;
        this.y = Math.round(this._stageH - this.height) / 2;
    }

    private loadFinish():void
    {
        if(this._stageW == 0 || this._stageH == 0)
        {
            this._stageW = Manager.global.gameMain.stage.stageWidth;
            this._stageH = Manager.global.gameMain.stage.stageHeight;
        } 
        this._targetW = Math.ceil(this._stageW / this.IMG_W + 6) * this.IMG_W;
        this._targetH = Math.ceil(this._stageH / this.IMG_H + 6) * this.IMG_H;
        Manager.render.add(this.render, this, 0, 0, null, true);
    }

    private render():void
    {
        if(!this._img) return;
        if(this._isShow)
        {
            this._img.width += 210;
            this._img.height += 105;
        }
        else this._img.width -= 210;
        this.onResizeHandler(null);
        if(this._img.width >= this._targetW && this._img.height >= this._targetH) this._isShow = false;
        else if(this._img.width < this.IMG_W)
        {
            Manager.render.remove(this.render, this);
            this.hideView();
        }
    }

    private hideView():void
    {
        Manager.view.hide(ViewID.DevilGrabEff);
    }

    public show():void
    {
        if(!this.parent)
        {
            this._isShow = true;
            this.onResizeHandler(null);
            Manager.layer.tipImageLayer.addChild(this);
        }
    }

    public hide():void
    {
        if(this.parent) this.dispose();
    }

    public dispose():void
    {
        Manager.render.remove(this.render, this);
        this.removeEvent();
        if(this._img) Manager.pool.push(this._img);
        this._img = null;
    }
}