/**
 * 寻宝信息列表
 * pzx 
 * create 18.2.7
 */
class ArtifactInfoListView extends UIComponent{
	private _closeImg:eui.Image;
	private _scroll:BaseVScrollerList;
    private _model:ArtifactModel;
	public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("artifact", "ArtifactInfoListViewSkin");
		this.visible = false;
        this.touchChildren = true;
    }
	protected configUI():void
    {
        super.configUI();
        this._model = Manager.model.getArtifact();
        Manager.control.getArtifact().selfLog();
        this.onResizeHandler(null);
        this._scroll.initBtnListData(ArtifactInfoListItem,[],true);
    }
	protected addEvent():void
    {
		super.addEvent();
        this._model.addEventListener(ArtifactEvent.ARTIFACT_LOG_EVENT,this.drawData,this);
		this._closeImg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchCloseHandler,this);
         GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    }

    protected removeEvent():void
    {
         GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		 this._closeImg.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchCloseHandler,this);
         this._model.removeEventListener(ArtifactEvent.ARTIFACT_LOG_EVENT,this.drawData,this);
		 super.removeEvent();
    }
	private onResizeHandler(e:GlobalEvent):void
	{
		this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
        if(!this.visible)
        this.visible = true;
	}
	protected drawAll():void
	{
		super.drawAll();
        this.drawData();
	}

    private drawData():void{
        let arr:Array<ArtifactSelfLogInfo>= Manager.model.getArtifact().getSelfList();
        if(arr)
        {
            this._scroll.dataProvider(arr);
        }
    }
	public show()
	{
		Manager.layer.tipsLayer.addChild(this);
	}
	public hide():void
    {
        this.dispose();
    }
	
	protected onTouchCloseHandler(e:egret.TouchEvent):void
    {
        Manager.view.hide(ViewID.ArtifactInfoListView);
    }


    public dispose():void
    {
        super.dispose();
        this._closeImg.parent.removeChild(this._closeImg);
        this._scroll.dispose();
        this._closeImg=null;
	    this._scroll=null;
    }
}