/**
 * 绝学
 * pzx
 * create 2018.2.26
 */
class JuexueView extends UIComponent{
	private _model:JuexueModel;
	private _hScroller:BaseHScrollerList;
	private _shuexiTxt0:Label;
	private _shuexiTxt1:Label;
	private _shuexiTxt2:Label;
	private _shuexiTxt3:Label;
    private _txtList:Label[];
    private _juanzouItem:JuexueJuanzouTweenItem;

	private _curTabBtn:JuexueTabBtn;
	private _curTabIndex:number=-1;
    private _tabList:any[];

    private _attrItem:JuexueJuanzouAttrTweenItem;

    public static instance:JuexueView;

    private _fightgroup:eui.Group;
    private _btnGroup:eui.Group;
    private _xinfuBtn:Button;
    private _actBtn:Button;
    private _actImg:eui.Image;

    private _fighting:NumImgView2;
    private _stepsNumImg:NumImgView2;

    private _openCvo:JueXueCVO;

    private _cirImg:eui.Image;
    private _ambitFight:number;

    private _expAni:Animation;
    private _cirAni:Animation;
    private _expMask:egret.Shape;
    /** 升级小红点 */
    private _actRedIcon:eui.Image;
    private _redIcon:eui.Image;

    private _initIndex:number;
    private _bitimg:BitmapRemote;

    private _juexue_extentAni:Animation;


	public constructor()
    {
        super();
        this.touchChildren = true;
        this.skinName = Manager.path.getSkinName("juexue", "JuexueViewSkin");
    }
    protected configUI():void
    {
        super.configUI();
		this._model = Manager.model.getjuexue();
        this._tabList = [
			{type:JuexueType.JUEXUE_ESOTERICA_1},
            {type:JuexueType.JUEXUE_ESOTERICA_2},
            {type:JuexueType.JUEXUE_ESOTERICA_3},
            {type:JuexueType.JUEXUE_ESOTERICA_4}
		];
		this._hScroller.initBtnListData(JuexueTabBtn,this._tabList,true);
		JuexueView.instance = this;
        this._actImg.touchEnabled = false;

        if(!this._fighting)
		{
			this._fighting = Manager.pool.create(NumImgView2);
            this._fighting.y = 13;
            this._fighting.x = 116;
			this._fightgroup.addChild(this._fighting);
		}
        if(!this._stepsNumImg)
        {
            this._stepsNumImg = Manager.pool.create(NumImgView2);
            this._stepsNumImg.y = 211;
            this._stepsNumImg.x = 45;
			this.addChild(this._stepsNumImg);
        }
        this._txtList=[this._shuexiTxt0,this._shuexiTxt1,this._shuexiTxt2,this._shuexiTxt3];

        this.createAni();

        this._bitimg.load(Manager.path.getPanelUiImgPath("juexue/juexue_beijing2"),710);
    }
    protected initData():void
    {
        super.initData();
        let index:number = 0;
        for(let i of this._model.esotericaList)
        {
            if(this._model.checkUpgrade(i))
            {
                index = i-1;
            }
        }
        this._hScroller.itemList.selectedIndex = index;
        this._initIndex = index;
		this.onShortcutHandler(null);
        this.updateJingJie();
    }

    private updateFight():void
    {
         this._fighting.setValue(JueXueCVO.totalFight()+this._ambitFight, "nums_fighting_", 25);
    }

