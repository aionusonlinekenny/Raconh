/**
 * 银币副本宝箱
 * luzhihong
 * create 2018.1.19
 */
class CopySilverBox extends UIComponent
{
    private _btn:eui.Image;
    // private _txtTime:Label;
    private _coolingImg:CoolingImage;
    private _id:number;
    private _pos:egret.Point;
    private _endTime:number;
    private _totalTime:number;
    
    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("activity", "CopySilverBoxSkin");
        this.touchChildren = true;
    }

    protected configUI():void
    {
        super.configUI();
        this._coolingImg = new CoolingImage(50);
        this._coolingImg.x = this._coolingImg.y = 55;
        this.addChildAt(this._coolingImg, 0);
    }

    public source(url:string)
    {
        this._btn.source = url;
    }
    
    public setData(id:number, pos:egret.Point, endTime:number, totalTime:number):void
    {
        this._id = id ? id : 0;
        this._pos = pos;
        this._endTime = endTime ? endTime : 0;;
        this._totalTime = totalTime;
    }

    public countdown():void
    {
        let serverTime:number = Manager.model.getLogin().serverTimeInfo.serverTime/1000;
        let left:number = this._endTime - serverTime;
        if(left > 0)
        {
            // let str:string = HtmlUtil.addColorTag(cw.DateUtil.formatStr(left, cw.DateUtil.LEFT_MM_SS, true), Color.GREEN_STR);
            // HtmlUtil.setTextFlow(this._txtTime, str);
            this._coolingImg.setSchedule(this._totalTime - left, this._totalTime);
            this.setEnabel(false);
        }
        else
        {
            // this._txtTime.text = "";
            this._coolingImg.setSchedule(1, 1);
            this.setEnabel(true);
        }
    }

    private setEnabel(bool:boolean):void
    {
        if(this._btn.touchEnabled == bool) return;

        this._btn.touchEnabled = bool;
        if(bool)
        {
            this._btn.filters = [];
        }
        else
        {
            FilterUtil.setGrayFilter(this._btn);
        }
    }

    protected addEvent():void
    {
        super.addEvent();

        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
    }

    protected removeEvent():void
    {
        super.removeEvent();

        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
    }

    private onClickHandler(e:egret.TouchEvent):void
    {
        if(this._id > 0)
        {
            if(!this.setTarget())
            {
                let v:Vector2D = new Vector2D(200, 0);
                v.angle = Math.atan2(Manager.model.self.y - this._pos.y, Manager.model.self.x - this._pos.x);
                Manager.walk.moveTo(new egret.Point(this._pos.x + v.x, this._pos.y + v.y), this.setTarget, this);
            }
        }
    }


    private setTarget():boolean
    {
        let info:MonsterGameObjectInfo = Manager.model.getGameobject().getMonsterGameObject(this._id);
        if(info) 
        {
            Manager.model.self.updateTarget(info);
            return true;
        }
        return false;
    }
    /**引导调用 */
    public guideClick():void
    {
        this.onClickHandler(null);
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.remove(this._btn);
        ObjectUtil.dispose(this._coolingImg);
        this._btn = null;
        this._coolingImg = null;
        this._pos = null;
    }
}