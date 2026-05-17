/**
 * 盟会战内信息小界面
 * luzh 
 * 2018.1.29
 */
class ClubBFMiniView extends UIComponent implements IViewManager
{
    private _txtName:Label;
    private _txtScore:Label;
    private _txtRank:Label;
    private _txtNum:Label;
    private _bar:ProgressBar;
    private _back:eui.Image;
    private _title:Label;
    private _btnAuto:Button;
    private _imgSelected:eui.Image;
    private _redIcon:eui.Image;

	private _btnClubBuff:eui.Image;
	private _btnAttachProps:eui.Image;
	private _btnGet:eui.Image;
	private _btnClubScore:eui.Image;
    private _txtClubBuff:Label;
    private _txtGet:Label;
    private _txtClubScore:Label;

    private _aniBtnChallenge:Animation;
    private _imgGoto:eui.Image;

    private _model:ClubBFModel;
    private _friendClubID:number;
    private _rewardCVOs:Array<ClubBFScoreRewardsCVO>;
    private _miniData:Object;

	public constructor()
	{
		super();
		this.skinName = Manager.path.getSkinName("clubBF", "ClubBFMiniSkin");
        this.touchChildren = true;
	}

    public show():void
    {
        if(this.parent == null)
        {
            Manager.layer.uiLayer.addChildAt(this, 0);
        }
    }

    public hide():void
    {
        this.dispose();
    }
    
    protected configUI():void
    {
        super.configUI();
        this._model = Manager.model.getClubBF();
        
        this._bar.labelFunction = (value: number, maximum: number) => {return Math.ceil(value/maximum*10000)/100 + "%";};

        if(this._model.isSelfDef)
        {
            this._back.source = "clubBF_blue_back_png";
            this._title.text = LangCVO.getContent("clubBF28");//防守
            this._btnClubScore.visible = this._txtClubScore.visible = false;
        }
        else 
        {
            this._back.source = "task_guang_png";
            this._title.text = LangCVO.getContent("clubBF29");//进攻
            this._btnClubScore.visible = this._txtClubScore.visible = true;
            this._friendClubID = 6 - this._model.defClubType - Manager.model.self.attrInfo.guildType;
        }
        this._txtName.text = MonsterCVO.getCVO(2103).name;
        this._txtClubBuff.text = BuffCVO.getCVO(8105, 1).attrVo.attrInfos[0].desc(true);

        this._aniBtnChallenge = Manager.animation.createEffectAnimation("hctz");
        this._aniBtnChallenge.touchEnabled = true;
        this._aniBtnChallenge.y = 750;

        this._rewardCVOs = ClubBFScoreRewardsCVO.getCVOs();
		Manager.render.add(this.render, this, 1000);

        this.updateChallengeCD(null);
        this.onEnterMap(null);
        this.onResizeHandler(null);
    }

    private render():void
    {
        Manager.control.getClubBF().reqMiniInfos();
    }

