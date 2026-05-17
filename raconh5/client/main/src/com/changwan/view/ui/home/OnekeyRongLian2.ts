/**
 * 主界面右上角小地图视图
 * luzh
 * create 2018.2.27
 * @update devil 2018-04-15
*/
class OnekeyRongLian2 extends BaseRender
{
    private _imageContainer:egret.DisplayObjectContainer;
    private _back1:BitmapRes;
    private _back2:BitmapRes;
    private _btn:ButtonImage;
    private _visible:boolean;

    public constructor(imageContainer:egret.DisplayObjectContainer)
    {
        super();
        this._visible = false;
        this._contentWidth = 720;
        this._contentHeight = 258;
        this._imageContainer = ObjectUtil.createConainer();
        imageContainer.addChild(this._imageContainer);
        this.start();
        this.addEvent();
    }

    protected start():void
    {
        this._visible = false;
        this._contentWidth = 720;
        this._contentHeight = 258;
        super.start();
    }

	private onClickHandler(e:egret.TouchEvent):void
	{
        if(Manager.model.getMap().mapCVO.type == MapConst.TYPE_COPY || Manager.model.getMap().mapCVO.type == MapConst.TYPE_BOSS)
            Manager.model.getBag().quickRonglian();
        else
            Manager.view.show(ViewID.BagPanel, 2);
	}

	public switch(visible:boolean):void
	{
        if(this._visible == visible)return;
        this._visible = visible;
		if(visible)
		{
            this._back1 = BitmapRes.create("common_rect_1_png",436,33,182,83);
            this._back1.scale9Grid = new egret.Rectangle(6,6,38,38);
            this._imageContainer.addChild(this._back1);

            this._btn = ButtonImage.create(this._imageContainer, "common_btn1_2_png", "", "main_onkeyRonglian_png", this.onClickHandler, this, 182,83, 436, 33);
            
            this._back2 = BitmapRes.create("main_rl_jiantou_png",476,105,112,33);
            this._imageContainer.addChild(this._back2);
        }
        else
        {
            Manager.pool.push(this._back1);
            this._back1 = null;
            Manager.pool.push(this._back2);
            this._back2 = null;
            Manager.pool.push(this._btn);
            this._btn = null;
        }
	}

    public layout(gameWidth:number,gameHeight:number):void
    {
        this._imageContainer.x = (gameWidth - this._contentWidth) >> 1;
        this._imageContainer.y = gameHeight - this._contentHeight;
    }
}