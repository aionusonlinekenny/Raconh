/**
 *author luzh
 *create 2018-1-16
 *description 
*/
class SwitchSceneAni extends UIComponent
{
    private _back0:eui.Image;
    private _back1:eui.Image;
    private _hand0:eui.Image;
    private _hand1:eui.Image;
    private _light0:eui.Image;
    private _light1:eui.Image;
    private _group:eui.Group;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("common", "SwitchSceneSkin");
    }

    protected configUI():void
    {
        super.configUI();

        this._light0.scaleX = this._light0.scaleY = 0;
        this._light1.scaleX = this._light1.scaleY = 0;
        egret.Tween.get(this._hand0).to({x:this._hand0.x+36, y:this._hand0.y+24}, 400, egret.Ease.circOut).wait(100)
                                    .to({x:this._hand0.x+45, y:this._hand0.y+30}, 150)
                                    .call(this.setAlphaZero, this, [this._hand0]);
        egret.Tween.get(this._hand1).to({x:this._hand1.x-36, y:this._hand1.y-24}, 400, egret.Ease.circOut).wait(100)
                                    .to({x:this._hand1.x-45, y:this._hand1.y-30}, 150)
                                    .call(this.setAlphaZero, this, [this._hand1]);
        egret.Tween.get(this._light0).to({scaleX: 2, scaleY:2}, 300, egret.Ease.circOut)
                                    .to({scaleX: 1, scaleY:1}, 150, egret.Ease.circIn)
                                    .call(this.setAlphaZero, this, [this._light0]);
        egret.Tween.get(this._light1).wait(400).to({scaleX: 3, scaleY:3}, 300, egret.Ease.circIn)
                                            .to({alpha:0}, 100, egret.Ease.circIn);
        
        let backDuration:number = this._back0.width/720*150;
        egret.Tween.get(this._back0).wait(600).to({x: this._back0.x - this._back0.width}, backDuration, egret.Ease.circIn);
        egret.Tween.get(this._back1).wait(600).to({x: this._back1.x + this._back1.width}, backDuration, egret.Ease.circIn)
                                    .call(this.hideView, this);
    }

    private setAlphaZero(target:egret.DisplayObject):void
    {
        target.alpha = 0;
    }
    
    private hideView():void
    {
        Manager.view.hide(ViewID.SwitchSceneAni);
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
        let w:number = Manager.config.gameWidth;
        let h:number = Manager.config.gameHeight;
        this.x = Math.round((w - 720) / 2);

        let max:number = w > h ? w : h;
        this._back0.width = this._back0.height = this._back1.width = this._back1.height = max;
        this._back0.x = -Math.round((max - 720) / 2);
        this._back0.y = -Math.round((max - 1280) / 2);
        this._back1.x = this._back0.x + this._back1.width;
        this._back1.y = this._back0.y + this._back1.height;
    }

    public show():void
    {
        if(!this.parent)
        {
            Manager.layer.tipsLayer.addChild(this);
            this.onResizeHandler(null);
        }
    }

    public hide():void
    {
        this.dispose();
    }

    public dispose():void
    {
        egret.Tween.removeTweens(this._hand0);
        egret.Tween.removeTweens(this._hand1);
        egret.Tween.removeTweens(this._light0);
        egret.Tween.removeTweens(this._light1);
        egret.Tween.removeTweens(this._back0);
        egret.Tween.removeTweens(this._back1);
        super.dispose();
        ObjectUtil.removes(this._back0, this._back1, this._hand0, this._hand1, this._light0, this._light1, this._group);
        this._back0 = null;
        this._back1 = null;
        this._hand0 = null;
        this._hand1 = null;
        this._light0 = null;
        this._light1 = null;
        this._group = null;
        
        // let isMainMap:boolean = Manager.model.getMap().mapCVO.isMainMap;
        // if(!isMainMap && !Manager.model.getAuto().autoHook)
        // {
        //     Manager.model.getAuto().autoHook = true;
        // }
    }
}