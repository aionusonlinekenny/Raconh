/**装备tips皮肤 */
class EquipTips extends BaseItemsTips
{
	private _group:eui.Group;
	public _closeBtn:Button;
	private _goods:BaseGoods;
	private _nameTxt:Label;
	private _fighting:Label;
	private _level:Label;
	private _career:Label;
	//属性
	private _attText1:Label;
	private _attText2:Label;
	//强化属性
	private _attAddValue1:Label;
	private _attAddValue2:Label;


	private _attrTextList:Array<Label>;

	private _cvo:ItemsCVO;
	private _info:ItemsModelInfo;

	private _bgImg:eui.Image;
	/**极品属性*/
	private _jipinGup:eui.Group;
	/** 铸魂属性*/
	private _zhuhunGup:eui.Group;
	/**宝石 */
	private _gem:eui.Group;

	/** 极品文本 列表 */
	private _jipinList:Array<egret.TextField>;
	/** 铸魂文本 列表 */
	private _zhuhunList:Array<egret.TextField>;
	/**宝石列表 */
	private _gemList:Array<TipsGemItem>;

	public constructor()
	{
		super();
		this.skinName = Manager.path.getSkinName("tips", "EquipTipsSkin");
	}

	protected configUI():void
	{
		super.configUI();
		this._group.touchEnabled = false;
		
		this._goods.enabled = false;
		this._goods.count = 1;
		this._attrTextList = [this._attText1, this._attText2];

		this.onResizeHandler();
	}

	public reuse(...args:any[]):void
	{
        super.reuse(args);
    }
	

	protected addEvent():void
	{
		super.addEvent();
		GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
	}

	protected removeEvent():void
	{
		GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		super.removeEvent();
	}

	private onResizeHandler(e?:GlobalEvent):void
	{
		this.x = Math.round((Manager.global.gameMain.stage.stageWidth - this.width) / 2);
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
		switch(e.currentTarget)
		{
			case this._closeBtn:
				Manager.view.hide(ViewID.EquipTips);
				break;
		}
	}

	public setData(value:ItemsCVO,value2?:ItemsModelInfo):void
	{
		this._cvo = value;
		this._info = value2;
		super.setData(value);
	}

	public show(value:ItemsCVO,value2?:ItemsModelInfo):void
	{
		this.touchChildren = true;
		this.setData(value, value2);
		Manager.layer.tipsLayer.addChild(this);
		this.y = Math.round((Manager.config.gameHeight - this.height) / 2);
	}

	public hide():void
	{
		Manager.layer.tipsLayer.removeChild(this);
	}

