/**
 * 复活方式选择面板
 * liangyan
 * create 2017-12-06
*/
class ReviveChooseView extends UIComponent implements IViewManager
{
    private _baseView:BasePopUpView;
    private _killerTxt:Label;
    private _arrowImg:eui.Image;
    private _differImg:eui.Image;
    private _stateTxt:Label;
    private _freeBtn:Button;
    private _lossBtn:Button;
	private _imageBg1:BitmapRemote;

    private _second:NumImgView2;
    private _fightView:NumImgView2;
    private _moneyView:GameMoneyView;

    private _mapCvo:MapCVO;
    private _serverID:number;
    private _name:string;
    private _fightValue:number;
    private _life:number;
    private _cost:number;

    private _tempTime:number;

    private readonly FREE_BTN_X:number = 100;
    private readonly LOSS_BTN_X:number = 451;
    private readonly ARROW_W:number = 36;
    private readonly DIFFER_LABEL_W:number = 162;

    public constructor()
    {
        super();
        this.touchChildren = true;
        this.skinName = Manager.path.getSkinName("revive", "ReviveChooseViewSkin");
    }

    protected configUI():void
    {
        super.configUI();
		this._imageBg1.load(Manager.path.getCommonPath("diwenBack1.png"));
        this._baseView.closeBtn.visible = false;
    }

    protected addEvent():void
    {
        super.addEvent();
        // this._baseView.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._freeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._lossBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
    }

    protected removeEvent():void
    {
        // this._baseView.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._freeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._lossBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        super.removeEvent();
    }

    protected drawAll():void
    {
        super.drawAll();
        this.drawLayout();
    }

    protected draw():void
    {
        super.draw();
        if(this.isInvalid(InvalidationType.LAYOUT)) this.drawLayout();
    }

    private drawLayout():void
    {
        //付费表数据
        this._cost = parseInt(MapCVO.getConfigData(MapCVO.CONFIG_REVIVE_COST));
        //地图表数据
        if(!this._mapCvo || this._mapCvo.reliveTime <= 0)
        {
            Manager.view.hide(ViewID.ReviveChooseView);
            return;
        }
        //您被<font color='{0}'>{1}</font>击杀了
        HtmlUtil.setTextFlow(this._killerTxt, StringUtils.setParam(LangCVO.getContent("revive1"), Color.RED_STR, this._name));
        this._stateTxt.text = LangCVO.getContent("revive2");//倒计时后将在中立地区安全区自动复活
        //倒计时数字
        if(!this._second)
        {
            this._second = Manager.pool.create(NumImgView2);
            this._second.y = this._killerTxt.y + 51;
            this.addChild(this._second);
        }
        // this._life = this._mapCvo.reliveTime;
        this.setSecondValue();
        //战力对比
        let differ = Manager.model.self.attrInfo.fight - this._fightValue;
        let isSelfLess = differ < 0
        this._arrowImg.visible = this._differImg.visible = isSelfLess;
        //战力相差
        if(isSelfLess && !this._fightView)
        {
            this._fightView = Manager.pool.create(NumImgView2);
            this.addChild(this._fightView);
        }
        if(this._fightView)
        {
            this._fightView.setValue(differ, "nums_fighting2_", 25);
            this._arrowImg.x = (720 - this.ARROW_W - this.DIFFER_LABEL_W - this._fightView.width - 11) / 2;
            this._differImg.x = this._arrowImg.x + this.ARROW_W + 9;
            this._fightView.x = this._differImg.x + this.DIFFER_LABEL_W + 2;
            this._fightView.y = this._differImg.y + 5;
        }
        //操作按钮
        let free = ReviveType.checkType(this._mapCvo.id, ReviveType.FREE_ALERT);
        let loss = ReviveType.checkType(this._mapCvo.id, ReviveType.PAY_ALERT);
        this._freeBtn.visible = free;
        this._lossBtn.visible = loss;
        if(free && loss)
        {
            this._freeBtn.x = this.FREE_BTN_X;
            this._lossBtn.x = this.LOSS_BTN_X;
        }
        else if(!free) this._lossBtn.x = (720 - this._lossBtn.width) / 2;
        else this._freeBtn.x = (720 - this._freeBtn.width) / 2;
        //拥有元宝
        if(!this._moneyView)
        {
            this._moneyView = Manager.pool.create(GameMoneyView, 3);
            this._moneyView.x = this._lossBtn.x + this._lossBtn.width + 10;
            this._moneyView.y = (loss ? this._lossBtn.y : this._freeBtn.y) + (this._freeBtn.height - this._moneyView.height) / 2;
            this.addChild(this._moneyView);
        }
        this._moneyView.setNum(this._cost);
        this._moneyView.visible = loss;
    }

