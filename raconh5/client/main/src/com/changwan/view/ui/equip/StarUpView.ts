/**
 * drq 
 * 升星
 * 2018.4.12
 */
class StarUpView extends UIComponent
{
	private _thisParent:EquipPanel;
	private _BgImg01:BitmapRemote;
	private _BgImg02:BitmapRemote;
	private _itemMainBg:eui.Group;
	private _explainBtn:eui.Image;
	private _success:Label;

	private _oldTxt01:Label;
	private _oldTxt02:Label;
	private _oldTxt03:Label;
	private _oldList:Array<Label> = [];
	private _newTxt01:Label;
	private _newTxt02:Label;
	private _newTxt03:Label;
	private _newList:Array<Label> = [];

	private _item01:BaseGoods;
	private _item02:BaseGoods;
	private _item03:BaseGoods;
	private _item04:BaseGoods;
	private _item05:BaseGoods;
	private _itemTopList:BaseGoods[];
	public _itemsData:ItemsModelInfo[] = [];

	private _itemMain:BaseGoods;
	public _itemMaindata:ItemsModelInfo;
	 
	private _allUpBtn:eui.Button;
	private _starUpBtn:eui.Button;

	private _hScroll:BaseHScrollerList;
	private _itemList:Array<ItemsModelInfo> = [];
	private _curItemCount:number;
	private _topItemList:Array<EquipItem> = [];
	private _model:StarUpModel;
	private _cvo:StarUpCVO[];
	private _objList:any[] = [];
	

	public constructor(thisParent:EquipPanel) {
		super();
		this._thisParent = thisParent;
		this.skinName = Manager.path.getSkinName("equip", "StarUpViewSkin");
	
		this._model = Manager.model.getStarUp();
		this._cvo = StarUpCVO.getCvo();
	}

	protected configUI():void
    {
		this._objList = [this._thisParent._equipItemList,this._thisParent._fighting,this._thisParent._equipName,this._thisParent._topBtn,this._thisParent._titleBg,this._thisParent._fightImg2,this._thisParent._fightImg];
		for(let i=0;i<7;i++)
		{
			this._objList[i].visible = false;
		}
        super.configUI();

		this.touchChildren = true;
		this._itemMainBg.touchEnabled = true;
		this._oldList = [this._oldTxt01,this._oldTxt02,this._oldTxt03];
		this._newList = [this._newTxt01,this._newTxt02,this._newTxt03];

		this._itemsData = [null,null,null,null,null];
		this._itemTopList = [this._item01,this._item02,this._item03,this._item04,this._item05];
		
		//初始化
		for(let i=0;i<3;i++)
		{
			this._oldList[i].text = "";
			this._newList[i].text = "";
		}
		this._success.text = LangCVO.getContent("starUp2") + "0%";

		if(!this._BgImg01)
        {
            this._BgImg01 = Manager.pool.create(BitmapRemote);
            this._BgImg01.x = 103.5;
            this._BgImg01.y = 140;
            this.addChildAt(this._BgImg01,0);
            this._BgImg01.load(PathInfo.getPath("res/starUp/starUp_back01.png", LoaderType.IMAGE), 513, 513);
        }
		if(!this._BgImg02)
        {
            this._BgImg02 = Manager.pool.create(BitmapRemote);
            this._BgImg02.x = 103.5;
            this._BgImg02.y = 140;
            this.addChildAt(this._BgImg02, 0);
            this._BgImg02.load(PathInfo.getPath("res/starUp/starUp_back02.png", LoaderType.IMAGE), 513, 513);
        }
		this.createBottomScroll([]);
	}

	public show():void
	{
		
	}

	public hide():void
	{
		this.dispose();
	}

	protected addEvent():void
    {
		super.addEvent();
		this._explainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
		this._itemMainBg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
		this._allUpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
		this._starUpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
		Manager.model.getStarUp().addEventListener(StarUpEvent.STARUP_UPDATE,this.starUp,this);
	}