	protected drawData():void
	{
		let cvo:ItemsCVO = this._cvo;
		let fightNum:number= 0;//战斗力
		let jipVO:AttrVO;

		this._goods.setCvo(cvo);
		if(this._info)
		{
			this._goods.setStar(this._info.getStar());
		}
		else
		{
			this._goods.setStar(0);
		}
		
		let strengthenLevel:number = 0;
		let zhuhunLevel:number = 0;
		let gemList:Array<any>=[];
		var strengthenInfo:EquipStrengthenInfo = Manager.model.getItems().equipStrengthenData.get(cvo.pos);
		if(strengthenInfo)
		{
			strengthenLevel = strengthenInfo.level;
			zhuhunLevel = strengthenInfo.zhuhunLevel;
			gemList = strengthenInfo.gemList;
			fightNum = strengthenInfo.zhuhunFighting + strengthenInfo.gemFighting;
		}
		if(strengthenLevel > 0)
			this._nameTxt.text = cvo.name + "+" + strengthenLevel;
		else
			this._nameTxt.text = cvo.name;
			
		this._level.text = cvo.needLevelStr;

		switch(cvo.needCarrer)
		{
			case 1:
			this._career.text = LangCVO.getContent("common2");
			break
			case 2:
			this._career.text = LangCVO.getContent("common3");
			break
			case 3:
			this._career.text = LangCVO.getContent("common4");
			break
		}

		//===属性======
		let attr:AttrVO = Manager.pool.create(AttrVO,cvo.attr);
		fightNum += attr.getFighting();
		let attrArr:AttrVoInfo[] = attr.attrInfos;
		for(let i:number = 0;i<this._attrTextList.length;i++)
		{
			if(attrArr[i])
			{
				this._attrTextList[i].text = attrArr[i].desc();
			}
			else
			{
				this._attrTextList[i].text = ""
			}
		}

		//强化
		let info:EquipStrengthenCVO = EquipStrengthenCVO.getInfo(cvo.pos, strengthenLevel);
		if(strengthenLevel>0 && info && info.attr.length > 0)
		{
			let str:string = attrArr[0].id+","+ info.attr[0][1]+"|"+attrArr[1].id+","+info.attr[1][1];
			jipVO = Manager.pool.create(AttrVO,str);
			fightNum += jipVO.getFighting();
			Manager.pool.push(jipVO);
			HtmlUtil.setTextFlow(this._attAddValue1, HtmlUtil.addColorTag("（强化+" + String(info.attr[0][1]) + "）", "#38b800"));
			HtmlUtil.setTextFlow(this._attAddValue2, HtmlUtil.addColorTag("（强化+" + String(info.attr[1][1]) + "）", "#38b800"));
		}
		else
		{
			this._attAddValue1.text = "";
			this._attAddValue2.text = "";
		}
		Manager.pool.push(attr);
		let bgH:number = 248;//底图的高度
		//=====极品属性==================
		if(this._info && this._info.infoList.length>0)
		{
			
			let jipinArr:ExattrItemsinfo[] = this._info.infoList;
			let inArr:ExattrItemsinfo[] = [];
			let jip:number;
			let jipinfo:ExattrItemsinfo;
			for(jip= 0;jip<jipinArr.length;jip++)
			{
				jipinfo = jipinArr[jip];
				if(jipinfo.type == 1)
				{
					//1为极品属性
					inArr.push(jipinfo);
				}
			}
			if(inArr.length>0)
			{

				if(this._jipinList == null) this._jipinList = [];
				this._jipinGup.visible = true;
				inArr = ArrayUtil.sortOn(inArr,["target"]);
				let jipln:number = inArr.length>this._jipinList.length?inArr.length:this._jipinList.length;
				for(jip= 0;jip<jipln;jip++)
				{
					jipinfo = inArr[jip];
					if(!jipinfo)
					{
						this._jipinList[jip].visible = false;
						continue;
					}
					jipVO = Manager.pool.create(AttrVO,jipinfo.target+","+jipinfo.value);
					fightNum += jipVO.getFighting();
					if(this._jipinList[jip]==null)
					{
						this._jipinList[jip] = new egret.TextField();
						this._jipinList[jip].width = 260;
						this._jipinList[jip].height = 24;
						this._jipinList[jip].x = 40;
						this._jipinList[jip].y = (this._jipinGup.y+this._jipinGup.height+10) + jip * 33;
						this._group.addChild(this._jipinList[jip]);
					}
					let jiptxt:egret.TextField = this._jipinList[jip];
					jiptxt.visible = true;
					let invo:AttrVoInfo =  jipVO.getinfo(jipinfo.target);
					invo.sign="+";
					if(invo.showStar == 1)
					{
						HtmlUtil.setTextFlow(jiptxt, HtmlUtil.addColorTag(invo.desc(), Color.PURPLE_STR));
					}
					else
					{
						HtmlUtil.setTextFlow(jiptxt, HtmlUtil.addColorTag(invo.desc(), "#009bfd"));
					}
					Manager.pool.push(jipVO);
					bgH = jiptxt.y + jiptxt.height+15;
				}
			}
			else
			{
				this.jipinClear();
			}
		}
		else
		{
			this.jipinClear();
		}


		//=====铸魂==================
		let zhuhunInfo:EquipZhuhunCVO = EquipZhuhunCVO.getInfo(cvo.needCarrer, cvo.pos, zhuhunLevel);
		if(zhuhunLevel>0 && zhuhunInfo && zhuhunInfo.zhuhunAttrList.length > 0)
		{
			this._zhuhunGup.visible = true;
			this._zhuhunGup.y = bgH;
			if(this._zhuhunList==null) this._zhuhunList =[];
			let zhln:number=zhuhunInfo.zhuhunAttrList.length>this._zhuhunList.length?zhuhunInfo.zhuhunAttrList.length:this._zhuhunList.length;
			for(let i:number=0;i<zhln;i++)
			{
				let zhArr:Array<number>= zhuhunInfo.zhuhunAttrList[i];
				if(!zhArr)
				{
					this._zhuhunList[i].visible = false;
					continue;
				}
				if(this._zhuhunList[i]==null)
				{
					this._zhuhunList[i] = new egret.TextField();
					this._zhuhunList[i].width = 260;
					this._zhuhunList[i].height = 24;
					this._zhuhunList[i].x = 40;
					this._group.addChild(this._zhuhunList[i]);
				}
				let txt:egret.TextField = this._zhuhunList[i];
				txt.y = (this._zhuhunGup.y+this._zhuhunGup.height+10) + i * 33;
				txt.visible = true;
				jipVO = Manager.pool.create(AttrVO,zhArr[0]+","+zhArr[1]);

				HtmlUtil.setTextFlow(txt, HtmlUtil.addColorTag(jipVO.getinfo(zhArr[0]).desc(), "#38b800"));
				Manager.pool.push(jipVO);
				bgH = txt.y + txt.height+15;
			}

		}
		else
		{
			this.zhuhunClear();
		}
		//=============宝石============================
		if(gemList.length>0)
		{
			this._gem.y = bgH;
			if(this._gemList==null) this._gemList=[];
			let ln:number = gemList.length>this._gemList.length?gemList.length:this._gemList.length;
			for(let i:number = 0;i<ln;i++)
			{
				if(gemList[i]==null)
				{
					this._gemList[i].visible = false;
					continue;
				}
				if(!this._gemList[i])
				{
					this._gemList[i] = Manager.pool.create(TipsGemItem);
					this._gemList[i].x = 30;
					this._group.addChild(this._gemList[i]);
				}
				let gemany:any = gemList[i];//{gemPos:gemPos, gemId:gemId}
				let item:TipsGemItem = this._gemList[i];
				item.y = (this._gem.y) + i * (this._gemList[i].height - 15);
				item.setData(gemany.gemId);
				item.visible = true;
				bgH = item.y + item.height-10;
			}
		}
		else
		{
			this.gemClear();
		}

		//================
		this._fighting.text = "" + fightNum;
		this._bgImg.height = bgH+30;
		super.drawData();
	}

