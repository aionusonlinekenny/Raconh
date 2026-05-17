/**
 * 凌烟阁页签视图
 * liangyan
 * create 2018-04-09
*/
class ArtifactView extends UIComponent
{
	private _item0:BaseGoods;
	private _item1:BaseGoods;
	private _item2:BaseGoods;
	private _item3:BaseGoods;
	private _item4:BaseGoods;
	private _item5:BaseGoods;
	private _item6:BaseGoods;
	private _item7:BaseGoods;
	private _item8:BaseGoods;
	private _item9:BaseGoods;
	/**宝箱img */
	private _historyBoxImg:eui.Image;
	/** 寻宝1 次 */
	private _huntingOneBtn:Button;
	/** 寻宝10 次 */
	private _huntingTenBtn:Button;
	/** 元宝1 */
	private _gold1Icon:eui.Image;
	private _goldTxt:Label;

	private _gold10Txt:Label;

	private _descTxt:Label;
	private _takeTxt:Label;

	private _strip2:StripView2;

	private _model:ArtifactModel;

	private _artItem:ArtifactItem;
    /**首次增送img */
	private _zengsongImg:eui.Image;
	private _nameTxt:Label;

	private _group:eui.Group;
	private _group1:egret.DisplayObjectContainer;

	private _redIcon:eui.Image;

	private _redBoxIcon:eui.Image;

	public constructor() 
	{
		super();
		this.skinName = Manager.path.getSkinName("artifact", "ArtifactViewSkin");
		this.touchChildren = true;
	}

