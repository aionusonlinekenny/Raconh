/**
 * 兵魂
 * Simon
 * 2017.12.19
 */
class SoldierView extends UIComponent
{
	private _scroller:BaseVScrollerList;
    private _nameImg:eui.Image;
	private _fightImg:eui.Image;
	private _attrTxt1:Label;
	private _attrTxt2:Label;
	private _attrTxt3:Label;
    private _numTxt:Label;
	private _putonBtn:Button;
	private _activeBtn:Button;
	private _actImg:eui.Image;
	private _putonImg:eui.Image;
	private _takeoffImg:eui.Image;
	private _upgradeImg:eui.Image;
    private _diGroup:eui.Group;
    private _bgImg:BitmapRemote;

    private _model:SoldierModel;
    private _backStarList:Array<BitmapRes>;
	private _starList:Array<BitmapRes>;
    private _goods:BaseGoods;
	private _fighting:NumImgView2;
	private _currentIndex:number = 0;
	private _cvo:SoldierCVO;
	private _soldier:Animation;
    private _localId:number;
    private _leftBgImg:BitmapRemote;

	public constructor()
	{
		super();
        this.touchChildren = true;
		this.skinName = Manager.path.getSkinName("soldier", "SoldierViewSkin");
	}

	protected configUI():void
    {
        super.configUI();

		this._actImg.touchEnabled = this._putonImg.touchEnabled = this._takeoffImg.touchEnabled = this._upgradeImg.touchEnabled = false;
		this._takeoffImg.visible = this._upgradeImg.visible = false;

        this._leftBgImg = Manager.pool.create(BitmapRemote);
        this._leftBgImg.x = 6;
        this._leftBgImg.y = 124;
        this.addChildAt(this._leftBgImg, 0);
        this._leftBgImg.load(PathInfo.getPath("res/common/common_pnl_back2.png", LoaderType.IMAGE), 244, 853);

        this._bgImg = Manager.pool.create(BitmapRemote);
        this._bgImg.x = 0;
        this._bgImg.y = 0;
        this._bgImg.load(Manager.path.getPanelUiImgPath("cloak/cloak_di3", "png"), 454, 629);
        this._diGroup.addChild(this._bgImg);

        this._backStarList = [];
        this._starList = [];
        for(let i:number=0; i<10; i++)
        {
            let img:BitmapRes = BitmapRes.create("common_star_grey_png", 290 + i * 40, 146, 32, 30);
            this.addChild(img);
            this._backStarList.push(img);

            let img2:BitmapRes = BitmapRes.create("common_star_bright_png", 290 + i * 40, 146, 32, 30);
            this._starList.push(img2);
        }

        // this._goods = Manager.pool.create(BaseGoods);
        // this._goods.x = 530;
        // this._goods.y = 807;
        // this.addChildAt(this._goods, this.getChildIndex(this._numTxt) - 1);

        this._numTxt.touchEnabled = false;

		this._fighting = Manager.pool.create(NumImgView2);
		this._fighting.x = this._fightImg.x + this._fightImg.width + 10;
        this._fighting.y = this._fightImg.y + 10;
		this.addChild(this._fighting);
		this._fighting.setValue(0, "nums_fighting_", 25);

		// this._currentIndex = -1;

        this._model = Manager.model.getSoldier();
	}

    protected initData():void
	{
        this._scroller.initBtnListData(SoldierItem, this._model.getList(), true);

        this._localId = this._model.canUpgradeLocal;

        if(this._currentIndex != -1)
            Manager.render.add(this.initSelect, this, 500);
        else
            Manager.control.getSoldier().query();
    }

    private initSelect():void
    {
        Manager.render.remove(this.initSelect, this);
        this.onSelectItemHandler();
        // this._model.canUpgradeLocal = 0;
        this._localId = 0;
    }

