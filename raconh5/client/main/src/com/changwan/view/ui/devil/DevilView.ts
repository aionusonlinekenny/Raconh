/**
 * 魔神降临主界面
 * liangyan
 * create 2018-04-10
*/
class DevilView extends UIComponent
{
    private _ruleBtn:Button;
    private _nameTxt:Label;
    private _timeTxt:Label;
    private _goBtn:Button;

    private _head:BitmapRemote;
    private _itemObject:ItemObject;
    private _itemInfoList:Array<ItemsModelInfo>;

    public constructor()
    {
        super();
        this.touchChildren = true;
        this.skinName = Manager.path.getSkinName("devil", "DevilViewSkin");
    }

    protected configUI():void
    {
        super.configUI();

        Manager.control.getDevil().askInfo();

        if(this._head == null)
        {
            this._head = Manager.pool.create(BitmapRemote);
            this._head.x = 573;
            this._head.y = 135;
            this.addChild(this._head);
        }

        let rewards = DailyActivityCVO.getCVO(ActIconID.DEVIL).rewards;
        let len = rewards != null ? rewards.length : 0;
        this.cleanItemInfoList();
        this._itemInfoList = [];
        for(let i:number=0; i<len; i++)
        {
            let info:ItemsModelInfo = Manager.pool.create(ItemsModelInfo);
            info.id = i + 1;
            info.base_id = rewards[i].item.base_id;
            this._itemInfoList.push(info);
        }

		this._itemObject = Manager.pool.create(ItemObject, this._itemInfoList, len, -10);
		this._itemObject.touchChildren = true;
        this._itemObject.x = 148;
        this._itemObject.y = 847;
		this.addChild(this._itemObject);
    }

    protected addEvent():void
    {
        super.addEvent();
        this._ruleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._goBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        Manager.model.getDevil().addEventListener(DevilEvent.DEVIL_LAST_KING_UPDATE, this.onUpdateHandler, this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
        this._ruleBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._goBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        Manager.model.getDevil().removeEventListener(DevilEvent.DEVIL_LAST_KING_UPDATE, this.onUpdateHandler, this);
    }

    protected drawAll():void
    {
        super.drawAll();
        this.drawData();
    }

    protected draw():void
    {
        super.draw();
        if(this.isInvalid(InvalidationType.DATA)) this.drawData();
    }

    private drawData():void
    {
        let info = Manager.model.getDevil().lastKingInfo;
        if(info == null) return;
        HtmlUtil.setTextFlow(this._timeTxt, LangCVO.getContent("devil1"));
        this._nameTxt.text = info.name;
        this._head.load(Manager.path.getRoleHeadPath(2, info.career, 0));
    }

    private onTouchHandler(e:egret.TouchEvent):void
    {
        if(e.currentTarget == this._ruleBtn) Manager.view.show(ViewID.DevilRuleView);
        else if(e.currentTarget == this._goBtn)
        {
            let actCvo = Manager.model.getActIcon().getIDByType(ActIconID.DEVIL);
            if(actCvo)
            {
                if(!actCvo.isAllCondSatisfy(true)) return;
                else if(!actCvo.isInTime)
                {
                    FloatTips.addTips(LangCVO.getContent("activity10"), Color.RED);//活动未开启
                    return;
                }
                else if(Manager.model.self.canJoinActive(true))
                {
                    Manager.control.getDevil().enterDevil();
                    Manager.view.hide(ViewID.BossPanel);
                }
            }
        }
    }

    private onUpdateHandler(e:DevilEvent):void
    {
        this.invalidate(InvalidationType.DATA);
    }

    private cleanItemInfoList():void
    {
        if(this._itemInfoList)
        {
            for(let i:number=0; i<this._itemInfoList.length; i++)
            {
                if(this._itemInfoList[i])
                    Manager.pool.push(this._itemInfoList[i]);
                this._itemInfoList[i] = null;
            }
        }
        this._itemInfoList = null;
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.removes(this._nameTxt, this._timeTxt, this._goBtn, this._itemObject);
        this._nameTxt.dispose();
        this._nameTxt = null;
        this._timeTxt.dispose();
        this._timeTxt = null;
        this._goBtn.dispose();
        this._goBtn = null;

        if(this._head != null) Manager.pool.push(this._head);
        this._head = null;
        if(this._itemObject) this._itemObject.dispose();
        this._itemObject = null;
        this.cleanItemInfoList();
    }
}