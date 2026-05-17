/**
 * pzx 
 * 17.12.1
 * 披风item
 */
class CloakItem extends ItemRenderer{
    private _goods:Goods;
    private _starGup:eui.Group;
    private _star1:eui.Image;
    private _star2:eui.Image;
    private _star3:eui.Image;
    private _nameTxt:Label;
    //激活条件
    private _condTxt:Label;

    //选中特效
    private _effGup:eui.Group;
    //当前
    private _dangqianImg:eui.Image;

    private _diImg:eui.Image;

    private _model:CloakModel;
    /** 红色小圆点 */
    private _redImg:eui.Image;

	public constructor() {
		super();
        this.skinName = Manager.path.getSkinName("cloak", "CloakItemSkin");
        this._model = Manager.model.getCloak();
        this._goods.clear();
        this.touchChildren = false;
    }

    protected createChildren():void
    {
        super.createChildren();
        this.addEvent();
    }

    private addEvent():void
    {
        this._model.addEventListener(CloakEvent.CLOAK_TAP_EVENT,this.onClickHandler,this);
        this._model.addEventListener(CloakEvent.CLOAK_WARE_EVENT,this.onWareHanler,this);
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT,this.showRedIcon,this);
    }
    private removeEvent():void
    {
        this._model.removeEventListener(CloakEvent.CLOAK_TAP_EVENT,this.onClickHandler,this);
        this._model.removeEventListener(CloakEvent.CLOAK_WARE_EVENT,this.onWareHanler,this);
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT,this.showRedIcon,this);
    }

    private showRedIcon(e:ItemsEvent)
    {
        if(e.params == ItemsType.BAG)
        {
            let cvo:CloakCVO = this.data as CloakCVO;
        }
    }

    private onClickHandler(e:CloakEvent):void
    {
        let cvo:CloakCVO = this.data as CloakCVO;
        this._effGup.visible =cvo.id == e.params;
        if(cvo.num>0)
        {
            if(cvo.num>=3)
            {
                this._redImg.visible = false;
            }
            else
            {
                let starCvo:CloakStarCvoInfo = cvo.starArr[cvo.num];
                let loss:GainLossVO = new GainLossVO(starCvo.loss);
                this._redImg.visible = loss.isEnough();
            }
        }
        else
        {
            let conList:ConditionVO[] = cvo.act_cond;
            let boo:boolean = true;
			for(let con of conList)
			{
                if(con.type != ConditionVO.CAREER)
                {
                    if(!con.isSatisfy())
                    {
                        boo = false;
                        break
                    }
                }
            }
            if(boo)
            {
                let loss:GainLossVO = cvo.losse;
                this._redImg.visible = loss.isEnough();
            }
        }
    }
    private onWareHanler():void
    {
        let cvo:CloakCVO = this.data as CloakCVO;
        this._dangqianImg.visible = cvo.id == this._model.currentId;
    }

    protected dataChanged():void
    {
        let cvo:CloakCVO = this.data as CloakCVO;
        let less:GainLossVO = cvo.losse;
        this._goods.baseId = less.baseId;
        this._nameTxt.text = cvo.name;
        this._dangqianImg.visible = cvo.id == this._model.currentId;
        this._effGup.visible =cvo.id == this._model.pitchId;
        if(cvo.num>0)
        {
            this._starGup.visible = true;
            for(let i:number = 1;i<4;i++)
            {
                this["_star"+i].visible = i<=cvo.num?true:false;
            }
            this._goods.bgImg.filters = null;
            this._diImg.filters = null;
            this._condTxt.visible = false;
            if(cvo.num>=3)
            {
                this._redImg.visible = false;
            }
            else
            {
                let starCvo:CloakStarCvoInfo = cvo.starArr[cvo.num];
                let loss:GainLossVO = new GainLossVO(starCvo.loss);
                this._redImg.visible = loss.isEnough();
            }
        }
        else
        {
            this._condTxt.text= "";
            this._condTxt.visible = true;
            this._starGup.visible = false;
            let conList:ConditionVO[] = cvo.act_cond;
            let boo:boolean = true;
			for(let con of conList)
			{
                if(con.type != ConditionVO.CAREER)
                {
                    if(!con.isSatisfy())
                    {
                        //this._condTxt.text = "可激活";
                        boo = false;
                        break
                    }
                    if(con.type == ConditionVO.REIN)
                    {
                        this._condTxt.text = con.value+"转可激活"
                    }
                    else if(con.type == ConditionVO.VIP)
                    {
                        this._condTxt.text = "VIP"+con.value+"可激活"
                    }
                    else if(con.type == ConditionVO.LEVEL)
                    {
                        this._condTxt.text = con.value+"级可激活"
                    }
                    break;
                }
				
			}
            FilterUtil.setGrayFilter(this._goods.bgImg);
            FilterUtil.setGrayFilter(this._diImg);
            if(boo)
            {
                let loss:GainLossVO = cvo.losse;
                this._redImg.visible = loss.isEnough();
            }
        }
       
    }
	public dispose():void
	{
		super.dispose();
        this.removeEvent();
        if(this._loadCompltet)
        {
            this._goods.dispose();
            this._goods=null;
            ObjectUtil.removes(this._star1,this._star2,this._star3,this._starGup,this._effGup,this._dangqianImg,this._diImg,this._redImg)
            this._starGup=null;
            this._star1=null;
            this._star2=null;
            this._star3=null;
            this._nameTxt.dispose();
            this._condTxt.dispose();
            this._nameTxt=null;
            this._condTxt=null;
            this._effGup=null;
            this._dangqianImg=null;
            this._model = null;
            this._diImg= null;
            this._redImg = null
        }
	}
}