	protected configUI():void
	{
		super.configUI();
		this._model = Manager.model.getArtifact();
		Manager.control.getArtifact().query();

		HtmlUtil.setTextFlow(this._takeTxt,LangCVO.getContent("artifact2"));
		this._descTxt.lineSpacing = 10;
		this._descTxt.text = LangCVO.getContent("artifact1");

		this._group1 = ObjectUtil.createConainer(false,false);
		this._group1.x = 158;
		this._group1.y = 930;
		this.addChild(this._group1);
		if(!this._strip2)
        {
            // this._strip = Manager.pool.create(StripView, null, "strip_back2_png", "strip_blue2_png", 403, 53, 364, 32, 19, 10, true);
			this._strip2 = StripView2.create(this._group1,this._group1,"strip_back2_png", "strip_blue2_png", 403, 53, 364, 32, 19, 10,true,true,24);
			// this._strip2.move(158,930);
            // this._strip.x = 158;
            // this._strip.y = 930;
            // this._strip.label.size = 24;
            // this._strip.isBackFront = true;
            // this.addChild(this._strip);
			// this.swapChildren(this._strip,this._group);
			this.swapChildren(this._group1,this._group);
        }
		
		let arr:Array<ArtifactCVO> = ArtifactCVO.getCvos();
		for(let i:number = arr.length-1;i>-1;i--)
		{
			let cvo:ArtifactCVO = arr[i];
			let loss:GainLossVO = new GainLossVO(cvo.item);
			let item:BaseGoods = this["_item"+i];
			if(item) item.setGainLossVO(loss);
		}
		this._item0.setBgHied(false);
		this._item1.setBgHied(false);
		this.starTween();
	}
	private starTween():void
	{
		egret.Tween.get(this._group,{loop:false}).to({y:800},600).call(this.star2Tween,this);
	}
	private star2Tween():void
	{
		egret.Tween.get(this._group,{loop:false}).to({y:823},600).call(this.starTween,this);
	}
	protected initData():void
    {
        super.initData();
		this.drawData();
		
		//引导
		if(Manager.model.getGuide().curID == GuideID.ARTIFACT)
		{
			let pos:egret.Point = this._huntingOneBtn.parent.localToGlobal(this._huntingOneBtn.x,this._huntingOneBtn.y);
			Manager.control.getTask().showGuide(pos, this._huntingOneBtn.width>>1, this._huntingOneBtn.height>>1,
												this.guideCB, this, false);
		}
    }
	protected addEvent():void
	{
		super.addEvent();
		this._historyBoxImg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouceHandler,this);
		this._takeTxt.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouceHandler,this);
		this._model.addEventListener(ArtifactEvent.ARTIFACT_QUERY_EVENT,this.drawData,this);
		this._model.addEventListener(ArtifactEvent.ARTIFACT_INTEGRAL_EVENT,this.drawData,this);
		this._model.addEventListener(ArtifactEvent.ARTIFACT_REWARD_EVENT,this.drawStrip,this);
		this._huntingOneBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouceHandler,this)
		this._huntingTenBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouceHandler,this)
	}
	protected removeEvent():void
	{
		this._historyBoxImg.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouceHandler,this);
		this._takeTxt.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouceHandler,this);
		this._model.removeEventListener(ArtifactEvent.ARTIFACT_QUERY_EVENT,this.drawData,this);
		this._model.removeEventListener(ArtifactEvent.ARTIFACT_INTEGRAL_EVENT,this.drawData,this);
		this._model.removeEventListener(ArtifactEvent.ARTIFACT_REWARD_EVENT,this.drawStrip,this);
		this._huntingOneBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouceHandler,this)
		this._huntingTenBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouceHandler,this)
		super.removeEvent();
	}
	private onTouceHandler(e:egret.TouchEvent):void
	{
		let target = e.target;
		if(target == this._historyBoxImg)
		{
			
			Manager.view.show(ViewID.ArtifactRewardView);
			return;
		}
		if(target == this._takeTxt)
		{
			//寻宝记录
			Manager.view.show(ViewID.ArtifactInfoListView);
			return;
		}
		if(target == this._huntingOneBtn)
		{
			this.clickHuntOne(e);
			return;
		}
		if(target == this._huntingTenBtn)
		{
			Manager.control.getArtifact().hunting(ArtifactType.SENDS_TEN_TYPE);
			return;
		}

	}

	private clickHuntOne(e:egret.TouchEvent):void
	{
		if(e != null && Manager.model.getGuide().curID == GuideID.ARTIFACT) return;
		Manager.control.getArtifact().hunting(ArtifactType.SENDS_ONE_TYPE);
		// let cvo:ArtifactLossCVO = ArtifactLossCVO.getCvo(ArtifactType.SENDS_ITEM_TYPE);
		// let loss:GainLossVO = new GainLossVO(cvo.loss);
		// let color:string=Color.DEF_STR;
		// if(loss.isEnough())
		// {
		// 	Manager.control.getArtifact().hunting(ArtifactType.SENDS_ITEM_TYPE);
		// }
		// else
		// {
		// 	Manager.control.getArtifact().hunting(ArtifactType.SENDS_ONE_TYPE);
		// }
	}

	private hidePnl():void
	{
		Manager.view.hide(ViewID.ArtifactPanel);
	}

	private drawData():void
	{
		this.drawStrip();
		this._artItem.setData(this._model.getItemList());
	}
	/**进度条 */
    private drawStrip():void
    {
		let integ:number = this._model.getIntegral();
		let cvo:ArtifactIntegralCVO = ArtifactIntegralCVO.getCurIntegralCvo();
		this._strip2.update(integ, cvo.args);
		this.drawLoss();
		if(cvo.isReward()==1)
		{
			this._redBoxIcon.visible = false;
		}
		else
		{
			this._redBoxIcon.visible = integ >= cvo.args;
		}
    }
	private drawLoss():void
	{
		let cvo:ArtifactLossCVO = ArtifactLossCVO.getCvo(ArtifactType.SENDS_ITEM_TYPE);
		let loss:GainLossVO = new GainLossVO(cvo.loss);
		let str:string;
		//let color:string=Color.DEF_STR;
		if(loss.isEnough())
		{
			this._gold1Icon.source = "artifact_yupei_png";
			this._redIcon.visible = true;
			str = loss.selfCount+"/"+loss.num;
		}
		else
		{
			cvo = ArtifactLossCVO.getCvo(ArtifactType.SENDS_ONE_TYPE);
			loss = new GainLossVO(cvo.loss); 
			this._gold1Icon.source = "playRes_gold_54_png";
			this._redIcon.visible = false;
			str = "" + loss.num;
			// if(!loss.isEnough())
			// {
			// 	color = Color.RED_STR;
			// }
		}
		this._goldTxt.text = str;
		
		// HtmlUtil.setTextFlow(this._goldTxt,str);

		cvo = ArtifactLossCVO.getCvo(ArtifactType.SENDS_TEN_TYPE);
		loss = new GainLossVO(cvo.loss); 
		this._gold10Txt.text = "" + loss.num;
		// str = HtmlUtil.addColorTag(loss.selfCount+"/"+loss.num,color);
		// HtmlUtil.setTextFlow(this._gold10Txt,str);


		let tegralCvo:ArtifactIntegralCVO = ArtifactIntegralCVO.getIsFristCvo();
		if(tegralCvo)
		{
			loss = new GainLossVO(tegralCvo.rewards);
			this._item9.setGainLossVO(loss);
			if(tegralCvo.args >= ArtifactType.FIRST_TYPE_FIRE)
			{
				//50为不是首次额外奖励
				this._zengsongImg.source = "artifact_zengsong50_png";
			}
			HtmlUtil.setTextFlow(this._nameTxt,this._item9.getName(true));
		}
		else
		{
			this._group.visible = false;
			egret.Tween.removeTweens(this._group);
		}

	}

	private guideCB():void
	{
		let cvo:ArtifactLossCVO = ArtifactLossCVO.getCvo(ArtifactType.SENDS_ONE_TYPE);
		let loss:GainLossVO = new GainLossVO(cvo.loss);
		let isEnough = loss.isEnough();
		if(!isEnough)
		{
			cvo = ArtifactLossCVO.getCvo(ArtifactType.SENDS_ITEM_TYPE);
			loss = new GainLossVO(cvo.loss);
			isEnough = loss.isEnough();
		}
		this.clickHuntOne(null);
		Manager.control.getTask().hideGuide();
		if(isEnough) Manager.render.add(this.hidePnl, this, 2000, 1, null, true);
	}

	public dispose()
	{
		if(Manager.model.getGuide().curID == GuideID.ARTIFACT) Manager.control.getTask().hideGuide();
		if(Manager.render.contains(this.hidePnl, this)) Manager.render.remove(this.hidePnl, this);
		super.dispose();
		egret.Tween.removeTweens(this._group);
		this._strip2.dispose();
		this._strip2 = null;
		// Manager.pool.push(this._strip);
		// this._strip=null;
		this._group1.parent.removeChild(this._group1);
		this._group1 = null;
		
		ObjectUtil.disposes(this._item9,this._item8,this._item7,this._item6,this._item5,this._item4,this._item3,this._item2,this._item0,this._item1,this._huntingOneBtn,this._huntingTenBtn,this._goldTxt,this._gold10Txt,this._descTxt,this._takeTxt,this._artItem,this._nameTxt);
		ObjectUtil.removes(this._historyBoxImg,this._gold1Icon,this._zengsongImg,this._group,this._redIcon,this._redBoxIcon);
		this._item0=null;
		this._item1=null;
		this._item2=null;
		this._item3=null;
		this._item4=null;
		this._item5=null;
		this._item6=null;
		this._item7=null;
		this._item8=null;
		this._item9=null;
		this._historyBoxImg=null;
		this._huntingOneBtn=null;
		this._huntingTenBtn=null;
		this._gold1Icon=null;
		this._goldTxt=null;
		this._gold10Txt=null;
		this._descTxt=null;
		this._takeTxt=null;
		this._model=null;
		this._artItem=null;
		this._zengsongImg=null;
		this._nameTxt=null;
		this._group=null;
		this._redIcon = null;
		this._redBoxIcon=null;
	}
}