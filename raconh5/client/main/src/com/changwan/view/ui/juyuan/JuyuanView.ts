/**
 * drq 
 * 聚元
 * 2018.3.28
 */
class JuyuanView extends UIComponent
{
	private _ballBackList:eui.Group;
	private _zhanliBack:eui.Image;
	private _jieduanBack:eui.Image;
	private _cailiao:Label;
	private _yinbi:Label;
	private _juyuanBtn:eui.Button;
	private _tupoBtn:eui.Button; 
	private _redText:Label;
	private _redIcon:eui.Image;

	private _scedule:eui.Image;
	private _star01:eui.Image;
	private _star02:eui.Image;
	private _star03:eui.Image;
	private _star04:eui.Image;
	private _cost:eui.Group;

	private _bimfont:NumImgView2;
	private _bimfont2:NumImgView2;

	private _godAni:Animation;
	private _model:JuyuanModel;
	private _ballList:JuyuanBall[] = [];
	private _aniList:Animation[] = [];
	private _starList:eui.Image[] = [];
	private _isUpdate:boolean = false;
 

	public constructor() {
		super();
		this.touchChildren = true;
		this.skinName = Manager.path.getSkinName("juyuan","JuyuanViewSkin");
	}

	protected configUI():void
	{
		super.configUI();
		Manager.control.getJuyuan().senInitInfo();
		this._model = Manager.model.getJuyuan();

		if(!this._bimfont)
		{
			this._bimfont = Manager.pool.create(NumImgView2);
            this._bimfont.x = 640;
			this._bimfont.y = 240;
			this.addChild(this._bimfont);
		}
		if(!this._bimfont2)
		{
			this._bimfont2 = Manager.pool.create(NumImgView2);
			this._bimfont2.x = 296;
			this._bimfont2.y = 790;
			this.addChild(this._bimfont2);
		}
		this._starList = [this._star01,this._star02,this._star03,this._star04];
	}