	private jipinClear():void
	{
		if(this._jipinList)
		{
			this._jipinList.forEach((txt,i)=>{
				txt.textFlow = null;
				txt.visible= false;
			});
		}
		this._jipinGup.visible = false;
	}
	private zhuhunClear():void
	{
		if(this._zhuhunList)
		{
			this._zhuhunList.forEach((txt,i)=>{
				txt.textFlow = null;
				txt.visible= false;
			});
		}
		this._zhuhunGup.visible = false;
	}
	private gemClear():void
	{
		this._gem.visible = false;
		if(this._gemList)
		{
			this._gemList.forEach((txt,i)=>{
				txt.visible= false;
				txt.unuse();
			});
		}
	}

	public unuse():void
	{
		super.unuse();
		this._goods.unuse();
		this._nameTxt.text = "";
		this._fighting.text = "";
		this._level.text = "";
		this._career.text = "";
		this._attText1.text = "";
		this._attText2.text = "";
		this._attAddValue1.text = "";
		this._attAddValue2.text = "";
		this._cvo=null;
		this._info = null;
		this.gemClear();
		this.zhuhunClear();
		this.jipinClear();
	}

	public dispose():void
	{
		super.dispose();
		for(let i:number= 0;i<this._attrTextList.length;i++)
		{
			if(this._attrTextList[i])
			{
				this._attrTextList[i].dispose();
				this._attrTextList[i]=null;
			}
		}
		this._attrTextList=null;
		if(this._jipinList)
		{
			for(let i:number= 0;i<this._jipinList.length;i++)
			{
				if(this._jipinList[i])
				{
					this._jipinList[i].parent.removeChild(this._jipinList[i])
					this._jipinList[i]=null;
				}
			}
			this._jipinList = null;
		}
		if(this._zhuhunList)
		{
			for(let i:number= 0;i<this._zhuhunList.length;i++)
			{
			if(this._zhuhunList[i])
			{
				this._zhuhunList[i].parent.removeChild(this._zhuhunList[i])
				this._zhuhunList[i]=null;
			}
			}
			this._zhuhunList=null;
		}
		if(this._gemList)
		{
			for(let i:number= 0;i<this._gemList.length;i++)
			{
				if(this._gemList[i])
				{
					this._gemList[i].dispose();
					this._gemList[i]=null;
				}
			}
			this._gemList=null;
		}

		ObjectUtil.removes(this._group,this._bgImg,this._jipinGup,this._zhuhunGup,this._gem);
		ObjectUtil.disposes(this._closeBtn,this._goods,this._nameTxt,this._fighting,this._level,this._career,
		this._attText1,this._attText2,this._attAddValue1,this._attAddValue2)

		this._group = null;
		this._closeBtn = null;
		this._goods = null;
		this._nameTxt = null;
		this._fighting = null;
		this._level = null;
		this._career = null;
		this._attText1 = null;
		this._attText2 = null;
		this._attAddValue1 = null;
		this._attAddValue2 = null;

		this._cvo = null;
		this._info = null;

		this._bgImg = null;
		this._jipinGup = null;
		this._zhuhunGup = null;
		this._gem = null;
	}
}