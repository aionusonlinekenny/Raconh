/**
 * 盟主战
 */
class ClubLeaderWarView extends UIComponent
{
	private static ROLE_IMG_LIST:Array<Array<egret.Point>> = [
		[new egret.Point(10, 500), new egret.Point(160, 540)],
		[new egret.Point(10, 290), new egret.Point(0, 290)],
		[new egret.Point(380, 370), new egret.Point(350, 360)]
	];
	private _rankBtn:Button;
	private _item1:ClubLeaderWarFightInfoItem;
	private _item2:ClubLeaderWarFightInfoItem;
	private _item3:ClubLeaderWarFightInfoItem;
	private _name1:eui.Image;
	private _name2:eui.Image;
	private _name3:eui.Image;
	private _playing:eui.Group;
	private _rank:Label;
	private _timeGroup:eui.Group;
	private _playTimes:Label;
	private _addTimeBtn:Button;
	private _numCountdownTips:Label;
	private _playBtn:Button;
	private _played:eui.Group;
	private _mobaiTime:Label;
	private _nextTimeTips:Label;
	private _btn1:Button;
	private _btn2:Button;

	private _bgImg:BitmapRemote;
	private _roleImg1:BitmapRemote;
	private _roleImg2:BitmapRemote;
	private _roleImg3:BitmapRemote;
	private _roleImgList:Array<BitmapRemote>;

	private _model:ClubLeaderWarModel;
	private _itemList:Array<ClubLeaderWarFightInfoItem>;
	private _btnList:Array<Button>;
	private _nameList:Array<eui.Image>;
	private _maxTimeCvoInfo:ClubDataCVO;
	private _maxTime:number;
	private _buyTimeCvoInfo:ClubDataCVO;
	private _buyInfo:GainLossVO;
	private _mobaiCvoInfo:ClubDataCVO;

	public constructor()
	{
		super();
		this.skinName = Manager.path.getSkinName("clubLeaderWar", "ClubLeaderWarViewSkin");
		this.touchChildren = true;
	}

	protected configUI():void
	{
		super.configUI();

		this._model = Manager.model.getClubLeaderWar();

		this._playing.touchEnabled = false;
		this._played.touchEnabled = false;
		this._timeGroup.touchEnabled = false;

		if(!this._bgImg)
		{
			this._bgImg = Manager.pool.create(BitmapRemote);
			this._bgImg.x = 5;
			this._bgImg.y = 117;
			this.addChildAt(this._bgImg, 0);
		}
		this._bgImg.load(PathInfo.getPath("res/clubLeaderWar/clubLeaderWar_bg2.jpg", LoaderType.IMAGE), 710, 868);

		if(!this._roleImg1)
		{
			this._roleImg1 = Manager.pool.create(BitmapRemote);
			this.addChildAt(this._roleImg1, 2);
		}
		this._roleImg1.load(PathInfo.getPath("res/clubLeaderWar/clubLeaderWar_role22.png", LoaderType.IMAGE));
		this._roleImg1.x = ClubLeaderWarView.ROLE_IMG_LIST[0][1].x;
		this._roleImg1.y = ClubLeaderWarView.ROLE_IMG_LIST[0][1].y;

		if(!this._roleImg2)
		{
			this._roleImg2 = Manager.pool.create(BitmapRemote);
			this.addChildAt(this._roleImg2, 2);
		}
		this._roleImg2.load(PathInfo.getPath("res/clubLeaderWar/clubLeaderWar_role11.png", LoaderType.IMAGE));
		this._roleImg2.x = ClubLeaderWarView.ROLE_IMG_LIST[1][0].x;
		this._roleImg2.y = ClubLeaderWarView.ROLE_IMG_LIST[1][0].y;

		if(!this._roleImg3)
		{
			this._roleImg3 = Manager.pool.create(BitmapRemote);
			this.addChildAt(this._roleImg3, 2);
		}
		this._roleImg3.load(PathInfo.getPath("res/clubLeaderWar/clubLeaderWar_role21.png", LoaderType.IMAGE));
		this._roleImg3.x = ClubLeaderWarView.ROLE_IMG_LIST[2][1].x;
		this._roleImg3.y = ClubLeaderWarView.ROLE_IMG_LIST[2][1].y;

		this._roleImgList = [this._roleImg1, this._roleImg2, this._roleImg3];

		let clubType:number = Number(String(Manager.model.self.attrInfo.guildID).substr(-1, 1));
		this._nameList = [this._name1, this._name2, this._name3];
		for(let i:number=0; i<this._nameList.length; i++)
		{
			this._nameList[i].source = "clubLeaderWar_type"+ clubType + (i+1) + "_png";
		}
		this._itemList = [this._item1, this._item2, this._item3];
		this._btnList = [this._item1.btn, this._item2.btn, this._item3.btn];
	}

