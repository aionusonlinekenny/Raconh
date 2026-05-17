/**
 * 爬塔副本boss出现动画
 * liangyan
 * create 2017-12-28
*/
class TowerCopyBossView extends UIComponent implements IViewManager
{
    private _back:BitmapRemote;
    private _word:BitmapRemote;
    
    public constructor()
    {
        super();
		this.skinName = Manager.path.getSkinName("activity", "TowerCopyBossViewSkin");
    }

    protected configUI():void
    {
        super.configUI();
        this._back.load(Manager.path.getActivityPath("copy_tower_boss_back.png"));
        this._word.load(Manager.path.getActivityPath("copy_tower_boss_word.png"));
        this._back.alpha = 0;
        this._back.x = -720;
        this._word.alpha = 0;

        egret.Tween.get(this._back).to( {alpha: 1, x: 0}, 300, egret.Ease.circOut).call(this.tweenCallback1, this);
    }

    private tweenCallback1():void
    {
        egret.Tween.get(this._word).to( {alpha: 1}, 200)
                                       .to( {alpha: 0}, 200)
                                       .to( {alpha: 1}, 200)
                                       .to( {alpha: 0}, 200)
                                       .to( {alpha: 1}, 200).wait(200).call(this.tweenCallback2, this);
    }

    private tweenCallback2():void
    {
        Manager.view.hide(ViewID.TowerCopyBossView);
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

    private onResizeHandler(e:GlobalEvent):void
    {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
        this.y = Math.round(Manager.global.gameMain.stage.stageHeight - this.height) / 2;
		// this.width = Manager.global.gameMain.stage.stageWidth;
    }

    public show():void
    {
        if(!this.parent)
        {
            Manager.layer.tipsLayer.addChild(this);
            // Manager.control.getMap().view.setShake(0, 3000, 10);
            this.onResizeHandler(null);
        }
    }

    public hide():void
    {
        if(this.parent) this.dispose();
    }

    public dispose():void
    {
        egret.Tween.removeTweens(this._back);
        egret.Tween.removeTweens(this._word);
        super.dispose();
        ObjectUtil.disposes(this._back, this._word);
        this._back = null;
        this._word = null;
    }
}