    protected addEvent():void
    {
        super.addEvent();
		this._hScroller.itemList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShortcutHandler, this);
        this._attrItem._item0.close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeAttrItem,this);
        this._attrItem._item1.close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeAttrItem,this);
        this._attrItem._item2.close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeAttrItem,this);
        this._xinfuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.openArtifactPanel,this);
        this._actBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.upgradeJuexueHandler,this);
        this._model.addEventListener(JuexueEvent.JUEXUE_QUERY_EVENT,this.upateViewHandler,this);
        this._cirImg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onUpgradeAmbitLvHandler,this);
        this._model.addEventListener(JuexueEvent.JUEXUE_AMBIT_EVENT,this.updateUpgradeAmbitHandler,this);
        this._model.addEventListener(JuexueEvent.JUEXUE_UPGRADE_EVENT,this.updateUpgradeHandler,this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
		this._hScroller.itemList.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShortcutHandler, this);
        this._attrItem._item0.close.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.closeAttrItem,this);
        this._attrItem._item1.close.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.closeAttrItem,this);
        this._attrItem._item2.close.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.closeAttrItem,this);
        this._xinfuBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.openArtifactPanel,this);
        this._actBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.upgradeJuexueHandler,this);
        this._model.removeEventListener(JuexueEvent.JUEXUE_QUERY_EVENT,this.upateViewHandler,this);
        this._cirImg.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onUpgradeAmbitLvHandler,this);
        this._model.removeEventListener(JuexueEvent.JUEXUE_AMBIT_EVENT,this.updateUpgradeAmbitHandler,this);
        this._model.removeEventListener(JuexueEvent.JUEXUE_UPGRADE_EVENT,this.updateUpgradeHandler,this);
    }
    /** 升级返回 */
    private updateUpgradeHandler(e:BaseEvent):void
    {
        //this._openCvo = e.params;
        this.updateFight();
        this.updateActImg();
        this.updateJingJie();
        this.showActRedIcon();
    }
    
    //升级境界
    private onUpgradeAmbitLvHandler():void
    {
        let cvo :JueXueAmbitCVO = JueXueAmbitCVO.getInfo(this._model.ambitLv);
        if(cvo.loss=="")
        {
            let str:string = LangCVO.getContent("common56");//已满级
            FloatTips.addTips(str,Color.RED);
            return;
        }
        else
        {
            let loss:GainLossVO = new GainLossVO(cvo.loss);
            if(!loss.isEnough())
            {
                
                let str:string = LangCVO.getContent("juexue2");//激活/升级任意绝学可增加境界值（{0}）
                let color:string = HtmlUtil.addColorTag("" + loss.selfCount,Color.RED_STR);
                str = StringUtils.setParam(str,color+"/"+loss.num);
                FloatTips.addTips(str);
                return;
            }
        }
        Manager.control.getjuexue().ambitlv(this._model.ambitLv+1);
    }
    //升级境界返回
    private updateUpgradeAmbitHandler():void
    {
        this._cirAni = Manager.animation.createEffectAnimation("juexueBz");
        this.addChild(this._cirAni);
        this._cirAni.x = 58;
        this._cirAni.y =75;
        this._cirAni.play();
        this.updateJingJie();
        this.showActRedIcon();
    }
    /** 查询返回 */
    private upateViewHandler():void
    {
        this.onShortcutHandler(null);
        this.updateJingJie();
    }
    /** 刷新境界 */
    private updateJingJie():void
    {
        this._stepsNumImg.setValue(this._model.ambitLv, "nums_juexue1_", 20);
        if(this._model.ambitLv<10)
        {
            this._stepsNumImg.x = 45;
        }
        else
        {
            this._stepsNumImg.x = 33;
        }
        let cvo:JueXueAmbitCVO = JueXueAmbitCVO.getInfo(this._model.ambitLv);
        this._ambitFight = 0;
        if(cvo)
        {
            let att:AttrVO = Manager.pool.create(AttrVO,cvo.attr);
            let arr:AttrVoInfo[] = att.attrInfos;
            this._ambitFight = att.getFighting()
            for(let i:number = 0;i<this._txtList.length;i++)
            {
                if(arr[i])
                {
                    if(i==3)
                    {
                        arr[i].sign=" +";
                    }
                    else
                    {
                        arr[i].sign="    +";
                    }
                    this._txtList[i].text = arr[i].desc(true);
                }
                else
                {
                    this._txtList[i].text = "";
                }
            }
            Manager.pool.push(att);
        }
        //=================exp================
        let cirW:number = 160;//写死，特效的高为160;
        if(cvo.loss=="")
        {
            this._redIcon.visible = false;
            this._expAni.y = 170;
        }
        else
        {
            let loss:GainLossVO = new GainLossVO(cvo.loss);
            if(loss.isEnough())
            {
                this._expAni.y = 170;
                this._redIcon.visible = true;
                this.juexue_extent();
            }
            else
            {
                this.clearJuexue_ExtendAni();
                this._expAni.y =330 - loss.selfCount / loss.num * cirW;
                this._redIcon.visible = false;
            }
        }

        this.updateFight();
    }
    private createAni():void
    {
        if(this._expAni== null)
        {
            this._expAni = Manager.animation.createEffectAnimation("juexueXp");
            this.addChildAt(this._expAni,3);
            this._expAni.x = 154;
            this._expAni.y =170;

            this._expMask = Manager.pool.create(egret.Shape);
            this._expMask.x = 263;
            this._expMask.y = 280;
            this._expMask.graphics.beginFill(1,1);
            this._expMask.graphics.drawCircle(0,0,80);
            this._expMask.graphics.endFill();
            this.addChild(this._expMask);
            this._expAni.mask = this._expMask;
        }
    }

    private upgradeJuexueHandler(e:egret.TouchEvent):void
    {
        if(e != null && Manager.model.getGuide().curID == GuideID.JUEXUE_ACTIVE) return;
        if(this._openCvo)
        {
            let loss:GainLossVO;
            if(this._openCvo.lev>0)
            {
                let levCvo:JueXueLeveCVO = this._openCvo.levCvo;
                if(levCvo.loss.length>0)
                {
                    loss = new GainLossVO(levCvo.loss);
                }
            }
            else
            {
                loss = new GainLossVO(this._openCvo.active_loss);
            }

            if(loss)
            {
                if(!loss.isEnough())
                {
                    let cvo:ItemsCVO = ItemsCVO.getCvo(loss.baseId);
                    Manager.view.show(ViewID.ItemsTips,cvo);
                    return;
                }
            }
            Manager.control.getjuexue().upgrade(this._openCvo.id,this._openCvo.lev+1);
        }
    }
    private openArtifactPanel():void
    {
        Manager.view.show(ViewID.ArtifactPanel);
    }
    private closeAttrItem():void
    {
        this._attrItem.visible = false;
        this._juanzouItem.visible = true;
        this._fightgroup.visible = true;
        this._btnGroup.visible = false;
        this._openCvo = null;
    }
	private onShortcutHandler(e:egret.Event):void
    {
        if(this._juanzouItem.isStarPlay || this._attrItem.isStarPlay) return;
        let index = this._hScroller.itemList.selectedIndex;
        if(index < 0) return;
		if(index == this._curTabIndex) {
            if(this._attrItem.visible)
            {
                this.closeAttrItem();
            }
        }
        let item = this._hScroller.itemList.getElementAt(index) as JuexueTabBtn;
		if(this._curTabBtn)
		{
			this._curTabBtn.isSelected(false);
		}
        else
        {
            let item1 = this._hScroller.itemList.getElementAt(this._initIndex) as JuexueTabBtn;
            if(item1) item1.isSelected(false);
        }
        if(item) item.isSelected(true);
        else (this._hScroller.itemList.dataProvider as eui.ArrayCollection).source[index].isSelected=true;
		this._curTabBtn = item;
        this._curTabIndex = index;
        let type = this._tabList[index].type;
        this.changeJuanZouData(type);
    }
    private changeJuanZouData(type:number):void{
        let arr:JueXueCVO[] = JueXueCVO.getList(type);
        this._juanzouItem.setData(arr);
        if(this._attrItem.visible)
        {
            this.closeAttrItem();
        }
    }

    public playAttrItem(value:JueXueCVO):void
    {
        this._openCvo = value;
        this._attrItem.setData(value);
        this._attrItem.visible = true;
        this._juanzouItem.visible = false;
        this._fightgroup.visible = false;
        this._btnGroup.visible = true;
        this.updateActImg();
        this.showActRedIcon();

        //引导
        if(Manager.model.getGuide().curID == GuideID.JUEXUE_ACTIVE)
        {
            if(this._actBtn)
            {
                if(!this._actBtn.visible) Manager.control.getTask().hideGuide();
                else 
                {
                    let pos:egret.Point = this._actBtn.parent.localToGlobal(this._actBtn.x,this._actBtn.y);
                    Manager.control.getTask().showGuide(pos, this._actBtn.width>>1, this._actBtn.height>>1, this.guideCB, this, false);
                }
            }
            else Manager.control.getTask().hideGuide();
        }
    }

    public updateopenCvo(value:JueXueCVO):void
    {
        this._openCvo = value;
        this.updateActImg();
        this.showActRedIcon();
    }
    /** 更新升级图片 */
    private updateActImg():void
    {
        if(this._openCvo.lev==0)
        {
            this._actImg.source = "common_active_png";
        }
        else
        {
            this._actImg.source = "common_label_upgrade_png";
        }
    }
