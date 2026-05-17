/**
 * 神器属性详情
 * pzx 
 * create 18.3.8
 */
class RelicStuffAttrView extends PopUpView{
	private _actBtn:Button;
	private _equipBit:BitmapRemote;
	private _attrTxt0:Label;
	private _attrTxt1:Label;
	private _attrTxt2:Label;
	private _attrTxt3:Label;
	private _versTxt:Label;
	private _desc1:Label;
	private _desc2:Label;
	private _descGroup:eui.Group;

	private _data:any;

	private _attList:Label[];
	private _fighting:NumImgView2;
	private _fightImg:eui.Image;
	private _redIcon:eui.Image;
	private _diImg:eui.Image;
	// private _sucAni:Animation;

	private _guideID:number;

	public constructor() {
		super();
		this.skinName = Manager.path.getSkinName("relicStuff", "RelicStuffAttrViewSkin");
	}
	protected configUI():void
    {
        super.configUI();
		this._attList = [this._attrTxt0,this._attrTxt1,this._attrTxt2,this._attrTxt3]
		if(!this._fighting)
		{
			this._fighting = Manager.pool.create(NumImgView2);
			this._fighting.x = this._fightImg.x + 70;
			this._fighting.y = this._fightImg.y+3;
			this.addChild(this._fighting);
		}
		this._desc2.text = LangCVO.getContent("relicstuff2");
    }

