/**
 * 云转场效果
 * liangyan
 * create 2018-03-06
*/
class CloudTransferEffect extends UIComponent implements IViewManager
{
    private _cloud0:BitmapRemote;
    private _cloud1:BitmapRemote;
    private _cloud2:BitmapRemote;

    private readonly CLOUD_WIDTH:number = 512;

    public constructor()
    {
        super();
        this.skinName = "";
    }

    protected configUI():void
    {
        super.configUI();
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
        this.onResizeHandler(null);
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
        egret.Tween.removeTweens(this);
        egret.Tween.get(this._cloud0, {loop: false}).to({x:Manager.global.gameMain.stage.stageWidth}, 2000);
        egret.Tween.get(this._cloud1, {loop: false}).to({x:Manager.global.gameMain.stage.stageWidth}, 2000);
        egret.Tween.get(this._cloud2, {loop: false}).to({x:-this.CLOUD_WIDTH * 10}, 2000).call(Manager.view.hide,Manager.view,[ViewID.CloudTransferEffect]);
    }

    private onResizeHandler(e:GlobalEvent):void
    {
        this.width = Manager.global.gameMain.stage.stageWidth;
        this.height = Manager.global.gameMain.stage.stageHeight;
    }

    public show():void
    {
        if(!this.parent) Manager.layer.uiLayer.addChild(this);

        let path = Manager.path.getTaskPath("cloud/cloud.png");

        this._cloud0 = Manager.pool.create(BitmapRemote, path);
        this._cloud0.scaleX = this._cloud0.scaleY = 3;
        this._cloud0.x = -this.CLOUD_WIDTH * 3;
        this._cloud0.y = -300;
        this.addChild(this._cloud0);

        this._cloud1 = Manager.pool.create(BitmapRemote, path);
        this._cloud1.scaleX = this._cloud1.scaleY = 10;
        this._cloud1.x = -this.CLOUD_WIDTH * 10;
        this._cloud1.y = 0;
        this.addChild(this._cloud1);

        this._cloud2 = Manager.pool.create(BitmapRemote, path);
        this._cloud2.scaleX = this._cloud2.scaleY = 20;
        this._cloud2.x = this.CLOUD_WIDTH * 2;
        this._cloud2.y = -2000;
        this.addChild(this._cloud2);
    }

    public hide():void
    {
        Manager.control.getMap().cmdEnterMap(MapConst.ID_ROOKIE_STORY_II);
        if(this.parent) this.dispose();
    }

    public dispose():void
    {
        super.dispose();
        egret.Tween.removeTweens(this);
        ObjectUtil.removes(this._cloud0, this._cloud1, this._cloud2);
        if(this._cloud0) Manager.pool.push(this._cloud0);
        this._cloud0 = null;
        if(this._cloud1) Manager.pool.push(this._cloud1);
        this._cloud1 = null;
        if(this._cloud2) Manager.pool.push(this._cloud2);
        this._cloud2 = null;
    }
}