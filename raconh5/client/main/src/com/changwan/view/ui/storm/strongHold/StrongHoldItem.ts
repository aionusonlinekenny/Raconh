/**
 * 江湖风云据点Item
 * luzh
 * 2018-4.20
 */
class StrongHoldItem extends RenderSprite
{
    private _cvo:StormStrongHoldCVO;
    private _back:BitmapRes;
    private _rewardsView:StrongHoldRewardsView;
    private _icon:BitmapRes;
    private _txt:TextField;
    private _bossCDEndTime:number;

	public constructor()
    {
        super();
    }

	protected start():void
	{
		super.start();

        this._back = BitmapRes.create("");
        this.addChild(this._back);
        this._back.filters = [new egret.GlowFilter(0xffffff,0.5,3,3,3)];
        
        this._icon = BitmapRes.create("");
        this.addChild(this._icon);
        
        this._txt = TextField.create(220, 40, Color.GREEN, 24);
        this.addChild(this._txt);
	}

    public set cvo(value:StormStrongHoldCVO)
    {
        if(this._cvo == value) return;
        this._cvo = value;
        this.x = this._cvo.pos.x;
        this.y = this._cvo.pos.y;
        this._back.source = "storm_mask"+this._cvo.id+"_png";
        
        if(this._cvo.step == 3) this.addRewardsView();
        // else this.disposeRewardsView();
    }

    public setData(ownerType:number, bossCDEndTime:number):void
    {
        this._bossCDEndTime = bossCDEndTime;
        if(this.bossCD > 0)
        {
            this._icon.source = "";
            Manager.render.add(this.countDown, this, 1000);
            this.countDown();
        }
        else 
        {
            Manager.render.remove(this.countDown, this);
            this._txt.text = "";
            if(ownerType == Manager.model.self.attrInfo.guildType)
            {
                this._icon.source = "storm_danjian_png";
            }
            else 
            {
                this._icon.source = "storm_shuangjian_png";
            }
        }

        if(ownerType == 1) FilterUtil.addAliveColorFilter(this._back, Color.BLUE);
        else if(ownerType == 2) FilterUtil.addAliveColorFilter(this._back, Color.RED);
        else if(ownerType == 3) FilterUtil.addAliveColorFilter(this._back, Color.GREEN);
        else FilterUtil.removeColorMat(this._back);
    }

    private countDown():void
    {
        this._txt.text = LangCVO.getContent("storm8") + cw.DateUtil.formatStr(this.bossCD, cw.DateUtil.LEFT_HH_MM_SS, true);//保护中：
    }

    private get bossCD():number
    {
        return this._bossCDEndTime - Manager.model.getLogin().serverTimeInfo.serverTime/1000;
    }

    private addRewardsView():void
    {
        if(this._rewardsView == null)
        {
            this._rewardsView = ObjectUtil.createObj(StrongHoldRewardsView);
            this.addChildAt(this._rewardsView, 1);
        }
    }
    private disposeRewardsView():void
    {
        if(this._rewardsView)
        {
            this._rewardsView.dispose();
            this._rewardsView = null;
        }
    }

    public reuse():void
    {
        super.reuse();
		this.touchEnabled = true;
		this.touchChildren = false;
    }

    public dispose():void
    {
        Manager.render.remove(this.countDown, this);
        super.dispose();
        this.disposeRewardsView();
        this._back.filters = [];
        ObjectUtil.pushes(this._back, this._icon, this._txt);
        this._cvo = null;
        this._back = null;
        this._rewardsView = null;
        this._icon = null;
        this._txt = null;
    }
}