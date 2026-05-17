/**
 * 转生成功动画
 * liangyan
 * create 2017-12-15
*/
class ReinSuccView extends UIComponent implements IViewManager
{
    private _bmp:BitmapRemote;

    private _eff:Animation;
    private _succ:Animation;

    private _index:number;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("rein", "ReinSuccViewSkin");
    }

    protected configUI():void
    {
        super.configUI();
    }

    protected addEvent():void
    {
        super.addEvent();
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    }

    protected removeEvent():void
    {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        super.removeEvent();
    }

    protected initData():void
    {
        super.initData();
        // this.onResizeHandler(null);
    }

    private onResizeHandler(e:GlobalEvent):void
    {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
        this.y = Math.round(Manager.global.gameMain.stage.stageHeight - this.height) / 2;
    }

    private close():void
    {
        Manager.render.remove(this.close, this);
        Manager.view.hide(ViewID.ReinSuccView);
    }

    private playEff():void
    {
        this._index++;
        if(this._index == 3)
        {
            Manager.render.remove(this.playEff, this);
            if(this._succ) Manager.pool.push(this._succ);
            this._succ = Manager.animation.createEffectAnimation("reinSucc", 0, true, true);
            this.addChild(this._succ);
        }
    }

    private miss():void
    {
        egret.Tween.get(this._bmp, {loop: false}).to({x:70, alpha:0}, 1000).call(this.missCallback, this);
    }

    private missCallback():void
    {
        Manager.render.add(this.close, this, 0, 1);
    }

    private showCallback():void
    {
        Manager.render.add(this.miss, this, 500, 1);
    }

    public show():void
    {
        if(!this.parent)
        {
            Manager.layer.tipsLayer.addChild(this);
            Manager.control.getMap().view.setShake(0, 2000, 10);
            this.onResizeHandler(null);
            this._bmp.load(Manager.path.getReinPath("rein_succ_" + Manager.model.self.attrInfo.career + "00" + (Manager.model.self.attrInfo.zhuanshu + 2), Extension.PNG));
            this._bmp.x = -300;
            this._bmp.y = 130;
            egret.Tween.get(this._bmp, {loop: false}).to({x:0}, 800).call(this.showCallback, this);
            if(this._eff) Manager.pool.push(this._eff);
            this._eff = Manager.animation.createEffectAnimation("reinEff", 0, true, true);
            this.addChildAt(this._eff, 0);

            this._index = 0;
            Manager.render.add(this.playEff, this);
        }
    }

    public hide():void
    {
        if(this.parent) this.dispose();
    }

    public dispose():void
    {
        if(Manager.render.contains(this.close, this)) Manager.render.remove(this.close, this);
        if(Manager.render.contains(this.playEff, this)) Manager.render.remove(this.playEff, this);
        super.dispose();
        ObjectUtil.removes(this._bmp, this._eff, this._succ);
        this._bmp.dispose();
        this._bmp = null;
        if(this._eff) Manager.pool.push(this._eff);
        this._eff = null;
        if(this._succ) Manager.pool.push(this._succ);
        this._succ = null;
    }
}