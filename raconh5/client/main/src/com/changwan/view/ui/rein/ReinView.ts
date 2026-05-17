/**
 * 转生界面
 * liangyan
 * create 2017-12-14
*/
class ReinView extends UIComponent
{
    private _curImg:eui.Image;
    private _nextImg:eui.Image;
    private _attrTxt:Label;
    private _fightImg:eui.Image;
    private _reinBtn:Button;
    private _reinIcon:eui.Image;
    private _cond0:ReinConditionItem;
    private _cond1:ReinConditionItem;
    private _cond2:ReinConditionItem;
    private _cond3:ReinConditionItem;
    private _finishIcon:eui.Image;

    private _fightView:NumImgView2;
    private _roleModel:egret.DisplayObjectContainer;
    private _curLvl:NumImgView2;
    private _nextLvl:NumImgView2;
    private _itemObject:ItemObject;
    
    // private _goods:BaseGoods[];
    private _condArr:ReinConditionItem[];
    private _curCvo:ReinCVO;
    private _itemInfoList:Array<ItemsModelInfo>;

    public constructor()
    {
        super();
        this.touchChildren = true;
        this.skinName = Manager.path.getSkinName("rein", "ReinViewSkin");
    }

    protected configUI():void
    {
        super.configUI();
    }

    protected addEvent():void
    {
        super.addEvent();
        this._reinBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);

