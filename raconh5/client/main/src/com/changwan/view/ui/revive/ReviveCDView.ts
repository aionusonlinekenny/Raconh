/**
 * 复活倒计时界面
 * liangyan
 * create 2017-12-06
*/
class ReviveCDView extends UIComponent implements IViewManager
{
    private _circleAni:Animation;
    private _num:NumImgView2;
    private _life:number;

    private _tempTime:number;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("revive", "ReviveCDViewSkin");
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
        if(!this._circleAni)
        {
            this._circleAni = Manager.animation.createEffectAnimation("circle");
            this._circleAni.x = 205;
            this._circleAni.y = 430;
            this.addChild(this._circleAni);
        }
        if(!this._num)
        {
            this._num = Manager.pool.create(NumImgView2);
            this.addChild(this._num);
        }
        if(!this._life || this._life <= 0) return;
        this.setSecondValue();
    }

    private setSecondValue():void
    {
        if(this._num == null) return;
        this._num.setValue(this._life, "nums_cd_", 25);
        this._num.x = 27 + (666 - this._num.width) / 2 - 10;//this._numBack.x + (this._numBack.width - this._num.width) / 2 - 10;
        this._num.y = 546;//this._numBack.y + (this._numBack.height - 74) / 2;
    }

    private countdown():void
    {
        this._life--;
        if(this._life <= 0)
        {
            // Manager.render.remove(this.countdown, this);
            Manager.control.getBattle().reviveApply(1);
        }
        else
        {
            this.setSecondValue();
        }
    }

    private onResizeHandler(e:GlobalEvent):void
    {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
    }

    public show(life:number):void
    {
        if(!this.parent)
        {
            this._life = life;
            this.invalidate(InvalidationType.LAYOUT);
            // Manager.render.add(this.countdown, this, 1000, 0, null, true);
            window.clearInterval(this._tempTime);
            this._tempTime = window.setInterval(()=>this.countdown(), 1000);
            Manager.layer.tipsLayer.addChild(this);
            this.onResizeHandler(null);
        }
    }

    public hide():void
    {
        if(this.parent) this.dispose();
    }

    public dispose():void
    {
        // if(Manager.render.contains(this.countdown, this)) Manager.render.remove(this.countdown, this);
        window.clearInterval(this._tempTime);
        super.dispose();
        ObjectUtil.removes(this._circleAni, this._num);
        if(this._circleAni)
        {
            Manager.pool.push(this._circleAni);
            this._circleAni = null;
        }
        if(this._num)Manager.pool.push(this._num);
        this._num = null;
    }
}