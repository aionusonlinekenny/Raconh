/**
 * 命格页签容器
 * pzx
 * create 17.12.25
 */
class LifeGridContainer extends UIComponent{

    private _ball8:LifeGridBallItem;
    private _ball1:LifeGridBallItem;
    private _ball2:LifeGridBallItem;
    private _ball3:LifeGridBallItem;
    private _ball4:LifeGridBallItem;
    private _ball5:LifeGridBallItem;
    private _ball6:LifeGridBallItem;
    private _ball7:LifeGridBallItem;
    private _fuwenBtn:Button;

    private _itemModel:ItemsModel;
    private _model:LifeGridModel;
    private _fighting:NumImgView2;
    private _finghtImg:eui.Image;

    private _ln:number;

    public static instince:LifeGridContainer;

    private _nextPassTxt:Label;

    private _towerImg:eui.Image;

	public constructor()
    {
        super();
        this.touchChildren = true;
        this.skinName = Manager.path.getSkinName("lifeGrid/lifegridview", "LifeGridContainerSkin");
        LifeGridContainer.instince = this;
    }
    protected configUI():void
    {
        super.configUI();
        this._itemModel = Manager.model.getItems();
        this._model = Manager.model.getLifeGrid();
        for(let i:number= 1;i<9;i++)
        {
            let item:LifeGridBallItem=this["_ball"+i];
            item.id = i;
            item.addEventListener(LifeGridEvent.LV_UPGRADE_EVENT,this.onLvLossHandler,this);
        }
        if(!this._fighting)
		{
			this._fighting = Manager.pool.create(NumImgView2);
            this._fighting.y = this._finghtImg.y + 10;
            this._fighting.x = this._finghtImg.x + 120;
			this.addChild(this._fighting);
		}
    }

    protected addEvent():void
    {
        super.addEvent();
        this._model.addEventListener(LifeGridEvent.LIFEGRID_WARE_EVENT,this.onWareHandler,this);
        this._model.addEventListener(LifeGridEvent.LIFEGRID_LVUP_EVENT,this.darwData,this);
        this._fuwenBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onOpenLifeGridListHandler,this);
        this._towerImg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.enterCopyHandler,this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
        this._model.removeEventListener(LifeGridEvent.LIFEGRID_WARE_EVENT,this.onWareHandler,this);
        this._model.removeEventListener(LifeGridEvent.LIFEGRID_LVUP_EVENT,this.darwData,this);
        this._fuwenBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onOpenLifeGridListHandler,this);
        for(let i:number= 1;i<9;i++)
        {
            let item:LifeGridBallItem=this["_ball"+i];
            item.removeEventListener(LifeGridEvent.LV_UPGRADE_EVENT,this.onLvLossHandler,this);
        }
        this._towerImg.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.enterCopyHandler,this);
    }
    private enterCopyHandler():void
    {
        Manager.view.show(ViewID.ActivityPanel, 2);
    }
    private onOpenLifeGridListHandler(e:egret.TouchEvent):void
    {
        Manager.view.show(ViewID.LifeGridListView);
    }

    private onWareHandler(e:LifeGridEvent):void
    {
        let pos:number = e.params;
        let arr:Array<ItemsModelInfo> = this._itemModel.lifeGridList;
        this["_ball"+pos].playEffect(arr[pos]);
    }

    protected initData():void
    {
        super.initData();
        this.darwData();
    }

    protected drawAll():void
	{
		super.drawAll();
	}

	protected draw():void
	{
		super.draw();
        if(this.isInvalid(InvalidationType.DATA)) this.darwData();
	}

    public setData(data):void
    {
        this.invalidate(InvalidationType.DATA);
    }

    private darwData():void{
        let arr:Array<ItemsModelInfo> = this._itemModel.lifeGridList;
        let ln:number = LifeGridType.LIFENUM + 1;
        let figt:number=0;
        this._ln = LifeGridType.LIFENUM;
        let index:number = 0;
        for(let i:number = 1;i<ln;i++)
        {
            let ball:LifeGridBallItem = this["_ball"+i];
            ball.setData(arr[i]);
            if(arr[i])
            {
                let exinfo:ExattrItemsinfo = arr[i].infoList[0];
                let cvo:LifeGridCVO = LifeGridCVO.getInfo(arr[i].base_id,exinfo.value);
                figt += cvo.fightnum;
            }
            else
            {
                if(index == 0)
                {
                    let cvo:LifeGridHoleCvoInfo = LifeGridCVO.getholeCvo(i);
                    let conticion:ConditionVO = new ConditionVO(cvo.cond);
                    if(!conticion.isSatisfy())
                    {
                        index = conticion.value2;
                    }
                }
            }
        }
        this._fighting.setValue(figt, "nums_fighting_", 25);
        if(index>0)
        {
            let str:string =StringUtils.setParam(LangCVO.getContent("lifeGrid13"),index);
            HtmlUtil.setTextFlow(this._nextPassTxt,str)
        }
        else
        {
            this._nextPassTxt.text = "";
        }
    }
    /** 打开升级界面，所有升级的小红点要消失直到命魂有更新 */
    public hideLossRedIcon():void
    {
        this._ln = 1;
        this.onLvLossHandler(null);
    }
    //**多个名格可升级，选中等级最低的命格，相同等级优先取品质越高的命格 */
    public  onLvLossHandler(e:BaseEvent):void
    {
        this._ln--;
        if(this._ln == 0)
        {
            let ln:number = LifeGridType.LIFENUM + 1;
            let n:number = 10000;
            let itemId:number = 0;
            for(let i:number = 1;i<ln;i++)
            {
                let ball:LifeGridBallItem = this["_ball"+i];
                ball.setLossRedIcon(false);
                if(ball.losslv>0)
                {
                    //取最小等级
                    n=n>ball.losslv?ball.losslv:n;
                }
            }
            if(n!=10000)
            {
                let quar:number = 0;
                for(let i:number = 1;i<ln;i++)
                {
                    let ball:LifeGridBallItem = this["_ball"+i];
                    if(ball.losslv==n)
                    {
                        if(quar < ball.getItemCvo().quality)
                        {
                            quar = ball.getItemCvo().quality;
                            itemId = ball.id;
                        }
                    }
                }
            }

            if(this._model.openLeveUpView) return;
            if(itemId>0)
            {
                this["_ball"+itemId].setLossRedIcon(true);
            }
        }
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
        ObjectUtil.disposes(this._ball1,this._ball2,this._ball3,this._ball4,this._ball5,this._ball6,this._ball7,this._ball8,this._fuwenBtn)
        this._ball8=null;
        this._ball1=null;
        this._ball2=null;
        this._ball3=null;
        this._ball4=null;
        this._ball5=null;
        this._ball6=null;
        this._ball7=null;
        this._fuwenBtn=null;

        this._itemModel=null;
        this._model=null;
        this.removeChild(this._fighting);
        Manager.pool.push(this._fighting);
        this._fighting=null;
        this.removeChild(this._finghtImg);
        this._finghtImg=null;
        LifeGridContainer.instince = null;
        this.removeChild(this._towerImg);
        this._towerImg = null;
        
    }

  
}