    protected addEvent():void
    {
        super.addEvent();
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._btnAuto.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btnClubBuff.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btnAttachProps.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btnClubScore.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._aniBtnChallenge.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._model.addEventListener(ClubBFEvent.ATTACK_BUFF_UPDATE, this.updateAttackBuff, this);
        this._model.addEventListener(ClubBFEvent.SCORE_UPDATE, this.updateScore, this);
        this._model.addEventListener(ClubBFEvent.REWARES_GET_STATE, this.updateGetState, this);
        this._model.addEventListener(ClubBFEvent.CLUB_BUFF_BUY, this.updateClubBuff, this);
        this._model.addEventListener(ClubBFEvent.MINI_INFOS, this.updateMiniInfos, this);
        this._model.addEventListener(ClubBFEvent.CD_UPDATE, this.updateChallengeCD, this);
        this._model.addEventListener(ClubBFEvent.CHALLENGE_AREA_STATE, this.hideImgGoto, this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.SCENE_CLICK, this.hideImgGoto, this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.ENTER_SCENE, this.onEnterMap, this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._btnAuto.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btnClubBuff.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btnAttachProps.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btnGet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btnClubScore.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._aniBtnChallenge.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._model.removeEventListener(ClubBFEvent.ATTACK_BUFF_UPDATE, this.updateAttackBuff, this);
        this._model.removeEventListener(ClubBFEvent.SCORE_UPDATE, this.updateScore, this);
        this._model.removeEventListener(ClubBFEvent.REWARES_GET_STATE, this.updateGetState, this);
        this._model.removeEventListener(ClubBFEvent.CLUB_BUFF_BUY, this.updateClubBuff, this);
        this._model.removeEventListener(ClubBFEvent.MINI_INFOS, this.updateMiniInfos, this);
        this._model.removeEventListener(ClubBFEvent.CD_UPDATE, this.updateChallengeCD, this);
        this._model.removeEventListener(ClubBFEvent.CHALLENGE_AREA_STATE, this.hideImgGoto, this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.SCENE_CLICK, this.hideImgGoto, this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.ENTER_SCENE, this.onEnterMap, this);
        Manager.model.self.removeEventListener(GameObjectEvent.GO_POSITION, this.updateLocation, this);
    }

    private onResizeHandler(e:GlobalEvent):void
	{
        this.width = Math.round(Manager.config.gameWidth);
        this._aniBtnChallenge.x = this.width / 2 - 140;
        if(this.parent) this.x = -this.parent.x;
	}

    private onEnterMap(e:GlobalEvent):void
	{
		let mapCVO:MapCVO = Manager.model.getMap().mapCVO;
        this._model.hasEnterChallengeArea = false;
        if(mapCVO)
		{
            if(mapCVO.id == MapConst.ID_CLUB_BF) 
            {
                this.show();
                Manager.model.self.addEventListener(GameObjectEvent.GO_POSITION, this.updateLocation, this);
                this.updateLocation(null);
            }
            else 
            {
                Manager.model.self.removeEventListener(GameObjectEvent.GO_POSITION, this.updateLocation, this);
                if(mapCVO.id == MapConst.ID_CLUB_BF_BOSS || mapCVO.id == MapConst.ID_CLUB_BF_1V1) ObjectUtil.remove(this);
                else Manager.view.hide(ViewID.ClubBFMiniView);
            }
        }
	}

    private updateLocation(e:GameObjectEvent)
    {
        if(this._model.cd > 0) return;
        if(!this._model.hasEnterChallengeArea)
        {
            if(ClubBFConfigCVO.isInDoorArea(this._model.isSelfDef)) Manager.control.getClubBF().enterChallengeArea(true);//进入城门时发
        }
        else if(!ClubBFConfigCVO.isInDoorArea(this._model.isSelfDef))
        {
            Manager.control.getClubBF().enterChallengeArea(false);//离开城门时发
        }
    }
    
    private updateChallengeCD(e:egret.Event):void
    {
        if(this._model.cd == 0)
        {
            if(this._model.autoChallenge) this.gotoChallenge();
            ObjectUtil.addOrRemove(this._aniBtnChallenge, this, true);
        }
        else ObjectUtil.addOrRemove(this._aniBtnChallenge, this, false);
    }
    private hideImgGoto(e:egret.Event):void
    {
        this._imgGoto.visible = false;
    }

    private onClickHandler(e:egret.TouchEvent):void
    {
        switch(e.currentTarget)
		{
			case this._btnAuto:
                this._model.autoChallenge = !this._model.autoChallenge;
                this._imgSelected.visible = this._model.autoChallenge;
                if(this._model.autoChallenge && this._model.cd == 0) this.gotoChallenge();
                break;
			case this._btnClubBuff:
                if(this._model.clubBFHasBuy) break;
                // if(!ClubBFConfigCVO.club_buff_cost.isEnough(true)) break;
                Manager.view.show(ViewID.ClubBFBuyBuffView);
                break;
			case this._btnAttachProps:
                Manager.view.show(ViewID.ClubBFAttackBuffView);
                break;
			case this._btnGet:
                /*if(this._rewardCVOs[0].canGet) */
                Manager.control.getClubBF().getRewards(this._rewardCVOs[0]);
                break;
			case this._btnClubScore:
                FloatTips.addTips(LangCVO.getContent("clubBF34"));//击败守城兽后，积分较高的进攻盟会获胜
                break;
			case this._aniBtnChallenge:
                this.gotoChallenge();
                break;
        }
    }

    private gotoChallenge():void
    {
        if(this._model.hasEnterChallengeArea) Manager.view.show(ViewID.ClubBFChallengePanel);
        else 
        {
            Manager.walk.moveTo(ClubBFConfigCVO.doorNearPos(this._model.isSelfDef));
            this._imgGoto.visible = true;
        }
    }

	private updateChallengeState(e:ClubBFEvent):void
    {
        this.invalidate("drawChallengeState");
    }

	private updateAttackBuff(e:ClubBFEvent):void
    {
        this.invalidate("drawAttackBuff");
    }
    private drawAttackBuff():void
    {
        this._btnAttachProps.visible = this._model.atkBuffCVO != null;
    }

	private updateClubBuff(e:ClubBFEvent):void
    {
        this.invalidate("drawClubBuff");
    }
    private drawClubBuff():void
    {
        if(this._model.clubBFHasBuy) this._txtClubBuff.filters = [];
        else FilterUtil.setGrayFilter(this._txtClubBuff);
    }

	private updateScore(e:ClubBFEvent):void
    {
        this.invalidate("drawScore");
    }
    private drawScore():void
    {
        let str:string;
        let color:string;
        let cvo:ClubBFScoreRewardsCVO = this._rewardCVOs[0];
        if(cvo.hasGet) 
        {
            this._redIcon.visible = false;
            str = LangCVO.getContent("clubBF31");//已领取
            str += "\n(" + this._rewardCVOs.length + "/" + this._rewardCVOs.length + ")";
            color = Color.GREEN_STR_2;
        }
        else if(cvo.score <= Manager.model.getClubBF().score) 
        {
            this._redIcon.visible = true;
            str = LangCVO.getContent("clubBF32");//可领取
            str += "\n(" + (cvo.id-1) + "/" + this._rewardCVOs.length + ")";
            color = Color.GREEN_STR_2;
        }
        else  
        {
            this._redIcon.visible = false;
            str = LangCVO.getContent("clubBF33", cvo.score);//{0}分可领取
            str += "\n(" + (cvo.id-1) + "/" + this._rewardCVOs.length + ")";
            color = Color.RED_STR;
        }
        HtmlUtil.setTextFlow(this._txtGet, HtmlUtil.addColorTag(str, color));
    }
    
	private updateGetState(e:ClubBFEvent):void
    {
        this.invalidate("drawGetState");
    }
    private drawGetState():void
    {
        this._rewardCVOs.sort(ClubBFScoreRewardsCVO.sortFun);
        this.drawScore();
    }
    
	private updateMiniInfos(e:ClubBFEvent):void
    {
        this._miniData = e.params;
        this.invalidate("drawMiniInfos");
    }
    private drawMiniInfos():void
    {
        // data["bossHP"] = pi.readInt();
        // data["bossMaxHP"] = pi.readInt();
        // data["score"] = pi.readInt();
        // data["rank"] = pi.readInt();
        // data["atkCount"] = pi.readInt();
        // data["defCount"] = pi.readInt();
        // data["clubScores"] = clubScores;
        this._bar.maximum = this._miniData["bossMaxHP"];
        this._bar.value = this._miniData["bossHP"];
        this._txtScore.text = LangCVO.getContent("clubBF5") + this._miniData["score"];//积分：
        this._txtRank.text = LangCVO.getContent("clubBF35") + this._miniData["rank"];//排名：
        this._txtNum.text = LangCVO.getContent("clubBF36", this._miniData["defCount"], this._miniData["atkCount"]);//防守进攻人数：{0}/{1}
        let myClubScore:number = this._miniData["clubScores"][Manager.model.self.attrInfo.guildType];
        let friendClubScore:number = this._miniData["clubScores"][this._friendClubID];
        HtmlUtil.setTextFlow(this._txtClubScore, LangCVO.getContent("clubBF37", myClubScore, friendClubScore));//己：{0}\n友：{1}
    }

	protected draw():void
	{
		super.draw();
        if(this.isInvalid("drawAttackBuff")) this.drawAttackBuff();
        if(this.isInvalid("drawClubBuff")) this.drawClubBuff();
        if(this.isInvalid("drawGetState")) this.drawGetState();
        if(this.isInvalid("drawScore") && !this.isInvalid("drawGetState")) this.drawScore();
        if(this.isInvalid("drawMiniInfos")) this.drawMiniInfos();
	}

    protected drawAll():void
    {
        super.drawAll();
        this.drawAttackBuff();
        this.drawClubBuff();
        this.drawGetState();
    }

    public dispose():void
    {
        this._model.clear();
		Manager.render.remove(this.render, this);
        super.dispose();
        ObjectUtil.disposes(this._txtName, this._txtScore, this._txtRank, this._txtNum, this._bar, this._title, this._btnAuto, this._txtClubBuff, this._txtGet, this._txtClubScore);
        ObjectUtil.removes(this._back, this._imgSelected, this._redIcon, this._btnClubBuff, this._btnAttachProps, this._btnGet, this._btnClubScore, this._aniBtnChallenge, this._imgGoto);
        this._txtName = null;
        this._txtScore = null;
        this._txtRank = null;
        this._txtNum = null;
        this._bar = null;
        this._back = null;
        this._title = null;
        this._btnAuto = null;
        this._imgSelected = null;
        this._redIcon = null;
	    this._btnClubBuff = null;
	    this._btnAttachProps = null;
	    this._btnGet = null;
	    this._btnClubScore = null;
        this._txtClubBuff = null;
        this._txtGet = null;
        this._txtClubScore = null;
        this._aniBtnChallenge = null;
        this._imgGoto = null;
        this._model = null;
        this._rewardCVOs = null;
        
        Manager.view.hide(ViewID.ClubBFClearCDBtn);
        Manager.view.hide(ViewID.ClubBFClearCDView);
        Manager.control.getClubBF().hidePKHead();
    }
}