	protected initData():void
	{
		this._maxTimeCvoInfo = ClubDataCVO.getClubLeaderWarInfo(4);
		if(this._maxTimeCvoInfo) this._maxTime = Number(this._maxTimeCvoInfo.clubLeaderWarInfoValue);
		this._buyTimeCvoInfo = ClubDataCVO.getClubLeaderWarInfo(3);
		if(this._buyTimeCvoInfo) this._buyInfo = new GainLossVO(this._buyTimeCvoInfo.clubLeaderWarInfoValue);
		this._mobaiCvoInfo = ClubDataCVO.getClubLeaderWarInfo(9);

		Manager.control.getClubLeaderWar().query();
	}

	protected addEvent():void
	{
		super.addEvent();
		this._rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		if(this._btnList)
		{
			for(let i:number=0; i<this._btnList.length; i++)
			{
				this._btnList[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickItemBtnHandler, this);
			}
		}
		this._addTimeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._playBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._model.addEventListener(ClubLeaderWarEvent.CLUB_LEADER_WAR_INFO_UPDATE, this.onClubLeaderWarInfoUpdateHandler, this);
		this._model.addEventListener(ClubLeaderWarEvent.CLUB_LEADER_WAR_RANK_UPDATE, this.onClubLeaderWarInfoUpdateHandler, this);
		this._model.addEventListener(ClubLeaderWarEvent.CLUB_LEADER_WAR_PLAY_TIME_UPDATE, this.onClubLeaderWarTimeUpdataHandler, this);
	}

	protected removeEvent():void
	{
		this._rankBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		if(this._btnList)
		{
			for(let i:number=0; i<this._btnList.length; i++)
			{
				this._btnList[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickItemBtnHandler, this);
			}
		}
		this._addTimeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._playBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._model.removeEventListener(ClubLeaderWarEvent.CLUB_LEADER_WAR_INFO_UPDATE, this.onClubLeaderWarInfoUpdateHandler, this);
		this._model.removeEventListener(ClubLeaderWarEvent.CLUB_LEADER_WAR_RANK_UPDATE, this.onClubLeaderWarInfoUpdateHandler, this);
		this._model.removeEventListener(ClubLeaderWarEvent.CLUB_LEADER_WAR_PLAY_TIME_UPDATE, this.onClubLeaderWarTimeUpdataHandler, this);
		super.removeEvent();
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
		switch(e.currentTarget)
		{
			case this._rankBtn:
				Manager.view.show(ViewID.ClubLeaderWarRankView);
				break;
			case this._addTimeBtn:
				if(this._model.info.playNum >= this._maxTime)
				{
					FloatTips.addTips(LangCVO.getContent("clubLeaderWar8"), Color.RED);
					return;
				}
				else
				{
					if(this._buyInfo)
					{
						let cbi:CallBackInfo = Manager.pool.create(CallBackInfo, this.buyQueryHandler, this);
						Manager.tips.showTips(LangCVO.getContent("clubLeaderWar9", this._buyInfo.num), cbi, true);
					}
				}
				break;
			case this._playBtn:
				if(this._model.info.playNum > 0)
					Manager.view.show(ViewID.ClubLeaderWarMatchingView);
				break;
			case this._btn1:
				Manager.view.show(ViewID.ClubLeaderWarMemberView);
				break;
			case this._btn2:
				// Manager.view.show(ViewID.ClubLeaderWarLeaderRankView);
				Manager.view.show(ViewID.RankPanel, 1);
				break;
		}
	}

