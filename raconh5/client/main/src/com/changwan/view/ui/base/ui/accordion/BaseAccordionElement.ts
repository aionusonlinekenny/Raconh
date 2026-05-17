/**
 * 折叠列表元素
 * liangyan
 * create 2017-11-29
*/
class BaseAccordionElement extends egret.DisplayObjectContainer implements cw.IPool
{
    private _btn:any;
    private _scroller:egret.ScrollView;
    private _group:eui.Group;

    private _y:number;
    private _isShow:boolean;
    private _hideY:number;
    private _data:any;
    private _itemGap:number;
    private _maxScrollerH:number;

    public constructor()
    {
        super();
        this.touchChildren = true;
        this._y = 0;
    }

    private onTouchHandler(e:egret.TouchEvent):void
    {
        if(e != null && !this._isShow) Manager.model.dispatchEvent(new BaseUIEvent(BaseUIEvent.ACCORDION_BEFORE_OPEN));
        if (!this._isShow)
        {
            this._scroller.y = this._btn.getHeight();
            this.onMoveComplete(true);
        }
        else
        {
            this._scroller.y = this._hideY;
            this.onMoveComplete(false);
        }
    }

    private onMoveComplete(needAdd:boolean):void
    {
        this._isShow = needAdd;
        if(!this._isShow)
        {
            if(this._scroller.parent) this._scroller.parent.removeChild(this._scroller);
        }
        else
        {
            if(!this._scroller.parent) this.addChild(this._scroller);
        }
        Manager.model.dispatchEvent(new BaseUIEvent(BaseUIEvent.ACCORDION_CHANGE_H));
    }

    private clearGroup():void
    {
        let num = this._group.numChildren;
        for(let i = 0; i < num; i++)
        {
            let child:any = this._group.getChildAt(0);
            if(child)
            {
                this._group.removeChild(child);
                // Manager.pool.push(child);
                child.dispose();
                child = null;
            }
        }
    }

    private set data(value:any)
    {
        if(!value) return;

        let clazz = value.btn;
        this._btn = Manager.pool.create(clazz, value.label);
        this._btn.touchEnabled = true;
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        if(!this._btn.parent) this.addChild(this._btn);
        this._scroller = new egret.ScrollView();
        this._scroller.horizontalScrollPolicy = "off";
        this._scroller.scrollSpeed = 0.01;
        this._scroller.bounces = false;
        this._group = new eui.Group();
        this._group.scrollEnabled = true;

        this._data = value;
        let len = value.datas.length;
        let child:any;
        clazz = value.item;
        for(let i = 0; i < len; i++)
        {
            child = Manager.pool.create(clazz, value.datas[i]);
            child.y = this._y;
            this._group.addChild(child);
            this._y += child.height + this._itemGap;
        }
        this._group.width = child ? child.width : 0;
        this._group.height = this._y;

        this._scroller.x = this._btn.x;
        this._hideY = this._scroller.y = -this._y + this._btn.getHeight();
        this._scroller.setContent(this._group);
        this._scroller.width = child ? child.width : 0;
        this._scroller.height = this._y > this._maxScrollerH ? this._maxScrollerH : this._y;
    }

    public getData():any
    {
        return this._data.datas;
    }

    public setDefault():void
    {
        this.onTouchHandler(null);
    }

    public get isShow():boolean
    {
        return this._isShow;
    }

    public set isShow(value:boolean)
    {
        if(this._isShow == value) return;
        this.onTouchHandler(null);
    }

    public getHeight():number
    {
        let result = 0;
        if(this._isShow && this._scroller != null) result += this._scroller.height;
        if(this._btn) result += this._btn.getHeight();
        return result;
    }

    public reuse(value:any, itemGap:number, maxScrollerH:number):void
    {
        this._isShow = false;
        this.touchChildren = true;

        this._itemGap = itemGap;
        this._maxScrollerH = maxScrollerH;
        this.data = value;
    }

    public unuse():void
    {
        if(this._btn)
        {
            this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            // Manager.pool.push(this._btn);
            this._btn.dispose();
            this._btn = null;
        }
        if(this._scroller)
        {
            this._scroller.removeContent();
            this._scroller = null;
        }
        if(this._group)
        {
            this._group.mask = null;
            this.clearGroup();
            this._group = null;
        }

        this._y = 0;
        this._isShow = false;
        this._data = null;
    }

    public dispose():void
    {
        if(this._btn)
        {
            ObjectUtil.removes(this._btn);
            this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._btn.dispose();
            this._btn = null;
        }
        if(this._scroller)
        {
            this._scroller.removeContent();
            ObjectUtil.removes(this._scroller);
            this._scroller = null;
        }
        if(this._group)
        {
            this._group.mask = null;
            this.clearGroup();
            ObjectUtil.remove(this._group);
            this._group = null;
        }
        this._data = null;
    }
}