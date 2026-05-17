/**
 * 个人boss项
 * luzhihong
 * create 2017-12.25
 */
class BossPrivateItem extends ItemRenderer
{
    private _cvo:CopyCVO;
    private _back:BitmapRemote;
    private _head:BitmapRemote;
    private _txtName:Label;
    private _txtLv:Label;
    private _txtLeft:Label;
    private _btn:Button;
    private _label:eui.Image;
    private _txtCond:Label;
	private _goodItems:Array<Goods>;

    private _isLvlEnough:boolean;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("boss", "BossPrivateItemSkin");
    }

    protected createChildren():void
    {
        super.createChildren();
        this.addEvent();
    }

    protected dataChanged():void
    {
        this._cvo = this.data as CopyCVO;
        this._back.load(Manager.path.getBossItemBackPath(this.itemIndex%4));
        this._head.load(Manager.path.getBossHeadPath(this._cvo.boss.url));
        this._txtName.text = this._cvo.boss.name;
        
        let condVo:ConditionVO = this._cvo.getCondByType(ConditionVO.REIN);
        if(condVo != null)
        {
            this._txtLv.text = condVo.value + LangCVO.getContent("common14");//转
            this._txtCond.text = LangCVO.getContent("boss22", condVo.value);//22	{0}转可挑战
            this._isLvlEnough = condVo.isSatisfy();
        }
        else 
        {
            condVo = this._cvo.getCondByType(ConditionVO.LEVEL);
            if(condVo != null) 
            {
                this._txtLv.text = "Lv."+condVo.value;
                this._txtCond.text = LangCVO.getContent("boss23", condVo.value);//23	{0}级可挑战
                this._isLvlEnough = condVo.isSatisfy();
            }
        }

        this.pushGoods();
        this._goodItems = [];
        let item:Goods;
        for(let i:number=0, len:number=this._cvo.show.length; i<len; i++)
        {
            item = Manager.pool.create(Goods);
            item.x = 160 + i*115;
            item.y = 40;
            item.data = this._cvo.show[i].item;
            this.addChild(item);
            this._goodItems.push(item);
        }

        this.onUpdate(null);
    }

    private addEvent():void
    {
		this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        // Manager.model.getCopy().addEventListener(CopyEvent.UPDATE_SINGLE, this.onUpdate, this);
    }

    private removeEvent():void
    {
		this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        // Manager.model.getCopy().removeEventListener(CopyEvent.UPDATE_SINGLE, this.onUpdate, this);
    }

    private onUpdate(e:CopyEvent = null):void
    {
        if(e == null || (e.params as CopyCVO).id == this._cvo.id)
        {
            let color:string = Color.GREEN_STR;
            if(!this._isLvlEnough)
            {
                this._label.source = null;
                this._btn.visible = false;
                this._txtCond.visible = true;
            }
            else if(this._cvo.leftNum == 0)
            {
                this._label.source = "common_label_killed_png";
                this._btn.visible = false;
                this._txtCond.visible = false;
                color = Color.RED_STR;
            }
            else if(this._cvo.saodangCond.isSatisfy() && this._cvo.hasPass)
            {
                this._label.source = "common_label_saodang_png";
                this._btn.visible = true;
                this._txtCond.visible = false;
            }
            else
            {
                this._label.source = "common_label_tiaozhan_png";
                this._btn.visible = true;
                this._txtCond.visible = false;
            }
            HtmlUtil.setTextFlow(this._txtLeft, LangCVO.getContent("boss3", HtmlUtil.addColorTag(this._cvo.leftNum+"", color)));//挑战次数：{0}
        }
    }

    private onClickHandler(e:egret.TouchEvent):void
    {
        if(!this._cvo.isAllCondSatisfy(true)) return;
        let callback:CallBackInfo = Manager.pool.create(CallBackInfo,this.enterCopy,this,this._cvo.id);
        if(Manager.model.getBag().isTooLittle(true,callback))return;
        this.enterCopy(this._cvo.id);
    }
		
    private enterCopy(id:number):void
    {
        if(this._cvo.saodangCond.isSatisfy() && this._cvo.hasPass) Manager.control.getCopy().saoDang(id);
        else 
        {
            if(!Manager.model.self.canJoinActive(true)) return;
            Manager.control.getCopy().enter(id);
            Manager.view.hide(ViewID.BossPanel);
        }
    }

    private pushGoods():void
    {
        if(this._goodItems)
        {
            for(let i:number=this._cvo.show.length-1; i>=0; i--)
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
        ObjectUtil.disposes(this._back, this._head, this._txtName, this._txtLv, this._txtLeft, this._btn, this._txtCond);
        ObjectUtil.remove(this._label);
        this._cvo = null;
        this._back = null;
        this._head = null;
        this._txtName = null;
        this._txtLv = null;
        this._txtLeft = null;
        this._btn = null;
        this._label = null;
        this._txtCond = null;
	}
}