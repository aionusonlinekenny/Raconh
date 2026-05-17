/**
 * 盟会战面板
 * luzhihong
 * create 2018.1.25
 */
 class ClubBFChallengePanel extends Panel
{
    private _backBoss:BitmapRemote;
    private _btnBoss:Button;
    private _label:eui.Image;
    private _listDef:BaseVScrollerList;
    private _listAtk:BaseVScrollerList;
    private _checkBox:CheckBox;
    private _btnReset:Button;
    private _txtTips:Label;
    private _defInfos:Array<ClubBFPlayerInfo>;
    private _atkInfos:Array<ClubBFPlayerInfo>;
    private _lastReqTime:number;

    private _bgImg:BitmapRemote;

    public constructor()
    {
        super();
		this.skinName = Manager.path.getSkinName("clubBF", "ClubBFChallengePanelSkin");
        GameDispatcher.getInstance().addEventListener(GlobalEvent.ENTER_SCENE, this.enterScene, this);//有时ui还没加载完，就切了地图，要关掉界面，在开始就注册事件
    }
    
    protected configUI():void
    {
		super.configUI();

        this.basePanel.downFrameImg.visible = false;
        this.basePanel.backBtn.visible = false;
		this.basePanel.setBottomBackTop(1098);
		// this.basePanel.backImg.source = Manager.path.getClubBFPath("back1.jpg").url;
		this.basePanel.title = "clubBF_title_list_png";

        if(!this._bgImg)
        {
            this._bgImg = Manager.pool.create(BitmapRemote);
            this._bgImg.load(Manager.path.getClubBFPath("back1.jpg"));
            this._bgImg.x = this.basePanel.backImg.x;
            this._bgImg.y = this.basePanel.backImg.y + 50;
            this.basePanel.addChildAt(this._bgImg, this.basePanel.getChildIndex(this.basePanel.backImg) + 1);
        }

        this._backBoss.load(Manager.path.getClubBFPath("boss.png"));

        HtmlUtil.setTextFlow(this._txtTips, LangCVO.getContent("clubBF44"));//点击敌对玩家头像即可挑战;
        
		this._listDef.initBtnListData(ClubBFChallengeItem, null, true);
        this._listDef.touchChildren = true;
		// (<eui.VerticalLayout>this._listDef.itemList.layout).gap = 13;
		this._listAtk.initBtnListData(ClubBFChallengeItem, null, true);
        this._listAtk.touchChildren = true;
		// (<eui.VerticalLayout>this._listAtk.itemList.layout).gap = 13;
    }

    protected initData():void
    {
        super.initData();
		Manager.render.add(this.reqList, this, 5000);
		this.reqList();
    }

	protected addEvent():void
	{
		super.addEvent();
        this._btnBoss.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnReset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._checkBox.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getClubBF().addEventListener(ClubBFEvent.PLAYER_LIST_UPDATE, this.updateList, this);
        Manager.model.getClubBF().addEventListener(ClubBFEvent.CHALLENGE_AREA_STATE, this.challengeAreaState, this);
	}

	protected removeEvent():void
	{
		super.removeEvent();
        this._btnBoss.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnReset.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._checkBox.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getClubBF().removeEventListener(ClubBFEvent.PLAYER_LIST_UPDATE, this.updateList, this);
        Manager.model.getClubBF().removeEventListener(ClubBFEvent.CHALLENGE_AREA_STATE, this.challengeAreaState, this);
	}
    
	private challengeAreaState(e:ClubBFEvent):void
	{
        if(!Manager.model.getClubBF().hasEnterChallengeArea) Manager.view.hide(ViewID.ClubBFChallengePanel);
    }
    
	private enterScene(e:GlobalEvent):void
	{
        if(Manager.model.getMap().mapCVO.id != MapConst.ID_CLUB_BF) Manager.view.hide(ViewID.ClubBFChallengePanel);
    }

	protected onClickHandler(e:egret.TouchEvent):void
	{
		super.onClickHandler(e);

		switch(e.currentTarget)
		{
			case this.basePanel.closeBtn:
				Manager.view.hide(ViewID.ClubBFChallengePanel);
				break;
			case this._btnBoss:
                Manager.control.getClubBF().challengeBoss();
				break;
			case this._btnReset:
                this.reqList();
			case this._checkBox:
                this.drawList();
				break;
		}
	}

    private updateList(e:ClubBFEvent):void
    {
        // {defList:defList, atkList:atkList}
        this._defInfos = e.params.defList;
        this._atkInfos = e.params.atkList;

        this.drawList();

        ObjectUtil.addOrRemove(this._backBoss, this, this._defInfos.length == 0);
        ObjectUtil.addOrRemove(this._btnBoss, this, this._defInfos.length == 0);
        ObjectUtil.addOrRemove(this._label, this, this._atkInfos.length == 0)

        if(Manager.model.getClubBF().autoChallenge) 
        {
            if(Manager.model.getClubBF().isSelfDef)
            {
                if(this._atkInfos.length > 0) Manager.control.getClubBF().challengePlayer(this._defInfos[0].isRobot, this._defInfos[0].id);
            }
            else
            {
                if(this._defInfos.length > 0) Manager.control.getClubBF().challengePlayer(this._atkInfos[0].isRobot, this._atkInfos[0].id);
                else Manager.control.getClubBF().challengeBoss();
            }
        }
    }

    private drawList():void
    {
        //选中则作排序
        if(this._checkBox.selected)
        {
            let defDatas:Array<ClubBFPlayerInfo> = this._defInfos.concat();
            let atkDatas:Array<ClubBFPlayerInfo> = this._atkInfos.concat();
            defDatas.sort(this.sortFun);
            atkDatas.sort(this.sortFun);
            this._listDef.dataProvider(defDatas);
            this._listAtk.dataProvider(atkDatas);
        }
        else 
        {
            this._listDef.dataProvider(this._defInfos);
            this._listAtk.dataProvider(this._atkInfos);
        }
    }

    private sortFun(info0:ClubBFPlayerInfo, info1:ClubBFPlayerInfo):number
    {
        if(info0.winCount > info1.winCount) return -1;
        if(info0.winCount < info1.winCount) return 1;
        return 0;
    }

    private reqList():void
    {
        if(egret.getTimer() - this._lastReqTime < 500) return;
        this._lastReqTime = egret.getTimer();
        Manager.control.getClubBF().reqList();
    }

    public dispose():void
    {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.ENTER_SCENE, this.enterScene, this);
		Manager.render.remove(this.reqList, this);
        super.dispose();
		ObjectUtil.disposes(this._backBoss, this._btnBoss, this._listDef, this._listAtk, this._checkBox, this._btnReset);
		ObjectUtil.removes(this._label, this._bgImg);
        this._backBoss = null;
        this._btnBoss = null;
        this._label = null;
        this._listDef = null;
        this._listAtk = null;
        this._checkBox = null;
        this._btnReset = null;
        this._defInfos = null;
        this._atkInfos = null;
        if(this._bgImg)
            Manager.pool.push(this._bgImg);
        this._bgImg = null;
    }
}