/** 更新升级小红点 */
    private showActRedIcon():void
    {
        if(this._openCvo)
        this._actRedIcon.visible = this._openCvo.checkUpgrade();
    }

    protected drawAll():void
	{
		super.drawAll();
	}

	protected draw():void
	{
		super.draw();
        if(this.isInvalid(InvalidationType.DATA)) this.drawData();
	}

    public setData(data):void
    {
        this.invalidate(InvalidationType.DATA);
    }

    private drawData():void{

    }

    public reuse():void
    {
        super.reuse();
       
    }

    public unuse():void
    {
        super.unuse();
		this.clear();
    }
	
	private clear(isRemove:boolean=false):void
	{
		if(isRemove)
		{
			ObjectUtil.disposes(this._hScroller,this._shuexiTxt0,this._shuexiTxt1,this._shuexiTxt2,this._shuexiTxt3,this._juanzouItem,this._curTabBtn,
            this._attrItem,this._xinfuBtn,this._actBtn);
            ObjectUtil.removes(this._fightgroup,this._btnGroup,this._actImg,this._actRedIcon,this._cirImg,this._redIcon)
		}
        this._model=null;
        this._hScroller=null;
        this._shuexiTxt0=null;
        this._shuexiTxt1=null;
        this._shuexiTxt2=null;
        this._shuexiTxt3=null;
        this._txtList=null;
        this._juanzouItem=null;
        

        this._curTabBtn=null;
        this._tabList=null;

        this._attrItem=null;

        JuexueView.instance=null;

        this._fightgroup=null;
        this._btnGroup=null;
        this._xinfuBtn=null;
        this._actBtn=null;
        this._actImg=null;
        Manager.pool.push(this._fighting);
        this._fighting=null;
        Manager.pool.push(this._stepsNumImg);
        this._stepsNumImg=null;

        this._openCvo=null;
        this._cirImg=null;
        Manager.pool.push(this._expAni);
        this._expAni=null;
        if(this._cirAni)
        {
            Manager.pool.push(this._cirAni);
            this._cirAni=null;
        }
        Manager.pool.push(this._expMask);
        this._expMask=null;
        this._actRedIcon=null;
        this._redIcon=null;
        if(this._bitimg)
		{
			Manager.pool.push(this._bitimg)
			this._bitimg = null;
		}
		this.clearJuexue_ExtendAni();
	}

    private guideCB():void
    {
        this.upgradeJuexueHandler(null);
        Manager.control.getTask().hideGuide();
    }

    private juexue_extent():void
    {
        this.clearJuexue_ExtendAni();
        this._juexue_extentAni = Manager.animation.createEffectAnimation("juexue_extent");
        this.addChild(this._juexue_extentAni);
        this._juexue_extentAni.x = 135;
        this._juexue_extentAni.y =155;
    }

    private clearJuexue_ExtendAni():void
    {
        if(this._juexue_extentAni) 
        {
            Manager.pool.push(this._juexue_extentAni);
            this._juexue_extentAni = null;
        }
    }

    public dispose():void
    {
        if(Manager.model.getGuide().curID == GuideID.JUEXUE_ACTIVE) Manager.control.getTask().hideGuide();
        super.dispose();
        this.clear(true);
    }
}