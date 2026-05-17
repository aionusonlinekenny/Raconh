/**
 * 盟会战视图
 * luzhihong
 * create 2018.1.29
 */
class ClubBFView extends UIComponent
{
    private _back:BitmapRemote;
    private _txtClub:Label;
    private _txtTime:Label;
    private _btnEnter:Button;
    private _btnExplain:eui.Image;
    private _btnRewards:eui.Group;
    private _btnTips:eui.Group;
    private _redIcon:eui.Image;
    private _items:Array<Goods> = [];
    private _model:ClubBFModel;
    private _cvo:DailyActivityCVO;
    
    private _enterCDEndTime:number=0;
    private _clubPowers:Array<Object>;
    private _parentView:ClubBFPanel;
    private _timeStr:string="";

	public constructor(parentView:ClubBFPanel)
	{
		super();
        this._parentView = parentView;
		this.skinName = Manager.path.getSkinName("clubBF", "ClubBFViewSkin");
        this.touchChildren = true;
	}

    
    protected configUI():void
    {
        super.configUI();
        this._model = Manager.model.getClubBF();
        this._cvo = DailyActivityCVO.getCVO(ActIconID.CLUB_BF);
        
        this._back.load(Manager.path.getClubBFPath("back.jpg"));
		let item:Goods;
		let len:number = this._cvo.rewards.length;
		for(var i:number=0; i<len; i++)
		{
            item = Manager.pool.create(Goods);
            item.x = 128 + i * 128;
            item.y = 845;
            item.data = this._cvo.rewards[i].item;
            this.addChild(item);
            this._items.push(item);
		}

        this._parentView.addChild(this._btnExplain);
    }

	protected initData():void
	{
        super.initData();
        this.updateRewards();
        Manager.control.getClubBF().reqInfo();
    }

