/**
 * boss血条
 * liangyan
 * create 2017-12-06
 * @update devil 2018-04-19
*/
class BossBloodStrip2 extends BaseRender implements cw.IDispose,IViewManager
{

    private _imageLayer:egret.DisplayObjectContainer;
    private _layer:egret.DisplayObjectContainer;

    private _back:BitmapRes;
    private _back1:BitmapRes;
    private _nameTxt:TextField;
    private _bossHead:BitmapRemote;
    private _blood:BaseBossBlood2;
    private _hurtRankView:BossRankView;

    private _info:MonsterGameObjectInfo;

    public constructor()
    {
        super();
        let layer:LayerManager = Manager.layer;
        this._imageLayer = ObjectUtil.createConainer();
        layer.homeImageLayer.addChild(this._imageLayer);
        this._layer = ObjectUtil.createConainer();
        layer.homeLayer.addChild(this._layer);
    }

    public setVisible(visible:boolean):void
    {
        if(visible)
        {
            if(!this._imageLayer.parent)
            {
                let layer:LayerManager = Manager.layer;
                layer.homeLayer.addChild(this._layer);
                layer.homeImageLayer.addChild(this._imageLayer);
            }
        }
        else
        {
            if(this._imageLayer.parent)
            {
                this._imageLayer.parent.removeChild(this._imageLayer);
                this._layer.parent.removeChild(this._layer);
            }
        }

    }

    protected start():void
    {
        super.start();
        this._back = BitmapRes.create("boss_blood_bg_png");
        this._imageLayer.addChild(this._back);
        this._blood = new BaseBossBlood2(this._imageLayer,this._layer,this._info);
        this._blood.move(116,45);
        this._back1 = BitmapRes.create("boss_blood_figure_png",104,34,435);
        this._back1.scale9Grid = new egret.Rectangle(35,19,11,10);
        this._imageLayer.addChild(this._back1);
        this._nameTxt = TextField.create(400,25,0xfffbeb,22);
        this._nameTxt.move(114,13);
        HtmlUtil.setTextFlow(this._nameTxt, this._info.cvo.nameHtml + " Lv：" + this._info.level);
        this._layer.addChild(this._nameTxt);
        this._bossHead = Manager.pool.create(BitmapRemote,Manager.path.getBossHeadPath(this._info.cvo.url));
        this._bossHead.x = 9;
        this._bossHead.y = -15;
        this._layer.addChild(this._bossHead);
    }

    protected  addEvent():void
    {
        super.addEvent();
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    }

    public show(info:MonsterGameObjectInfo):void
    {
        this._info = info;
        this.start();
        this.addEvent();
        this.layout();
    }

    private onResizeHandler(e:GlobalEvent):void
    {
        this.layout();
    }

    private layout():void
    {
        this._imageLayer.x = Math.round(Manager.global.gameMain.stage.stageWidth - 539) / 2;
        this._imageLayer.y = 170;
        this._layer.x = this._imageLayer.x;
        this._layer.y = this._imageLayer.y;
    }

    public hide():void
    {
        this.dispose();
    }

    protected draw():void
    {
        super.draw();
        if(this.isInvalid("drawBlood")) this.drawBlood();
    }

    protected drawAll():void
    {
        super.drawAll();
        this.drawBlood();
    }

    public updateBlood():void
    {
        this.invalidate("drawBlood");
    }

    private drawBlood():void
    {
        this._blood.updateBlood();
    }

    public dispose():void
    {
        super.dispose();
        this.removeEvent();
        this.removeHurtRankView();
        this._back.pool();
        this._back = null;
        this._back1.pool();
        this._back1 = null;
        this._nameTxt.pool();
        this._nameTxt = null;
        this._bossHead.pool();
        this._bossHead = null;
        this._blood.dispose();
        this._blood = null;
        this._info = null;
        if(this._imageLayer.parent)this._imageLayer.parent.removeChild(this._imageLayer);
        this._imageLayer = null;
        if(this._layer.parent)this._layer.parent.removeChild(this._layer);
        this._layer = null;
    }

    public addHurtRankView(list:Array<BossPlayerInfo>, type:number):void
    {
        if(this._hurtRankView == null)
        {
            this._hurtRankView = new BossRankView(type);
            this._hurtRankView.x = 115;
            this._hurtRankView.y = 75;
            this._imageLayer.addChild(this._hurtRankView);
        }
        this._hurtRankView.updateList(list);
    }
    public removeHurtRankView():void
    {
        if(this._hurtRankView)
        {
            this._hurtRankView.dispose();
            this._hurtRankView = null;
        }
    }
}