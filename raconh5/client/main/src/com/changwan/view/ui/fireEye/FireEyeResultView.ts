/**
 * 火眼金睛活动结算视图
 * liangyan
 * create 2018-03-31
*/
class FireEyeResultView extends UIComponent
{
    private _titleImg:eui.Image;
    private _winImg:eui.Image;
    private _totalImg:eui.Image;
    private _sevenBtn:Button;
    private _allBtn:Button;
    private _sevenSign:eui.Image;
    private _allSign:eui.Image;
    private _sevenRed:eui.Image;
    private _allRed:eui.Image;
    private _myNameTxt:Label;
    private _enemyNameTxt:Label;
    private _myInfoTxt:Label;
    private _enemyInfoTxt:Label;

    private _model:FireEyeModel;
    private _back:BitmapRemote;
    private _itemObject:ItemObject;
    private _myBp:BitmapRemote;
    private _otherBp:BitmapRemote;

    private readonly REWARDS = "drawRewards";

    public constructor()
    {
        super();
        this.touchChildren = true;
        this.skinName = Manager.path.getSkinName("fireEye", "FireEyeResultViewSkin");
    }

    protected configUI():void
    {
        super.configUI();

        if(!this._back)
        {
            let path = Manager.path.getFireEyePath("back2");
            this._back = Manager.pool.create(BitmapRemote, path);
            this._back.x = 38;
            this._back.y = 210;
            this.addChildAt(this._back, this.getChildIndex(this._titleImg) + 1);
        }

        if(!this._myBp)
        {
            this._myBp = Manager.pool.create(BitmapRemote);
            this._myBp.x = -20;
            this._myBp.y = 320;
            this.addChildAt(this._myBp, this.getChildIndex(this._back) + 1);
        }

        if(!this._otherBp)
        {
            this._otherBp = Manager.pool.create(BitmapRemote);
            this._otherBp.x = 735;
            this._otherBp.y = 320;
            this._otherBp.scaleX = -1;
            this.addChildAt(this._otherBp, this.getChildIndex(this._back) + 1);
        }

        this._model = Manager.model.getFireEye();
    }

    protected addEvent():void
    {
        super.addEvent();
        this._sevenBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._allBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._model.addEventListener(FireEyeEvent.FIRE_EYE_UPDATE_REWARDS, this.updateRewerds, this);
    }

    protected removeEvent():void
    {
        this._sevenBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._allBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._model.removeEventListener(FireEyeEvent.FIRE_EYE_UPDATE_REWARDS, this.updateRewerds, this);
        super.removeEvent();
    }

    protected drawAll():void
    {
        super.drawAll();
        this.drawData();
        this.drawRewards();
    }

    protected draw():void
    {
        super.draw();
        if(this.isInvalid(InvalidationType.DATA)) this.drawData();
        if(this.isInvalid("drawPos")) this.drawPos();
        if(this.isInvalid(this.REWARDS)) this.drawRewards();
    }

    private drawData():void
    {
        let info = this._model.actResultData;
        if(info == null) return;
        this._myBp.load(Manager.path.getFireEyePath(Manager.model.self.attrInfo.career + ""));
        this._otherBp.load(Manager.path.getFireEyePath(this._model.enemyInfo.career + ""));
        this._myNameTxt.text = Manager.model.self.getName();
        this._myInfoTxt.text = LangCVO.getContent("fireEye15", info.selfScore, cw.DateUtil.formatStr(info.selfTime, cw.DateUtil.MM_SS));
        this._enemyNameTxt.text = info.enemyName;
        this._enemyInfoTxt.text = LangCVO.getContent("fireEye15", info.enemyScore, cw.DateUtil.formatStr(info.enemyTime, cw.DateUtil.MM_SS));
        this._winImg.x = info.isSelfWin ? 70 : 440;

        let len = info.gainGoods ? info.gainGoods.length : 0;
        let offsetX = (720 - (141 * len)) / 2;
        let offsetY = 820;
		this._itemObject = Manager.pool.create(ItemObject, info.gainGoods, len, 0);
		this._itemObject.touchChildren = true;
        this._itemObject.x = offsetX;
        this._itemObject.y = offsetY;
		this.addChild(this._itemObject);

        this.invalidate("drawPos");
    }

    private drawPos():void
    {
        this._myNameTxt.x = 284 - this._myNameTxt.measuredWidth;
        this._myInfoTxt.x = 287 - this._myInfoTxt.measuredWidth;
    }

