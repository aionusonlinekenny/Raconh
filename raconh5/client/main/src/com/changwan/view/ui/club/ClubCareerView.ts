/**
 * 宗门职位
 * Simon
 * 2017.12.15
 */
class ClubCareerView extends UIComponent
{
	private _group:eui.Group;
	private _basePopView:BasePopUpView;
	private _curCareer:Label;
	private _tiaojian1:Label;
	private _tiaojian2:Label;
	private _tiaojian3:Label;
	private _curAttr1:Label;
	private _curAttr2:Label;
	private _curAttr3:Label;
	private _nextAttr1:Label;
	private _nextAttr2:Label;
	private _nextAttr3:Label;
	private _btn:Button;
	private _upgradeBtn:Button;
	private _btnGo:Button;

	private _clubInfo:ClubInfo;
	private _tiaojianList:Array<Label>;
	private _curAttrList:Array<Label>;
	private _nextAttrList:Array<Label>;
	private _itemList:Array<BaseGoods>;
	private _upgradeEffect:Animation;

	public constructor()
	{
		super();
		this.skinName = Manager.path.getSkinName("club", "ClubCareerViewSkin");
		this.visible = false;
		this.touchChildren = true;
	}

	protected configUI():void
	{
		super.configUI();

		this._basePopView.titleImg.source = "club_careerTitle_png";
		this._basePopView.diImgVisible = false;
        this._basePopView.y = -180;
        this._basePopView.bgHeight = 890;

		this._tiaojianList = [this._tiaojian1, this._tiaojian2, this._tiaojian3];
		this._curAttrList = [this._curAttr1, this._curAttr2, this._curAttr3];
		this._nextAttrList = [this._nextAttr1, this._nextAttr2, this._nextAttr3];

		this.onResizeHandler(null);
		this.visible = true;

		Manager.control.getMaterialCopy().getAwardCell();//drq add
	}

	protected drawAll():void
	{
		super.drawAll();
		this.updateCareerInfo();
	}

	protected draw():void
	{
		super.draw();
		if(this.isInvalid("updateCareerInfo")) this.updateCareerInfo();
		if(this.isInvalid("showUpgradeEffect")) this.showUpgradeEffect();
		if(this.isInvalid("onUpdataClubInfo")) this.onUpdataClubInfo();
	}

