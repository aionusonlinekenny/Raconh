/**
 * 盟会战积分奖励项
 * luzhihong
 * create 2018.1.30
 */
class ClubBFScoreRewardsItem extends ItemRenderer
{
    private _txt:Label;
    private _btn:Button;
    private _label:eui.Image;
    private _redIcon:eui.Image;
	private _goodItems:Array<Goods>;
    private _cvo:ClubBFScoreRewardsCVO;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("clubBF", "ClubBFScoreRewardsItemSkin");
    }

    protected createChildren():void
    {
        super.createChildren();
        this.addEvent();
    }

    protected dataChanged():void
    {
        this._cvo = this.data as ClubBFScoreRewardsCVO;
        
        this.pushGoods();
        this._goodItems = [];
        let item:Goods;
        for(let i:number=0, len:number=this._cvo.rewards.length; i<len; i++)
        {
            item = Manager.pool.create(Goods);
            item.x = 14 + i*115;
            item.y = 4;
            item.data = this._cvo.rewards[i].item;
            this.addChild(item);
            this._goodItems.push(item);
        }

        if(this._cvo.hasGet)
        {
            this._label.visible = true;
            this._btn.visible = false;
        }
        else
        {
            this._label.visible = false;
            this._btn.visible = true;
        }
        this.updateScore(null);
    }

    private addEvent():void
    {
		this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getClubBF().addEventListener(ClubBFEvent.SCORE_UPDATE, this.updateScore, this);
    }

    private removeEvent():void
    {
		this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getClubBF().removeEventListener(ClubBFEvent.SCORE_UPDATE, this.updateScore, this);
    }

    private updateScore(e:ClubBFEvent):void
    {
        let color:string = this._cvo.score > Manager.model.getClubBF().score ? Color.RED_STR : Color.DEF_STR;
        HtmlUtil.setTextFlow(this._txt, LangCVO.getContent("clubBF5") + HtmlUtil.addColorTag(this._cvo.score+"", color));
        this._txt.text = LangCVO.getContent("clubBF5") + this._cvo.score;//积分：
        this._redIcon.visible = this._cvo.canGet;
    }

    private onClickHandler(e:egret.TouchEvent):void
    {
        Manager.control.getClubBF().getRewards(this._cvo);
    }

    private pushGoods():void
    {
        if(this._goodItems)
        {
            for(let i:number=this._goodItems.length-1; i>=0; i--)
            {
                Manager.pool.push(this._goodItems[i]);
            }
            this._goodItems = null;
        }
    }

    public dispose():void
    {
        this.removeEvent();
        this.pushGoods();
		super.dispose();
        ObjectUtil.disposes(this._txt, this._btn);
        ObjectUtil.removes(this._label, this._redIcon);
        this._txt = null;
        this._btn = null;
        this._label = null;
        this._redIcon = null;
        this._cvo = null;
	}
}