    private drawRewards():void
    {
        if(this._model == null) return;
        let myInfo = this._model.myGameInfo;
        if(this._model.fetchedRewards.indexOf(FireEyeConst.ID_LIAN_SHENG) == -1)
        {
            this._sevenRed.visible = myInfo.winTimes >= FireEyeConfigCVO.getCVOByID(FireEyeConfigCVO.ID_WIN_TIMES).value;
            //有小红点就不用显示小红点，显示 已领取
            if(this._sevenRed.visible)
            {
                this._sevenSign.visible = true;
                this._sevenBtn.visible = this._sevenRed.visible = false;
            }
        }
        else
        {
            this._sevenSign.visible = true;
            this._sevenBtn.visible = this._sevenRed.visible = false;
        }

        if(this._model.fetchedRewards.indexOf(FireEyeConst.ID_WAN_SHENG) == -1)
        {
            this._allRed.visible = myInfo.winTimes >= FireEyeLevelCVO.maxLevel;
            //有小红点就不用显示小红点，显示 已领取
            if(this._allRed.visible)
            {
                this._allSign.visible = true;
                this._allBtn.visible = this._allRed.visible = false;
            }
            else
            {
                this._allSign.visible = false;
                this._allBtn.visible = true;
            }
        }
        else
        {
            this._allSign.visible = true;
            this._allBtn.visible = this._allRed.visible = false;
        }
    }

    private onTouchHandler(e:egret.TouchEvent):void
    {
        if(this._model == null) return;
        if(Manager.model.getItems().bagSurplus < 1)
        {
            //背包空间不足
            FloatTips.addTips(LangCVO.getContent("fireEye20"));
            return;
        }
        let myInfo = this._model.myGameInfo;
        switch(e.currentTarget)
        {
            case this._sevenBtn:
                if(this._model.fetchedRewards.indexOf(FireEyeConst.ID_LIAN_SHENG) != -1) return;
                let liansheng = FireEyeConfigCVO.getCVOByID(FireEyeConfigCVO.ID_WIN_TIMES).value;
                if(myInfo.winTimes < liansheng)
                {
                    //当前成功通关<font color='{0}'>{1}/{2}</font>关，未达到要求
                    let str = LangCVO.getContent("fireEye18", Color.RED_STR, myInfo.winTimes, liansheng);
                    FloatTips.addTips(str);
                    return;
                }
                Manager.control.getFireEye().fetchByID(FireEyeConst.ID_LIAN_SHENG);
                break;
            case this._allBtn:
                if(this._model.fetchedRewards.indexOf(FireEyeConst.ID_WAN_SHENG) != -1) return;
                let wansheng = FireEyeLevelCVO.maxLevel;
                if(myInfo.winTimes < wansheng)
                {
                    //需要全部关卡成功通关
                    FloatTips.addTips(LangCVO.getContent("fireEye19"));
                    return;
                }
                Manager.control.getFireEye().fetchByID(FireEyeConst.ID_WAN_SHENG);
                break;
        }
    }

    private updateRewerds(e:FireEyeEvent):void
    {
        this.invalidate(this.REWARDS);
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.removes(this._titleImg, this._winImg, this._totalImg, this._sevenBtn, this._allBtn, this._sevenSign, this._allSign, 
                            this._myNameTxt, this._enemyNameTxt, this._myInfoTxt, this._enemyInfoTxt, this._back, this._sevenRed, this._allRed,
                            this._itemObject);
        this._titleImg = null;
        this._winImg = null;
        this._totalImg = null;
        this._sevenBtn.dispose();
        this._sevenBtn = null;
        this._allBtn.dispose();
        this._allBtn = null;
        this._sevenSign = null;
        this._allSign = null;
        this._myNameTxt.dispose();
        this._myNameTxt = null;
        this._enemyNameTxt.dispose();
        this._enemyNameTxt = null;
        this._myInfoTxt.dispose();
        this._myInfoTxt = null;
        this._enemyInfoTxt.dispose();
        this._enemyInfoTxt = null;
        this._sevenRed = null;
        this._allRed = null;
        if(this._back) Manager.pool.push(this._back);
        this._back = null;
        if(this._itemObject) this._itemObject.dispose();
        this._itemObject = null;

        if(this._myBp != null) Manager.pool.push(this._myBp);
        this._myBp = null;
        if(this._otherBp != null) Manager.pool.push(this._otherBp);
        this._otherBp = null;
    }
}