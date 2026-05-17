/**
 * 获取新技能--面板
 * liangyan
 * create 2017-11-21
*/
class SkillGainNewView extends egret.DisplayObjectContainer implements IViewManager
{
    private _backImg:BitmapRes;
    private _skillIcon:BitmapRemote;

    public constructor()
    {
        super();
        this.initView();
        this.addEvent();
    }

    private initView():void
    {
        this._backImg = BitmapRes.create("skill_gain_new_back_png", 50, 528);
        this.addChild(this._backImg);
        this._skillIcon = Manager.pool.create(BitmapRemote, null, 86, 86);
        this._skillIcon.x = 323;
        this._skillIcon.y = 552;
        this.addChild(this._skillIcon);

        this.touchEnabled = true;
    }

    private addEvent():void
    {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
    }

    private removeEvent():void
    {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
    }

    protected onTouchHandler(e:egret.TouchEvent):void
    {
        this.onHideEff();
    }

    protected onHideEff():void
    {
        Manager.render.remove(this.onHideEff, this);
        this._backImg.visible = false;
        let target:egret.Point = Manager.model.getLogin().home.getGlobalPos(HomeView2.BAR,HomeView2.SKILL_POS);
        let target2:egret.Point = this._skillIcon.parent.localToGlobal(this._skillIcon.x, this._skillIcon.y);
        let target3:egret.Point = target.subtract(target2);
        let target4:egret.Point = target3.add(new egret.Point(this._skillIcon.x, this._skillIcon.y));
        egret.Tween.get(this._skillIcon).to({x:target4.x, y:target4.y}, 1000).call(this.hideCallback, this);
    }

    private hideCallback():void
    {
        Manager.view.hide(ViewID.SkillGainNewView);
    }

    public show(iconID:number):void
    {
        if(!this.parent)
        {
            this._skillIcon.load(Manager.path.getSkillIconPath(iconID));
            Manager.render.add(this.onHideEff, this, 3000, 1);
            Manager.layer.uiLayer.addChild(this);
        }
    }

    public hide():void
    {
        if(this.parent) this.dispose();
    }

    public dispose():void
    {
        egret.Tween.removeTweens(this._skillIcon);
        Manager.render.remove(this.onHideEff, this);
        this.removeEvent();
        Manager.pool.push(this._backImg);
        this._backImg = null;
        Manager.pool.push(this._skillIcon);
        this._skillIcon = null;
    }
}