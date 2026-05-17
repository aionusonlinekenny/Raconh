/**
 * pzx 
 * 17.11.17
 * 经脉
 */
class JingmaiView extends UIComponent
{
	private _tupoBtn:Button;
	private _chongxueBtn:Button;
	private _attackTxt:Label;
	private _hpTxt:Label;
	private _armorTxt:Label;
	private _defenseTxt:Label;
	/**免伤 */
	private _resistTxt:Label;
	/**重天 */
	private _chongtianImg:eui.Image;
	private _chongtianBtn:Button;
	private _dumaiImg:eui.Image;

	private _self:SelfGameObjectInfo;
	/**人物星位图层 */
	private _janmaiRenSkin:JingmaiRenSkin;
	private _module:JingMaiModel;
	private _cvo:JingMaiCvoInfo;
	private _pathUrl:string;
	private _itemTxt:Label;
	private _dazuohuiImg:eui.Image;
	private _arrorw1:eui.Image;
	private _arrorw2:eui.Image;
	private _arrorw3:eui.Image;
	private _arrorw4:eui.Image;

	private _bimfont:NumImgView2;
	private _bimfont2:NumImgView2;

	private _redIcon:eui.Image;
	private _tips:ItemsTips;

	private _ctAni:Animation;
	private _res1:PlayerResItems;

	private _thisParent:ClubPanel;


