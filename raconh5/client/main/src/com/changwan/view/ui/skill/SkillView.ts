/**
 * 技能视图
 * liangyan
 * create 2017-12-21
*/
class SkillView extends UIComponent
{
    // private _weaponList:BaseHScrollerList;
    private _skillList:BaseVScrollerList;
    private _fightImg:eui.Image;
    private _effTxt:Label;
    private _desc1Txt:Label;
    private _desc2Txt:Label;
    private _desc3Txt:Label;
    private _upgradeBtn:Button;
    private _upgradeIcon:eui.Image;
    private _allUpBtn:Button;
    private _allUpIcon:eui.Image;
    private _selectedGrid:SkillSelectedGrid;
    private _mark0:SkillMarkGrid;
    private _mark1:SkillMarkGrid;
    private _mark2:SkillMarkGrid;
    private _mark3:SkillMarkGrid;

    private _upgradeMoney:GameMoneyView;
    private _allUpMoney:GameMoneyView;
    private _markArr:Array<SkillMarkGrid>;
    private _markPointArr:Array<egret.Point>;
    private _curSkillInfo:SkillInfo;
    private _fighting:NumImgView2;
    private _isInit:boolean;
    private _allUpArr:Array<Object>;
    private _allUpCost:number;
    private _btnEff:Animation;
    private _leftBgImg:BitmapRemote;

    public constructor()
    {
        super();
        this.touchChildren = true;
        this.skinName = Manager.path.getSkinName("skill", "SkillViewSkin");
    }

    protected configUI():void
    {
        super.configUI();

        if(!this._leftBgImg)
        {
            this._leftBgImg = Manager.pool.create(BitmapRemote);
            this._leftBgImg.x = 5;
            this._leftBgImg.y = 122;
            this.addChildAt(this._leftBgImg, 0);
            this._leftBgImg.load(PathInfo.getPath("res/common/common_pnl_back2.png", LoaderType.IMAGE), 248, 859);
        }

        this._selectedGrid = new SkillSelectedGrid();
        this.addChild(this._selectedGrid);

        this._upgradeMoney = Manager.pool.create(GameMoneyView, 1, false);
        this._upgradeMoney.x = this._upgradeBtn.x + 34;
        this._upgradeMoney.y = this._upgradeBtn.y - this._upgradeMoney.height + 10;
        this.addChild(this._upgradeMoney);

        this._allUpMoney = Manager.pool.create(GameMoneyView, 1, false);
        this._allUpMoney.x = this._allUpBtn.x + 34;
        this._allUpMoney.y = this._allUpBtn.y - this._allUpMoney.height + 10;
        this.addChild(this._allUpMoney);

        this._allUpIcon.visible = this._upgradeIcon.visible = false;
        
        if(!this._fighting)
		{
			this._fighting = Manager.pool.create(NumImgView2);
			this._fighting.x = this._fightImg.x + 150;
			this._fighting.y = this._fightImg.y + 15;
			this.addChild(this._fighting);
		}

        if(!this._btnEff)
        {
            this._btnEff = Manager.animation.createEffectAnimation("skillBtnEff");
            this._allUpBtn.addChild(this._btnEff);
        }

        this._markArr = [this._mark0, this._mark1, this._mark2, this._mark3];

        this._markPointArr = [];
		this._markPointArr.push( new egret.Point(262, 191));
		this._markPointArr.push( new egret.Point(566, 192));
		this._markPointArr.push( new egret.Point(262, 441));
		this._markPointArr.push( new egret.Point(566, 441));
    }

    protected initData():void
    {
        super.initData();

        if(!this._fighting)
		{
			this._fighting = Manager.pool.create(NumImgView2);
			this._fighting.x = this._fightImg.x + 150;
			this._fighting.y = this._fightImg.y + 15;
			this.addChild(this._fighting);
		}

        this.updateSkillInfo();

        //引导
        if(Manager.model.getGuide().curID == GuideID.SKILL_UPGRADE)
        {
            let pos = this._allUpBtn.parent.localToGlobal(this._allUpBtn.x,this._allUpBtn.y);
            Manager.control.getTask().showGuide(pos, this._allUpBtn.width>>1, this._allUpBtn.height>>1, this.guideCB, this, false);
        }
    }