	private buyQueryHandler():void
	{
		if(Manager.model.self.attrInfo.gold < this._buyInfo.num)
		{
			FloatTips.addTips(LangCVO.getContent("clubLeaderWar8"), Color.RED);
		}
		else
		{
			Manager.control.getClubLeaderWar().buyQuery();
		}
	}

	private onClickItemBtnHandler(e:egret.TouchEvent):void
	{
		if(Number(this._mobaiCvoInfo.clubLeaderWarInfoValue) - this._model.info.mobaiCount <= 0)
		{
			FloatTips.addTips(LangCVO.getContent("clubLeaderWar29"), Color.RED);
			return;
		}

		let index:number = this._btnList.indexOf(e.currentTarget);
		if(index == -1) return;
		let rankList:Array<ClubLeaderWarRankInfo> = this._model.info.rankList;
		if(!rankList[index])
		{
			FloatTips.addTips(LangCVO.getContent("clubLeaderWar31"), Color.RED);
			return;
		}
		if(rankList && rankList.length > 0)
			Manager.control.getClubLeaderWar().worshipQuery(rankList[index].id);
		// for(let i:number=0; i<rankList.length; i++)
		// {
		// 	if(rankList[i].rank == index + 1)
		// 	{
		// 		Manager.control.getClubLeaderWar().worshipQuery(rankList[i].id);
		// 		return;
		// 	}
		// }
	}

	private onClubLeaderWarInfoUpdateHandler(e:ClubLeaderWarEvent):void
	{
		this._playing.visible = this._model.status == 1;
		this._played.visible = !this._playing.visible;

		for(let i:number=0; i<3; i++)
		{
			if(this._model.info.rankList[i])
			{
				this._itemList[i].nickName.text = this._model.info.rankList[i].nickName;
				this._itemList[i].count.text = this._model.info.rankList[i].winCount + "";

				// this._roleImgList[i].load(PathInfo.getPath("res/clubLeaderWar/clubLeaderWar_role"+ (this._model.info.rankList[i].career + 1) +"2.png", LoaderType.IMAGE));

				let career:number = this._model.info.rankList[i].career;// == 0 ? 2 : 1;
				let path:string = "res/clubLeaderWar/clubLeaderWar_role"+ career;
				if(i == 0)
					path += "2.png";
				else
					path += "1.png";
				this._roleImgList[i].load(PathInfo.getPath(path, LoaderType.IMAGE));

				this._roleImgList[i].x = ClubLeaderWarView.ROLE_IMG_LIST[i][career - 1].x;
				this._roleImgList[i].y = ClubLeaderWarView.ROLE_IMG_LIST[i][career - 1].y;
			}
		}
		
		if(this._model.status == 0)
		{
			this._mobaiTime.text = (Number(this._mobaiCvoInfo.clubLeaderWarInfoValue) - this._model.info.mobaiCount) + "/" + this._mobaiCvoInfo.clubLeaderWarInfoValue;
			for(let i:number=0; i<this._itemList.length; i++)
			{
				this._itemList[i].txt1.text = LangCVO.getContent("clubLeaderWar2" + (i+1));
				this._itemList[i].txt2.text = LangCVO.getContent("clubLeaderWar10");
				this._itemList[i].btn.visible = true;
			}
			this.activityNextTimeHandler();
			Manager.render.add(this.activityNextTimeHandler, this, 1000);
		}
		else if(this._model.status == 1)
		{
			this._rank.text = this._model.info.rank != 0 ? String(this._model.info.rank) : LangCVO.getContent("clubLeaderWar1");
			for(let i:number=0; i<this._itemList.length; i++)
			{
				this._itemList[i].txt1.text = LangCVO.getContent("clubLeaderWar24");
				this._itemList[i].txt2.text = LangCVO.getContent("clubLeaderWar25");
				this._itemList[i].btn.visible = false;
			}
			this.onClubLeaderWarTimeUpdataHandler();
		}
	}

