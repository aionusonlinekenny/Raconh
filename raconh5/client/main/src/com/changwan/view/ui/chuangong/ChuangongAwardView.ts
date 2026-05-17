/**
 * 传功提示
 */
class ChuangongAwardView extends Sprite
{
	private _baseView:BasePopUpView;
	private _titleBg:BitmapRes;
	private _txt:TextField;
	private _tips:TextField;
	private _goldImg:BitmapRes;
	private _goldTxt:TextField;
	private _goldValue:TextField;
	private _okBtn:Button;
	private _okImg:BitmapRes;
	private _cancelBtn:Button;
	private _cancelImg:BitmapRes;
	private _item1:ChuangongAwardItem;
	private _item2:ChuangongAwardItem;
	private _item3:ChuangongAwardItem;

	private _type:number;
	private _info:TrainingCVO;
	private _expInfo:TrainingExpCVO;

	public constructor()
	{
		super();
		this.touchChildren = true;
		this.start();
		this.addEvent();
	}

	protected start():void
    {
        super.start();
		this.width = 720;
		this.height = 1280;
		
		this._baseView = Manager.pool.create(BasePopUpView);
		this._baseView.titleImg.source = "cg_title_png";
		this.addChild(this._baseView);

		this._titleBg = BitmapRes.create("common_title_wordBg_png", 256, 385, 209, 36);
		this.addChild(this._titleBg);

		this._goldImg = BitmapRes.create("playRes_gold_54_png", 342, 592, 54, 54);
		this.addChild(this._goldImg);

		this._txt = TextField.create(104, 26);
		this._txt.move(308, 390);
		this._txt.textColor = Color.DEF;
        this._txt.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._txt.textAlign = egret.HorizontalAlign.LEFT;
        this._txt.fontFamily = "Microsoft YaHei";
        this._txt.size = 26;
		this._txt.text = LangCVO.getContent("training11");
		this.addChild(this._txt);

		this._tips = TextField.create(423, 24);
		this._tips.move(149, 606);
		this._tips.textColor = Color.GREEN;
        this._tips.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._tips.textAlign = egret.HorizontalAlign.LEFT;
        this._tips.fontFamily = "Microsoft YaHei";
        this._tips.size = 24;
		this._tips.text = LangCVO.getContent("training12");

		this._goldTxt = TextField.create(72, 24);
		this._goldTxt.move(279, 605);
		this._goldTxt.textColor = Color.DEF;
        this._goldTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._goldTxt.textAlign = egret.HorizontalAlign.LEFT;
        this._goldTxt.fontFamily = "Microsoft YaHei";
        this._goldTxt.size = 24;
		this._goldTxt.text = LangCVO.getContent("training13");
		this.addChild(this._goldTxt);

		this._goldValue = TextField.create(43, 24);
		this._goldValue.move(394, 605);
		this._goldValue.textColor = Color.DEF;
        this._goldValue.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._goldValue.textAlign = egret.HorizontalAlign.LEFT;
        this._goldValue.fontFamily = "Microsoft YaHei";
        this._goldValue.size = 24;
		this._goldValue.text = "100";
		this.addChild(this._goldValue);

		this._okBtn = new Button();
		this._okBtn.skinName = "Button2Skin";
		this._okBtn.x = 383;
		this._okBtn.y = 673;
		this.addChild(this._okBtn);
		this._okImg = BitmapRes.create("confirm_png", 412, 700, 181, 52);
		this.addChild(this._okImg);

		this._cancelBtn = new Button();
		this._cancelBtn.skinName = "Button1Skin";
		this._cancelBtn.x = 99;
		this._cancelBtn.y = 673;
		this.addChild(this._cancelBtn);
		this._cancelImg = BitmapRes.create("common_label_quxiao_png", 127, 700, 181, 52);
		this.addChild(this._cancelImg);

		this._item1 = new ChuangongAwardItem();
		this._item1.x = 290;
		this._item1.y = 431;
		this._item2 = new ChuangongAwardItem();
		this._item2.x = 230;
		this._item2.y = 431;
		this._item3 = new ChuangongAwardItem();
		this._item3.x = 350;
		this._item3.y = 431;

		this.onResizeHandler();
	}

	protected addEvent():void
	{
		super.addEvent();
		GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._baseView.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
	}

