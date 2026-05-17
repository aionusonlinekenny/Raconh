/**
 * 火眼金睛画布图标
 * liangyan
 * create 2018-03-21
*/
class FireEyeElement extends RenderSprite
{
    private _icon:BitmapRemote;

    private _data:FireEyeGoodsData;
    private _isShaking:boolean;
    private _isDelay:boolean;

    public constructor()
    {
        super();
        this.touchEnabled = true;
        this.touchChildren = false;
        this.start();
        this.addEvent();
    }

    protected addEvent():void
    {
        super.addEvent();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
    }

    protected removeEvent():void
    {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        super.removeEvent();
    }

    protected drawAll():void
    {
        super.drawAll();
        this.drawData();
    }

    protected draw():void
    {
        super.draw();
        if(this.isInvalid(InvalidationType.DATA)) this.drawData();
    }

    private drawData():void
    {
        if(this._data == null) return;
        if(!this._icon)
        {
            let path = Manager.path.getIconPath(this._data.cvo.resID);
            this._icon = Manager.pool.create(BitmapRemote);
            this._icon.load(path, -1, -1, this.setAnchor, this);
            this._icon.scaleX = this._icon.scaleY = this._data.scale / 100;
		    this._icon.rotation = this._data.rotation;
            this.addChild(this._icon);
        }
        if(this._data.cvo.type == FireEyeItemCVO.TYPE_GOOD_CAT)
        {
            Manager.render.add(this.shake, this, 3000);
        }
    }

    private setAnchor():void
    {
        if(this._icon == null) return;
        this._icon.anchorOffsetX = this._icon.width / 2;
        this._icon.anchorOffsetY = this._icon.height / 2;
    }

    private shake():void
    {
        if(this._isShaking) return;
        let iconR = this._data.rotation;
        this._isShaking = true;
        egret.Tween.get(this._icon).to({rotation:iconR - 45}, 500).call(this.tweenCallBack,this,[iconR]);
    }

    private tweenCallBack(iconR):void
    {
        egret.Tween.get(this._icon).to({rotation:iconR + 45}, 500).call(this.tweenCallBack1,this);
    }

    private tweenCallBack1():void
    {
        this._isShaking = false;
    }

    private onTouchHandler(e:egret.TouchEvent):void
    {
        if(this._data == null) return;
        if(this._data.selected) return;
        if(this._isDelay) return;
        Manager.control.getFireEye().selectByID(this._data.uniqueID, this._data.cvo.id);
        this._isDelay = true;
        Manager.render.add(this.delay, this, 800, 1, null, true);
    }

    private delay():void
    {
        this._isDelay = false;
    }

    public get data():FireEyeGoodsData
    {
        return this._data;
    }

    public reuse(data:FireEyeGoodsData):void
    {
        this._data = data;
        this._isShaking = false;
        super.reuse();
    }

    public unuse():void
    {
        this.removeEvent();
        Manager.render.remove(this.shake, this);
        Manager.render.remove(this.delay, this);
        egret.Tween.removeTweens(this._icon);
        super.unuse();
        ObjectUtil.remove(this._icon);
        if(this._icon) Manager.pool.push(this._icon);
        this._icon = null;
        // if(this._status) Manager.pool.push(this._status);
        // this._status = null;
        this._data = null;
        this._isShaking = false;
        this._isDelay = false;
    }

    public dispose():void
    {
        this.removeEvent();
        Manager.render.remove(this.shake, this);
        Manager.render.remove(this.delay, this);
        egret.Tween.removeTweens(this._icon);
        super.dispose();
        ObjectUtil.removes(this._icon);
        if(this._icon) Manager.pool.push(this._icon);
        this._icon = null;
        // if(this._status) Manager.pool.push(this._status);
        // this._status = null;
        this._data = null;
        this._isShaking = false;
        this._isDelay = false;
    }
}