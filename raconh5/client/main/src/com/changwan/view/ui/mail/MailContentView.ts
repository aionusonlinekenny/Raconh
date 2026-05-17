// 邮件内容
class MailContentView extends PopUpView
{
    private _fetchBtn:Button;
    private _titleTxt:Label;
    private _contentTxt:Label;
    private _data:MailInfo;
    private _goods:Array<Goods>;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("mail", "MailContentSkin");
    }

    protected configUI():void
    {
        super.configUI();
        this._contentTxt.lineSpacing = 7;
    }

    protected addEvent():void
    {
        super.addEvent();

        this._fetchBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseHandler, this);
    }

    protected removeEvent():void
    {
        this._fetchBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseHandler, this);

        super.removeEvent();        
    }
    protected onTouchCloseHandler(e:egret.TouchEvent):void
    {
        switch(e.currentTarget)
        {
            case this._popupView.closeBtn:
                break;
            case this._fetchBtn:
                if(Manager.model.getBag().isTooLittle())
                {
                    FloatTips.addTips("背包已满！");
                    return;
                }
                if(this._goods)
                {
                    let len = this._goods.length;
                    let str:string;
                    if(this._goods[0])
                    {
                        let cvo:ItemsCVO = this._goods[0].cvo;
                        //判断是否为命格
                        if(cvo.group == ItemsType.GROUP_LIFEGRID)
                        {
                            if(!Manager.model.getItems().checkLifeGridBagAmple(len))
                            {
                                FloatTips.addTips(LangCVO.getContent("lifeGrid11"),Color.RED);//命格背包空间不足
                                return;
                            }
                        }
                    }
                    for(let i = 0; i < len; i++)
                    {
                        str = this._goods[i]._data.cvo.name + "X" + this._goods[i]._data.quantity;
                        FloatTips.addTips(str, Color.getColorNumByQuality(this._goods[i]._data.cvo.quality));
                    }
                }
                Manager.control.getMail().mailFetch(this._data.uniqueID);
                break;
        }
        Manager.view.hide(ViewID.MailContentView);
    }


    private setBtn(unFetch:boolean):void
    {
        this._fetchBtn.enabled = unFetch;
        if(unFetch) this._fetchBtn.filters = null;
        else FilterUtil.setGrayFilter(this._fetchBtn);
    }

    public show(data:MailInfo):void
    {
        if(this.parent == null)
        {
            this._data = data;
            if(this._data != null)
            {
                this._goods = [];
                if(!this._data.hasRead) Manager.control.getMail().mailRead(this._data.uniqueID);
                let unFetch = this._data.attachStatus == MailConst.UN_FETCH;
                this.setBtn(unFetch);
                this._titleTxt.text = this._data.title;
                this._contentTxt.text = LangCVO.getContent("mail2") + "\r　　" + this._data.content;
                let goodsLen = this._data.goodsArr.length;
                let child:Goods;
                let goodsInfo:ItemsModelInfo;
                let offsetX = (720 - (141 * goodsLen)) / 2;
                let offsetY = this._fetchBtn.y - 140;
                for(let i = 0; i < goodsLen; i++)
                {
                    child = Manager.pool.create(Goods);
                    goodsInfo = this._data.goodsArr[i];
                    child.data = goodsInfo;
                    child.x = offsetX + (141 * i);
                    child.y = offsetY;
                    if(unFetch) child.filters = null;
                    else FilterUtil.setGrayFilter(child);
                    this._goods.push(child);
                    this.addChild(child);
                }
                Manager.layer.tipsLayer.addChild(this);
            }
        }
    }

    public dispose():void
    {
        super.dispose();
        this._fetchBtn.dispose();
        this._fetchBtn = null;
        this._titleTxt.dispose();
        this._titleTxt = null;
        this._contentTxt.dispose();
        this._contentTxt = null;

        this._data = null;
        if(this._goods)
        {
            this._goods.forEach((good, i) => 
            {
                if(good.filters)
                {
                    good.filters = null;
                }
                Manager.pool.push(good);
            });
            this._goods.length = 0;
            this._goods = null;
        }
    }
}