/**
 *author Anydo
 *create 2018-1-4
 *description 
*/
class CountDownTool extends UIComponent implements IViewManager
{
    private _circleAni:Animation;
    private _num:NumImgView2;
    private _picLabel:eui.Image;

    private _life:number;
    private _labelName:string;
    private _callback:Function;
    private _callbackTarget:any;

    private _tempTime:number;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("common", "CountDownToolSkin");
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
            this._circleAni.y = 425;
            this.addChild(this._circleAni);
        }
        if(!this._num)
        {
            this._num = Manager.pool.create(NumImgView2);
            this.addChild(this._num);
        }
        this._picLabel.source = this._labelName;
        if(!this._life || this._life <= 0) return;
        this.setSecondValue();
    }

    private setSecondValue():void
    {
        if(this._num == null) return;
        this._num.setValue(this._life, "nums_cd_", 25);
        this._num.x = (690 - this._num.width) / 2;//this._numBack.x + (this._numBack.width - this._num.width) / 2 - 10;
        this._num.y = 546;//this._numBack.y + (this._numBack.height - 74) / 2;
    }

    private countdown():void
    {
        this._life--;
        if(this._life <= 0)
        {
            // Manager.render.remove(this.countdown, this);
            if(this._callback) this._callback.call(this._callbackTarget);
            Manager.view.hide(ViewID.CountDownTool);
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

    public show(life:number,labelName:string,callback?:Function,callbackTarget?:any):void
    {
        if(!this.parent)
        {
            this._life = life;
            this._labelName = labelName;
            this._callback = callback;
            this._callbackTarget = callbackTarget;
            this.invalidate(InvalidationType.LAYOUT);
            // Manager.render.add(this.countdown, this, 1000, 0, null, true);
            window.clearInterval(this._tempTime);
            this._tempTime = window.setInterval(()=>this.countdown(), 1000);
            Manager.layer.tipsLayer.addChildAt(this,0);
            this.onResizeHandler(null);
        }
        Manager.view.setModalAlpha(0.3);
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
        Manager.pool.push(this._num);
        this._num = null;
        Manager.view.setModalAlpha(0.8);
    }
}