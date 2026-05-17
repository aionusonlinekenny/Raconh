/**
 * 冲榜竞技view
 * pzx
 * 2018-3-20
 */
class SrvRankView extends UIComponent{
	private _titleBit:BitmapRemote;
	private _vscroll:BaseVScrollerList;
	private _rankTxt:Label;
	private _timeTxt:Label;
	private _btn:Button;
	private _endTime:number;
	private _model:SrvRankModel;
	private _ani:Animation;

	public static aniPathList=["title3011","title3012","title3013","title3014","title3015","title3016","title3017"];//特效名，固定的//按这个顺序和天数

	public constructor()
    {
        super();
		this.touchChildren = true;
        this.skinName = Manager.path.getSkinName("srvRank", "SrvRankViewSkin");
    }
    protected configUI():void
    {
        super.configUI();
		this._vscroll.initBtnListData(SrvRankItem,[],true);
		this._model = Manager.model.getsrvRank();
    }

    protected addEvent():void
    {
        super.addEvent();
		this._model.addEventListener(SrvRankEvent.SRVRANK_UPDATE_LIST,this.drawData,this);
		this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.openViewRankHandler,this);
    }

    protected removeEvent():void
    {
		this._model.removeEventListener(SrvRankEvent.SRVRANK_UPDATE_LIST,this.drawData,this);
		this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.openViewRankHandler,this);
        super.removeEvent();
    }
	private openViewRankHandler():void
	{
		let i:number = Manager.model.getLogin().serverTimeInfo.serverOpenDays;
		if(i<8)
		{	
			Manager.view.show(ViewID.RankPanel,SrvRankCVO.rankPanelTap(i));
		}
	}

    protected initData():void
    {
        super.initData();
		Manager.control.getsrvRank().query();
		this.drawTime();
		this.countdown();
    }
    private drawData():void{
		let day:number = Manager.model.getLogin().serverTimeInfo.serverOpenDays;
		if(day<8)
		{
			let arr:SrvRankCVO[] = ArrayUtil.sortOn(SrvRankCVO.cvos(day),["isSortNum"]);
			this._titleBit.load(Manager.path.getPanelSrvRankPath("title/srvRank_title_"+day))
			this._vscroll.dataProvider(arr);
			if(this._model.mainRank == 0)
			{
				this._rankTxt.text = LangCVO.getContent("srv_rank3") + LangCVO.getContent("srv_rank4");
			}
			else
			{
				this._rankTxt.text = LangCVO.getContent("srv_rank3") + this._model.mainRank;//我的排名：
			}
			this.clearAni();
			this._ani =Manager.animation.createPanelGlobalAnimation("srvRank/srvRank_ani/"+SrvRankView.aniPathList[day-1],SrvRankView.aniPathList[day-1]);
			this._ani.x = 362;
			this._ani.y = 270;
			this.addChild(this._ani);
		}
		else
		{
			Manager.view.hide(ViewID.SrvRankPanel);
		}
    }
	private clearAni():void
	{
		if(this._ani)
		{
			Manager.pool.push(this._ani);
			this._ani = null;
		}
	}
	private drawTime():void
    {
		this._endTime = DateUtil.getToDayTime();
        Manager.render.add(this.countdown, this, 1000);
    }
    private countdown():void
    {
        let second:number = this._endTime - Math.round(Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
		if(second<=0)
		{
			//Manager.control.getsrvRank().query();
			Manager.render.remove(this.countdown, this);
			this.drawTime();
			return;
		}
        this._timeTxt.text = cw.DateUtil.formatStr(second, cw.DateUtil.LEFT_HH_MM_SS, true);
    }
	private clear(isRemove:boolean=false):void
	{
		if(isRemove)
		{
			ObjectUtil.disposes(this._rankTxt,this._timeTxt,this._btn);
		}
		Manager.render.remove(this.countdown,this);
		Manager.pool.push(this._titleBit);
		this._titleBit=null;
		this._vscroll.dispose();
	    this._vscroll=null;
	    this._rankTxt=null;
		this._timeTxt=null;
		this._btn=null;
		this._model=null;
		this.clearAni();
	}

    public dispose():void
    {
        super.dispose();
        this.clear(true);
    }
}