	protected removeEvent():void
	{
		GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._baseView.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._cancelBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
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
			case this._okBtn:
				if(Manager.model.getTraining().info.isPlayed)
				{
					FloatTips.addTips(LangCVO.getContent("training8"), Color.RED);
					return;
				}
				if(this._type == 3)
				{
					let info:TrainingCVO = TrainingCVO.getInfo(this._type);
					if(info)
					{
						if(Manager.model.self.attrInfo.gold < info.loss.num)
						{
							FloatTips.addTips(LangCVO.getContent("common33"), Color.RED);
							return;
						}
					}
				}
				Manager.control.getTraining().traingPrepare(this._type);
				break;
		}
		Manager.view.hide(ViewID.ChuangongAwardView);
	}

	public show(type:number):void
	{
		this._type = type;
		this.updateInfo();
		
		Manager.layer.tipImageLayer.addChild(this);
	}

	private addObject(...value:any[]):void
	{
		for(let i of value)
			if(value && !i.parent) this.addChild(i);
	}

	private removeObject(...value:any[]):void
	{
		for(let i of value)
			if(value && i.parent) i.parent.removeChild(i);
	}

	private updateInfo():void
	{
		this._info = TrainingCVO.getInfo(this._type);
		this._expInfo = TrainingCVO.getExpInfo(Manager.model.self.attrInfo.level);
		if(!this._info || !this._expInfo) return;

		if(this._type == 1 || this._type == 2)
		{
			this.addObject(this._item1, this._tips);
			this.removeObject(this._goldImg, this._goldTxt, this._goldValue, this._item2, this._item3);

			this._item1.item.baseId = ItemsConst.EXP;
			this._item1.item.count = 1;
			this._item1.count.text = StringUtils.getBigNum(this._expInfo.exp * this._info.expRatio / 1000 * TrainingModel.TRAINING_TIME);

			if(this._type == 1)
			{
				this._item1.recommendImg.visible = false;
				this._item1.bei.visible = false;
			}
			else
			{
				this._item1.recommendImg.visible = true;
				this._item1.bei.visible = true;
				this._item1.bei.text = LangCVO.getContent("training2", String(this._info.expRatio / 1000));
			}
		}
		else
		{
			this.removeObject(this._item1, this._tips);
			this.addObject(this._goldImg, this._goldTxt, this._goldValue, this._item2, this._item3);

			this._item2.item.baseId = ItemsConst.EXP;
			this._item2.item.count = 1;
			this._item2.count.text = StringUtils.getBigNum(this._expInfo.exp * this._info.expRatio / 1000 * TrainingModel.TRAINING_TIME);
			this._item2.bei.text = LangCVO.getContent("training2", String(this._info.expRatio / 1000));

			this._item3.item.baseId = this._info.item.baseId;
			this._item3.item.bind = this._info.item.bind;
			this._item3.item.count = 1;
			this._item3.count.text = this._info.item.num + "";
			this._item3.bei.text = LangCVO.getContent("training3");
		}
	}

	public hide():void
	{
		this.dispose();
	}

	public dispose():void
	{
		super.dispose();
		ObjectUtil.removes(this._baseView, this._titleBg, this._txt, this._tips, this._goldImg, this._goldTxt, this._goldValue,
			this._okBtn, this._cancelBtn, this._okImg, this._cancelImg, this._item1, this._item2, this._item3
		);
		if(this._baseView)
			this._baseView.dispose();
		this._baseView = null;
		if(this._titleBg)
			Manager.pool.push(this._titleBg);
		this._titleBg = null;
		if(this._txt)
			Manager.pool.push(this._txt);
		this._txt = null;
		if(this._tips)
			Manager.pool.push(this._tips);
		this._tips = null;
		if(this._goldImg)
			Manager.pool.push(this._goldImg);
		this._goldImg = null;
		if(this._goldTxt)
			Manager.pool.push(this._goldTxt);
		this._goldTxt = null;
		if(this._goldValue)
			Manager.pool.push(this._goldValue);
		this._goldValue = null;
		if(this._okBtn)
			this._okBtn.dispose();
		this._okBtn = null;
		if(this._cancelBtn)
			this._cancelBtn.dispose();
		this._cancelBtn = null;
		if(this._okImg)
			Manager.pool.push(this._okImg);
		this._okImg = null;
		if(this._cancelImg)
			Manager.pool.push(this._cancelImg);
		this._cancelImg = null;
		if(this._item1)
			this._item1.dispose();
		this._item1 = null;
		if(this._item2)
			this._item2.dispose();
		this._item2 = null;
		if(this._item3)
			this._item3.dispose();
		this._item3 = null;
		this._info = null;
		this._expInfo = null;
	}
}