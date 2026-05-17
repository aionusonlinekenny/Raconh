/**
 * 降龙十八掌技能图标飞向首充图标
 * liangyan
 * create 2018-03-12
*/
class SkillIconFlyEffect extends egret.DisplayObjectContainer implements IViewManager
{
    private _aniIcon:Animation;

    public constructor()
    {
        super();
        this.initView();
        this.addEvent();
    }

    private initView():void
    {
        this._aniIcon = Manager.animation.createEffectAnimation("zqqg");
        this._aniIcon.gotoAndStop(1);
        this.addChild(this._aniIcon);
    }

    private addEvent():void
    {
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    }

    private removeEvent():void
    {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    }

    private tweenCallBack():void
    {
        Manager.model.getLogin().home.switch(HomeView2.FIRST_CHARGE, true, true);
        Manager.view.hide(ViewID.SkillIconFlyEffect);
    }

    private onResizeHandler(e:GlobalEvent):void
    {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - 105) / 2;
        this.y = Math.round(Manager.global.gameMain.stage.stageHeight - 105) / 2;
    }

    public show():void
    {
        this.onResizeHandler(null);
        if(!this.parent)
        {
            Manager.model.getLogin().home.switch(HomeView2.FIRST_CHARGE, false, true);
            let pos:egret.Point = Manager.model.getLogin().home.getGlobalPos(HomeView2.FIRST_CHARGE);
            egret.Tween.get(this).wait(2000).to({x:pos.x, y:pos.y}, 2000).call(this.tweenCallBack, this);
            Manager.layer.tipsLayer.addChild(this);
        }
    }

    public hide():void
    {
        if(this.parent) this.dispose();
    }

    public dispose():void
    {
		egret.Tween.removeTweens(this);
        this.removeEvent();
        Manager.pool.push(this._aniIcon);
        this._aniIcon = null;
    }
}