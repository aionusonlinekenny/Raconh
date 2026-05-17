/**
 * 副本信息界面
 * luzhihong
 * create 2017-12-5
 */
class CopyInfoView extends UIComponent implements IViewManager
{
    private _txtTitle:Label;
    private _txt0:Label;
    private _txt1:Label;
    private _cvo:CopyCVO;//副本cvo
    
    private _timeoutID:number;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("copy", "CopyInfoViewSkin");
    }
    /** 
	 * @param id 副本ID
    */
    public show(id:number):void
    {
        Manager.render.remove(this.countdown, this);
        Manager.render.remove(this.materialCountDown, this);
        this._cvo = CopyCVO.getCVO(id);
        if(this.parent == null)
        {
            Manager.layer.uiLayer.addChild(this);
        }
        if(this._loadComplete && this._cvo.type == CopyConst.TYPE_TOWER)  this.setTower();
    }

    public hide():void
    {
        this.dispose();
    }

    protected configUI():void
    {
        super.configUI();
        HtmlUtil.setTextFlow(this._txt1, LangCVO.getContent("boss5") + HtmlUtil.addColorTag(this._cvo.awardDesc, Color.GREEN_STR));//奖励：
        if(this._cvo.type == CopyConst.TYPE_MAIN)
        {
            let mainCVO:MainCopyCVO = MainCopyCVO.getCVO(this._cvo.cell + 1);
            if(mainCVO == null) mainCVO = MainCopyCVO.getCVO(this._cvo.cell);
            this._txtTitle.text = mainCVO.name;
            HtmlUtil.setTextFlow(this._txt0, LangCVO.getContent("boss6") + HtmlUtil.addColorTag(mainCVO.monCVO.name, Color.GREEN_STR));//通关：
        }
        else if(this._cvo.type == CopyConst.TYPE_BOSS_PRIVATE)
        {
            this._txt0.y = 35;
            this._txt1.y = 66;
            Manager.render.add(this.countdown, this, 1000);
            this.countdown();
        }
        else if(this._cvo.type == CopyConst.TYPE_TOWER) this.setTower();
        else if(this._cvo.type == CopyConst.TYPE_MATERIAL) this.setMaterialInfo();
        this.onResizeHandler(null);
    }

    private setTower():void
    {
        let model = Manager.model.getCopy().towerModel;
        let towerCVO = TowerCopyCVO.getCVO(model.curLvl + 1);
        if(towerCVO == null) towerCVO = TowerCopyCVO.getCVO(model.curLvl);
        //播放boss动画
        if(towerCVO.isBoss) this._timeoutID = egret.setTimeout(this.showTouwerCopyBossView,this, 1000);
        
        this._txtTitle.text = LangCVO.getContent("copy1", towerCVO.cell);//第{0}关
        let htmlStr = HtmlUtil.addColorTag(towerCVO.monster.name, Color.GREEN_STR);
        HtmlUtil.setTextFlow(this._txt0, LangCVO.getContent("copy3") + htmlStr);//挑战：
        htmlStr = HtmlUtil.addColorTag(LangCVO.getContent("copy4"), Color.GREEN_STR);////命格、命魂
        HtmlUtil.setTextFlow(this._txt1, LangCVO.getContent("boss5") + htmlStr);
    }

    private showTouwerCopyBossView():void
    {
        Manager.view.show(ViewID.TowerCopyBossView)
    }

    private setMaterialInfo():void
    {
        let copyCVO:CopyCVO = CopyCVO.getCVO(CopyConst.ID_MATERIAL);
        if(copyCVO)
        {
            let info:MaterialCopyCVO = MaterialCopyCVO.getCellInfo(copyCVO.cell + 1);
            if(info)
            {
                this._txtTitle.text = info.name;
            }
            Manager.render.add(this.materialCountDown, this, 1000);
            this.materialCountDown();

            let htmlStr:string = HtmlUtil.addColorTag(LangCVO.getContent("copy28"), Color.GREEN_STR);////绝学、铸魂
            HtmlUtil.setTextFlow(this._txt1, LangCVO.getContent("boss5") + htmlStr);
        }
    }

    private materialCountDown():void
    {
        let htmlStr:string;
        if(this._cvo.leftTime > 10)
            htmlStr = HtmlUtil.addColorTag(cw.DateUtil.formatStr(this._cvo.leftTime, cw.DateUtil.LEFT_MM_SS, true), Color.GREEN_STR);
        else
            htmlStr = HtmlUtil.addColorTag(cw.DateUtil.formatStr(this._cvo.leftTime, cw.DateUtil.LEFT_MM_SS, true), Color.RED_STR);
        HtmlUtil.setTextFlow(this._txt0, LangCVO.getContent("copy26") + htmlStr);
    }

    private countdown():void
    {
        let str:string = cw.DateUtil.formatStr(this._cvo.leftTime, cw.DateUtil.LEFT_MM_SS, true);
        str = HtmlUtil.addColorTag(str, Color.GREEN_STR);
        HtmlUtil.setTextFlow(this._txt0, LangCVO.getContent("boss4") + str);//倒计时：
    }

    protected addEvent():void
    {
        super.addEvent();

        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    }

    protected removeEvent():void
    {
        super.removeEvent();

        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    }

    private onResizeHandler(e:GlobalEvent):void
	{
        this.x = Manager.config.gameWidth - this.parent.x - this.width;
	}

    public dispose():void
    {
        egret.clearTimeout(this._timeoutID);
        Manager.render.remove(this.countdown, this);
        Manager.render.remove(this.materialCountDown, this);
        super.dispose();
        ObjectUtil.disposes(this._txtTitle, this._txt0, this._txt1)
        this._txtTitle = null;
        this._txt0 = null;
        this._txt1 = null;
        this._cvo = null;
    }
}