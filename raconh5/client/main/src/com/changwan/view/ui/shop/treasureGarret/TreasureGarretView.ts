/**
 * 珍宝阁界面
 * pzx
 * create 2018-2-3
*/
class TreasureGarretView extends UIComponent
{
    private _reinBtn:Button;
    private _item0:ShopItem;
    private _item1:ShopItem;
    private _item2:ShopItem;
    private _item3:ShopItem;
    private _item4:ShopItem;
    private _item5:ShopItem;

    private _timeTxt:Label;
    private _countTxt:Label;
    private _res:PlayerResItems;
    private _model:TreasureGarretModel;
    private _list:Array<number>;
    private _redIcon:eui.Image;
    private _itemList:ShopItem[];
    private _mianfeishuaxinImg:eui.Image;
    private _resGroup:eui.Group;

    public constructor()
    {
        super();
        this.touchChildren = true;
        this.skinName = Manager.path.getSkinName("rein/treasureGarret", "TreasureGarretViewSkin");
    }

    protected configUI():void
    {
        super.configUI();
        if(!this._itemList)
        {
            this._itemList = [];
            for(let i:number = 0;i<6;i++)
            {
                this._itemList[i] = this["_item"+i]
            }
        }

        this._res.iconSize = PlayerResItems.ICON_54;
        this._res.sign ="";
        this._res.fontSize(26);
        this._model = Manager.model.getShop().treasureGarretModel;
        Manager.control.getShop().treasureGarretQuery();
        this._resGroup.touchEnabled = false;
        this._resGroup.touchChildren = false;
        this._mianfeishuaxinImg.touchEnabled = false;
    }

    protected addEvent():void
    {
        super.addEvent();
        this._reinBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHandler,this);
        Manager.model.getShop().addEventListener(ShopEvent.SHOP_UPDATE_EVENT,this.drawData,this);
        Manager.model.getShop().addEventListener(ShopEvent.SHOP_BUY_EVENT,this.drawData,this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
        this._reinBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHandler,this);
        Manager.model.getShop().removeEventListener(ShopEvent.SHOP_UPDATE_EVENT,this.drawData,this);
        Manager.model.getShop().removeEventListener(ShopEvent.SHOP_BUY_EVENT,this.drawData,this);
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
        let arr:Dictionary<number,number> = Manager.model.getShop().getList(ShopType.TREASUREGARRET_TYPE);
        if(!arr) return;
        this._list = this._model.shopList();
        if(!this._list) return;
        this._redIcon.visible = false;
        let cvos:ShopCVO[] = [];
        for(let shopId of this._list)
        {
            let cvo:ShopCVO = ShopCVO.getCvo(shopId);
            cvos.push(cvo);
        }
        cvos = ArrayUtil.sortOn(cvos,["sort"]);
        for(let cvo of cvos)
        {
            let j:number = arr.get(cvo.id);
            if(j)
            {
                cvo.setCount(j);
            }
            else
            {
                cvo.setCount(0);
            }
        }
        let ln:number= this._itemList.length;
        for(let i:number = 0;i<ln;i++)
        {
            let item:ShopItem = this._itemList[i];
            if(cvos[i])
            {
                item.setData(cvos[i]);
            }
        }

        let treaCvo:TreasureGarretCVO = TreasureGarretCVO.getCvo(this._model.count());
        let loss:GainLossVO = new GainLossVO(treaCvo.loss);
        this._res.setData(loss);
        
        if(this._model.checkfreeTime())
        {
            this.setIsFree();
        }
        else
        this.drawTime();
    }

    private drawTime():void
    {
        let second:number = Math.round(this._model.freeTime - Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
       if(second>0)
       {
           this._mianfeishuaxinImg.visible = false;
           this._resGroup.visible = true;
           this.countdown();
           Manager.render.add(this.countdown, this, 1000);
       }
       else
       {
           this.setIsFree();
           return;
       }
    }
    private countdown():void
    {
        let second:number = Math.round(this._model.freeTime -Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
        if(second <= 0)
        {
            this.setIsFree();
            Manager.render.remove(this.countdown, this);
            return;
        }
        let str:string=LangCVO.getContent("shop2");
        this._timeTxt.text = str+cw.DateUtil.formatStr(second, cw.DateUtil.LEFT_HH_MM_SS, true);
    }
    private setIsFree():void
    {
        this._timeTxt.text = "";//本次免费
        this._redIcon.visible = true;
        this._mianfeishuaxinImg.visible = true;
        this._resGroup.visible = false;
    }

    private onTouchHandler(e:egret.TouchEvent):void
    {
        if(!this._model.checkfreeTime() && this._model.count() >= TreasureGarretCVO.max_count)
        {
            FloatTips.addTips(LangCVO.getContent("shop3"),Color.RED);
            return;
        }
        Manager.control.getShop().treasureGarretUpdate();
    }

    public reuse():void
    {
        super.reuse();
    }

    public unuse():void
    {
        super.unuse();
    }

    public dispose():void
    {
        super.dispose();
        if(Manager.render.contains(this.countdown,this)) Manager.render.remove(this.countdown, this);
        ObjectUtil.removes(this._resGroup,this._redIcon);
        ObjectUtil.disposes(this._reinBtn,this._timeTxt,this._countTxt,this._res);
        for(let item of this._itemList)
        {
            item.dispose();
        }
        this._itemList=null;
        this._reinBtn=null;
        this._item0=null;
        this._item1=null;
        this._item2=null;
        this._item3=null;
        this._item4=null;
        this._item5=null;

        this._timeTxt=null;
        this._countTxt=null;
        this._res=null;
        this._model=null;
        this._list=null;
        this._redIcon=null;
        this._mianfeishuaxinImg=null;
        this._resGroup=null;

    }
}