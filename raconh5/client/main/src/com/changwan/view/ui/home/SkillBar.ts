class SkillBar extends BaseRender
{
    private _imageContainer:egret.DisplayObjectContainer;
    private _conainer1:egret.DisplayObjectContainer;

    private _back:BitmapRes;
    private _roleBtn:BitmapRes;
	private _skillBtn:BitmapRes;
	private _equipBtn:BitmapRes;
	private _bagBtn:BitmapRes;
	private _expImg:BitmapRes;
	private _reinHot:eui.Group;
	private _zhongmenHot:eui.Group;

    private _juexing:Animation;
    private _zhongmen:Animation;
    private _reinSuoImg:BitmapRes;
    private _expValue:TextField;

    private _curExp:number;

    private _redIcons;

    private static HP_MAX_WIDTH:number = 455;



    public constructor(imageContainer:egret.DisplayObjectContainer,container1:egret.DisplayObjectContainer)
    {   
        super();
        this._contentWidth = 720;
        this._contentHeight = 258;
        this._imageContainer = ObjectUtil.createConainer();
        imageContainer.addChild(this._imageContainer);
        this._conainer1 = ObjectUtil.createConainer();
        container1.addChild(this._conainer1);
        this._redIcons = {};
        this.start();
        this.addEvent();
    }
    protected start():void
    {
        this._back = BitmapRes.create("main_bottom_png",1,99,720,159);
        this._back.scale9Grid = new egret.Rectangle(149,0,88,159);
        this._imageContainer.addChild(this._back);

        let back:BitmapRes = BitmapRes.create("main_xing_png",22,203);
        this._imageContainer.addChild(back);
        back = BitmapRes.create("main_club_png",612,203);
        this._imageContainer.addChild(back);

        this._roleBtn = BitmapRes.create("main_icon_role_png",143,122);
        this._roleBtn.touchEnabled = true;
        this._imageContainer.addChild(this._roleBtn);
        this._skillBtn = BitmapRes.create("main_icon_skill_png",253,136);
        this._skillBtn.touchEnabled = true;
        this._imageContainer.addChild(this._skillBtn);
        this._equipBtn = BitmapRes.create("main_icon_forging_png",366,127);
        this._equipBtn.touchEnabled = true;
        this._imageContainer.addChild(this._equipBtn);
        this._bagBtn = BitmapRes.create("main_icon_bag_png",478,128);
        this._bagBtn.touchEnabled = true;
        this._imageContainer.addChild(this._bagBtn);

        this._expImg = BitmapRes.create("main_exp_png",135,238,455,14,this.__expLoadComplete,this);
        this._expImg.scale9Grid = new egret.Rectangle(15,0,448,14);
        this._imageContainer.addChild(this._expImg);
        back = BitmapRes.create("main_exp_fenge_png",226,236,5,19);
        this._imageContainer.addChild(back);
        back = BitmapRes.create("main_exp_fenge_png",362,236,5,19);
        this._imageContainer.addChild(back);
        back = BitmapRes.create("main_exp_fenge_png",498,236,5,19);
        this._imageContainer.addChild(back);

		this._reinHot = new eui.Group();
        this._reinHot.width = 100;
        this._reinHot.height = 100;
        this._reinHot.x = 26;
        this._reinHot.y = 126;
        this._conainer1.addChild(this._reinHot);
		this._zhongmenHot = new eui.Group();
        this._zhongmenHot.width = 100;
        this._zhongmenHot.height = 100;
        this._zhongmenHot.x = 600;
        this._zhongmenHot.y = 126;
        this._conainer1.addChild(this._zhongmenHot);

        this._zhongmen = Manager.animation.createEffectAnimation("zhongmen");
        this._zhongmen.move(490,10);
        this._conainer1.addChild(this._zhongmen);

        this._expValue = TextField.create(180,20,0xffffff,18,egret.HorizontalAlign.CENTER,egret.VerticalAlign.MIDDLE);
        this._expValue.move(295,237);
		this._expValue.stroke = 2;
		this._expValue.strokeColor = 0;
        this._conainer1.addChild(this._expValue);

        super.start();
    }

    protected addEvent():void
    {
        super.addEvent();
        this._roleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._skillBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._equipBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._bagBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._reinHot.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._zhongmenHot.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.EXP, this.onExpUpdateHandler, this);
    }

    public switchLock(lock:boolean):void
    {
        if(lock)
        {
            if(this._reinSuoImg == null)
            {
                this._reinSuoImg = BitmapRes.create("main_suo_png",31,122);
                this._imageContainer.addChild(this._reinSuoImg);
            }
        }
        else
        {
            if(!this._juexing)
            {
                this._juexing = Manager.animation.createEffectAnimation("juexing");
                this._juexing.x = -70;
                this._juexing.y = 34;
                this._conainer1.addChild(this._juexing);
            }
            if(this._reinSuoImg)
            {
                Manager.pool.push(this._reinSuoImg);
                this._reinSuoImg = null;
            }
        }
    }

    public layout(gameWidth:number,gameHeight:number):void
    {
        this._conainer1.y = gameHeight - this._contentHeight;
        this._imageContainer.y = this._conainer1.y;
        this._conainer1.x = (gameWidth - this._contentWidth) >> 1;
        this._imageContainer.x = this._conainer1.x;
    }

    private onClickHandler(e:egret.TouchEvent):void
	{
		let cvo:DailyActivityCVO;
		switch(e.currentTarget)
		{
			case this._roleBtn:
				cvo = DailyActivityCVO.getCVO(ActIconID.ROLE);
				if(cvo && !cvo.isAllCondSatisfy(true)) return;
				if(Manager.model.getRole().checkCanOperate()) Manager.view.show(ViewID.RolePanel, RoleIndex.ROLE);
				else if(Manager.model.getPet().checkCanOperate) Manager.view.show(ViewID.RolePanel, RoleIndex.PET);
				else if(Manager.model.getDress().checkCanOperate()) Manager.view.show(ViewID.RolePanel, RoleIndex.DRESS);
				else Manager.view.show(ViewID.RolePanel);
				break;
			case this._skillBtn:
				cvo = DailyActivityCVO.getCVO(ActIconID.SKILL);
				if(cvo && !cvo.isAllCondSatisfy(true)) return;
				if(Manager.model.getSkill().checkTipsShow())
					Manager.view.show(ViewID.SkillPanel, 0);
				else if(Manager.model.getLifeGrid().checkSeparate() || Manager.model.getItems().checkLifeGridBagAmple() || Manager.model.getLifeGrid().isUpgrade() ||Manager.model.getLifeGrid().getIsAware() || Manager.model.getLifeGrid().getIsSenior() || Manager.model.getLifeGrid().isFree())
					Manager.view.show(ViewID.SkillPanel, 1);
				else
					Manager.view.show(ViewID.SkillPanel);
				break;
			case this._equipBtn:
				cvo = DailyActivityCVO.getCVO(ActIconID.EQUIP);
				if(cvo && !cvo.isAllCondSatisfy(true)) return;
				if(Manager.model.getEquip().initLocal != -1)
                	Manager.view.show(ViewID.EquipPanel, Manager.model.getEquip().initLocal);
				else
				{
					if(OpenCVO.isOpen(OpenConst.ID_STRENGTHEN, true))
						Manager.view.show(ViewID.EquipPanel);
				}
				break;
			case this._bagBtn:
				cvo = DailyActivityCVO.getCVO(ActIconID.BAG);
				if(cvo && !cvo.isAllCondSatisfy(true)) return;
				if(Manager.model.getEquip().checkCanRonglian())
					Manager.view.show(ViewID.BagPanel, 2);
				else
					Manager.view.show(ViewID.BagPanel);
				break;
			case this._reinHot:
				if(!OpenCVO.isOpen(OpenConst.ID_RELICSTUFF, true)) return;
				let arr:RelicStuffCVO[] = RelicStuffCVO.cvos();
				let tap:number = 1;
				for(let cvo of arr)
				{
					if(!cvo.isActivity())
					{
						tap = 0;
						break ;
					}
				}
				Manager.view.show(ViewID.ReinPanel,tap);
				break;
			case this._zhongmenHot:
				if(!OpenCVO.isOpen(OpenConst.ID_CLUB_CENTER, true)) return;
				Manager.view.show(ViewID.ClubPanel);
				break;
		}
	}

	public getGuidPos(point:number):egret.Point
	{
		switch(point)
		{
			case HomeView2.ROLE_POS:
				return this._roleBtn.parent.localToGlobal(this._roleBtn.x,this._roleBtn.y);
			case HomeView2.SKILL_POS:
				return this._skillBtn.parent.localToGlobal(this._skillBtn.x,this._skillBtn.y);
			case HomeView2.EQUIP_POS:
				return this._equipBtn.parent.localToGlobal(this._equipBtn.x,this._equipBtn.y);
			case HomeView2.BAG_POS:
				return this._bagBtn.parent.localToGlobal(this._bagBtn.x,this._bagBtn.y);
            case HomeView2.ZHONGMEN_POS:
				return this._zhongmenHot.parent.localToGlobal(this._zhongmenHot.x,this._zhongmenHot.y);
			default:
				return null;
		}
	}

	private drawExp():void
	{
		let dis:number = Manager.model.self.attrInfo.exp - this._curExp;
		if(dis > 0)
		{
			if(Manager.model.getCopy().curID == CopyConst.ID_EXP)
				Manager.pool.create(SCTView, SCTConst.TYPE_EXP, dis, Manager.model.self.getSctPos());
			else if(Manager.model.getTraining().info.status == DailyActivityCVO.STATE_IN)
			{
				let self:SelfGameObjectInfo = Manager.model.self;
				if(Math.sqrt(Math.pow((self.x - TrainingCVO.regionInfo.trainingPoint.x),2) + Math.pow((self.y - TrainingCVO.regionInfo.trainingPoint.y),2)) <= TrainingCVO.regionInfo.trainingRadius)
					Manager.pool.create(SCTView, SCTConst.TYPE_EXP, dis, Manager.model.self.getSctPos());
			}
		}
		
		this._curExp = Manager.model.self.attrInfo.exp;
		this._expValue.text = this._curExp + "/" + Manager.model.self.attrInfo.expMax;
		this._expImg.width = Math.round(this._curExp * SkillBar.HP_MAX_WIDTH / Manager.model.self.attrInfo.expMax);
	}

    private __expLoadComplete():void
    {
        this.drawExp();
    }

    protected drawAll():void
    {
        super.drawAll();
    }

	protected draw():void
	{
		super.draw();
		if(this.isInvalid("drawExp"))this.drawExp();
	}

	private onExpUpdateHandler(e?:GameObjectAttrEvent):void
	{
		this.invalidate("drawExp");
	}

	public showRedIcon(id:number, isShow:boolean):void
	{
		if(isShow)
		{
            if(this._redIcons[id] == null)
            {
                this._redIcons[id] = this.createRedIcon(id);
                this._imageContainer.addChild(this._redIcons[id]);
            }
		}
		else
		{
			if(this._redIcons[id])
			{
				Manager.pool.push(this._redIcons[id]);
				this._redIcons[id] = null;
				delete this._redIcons[id];
			}
		}
	}

	private createRedIcon(id):BitmapRes
	{
		switch(id)
		{
			case ActIconID.REIN:
				return BitmapRes.create("main_red_icon_png",104,107);
			case ActIconID.CLUB:
				return BitmapRes.create("main_red_icon_png",683, 107);
			case ActIconID.ROLE:
				return BitmapRes.create("main_red_icon_png",213, 143);
			case ActIconID.SKILL:
				return BitmapRes.create("main_red_icon_png",323, 143);
			case ActIconID.EQUIP:
				return BitmapRes.create("main_red_icon_png",433, 143);
			case ActIconID.BAG:
				return BitmapRes.create("main_red_icon_png",543, 143);
		}
	}
}