	protected addEvent():void
    {
        super.addEvent();
        this._scroller.itemList.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onClickItemHandler,this);
        this._activeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onActiveHandler,this);
        this._putonBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onPutonHandler,this);
		this._model.addEventListener(SoldierEvent.SOLDIER_INFO_UPDATE,this.onUpdateInfoHandler,this);
        this._model.addEventListener(SoldierEvent.SOLDIER_UPGRADE_STAR,this.onUpdateInfoHandler,this);
        this._model.addEventListener(SoldierEvent.SOLDIER_PUTON,this.onUpdatePutonHandler,this);
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onUpdateItemHandler, this);
    }
  
    protected removeEvent():void
    {
        super.removeEvent();
        this._scroller.itemList.removeEventListener(eui.ItemTapEvent.ITEM_TAP,this.onClickItemHandler,this);
        this._activeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onActiveHandler,this);
        this._putonBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onPutonHandler,this);
        this._model.removeEventListener(SoldierEvent.SOLDIER_INFO_UPDATE,this.onUpdateInfoHandler,this);
        this._model.removeEventListener(SoldierEvent.SOLDIER_UPGRADE_STAR,this.onUpdateInfoHandler,this);
        this._model.removeEventListener(SoldierEvent.SOLDIER_PUTON,this.onUpdatePutonHandler,this);
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onUpdateItemHandler, this);
        if(this._soldier) this._soldier.removeEventListener(GlobalEvent.ANIMATION_LOAD_COMPLETE, this.onSoldierLoadComplete, this);
    }

    private onUpdateInfoHandler(e:SoldierEvent):void
    {
        this._scroller.itemList.selectedIndex = 0;
        if(this._cvo == null || this._localId != 0)
        {
            if(this._localId != 0)
            {
                let index:number = 0;
                for(let info of this._model.getList())
                {
                    if(info.id == this._localId)
                    {
                        this._cvo = info;
                        this._currentIndex = index;
                        break;
                    }
                    index += 1;
                }
            }
            else
            {
                if(this._model.currentId == 0)
                {
                    this._cvo = this._model.getList()[0];
                }
                else
                {
                    let index:number = 0;
                    for(let info of this._model.getList())
                    {
                        if(info.id == this._model.currentId)
                        {
                            this._cvo = info;
                            this._currentIndex = index;
                            break;
                        }
                        index += 1;
                    }
                }
            }
        }
        if(this._cvo)
        {
            this._model.selectId = this._cvo.id
            this.updateView();
        }
    }

    private updateView():void
    {
        if(this._soldier)
            Manager.pool.push(this._soldier);
        this._soldier = Manager.animation.createPanelShenbingAnimation("" + this._cvo.resId);
        this._soldier.addEventListener(GlobalEvent.ANIMATION_LOAD_COMPLETE, this.onSoldierLoadComplete, this);
		if(!this._soldier.parent)
        	this.addChild(this._soldier);
        this._soldier.x = -110;
        this._soldier.y = -200;
        let id:string = String(this._model.selectId);
        this._nameImg.source = "soldier_name"+ ( id.substr(id.length - 1, 1) ) +"_png";
        for(let i:number=1; i<=10; i++)
        {
            if(i <= this._cvo.soldierStarNum)
                this.addChild(this._starList[i - 1]);
            else
            {
                if(this._starList[i - 1].parent)
                    this._starList[i - 1].parent.removeChild(this._starList[i - 1]);
            }
        }
        if(this._cvo.soldierStarNum == 0)
        {
            //未激活的
            this._actImg.visible = true;
            this._upgradeImg.visible = false;
            this._putonImg.visible = true;
            this._takeoffImg.visible = false;
            FilterUtil.setGrayFilter(this._putonBtn);
            FilterUtil.setGrayFilter(this._putonImg);
        }
        else 
        {
            this._putonBtn.filters = null;
            this._putonImg.filters = null;
            this._actImg.visible = false;
            this._upgradeImg.visible =true;
            if(this._cvo.id == this._model.currentId)
            {
                this._takeoffImg.visible = true;
                this._putonImg.visible = false;
            }
            else
            {
                this._takeoffImg.visible = false;
                this._putonImg.visible = true;
            }
        }

        let attr:AttrVO = this._cvo.getAttrVO();
        let attrList:Array<AttrVoInfo> = attr.attrInfos;

        let i:number = 1;
        let fightNum:number = 0;
        for(let info of attrList)
        {
            if(info)
            {
                if(this["_attrTxt"+ i])
                    this["_attrTxt"+ i].text = info.desc();
                i += 1;
            }
        }

        this._fighting.setValue(attr.getFighting(), "nums_fighting_", 25);
        this._fighting.x = this._fightImg.x + this._fightImg.width - 10;

        let index:number = this._cvo.soldierStarNum + 1;
        if(this._cvo.soldierStarNum >= 10)
            index = 10;
        let starCvo:SoldierStarCvoInfo = this._cvo.starInfoList[index];
        let less:GainLossVO = new GainLossVO(starCvo.loss);
        this._goods.baseId = less.baseId;
        this._goods.count = 1;

        let bagCount = Manager.model.getItems().getCountItemById(less.baseId);
        let numloss:string;
        if(less.isEnough())
            numloss =  bagCount + "/" + less.num;
        else
            numloss = HtmlUtil.addColorTag("" + bagCount,"#ff0000") + "/" + less.num;

        this._numTxt.textFlow = new egret.HtmlTextParser().parse(numloss);
    }

	private onSoldierLoadComplete(e:GlobalEvent):void
    {
		this._soldier.removeEventListener(GlobalEvent.ANIMATION_LOAD_COMPLETE, this.onSoldierLoadComplete, this);
		this._soldier.play();
    }

    private onUpdateItemHandler(e:ItemsEvent):void
    {
        this.onSelectItemHandler();
    }

	private onClickItemHandler(e:eui.ItemTapEvent):void
    {
        var index:number = this._scroller.itemList.selectedIndex;
        if(this._currentIndex == index) return;
        this._currentIndex = index;
        this.onSelectItemHandler();
    }

    private onSelectItemHandler():void
    {
        let item:SoldierItem = this._scroller.itemList.getElementAt(this._currentIndex) as SoldierItem;
        this._cvo = item.data;
        this._model.selectId = this._cvo.id;
        this._model.dispatchEvent(new SoldierEvent(SoldierEvent.SOLDIER_ITEM_CLICK_EVENT, this._cvo.id));
        this.updateView();
    }

    //激活/升星
    private onActiveHandler(e:egret.TouchEvent):void
    {
        if(this._cvo.soldierStarNum > 0)
        {
            //升星
            if(this._cvo.soldierStarNum >= 10)
            {
                // Manager.tips.showTips(LangCVO.getContent("soldier1"), null, false);
                FloatTips.addTips(LangCVO.getContent("soldier1"), Color.RED);
                return;
            }
            let starCvo:SoldierStarCvoInfo = this._cvo.starInfoList[this._cvo.soldierStarNum + 1];
            let loss:GainLossVO = new GainLossVO(starCvo.loss);
            if(loss.isEnough())
            {
                Manager.control.getSoldier().upgradeStar(this._cvo.id)
            }
            else
            {
                let cvo:ItemsCVO = ItemsCVO.getCvo(loss.baseId);
                Manager.view.show(ViewID.ItemsTips, cvo);
            }
        }
        else
        {
            // 激活
            if(this._cvo.actConsume)
            {
                let less:GainLossVO = new GainLossVO(this._cvo.actConsume);
                if(less.isEnough())
                {
                    // let actList:ConditionVO[] = ConditionVO.getVOList(this._cvo.actCond);
                    // let str:string="";
                    // for(let con of actList)
                    // {
                    //     if(!con.isSatisfy())
                    //     {
                    //         if(con.type == ConditionVO.REIN)
                    //         {
                    //             str = LangCVO.getContent("soldier2", con.value);
                    //         }
                    //         else if(con.type == ConditionVO.VIP)
                    //         {
                    //             str = LangCVO.getContent("soldier3", con.value);
                    //         }
                    //         else if(con.type == ConditionVO.LEVEL)
                    //         {
                    //             str = LangCVO.getContent("soldier4", con.value);
                    //         }
                    //         break;
                    //     }
                    // }
                    // if(str.length>0)
                    // {
                    //     // Manager.tips.showTips(str,null,false);
                    //     FloatTips.addTips(str, Color.RED);
                    // }
                    // else
                    // {
                        Manager.control.getSoldier().activate(this._cvo.id);
                    // }
                }
                else
                {
                    let cvo:ItemsCVO = ItemsCVO.getCvo(less.baseId);
                    Manager.view.show(ViewID.ItemsTips, cvo);
                }
            }
            else
            {
                let starCvo:SoldierStarCvoInfo = this._cvo.starInfoList[1];
                let loss:GainLossVO = new GainLossVO(starCvo.loss);
                if(loss.isEnough())
                {
                    Manager.control.getSoldier().activate(this._cvo.id)
                }
                else
                {
                    let cvo:ItemsCVO = ItemsCVO.getCvo(loss.baseId);
                    Manager.view.show(ViewID.ItemsTips, cvo);
                }
            }
        }
    }

    //穿戴
    private onPutonHandler(e:egret.TouchEvent):void
    {
        if(this._cvo.id == this._model.currentId)
            Manager.control.getSoldier().puton(0);
        else
            Manager.control.getSoldier().puton(this._cvo.id);
    }

    private onUpdatePutonHandler(e:SoldierEvent):void
    {
        this._putonImg.visible = !this._putonImg.visible;
        this._takeoffImg.visible = !this._takeoffImg.visible;
        // if(this._cvo.id == this._model.currentId)
        // {
        //     this._putonImg.visible = false;
        //     this._takeoffImg.visible = true;
        // }
        // else
        // {
        //      this._putonImg.visible = true;
        //     this._takeoffImg.visible = false;
        // }
    }

    public reuse(value:number = -1):void
    {
        super.reuse();

        if(value != -1)
            this._currentIndex = value - 1;
    }

    public unuse():void
    {
        Manager.render.remove(this.initSelect, this);
        super.unuse();
    }

    public dispose():void
    {
        Manager.render.remove(this.initSelect, this);
        ObjectUtil.removes(this._scroller, this._nameImg, this._fightImg, this._attrTxt1, this._attrTxt2, this._attrTxt3,
            this._goods, this._numTxt, this._putonBtn, this._activeBtn, this._actImg, this._putonImg, this._takeoffImg, this._upgradeImg, this._bgImg, this._diGroup, this._leftBgImg);
        super.dispose();

        if(this._leftBgImg)
            Manager.pool.push(this._leftBgImg);
        this._leftBgImg = null;
        if(this._bgImg)
            Manager.pool.push(this._bgImg);
        this._bgImg = null;
        this._diGroup = null;
        
        if(this._scroller)
            this._scroller.dispose();
        this._scroller = null;
        this._nameImg = null;
        this._fightImg = null;
        if(this._attrTxt1)
            this._attrTxt1.dispose();
        this._attrTxt1 = null;
        if(this._attrTxt2)
            this._attrTxt2.dispose();
        this._attrTxt2 = null;
        if(this._attrTxt3)
            this._attrTxt3.dispose();
        this._attrTxt3 = null;
        if(this._goods)
            this._goods.dispose();
        this._goods = null;
        if(this._numTxt)
            this._numTxt.dispose();
        this._numTxt = null;
        if(this._putonBtn)
            this._putonBtn.dispose();
        this._putonBtn = null;
        if(this._activeBtn)
            this._activeBtn.dispose();
        this._activeBtn = null;
        this._actImg = null;
        this._putonImg = null;
        this._takeoffImg = null;
        this._upgradeImg = null;
    }
}