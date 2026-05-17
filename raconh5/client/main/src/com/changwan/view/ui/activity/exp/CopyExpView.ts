/**
 * 经验副本视图
 * luzhihong
 * create 2018.1.11
 */
class CopyExpView extends UIComponent
{
    private _back:BitmapRemote;
    private _txtCount:Label;
    private _txtTips:Label;
    private _txtCooling:Label;
    private _txtDesc:Label;
    private _btnEnter:Button;
    private _btnAdd:eui.Image;
    private _redIcon:eui.Image;
    private _imgHardLvl:eui.Image;
    private _imgScore:eui.Image;
    private _items:Array<Goods>;
    private _model:CopyExpModel;
    private _cvo:CopyCVO;

	public constructor()
	{
		super();
		this.skinName = Manager.path.getSkinName("activity", "CopyExpViewSkin");
        this.touchChildren = true;
	}

    
    protected configUI():void
    {
        super.configUI();
        this._model = Manager.model.getCopy().expModel;
        this._cvo = CopyCVO.getCVO(CopyConst.ID_EXP);
        
        this._back.load(Manager.path.getActivityPath("exp/back0.jpg"));
        HtmlUtil.setTextFlow(this._txtTips, LangCVO.getContent("copy32"));
        this._items = [];
		let item:Goods;
		let len:number = this._cvo.loss.length;
		for(var i:number=0; i<len; i++)
		{
            item = Manager.pool.create(Goods);
            item.x = 140 + i * 128;
            item.y = 845;
            item.data = this._cvo.loss[i].item;
            this.addChild(item);
            this._items.push(item);
		}
    }