	protected removeEvent():void
	{
		this._itemMainBg.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
		this._explainBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
		this._allUpBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
		this._starUpBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
		Manager.model.getStarUp().removeEventListener(StarUpEvent.STARUP_UPDATE,this.starUp,this);
		super.removeEvent();
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
		switch(e.currentTarget)
		{
			case this._explainBtn:
				Manager.view.show(ViewID.StarUpExplainView,"starUp_sm_png",1,LangCVO.getContent("starUp1"),true);
				break;
			case this._itemMainBg:
				let list:Array<ItemsModelInfo> = this._model.getStarUpList();
				let len:number = list.length;
				if(len == 0)
				{
					Manager.view.show(ViewID.StarUpExplainView,"starUp_zzb_png",2,"starUp_tip_png",false,535,48);
				}else{
					Manager.view.show(ViewID.StarUpExplainView,"starUp_zzb_png",3,"",false,1,1,list);
				}
				break;
			case this._allUpBtn:
				if(this._itemMaindata)
				{
					for(let i=0;i<5;i++)
					{
						if(this._itemsData[i] == null)
						{
							for(let j=0;j<this._itemList.length;j++)
							{
								let item:StarUpItem = this._hScroll.itemList.getChildAt(j) as StarUpItem;
								if(item._state || this._itemList[j].base_id == undefined)
								{
									continue;
								}
								this._itemsData[i] = this._itemList[j]
								item._state = true; 
								item.filters = [FilterUtil.getBrightFilter(-40)];
								break;
							}
						}
					}
					this.createTopItem();
				}else{
 					FloatTips.addTips(LangCVO.getContent("starUp3"), Color.RED);
				}
				break;
			case this._starUpBtn:
				if(this._itemMaindata)
				{
					let type = this._itemMaindata.storagetype;
					let id = this._itemMaindata.id;
					let arr:number[] = [];
					for(let i=0;i<this._itemsData.length;i++)
					{
						if(this._itemsData[i] && this._itemsData[i]!=undefined)
						{
							arr.push(this._itemsData[i].id);
						}
					}
					if(arr.length == 0)
					{
						FloatTips.addTips(LangCVO.getContent("starUp4"), Color.RED);
					}else{
						Manager.control.getStarUp().sendStarUp(type,id,arr);
					}
				}else{
					FloatTips.addTips(LangCVO.getContent("starUp3"), Color.RED);
				}	
				break;
		}
	}

	//创建上方装备
	public createTopItem():void
	{
		let posList:{x,y}[] = [{x:289.5,y:100},{x:540,y:315},{x:456,y:538},{x:166,y:538},{x:50,y:315}]
		let offer_total:number = 0;
		for(let i=0;i<5;i++)
		{
			if(!this._itemTopList[i])
			{
				this._itemTopList[i]= Manager.pool.create(BaseGoods);
				this._itemTopList[i].x = posList[i].x;
				this._itemTopList[i].y = posList[i].y;
				this.addChild(this._itemTopList[i]);
			}
			if(this._itemsData[i])
			{
				this._itemTopList[i].visible = true;
				this._itemTopList[i].setCvo(this._itemsData[i].cvo);
				this._itemTopList[i].setStar(this._itemsData[i].getStar());
				//概率 升星成功率=放入副装备分值总和/主装备所需分值*100%
				for(let j=0;j<this._cvo.length;j++)
				{
					if(this._itemsData[i].base_id == this._cvo[j].item_id && this._cvo[j].star == this._itemsData[i].getStar())
					{
						offer_total += this._cvo[j].offer_val;
						break;
					}
				}
			}else{
				this._itemTopList[i].setCvo(null);
				this._itemTopList[i].visible = false;
			}
			
			if(this._itemMaindata)
			{
				let need:number = 0;
				for(let j=0;j<this._cvo.length;j++)
				{
					if(this._itemMaindata.base_id == this._cvo[j].item_id &&  this._cvo[j].star == this._itemMaindata.getStar())
					{
						need = this._cvo[j].need_val;
						break;
					}
				}
				if(need == 0)//表里没有此装备
				{
					
				}else{
					let success = (offer_total/need*100);
					let str:string;
					if(success < 100)
					{
						str = success.toFixed(1);
					}else{
						str = "100";
					}
					this._success.text = LangCVO.getContent("starUp2") + str + "%";
				}
			}
		}
	}

	//更新主装备
	public updateMainEquip(data:ItemsModelInfo,isStarUp:boolean=false):void
	{
		let oldData = this._itemMaindata;
		this._itemMaindata = data;
		//主装备
		this._itemMain = Manager.pool.create(BaseGoods);
		this.addChild(this._itemMain);
		this._itemMain.x = 290;
		this._itemMain.y = 320;
		this._itemMain.setCvo(this._itemMaindata.cvo);
		this._itemMain.setStar(this._itemMaindata.getStar());
		this._itemMain.touchEnabled = false;
		this._itemMain.touchChildren = false;
		//极品属性
		for(let j=0;j<3;j++)
		{
			this._newList[j].text = "";
		}
		let attr = this._itemMaindata.infoList;
		//let attvo:AttrVO = Manager.pool.create(AttrVO,attr);
		let count = 2;
		for(let i=0;i<attr.length;i++)
		{
			if(attr[i].type == 1)
			{
				let jipVO = Manager.pool.create(AttrVO,attr[i].target+","+attr[i].value);
				let invo:AttrVoInfo =  jipVO.getinfo(attr[i].target);
				if(isStarUp)
				{
					if(attr[i])
					{
						if(invo.showStar == 1)
						{
							HtmlUtil.setTextFlow(this._newList[count], HtmlUtil.addColorTag(invo.desc(), Color.PURPLE_STR));
						}
						else
						{
							HtmlUtil.setTextFlow(this._newList[count], HtmlUtil.addColorTag(invo.desc(), "#009bfd"));
						}
					}else{
						this._newList[count].text = "";
					}
				}else{
					if(attr[i])
					{
						if(invo.showStar == 1)
						{
							HtmlUtil.setTextFlow(this._oldList[count], HtmlUtil.addColorTag(invo.desc(), Color.PURPLE_STR));
						}
						else
						{
							HtmlUtil.setTextFlow(this._oldList[count], HtmlUtil.addColorTag(invo.desc(), "#009bfd"));
						}
					}else{
						this._oldList[count].text = "";
					}
				}

				count--;
			}
		}

		//顶部
		this._itemsData = [null,null,null,null,null];
		this.createTopItem();
		//底部
		let bottomList = this._model.getBottomList(this._itemMaindata);
		this.createBottomScroll(bottomList);
	}

