/**
 *author Anydo
 *create 2018-1-4
 *description 
*/
class ArenaView extends UIComponent
{
    private _imageBg:BitmapRemote;
    private _imageHead:BitmapRemote;
    private _txtCount:Label;
    private _txtVip:Label;
    private _txtTime:Label;
    private _txtRank:Label;
    private _txtName:Label;
    private _txtPower:Label;
    private _txtRenew:Label;
    private _btnBuy:Button;
    private _btnShop:Button;
    private _btnLog:Button;
    private _btnRenew:Button;
    private _btnAward:Button;
    private _redIconMax:eui.Image;

    private _item1:ArenaRankHeadView;
    private _item2:ArenaRankHeadView;
    private _item3:ArenaRankHeadView;

    private _guideTarget:ArenaRankHeadView;

    private COUNT:number = 3;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("arena", "ArenaViewSkin");
        this.touchChildren = true;
    }

    protected configUI():void
    {
        super.configUI();
        this._imageBg.load(Manager.path.getArenaPath("arenaRankBack.jpg"));
        this._imageHead.load(Manager.path.getRoleHeadPath(1, Manager.model.self.attrInfo.career));
        this._txtName.text = LangCVO.getContent("arena10") + Manager.model.self.attrInfo.nickName;
        let vipLevel:number = Manager.model.self.attrInfo.vipLevel;
        let vipCount:number = (vipLevel == 0) ? 0 : ArenaVipCountCVO.getCanBuyCount(vipLevel);
        this._txtVip.text = LangCVO.getContent("arena22", vipCount);

        this.updateMaxAwardData();
    }

	protected initData():void
	{
        Manager.control.getArena().cmdPKCount(0);
        Manager.model.getArena().renewRankHandler(false);

        //引导
        if(Manager.model.getGuide().curID == GuideID.CLUB_JOIN)
        {
            if(this._item3) this._guideTarget = this._item3;
            else if(this._item2) this._guideTarget = this._item2;
            else this._guideTarget = this._item1;
            if(this._guideTarget == null)
            {
                Manager.control.getTask().hideGuide();
                return;
            }
            let pos = this._guideTarget.parent.localToGlobal(this._guideTarget.x,this._guideTarget.y);
            Manager.control.getTask().showGuide(pos, this._guideTarget.width>>1, (this._guideTarget.height>>1) + 110,
                                                 this.guideCB, this, false);
        }
    }

    protected addEvent():void
    {
        super.addEvent();
        this._btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
        this._btnShop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
        this._btnLog.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
        this._btnRenew.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
        this._btnAward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
        Manager.model.getArena().addEventListener(ArenaEvent.UPDATE_RANK, this.updateRankData, this);
        Manager.model.getArena().addEventListener(ArenaEvent.UPDATE_PK_COUNT, this.updateCountData, this);
        Manager.model.getArena().addEventListener(ArenaEvent.UPDATE_MAX_RANK_AWARD, this.updateMaxAwardData, this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
        this._btnBuy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
        this._btnShop.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
        this._btnLog.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
        this._btnRenew.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
        this._btnAward.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
        Manager.model.getArena().removeEventListener(ArenaEvent.UPDATE_RANK, this.updateRankData, this);
        Manager.model.getArena().removeEventListener(ArenaEvent.UPDATE_PK_COUNT, this.updateCountData, this);
        Manager.model.getArena().removeEventListener(ArenaEvent.UPDATE_MAX_RANK_AWARD, this.updateMaxAwardData, this);
    }

	private onBtnClickHandler(e:egret.TouchEvent):void
	{
		switch(e.currentTarget)
		{
			case this._btnBuy:
                Manager.model.getArena().buyPKCountHandler();
				break;
			case this._btnShop:
                Manager.view.show(ViewID.ShopPanel, 2);
				break;
			case this._btnLog:
                Manager.view.show(ViewID.ArenaLogView);
				break;
			case this._btnRenew:
                Manager.model.getArena().renewRankHandler(true);
				break;
			case this._btnAward:
				Manager.model.getArena().closeOpenBfPanel = true;
                Manager.view.hide(ViewID.ActivityPanel);
                Manager.view.show(ViewID.ArenaAwardView);
				break;
		}
	}

    private updateMaxAwardData(e:ArenaEvent=null):void
	{
        let hasMaxAwardCanGet:boolean = Manager.model.getArena().hasMaxAwardCanGet;
        if(hasMaxAwardCanGet && this._redIconMax.parent == null)
        {
            this.addChild(this._redIconMax);
        }
        else if(!hasMaxAwardCanGet && this._redIconMax.parent != null)
        {
            this.removeChild(this._redIconMax);
        }
    }

    private updateCountData(e:ArenaEvent):void
	{
        this._txtCount.text = LangCVO.getContent("arena21", Manager.model.getArena().countLeft, Number(ArenaOtherCVO.getCVO("daily_count").value));
        if(Manager.model.getArena().countCDTime > 0) 
        {
            this.countDownHandler();
            Manager.render.add(this.countDownHandler, this, 1000, 0, null, true);
        }
        else
        {
            this._txtTime.text = "";
            Manager.render.remove(this.countDownHandler, this);
        }
    }

    private countDownHandler():void
    {
        let left:number = Manager.model.getArena().countCDTime - (Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
        if(left <= 0)
        {
            this._txtTime.text = "";
            Manager.render.remove(this.countDownHandler, this);
        }
        else
        {
            this._txtTime.text = cw.DateUtil.formatStr(left, cw.DateUtil.LEFT_HH_MM_SS, true) + LangCVO.getContent("arena23");
        }
    }

    private updateRankData(e:ArenaEvent):void
	{
        let ranks:ArenaRankInfo[] = e.params as ArenaRankInfo[];
        for(let i:number = 1; i <= this.COUNT; i++)
        {
            this["_item"+i].info = ranks[i-1];
        }
        this._txtRank.text = LangCVO.getContent("arena12") + Manager.model.getArena().myRank;
        this._txtPower.text = LangCVO.getContent("arena11") + Manager.model.self.attrInfo.fight;
    }

    private guideCB():void
    {
        if(this._guideTarget) this._guideTarget.clickFun();
        Manager.control.getTask().hideGuide();
    }

    public dispose():void
    {
        Manager.render.remove(this.countDownHandler, this);
        if(Manager.model.getGuide().curID == GuideID.CLUB_JOIN) Manager.control.getTask().hideGuide();
        super.dispose();
        if(this._loadComplete)
        {
            this._imageBg.dispose();
            this._imageBg = null;
            this._imageHead.dispose();
            this._imageHead = null;
            this._txtCount.dispose();
            this._txtCount = null;
            this._txtTime.dispose();
            this._txtTime = null;
            this._txtRank.dispose();
            this._txtRank = null;
            this._txtName.dispose();
            this._txtName = null;
            this._txtPower.dispose();
            this._txtPower = null;
            this._txtRenew.dispose();
            this._txtRenew = null;
            this._btnBuy.dispose();
            this._btnBuy = null;
            this._btnShop.dispose();
            this._btnShop = null;
            this._btnLog.dispose();
            this._btnLog = null;
            this._btnRenew.dispose();
            this._btnRenew = null;
            this._btnAward.dispose();
            this._btnAward = null;
            this._item1.dispose();
            this._item1 = null;
            this._item2.dispose();
            this._item2 = null;
            this._item3.dispose();
            this._item3 = null;
            this._redIconMax = null;
            if(this._guideTarget) this._guideTarget.dispose();
            this._guideTarget = null;
        }
    }
}