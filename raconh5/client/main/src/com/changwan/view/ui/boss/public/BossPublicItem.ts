/**
 * 全民boss项
 * luzhihong
 * create 2017-12.25
 */
class BossPublicItem extends ItemRenderer
{
    private _model:BossModel;
    private _cvo:BossCVO;
    private _back:BitmapRemote;
    private _head:BitmapRemote;
    private _txtName:Label;
    private _txtLv:Label;
    private _txt0:Label;
    private _txtCond:Label;
    private _btn:Button;
    private _label:eui.Image;
    private _bar:ProgressBar;
    private _checkBox:CheckBox;
    private _pkIcon:eui.Image;
	private _goodItems:Array<Goods>;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("boss", "BossPublicItemSkin");
    }

    protected createChildren():void
    {
        super.createChildren();
        this._model = Manager.model.getBoss();
        this._bar.labelFunction = (value: number, maximum: number) => {return Math.floor(value/maximum*100) + "%";};
        this.addEvent();
    }

    protected dataChanged():void
    {
        this._cvo = this.data as BossCVO;
        this._back.load(Manager.path.getBossItemBackPath(this.itemIndex%4));
        this._head.load(Manager.path.getBossHeadPath(this._cvo.boss.url));
        this._pkIcon.visible = this._cvo.pkMode > 0;
        this._txtName.text = this._cvo.boss.name;
        // this._txtLv.text = "Lv."+this._cvo.boss.level;
        if(this._cvo.condVo != null)
        {
            if(this._cvo.condVo.type == ConditionVO.REIN)
            {
                this._txtLv.text = this._cvo.condVo.value + LangCVO.getContent("common14");//转
                this._txtCond.text = LangCVO.getContent("boss22", this._cvo.condVo.value);//22	{0}转可挑战
            }
            else 
            {
                this._txtLv.text = "Lv."+this._cvo.condVo.value;
                this._txtCond.text = LangCVO.getContent("boss23", this._cvo.condVo.value);//23	{0}级可挑战
            }
        }
        
        this.pushGoods();
        this._goodItems = [];
        let item:Goods;
        for(let i:number=0, len:number=this._cvo.show.length; i<len; i++)
        {
            item = Manager.pool.create(Goods);
            item.x = 160 + i*114;
            item.y = 40;
            item.data = this._cvo.show[i].item;
            this.addChild(item);
            this._goodItems.push(item);
        }

        this.onBossUpdate(null);
        this.onAttentionUpdate(null);
    }

    private addEvent():void
    {
		this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._checkBox.addEventListener(egret.Event.CHANGE, this.onCheckBoxChange, this);
        this._model.addEventListener(BossEvent.BLOOD_INFO, this.onBossUpdate, this);
        this._model.addEventListener(BossEvent.ATTENTION, this.onAttentionUpdate, this);
    }

    private removeEvent():void
    {
		this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._checkBox.removeEventListener(egret.Event.CHANGE, this.onCheckBoxChange, this);
        this._model.removeEventListener(BossEvent.BLOOD_INFO, this.onBossUpdate, this);
        this._model.removeEventListener(BossEvent.ATTENTION, this.onAttentionUpdate, this);
    }

    private onBossUpdate(e:BossEvent = null):void
    {
        if(!this._cvo.condVo.isSatisfy())
        {
            this._txt0.text = LangCVO.getContent("boss8");//血量：
            this._bar.maximum = 1;
            this._bar.value = 1;
            this._txtCond.visible = true;
            this._checkBox.visible = false;
            this._btn.visible = false;
            this._label.source = null;
        }
        else 
        {
            this._txtCond.visible = false;
            this._checkBox.visible = true;
            if(this._cvo.isKilled)
            {
                Manager.render.add(this.countdown, this, 1000);
                this.countdown();

                this._bar.visible = false;
                this._btn.visible = false;
                this._label.source = "common_label_killed_png";
            }
            else
            {
                Manager.render.remove(this.countdown, this);

                this._txt0.text = LangCVO.getContent("boss8");//血量：
                this._bar.maximum = this._cvo.totalBlood;
                this._bar.value = this._cvo.curBlood;
                this._bar.visible = true;
                this._btn.visible = true;
                this._label.source = "common_label_tiaozhan_png";
            }
        }
    }
	
    private countdown():void
    {
        let left = this._cvo.leftTime;
        this._txt0.text = cw.DateUtil.formatStr(left, cw.DateUtil.LEFT_HH_MM_SS, true)+LangCVO.getContent("boss9");//后重生
        if(left <= 0) Manager.render.remove(this.countdown, this);
    }

    private onAttentionUpdate(e:BossEvent = null):void
    {
        this._checkBox.selected = this._cvo.isAttention;
    }

    private onCheckBoxChange(e:egret.Event):void
    {
        Manager.control.getBoss().attention(this._cvo.id, this._checkBox.selected);
    }
		
    private onClickHandler(e:egret.TouchEvent):void
    {
        if(this._model.challengeNum <= 0)
        {
			FloatTips.addTips(LangCVO.getContent("boss15"));//
			return;
        }
        if(!this._cvo.condVo.isSatisfy(null, true)) return;
        if(!Manager.model.self.canJoinActive(true)) return;
        let callBack:CallBackInfo = Manager.pool.create(CallBackInfo,this.enterBoss,this,this._cvo.id);
        if(Manager.model.getBag().isTooLittle(true,callBack)) return;
        this.enterBoss(this._cvo.id);
    }
		
    private enterBoss(id:number):void
    {
        Manager.control.getBoss().enter(id);
        Manager.view.hide(ViewID.BossPanel);
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
        Manager.render.remove(this.countdown, this);
        this.removeEvent();
        this.pushGoods();
		super.dispose();
        ObjectUtil.disposes(this._back, this._head, this._txtName, this._txtLv, this._txt0, this._txtCond, this._btn, this._bar, this._checkBox);
        ObjectUtil.removes(this._label, this._pkIcon);
        this._model = null;
        this._cvo = null;
        this._back = null;
        this._head = null;
        this._txtName = null;
        this._txtLv = null;
        this._txt0 = null;
        this._txtCond = null;
        this._btn = null;
        this._label = null;
        this._bar = null;
        this._checkBox = null;
        this._pkIcon = null;
	}
}