/**
 * 提升战斗力
 */
class FightUpgradeView extends Sprite
{
    private _fightUpgradeEffect:Animation;
    private _sp:Sprite;
    private _fightImg:BitmapRes;
    private _fightAddImg:BitmapRes;
    private _fightNum:NumImgView2;
    private _callback:Function;
    private _thisObj:any;

    public constructor()
    {
        super();
    }

    protected start():void
    {
        super.start();
        if(!this._fightUpgradeEffect)
        {
            this._fightUpgradeEffect = Manager.animation.createEffectAnimation("fightUpgrade");
            this._fightUpgradeEffect.width = 400;
            this._fightUpgradeEffect.height = 200;
            this._fightUpgradeEffect.addEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.onPlayEffectComplete, this);
        }
        if(!this._fightUpgradeEffect.parent)
            this.addChild(this._fightUpgradeEffect);
        // this._fightUpgradeEffect.visible = true;
        
        if(!this._sp)
            this._sp = Manager.pool.create(Sprite);
        this._sp.alpha = 0;
        if(!this._sp.parent)
            this.addChild(this._sp);

        if(!this._fightImg)
        {
            this._fightImg = Manager.pool.create(BitmapRes, "common_zhanli2_png");
            this._fightImg.x = 90;
            this._fightImg.y = 80;
            this._sp.addChild(this._fightImg);
        }

        if(!this._fightAddImg)
        {
            this._fightAddImg = Manager.pool.create(BitmapRes, "nums_fighting_+_png");
            this._fightAddImg.x = 195;
            this._fightAddImg.y = 90;
            this._sp.addChild(this._fightAddImg);
        }

        if(!this._fightNum)
		{
			this._fightNum = Manager.pool.create(NumImgView2);
			this._fightNum.x = 230;
            this._fightNum.y = 90;
			if(!this._fightNum.parent) this._sp.addChild(this._fightNum);
		}
		
        this.onResizeHandler(null);

        egret.Tween.get(this._sp).to({alpha:1}, 200);
    }

    private onPlayEffectComplete(e:GlobalEvent):void
    {
        if(this._fightUpgradeEffect)
        {
            this._fightUpgradeEffect.removeEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.onPlayEffectComplete, this);
            // this._fightUpgradeEffect.visible = false;
            if(this._fightUpgradeEffect.parent) this._fightUpgradeEffect.parent.removeChild(this._fightUpgradeEffect);
            Manager.pool.push(this._fightUpgradeEffect);
            this._fightUpgradeEffect = null;
        }
        egret.Tween.get(this).to({alpha:0}, 700).call(this.showComplate, this);
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
        // this.x = Math.round((Manager.global.gameMain.stage.stageWidth - this.width) / 2);
        this.x = 150;
        this.y = Manager.config.gameHeight - 480;
	}

    public reuse(fightValue:number, callback:Function, thisObj:any):void
    {
        super.reuse();
        this._callback = callback;
        this._thisObj = thisObj;
        this._sp.alpha = 0;
		this._fightNum.setValue(fightValue, "nums_fighting_", 20);
    }

    public unuse():void
    {
        super.unuse();

        egret.Tween.removeTweens(this._sp);
        egret.Tween.removeTweens(this);

        if(this._fightUpgradeEffect)
        {
            Manager.pool.push(this._fightUpgradeEffect);
            this._fightUpgradeEffect = null;
        }
        if(this._fightImg)
        {
            Manager.pool.push(this._fightImg);
            this._fightImg = null;
        }
        if(this._fightAddImg)
        {
            Manager.pool.push(this._fightAddImg);
            this._fightAddImg = null;
        }
        if(this._fightNum)
        {
            Manager.pool.push(this._fightNum);
            this._fightNum = null;
        }
        if(this._sp)
        {
            Manager.pool.push(this._sp);
            this._sp = null;
        }

        this._callback = null;
        this._thisObj = null;
    }

    private showComplate():void
    {
        egret.Tween.get(this).to(null, 1000).call(this.hide, this);
    }

    private hide():void
    {
        if(this._callback != null)
        {
            this._callback(this._thisObj);
        }
    }

    public dispose():void
    {
        egret.Tween.removeTweens(this._sp);
        egret.Tween.removeTweens(this);

        super.dispose();

        if(this._fightUpgradeEffect)
        {
            Manager.pool.push(this._fightUpgradeEffect);
            this._fightUpgradeEffect = null;
        }
        if(this._fightImg)
        {
            Manager.pool.push(this._fightImg);
            this._fightImg = null;
        }
        if(this._fightAddImg)
        {
            Manager.pool.push(this._fightAddImg);
            this._fightAddImg = null;
        }
        if(this._fightNum)
        {
            Manager.pool.push(this._fightNum);
            this._fightNum = null;
        }
        if(this._sp)
        {
            Manager.pool.push(this._sp);
            this._sp = null;
        }

        this._callback = null;
        this._thisObj = null;
    }
}