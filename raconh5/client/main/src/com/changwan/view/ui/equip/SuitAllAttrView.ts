/**
 * 套装总体属性
 * Simon
 * 2018.1.6
 */
class SuitAllAttrView extends UIComponent
{
	private _closeBtn:Button;
	private _bgImg:eui.Image;
	private _scroller:BaseVScrollerList

	public constructor()
	{
		super();

		this.touchChildren = true;
		this.skinName = Manager.path.getSkinName("equip", "SuitAllAttrViewSkin");
		this.visible = false;
	}

	protected configUI():void
	{
		super.configUI();
		this.visible = true;

		this.onResizeHandler(null);
	}

	protected addEvent():void
	{
		super.addEvent();
		GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
	}

	protected removeEvent():void
	{
		GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		if(this._closeBtn) this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);

		super.removeEvent();
	}

	private onResizeHandler(e:GlobalEvent):void
	{
		this.width = Manager.global.gameMain.stage.stageWidth;
		this.height = Manager.global.gameMain.stage.stageHeight;
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
		Manager.view.hide(ViewID.SuitAllAttrView);
	}

	public show(suitType:number):void
	{
		Manager.layer.tipsLayer.addChild(this);

		if(suitType == 2)
		{
			this._bgImg.height = 450;
			this._scroller.height = 400;
		}
		if(suitType == 1)
		{
			this._bgImg.height = 510;
			this._scroller.height = 460;
		}

		this.updateAttrInfo(suitType);
	}

	private updateAttrInfo(suitType:number):void
	{
		let suitName:string = suitType == 1 ? LangCVO.getContent("equip21") : LangCVO.getContent("equip20");
		let list:Array<any>;
		let suitPosList:Array<number>;
		if(suitType == 1)
		{
			list = Manager.model.getEquip().equipSuitDefenseList;
			list.sort(this.sortByLevel);
			suitPosList = EquipModel.SUIT_DEFENSE_POS;
		}
		else
		{
			list = Manager.model.getEquip().equipSuitAttackList;
			list.sort(this.sortByLevel);
			suitPosList = EquipModel.SUIT_ATTACK_POS;
		}

		let levelList:Array<number> = [];
		for(let i:number=0; i<list.length; i++)
		{
			if(list[i].level > 0 && levelList.indexOf(list[i].level) == -1)
			{
				levelList.push(list[i].level);
			}
		}

		let suitList:Array<any>;
		let countSuitList:Array<number> = [];
		let equipNameList:Array<string> = [];
		let attrList:Array<string> = [];
		let viewHeightList:Array<number> = [];
		for(let i:number=0; i<levelList.length; i++)
		{
			suitList = [];
			for(let j:number=0; j<list.length; j++)
			{
				if(levelList[i] == list[j].level)
				{
					suitList.push(list[j].pos);
				}
			}
			countSuitList.push(suitList.length);

			let equipName:string = "";
			for(let i:number=0; i<suitPosList.length; i++)
			{
				if(suitList.indexOf(suitPosList[i]) != -1)
					equipName += "<font color='"+ Color.toColorStr(Color.GREEN) +"'>" + LangCVO.getContent("equip" + suitPosList[i]) + "</font>  ";
				else
					equipName += "<font color='"+ Color.toColorStr(Color.DEF) +"'>" + LangCVO.getContent("equip" + suitPosList[i]) + "</font>  ";
			}
			equipNameList.push(equipName);


			let attrValue:string = "";
			let len:number = suitType == 1 ? 4 : 3;
			let viewHeight:number = 0;
			for(let j:number=0; j<len; j++)
			{
				let baseValue:number = suitType == 1 ? j + 2 : j + 1;
				let info:SuitCVO = SuitCVO.getSuitInfo(suitType, levelList[i], baseValue);
				if(info)
				{
					if(baseValue <= suitList.length)
						attrValue += "<font color='"+ Color.GREEN +"'>";
					else
						attrValue += "<font color='"+ Color.DEF +"'>";
					attrValue += LangCVO.getContent("equip25", baseValue);
					for(let k:number=0; k<info.attrInfo.attrInfos.length; k++)
					{
						if(k > 0)
							attrValue += "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t";
						else
							attrValue += "\t";
						attrValue += info.attrInfo.attrInfos[k].desc() + "\n";
						viewHeight += 32;
					}
					attrValue += "</font>";
				}
			}
			attrList.push(attrValue);
			viewHeightList.push(viewHeight);
		}

		let content = [];
		for(let i:number=0; i<equipNameList.length; i++)
		{
			let name:string = LangCVO.getContent("equip24", "", levelList[i], suitName, countSuitList[i], suitPosList.length);
			content.push({index:i, suitName:name, equipName:equipNameList[i], suitAttr:attrList[i], viewHeight:160 + viewHeightList[i]});
		}

		if(!this._scroller.isInit)
		{
			this._scroller.initBtnListData(SuitAllAttrItem, content, true);
			(<eui.HorizontalLayout>this._scroller.itemList.layout).gap = 5;
		}
		else
			this._scroller.dataProvider(content);
	}

	private sortByLevel(value1:any, value2:any):number
	{
		if(value1.level > value2.level)
			return 1;
		else if(value1.level < value2.level)
			return -1;
		else
			return 0;
	}

	public hide():void
	{
		this.dispose();
	}

	public dispose():void
	{
		super.dispose();

		if(this._closeBtn)
			this._closeBtn.dispose();
		this._closeBtn = null;

		if(this._scroller)
			this._scroller.dispose();
		this._scroller = null;
	}
}