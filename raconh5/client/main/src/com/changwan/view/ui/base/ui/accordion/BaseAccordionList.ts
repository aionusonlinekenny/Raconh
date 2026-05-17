/**
 * 可折叠列表
 * liangyan
 * create 2017-11-29
*/
class BaseAccordionList extends RenderSprite
{
    private _elements:Array<BaseAccordionElement>;

    private _datas:Array<any>;
    private _listH:number;
    private _btnH:number;
    private _y:number;
    private _listGap:number;
    private _itemGap:number;

    public constructor()
    {
        super();
        this.start();
        this.addEvent();
    }

    protected addEvent():void
    {
        super.addEvent();
        Manager.model.addEventListener(BaseUIEvent.ACCORDION_CHANGE_H, this.sortElement, this);
        Manager.model.addEventListener(BaseUIEvent.ACCORDION_BEFORE_OPEN, this.closeAll, this);
    }

    protected removeEvent():void
    {
        Manager.model.removeEventListener(BaseUIEvent.ACCORDION_CHANGE_H, this.sortElement, this);
        Manager.model.removeEventListener(BaseUIEvent.ACCORDION_BEFORE_OPEN, this.closeAll, this);
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
        if(!this._datas || this._datas.length == 0) return;
        let len = this._datas ? this._datas.length : 0;
        let maxScrollerH = this._listH - (len * this._btnH) - (len - 1) * this._listGap;
        let element:BaseAccordionElement;
        for(let i = 0; i < len; i++)
        {
            element = Manager.pool.create(BaseAccordionElement, this._datas[i], this._itemGap, maxScrollerH);
            element.y = this._y;
            this.addChild(element);
            this._elements.push(element);
            this._y += element.height + this._listGap;
        }
        Manager.model.dispatchEvent(new BaseUIEvent(BaseUIEvent.ACCORDION_COMPOSING_COMPLETE));
    }

    private sortElement(e:BaseUIEvent):void
    {
        if(!this._elements) return;
        let element:BaseAccordionElement;
        let curY:number = 0;
        for(let i = 0; i < this._elements.length; i++)
        {
            element = this._elements[i];
            element.y = curY;
            curY += element.getHeight() + this._listGap;
        }
    }

    private closeAll(e:BaseUIEvent):void
    {
        if(!this._elements) return;
        let element:BaseAccordionElement;
        let curY:number = 0;
        for(let i = 0; i < this._elements.length; i++)
        {
            element = this._elements[i];
            if(element.isShow) element.isShow = false;
        }
    }

    public setdefault(data:any):void
    {
        if(!this._elements) return;
        if(data == null) return;
        for(let i = 0; i < this._elements.length; i++)
        {
            if(this._elements[i].getData().indexOf(data) != -1) this._elements[i].setDefault();
        }
    }
    /**
     * 折叠菜单
     * @params 列表元素{列表元素按钮，列表元素子项，子项数据，按钮文本}
     * @params 折叠菜单高度
     * @params 按钮高度
     * @params 列表元素间隔
     * @params 列表元素子项间隔
     */
    public reuse(datas:Array<any>, listHeight:number, btnH:number, listGap:number = 0, itemGap:number = 0):void
    {
        this.touchChildren = true;
        this._datas = datas;
        this._listH = listHeight;
        this._btnH = btnH;
        this._listGap = listGap;
        this._itemGap = itemGap;
        this._elements = [];
        this._y = 0;
        super.reuse();
        this.invalidate(InvalidationType.LAYOUT);
    }

    public unuse():void
    {
        super.unuse();
        this._elements.forEach((child, i) => 
        {
            // Manager.pool.push(child);
            child.dispose();
            child = null;
        })
        this._elements.length = 0;
        this._elements = null;

        this._datas = null;
        this._y = 0;
    }

    public dispose():void
    {
        super.dispose();
        this._elements.forEach((child, i) => 
        {
            ObjectUtil.remove(child);
            // Manager.pool.push(child);
            child.dispose();
            child = null;
        })
        this._elements.length = 0;
        this._elements = null;

        this._datas = null;
        this._y = 0;
    }
}