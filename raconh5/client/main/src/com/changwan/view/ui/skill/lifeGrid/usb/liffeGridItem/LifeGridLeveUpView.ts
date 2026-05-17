/**
 * pzx 
 * t升级
 */
class LifeGridLeveUpView extends UIComponent{
	private _closeImg:eui.Image;
	private _goods:BaseGoods;
	private _nameTxt:Label;
	private _attrTxt0:Label;
	private _attrTxt1:Label;
	private _attrTxt2:Label;
	private _attrTxt3:Label;
	private _attrTxt4:Label;
	private _leupGroup:eui.Group;
	private _fightImg:eui.Image;
	private _awoorImg1:eui.Image;
	private _awoorImg2:eui.Image;
	private _awoorImg3:eui.Image;
	private _changeBtn:Button;
	private _levUpBtn:Button;
	private _data:ItemsModelInfo;
	private _fighting:NumImgView2;
	private _maijiImg:eui.Image;
	private _resGroup:eui.Group;

	private _countTxt:Label;
	private _model:LifeGridModel;

	private _pos:number;
	private _shp:egret.Shape;
	/** 是否可替换 */
	private _showRedIcon:boolean= false;
	/** 可替换小红点 */
	private _redIcon:eui.Image;
	/**可升级小红点*/
	private _upLvRedIcon:eui.Image;
	/**  升级特效 */
	private _levAni:Animation;
// 打开升级界面，所有升级的小红点要消失直到命魂有更新
	public static isHied:boolean=true;

	public constructor()
    {
        super();
		this.touchChildren = true;
        this.visible = false;
		this.skinName = Manager.path.getSkinName("lifeGrid/lifegridview", "LifeGridLeveUpViewSkin");
    }
    protected configUI():void
    {
        super.configUI();
        this.onResizeHandler(null);
    }

    protected addEvent():void
    {
		 this._closeImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
         GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		 this._changeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onOpenLifeGridBagHandler,this);
		 this._levUpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.sendlvUpHandler,this);
		 this._model.addEventListener(LifeGridEvent.LIFEGRID_LVUP_EVENT,this.onReturnLvUpHandler,this);
        super.addEvent();
    }

    protected removeEvent():void
    {
		 this._closeImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
         GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		 this._changeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onOpenLifeGridBagHandler,this);
		 this._levUpBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.sendlvUpHandler,this);
		 this._model.removeEventListener(LifeGridEvent.LIFEGRID_LVUP_EVENT,this.onReturnLvUpHandler,this);
		 if(this._levAni) this._levAni.removeEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.onShowBlastCompleteHandler, this);
        super.removeEvent();
    }
	/** 升级成功返回 翻放特效 */
	private onReturnLvUpHandler(e:LifeGridEvent):void
	{
		if(this._levAni==null)
		{
			this._levAni = Manager.animation.createPanelLifeGridAnimation("lifeGridmgfj","lifeGridPanel");
			this._levAni.addEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.onShowBlastCompleteHandler, this);
			this.addChild(this._levAni);
			this._levAni.x = 212;
			this._levAni.y = 360;
		}
		else
		{
			this._levAni.visible = true;
			this._levAni.play();
		}
		this._levUpBtn.touchEnabled = false;
		this._changeBtn.touchEnabled = false;
	}
	/** 特效翻完 */
	private onShowBlastCompleteHandler():void
	{
		this._levUpBtn.touchEnabled = true;
		this._changeBtn.touchEnabled = true;
		this._data = Manager.model.getItems().lifeGridList[this._pos];
		this.darwData();
		this._levAni.visible = false;
	}