	private updateCareerInfo():void
	{
		this._clubInfo = Manager.model.getClub().clubInfo;

		let careerInfo:ClubDataCVO = ClubDataCVO.getClubCareerById(this._clubInfo.clubCareer);
		if(careerInfo)
		{
			this._curCareer.text = careerInfo.careerName;

			if(this._itemList)
			{
				for(let i:number=0; i<this._itemList.length; i++)
				{
					if(this._itemList[i])
					{
						if(this._itemList[i].parent)
							this._itemList[i].parent.removeChild(this._itemList[i]);
						this._itemList[i].dispose();
					}
					this._itemList[i] = null;
				}
			}
			this._itemList = [];
			let baseX:number = Math.round((720 - 141 * careerInfo.salaryList.length) / 2);
			for(let i:number=0; i<careerInfo.salaryList.length; i++)
			{
				let item:BaseGoods = new BaseGoods();
				item.baseId = careerInfo.salaryList[i].baseId;
				item.count = careerInfo.salaryList[i].num;
				item.x = baseX + i * 141;
				item.y = 780;
				this._group.addChild(item);
				this._itemList.push(item);
			}
		}

		let countCanUpgrade:number = 0;
		let curIndex:number = 0;
		let nextCareerInfo:ClubDataCVO = ClubDataCVO.getClubCareerById(this._clubInfo.clubCareer + 1);
		if(careerInfo)
		{
			let condList:Array<any> = careerInfo.condList;
			for(let i:number=0; i<condList.length; i++)
			{
				if(condList[i].type == GainLossVO.LEVEL)
				{
					if(Manager.model.self.attrInfo.level >= condList[i].num)
					{
						HtmlUtil.setTextFlow(this._tiaojianList[curIndex], "<font color='"+ Color.GREEN_STR +"'>" + LangCVO.getContent("club6", condList[i].num) + "</font>");
						countCanUpgrade += 1;
					}
					else
						HtmlUtil.setTextFlow(this._tiaojianList[curIndex], "<font color='"+ Color.RED_STR +"'>" + LangCVO.getContent("club6", condList[i].num) + "</font>");
					curIndex += 1;
				}
				else if(condList[i].type == GainLossVO.GUILD_DONATE)
				{
					if(this._clubInfo.hisDonate >= condList[i].num)
					{
						HtmlUtil.setTextFlow(this._tiaojianList[curIndex], "<font color='"+ Color.GREEN_STR +"'>" + LangCVO.getContent("club8",this._clubInfo.hisDonate, condList[i].num) + "</font>");
						countCanUpgrade += 1;
					}
					else
						HtmlUtil.setTextFlow(this._tiaojianList[curIndex], "<font color='"+ Color.RED_STR +"'>" + LangCVO.getContent("club8", this._clubInfo.hisDonate,condList[i].num) + "</font>");
					curIndex += 1;
				}
				//drq change
				else if(condList[i].type == GainLossVO.DIMLY_STAR)
				{
					if(Manager.model.getMaterialCopy().curStar >= condList[i].num)
					{
						HtmlUtil.setTextFlow(this._tiaojianList[curIndex], "<font color='"+ Color.GREEN_STR +"'>" + LangCVO.getContent("club7", condList[i].num) + "</font>");
						countCanUpgrade += 1;
					}
					else
						HtmlUtil.setTextFlow(this._tiaojianList[curIndex], "<font color='"+ Color.RED_STR +"'>" + LangCVO.getContent("club7", condList[i].num) + "</font>");
					curIndex += 1;
				}
				//drq end
				else if(condList[i].type == GainLossVO.PET_LEV)
				{
					if(Manager.model.getPet().pinjie > condList[i].petPhase || (Manager.model.getPet().pinjie == condList[i].petPhase && Manager.model.getPet().star >= condList[i].petLevel))
					{
						HtmlUtil.setTextFlow(this._tiaojianList[curIndex], "<font color='"+ Color.GREEN_STR +"'>" + LangCVO.getContent("club9", condList[i].petPhase, condList[i].petLevel) + "</font>");
						countCanUpgrade += 1;
					}
					else
						HtmlUtil.setTextFlow(this._tiaojianList[curIndex], "<font color='"+ Color.RED_STR +"'>" + LangCVO.getContent("club9", condList[i].petPhase, condList[i].petLevel) + "</font>");
					curIndex += 1;
				}
				else if(condList[i].type == GainLossVO.EQM_LEV)
				{
					if(Manager.model.getEquip().getTotalStrengthenLevel() >= condList[i].num)
					{
						HtmlUtil.setTextFlow(this._tiaojianList[curIndex], "<font color='"+ Color.GREEN_STR +"'>" + LangCVO.getContent("club10", condList[i].num) + "</font>");
						countCanUpgrade += 1;
					}
					else
						HtmlUtil.setTextFlow(this._tiaojianList[curIndex], "<font color='"+ Color.RED_STR +"'>" + LangCVO.getContent("club10", condList[i].num) + "</font>");
					curIndex += 1;
				}
				else if(condList[i].type == GainLossVO.STONE_LEV)
				{
					if(Manager.model.getEquip().getTotalGemLevel() >= condList[i].num)
					{
						HtmlUtil.setTextFlow(this._tiaojianList[curIndex], "<font color='"+ Color.GREEN_STR +"'>" + LangCVO.getContent("club11", condList[i].num) + "</font>");
						countCanUpgrade += 1;
					}
					else
						HtmlUtil.setTextFlow(this._tiaojianList[curIndex], "<font color='"+ Color.RED_STR +"'>" + LangCVO.getContent("club11", condList[i].num) + "</font>");
					curIndex += 1;
				}
				else if(condList[i].type == GainLossVO.EQM_SOUL_LEV)
				{
					if(Manager.model.getEquip().getTotalZhuhuanLevel() >= condList[i].num)
					{
						HtmlUtil.setTextFlow(this._tiaojianList[curIndex], "<font color='"+ Color.GREEN_STR +"'>" + LangCVO.getContent("club12", condList[i].num) + "</font>");
						countCanUpgrade += 1;
					}
					else
						HtmlUtil.setTextFlow(this._tiaojianList[curIndex], "<font color='"+ Color.RED_STR +"'>" + LangCVO.getContent("club12", condList[i].num) + "</font>");
					curIndex += 1;
				}
				else if(condList[i].type == GainLossVO.MERIDIAN_LEV)
				{
					if(Manager.model.getJingMai().getId(Manager.model.self.id) >= condList[i].num)
					{
						HtmlUtil.setTextFlow(this._tiaojianList[curIndex], "<font color='"+ Color.GREEN_STR +"'>" + LangCVO.getContent("club13", condList[i].num) + "</font>");
						countCanUpgrade += 1;
					}
					else
						HtmlUtil.setTextFlow(this._tiaojianList[curIndex], "<font color='"+ Color.RED_STR +"'>" + LangCVO.getContent("club13", condList[i].num) + "</font>");
					curIndex += 1;
				}
			}
			this._upgradeBtn.visible = countCanUpgrade == condList.length;
			this._btnGo.visible = !this._upgradeBtn.visible;
		}


		for(let i:number=0; i<careerInfo.attrList.length; i++)
		{
			this._curAttrList[i].text = AttrDescTypeEx.getAttrName(careerInfo.attrList[i][0]) + " +" + careerInfo.attrList[i][1];
		}
		if(nextCareerInfo)
		{
			for(let i:number=0; i<nextCareerInfo.attrList.length; i++)
			{
				this._nextAttrList[i].text = AttrDescTypeEx.getAttrName(nextCareerInfo.attrList[i][0]) + " +" + nextCareerInfo.attrList[i][1];
			}
		}

		this.onUpdataClubInfoHandler(null);
	}

