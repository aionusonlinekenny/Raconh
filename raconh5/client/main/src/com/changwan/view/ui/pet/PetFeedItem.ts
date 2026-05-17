/**
 * 宠物喂养子项
 * liangyan
 * create 2017-12-16
*/
class PetFeedItem extends UIComponent
{
    private _goods:BaseGoods;
    private _nameTxt:Label;
    private _hasUseTxt:Label;
    private _canUseTxt:Label;
    private _leftTxt:Label;
    private _useBtn:Button;
    private _redIcon:eui.Image;

    private _goodsID:number;
    private _useNum:number;
    private _useMax:number;
    private _bagCount:number;

    public constructor()
    {
        super();
        this.touchChildren = true;
        this.skinName = Manager.path.getSkinName("pet", "PetFeedItemSkin");
    }

    protected configUI():void
    {
        super.configUI();
    }

    protected addEvent():void
    {
        super.addEvent();
        this._useBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEvent, this);
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onItemUpdateHandler, this);
        Manager.model.getPet().addEventListener(PetEvent.ZZD_USE, this.onPetUpdateHandler, this);
        Manager.model.getPet().addEventListener(PetEvent.WXD_USE, this.onPetUpdateHandler, this);
    }

    protected removeEvent():void
    {
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onItemUpdateHandler, this);
        this._useBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEvent, this);
        Manager.model.getPet().removeEventListener(PetEvent.ZZD_USE, this.onPetUpdateHandler, this);
        Manager.model.getPet().removeEventListener(PetEvent.WXD_USE, this.onPetUpdateHandler, this);
        super.removeEvent();
    }

    protected drawAll():void
    {
        super.drawAll();
        this.drawData();
        this.drawCount();
    }

    protected draw():void
    {
        super.draw();
        if(this.isInvalid(InvalidationType.DATA)) this.drawData();
        if(this.isInvalid("count")) this.drawCount();
    }

    private drawData():void
    {
        if(!this._goodsID) return;
        let cvo = ItemsCVO.getCvo(this._goodsID);
        if(!cvo) return;
        this._goods.baseId = cvo.id;
        this._nameTxt.text = cvo.name;
        // this.drawCount();
    }

    private drawCount():void
    {
        let model = Manager.model.getPet();
        let petCvo = PetCVO.getCVO(model.pinjie, model.star);
        if(this._goodsID == ItemsConst.PET_ZZD)
        {
            this._useNum = model.zzdUsed;
            this._useMax = petCvo.zzdMax;
        }
        else if(this._goodsID == ItemsConst.PET_WXD)
        {
            this._useNum = model.wxdUsed;
            this._useMax = petCvo.wxdMax;
        }
        let canUseNum:number = this._useMax - this._useNum;
        this._hasUseTxt.text = LangCVO.getContent("pet2", this._useNum);//当前已使用：{0}
        this._canUseTxt.text = LangCVO.getContent("pet3", canUseNum);//当前可使用：

        this._bagCount = Manager.model.getItems().getCountItemById(this._goodsID);
        this._leftTxt.text = LangCVO.getContent("pet4", this._bagCount);//剩余：{0}个
        this._redIcon.visible = (canUseNum > 0 && this._bagCount > 0);
    }

    private onItemUpdateHandler(e:ItemsEvent):void
    {
        this.invalidate("count");
    }

    private onTouchEvent(e:egret.TouchEvent):void
    {
        if(!this._goodsID) return;
        if(this._bagCount <= 0)
        {
            let cvo = ItemsCVO.getCvo(this._goodsID);
            Manager.view.show(ViewID.ItemsTips,cvo);
            return;
        }
        if(this._useMax <= this._useNum)
        {
            FloatTips.addTips(LangCVO.getContent("pet5"), Color.RED);//当前品阶可使用个数已满
            return;
        }
        if(this._goodsID == ItemsConst.PET_ZZD) Manager.control.getPet().usePetZZD();
        else if(this._goodsID == ItemsConst.PET_WXD) Manager.control.getPet().usePetWXD();
    }

    private onPetUpdateHandler(e:PetEvent):void
    {
        if((e.type == PetEvent.ZZD_USE && this._goodsID == ItemsConst.PET_ZZD)
        || (e.type == PetEvent.WXD_USE && this._goodsID == ItemsConst.PET_WXD))
        this.invalidate("count");
    }

    public reuse(goodsID:number):void
    {
        this._goodsID = goodsID;
        super.reuse();
    }

    public unuse():void
    {
        super.unuse();
        Manager.pool.push(this._goods);
        this._goods = null;
        this._nameTxt.dispose();
        this._nameTxt = null;
        this._hasUseTxt.dispose();
        this._hasUseTxt = null;
        this._canUseTxt.dispose();
        this._canUseTxt = null;
        this._leftTxt.dispose();
        this._leftTxt = null;
        this._useBtn.dispose();
        this._useBtn = null;
        this._redIcon = null;
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.removes(this._goods, this._nameTxt, this._hasUseTxt, this._canUseTxt, this._leftTxt, this._useBtn);
        Manager.pool.push(this._goods);
        this._goods = null;
        this._nameTxt.dispose();
        this._nameTxt = null;
        this._hasUseTxt.dispose();
        this._hasUseTxt = null;
        this._canUseTxt.dispose();
        this._canUseTxt = null;
        this._leftTxt.dispose();
        this._leftTxt = null;
        this._useBtn.dispose();
        this._useBtn = null;
        this._redIcon = null;
    }
}