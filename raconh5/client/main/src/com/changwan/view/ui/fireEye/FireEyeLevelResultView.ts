/**
 * 火眼金睛单关结算视图
 * liangyan
 * create 2018-03-22
*/
class FireEyeLevelResultView extends UIComponent implements IViewManager
{
    private _back:eui.Image;
    private _levelInfo:Label;
    private _myName:Label;
    private _otherName:Label;
    private _myScore:Label;
    private _otherScore:Label;
    private _myTime:Label;
    private _otherTime:Label;
    private _countDown:Label;

    private _info:FireEyeLevelResultInfo;
    private _life:number;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("fireEye", "FireEyeLevelResultViewSkin");
    }

    protected configUI():void
    {
        super.configUI();

        if(!this._back)
        {
            this._back = Manager.pool.create(BitmapRemote);
            this._back.x = 124;
            this._back.y = 348;
            this.addChildAt(this._back, 0);
        }
    }

    protected addEvent():void
    {
        super.addEvent();
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    }

    protected removeEvent():void
    {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        super.removeEvent();
    }

    protected initData():void
    {
        super.initData();
        this.onResizeHandler(null);
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
        if(!this._info) return;
        this._back.source = this._info.selfWin ? "fireEye_back_win_png" : "fireEye_back_fail_png";
        let goodsLen = this._info.gainGoods ? this._info.gainGoods.length : 0;
        let expNum:number;
        let coinNum:number;
        for(let i = 0; i< goodsLen; i++)
        {
            if(this._info.gainGoods[i].base_id == ItemsConst.COIN) coinNum = this._info.gainGoods[i].quantity;
            else if(this._info.gainGoods[i].base_id == ItemsConst.EXP) expNum = this._info.gainGoods[i].quantity;
        }
        let str = StringUtils.setParam(LangCVO.getContent("fireEye6"), 
                                       Color.GREEN_STR, this._info.findCount, 
                                       Color.GREEN_STR, this._info.findScore,
                                       Color.GREEN_STR, this._info.leftTime, 
                                       Color.GREEN_STR, this._info.timeScore,
                                       "#FD7100", expNum,
                                       "#FD7100", coinNum);
        HtmlUtil.setTextFlow(this._levelInfo, str);
        let leadStr = LangCVO.getContent("fireEye21");//（领先）
        this._otherName.text = this._info.enemyName;
        this._otherScore.text = this._info.enemyScore + (this._info.isSelfLead ? "" : leadStr);
        this._otherTime.text = cw.DateUtil.formatStr(this._info.enemyTime, cw.DateUtil.MM_SS);
        this._myScore.text = this._info.selfScore + (this._info.isSelfLead ? leadStr : "");
        this._myTime.text = cw.DateUtil.formatStr(this._info.selfTime, cw.DateUtil.MM_SS);

        Manager.render.add(this.countDown, this, 1000);
    }

    private countDown():void
	{
        this._life--;
        //{0}秒后进入下一关
        HtmlUtil.setTextFlow(this._countDown, StringUtils.setParam(LangCVO.getContent("fireEye7"), this._life));
        if(this._life == 0)
        {
            Manager.view.hide(ViewID.FireEyeLevelResultView);
            // Manager.control.getFireEye().askEnemyData();
            Manager.link.link(LinkType.PANEL_FIRE_EYE, 1);
        }
	}

    private onResizeHandler(e:GlobalEvent):void
    {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
        this.y = Math.round(Manager.global.gameMain.stage.stageHeight - this.height) / 2;
    }

    public show(info:FireEyeLevelResultInfo):void
    {
        if(!info)
        {
            Manager.view.hide(ViewID.FireEyeLevelResultView);
            return;
        }
        this._info = info;
        this._life = FireEyeConfigCVO.getCVOByID(FireEyeConfigCVO.ID_LEVEL_COUNTDOWN).value;
        HtmlUtil.setTextFlow(this._countDown, StringUtils.setParam(LangCVO.getContent("fireEye7"), this._life));
        if(!this.parent) Manager.layer.tipsLayer.addChild(this);
    }

    public hide():void
    {
        if(this.parent) this.dispose();
    }

    public dispose():void
    {
        if(Manager.render.contains(this.countDown, this)) Manager.render.remove(this.countDown, this);
        super.dispose();
        ObjectUtil.removes(this._back, this._levelInfo, this._myName, this._otherName, this._myScore, this._otherScore, this._myTime, 
                            this._otherTime, this._countDown);
        this._back = null;
        this._levelInfo.dispose();
        this._levelInfo = null;
        this._myName.dispose();
        this._myName = null;
        this._otherName.dispose();
        this._otherName = null;
        this._myScore.dispose();
        this._myScore = null;
        this._otherScore.dispose();
        this._otherScore = null;
        this._myTime.dispose();
        this._myTime = null;
        this._otherTime.dispose();
        this._otherTime = null;
        this._countDown.dispose();
        this._countDown = null;

        this._info = null;
    }
}