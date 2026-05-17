/**
 * 全民boss界面
 * luzh
 * create 2017-12.25
*/
class BossPublicView extends UIComponent
{
    private _model:BossModel;
    private _cvos:Array<BossCVO>;
    private _txtCount:Label;
    private _txtTime:Label;
    private _txtTips:Label;
    private _list:BaseVScrollerList;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("boss", "BossPublicViewSkin");
        this.touchChildren = true;
    }
    
    protected configUI():void
    {
        super.configUI();
        this._model = Manager.model.getBoss();

        this._txtTips.text = LangCVO.getContent("boss1");//伤害第一的玩家可获得击杀大奖，其他玩家可获得参与奖励
		this._list.initBtnListData(BossPublicItem, null, true);
		(<eui.VerticalLayout>this._list.itemList.layout).gap = 13;

        this._cvos = BossCVO.getCVOs();
    }

    protected addEvent():void
    {
        super.addEvent();
        this._model.addEventListener(BossEvent.KILLED_OR_REVIVE, this.onBossUpdate, this);
        this._model.addEventListener(BossEvent.CHALLENGE_TIMES, this.onTimes, this);
        Manager.control.getBoss().openOrClosePanel(true);
    }

    protected removeEvent():void
    {
        this._model.removeEventListener(BossEvent.KILLED_OR_REVIVE, this.onBossUpdate, this);
        this._model.removeEventListener(BossEvent.CHALLENGE_TIMES, this.onTimes, this);
        super.removeEvent();
        Manager.control.getBoss().openOrClosePanel(false);
    }

    private onTimes(e:BossEvent):void
    {
		this.invalidate("drawTimes");
    }

    private drawTimes():void
    {
        this._txtCount.text = LangCVO.getContent("boss10", this._model.challengeNum, BossModel.CHALLENGE_MAX);//挑战次数：{0}/{1}
        if(this._model.challengeNum >= BossModel.CHALLENGE_MAX) 
        {
            this._txtTime.text = LangCVO.getContent("boss21");//21	每1小时恢复1次挑战次数
            Manager.render.remove(this.countdown, this);
        }
        else 
        {
            Manager.render.add(this.countdown, this, 1000);
            this.countdown();
        }
    }
	
    private countdown():void
    {
        let left = Math.floor(this._model.recoverTime - Manager.model.getLogin().serverTimeInfo.serverTime/1000);
        this._txtTime.text = LangCVO.getContent("boss11") + cw.DateUtil.formatStr(left, cw.DateUtil.LEFT_HH_MM_SS, true);//恢复倒计时：
        if(left <= 0) Manager.render.remove(this.countdown, this);
    }

    private onBossUpdate(e:BossEvent):void
    {
		this.invalidate("drawList");
    }

    private drawList():void
    {
        this._cvos.sort((a:BossCVO, b:BossCVO) => {
                // if(!a.isKilled && b.isKilled) return -1;
                // if(a.isKilled && !b.isKilled) return 1;
                // if(a.leftTime < b.leftTime) return -1;
                // if(a.leftTime > b.leftTime) return 1;
                // return (a.id > b.id ? 1 : -1); 
                let isOpen1:boolean = a.condVo.isSatisfy();
                let isOpen2:boolean = b.condVo.isSatisfy();
                if(isOpen1 && !isOpen2) return -1;
                if(!isOpen1 && isOpen2) return 1;
                if(isOpen1) return (a.id < b.id ? 1 : -1); 
                else  return (a.id < b.id ? -1 : 1); 
            });
		this._list.dataProvider(this._cvos);
    }

	protected draw():void
	{
		super.draw();
		if(this.isInvalid("drawTimes")) this.drawTimes();
		if(this.isInvalid("drawList")) this.drawList();
	}

    protected drawAll():void
    {
        super.drawAll();
        this.drawTimes();
        this.drawList();
    }
    public dispose():void
    {
        Manager.render.remove(this.countdown, this);
        super.dispose();
        ObjectUtil.disposes(this._txtCount, this._txtTime, this._txtTips, this._list);
        this._model = null;
        this._cvos = null;
        this._txtCount = null;
        this._txtTime = null;
        this._txtTips = null;
        this._list = null;
    }
}