    protected addEvent():void
    {
        super.addEvent();
        this._btnEnter.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._btnExplain.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._btnRewards.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._btnTips.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._model.addEventListener(ClubBFEvent.INFO_UPDATE, this.updateInfo, this);
        this._model.addEventListener(ClubBFEvent.CLUB_POWERS, this.updateClubPowers, this);
        this._model.addEventListener(ClubBFEvent.SCORE_UPDATE, this.updateRewards, this);
        this._model.addEventListener(ClubBFEvent.REWARES_GET_STATE, this.updateRewards, this);
        Manager.model.getActIcon().addEventListener(ActIconEvent.SINGLE_UPDATE,  this.actUpdate, this);
        Manager.model.getActIcon().addEventListener(ActIconEvent.LIST_UPDATE,  this.actUpdate, this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
        this._btnEnter.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._btnExplain.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._btnRewards.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._btnTips.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._model.removeEventListener(ClubBFEvent.INFO_UPDATE, this.updateInfo, this);
        this._model.removeEventListener(ClubBFEvent.CLUB_POWERS, this.updateClubPowers, this);
        this._model.removeEventListener(ClubBFEvent.SCORE_UPDATE, this.updateRewards, this);
        this._model.removeEventListener(ClubBFEvent.REWARES_GET_STATE, this.updateRewards, this);
        Manager.model.getActIcon().removeEventListener(ActIconEvent.SINGLE_UPDATE,  this.actUpdate, this);
        Manager.model.getActIcon().removeEventListener(ActIconEvent.LIST_UPDATE,  this.actUpdate, this);
    }

    private updateRewards(e:egret.Event = null):void
    {
        this._redIcon.visible = this._model.hasCanGet;
    }

	private onClickHandler(e:egret.TouchEvent):void
	{
		switch(e.currentTarget)
		{
			case this._btnEnter:
                if(Manager.model.self.attrInfo.guildID == 0)//无盟会
                {
                    Manager.view.show(ViewID.ClubPanel);
                }
                else
                {
                    if(!this._cvo.isInTime) 
                    {
                        FloatTips.addTips(this._timeStr);//
                        return;
                    }
                    let cd:number = this.enterCD;
                    if(cd > 0)
                    {
                        FloatTips.addTips(LangCVO.getContent("clubBF25", cd));//{0}秒后可前往战场
                        return;
                    }
                    if(!this._cvo.isAllCondSatisfy(true)) return;
                    if(!Manager.model.self.canJoinActive(true)) return;
                    Manager.control.getClubBF().enter();
                    Manager.view.hide(ViewID.ClubBFPanel);
                }
				break;
            case this._btnExplain:
                Manager.view.show(ViewID.ClubBFExplainView);
                break;
            case this._btnRewards:
                Manager.view.show(ViewID.ClubBFRewardsPanel);
                break;
            case this._btnTips:
                let str:string = LangCVO.getContent("clubBF45");
                if(this._clubPowers) 
                {
                    str += "\n" + LangCVO.getContent("clubBF46");
                    str += HtmlUtil.addColorTag("\n1、" + ClubDataCVO.getClubName(this._clubPowers[0]["id"]) + this._clubPowers[0]["power"], Color.ORANGE_STR);
                    str += HtmlUtil.addColorTag("\n2、" + ClubDataCVO.getClubName(this._clubPowers[1]["id"]) + this._clubPowers[1]["power"], Color.PURPLE_STR);
                    str += HtmlUtil.addColorTag("\n3、" + ClubDataCVO.getClubName(this._clubPowers[2]["id"]) + this._clubPowers[2]["power"], Color.BLUE_STR);
                    // for(var i:number=0; i<this._clubPowers.length; i++)
                    // {
                    //     str += "\n" + (i+1) + "、" + ClubDataCVO.getClubName(this._clubPowers[i]["id"]) + this._clubPowers[i]["power"];
                    // }
                }
                Manager.view.show(ViewID.TextTips, str);
                break;
		}
	}

    private get enterCD():number
    {
        let left:number = Math.ceil(this._enterCDEndTime - Manager.model.getLogin().serverTimeInfo.serverTime/1000);
        return left > 0 ? left : 0;
    }
		
    private updateInfo(e:ClubBFEvent):void
    {
        // {clubID:clubID, winCount:winCount, enterCD:enterCD}
        let clubID:number = e.params.clubID;
        let winCount:number = e.params.winCount;
        this._enterCDEndTime = e.params.enterCD;
        if(clubID == 0) Manager.control.getClubBF().reqClubPowers();
        else
        {
            let str:string = ClubDataCVO.getClubName(clubID) + "\n" + winCount + LangCVO.getContent("clubBF14");//连胜
            HtmlUtil.setTextFlow(this._txtClub, str);
        }
    }

    private updateClubPowers(e:ClubBFEvent):void
    {
        this._clubPowers = e.params;
        let str:string = ClubDataCVO.getClubName(this._clubPowers[0]["id"]) + "\n" + LangCVO.getContent("clubBF26");//	总战力第一盟
        HtmlUtil.setTextFlow(this._txtClub, str);
    }

    private actUpdate(e:ActIconEvent):void
    {
        this.invalidate("drawActUpdate");
    }

    private drawActUpdate():void
    {
        this.drawActUpdateHandler();
		Manager.render.add(this.drawActUpdateHandler, this, 1000);
    }

    private drawActUpdateHandler():void
    {
        if(this._cvo.isInTime) this._txtTime.text = "";
        else 
        {
            // this._txtTime.text = this._cvo.timeDesc;
            let nextDate:Date = ClubBFConfigCVO.nextStartTime;
            // let startTimeStr:string = cw.DateUtil.formatStr(this._cvo.startTime, cw.DateUtil.HH_MM, true);
            // let endTimeStr:string = cw.DateUtil.formatStr(this._cvo.endTime, cw.DateUtil.HH_MM, true);
            // this._timeStr = LangCVO.getContent("clubBF24", nextDate.getMonth(), nextDate.getDate(), startTimeStr, endTimeStr, GameUtil.getWeekDayStr(nextDate.getDay()));// 战场开启时间：{0}月{1}日{2}-{3}（{4}）
            // this._txtTime.text = this._timeStr;
            
            let time:number = Math.round((nextDate.getTime() - Manager.model.getLogin().serverTimeInfo.serverTime) / 1000);
            if(time < 0)
            {
                Manager.render.remove(this.drawActUpdateHandler, this);
                HtmlUtil.setTextFlow(this._txtTime, LangCVO.getContent("clubBF48", "00:00:00"));
                return;
            }
            if(time > 24 * 3600)
            {
                let day:number = Math.floor((time + Manager.model.getLogin().serverTimeInfo.todaySeconds) / (24 * 3600));
                HtmlUtil.setTextFlow(this._txtTime, LangCVO.getContent("clubBF47", day));
            }
            else
            {
                let timeStr:string = cw.DateUtil.formatStr(time, cw.DateUtil.LEFT_HH_MM_SS, true);
                HtmlUtil.setTextFlow(this._txtTime, LangCVO.getContent("clubBF48", timeStr));
            }
        }
    }

	protected draw():void
	{
		super.draw();
        if(this.isInvalid("drawActUpdate")) this.drawActUpdate();
	}

    protected drawAll():void
    {
        super.drawAll();
        this.drawActUpdate();
    }

    public dispose():void
    {
        Manager.render.remove(this.drawActUpdateHandler, this);
        super.dispose();
        ObjectUtil.disposes(this._back, this._txtClub, this._txtTime, this._btnEnter, this._btnRewards, this._btnTips);
        ObjectUtil.removes(this._btnExplain, this._redIcon);
        for(var i:number=this._items.length-1; i>=0; i--)
        {
            this._items[i].dispose();
        }
        this._back = null;
        this._txtClub = null;
        this._txtTime = null;
        this._btnEnter = null;
        this._btnExplain = null;
        this._btnRewards = null;
        this._btnTips = null;
        this._items = null;
        this._model = null;
        this._cvo = null;
        this._clubPowers = null;
        this._parentView = null;
    }
}