	public constructor() 
	{
		super();
		this.touchChildren = true;
		this.skinName = Manager.path.getSkinName("jingmai", "JingmainViewSkin");
	}
	protected configUI():void
	{
		super.configUI();

		this._self = Manager.model.self;
	
		this._module = Manager.model.getJingMai();
		Manager.control.getJingMai().query();

		this._chongtianImg.touchEnabled=this._dazuohuiImg.touchEnabled = false;


		if(!this._bimfont)
		{
			this._bimfont = Manager.pool.create(NumImgView2);
            this._bimfont.x = 45;
			this._bimfont.y = 267;
			this.addChild(this._bimfont);
		}
		if(!this._bimfont2)
		{
			this._bimfont2 = Manager.pool.create(NumImgView2);
			this._bimfont2.x = 286;
			this._bimfont2.y = 778;
			this.addChild(this._bimfont2);
		}

		this._redIcon.visible = false;

		this._res1.iconSize = PlayerResItems.ICON_54;
		this._res1.sign = " ";

	}
	protected addEvent():void
	{
		super.addEvent();
		this._module.addEventListener(JingMaiEvent.JINGMAI_UPDATE_EVENT,this.updateRoleStar,this);
		this._module.addEventListener(JingMaiEvent.JINGMAI_CHECK_ICON_EVENT,this.onIconShowHandler,this)
		this._module.addEventListener(JingMaiEvent.JINGMAI_UPGRAPE_EVENT,this.upGradeJingMaiHandler,this);
		this._chongtianBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickShowCondView,this);
		this.addUpGradeEvent();
	}

	protected removeEvent():void
	{
		this._module.removeEventListener(JingMaiEvent.JINGMAI_UPDATE_EVENT,this.updateRoleStar,this);
		this._module.removeEventListener(JingMaiEvent.JINGMAI_CHECK_ICON_EVENT,this.onIconShowHandler,this)
		this._module.removeEventListener(JingMaiEvent.JINGMAI_UPGRAPE_EVENT,this.upGradeJingMaiHandler,this);
		this._chongtianBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickShowCondView,this);
		if(this._ctAni) this._ctAni.removeEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE,this.onUpgradeHandler,this);
		this.removeGradeEvent();
		super.removeEvent();
	}
	private addUpGradeEvent():void
	{
		this._chongxueBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tupPoClick,this);
		this._tupoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tupPoClick,this);
	}
	private removeGradeEvent():void
	{
		this._chongxueBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.tupPoClick,this);
		this._tupoBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.tupPoClick,this);
	}
	private clickShowCondView(e:egret.TouchEvent):void
	{
		Manager.view.show(ViewID.JingmaiCondView);
	}

	//冲穴
	private tupPoClick(e:egret.TouchEvent):void
	{
		var loss:GainLossVO = new GainLossVO(this._cvo.quantity);
		
		if(loss.type == GainLossVO.ITEM)
		{
			this._res1.visible = false;
			let item:ItemsCVO = ItemsCVO.getCvo(loss.baseId);
			if(!loss.isEnough())
			{
				this._tips= Manager.view.show(ViewID.ItemsTips);
			    this._tips.setData(item)
				return;
			}
		}
		else if(loss.type)
		{
			if(!loss.isEnough())
			{
				let cvo:ItemsCVO = ItemsCVO.getCvo(ItemsConst.DONATE);//消耗的是贡献，固定id 
				this._tips= Manager.view.show(ViewID.ItemsTips);
			    this._tips.setData(cvo)
				return;
			}
		}

		Manager.control.getJingMai().jianMaiLvUp(this._cvo.level,this._self.id);
	}

	private removeStarMap():void
	{
		if(this._janmaiRenSkin)
		{
			this._janmaiRenSkin.dispose();
			this._janmaiRenSkin = null;
		}
	}
	protected drawAll():void
	{
		super.drawAll();
		 this._thisParent.setTopGameMoney(GainLossVO.GUILD_DONATE);
	}

	private updateRoleStar():void
	{
		let career:number = this._self.attrInfo.career;
		let level:number = this._module.getId(this._self.id);
		if(level === undefined)
		{
			//空的时候默认读0
			level = 0;
		}
		
		this._cvo = JingMaiCVO.getInfo(level);
		//获取星位底图
		let resouArr:string[] = this._cvo.source_id.split("|");
		let pathId:string;
		for(let key of resouArr)
		{
			let carArr:string[] = key.split(",");
			if(Number(carArr[0]) == career+1)
			{
				pathId = carArr[1];
				break;
			}
		}
		if(this._pathUrl != pathId)
		{
			this.removeStarMap();
			this._pathUrl = pathId;
		}
		if(this._janmaiRenSkin==null)
		{
			this._janmaiRenSkin = new JingmaiRenSkin;
			this.addChildAt(this._janmaiRenSkin,0);
			let url:string = "JingmaiRen"+pathId+"Skin";
			this._janmaiRenSkin.setSkinName(url);
			this._janmaiRenSkin.setDiBitmap(pathId);
			this._janmaiRenSkin.callBackFun = this.updateRoleStar;
			this._janmaiRenSkin.target = this;
		}
		
		this._janmaiRenSkin.setStarActive(this._cvo.pose);
		//============================
		//消耗物品
		var loss:GainLossVO = new GainLossVO(this._cvo.quantity);
		
		if(loss.type == GainLossVO.ITEM)
		{
			this._res1.visible = false;
			let item:ItemsCVO = ItemsCVO.getCvo(loss.baseId);
			let count:number = Manager.model.getItems().getCountItemById(loss.baseId);
			var str:string;
			if(count < loss.num)
			{
				str = "消耗："+ item.name +"("+HtmlUtil.addColorTag("" + count,"#ff0000")+"/"+loss.num+")";
			}
			else
			{
				str =  "消耗："+ item.name +"("+count+"/"+loss.num+")";
			}
			this._itemTxt.textFlow = new egret.HtmlTextParser().parse(str);
		}
		else if(loss.type.length>0)
		{
			if(loss.isEnough())
			{
				this._res1.color = "#ffffff";
			}
			else
			{
				this._res1.color = "#ff0000";
			}
			this._res1.setData(loss);
		}
		else if(this._cvo.quantity=="")
		{
			this._itemTxt.text = "";
			this._res1.visible = false;
		}
		//=============
		if(this._cvo.type == 1)
		{
			this._chongxueBtn.visible = true;
			this._tupoBtn.visible = false;
			this._res1.visible = true;
			this._itemTxt.visible = false;
		}
		else if(this._cvo.type == 2)
		{
			this._chongxueBtn.visible = false;
			this._tupoBtn.visible = true;
			this._res1.visible = false;
			this._itemTxt.visible = true;
		}
		//========属性
		let attrVo:AttrVO = Manager.pool.create(AttrVO, this._cvo.attr);
		this._attackTxt.text = "+"+attrVo.getNum(AttrVO.DMG);
		this._hpTxt.text = "+"+attrVo.getNum(AttrVO.HP_MAX);
		this._armorTxt.text = "+"+attrVo.getNum(AttrVO.ARMOR);
		this._defenseTxt.text = "+"+attrVo.getNum(AttrVO.DEFENCE);
		if(attrVo.getNum(AttrVO.DMG_REDUCE)== 0)
		{
			this._resistTxt.text="";
		}
		else
		{
			this._resistTxt.text = "免伤" + (attrVo.getNum(AttrVO.DMG_REDUCE)/1000*100).toFixed(1) + "%";
		}
		let needleve:number;
		if(level>=JingMaiCVO.maxLevel)
		{
			//最高级
			needleve = level;
		}
		else
		{
			needleve = level+1;
		}
		let cvo2:JingMaiCvoInfo = JingMaiCVO.getInfo(needleve);
		let attrVo2:AttrVO = Manager.pool.create(AttrVO, cvo2.attr);
		this._arrorw1.visible = attrVo.getNum(AttrVO.DMG) < attrVo2.getNum(AttrVO.DMG) ? true:false;
		this._arrorw2.visible = attrVo.getNum(AttrVO.HP_MAX) < attrVo2.getNum(AttrVO.HP_MAX) ? true:false;
		this._arrorw3.visible = attrVo.getNum(AttrVO.ARMOR) < attrVo2.getNum(AttrVO.ARMOR) ? true:false;
		this._arrorw4.visible = attrVo.getNum(AttrVO.DEFENCE) < attrVo2.getNum(AttrVO.DEFENCE) ? true:false;


		//=====
		this._dumaiImg.source = "jingmai_mai"+this._cvo.jingmaiType+"_png";
		this._chongtianImg.source = "jingmai_"+(this._cvo.cond-1)+"chongtian_png";
		if(this._cvo.cond == 1)
		{
			this._dazuohuiImg.visible = true;
		}
		else
		{
			this._dazuohuiImg.visible = false;
		}
		if(this._cvo.cond== 11)
		{
			//最后一级取10层
			this._bimfont.setValue(this._cvo.cond-1,"nums_golden_", 15);
		}
		else
		{
			this._bimfont.setValue(this._cvo.cond,"nums_golden_", 15);
		}
		if(this._cvo.cond>9)
		{
			this._bimfont.x = 34;
		}
		else
		{
			this._bimfont.x = 45;
		}

		this._bimfont2.setValue(attrVo.getFighting(),"nums_fighting_", 25);
		Manager.pool.push(attrVo);
		Manager.pool.push(attrVo2);
		this.addUpGradeEvent();
	}

	
	private onIconShowHandler(e:JingMaiEvent):void
	{
		this._redIcon.visible = e.params;
	}
	private upGradeJingMaiHandler(e:JingMaiEvent):void
	{
		this.removeGradeEvent();
		let leve:number = e.params;
		let cvo:JingMaiCvoInfo = JingMaiCVO.getInfo(leve);
		this._janmaiRenSkin.upgradeStar();

		var loss:GainLossVO = new GainLossVO(cvo.quantity);
		if(loss.type == GainLossVO.ITEM)
		{
			if(this._ctAni==null) 
			{
				this._ctAni = Manager.animation.createJingmaiAnimation("jingmaict");
				this._ctAni.addEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE,this.onUpgradeHandler,this);
				this._ctAni.x = this._chongtianBtn.x-31;
				this._ctAni.y = this._chongtianBtn.y-32;
				this.addChild(this._ctAni);
				this.swapChildren(this._ctAni,this._chongtianImg);
			}
			this._ctAni.visible = true;
			this._ctAni.play();
		}
		
	}

	private onUpgradeHandler():void
	{
		if(this._ctAni)
		{
			this._ctAni.stop();
			this._ctAni.visible = false;
		}
	}

	public reuse(...args:any[]):void
	{
		super.reuse(args);

		this._thisParent = args[0];
    }

	public unuse():void
	{
		super.unuse();

		this._thisParent.setTopGameMoney(GainLossVO.COIN);
	}

	public dispose():void
	{
		this._thisParent.setTopGameMoney(GainLossVO.COIN);
		this._thisParent = null;
		super.dispose();
		if(this._loadComplete)
		{
			this._res1.dispose();
			this._res1 = null;
			this._tupoBtn.dispose();
			this._tupoBtn= null;
			this._chongxueBtn.dispose();
			this._chongxueBtn=null;
			this._attackTxt.dispose();
			this._attackTxt= null;
			this._hpTxt.dispose();
			this._hpTxt = null;
			this._armorTxt.dispose();
			this._armorTxt= null;
			this._defenseTxt.dispose();
			this._defenseTxt = null;
			this._resistTxt.dispose();
			this._resistTxt = null;
			this.removeChild(this._chongtianImg);
			this._chongtianImg=null;
			this._chongtianBtn.dispose();
			this._chongtianBtn = null;

			this._dumaiImg.parent.removeChild(this._dumaiImg);
			this._dumaiImg=null;
			this._self=null;
			/**人物星位图层 */
			this.removeStarMap();
			// this._janmaiRenSkin.dispose();
			// this._janmaiRenSkin = null;
			this._module=null;
			this._cvo=null;
			this._itemTxt.dispose();
			this._itemTxt = null;

			this.removeChild(this._dazuohuiImg);
			this._dazuohuiImg=null;

			this._arrorw1.parent.removeChild(this._arrorw1);
			this._arrorw1=null;
			this._arrorw2.parent.removeChild(this._arrorw2);
			this._arrorw2=null;
			this._arrorw3.parent.removeChild(this._arrorw3);
			this._arrorw3=null;
			this._arrorw4.parent.removeChild(this._arrorw4);
			this._arrorw4=null;

			this._bimfont.dispose();
			this._bimfont = null;
			this._bimfont2.dispose();
			this._bimfont2 = null;

			this.removeChild(this._redIcon)
			this._redIcon = null;

			if(this._tips)
			{
				this._tips = null;
			}
			if(this._ctAni) Manager.pool.push(this._ctAni)
			this._ctAni = null;
			// this._callBackFun = null;
		}
	}


}