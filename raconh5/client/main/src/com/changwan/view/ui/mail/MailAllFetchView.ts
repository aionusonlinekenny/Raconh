// 一键领取邮件
class MailAllFetchView extends PopUpView
{
    private _confirmBtn:Button;
    private _goods:Array<Goods>;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("mail", "MailAllFetchSkin");
    }

    protected configUI():void
    {
        super.configUI();
    }

    protected initData():void
    {
        super.initData();

        this._goods = [];
        let goodsInfo = this.getGoodsInfos();
        let length = goodsInfo.length;
        let child:Goods;
        let rowIndex:number;
        let offsetX = length <= 5 ? (720 - (141 * length)) / 2 : 8;
        for(let i = 0; i < length; i++)
        {
            rowIndex = i % 5;
            child = Manager.pool.create(Goods);
            child.data = goodsInfo[i];
            child.x = offsetX + 140 * rowIndex;
            child.y = i >= 5 ? 510 : 380;
            this._goods.push(child);
            this.addChild(child);
        }
    }

    protected addEvent():void
    {
        super.addEvent();

        this._confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseHandler, this);
    }

    protected removeEvent():void
    {
        this._confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseHandler, this);

        super.removeEvent();        
    }

    protected onTouchCloseHandler(e:egret.TouchEvent):void
    {
        switch(e.currentTarget)
        {
            case this._popupView.closeBtn:
                break;
            case this._confirmBtn:
                Manager.control.getMail().mailAllFetch();
                break;
        }
        Manager.view.hide(ViewID.MailAllFetchView);
    }

    private getGoodsInfos():Array<ItemsModelInfo>
    {
        let mailInfos = Manager.model.getMail().mailInfos;
        let length = mailInfos ? mailInfos.length : 0;
        let goodsArr:Array<ItemsModelInfo>;
        let goodsLen:number;
        let result:Array<ItemsModelInfo> = [];
        for(let i = 0; i < length; i++)
        {
            if(mailInfos[i].attachStatus != MailConst.UN_FETCH) continue;
            goodsArr = mailInfos[i].goodsArr;
            goodsLen = goodsArr.length;
            for(let j = 0; j < goodsLen; j++)
            {
                let resultLen = result.length;
                let needPush = true;
                for(let k = 0; k < resultLen; k++)
                {
                    if(goodsArr[j].cvo.superposition > 1 && goodsArr[j].base_id == result[k].base_id)
                    {
                        result[k].quantity += goodsArr[j].quantity;
                        needPush = false;
                        break;
                    }
                }
                if(needPush) result.push(goodsArr[j]);
            }
        }
        if(result.length > 1) result.sort((a:ItemsModelInfo, b:ItemsModelInfo) => { return (a.cvo.quality > b.cvo.quality ? -1 : 1);});
        return result;
    }

    public show():void
    {
        Manager.layer.tipsLayer.addChild(this);
    }

    public hide():void
    {
        this.dispose();
    }

    public dispose():void
    {
        super.dispose();
      
        this._confirmBtn.dispose();
        this._confirmBtn = null;

        if(this._goods)
        {
            this._goods.forEach((good, i) => 
            {
                Manager.pool.push(good);
            });
            this._goods.length = 0;
            this._goods = null;
        }
    }
}