	//创建下方列表
	private createBottomScroll(bottomList:ItemsModelInfo[]):void
	{
		this._itemList = bottomList;
		this._curItemCount = this._itemList.length;
		if(this._itemList.length < 6)
		{
			for(let i:number=0; i<6 - this._curItemCount; i++)
			{
				let info:ItemsModelInfo = new ItemsModelInfo();
				this._itemList.push(info);
			}
		}

		this._hScroll.initBtnListData(StarUpItem, this._itemList, true);
		(<eui.VerticalLayout>this._hScroll.itemList.layout).gap = -8;
		this._hScroll.dataProvider(this._itemList);
	}

	private starUp(e:BaseEvent):void
	{	
		let any = e.params;
		//清空上部
		this._itemsData = [null,null,null,null,null];
		this.createTopItem();

		let data:ItemsModelInfo;

		if(any.result == 1)//成功
		{
			//极品属性
			let arr:Array<ItemsModelInfo>;
			if(any.type == 1)//身
			{
				arr = Manager.model.getItems().equipList.values()
				
			}else if(any.type == 2)
			{
				arr = Manager.model.getItems().bagList
			}
			let ln:number = arr.length;
			for(let i=0;i<ln;i++)
			{
				if(any.id == arr[i].id)
				{
					data = arr[i];
				}
			}
			this.updateMainEquip(data,true);
		}else{//失败
			//刷新底部
			let bottomList = this._model.getBottomList(this._itemMaindata);
			this.createBottomScroll(bottomList);
			//显示新属性（和旧属性相同）
			let attr = this._itemMaindata.infoList;
			let count = 2;
			for(let i=0;i<attr.length;i++)
			{
				if(attr[i].type == 1)
				{
					let jipVO = Manager.pool.create(AttrVO,attr[i].target+","+attr[i].value);
					let invo:AttrVoInfo =  jipVO.getinfo(attr[i].target);
		
					if(attr[i])
					{
						if(invo.showStar == 1)
						{
							HtmlUtil.setTextFlow(this._newList[count], HtmlUtil.addColorTag(invo.desc(), Color.PURPLE_STR));
						}
						else
						{
							HtmlUtil.setTextFlow(this._newList[count], HtmlUtil.addColorTag(invo.desc(), "#009bfd"));
						}
					}else{
						this._newList[count].text = "";
					}
					count--;
				}
			}
		}
		
	}

	public initData():void
	{
		this._thisParent._titleImg.source = "starUp_title_png";
	}

	protected drawAll():void
	{
		super.drawAll();
	}

	public dispose():void
	{
		for(let i=0;i<7;i++)
		{
			this._objList[i].visible = true;
		}

		super.dispose();
		this._thisParent = null;

		ObjectUtil.removes(this._BgImg01, this._BgImg02, this._itemMainBg, this._explainBtn, this._allUpBtn,this._starUpBtn);
		ObjectUtil.disposes(this._success, this._oldTxt01, this._oldTxt02, this._oldTxt03, this._newTxt01, this._newTxt02, this._newTxt03,this._model);

		this._BgImg01.dispose();
		this._BgImg01 = null;
		this._BgImg02.dispose();
		this._BgImg02 = null;

		this._itemMainBg = null;
		this._explainBtn = null;
		this._success = null;

		this._oldTxt01 = null;
		this._oldTxt02 = null;
		this._oldTxt03 = null;
		this._oldList = null;
		this._newTxt01 = null;
		this._newTxt02 = null;
		this._newTxt03 = null;
		this._newList = null;

		this._item01 = null;
		this._item02 = null;
		this._item03 = null;
		this._item04 = null;
		this._item05 = null;

		this._itemTopList = null;
		this._itemsData = null;

		this._itemMain = null;
		this._itemMaindata = null
	 
		this._allUpBtn = null;
		this._starUpBtn = null;

		this._hScroll.dispose();
		this._hScroll = null;
		this._itemList = null;
		this._curItemCount = null;
		this._topItemList = null;
		this._model = null;
		this._cvo = null;
	}
}