	private onClubLeaderWarTimeUpdataHandler(e?:ClubLeaderWarEvent):void
	{
		let color:string;
		if(this._model.info.playNum <= 0)
			color = "#ff0000";
		else
			color = "#4eff00";
		HtmlUtil.setTextFlow(this._playTimes, "<font color='"+ color +"'>"+ this._model.info.playNum + "/" + this._maxTime +"</font>")

		if(this._model.info.playCountdown != 0)
		{
			this.numCountdownHandler();
			Manager.render.add(this.numCountdownHandler, this, 1000);
		}
		else
		{
			Manager.render.remove(this.numCountdownHandler, this);
			this._numCountdownTips.text = "";
			this._timeGroup.x = 252;
		}
	}

	private activityNextTimeHandler():void
	{
		let time:number = this._model.info.nextTime - Math.round(Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
		if(time < 0)
		{
			Manager.render.remove(this.activityNextTimeHandler, this);
			HtmlUtil.setTextFlow(this._nextTimeTips, LangCVO.getContent("clubLeaderWar2", "00:00:00"));
			return;
		}
		if(time > 24 * 3600)
		{
			let day:number = Math.ceil(time / (24 * 3600));
			HtmlUtil.setTextFlow(this._nextTimeTips, LangCVO.getContent("clubLeaderWar30", day));
		}
		else
		{
			let timeStr:string = cw.DateUtil.formatStr(time, cw.DateUtil.LEFT_HH_MM_SS, true);
			HtmlUtil.setTextFlow(this._nextTimeTips, LangCVO.getContent("clubLeaderWar2", timeStr));
		}
	}

	private numCountdownHandler():void
	{
		let time:number = this._model.info.playCountdown - Math.round(Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
		if(time < 0)
		{
			Manager.render.remove(this.numCountdownHandler, this);
			this._numCountdownTips.text = "";
			this._timeGroup.x = 252;
			return;
		}
		let timeStr:string = cw.DateUtil.formatStr(time, cw.DateUtil.LEFT_HH_MM_SS, true);
		this._numCountdownTips.text = LangCVO.getContent("clubLeaderWar3", timeStr);
		this._timeGroup.x = 32;
	}

	public dispose():void
	{
		Manager.render.remove(this.activityNextTimeHandler, this);
		Manager.render.remove(this.numCountdownHandler, this);
		super.dispose();
		if(this._rankBtn)
			this._rankBtn.dispose();
		this._rankBtn = null;
		if(this._item1)
			this._item1.dispose();
		this._item1 = null;
		if(this._item2)
			this._item2.dispose();
		this._item2 = null;
		if(this._item3)
			this._item3.dispose();
		this._item3 = null;
		this._name1 = null;
		this._name2 = null;
		this._name3 = null;
		this._playing = null;
		if(this._rank)
			this._rank.dispose();
		this._rank = null;
		this._timeGroup = null;
		if(this._playTimes)
			this._playTimes.dispose();
		this._playTimes = null;
		if(this._addTimeBtn)
			this._addTimeBtn.dispose();
		this._addTimeBtn = null;
		if(this._numCountdownTips)
			this._numCountdownTips.dispose();
		this._numCountdownTips = null;
		if(this._playBtn)
			this._playBtn.dispose();
		this._playBtn = null;
		this._played = null;
		if(this._mobaiTime)
			this._mobaiTime.dispose();
		this._mobaiTime = null;
		if(this._nextTimeTips)
			this._nextTimeTips.dispose();
		this._nextTimeTips = null;
		if(this._btn1)
			this._btn1.dispose();
		this._btn1 = null;
		if(this._btn2)
			this._btn2.dispose();
		this._btn2 = null;
		if(this._bgImg)
			this._bgImg.dispose();
		this._bgImg = null;
		if(this._roleImg1)
			this._roleImg1.dispose();
		this._roleImg1 = null;
		if(this._roleImg2)
			this._roleImg2.dispose();
		this._roleImg2 = null;
		if(this._roleImg3)
			this._roleImg3.dispose();
		this._roleImg3 = null;
		this._model = null;
		this._itemList = null;
		this._nameList = null;
	}
}