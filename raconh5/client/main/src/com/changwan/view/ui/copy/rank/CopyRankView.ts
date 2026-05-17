/**
 * 副本排行界面
 * luzhihong
 * create 2017-12-1
 */
class CopyRankView extends UIComponent implements IViewManager
{
    private _labelValue:eui.Image;
    private _list:BaseVScrollerList;
    private _txtRank:Label;
    private _txtValue:Label;
    private _btnClose:Button;
    private _rankInfos:Array<CopyRankInfo>;
    private _id:number;//副本ID

    private _bgImg:BitmapRemote;
    
    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("copy", "CopyRankSkin");
        this.touchChildren = true;
    }

    protected configUI():void
    {
        super.configUI();

        if(!this._bgImg)
		{
			this._bgImg = Manager.pool.create(BitmapRemote);
			this._bgImg.x = 0;
			this._bgImg.y = 776;
			this._bgImg.load(PathInfo.getPath("res/common/panel_bg2.png", LoaderType.IMAGE), 720, 130);
			this.addChildAt(this._bgImg, 3);
		}
        
		this._list.initBtnListData(CopyRankItem, null, true);
		(<eui.VerticalLayout>this._list.itemList.layout).gap = -5;

        this.onResizeHandler(null);
    }
    
    private getRank():void
    {
        Manager.control.getCopy().getRank(this._id, 1);
    }
    /** 
	 * @param id 副本ID
    */
    public show(id:number):void
    {
        this._id = id;
        if(this.parent == null)
        {
            Manager.layer.tipsLayer.addChild(this);
        }
        else this.getRank();
    }

    public hide():void
    {
        this.dispose();
    }

    protected addEvent():void
    {
        super.addEvent();

        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getCopy().addEventListener(CopyEvent.UPDATE_RANK, this.updateRank, this);
        this.getRank();
    }

    protected removeEvent():void
    {
        super.removeEvent();

        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        Manager.model.getCopy().removeEventListener(CopyEvent.UPDATE_RANK, this.updateRank, this);
    }

    private updateRank(e:CopyEvent):void
    {
        //[id, index, infos]
        if(e.params[0] == this._id)
        {
            this._rankInfos = e.params[2];
            this.invalidate("updateRank");
        }
    }

    private drawRank():void
    {
		this._list.dataProvider(this._rankInfos);

        let myInfo:CopyRankInfo;
        for(let i:number=this._rankInfos.length-1; i>=0; i--)
        {
            if(this._rankInfos[i].id == Manager.model.self.id) 
            {
                myInfo = this._rankInfos[i];
                break;
            }
        }
        if(myInfo)
        {
            this._txtRank.text = "排名：" + myInfo.rank;
            this._txtValue.text = "当前：" + myInfo.value;
        }
        else 
        {
            this._txtRank.text = "排名：" + "未上榜";
            this._txtValue.text = "当前：" + this.getMyValue();
        }
    }

    private getMyValue():number
    {
        if(this._id == CopyConst.ID_MAIN) return CopyCVO.getCVO(this._id).cell;
        return 0;
    }

	protected draw():void
	{
		super.draw();
		if(this.isInvalid("updateRank")) this.drawRank();
	}

    protected drawAll():void
    {
        super.drawAll();
    }

    private onResizeHandler(e:GlobalEvent):void
	{
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
		Manager.view.hide(ViewID.CopyRankView);
	}

	public dispose():void
	{
		super.dispose();
		ObjectUtil.removes(this._labelValue, this._bgImg);
		this._labelValue = null;
        if(this._bgImg)
            Manager.pool.push(this._bgImg);
        this._bgImg = null;
		this._list.dispose();
    	this._list = null;
		this._txtRank.dispose();
    	this._txtRank = null;
		this._txtValue.dispose();
    	this._txtValue = null;
		this._btnClose.dispose();
    	this._btnClose = null;
        this._rankInfos = null;
	}
}