/**
 * 技能tips
 * liangyan
 * create 2017-11-20
*/
class SkillTips extends UIComponent
{
    private _back:eui.Image;
    private _closeBtn:Button;
    private _titleTxt:Label;
    private _lossItem:BaseGoods;
    private _fightTxt:Label;
    private _awakeTxt:Label;
    private _descTxt:Label;
    private _awakeBtn:Button;
    private _actBtn:Button;
    private _actIcon:eui.Image;
    private _goShopG:eui.Group;
    private _shopBtn0:eui.Group;
    private _shopBtn1:eui.Group;
    private _shopBtn2:eui.Group;

    private _shopBtns:eui.Group[];
    /** 界面列表 */
	private _viewArr:number[];
    /** 页签列表 */
	private _tabArr:number[];

    private _type:number;
    private _cvo:SkillCVO;

    public constructor()
    {
        super();
        this.touchChildren = true;
        this.skinName = Manager.path.getSkinName("skill", "SkillTipsSkin");
    }

    protected configUI():void
    {
        super.configUI();
    }

    protected addEvent():void
    {
        super.addEvent();
        this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        Manager.global.gameMain.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickStageHandler, this);
    }

    protected removeEvent():void
    {
        this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        Manager.global.gameMain.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickStageHandler, this);
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
        this.setType();
        this.setItem();
        this._titleTxt.text = this._cvo.name;
        this._fightTxt.text = LangCVO.getContent("skill8") + this._cvo.addFightValue;//战力：
        HtmlUtil.setTextFlow(this._descTxt, this._cvo.describe);
        this.setAwakeTxt();
    }

    private onTouchHandler(e:egret.TouchEvent):void
    {
        switch(e.currentTarget)
        {
            case this._closeBtn:
                this.hide();
                break;
            case this._awakeBtn:
                if(OpenCVO.isOpen(OpenConst.ID_REIN, true))
                    Manager.link.link(LinkType.PANEL_REIN, 1);
                break;
            case this._actBtn:
                Manager.control.getSkill().actPassive(this._cvo.groupID);
                break;
            case this._shopBtn0:
                Manager.link.link(this._viewArr[0], this._tabArr[0]);
                break;
            case this._shopBtn1:
                Manager.link.link(this._viewArr[1], this._tabArr[1]);
                break;
            case this._shopBtn2:
                Manager.link.link(this._viewArr[2], this._tabArr[2]);
                break;
        }
    }

    private onClickStageHandler(e:egret.TouchEvent):void
    {
        this.hide();
    }

    private removeBtnEvent():void
    {
        this._awakeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._actBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._shopBtn0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._shopBtn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._shopBtn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
    }

    private setItem():void
    {
        if(!this._cvo) return;
        let gainLoss = new GainLossVO(this._cvo.upgradeCost);
        if(!gainLoss) return;
        let bagCount = Manager.model.getItems().getCountItemById(gainLoss.baseId);
        //this._lossItem.setGainLossVO(gainLoss);
        this._lossItem.baseId = gainLoss.baseId;
        this._lossItem.itemAmount(bagCount, gainLoss.num);
        this._lossItem.touchEnabled = false;
    }

    private setType():void
    {
        this._back.height = 363;
        this._awakeBtn.visible = this._actBtn.visible = this._goShopG.visible = this._actIcon.visible = false;
        switch(this._type)
        {
            case SkillTipsType.AWAKE:
                this._awakeBtn.visible = true;
                this._awakeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
                break;
            case SkillTipsType.ACTIVE:
                this._actBtn.visible = true;
                this._actBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
                break;
            case SkillTipsType.GO_SHOP:
                let gainLoss = new GainLossVO(this._cvo.upgradeCost);
                let goodsCvo = ItemsCVO.getCvo(gainLoss.baseId);
			    if(!cw.StringUtil.isEmptyStr(goodsCvo.desc_output))
			    {
                    this._goShopG.visible = true;
                    this._back.height = 440;
                    if(this._viewArr == null) this._viewArr = [];
                    if(this._tabArr == null) this._tabArr = [];
                    var arr:Array<string> = goodsCvo.desc_output.split("|");
				    for(var i= 0; i < 3; i++)
				    {
					    if(arr[i] && arr[i] != "")
					    {
						    let any:any = this.spin(arr[i]);
						    this["_shopBtn" + i].visible = true;
                            this["_shopBtn" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
						    this["_pathBg" + i].load(Manager.path.getPanelUiImgPath("tips/" + any.resImg, "png"));
						    this["_tuijianImg" + i].visible = any.hots == 1;
                            this._viewArr[i] = any.viewId;
                            this._tabArr[i] = any.tab;
					    }
					    else
					    {
						    this["_shopBtn" + i].visible = false;
                            this["_shopBtn" + i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
						    this["_tuijianImg"+i].visible = false;
                            this._viewArr[i] = null;
                            this._tabArr[i] = null;
					    }
				    }
			    }
                else this._back.height = 245;
                break;
            case SkillTipsType.HAS_ACT:
                this._actIcon.visible = true;
                break;
        }
    }

    private setAwakeTxt():void
    {
        if(!this._cvo) return;
        let condition = new ConditionVO(this._cvo.upgradeCond);
        if(!condition) return;
        let color = condition.isSatisfy() ? "#ff8000" : "#ff0000";
        HtmlUtil.setTextFlow(this._awakeTxt, StringUtils.setParam(LangCVO.getContent("skill9"), color, condition.value));//转生：<font color='{0}'>{1}转</font>
    }

    //拆分   {hots_resimg_name_viewId,{1,1,name，shopPanel}}   {是否显推荐_底图id_名字_界面id} 
	private spin(str:string):any
	{
		var reg:RegExp = /{|}| /g;
		str = str.replace(reg,"");
		let arr:Array<string> = str.split(",");
		let obj:any={};
		obj.hots = Number(arr[1]);
		obj.resImg = arr[2];
		obj.name = arr[3];
		obj.viewId = Number(arr[4]);
		let tab:number = 0;//页签默认0
		if(arr[5])
		{
			tab = Number(arr[5]);
		}
		obj.tab = tab;
		return obj;
	}

    public hide():void
    {
        if(this.parent != null) this.unuse();
    }

    public reuse(type:number, cvo:SkillCVO):void
    {
        this._type = type;
        this._cvo = cvo;
        super.reuse();
        if(this.parent == null)
        {
            Manager.layer.uiLayer.addChild(this);
            this.invalidate(InvalidationType.LAYOUT);
        }

        this._shopBtns = [this._shopBtn0, this._shopBtn1, this._shopBtn2];
    }

    public unuse():void
    {
        super.unuse();
        this._cvo = null;

        this._shopBtns = null;
    }

    public dispose():void
    {
        this.removeBtnEvent();
        super.dispose();
        ObjectUtil.removes(this._back, this._closeBtn, this._lossItem, this._titleTxt, this._fightTxt, this._awakeTxt, this._descTxt,
        this._awakeBtn, this._actBtn, this._actIcon, this._goShopG, this._shopBtn0, this._shopBtn1, this._shopBtn2);
        this._back = null;
        this._closeBtn.dispose();
        this._closeBtn = null;
        this._lossItem.dispose();
        this._lossItem = null;
        this._titleTxt.dispose();
        this._titleTxt = null;
        this._fightTxt.dispose();
        this._fightTxt = null;
        this._awakeTxt.dispose();
        this._awakeTxt = null;
        this._descTxt.dispose();
        this._descTxt = null;
        this._awakeBtn.dispose();
        this._awakeBtn = null;
        this._actBtn.dispose();
        this._actBtn = null;
        this._actIcon = null;
        this._goShopG = null;
        if(this._shopBtn0) Manager.pool.push(this._shopBtn0);
        this._shopBtn0 = null;
        if(this._shopBtn1) Manager.pool.push(this._shopBtn1);
        this._shopBtn1 = null;
        if(this._shopBtn2) Manager.pool.push(this._shopBtn2);
        this._shopBtn2 = null;

        this._cvo = null;
        Manager.pool.push(this);

        this._shopBtns = null;
        this._viewArr = null;
        this._tabArr = null;
    }
}