/**
 * pzx 
 * 猎命
 * 17.12.29
 */
class LifeGridHunt extends UIComponent{
    private _resImg1:eui.Image;
    private _resImg0:eui.Image;
    private _hontBtn:Button;
    private _hontTenBtn:Button;
    private _cdTxt:Label;
    private _lossTxt1:Label;
    private _lossTxt0:Label;
    private _model:LifeGridModel;
    private _itemModel:ItemsModel;
    private _redIcon:eui.Image;
    private _bgimg1:eui.Image;
	public constructor()
    {
        super();
        this.touchChildren = true;
        this.skinName = Manager.path.getSkinName("lifeGrid/LifeGridHunt", "LifeGridHuntSkin");
    }
    protected configUI():void
    {
        super.configUI();
        this._model = Manager.model.getLifeGrid();
        this._itemModel = Manager.model.getItems();

    }

    protected addEvent():void
    {
        this._hontBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onHontHandler,this);
        this._hontTenBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onHontHandler,this);
        this._model.addEventListener(LifeGridEvent.LIFEGRID_UPDATE_FREECD_EVENT,this.drawData,this);
        super.addEvent();
    }

    protected removeEvent():void
    {
        super.removeEvent();
        this._hontBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onHontHandler,this);
        this._hontTenBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onHontHandler,this);
        this._model.removeEventListener(LifeGridEvent.LIFEGRID_UPDATE_FREECD_EVENT,this.drawData,this);
    }
    private onHontHandler(e:egret.TouchEvent):void
    {
        let btn:Button = e.target;
        if(btn == this._hontBtn)
        {
            if(this._itemModel.lifeGridTotal-this._itemModel.lifeGridBagList.length<2)
            {
                // Manager.tips.showTips(LangCVO.getContent("lifeGrid9"),this._callBackFunction);
                let ok:CallBackInfo = Manager.pool.create(CallBackInfo,LifeGridView.view.setTap,LifeGridView.view,LifeGridType.RESOLVE);
                Manager.tips.showTips(LangCVO.getContent("lifeGrid9"),ok);
                return;
            }
            let second:number = Math.round(this._model.freeCd - Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
            if(second <= 0)
            {
                 Manager.control.getLifeGrid().hount(1);
                 return
            }
            let cvos1:LifeGridHuntCvoInfo = LifeGridCVO.getHuntCvo(LifeGridType.HUNT_ITEM);
            let loss1:GainLossVO = new GainLossVO(cvos1.loss);
            if(loss1.isEnough())
            {
                Manager.control.getLifeGrid().hount(2);
            }
            else
            {
                cvos1 = LifeGridCVO.getHuntCvo(LifeGridType.HUNT_CVO);
                loss1 = new GainLossVO(cvos1.loss);
                if(loss1.isEnough())
                {
                    Manager.control.getLifeGrid().hount(3);
                }
                else{
                    FloatTips.addTips(LangCVO.getContent("common33"),Color.RED);
                }
            }
            

        }
        if(btn == this._hontTenBtn)
        {
            if(this._itemModel.lifeGridTotal-this._itemModel.lifeGridBagList.length<10)
            {
                // Manager.tips.showTips(LangCVO.getContent("lifeGrid9"),this._callBackFunction);
                let ok:CallBackInfo = Manager.pool.create(CallBackInfo,LifeGridView.view.setTap,LifeGridView.view,LifeGridType.RESOLVE);
                Manager.tips.showTips(LangCVO.getContent("lifeGrid9"),ok);
                return;
            }
            let cvos1:LifeGridHuntCvoInfo = LifeGridCVO.getHuntCvo(LifeGridType.HUNT_TEN_ITEM);
            let loss1:GainLossVO = new GainLossVO(cvos1.loss);
            if(loss1.isEnough())
            {
                Manager.control.getLifeGrid().hount(5);
            }
            else
            {
                cvos1 = LifeGridCVO.getHuntCvo(LifeGridType.HUNT_TEN_CVO);
                loss1 = new GainLossVO(cvos1.loss);
                if(loss1.isEnough())
                {
                    Manager.control.getLifeGrid().hount(4);
                }
                else{
                    FloatTips.addTips(LangCVO.getContent("common33"),Color.RED);
                }
            }
        }
    }

    protected initData():void
    {
        super.initData();
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

    public setData(data):void
    {
        this.invalidate(InvalidationType.DATA);
    }

    private drawData():void{

       let cvos1:LifeGridHuntCvoInfo = LifeGridCVO.getHuntCvo(LifeGridType.HUNT_TEN_ITEM);
       let loss1:GainLossVO = new GainLossVO(cvos1.loss);
       if(loss1.isEnough())
       {
           this._resImg0.source = "LifeGrid_Item_png";
            this._lossTxt0.text = "" + loss1.num;
           //this._lossTxt0.text = loss1.selfCount + "/" + loss1.num;
       }
       else
       {
           this._resImg0.source = "playRes_gold_54_png";
           cvos1 = LifeGridCVO.getHuntCvo(LifeGridType.HUNT_TEN_CVO);
           loss1 = new GainLossVO(cvos1.loss);
           this._lossTxt0.text = "" + loss1.num;
           //this._lossTxt0.text = loss1.selfCount + "/" + loss1.num;
        //    if(!loss1.isEnough())
        //    {
        //        let str:string = HtmlUtil.addColorTag("" + loss1.selfCount,Color.RED_STR)+"/" + loss1.num;
        //        HtmlUtil.setTextFlow(this._lossTxt0,str);
        //    }
       }
       this._lossTxt0.width = this._lossTxt0.textWidth;

       let second:number = Math.round(this._model.freeCd - Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
       if(second>0)
       {
           Manager.render.add(this.countdown, this, 1000);
           this._resImg1.visible = true;
           this._lossTxt1.visible = true;
           this._bgimg1.visible = true;
            this._redIcon.visible = false;
       }
       else
       {
           this.setIsFree();
           return;
       }
       let cvos:LifeGridHuntCvoInfo = LifeGridCVO.getHuntCvo(LifeGridType.HUNT_ITEM);
       let loss:GainLossVO = new GainLossVO(cvos.loss);
       if(loss.isEnough())
       {
           this._resImg1.source = "LifeGrid_Item_png";
           this._lossTxt1.text = "" + loss.num;
           //this._lossTxt1.text = loss.selfCount + "/" + loss.num;
       }
       else
       {
           this._resImg1.source = "playRes_gold_54_png";
           cvos = LifeGridCVO.getHuntCvo(LifeGridType.HUNT_CVO);
           loss = new GainLossVO(cvos.loss);
           this._lossTxt1.text = "" + loss.num;
           //this._lossTxt1.text = loss.selfCount + "/" + loss.num;
        //    if(!loss.isEnough())
        //    {
        //        let str:string = HtmlUtil.addColorTag("" + loss.selfCount,Color.RED_STR)+"/" + loss.num;
        //        HtmlUtil.setTextFlow(this._lossTxt1,str);
        //    }
       }

    }

    private countdown():void
    {
        let second:number = Math.round(this._model.freeCd - Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
        if(second <= 0)
        {
            this.setIsFree();
            Manager.render.remove(this.countdown, this);
            return;
        }
        this._cdTxt.text = cw.DateUtil.formatStr(second, cw.DateUtil.LEFT_HH_MM_SS, true) + LangCVO.getContent("lifeGrid7");
    }

    private setIsFree():void
    {
        this._cdTxt.text = LangCVO.getContent("lifeGrid8");//本次免费
        this._resImg1.visible = false;
        this._lossTxt1.visible = false;
        this._redIcon.visible = true;
        this._bgimg1.visible = false;
    }


    public reuse():void
    {
        super.reuse();
       
    }

    public unuse():void
    {
        super.unuse();
       
    }

    public dispose():void
    {
        super.dispose();
        if(Manager.render.contains(this.countdown,this)) Manager.render.remove(this.countdown, this);
        ObjectUtil.removes(this._resImg0,this._resImg1,this._redIcon,this._bgimg1);
         ObjectUtil.disposes(this._hontBtn,this._hontTenBtn,this._lossTxt0,this._lossTxt1);
         this._bgimg1 = null;
        this._resImg1=null;
        this._resImg0=null;
        this._hontBtn=null;
        this._hontTenBtn=null;
        this._cdTxt=null;
        this._lossTxt1=null;
        this._lossTxt0=null;
        this._model=null;
        this._itemModel=null;
        this._redIcon = null;
        
    }
}