    protected addEvent():void
    {
        super.addEvent();
		this._actBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSendActivityHandler,this);
		Manager.model.getrelicstuff().addEventListener(RelicStuffEvent.RELICSTUFF_ACTIVITY_EVENT,this.onActivityReturn,this);
    }

    protected removeEvent():void
    {
		this._actBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onSendActivityHandler,this);
		Manager.model.getrelicstuff().removeEventListener(RelicStuffEvent.RELICSTUFF_ACTIVITY_EVENT,this.onActivityReturn,this);
        super.removeEvent();
    }

	protected initData():void
	{
		super.initData();

		//引导
		this._guideID = Manager.model.getGuide().curID;
		if(this._guideID == GuideID.RELIC_PIECE || this._guideID == GuideID.RELIC_ACTIVE)
		{
			if(!this._actBtn || !this._actBtn.visible)
			{
				Manager.control.getTask().hideGuide();
				return;
			}
			let pos = this._actBtn.parent.localToGlobal(this._actBtn.x,this._actBtn.y);
			Manager.control.getTask().showGuide(pos, this._actBtn.width>>1, this._actBtn.height>>1, this.guideCB, this, false)
		}
	}

	//请求神器碎片激活
	private onSendActivityHandler(e:egret.TouchEvent):void
	{
		if(e != null && (this._guideID == GuideID.RELIC_PIECE || this._guideID == GuideID.RELIC_ACTIVE)) return;
		this._actBtn.enabled = false;
		if(this._data instanceof RelicStuffDebrisCVO)
		{
			let cvo:RelicStuffDebrisCVO = this._data;
			Manager.control.getRelicstuff().activity(cvo.des_id,RelicStuffType.DEBRIS_TYPE);
		}
	}
	private onActivityReturn():void
	{
		// this._sucAni=Manager.animation.createEffectAnimation("suc");
		// this._sucAni.x = Math.round((this.width - 512) / 2);
		// this._sucAni.y = this._diImg.y + 10;
		// this._sucAni.addEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.onShowBlastCompleteHandler, this);
		// this.addChild(this._sucAni);
		// this.touchEnabled = this.touchChildren = false;
		let sucAni:Animation = Manager.animation.createEffectAnimation("suc", 0, true, true);
		sucAni.x = Math.round((Manager.global.gameMain.stage.$stageWidth - 512) / 2);//Math.round((this.width - 512) / 2);
		sucAni.y = Math.round(Manager.global.gameMain.stage.$stageHeight / 2);//this._diImg.y + 10;
		Manager.layer.effectLayer.addChild(sucAni);
		this.onTouchCloseHandler(null);
	}
	// private onShowBlastCompleteHandler():void
	// {
	// 	if(this._sucAni) this._sucAni.removeEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.onShowBlastCompleteHandler, this);
	// 	this.clearAni();
	// 	this.onTouchCloseHandler(null);
	// }
	// private clearAni():void
	// {
	// 	if(this._sucAni)
	// 	{
	// 		Manager.pool.push(this._sucAni);
	// 		this._sucAni = null;
	// 	}
	// }
	protected onTouchCloseHandler(e:egret.TouchEvent):void
    {
        Manager.view.hide(ViewID.RelicStuffAttrView);
    }
	 protected drawAll():void
	{
		super.drawAll();
		this.drawData();
	}

	protected draw():void
	{
		super.draw();
        if(this.isInvalid(InvalidationType.DATA)) this.drawData();
	}

    public setData(data):void
    {
		this._data = data;
        this.invalidate(InvalidationType.DATA);
    }

    private drawData():void{

		if(this._data instanceof RelicStuffCVO)
		{
			this.drawCvo();
		}
		else if(this._data instanceof RelicStuffDebrisCVO)
		{
			this.drawDesCvo();
		}
    }
	/** 神器碎片详情 */
	private drawDesCvo():void
	{
		this._popupView.titleImg.source = "relicStuff_suipianshux_png";
		let _cvo:RelicStuffDebrisCVO = this._data;
		this._diImg.source = "common_itemBg_png";
		this._equipBit.load(Manager.path.getRelicStuffPath("fargment/fargment"+_cvo.des_id));
		this._equipBit.x = 318;
		this._equipBit.y = 406;
		let vo:AttrVO = _cvo.attrVO;
		this._fighting.setValue(vo.getFighting(), "nums_fighting2_", 20);
		let arr:AttrVoInfo[] = vo.attrInfos;
		for(let i:number = this._attList.length-1;i>-1;i--)
		{
			if(arr[i])
			{
				this._attList[i].text = arr[i].desc();
			}
			else
			{
				this._attList[i].text = "";
			}
		}
		let con:ConditionVO = _cvo.condVo;//new ConditionVO(_cvo.cond);
		let cvo:TaskCvoInfo=TaskCVO.getinfo(con.value);
		let vers:number = cvo.verse;
		this._versTxt.visible = true;
		if(_cvo.isActivity())
		{
			this._actBtn.visible = false;
			this._redIcon.visible = false;
			this._descGroup.visible = false;
			this._versTxt.text = StringUtils.setParam(LangCVO.getContent("relicstuff5"),vers);
			this._popupView.bgHeight = 430;
			this._versTxt.y = 705;
		}
		else
		{
			this._descGroup.visible = true;
			if(_cvo.checkisActivity())
			{
				this._actBtn.visible = true;
				this._redIcon.visible = true;
				this._versTxt.visible = false;
			}
			else
			{
				this._actBtn.visible = false;
				this._redIcon.visible = false;
				this._versTxt.text = StringUtils.setParam(LangCVO.getContent("relicstuff5"),vers);
				this._versTxt.y = 775;
			}
			let arr:RelicStuffDebrisCVO[] = RelicStuffDebrisCVO.cvos(_cvo.sqId);
			this.drawDesc(arr);
			this._popupView.bgHeight = 510;
		}
	}
	/** 神器详情 */
	private drawCvo():void
	{
		this._popupView.titleImg.source = "relicStuff_shenqishuxing_png";
		this._diImg.source = "relicStuff_huawen_png";
		this._actBtn.visible = false;
		let _cvo:RelicStuffCVO = this._data;
		this._equipBit.load(Manager.path.getRelicStuffPath("mainBody/mainBody"+_cvo.id));
		this._equipBit.x = 260;
		this._equipBit.y = 343;
		let arr:RelicStuffDebrisCVO[] = _cvo.getDebrisList();
		let any:any={};
		this._versTxt.visible = true;
		this._versTxt.text = LangCVO.getContent("relicstuff3");
		this._fighting.setValue(_cvo.getFightNum(), "nums_fighting2_", 20);
		for(let i:number = arr.length-1;i>-1;i--)
		{
			let desCvo:RelicStuffDebrisCVO = arr[i];
			let vos:AttrVoInfo[] = desCvo.attrVO.attrInfos;
			if(desCvo.isActivity())
			{
				for(let j:number = vos.length-1;j>-1;j--)
				{
					let vo:AttrVoInfo = vos[j];
					if(any[vo.id])
					{
						any[vo.id].num =any[vo.id].num + vo.num;
					}
					else
					{
						any[vo.id] = vo;
					}
				}
			}
			else
			{
				for(let j:number = vos.length-1;j>-1;j--)
				{
					let vo:AttrVoInfo = vos[j];
					if(!any[vo.id])
					{
						let creVo:AttrVoInfo = new AttrVoInfo;
						creVo.id = vo.id;
						creVo.num = 0;
						creVo.name = vo.name;
						creVo.format = vo.format;
						creVo.type = vo.type;
						any[vo.id] = creVo;
					}
				}
			}
		}
		let index:number = 0;
		for(let key in any)
		{
			let vo:AttrVoInfo = any[key];
			if(this._attList[index])
			{
				this._attList[index].text = vo.desc();
			}
			index++;
		}
		this._descGroup.visible = false;
		this._popupView.bgHeight = 430;
		this._versTxt.y = 705;
		
	}
	private drawDesc(arr:RelicStuffDebrisCVO[]):void
	{
		let ln:number = arr.length;
		let isact:number = 0;
		for(let i:number =0;i<ln;i++)
		{
			if(arr[i].isActivity())
			{
				isact ++;
			}
		}
		isact = ln - isact;
		this._desc1.text = StringUtils.setParam(LangCVO.getContent("relicstuff1"),isact);
	}

	private guideCB():void
	{
		this.onSendActivityHandler(null);
		if(this._guideID == GuideID.RELIC_PIECE) Manager.control.getTask().hideGuide();
		else
		{
			let reinPnl = Manager.view.getView(ViewID.ReinPanel) as ReinPanel;
			if(!reinPnl)
			{
				Manager.control.getTask().hideGuide();
				return;
			}
			let relicView = reinPnl.curView as RelicStuffView;
			if(!relicView)
			{
				Manager.control.getTask().hideGuide();
				return;
			}
			relicView.guideActPet();
		}
	}

	public show(data):void
    {
		//data = RelicStuffDebrisCVO.cvo(1);
		this._data = data;
        super.show();
    }

    public dispose():void
    {
		if(Manager.model.getGuide().curID == GuideID.RELIC_PIECE) Manager.control.getTask().hideGuide();
        super.dispose();
		// this.clearAni();
		ObjectUtil.removes(this._fightImg,this._redIcon,this._diImg,this._descGroup);
		ObjectUtil.disposes(this._actBtn,this._equipBit,this._desc1,this._desc2,this._versTxt)
		this._actBtn=null;
		this._equipBit=null;
		this._attrTxt0=null;
		this._attrTxt1=null;
		this._attrTxt2=null;
		this._attrTxt3=null;
		this._versTxt=null;
		this._desc1=null;
		this._desc2=null;
		this._descGroup=null;

		this._data=null;
		this._attList.forEach((txt,i)=>{
			txt.dispose();
		})
		this._attList=null;
		Manager.pool.push(this._fighting);
		this._fighting=null;
		this._fightImg=null;
		this._redIcon=null;
		this._diImg=null;
		this._guideID = -1;
    }
}