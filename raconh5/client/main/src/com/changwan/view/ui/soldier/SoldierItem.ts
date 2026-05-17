class SoldierItem extends ItemRenderer
{
    private _diImg:eui.Image;
    //选中特效
    private _effGup:eui.Group;
	private _goods:Goods;
    private _starGup:eui.Group;
    private _nameTxt:Label;
    private _starTxt:Label;
    //激活条件
    private _condTxt:Label;
    //当前
    private _dangqianImg:eui.Image;
    private _redIcon:eui.Image;

    private _model:SoldierModel;

	public constructor()
	{
		super();
		this.skinName = Manager.path.getSkinName("soldier", "SoldierItemSkin");
	}

	protected createChildren():void
    {
        super.createChildren();
		this.touchChildren = false;

		this._model = Manager.model.getSoldier();
        this._goods.clear();
        
		this.addEvent();
    }

    private addEvent():void
    {
        this._model.addEventListener(SoldierEvent.SOLDIER_ITEM_CLICK_EVENT, this.onClickHandler, this);
        this._model.addEventListener(SoldierEvent.SOLDIER_PUTON, this.onPutonHandler, this);
        this._model.addEventListener(SoldierEvent.SOLDIER_UPGRADE_STAR,this.onUpdateInfoHandler,this);
    }

    private removeEvent():void
    {
        this._model.removeEventListener(SoldierEvent.SOLDIER_ITEM_CLICK_EVENT, this.onClickHandler, this);
        this._model.removeEventListener(SoldierEvent.SOLDIER_PUTON, this.onPutonHandler, this);
        this._model.removeEventListener(SoldierEvent.SOLDIER_UPGRADE_STAR,this.onUpdateInfoHandler,this);
    }

    private onClickHandler(e:SoldierEvent):void
    {
        let cvo:SoldierCVO = this.data as SoldierCVO;
        this._effGup.visible = cvo.id == e.params;
    }

    private onPutonHandler(e:SoldierEvent):void
    {
        let cvo:SoldierCVO = this.data as SoldierCVO;
        this._dangqianImg.visible = cvo.id == this._model.currentId;
    }

    private onUpdateInfoHandler(e:SoldierEvent):void
    {
        let id:number = Number(e.params);
        let cvo:SoldierCVO = this.data as SoldierCVO;
        if(cvo.id == id)
        {
            this._starTxt.text = LangCVO.getContent("soldier5", cvo.soldierStarNum);
            this._redIcon.visible = Manager.model.getSoldier().checkCanUpgrade(cvo.id);
        }
    }

    protected dataChanged():void
    {
        let cvo:SoldierCVO = this.data as SoldierCVO;
        let less:GainLossVO = new GainLossVO(cvo.starInfoList[1].loss);
        this._goods.baseId = less.baseId;
        this._nameTxt.text = cvo.name;
        this._dangqianImg.visible = cvo.id == this._model.currentId;
        this._effGup.visible = cvo.id == this._model.selectId;
        if(cvo.soldierStarNum > 0)
        {
            this._starGup.visible = true;
            // for(let i:number=1; i<=10; i++)
            // {
			// 	this["_star"+i].visible = (i <= cvo.soldierStarNum ? true:false);
            // }
            this._starTxt.text = LangCVO.getContent("soldier5", cvo.soldierStarNum);
            this._goods.bgImg.filters = null;
            this._diImg.filters = null;
            this._condTxt.visible = false;
        }
        else
        {
            this._condTxt.text= "";
            this._condTxt.visible = true;
            this._starGup.visible = false;
            // let conList:ConditionVO[] = ConditionVO.getVOList(cvo.actCond);
			// for(let con of conList)
			// {
            //     if (con.type == ConditionVO.REIN)
            //     {
            //         this._condTxt.text = LangCVO.getContent("soldier2", con.value);
            //     }
            //     else if (con.type == ConditionVO.VIP)
            //     {
            //         this._condTxt.text = LangCVO.getContent("soldier3", con.value);
            //     }
            //     else if (con.type == ConditionVO.LEVEL)
            //     {
            //         this._condTxt.text = LangCVO.getContent("soldier4", con.value);
            //     }
            //     break;
			// }
            this._condTxt.text = cvo.actCond;
            FilterUtil.setGrayFilter(this._goods.bgImg);
            FilterUtil.setGrayFilter(this._diImg);
        }

        this._redIcon.visible = Manager.model.getSoldier().checkCanUpgrade(cvo.id);
    }

	public dispose():void
	{
        this.removeEvent();
        if(this._loadCompltet)
        {
            ObjectUtil.removes(this._diImg, this._effGup, this._goods, this._starGup, this._nameTxt, this._condTxt, this._dangqianImg, this._starTxt);
            this._diImg = null;
            this._effGup=null;
            if(this._goods)
                this._goods.dispose();
            this._goods=null;
            this._starGup=null;
            if(this._nameTxt)
                this._nameTxt.dispose();
            this._nameTxt=null;
            if(this._condTxt)
                this._condTxt.dispose();
            this._condTxt=null;
            this._dangqianImg=null;
            if(this._starTxt)
                this._starTxt.dispose();
            this._starTxt = null;
            this._model = null;
        }
		super.dispose();
	}
}