	protected addEvent():void
	{
		super.addEvent();
		GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._basePopView.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._upgradeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btnGo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		Manager.model.getClub().addEventListener(ClubEvent.UPDATE_CLUB_INFO, this.onUpdataClubInfoHandler, this);
		Manager.model.getClub().addEventListener(ClubEvent.UPDATE_CLUB_CAREER, this.onUpdateClubCareerHandler, this);
		Manager.model.getMaterialCopy().addEventListener(MaterialEvent.MATERIAL_GET_AWARD_CELL, this.updateCareerInfo, this);
	}

	protected removeEvent():void
	{
		GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._basePopView.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._upgradeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btnGo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		Manager.model.getClub().removeEventListener(ClubEvent.UPDATE_CLUB_INFO, this.onUpdataClubInfoHandler, this);
		Manager.model.getClub().removeEventListener(ClubEvent.UPDATE_CLUB_CAREER, this.onUpdateClubCareerHandler, this);
		Manager.model.getMaterialCopy().removeEventListener(MaterialEvent.MATERIAL_GET_AWARD_CELL, this.updateCareerInfo, this);
		super.removeEvent();
	}

	private onUpdateClubCareerHandler(e:ClubEvent):void
	{
		this.invalidate("showUpgradeEffect");
		this.invalidate("updateCareerInfo");
	}

	private onResizeHandler(e:GlobalEvent):void
	{
		this.x = Math.round((Manager.global.gameMain.stage.stageWidth - this.width) / 2);
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
		switch(e.currentTarget)
		{
			case this._basePopView.closeBtn:
				Manager.view.hide(ViewID.ClubCareerView);
				break;
			case this._btn:
				if(Manager.model.getClub().clubInfo.isGetReward == 0)
				{
					Manager.control.getClub().clubSalary();

					let list:Array<ItemsModelInfo> = [];
					for(let i:number=0; i<this._itemList.length; i++)
					{
						let info:ItemsModelInfo = new ItemsModelInfo();
						info.base_id = this._itemList[i].baseId;
						info.bind = this._itemList[i].bind;
						info.quantity = this._itemList[i].count;
						list.push(info);
					}
					Manager.control.getDrop().showAlert(list);
				}
				break;
			case this._upgradeBtn:
				Manager.control.getClub().clubCareerUpgrade();
				break;
			case this._btnGo:
				this.gotoPage();
				break;
		}
	}

	private showUpgradeEffect():void
	{
		this._upgradeEffect = Manager.animation.createEffectAnimation("Jingji");
		this._upgradeEffect.x = Math.round((this.width - 512) / 2);
		this._upgradeEffect.y = Math.round((this.height - 258) / 2) + 150;
		this._upgradeEffect.touchEnabled = false;
		this._upgradeEffect.play();
		if(!this._upgradeEffect.parent)
			this.addChild(this._upgradeEffect);
	}

	private onUpdataClubInfoHandler(e:ClubEvent):void
	{
		this.invalidate("onUpdataClubInfo");
	}

	private onUpdataClubInfo():void
	{
		if(Manager.model.getClub().clubInfo.isGetReward == 1)
		{
			FilterUtil.setGrayFilter(this._btn);
			this._btn.enabled = false;
		}
		else
		{
			this._btn.filters = [];
			this._btn.enabled = true;
		}
	}