    private setSecondPosition():void
    {
        if(!this._second) return;
        this._second.x = (720 - this._second.width) / 2 - 10;
    }

    private onTouchHandler(e:egret.TouchEvent):void
    {
        if(Manager.model.self.getAliveFlag())
        {
            Manager.view.hide(ViewID.ReviveChooseView);
            return;
        }
        switch(e.currentTarget)
        {
            // case this._baseView.closeBtn:
            //     Manager.control.getBattle().reviveApply(1);
            // break;
            case this._freeBtn:
                Manager.control.getBattle().reviveApply(1);
            break;
            case this._lossBtn:
                if(Manager.model.self.attrInfo.gold < this._cost)
                {
                    let cvo:ItemsCVO = ItemsCVO.getCvo(ItemsConst.YUAN_BAO);
                    Manager.view.show(ViewID.ItemsTips, cvo);
                }
                else Manager.control.getBattle().reviveApply(0);
            break;
        }
    }

    private countdown():void
    {
        this._life--;
        if(this._life <= 0)
        {
            // Manager.render.remove(this.countdown, this);
            Manager.control.getBattle().reviveApply(1);
        }
        else
        {
            this.setSecondValue();
        }
    }

    private setSecondValue():void
    {
        if(this._second == null) return;
        this._second.setValue(this._life, "nums_cd_", 25);
        this._second.x = (720 - this._second.width) / 2 - 10;
    }

    public show(serverID:number, name:string, fight:number):void
    {
        if(!this.parent)
        {
            this._serverID = serverID;
            this._name = name;
            this._fightValue = fight;
            this._mapCvo = MapCVO.getCVO(Manager.model.getMap().getId());
            this._life = this._mapCvo.reliveTime;
            this.invalidate(InvalidationType.LAYOUT);
            // Manager.render.add(this.countdown, this, 1000, 0, null, true);
            window.clearInterval(this._tempTime);
            this._tempTime = window.setInterval(()=>this.countdown(), 1000);
            Manager.layer.uiLayer.addChild(this);
        }
    }

    public hide():void
    {
        if(this.parent) this.dispose();
    }

    public dispose():void
    {
        // if(Manager.render.contains(this.countdown, this)) Manager.render.remove(this.countdown, this);
        window.clearInterval(this._tempTime);
        super.dispose();
        ObjectUtil.removes(this._baseView, this._killerTxt, this._arrowImg, this._differImg, this._stateTxt, this._freeBtn, this._lossBtn, this._second, this._fightView, this._moneyView);
        this._baseView.dispose();
        this._baseView = null;
        this._killerTxt.dispose();
        this._killerTxt = null;
        this._arrowImg.bitmapData = null;
        this._arrowImg = null;
        this._differImg.bitmapData = null;
        this._differImg = null;
        this._stateTxt.dispose();
        this._stateTxt = null;
        this._freeBtn.dispose();
        this._freeBtn = null;
        this._lossBtn.dispose();
        this._lossBtn = null;
		if(this._loadComplete)
		{
			this._imageBg1.dispose();
			this._imageBg1 = null;
		}
        if(this._second)
        {
            Manager.pool.push(this._second);
            this._second = null;
        }
        if(this._fightView)
        {
            Manager.pool.push(this._fightView);
            this._fightView = null;
        }
        if(this._moneyView)
        {
            Manager.pool.push(this._moneyView);
            this._moneyView = null;
        }

        this._mapCvo = null;
    }
}