	protected addEvent():void
	{
		super.addEvent();
		this._model.addEventListener(JuyuanEvent.JUYUAN_INFO_UPDATE,this.infoUpdate,this);
		this._model.addEventListener(JuyuanEvent.JUYUAN_PROGRESS_UPDATE,this.progessUpdate,this);
		this._tupoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tupPoClick,this);
		this._juyuanBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.juyuanClick,this);
		Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT,this.setItem,this);
		Manager.model.self.addEventListener(GameObjectAttrEvent.COIN, this.setItem,this);
		Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL,this.setBtn,this);
	}
	protected removeEvent():void
	{
		super.removeEvent();
		this._model.removeEventListener(JuyuanEvent.JUYUAN_INFO_UPDATE,this.infoUpdate,this);
		this._model.removeEventListener(JuyuanEvent.JUYUAN_PROGRESS_UPDATE,this.progessUpdate,this);
		this._tupoBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.tupPoClick,this);
		this._juyuanBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.juyuanClick,this);
		Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT,this.setItem,this);
		Manager.model.self.removeEventListener(GameObjectAttrEvent.COIN, this.setItem,this);
		Manager.model.self.removeEventListener(GameObjectAttrEvent.LEVEL,this.setBtn,this);
	}

	private tupPoClick():void
	{
		let list:JuyuanCVO = this._model.getCurList();
		if(list.consume)
		{
			let arr:GainLossVO[] = GainLossVO.parse(list.consume);
			let item:number = arr[0].num;
			let yinbi:number = arr[1].num;
			let cur_item:number = Manager.model.getItems().getCountItemById(arr[0].baseId);
			let cur_yinbi:number  = Manager.model.self.attrInfo.coin;
			if(item > cur_item)//材料不足
			{
				FloatTips.addTips(LangCVO.getContent("juyuan3"), Color.RED);
				let shopCvo = ShopCVO.getbaseIdCvo(arr[0].baseId);
				Manager.view.show(ViewID.ShopBuyView,shopCvo);
			}else if(yinbi > cur_yinbi){
				FloatTips.addTips(LangCVO.getContent("juyuan4"), Color.RED);
			}else{
				Manager.control.getJuyuan().sendProgress(1,list.id);
			}
		}else{
			Manager.control.getJuyuan().sendProgress(1,list.id);
		}
	}

	private juyuanClick():void
	{
		let list:JuyuanCVO = this._model.getCurList();
		Manager.control.getJuyuan().sendProgress(2,list.id);
		Manager.view.hide(ViewID.GfgPanel);
	}

	private infoUpdate():void
	{
		this.createGodAni();
		let list:JuyuanCVO = this._model.getCurList();
		
		this.setItem();
		//阶
		this._bimfont.setValue(list.step,"nums_golden_", 15);
		//战力
		let cvo:Array<JuyuanCVO> = JuyuanCVO.getCvo();
		let attr:string = cvo[list.sort_id-1].t_attr;
		let attvo:AttrVO = Manager.pool.create(AttrVO,attr);
		let numfight:number = attvo.getFighting();
		Manager.pool.push(attvo);
		this._bimfont2.setValue(numfight,"nums_fighting_", 25);
		//星星
		this.setStar(list.star);
		this.createBall();
		this.setBallAni(list);;
	}

	private createBall():void
	{
		let list:any[] = this._model.getInfoList();

		let len:number = this._ballBackList.numChildren;
		for(let i=0;i<len;i++)
		{
			let back:eui.Image = this._ballBackList.getChildAt(i) as eui.Image;
			let img:JuyuanBall = new JuyuanBall(i,list[i]);
			img.width = 100;
			img.height = 100;
			img.x = back.x + this._ballBackList.x + 9;
			img.y = back.y + this._ballBackList.y + 3;
			this.addChild(img);
			this._ballList.push(img);
		}
	}

	private setBallAni(cvo:JuyuanCVO):void
	{
		for(let i=0;i<9;i++)
		{
			if(this._aniList[i] == null)
			{
				if(cvo.step == 0)
				{
					if(i < cvo.id - 1)
					{
						//this._ballList[i].setTouch(true);
						let ani:Animation = Manager.animation.createJuyuanAnimation("jyui");
						ani.x = this._ballList[i].x - 75;
						ani.y = this._ballList[i].y - 75;
						this.addChild(ani);
						this._aniList.push(ani);
					}
				}else{
					let ani:Animation = Manager.animation.createJuyuanAnimation("jyui");
					ani.x = this._ballList[i].x - 75;
					ani.y = this._ballList[i].y - 75;
					this.addChild(ani);
					this._aniList.push(ani);
				}
				
			}
		}
	}

	private createGodAni():void
	{
		if(this._godAni == null)
		{
			this._godAni = Manager.animation.createJuyuanAnimation("jy");
			this._godAni.x = -50;
			this._godAni.y = 120;
			this.addChild(this._godAni);
		}
	}

	private setItem():void
	{
		let list:JuyuanCVO = this._model.getCurList();
		if(list.consume)
		{
			this._cost.visible = true;
			let arr:GainLossVO[] = GainLossVO.parse(list.consume);
			let item:number = Manager.model.getItems().getCountItemById(arr[0].baseId);
			this._cailiao.text = item + "/" + arr[0].num;
			this._yinbi.text = arr[1].num + "";
			let cur_yinbi:number  = Manager.model.self.attrInfo.coin;
			if(cur_yinbi < arr[1].num)
			{
				this._yinbi.textColor = Color.RED;
			}else{
				this._yinbi.textColor = Color.DEF2;
			}
			let cur_item:number = Manager.model.getItems().getCountItemById(arr[0].baseId);
			if(cur_item < arr[0].num)
			{
				this._cailiao.textColor = Color.RED;
			}else{
				this._cailiao.textColor = Color.DEF2;
			}
			
		}else{
			this._cost.visible = false;
			this._cailiao.text ="";
			this._yinbi.text = "";
		}
		this.setBtn();
	}

	private setStar(star:number):void
	{
		if(this._isUpdate)
		{
			this.createAniStar(star);
			this._isUpdate = false;
		}
		switch(star)
		{
			case 1:
				this._scedule.width = 1*130;
				this._star01.source = "juyuan_star01_png";
				this._star02.source = "juyuan_star02_png";
				this._star03.source = "juyuan_star02_png";
				this._star04.source = "juyuan_star02_png";
				break;
			case 2:
				this._scedule.width = 2*130;
				this._star01.source = "juyuan_star01_png";
				this._star02.source = "juyuan_star01_png";
				this._star03.source = "juyuan_star02_png";
				this._star04.source = "juyuan_star02_png";
				break;
			case 3:
				this._scedule.width = 3*130;
				this._star01.source = "juyuan_star01_png";
				this._star02.source = "juyuan_star01_png";
				this._star03.source = "juyuan_star01_png";
				this._star04.source = "juyuan_star02_png";
				break;
			case 4:
				this._scedule.width = 4*130;
				this._star01.source = "juyuan_star01_png";
				this._star02.source = "juyuan_star01_png";
				this._star03.source = "juyuan_star01_png";
				this._star04.source = "juyuan_star01_png";
				break;
			default:
				this._scedule.width = 0;
				this._star01.source = "juyuan_star02_png";
				this._star02.source = "juyuan_star02_png";
				this._star03.source = "juyuan_star02_png";
				this._star04.source = "juyuan_star02_png";
				break;
		}
	}

	private createAniStar(star:number):void
	{
		let ani = Manager.animation.createJuyuanAnimation("starjy");
		if(this._starList[star-1])ani.x = this._starList[star-1].x;
		
		ani.y = 800;
		this.addChild(ani);
	}

	private setBtn():void
	{
		let list:JuyuanCVO = this._model.getCurList();
		let conList:ConditionVO[] = ConditionVO.getVOList(list.cond);
		let conValue:number = conList[0].value;
		let curLevel:number = Manager.model.self.attrInfo.level;
		if(conValue > curLevel)//等级条件
		{
			this._tupoBtn.visible = false;
			this._juyuanBtn.visible = false;
			this._redIcon.visible = false;
			this._redText.text = LangCVO.getContent("juyuan1",conValue);
			this._redText.textColor = Color.RED;
		}else{
			if(list.star == 4)//判断星星数
			{
				this._tupoBtn.visible = false;
				this._juyuanBtn.visible = true;
			}else{
				this._tupoBtn.visible = true;
				this._juyuanBtn.visible = false;
			}
			if(list.consume)
			{
				let bool:boolean = this._model.checkCoin();
				//设置红点
				if(bool)
				{
					this._redIcon.visible = true;
				}else{
					this._redIcon.visible = false;
				}
			}else{
				this._redIcon.visible = true;
			}
		}
	}

	private progessUpdate():void
	{
		this._isUpdate = true;
		this.infoUpdate();
	}

	public dispose():void
	{
		super.dispose();
		ObjectUtil.removes(this._ballBackList,this._zhanliBack,this._jieduanBack,this._juyuanBtn,
		this._tupoBtn,this._redIcon,this._scedule,this._star01,this._star02,this._star03,this._star04,this._cost);
		ObjectUtil.disposes(this._model,this._redText,this._cailiao,this._yinbi);
		this._ballBackList = null;
		this._zhanliBack = null;
		this._jieduanBack = null;
		this._cailiao = null;
		this._yinbi = null;
		this._juyuanBtn = null;
		this._tupoBtn = null;
		this._redText = null;
		this._redIcon = null;

		this._scedule = null;
		this._star01 = null;
		this._star02 = null;
		this._star03 = null;
		this._star04 = null;
		this._cost = null;

		this._bimfont.dispose();
		this._bimfont = null;
		this._bimfont2.dispose();
		this._bimfont2 = null;

		if(this._godAni) Manager.pool.push(this._godAni)
		this._godAni = null;

		this._model = null;
		this._ballList = null;
		this._aniList = null;
		this._starList = null;
		this._isUpdate = null;
	}
}