/** 发送请求升级 */
	private sendlvUpHandler(e:egret.TouchEvent):void
	{
		let lv:number = this._data.infoList[0].value;
		Manager.control.getLifeGrid().levelUp(lv+1,this._pos);
	}
	private onOpenLifeGridBagHandler(e:egret.TouchEvent):void
	{
		LifeGridLeveUpView.isHied = true;
		Manager.view.hide(ViewID.LifeGridLeveUpView);
		Manager.view.show(ViewID.LifeGridBagView,this._pos);
	}
	protected onTouchHandler(e:egret.TouchEvent):void
    {
		LifeGridLeveUpView.isHied = true;
        Manager.view.hide(ViewID.LifeGridLeveUpView);
    }
    private onResizeHandler(e:GlobalEvent):void
	{
		//this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
        if(!this.visible)
        this.visible = true;
	}
	protected drawAll():void
	{
		super.drawAll();
		this.darwData();
	}

	protected draw():void
	{
		super.draw();
        if(this.isInvalid(InvalidationType.DATA)) this.darwData();
	}

    public setData(data:ItemsModelInfo,pos:number,redShow:boolean=false):void
    {
        this._data = data;
		this._pos = pos;
		this._showRedIcon = redShow;
        this.invalidate(InvalidationType.DATA);
    }

	private darwData():void
	{
		this._redIcon.visible = this._showRedIcon;
		this._goods.baseId = this._data.base_id;
		let cvo:LifeGridCVO = LifeGridCVO.getDataInfo(this._data);
		let maxlv:number = LifeGridCVO.getMaxLeve(this._data.base_id);
		let lv:number = this._data.infoList[0].value;
		if(cvo.lev_loss!="")
		{
			let loss:GainLossVO = new GainLossVO(cvo.lev_loss);
			let countstr:string;
			this._upLvRedIcon.visible = loss.isEnough();
			if(loss.isEnough())
			{
				countstr = loss.selfCount+"/"+loss.num;
			}
			else
			{
				countstr =HtmlUtil.addColorTag("" + loss.selfCount,Color.RED_STR) +"/"+ loss.num;
			}
			HtmlUtil.setTextFlow(this._countTxt,countstr);
		}
		else
		{
			this._upLvRedIcon.visible = false;
		}

		let f1:number = 0;
		let f2:number = 0;

		let itemcvo:ItemsCVO = this._data.cvo;
		let str:string =HtmlUtil.addColorTag(itemcvo.name + "Lv."+ lv+StringUtils.setParam(LangCVO.getContent("lifeGrid12"),maxlv),itemcvo.colorStr);
		HtmlUtil.setTextFlow(this._nameTxt,str);
		let attvos:AttrVoInfo[] = cvo.attrVos();
		this._attrTxt0.text = attvos[0].desc();
		f1 = attvos[0].num;
		if(attvos[1])
		{
			f2 = attvos[1].num;
			this._attrTxt2.text = attvos[1].desc();
		}
		else{
			this._attrTxt2.text = "";
		}
		if(!this._fighting)
		{
			this._fighting = Manager.pool.create(NumImgView2);
			this._fighting.y = this._fightImg.y+6;
			this.addChild(this._fighting);
		}
		this._fighting.setValue(cvo.fightnum, "nums_fighting3_", 20);
		if(cvo.lev == maxlv)
		{
			this._awoorImg1.visible = false;
			this._awoorImg2.visible = false;
			this._awoorImg3.visible = false;
			this._levUpBtn.visible= false;
			this._leupGroup.visible = false;
			this._attrTxt3.visible = false;
			this._attrTxt4.visible = false;
			this._attrTxt1.visible = false;
			this._maijiImg.visible = true;
			this._resGroup.visible = false;

			this._attrTxt0.x = Math.round((720 - this._attrTxt0.width)/2);
			this._attrTxt2.x = Math.round((720 - this._attrTxt2.width)/2);
			this._attrTxt0.textAlign = "center";
			this._attrTxt2.textAlign = "center";
			this._changeBtn.x = Math.round((720 - this._changeBtn.width)/2);
			this._fightImg.x = Math.round((720 - 72-this._fighting.width)/2);
			this._fighting.x = this._fightImg.x + 72;
		}
		else
		{
			this._attrTxt0.textAlign = "life";
			this._attrTxt2.textAlign = "life";
			this._awoorImg1.visible = true;
			this._awoorImg2.visible = true;
			this._awoorImg3.visible = true;
			this._levUpBtn.visible= true;
			this._leupGroup.visible = true;
			this._attrTxt3.visible = true;
			this._attrTxt4.visible = true;
			this._attrTxt1.visible = true;
			this._maijiImg.visible = false;

			this._fightImg.x = this._attrTxt0.x = this._attrTxt2.x = 256;

			this._changeBtn.x = 140;
			let cvo2:LifeGridCVO = LifeGridCVO.getInfo(this._data.base_id,lv+1);
			attvos = cvo2.attrVos();
			let num:number = attvos[0].num - f1;
			let sing:string =num + "";
			if(attvos[0].format== 1) {
				sing =Number(num/1000 * 100).toFixed(1)+  "%";
			}
			this._attrTxt1.text =  sing;
			
			if(attvos[1])
			{
				num = attvos[1].num - f2;
				sing =num + "";
				if(attvos[1].format== 1) 
				{
					sing = Number(num/1000 * 100).toFixed(1)+  "%";
				}
				this._attrTxt3.text = sing;
			}
			else{
				this._attrTxt3.text = "";
				this._awoorImg2.visible = false;
			}
			this._attrTxt4.text = "" + (cvo2.fightnum-cvo.fightnum);

			this._fighting.x = this._fightImg.x + 72;
			let px:number = this._fighting.x + this._fighting.width + 20;
			if(px>430)
			{
				this._awoorImg3.x = this._awoorImg1.x = this._awoorImg2.x = px;
			}
			else
			{
				this._awoorImg3.x = this._awoorImg1.x = this._awoorImg2.x = 430;
			}
			this._attrTxt1.x = this._attrTxt3.x = this._attrTxt4.x = this._awoorImg3.x + 40;

		}
		this._redIcon.x = this._changeBtn.x + 181;

	}



    public show():void
    {
        Manager.layer.uiLayer.addChild(this);
		if(this._shp == null)
		{
			this._shp = Manager.pool.create(egret.Shape);
			this._shp.graphics.beginFill(0,0.1);
			this._shp.graphics.drawRect(0,0,720,1280);
			this._shp.graphics.endFill();
			this.addChildAt(this._shp,0);
		}
		this.touchEnabled = true;
		this._model = Manager.model.getLifeGrid();
		this._model.openLeveUpView = true;

		// 打开升级界面，所有升级的小红点要消失
		LifeGridLeveUpView.isHied = false;
		Manager.model.self.dispatchEvent(new GameObjectAttrEvent(GameObjectAttrEvent.SOUL));
		LifeGridContainer.instince.hideLossRedIcon();
    }

    public hide():void
    {
        this.dispose();
    }


    public dispose():void
    {
        super.dispose();
		ObjectUtil.disposes(this._nameTxt,this._attrTxt0,this._attrTxt1,this._attrTxt2,this._attrTxt3,this._attrTxt4,
		this._levUpBtn,this._changeBtn,this._countTxt,this._fighting)
		ObjectUtil.removes(this._upLvRedIcon,this._redIcon,this._closeImg,this._leupGroup,this._fightImg,this._awoorImg1,this._awoorImg2,this._awoorImg3,this._maijiImg,
		this._resGroup,this._shp);
		this._closeImg=null;
		Manager.pool.push(this._goods);
		this._goods=null;
		this._nameTxt=null;
		this._attrTxt0=null;
		this._attrTxt1=null;
		this._attrTxt2=null;
		this._attrTxt3=null;
		this._attrTxt4=null;
		this._leupGroup=null;
		this._fightImg=null;
		this._awoorImg1=null;
		this._awoorImg2=null;
		this._awoorImg3=null;
		this._changeBtn=null;
		this._levUpBtn=null;
		this._data=null;
		Manager.pool.push(this._fighting);
		this._fighting=null;
		this._maijiImg=null;
		this._resGroup=null;

		this._countTxt=null;
		this._model=null;
		this._shp.graphics.clear();
		this._shp = null;
		this._redIcon = null;
		this._upLvRedIcon = null
		if(this._levAni)
		{
			this.removeChild(this._levAni);
			Manager.pool.push(this._levAni);
			this._levAni = null;
		}
    }
}