        Manager.model.getRein().addEventListener(ReinEvent.REIN_INFO, this.onReinUpdateHandler, this);
        Manager.model.getRein().addEventListener(ReinEvent.REIN_APPLY, this.onReinUpdateHandler, this);

        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onUpdateCheckHandler, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL, this.onUpdateCheckHandler, this);
        Manager.model.getCopy().addEventListener(CopyEvent.UPDATE_SINGLE, this.onUpdateCheckHandler, this);
        Manager.model.getRein().addEventListener(ReinEvent.REIN_BOSS_UPDATE, this.onUpdateCheckHandler, this);
    }

    protected removeEvent():void
    {
        this._reinBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);

        Manager.model.getRein().removeEventListener(ReinEvent.REIN_INFO, this.onReinUpdateHandler, this);
        Manager.model.getRein().removeEventListener(ReinEvent.REIN_APPLY, this.onReinUpdateHandler, this);

        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onUpdateCheckHandler, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.LEVEL, this.onUpdateCheckHandler, this);
        Manager.model.getCopy().removeEventListener(CopyEvent.UPDATE_SINGLE, this.onUpdateCheckHandler, this);
        Manager.model.getRein().removeEventListener(ReinEvent.REIN_BOSS_UPDATE, this.onUpdateCheckHandler, this);
        super.removeEvent();
    }

    protected initData():void
    {
        super.initData();
    }

    protected drawAll():void
    {
        super.drawAll();
        this.drawLayout();
        this.drawData();
    }

    protected draw():void
    {
        super.draw();
        if(this.isInvalid(InvalidationType.LAYOUT)) this.drawLayout();
        if(this.isInvalid(InvalidationType.DATA)) this.drawData();
    }

    private drawLayout():void
    {
        if(!this._curCvo) return;
        let isMax = this._curCvo.isMax;
        // let nextCvo = isMax ? null : ReinCVO.getCvo(this._curCvo.level + 1);
        //属性
        let str = "";
        let info:AttrVoInfo;
        let infos = this._curCvo.attr.attrInfos;
        for(let i = 0; i < infos.length; i++)
        {
            info = infos[i];
            if(i != infos.length-1) str += info.name + "+" + info.num + "\n";
            else str += info.name + "+" + info.num;
        }
        HtmlUtil.setTextFlow(this._attrTxt, str);
        //战力
        if(!this._fightView)
		{
			this._fightView = Manager.pool.create(NumImgView2);
			this._fightView.x = this._fightImg.x + 150;
			this._fightView.y = this._fightImg.y + 15;
			this.addChild(this._fightView);
		}
        this._fightView.setValue(this._curCvo.attr.getFighting(), "nums_fighting_", 25);
        //人物外形
        this.showAni();
        //当前转数、下一转数
        if(!this._curLvl)
		{
			this._curLvl = Manager.pool.create(NumImgView2);
			this._curLvl.x = this._curImg.x - 50;
			this._curLvl.y = this._curImg.y;
			this.addChild(this._curLvl);
		}
        if(!this._nextLvl)
		{
			this._nextLvl = Manager.pool.create(NumImgView2);
			this._nextLvl.x = this._nextImg.x - 50;
			this._nextLvl.y = this._nextImg.y;
			this.addChild(this._nextLvl);
		}
        if(!isMax)
        {
            this._curLvl.setValue(this._curCvo.level, "nums_rein_", 41);
            this._nextLvl.setValue(this._curCvo.level + 1, "nums_rein_", 41);
        }
        else
        {
            this._curLvl.setValue(this._curCvo.level - 1, "nums_rein_", 41);
            this._nextLvl.setValue(this._curCvo.level, "nums_rein_", 41);
        }
        //条件子项
        this.updateCond();
        //转生物品物品
        let showRewards:GainLossVO[];
        if(isMax) showRewards = ReinCVO.getCvo(this._curCvo.level - 1).showRewards;
        else showRewards = this._curCvo.showRewards;
        let len = showRewards != null ? showRewards.length : 0;
        // let goods:BaseGoods;
        // for(let j = 0; j < len; j++)
        // {
        //     goods = Manager.pool.create(BaseGoods);
        //     goods.baseId = showRewards[j].baseId;
        //     goods.x = 28;
        //     goods.y = 187 + j * 152;
        //     this._goods.push(goods);
        //     this.addChild(goods);
        // }

        this.cleanItemInfoList();
        this._itemInfoList = [];
        for(let j:number=0; j<len; j++)
        {
            let info:ItemsModelInfo = Manager.pool.create(ItemsModelInfo);
            info.id = j + 1;
            info.base_id = showRewards[j].baseId;
            this._itemInfoList.push(info);
        }

		this._itemObject = Manager.pool.create(ItemObject, this._itemInfoList, 1, 11);
		this._itemObject.touchChildren = true;
        this._itemObject.x = 28;
        this._itemObject.y = 187;
		this.addChild(this._itemObject);


        //转生完成标记、转生按钮
        this._finishIcon.visible = isMax;
        this._reinBtn.visible = !isMax;
    }

    private cleanItemInfoList():void
    {
        if(this._itemInfoList)
        {
            for(let i:number=0; i<this._itemInfoList.length; i++)
            {
                if(this._itemInfoList[i])
                    Manager.pool.push(this._itemInfoList[i]);
                this._itemInfoList[i] = null;
            }
        }
        this._itemInfoList = null;
    }

    private drawData():void
    {}

    private showAni():void
	{
        if(!this._curCvo) return;
        let attrInfo:GameObjectAttrInfo = Manager.model.self.attrInfo;
		if(!this._roleModel)
		{
			this._roleModel = Manager.pool.create(RoleAnimation, this._curCvo.dress, attrInfo.weapon, attrInfo.wing);
			this.addChildAt(this._roleModel, 0);
		}

		this._roleModel.x = -280;
		this._roleModel.y = -150;
	}

    private clearAni():void
    {
        if(this._roleModel)
		{
			Manager.pool.push(this._roleModel);
			this._roleModel = null;
		}
    }

    private updateCond():void
    {
        if(!this._curCvo) return;
        let cvo = ReinCVO.getCvo(this._curCvo.level);
        if(cvo.isMax) cvo = ReinCVO.getCvo(cvo.level - 1);
        for(let i = 0; i < cvo.condArr.length; i++)
        {
            this._condArr[i].vo = cvo.condArr[i];
        }
        this._condArr[this._condArr.length - 1].vo = cvo.loss;

        this._reinIcon.visible = Manager.model.getRein().getCheckCanRein();
    }

    private onTouchHandler(e:egret.TouchEvent):void
    {
        if(!this._condArr) return;
        let allFinish = true;
        for(let i = 0; i < this._condArr.length; i++)
        {
            if(!this._condArr[i].isFinish)
            {
                allFinish = false;
                break;
            }
        }
        if(!allFinish)
        {
            FloatTips.addTips(LangCVO.getContent("rein8"), Color.RED);//请完成转生目标
            return;
        }
        else Manager.control.getRein().reinApply();
    }

    private onReinUpdateHandler(e:ReinEvent):void
    {
        if(e.type == ReinEvent.REIN_APPLY)
        {
            Manager.view.show(ViewID.ReinSuccView);
            this.updateCvo();
            this.invalidate(InvalidationType.LAYOUT);
        }
        else if(e.type == ReinEvent.REIN_INFO) this.updateCond();
    }

    private onUpdateCheckHandler(e:BaseEvent):void
	{
		if(e.type == ItemsEvent.ITEM_UPDATE_EVENT && e.params != ItemsType.BAG) return;

        this.updateCond();
	} 

    private updateCvo():void
    {
        this._curCvo = ReinCVO.getCvo(Manager.model.self.attrInfo.zhuanshu);
    }

    // private clearGoods():void
    // {
    //     let len = this._goods != null ? this._goods.length : 0;
    //     for(let i = 0; i < len; i++)
    //     {
    //         Manager.pool.push(this._goods[i]);
    //         this._goods[i] = null;
    //     }
    //     this._goods.length = 0;
    // }

    public reuse():void
    {
        super.reuse();
        // this._goods = [];
        this._itemInfoList = [];
        this._condArr = [this._cond0, this._cond1, this._cond2, this._cond3];
        this.updateCvo();
    }

    public unuse():void
    {
        super.unuse();
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.removes(this._curImg, this._nextImg, this._attrTxt, this._reinBtn, this._reinIcon, 
        this._cond0, this._cond1, this._cond2, this._cond3, this._finishIcon, this._itemObject);
        this._curImg.bitmapData = null;
        this._curImg = null;
        this._nextImg.bitmapData = null;
        this._nextImg = null;
        this._fightImg.bitmapData = null;
        this._fightImg = null;
        this._attrTxt.dispose();
        this._attrTxt = null;
        this._reinBtn.dispose();
        this._reinBtn = null;
        this._reinIcon.bitmapData = null;
        this._reinIcon = null;
        this._cond0.dispose();
        this._cond0 = null;
        this._cond1.dispose();
        this._cond1 = null;
        this._cond2.dispose();
        this._cond2 = null;
        this._cond3.dispose();
        this._cond3 = null;
        this._finishIcon.bitmapData = null;
        this._finishIcon = null;
        if(this._itemObject)
            this._itemObject.dispose();
        this._itemObject = null;
        if(this._fightView)
            this._fightView.dispose();
        this._fightView = null;
        if(this._curLvl)
            this._curLvl.dispose();
        this._curLvl = null;
        if(this._nextLvl)
            this._nextLvl.dispose();
        this._nextLvl = null;

        this.clearAni();
        // this.clearGoods();
        this.cleanItemInfoList();
        this._condArr.length = 0;
    }
}