	/**链接到未达标界面 */
	private gotoPage():void
	{
		let careerInfo:ClubDataCVO = ClubDataCVO.getClubCareerById(this._clubInfo.clubCareer);
		let needBreak:boolean = false;
		if(careerInfo)
		{
			let condList:Array<any> = careerInfo.condList;
			let len = condList ? condList.length : 0;
			for(let i = 0; i < len; i++)
			{
				switch(condList[i].type)
				{
					case GainLossVO.GUILD_DONATE:
						if(this._clubInfo.hisDonate < condList[i].num)
						{
							if(Manager.model.getClub().checkCanDonate()) Manager.view.show(ViewID.ClubView);
							else Manager.link.link(LinkType.PANEL_ACTIVITY, 0);
							needBreak = true;
						}
						break;
					case GainLossVO.DUN_PASS:
						if(Manager.model.getCopy().towerModel.history < condList[i].num)
						{
							Manager.link.link(LinkType.GOTO_NPC, 10003);
							needBreak = true;
						}
						break;
					case GainLossVO.PET_LEV:
						if(Manager.model.getPet().pinjie <= condList[i].petPhase && Manager.model.getPet().star < condList[i].petLevel)
						{
							Manager.link.link(LinkType.PANEL_ROLE, 1);
							needBreak = true;
						}
						break;
					case GainLossVO.EQM_LEV:
						if(Manager.model.getEquip().getTotalStrengthenLevel() < condList[i].num)
						{
							Manager.link.link(LinkType.PANEL_EQUIP, 0);
							needBreak = true;
						}
						break;
					case GainLossVO.STONE_LEV:
						if(Manager.model.getEquip().getTotalGemLevel() < condList[i].num)
						{
							Manager.link.link(LinkType.PANEL_EQUIP, 1);
							needBreak = true;
						}
						break;
					case GainLossVO.EQM_SOUL_LEV:
						if(Manager.model.getEquip().getTotalZhuhuanLevel() < condList[i].num)
						{
							Manager.link.link(LinkType.PANEL_EQUIP, 2);
							needBreak = true;
						}
						break;
					case GainLossVO.MERIDIAN_LEV:
						if(Manager.model.getJingMai().getId(Manager.model.self.id) < condList[i].num)
						{
							Manager.view.show(ViewID.GfgPanel);
							needBreak = true;
						}
						break;
					case GainLossVO.DIMLY_STAR:
						if(OpenCVO.isOpen(OpenConst.ID_MATERIAL, true))
						{
							if(Manager.model.getMaterialCopy().curStar < condList[i].num)
							{
								Manager.link.link(LinkType.PANEL_MATERIAL);
								needBreak = true;
							}
						}
						break;
				}
				if(needBreak)
				{
					Manager.view.hide(ViewID.ClubCareerView);
					break;
				}
			}
		}
	}

	public show():void
	{
		Manager.layer.tipsLayer.addChild(this);
	}

	public hide():void
	{
		Manager.layer.tipsLayer.removeChild(this);
	}

	public dispose():void
	{
		super.dispose();
		ObjectUtil.removes(this._group, this._basePopView, this._curCareer, this._tiaojian1, this._tiaojian2, this._tiaojian3,
			this._curAttr1, this._curAttr2, this._curAttr3, this._nextAttr1, this._nextAttr2, this._nextAttr3, this._btn, this._btnGo);
		this._group = null;
		if(this._basePopView)
			this._basePopView.dispose();
		this._basePopView = null;
		if(this._curCareer)
			this._curCareer.dispose();
		this._curCareer = null;
		if(this._tiaojian1)
			this._tiaojian1.dispose();
		this._tiaojian1 = null;
		if(this._tiaojian2)
			this._tiaojian2.dispose();
		this._tiaojian2 = null;
		if(this._tiaojian3)
			this._tiaojian3.dispose();
		this._tiaojian3 = null;
		if(this._curAttr1)
			this._curAttr1.dispose();
		this._curAttr1 = null;
		if(this._curAttr2)
			this._curAttr2.dispose();
		this._curAttr2 = null;
		if(this._curAttr3)
			this._curAttr3.dispose();
		this._curAttr3 = null;
		if(this._nextAttr1)
			this._nextAttr1.dispose();
		this._nextAttr1 = null;
		if(this._nextAttr2)
			this._nextAttr2.dispose();
		this._nextAttr2 = null;
		if(this._nextAttr3)
			this._nextAttr3.dispose();
		this._nextAttr3 = null;
		if(this._btn)
			this._btn.dispose();
		this._btn = null;
		if(this._upgradeBtn)
			this._upgradeBtn.dispose();
		this._upgradeBtn = null;
		if(this._btnGo) this._btnGo.dispose();
		this._btnGo = null;

		this._clubInfo = null;
		this._tiaojianList = null;
		this._curAttrList = null;
		this._nextAttrList = null;
		if(this._itemList)
		{
			for(let i:number=0; i<this._itemList.length; i++)
			{
				if(this._itemList[i])
					this._itemList[i].dispose();
				this._itemList[i] = null;
			}
		}
		this._itemList = null;
		if(this._upgradeEffect)
			Manager.pool.push(this._upgradeEffect);
		this._upgradeEffect = null;
	}
}