    protected addEvent():void
    {
        super.addEvent();
        this._upgradeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._allUpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        
        this._skillList.itemList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTouchSkillHandler, this);

        Manager.model.getSkill().addEventListener(SkillEvent.SKILL_UPDATE, this.onSkillUpdateHandler, this);
        Manager.model.getSkill().addEventListener(SkillEvent.SKILL_SINGLE_UPDATE, this.onSkillUpdateHandler, this);

        Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL, this.onUpdateCheckHandler, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.COIN, this.onUpdateCheckHandler, this);
    }

    protected removeEvent():void
    {
        this._upgradeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._allUpBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);

        this._skillList.itemList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTouchSkillHandler, this);

        Manager.model.getSkill().removeEventListener(SkillEvent.SKILL_UPDATE, this.onSkillUpdateHandler, this);
        Manager.model.getSkill().removeEventListener(SkillEvent.SKILL_SINGLE_UPDATE, this.onSkillUpdateHandler, this);

        Manager.model.self.removeEventListener(GameObjectAttrEvent.LEVEL, this.onUpdateCheckHandler, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.COIN, this.onUpdateCheckHandler, this);
        super.removeEvent();
    }

    private onSkillSelectEff(grid:SkillGrid):void
	{
        if(grid == null) return;
        let point = grid.parent.localToGlobal(grid.x, grid.y);
        this._selectedGrid.x = point.x;
        this._selectedGrid.y = point.y;
        this._selectedGrid.cvo = grid.cvo;
        egret.Tween.get(this._selectedGrid, {loop: false}).to({x:416, y:315, alpha:1}, 500);
        let len = this._markArr.length;
        for(let i = 0; i < len; i++)
        {
            this._markArr[i].x = 416;
            this._markArr[i].y = 315;
            egret.Tween.get(this._markArr[i], {loop: false}).to({x:this._markPointArr[i].x, y:this._markPointArr[i].y, alpha:1}, 500);
        }
	}

    private onTouchHandler(e:egret.TouchEvent):void
    {
        switch(e.currentTarget)
        {
            case this._upgradeBtn:
                if(this._curSkillInfo.isMaxLevel())
                {
                    FloatTips.addTips(LangCVO.getContent("skill1"), Color.RED);//技能已满级
                    return;
                }
                else if(this._curSkillInfo.level >= Manager.model.self.attrInfo.level)
                {
                    FloatTips.addTips(LangCVO.getContent("skill2"), Color.RED);//技能等级不可大于角色等级
                    return;
                }
                let formulaCvo = this._curSkillInfo.getSkillFormulaCvo(SkillFormulaType.LOSS);
                if(Manager.model.self.attrInfo.coin < formulaCvo.getFormulaResult(this._curSkillInfo.level))
                {
                    let cvo:ItemsCVO = ItemsCVO.getCvo(ItemsConst.COIN);
                    Manager.view.show(ViewID.ItemsTips,cvo);
                    return;
                }
                Manager.control.getSkill().upgradeActive(this._curSkillInfo.cvo.groupID);
            break;
            case this._allUpBtn:
                this.allUpClick(e);
            break;
        }
    }

    private allUpClick(e:egret.TouchEvent):void
    {
        if(e != null && Manager.model.getGuide().curID == GuideID.SKILL_UPGRADE) return;
        if(this._allUpArr.length == 0)
        {
            if(this.isAllMax) FloatTips.addTips(LangCVO.getContent("skill3"), Color.RED);//全部技能已满级
            else if(this._allUpMoney.num > Manager.model.self.attrInfo.coin)
            {
                let cvo:ItemsCVO = ItemsCVO.getCvo(ItemsConst.COIN);
                Manager.view.show(ViewID.ItemsTips,cvo);
            }
            else FloatTips.addTips(LangCVO.getContent("skill2"), Color.RED);//技能等级不可大于角色等级
            return;
        }
        else Manager.control.getSkill().allUp(this._allUpArr);
    }

    private onSkillChangeHandler(e:eui.UIEvent):void
	{
        let len = this._skillList.itemList.numChildren;
        if(len < this._skillList.itemList.dataProvider.length) return;
        let child:SkillListItem;
        for(let i = 0; i < len; i++)
        {
            child = this._skillList.itemList.getChildAt(i) as SkillListItem;
            if(child.itemEnable)
            {
                this._skillList.itemList.selectedIndex = i;
                this._skillList.itemList.removeEventListener(eui.UIEvent.ADDED, this.onSkillChangeHandler, this);
                break;
            }
        }
        if(!child.itemEnable) return;
        this.onSkillSelectEff(child.grid);
        this._curSkillInfo = child.data.info;
        this.setMarkGrid();
        this.setDescTxt();
        this.setFightValue();
        this.countAllUp();
	}

    private setMarkGrid():void
    {
        if(!this._curSkillInfo) return;
        let cvos = SkillCVO.getCVOsByGroup(this._curSkillInfo.cvo.groupID);
        let len = this._markArr.length;
        let cvo:SkillCVO;
        for(let i = 0; i < len; i++)
        {
            cvo = cvos[i];
            if(cvo)
            {
                this._markArr[i].cvo = cvos[i];
                this._markArr[i].visible = true;
            }
            else this._markArr[i].visible = false;
        }
    }

    private setDescTxt():void
    {
        if(!this._curSkillInfo) return;
        let formulaCvo = this._curSkillInfo.getSkillFormulaCvo(SkillFormulaType.DAMAGE);
        let str = StringUtils.setParam(this._curSkillInfo.cvo.describe, formulaCvo.getFormulaResult(this._curSkillInfo.level));
        HtmlUtil.setTextFlow(this._effTxt, str);

        let cvo = SkillCVO.getCVO(this._curSkillInfo.cvo.groupID);
        this._desc1Txt.text = LangCVO.getContent("skill4", cvo.coldDownTime/1000);//冷却：{0}秒
        this._desc2Txt.text = LangCVO.getContent("skill5") + cvo.shape;//范围：
        this._desc3Txt.text = LangCVO.getContent("skill6", cvo.hitNum);//目标：{0}个

        this.setUpgradeMoney();
    }

    private setFightValue():void
    {
        if(!this._curSkillInfo) return;
        this._fighting.setValue(Manager.model.getSkill().getFightByGroupID(this._curSkillInfo.cvo.groupID), "nums_fighting_", 25);
    }

    private setUpgradeMoney():void
    {
        if(!this._curSkillInfo) return;
        if(this._curSkillInfo.isMaxLevel()) this._upgradeMoney.setNum(0);
        else
        {
            let formulaCvo = this._curSkillInfo.getSkillFormulaCvo(SkillFormulaType.DAMAGE);
            formulaCvo = SkillFormulaCVO.getCVO(this._curSkillInfo.cvo.groupID, SkillFormulaType.LOSS);
            let lossMoney = formulaCvo.getFormulaResult(this._curSkillInfo.level);
            let color = Manager.model.self.attrInfo.coin < lossMoney ? Color.RED : Color.WHITE;
            let selfLvl = Manager.model.self.attrInfo.level;
            this._upgradeIcon.visible = color == Color.WHITE && lossMoney > 0 && this._curSkillInfo.level < selfLvl;
            this._upgradeMoney.setNum(lossMoney, color);
            this._upgradeMoney.x = this._upgradeBtn.x + (this._upgradeBtn.width - this._upgradeMoney.width) / 2;
        }
    }

    private updateSkillInfo():void
	{
        let cvos = SkillCVO.getCVOsByType(1, Manager.model.self.attrInfo.career, 1);
        let arr = [];
        let len = cvos.length;
        for(let i = 0; i < len; i++)
        {
            arr.push({normalImg:"common_bg1_normal_png", clickImg: "common_bg1_click_png", cvo:cvos[i]});
        }
        this._skillList.initBtnListData(SkillListItem, arr, false);
        (<eui.VerticalLayout>this._skillList.itemList.layout).gap = 17;
        this._skillList.itemList.addEventListener(eui.UIEvent.ADDED, this.onSkillChangeHandler, this);
	}

    private onTouchSkillHandler(e:eui.ItemTapEvent):void
    {
        let list = e.currentTarget as eui.List;
        if(!list) return;
        if(this._curSkillInfo == list.selectedItem.info) return;
        this._curSkillInfo = list.selectedItem.info;
        this.setMarkGrid();
        this.setDescTxt();
        this.setFightValue();
        let child = list.getChildAt(list.selectedIndex) as SkillListItem;
        this.onSkillSelectEff(child.grid);
    }

    private onSkillUpdateHandler(e:SkillEvent):void
    {
        // this.updateSkillInfo(false);
        // let bol = false;
        // if(e.type == SkillEvent.SKILL_UPDATE) bol = true;
        // else if(e.type == SkillEvent.SKILL_SINGLE_UPDATE && this._curSkillInfo)
        // {
        //     let cvo = SkillCVO.getCVO(e.params);
        //     if(!cvo) return;
        //     if(cvo.type == 0) bol = this._curSkillInfo.cvo.groupID == cvo.mainGroup;
        //     else bol = this._curSkillInfo.cvo.groupID == cvo.groupID;
        // }
        // if(bol)
        // {
            this._curSkillInfo = Manager.model.getSkill().getSkillInfoByGroupID(this._curSkillInfo.cvo.groupID);
            this.setMarkGrid();
            this.setDescTxt();
            this.setFightValue();
            this.countAllUp();

            if(this._skillList == null || this._skillList.itemList == null) return;
            let childNum = this._skillList.itemList.numChildren;
            let child:SkillListItem;
            if(e.type == SkillEvent.SKILL_UPDATE)
            {
                for(let i = 0; i < childNum; i++)
                {
                    child = this._skillList.itemList.getChildAt(i) as SkillListItem;
                    if(child != null) child.setData();
                }
            }
            else if(e.type == SkillEvent.SKILL_SINGLE_UPDATE)
            {
                let cvo = SkillCVO.getCVO(e.params);
                if(!cvo) return;
                for(let i = 0; i < childNum; i++)
                {
                    child = this._skillList.itemList.getChildAt(i) as SkillListItem;
                    if(child != null && child.cvo.groupID == cvo.groupID)
                    {
                        if(cvo.type == 0) child.setRedIcon();
                        else child.playEff();
                        break;
                    }
                }
            }
        // }
    }

    private onUpdateCheckHandler(e:GameObjectAttrEvent):void
    {
        this.countAllUp();
        this.setUpgradeMoney();
        // let lossMoney1:number = this._upgradeMoney.num;
        // let color1:number = Manager.model.self.attrInfo.coin < lossMoney1 ? Color.RED : Color.WHITE;
        // this._upgradeMoney.setNum(lossMoney1, color1);
        // let lossMoney2:number = this._allUpMoney.num;
        // let color2:number = Manager.model.self.attrInfo.coin < lossMoney2 ? Color.RED : Color.WHITE;
        // this._allUpMoney.setNum(lossMoney2, color2);
        if(this._skillList == null || this._skillList.itemList == null) return;
        let childNum = this._skillList.itemList.numChildren;
        let child:SkillListItem;
        for(let i = 0; i < childNum; i++)
        {
            child = this._skillList.itemList.getChildAt(i) as SkillListItem;
            if(child != null) child.setRedIcon();
        }
    }
    /**计算所有技能升到最高级的费用 */
    private countAllUp():number
    {
        let costCoin:number = this.countMaxCoins(Manager.model.getSkill().defaultSkill);
        let infos = Manager.model.getSkill().careerSkills;
        let info:SkillInfo;
        for(let i = 0; i < infos.length; i++)
        {
            info = infos[i];
            if(info.cvo.type == 0) continue;
            costCoin += this.countMaxCoins(info);
        }
        this._allUpCost = Math.floor(costCoin);
        let color = Manager.model.self.attrInfo.coin < this._allUpCost ? Color.RED : Color.WHITE;
        this._allUpMoney.setNum(this._allUpCost, color);
        this._allUpMoney.x = this._allUpBtn.x + (this._allUpBtn.width - this._allUpMoney.width) / 2;
        this.countAllCanUp();
        return costCoin;
    }

    private countMaxCoins(info:SkillInfo):number
    {
        let selfLvl = Manager.model.self.attrInfo.level;
        let maxLvl = selfLvl > info.cvo.maxLevel ? info.cvo.maxLevel : selfLvl + 1;
        if(info.level == maxLvl) return 0;
        let nextCoin:number = 0;
        let maxCoin:number = 0;
        let cvo = info.getSkillFormulaCvo(SkillFormulaType.LOSS);
        if(cvo)
        {
            nextCoin= cvo.getFormulaResult(info.level);
            maxCoin = cvo.getFormulaResult(maxLvl - 1);
        }
        return (nextCoin + maxCoin) * (maxLvl - info.level) / 2;
    }
    /**计算当前铜钱可以升级的所有技能，优先选择消耗最低 */
    private countAllCanUp():void
    {
        let dic = {};
        let infos:Array<SkillInfo> = [];
        let defaultSkill = new SkillInfo(Manager.model.getSkill().defaultSkill.cvo, Manager.model.getSkill().defaultSkill.level);
        infos.push(defaultSkill);
        let careerSkills = Manager.model.getSkill().careerSkills;
        let info:SkillInfo;
        for(let i = 0; i < careerSkills.length; i++)
        {
            if(careerSkills[i].cvo.type == 0) continue;
            info = new SkillInfo(careerSkills[i].cvo, careerSkills[i].level);
            infos.push(info);
        }

        let minLoss:SkillInfo;
        let lossCoin:number;
        let selfCoin = Manager.model.self.attrInfo.coin;
        let selfLvl = Manager.model.self.attrInfo.level;
        while(selfCoin > 0)
        {
            minLoss = this.getMinLoss(infos);
            if(!minLoss)
            {
                selfCoin = 0;
                continue;
            }
            if(minLoss.isMaxLevel() || minLoss.level == selfLvl)
            {
                let info = Manager.model.getSkill().getSkillInfoByGroupID(minLoss.cvo.groupID);
                if(info.level != minLoss.level) dic[minLoss.cvo.groupID] = minLoss.level;
                infos.splice(infos.indexOf(minLoss), 1);
                continue;
            }
            if(minLoss.getSkillFormulaCvo(SkillFormulaType.LOSS))
                lossCoin = minLoss.getSkillFormulaCvo(SkillFormulaType.LOSS).getFormulaResult(minLoss.level);
            else
                lossCoin = 0;
            if(lossCoin <= selfCoin)
            {
                minLoss.level += 1;
                dic[minLoss.cvo.groupID] = minLoss.level;
                selfCoin -= lossCoin;
            }
            else selfCoin = 0;
        }
        this.parseAllUpDic(dic);
    }

    private getMinLoss(infos:SkillInfo[]):SkillInfo
    {
        let minLoss:SkillInfo;
        let info:SkillInfo;
        let lossOne:number;
        let lossTwo:number;
        let selfLvl = Manager.model.self.attrInfo.level;
        for(let i = 0; i < infos.length; i++)
        {
            info = infos[i];
            if(info.cvo.mainType != 1) continue;
            if(!minLoss) minLoss = info;
            else
            {
                if(info.level > info.cvo.maxLevel || info.level > selfLvl) continue;
                lossOne = minLoss.getSkillFormulaCvo(SkillFormulaType.LOSS).getFormulaResult(minLoss.level);
                if(info.getSkillFormulaCvo(SkillFormulaType.LOSS))
                    lossTwo = info.getSkillFormulaCvo(SkillFormulaType.LOSS).getFormulaResult(info.level);
                else
                    lossTwo = 0;
                if(lossOne > lossTwo) minLoss = info;
            }
        }
        return minLoss;
    }

    private parseAllUpDic(dic:Object):void
    {
        this._allUpArr = [];
        for(let key in dic)
        {
            this._allUpArr.push({id:Number(key), level:dic[key]});
        }
        let color = Manager.model.self.attrInfo.coin < this._allUpCost ? Color.RED : Color.WHITE;
        this._btnEff.visible = this._allUpIcon.visible = color == Color.WHITE && this._allUpArr.length > 0;
    }

    private get isAllMax():boolean
    {
        let cvos = SkillCVO.getCVOsByType(1, Manager.model.self.attrInfo.career, 1);
        let info:SkillInfo;
        for(let i = 0; i < cvos.length; i++)
        {
            info = Manager.model.getSkill().getSkillInfoByGroupID(cvos[i].groupID);
            if(!info || !info.isMaxLevel()) return false;
        }
        return true;
    }

    private guideCB():void
    {
        this.allUpClick(null);
        Manager.control.getTask().hideGuide();
    }

    public dispose():void
    {
        if(Manager.model.getGuide().curID == GuideID.SKILL_UPGRADE) Manager.control.getTask().hideGuide();
        super.dispose();
        ObjectUtil.removes( this._skillList, this._fightImg, this._effTxt, this._desc1Txt, this._desc2Txt, 
        this._desc3Txt, this._upgradeMoney, this._upgradeBtn, this._upgradeIcon, this._allUpMoney, this._allUpBtn, this._allUpIcon,
         this._selectedGrid, this._mark0, this._mark1, this._mark2, this._mark3, this._fighting, this._btnEff, this._leftBgImg);
        if(this._leftBgImg)
            Manager.pool.push(this._leftBgImg);
        this._leftBgImg = null;
        this._skillList.dispose();
        this._skillList = null;
        this._fightImg.bitmapData = null;
        this._fightImg = null;
        this._effTxt.dispose();
        this._effTxt = null;
        this._desc1Txt.dispose();
        this._desc1Txt = null;
        this._desc2Txt.dispose();
        this._desc2Txt = null;
        this._desc3Txt.dispose();
        this._desc3Txt = null;
        if(this._upgradeMoney)
            this._upgradeMoney.dispose();
        this._upgradeMoney = null;
        this._upgradeBtn.dispose();
        this._upgradeBtn = null;
        this._upgradeIcon.bitmapData = null;
        this._upgradeIcon = null;
        if(this._allUpMoney)
            this._allUpMoney.dispose();
        this._allUpMoney = null;
        this._allUpBtn.dispose();
        this._allUpBtn = null;
        this._allUpIcon.bitmapData = null;
        this._allUpIcon = null;
        if(this._selectedGrid)
            this._selectedGrid.dispose();
        this._selectedGrid = null;
        this._mark0.dispose();
        this._mark0 = null;
        this._mark1.dispose();
        this._mark1 = null;
        this._mark2.dispose();
        this._mark2 = null;
        this._mark3.dispose();
        this._mark3 = null;
        if(this._fighting)
            Manager.pool.push(this._fighting);
        this._fighting = null;
        if(this._btnEff)
            Manager.pool.push(this._btnEff);
        this._btnEff = null;

        if(this._markArr)
            this._markArr.length = 0;
        if(this._markPointArr)
            this._markPointArr.length = 0;
        if(this._allUpArr)
            this._allUpArr.length = 0;
        this._allUpCost = 0;
    }
}