    protected addEvent():void
    {
        super.addEvent();
        this._btnEnter.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._model.addEventListener(CopyEvent.EXP_INFO_UPDATE, this.updateInfo, this);
        Manager.model.getCopy().addEventListener(CopyEvent.UPDATE_BUY_COUNT, this.updateCount, this);
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.updateItem, this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
        this._btnEnter.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._btnAdd.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._model.removeEventListener(CopyEvent.EXP_INFO_UPDATE, this.updateInfo, this);
        Manager.model.getCopy().removeEventListener(CopyEvent.UPDATE_BUY_COUNT, this.updateCount, this);
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.updateItem, this);
    }

	private onClickHandler(e:egret.TouchEvent):void
	{
		switch(e.currentTarget)
		{
			case this._btnEnter:
                if(!this._cvo.isAllCondSatisfy(true)) return;
                //是否还有次数
                if(this._model.leftCount == 0)
                {
                    FloatTips.addTips(LangCVO.getContent("copy5"));//进入次数已满
                    return;
                } 
                if(!this._cvo.isLossEnough(true, false)) 
                {
                    let arr:Array<GainLossVO> = this._cvo.loss;
                    let shopCvo:ShopCVO;
                    for(let i:number= arr.length-1;i>-1;i--)
                    {
                        shopCvo = ShopCVO.getbaseIdCvo(arr[i].baseId);
                        if(shopCvo) 
                        {
                            Manager.view.show(ViewID.ShopBuyView,shopCvo);
                            break;
                        }
                    }
                    return;//材料是否足够
                }
                if(this._model.nextLeftTime > 0)
                {
                    FloatTips.addTips(LangCVO.getContent("copy18"));//冷却中
                    return;
                }
                if(!Manager.model.self.canJoinActive(true)) return;
                Manager.control.getCopy().enter(this._cvo.id);
                Manager.view.hide(ViewID.CopyExpPanel);
				break;
			case this._btnAdd:
                if(Manager.model.self.attrInfo.vipLevel > 0)
                {
                    if(!CopyExpConfigCVO.add_cound_need.isEnough(true)) return;
                    // 19	是否花费{0}购买1次挑战激活
                    let ok:CallBackInfo = Manager.pool.create(CallBackInfo,Manager.control.getCopy().buyCount, Manager.control.getCopy(), CopyConst.TYPE_EXP);
                    Manager.tips.showTips(LangCVO.getContent("copy19", CopyExpConfigCVO.add_cound_need.num), ok, true);
                }
                else 
                {
                    // 8	购买次数已达上限，开通vip可获得更多购买次数，是否前往开通？
                    let ok:CallBackInfo = Manager.pool.create(CallBackInfo,Manager.view.show,Manager.view,ViewID.VipPanel);
                    Manager.tips.showTips(LangCVO.getContent("copy8"),ok,true);
                }
				break;
		}
	}
		
    private updateInfo(e:CopyEvent):void
    {
		this.invalidate("drawInfo");
    }

    private updateCount(e:CopyEvent):void
    {
		this.invalidate("drawCount");
    }

    private updateItem(e:ItemsEvent):void
    {
		this.invalidate("drawItem");
    }
    
    private drawItem():void
    {
        for(var i:number=this._items.length-1; i>=0; i--)
        {
            this._items[i].itemAmount(Manager.model.getItems().getCountItemById(this._cvo.loss[i].baseId), this._cvo.loss[i].num);
        }
    }

    private drawInfo():void
    {
        // 29	下一难度：盟会职位达到<font color='#38b800'>{0}</font>、当前难度<font color='#38b800'>sss</font>通关
        if(this._model.hardLvl < 10)HtmlUtil.setTextFlow(this._txtDesc, LangCVO.getContent("copy29", CopyExpConfigCVO.hardDesc[this._model.hardLvl]));
        else this._txtDesc.text = "";

        this._imgHardLvl.source = "copy_exp_lv_" + this._model.hardLvl + "_png";
        egret.Tween.removeTweens(this._imgHardLvl);
        this._imgHardLvl.scaleX = this._imgHardLvl.scaleY = 3
        egret.Tween.get(this._imgHardLvl).to( {scaleX: 1, scaleY:1}, 200, egret.Ease.circIn);

        let cvo:CopyExpScoreCVO = CopyExpScoreCVO.getCVO(this._model.scoreID);
        this._imgScore.source = cvo ? "copy_exp_score_" + cvo.score + "_png" : null;
        if(this._model.nextLeftTime > 0)
        {
            Manager.render.add(this.countdown, this, 1000);
            this.countdown();
        }
        else 
        {
            Manager.render.remove(this.countdown, this);
            this._txtCooling.text = "";
        }

        this.drawCount();
    }

    private drawCount():void
    {
        let leftCount:number = this._model.leftCount;
        let str:string = leftCount + "/" + this._model.totalCount;
        str = HtmlUtil.addColorTag(str, leftCount > 0 ? Color.GREEN_STR : Color.RED_STR);
        str = LangCVO.getContent("copy6") + str;// 6	剩余次数：
        HtmlUtil.setTextFlow(this._txtCount, str);
    }

    private countdown():void
    {
        let left = this._model.nextLeftTime;
        if(left > 0)
        {
            let str:string = cw.DateUtil.formatStr(left, cw.DateUtil.LEFT_HH_MM_SS, true);
            str = LangCVO.getContent("copy7") + HtmlUtil.addColorTag(str, Color.GREEN_STR);// 7	冷却时间：
            HtmlUtil.setTextFlow(this._txtCooling, str);
        } 
        else
        {
            Manager.render.remove(this.countdown, this);
            this._txtCooling.text = "";
        }
    }

    private drawRedIcon():void
    {
        this._redIcon.visible = /*this._model.nextLeftTime == 0 &&*/ this._model.leftCount > 0 && this._cvo.isLossEnough() && this._cvo.isAllCondSatisfy();
    }

	protected draw():void
	{
		super.draw();
		if(this.isInvalid("drawInfo")) this.drawInfo();
		if(this.isInvalid("drawCount")) this.drawCount();
		if(this.isInvalid("drawItem")) this.drawItem();
		if(this.isInvalid("drawInfo", "drawCount", "drawItem")) this.drawRedIcon();
	}

    protected drawAll():void
    {
        super.drawAll();
        this.drawInfo();
        this.drawItem();
        this.drawRedIcon();
    }

    public dispose():void
    {
        egret.Tween.removeTweens(this._imgHardLvl);
        Manager.render.remove(this.countdown, this);
        super.dispose();
        ObjectUtil.disposes(this._back, this._txtCount, this._txtTips, this._txtCooling, this._txtDesc, this._btnEnter);
        ObjectUtil.removes(this._btnAdd, this._redIcon, this._imgHardLvl, this._imgScore);
        for(var i:number=this._items.length-1; i>=0; i--)
        {
            this._items[i].dispose();
        }
        this._back = null;
        this._txtCount = null;
        this._txtTips = null;
        this._txtCooling = null;
        this._txtDesc = null;
        this._btnEnter = null;
        this._btnAdd = null;
        this._redIcon = null;
        this._imgHardLvl = null;
        this._imgScore = null;
        this._items = null;
        this._model = null;
        this._cvo = null;
    }
}