/**
 * 玩家血条
 * liangyan
 * create 2017-12-06
 * @update devil 2018-04-21
*/
class PlayerBloodStrip2 extends BaseRender implements IViewManager
{
    private _homeImageLayer:egret.DisplayObjectContainer;
    private _homeLayer:egret.DisplayObjectContainer;
    
    private _back:BitmapRes;
    private _strip:BitmapRes;
    private _back1:BitmapRes;
    private _back2:BitmapRes;
    private _fightLable:BitmapRes;
    private _imageHead:BitmapRemote;
    private _txtName:TextField;
    private _fightNum:NumImgView2;

    private _info:PlayerGameObjectInfo;

    public constructor()
    {
        super();
        let layer:LayerManager = Manager.layer;
        this._homeImageLayer = ObjectUtil.createConainer();
        layer.homeImageLayer.addChild(this._homeImageLayer);
        this._homeLayer = ObjectUtil.createConainer();
        layer.homeLayer.addChild(this._homeLayer);
        this.start();
        this.addEvent();
    }

    protected start():void
    {
        super.start();
        this._back = BitmapRes.create("arenaPkHeadHpBack_png",107,8);
        this._homeImageLayer.addChild(this._back);
        this._strip = BitmapRes.create("strip_red2_png",111,70,164,18);
        this._homeImageLayer.addChild(this._strip);
        this._back1 = BitmapRes.create("arenaPkHeadBack_png",0,3);
        this._homeImageLayer.addChild(this._back1);
        this._back2 = BitmapRes.create("arenaPkHeadHpPic_png",263,62);
        this._homeImageLayer.addChild(this._back2);
        this._imageHead = Manager.pool.create(BitmapRemote);
        this._imageHead.width = 100;
        this._imageHead.height = 100;
        this._imageHead.x = 10;
        this._imageHead.y = 12;
        this._homeLayer.addChild(this._imageHead);
        this._fightLable = BitmapRes.create("common_zhanli3_png",98,0);
        this._homeImageLayer.addChild(this._fightLable);
        this._txtName = TextField.create(142,25,0xffffff,22,"left");
        this._txtName.move(124,39);
        this._homeLayer.addChild(this._txtName);

        this._fightNum = Manager.pool.create(NumImgView2);
        this._fightNum.x = this._fightLable.x + 25;
        this._fightNum.y = this._fightLable.y + 2;
        this._fightNum.scaleX = this._fightNum.scaleY = 0.8;
        this._homeLayer.addChild(this._fightNum);
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
        if(this._info) this._info.removeEventListener(GameObjectAttrEvent.HP, this.__updateBlood, this);
    }

    protected drawAll():void
    {
        super.drawAll();
        this.drawData();
        this.drawBlood();
        this.layout(Manager.config.gameWidth,Manager.config.gameHeight);
    }

    protected draw():void
    {
        super.draw();
        if(this.isInvalid(InvalidationType.DATA))this.drawData();
        if(this.isInvalid("drawBlood"))this.drawBlood();
    }

    private drawData():void
    {
        this._txtName.text = this._info.attrInfo.nickName;
        this._imageHead.load(Manager.path.getRoleHeadPath(2, this._info.attrInfo.career));
        this._fightNum.setValue(this._info.attrInfo.fight, "nums_fighting_", 20);
        this._info.addEventListener(GameObjectAttrEvent.HP, this.__updateBlood, this);
    }

    private drawBlood():void
    {
        this._strip.width = (this._info.attrInfo.hp / this._info.attrInfo.hpMax) * 164;
    }

    private layout(gameWidth:number,gameHeight:number):void
    {
        this._homeImageLayer.x  = Math.round(gameWidth - 295) / 2;
        this._homeImageLayer.y = 200;
        this._homeLayer.x = this._homeImageLayer.x;
        this._homeLayer.y = this._homeImageLayer.y;
    }

    private __updateBlood(e?:GameObjectAttrEvent):void
    {
        this.invalidate("drawBlood");
    }

    private onResizeHandler(e:GlobalEvent):void
    {
        this.layout(Manager.config.gameWidth,Manager.config.gameHeight);
    }

    public show(info:PlayerGameObjectInfo):void
    {
        if(this._info) this._info.removeEventListener(GameObjectAttrEvent.HP, this.__updateBlood, this);
        this._info = info;
        this.invalidate(InvalidationType.DATA);
        this.invalidate("drawBlood");
    }

    public hide():void
    {
        this.dispose();
    }

    public dispose():void
    {
        super.dispose();
        this.removeEvent();
        
        this._homeImageLayer.parent.removeChild(this._homeImageLayer);
        this._homeImageLayer = null;
        this._homeLayer.parent.removeChild(this._homeLayer);
        this._homeLayer = null;

        this._back.pool();
        this._back = null;
        this._strip.pool();
        this._strip = null;
        this._back1.pool();
        this._back1 = null;
        this._back2.pool();
        this._back2 = null;
        this._fightLable.pool();
        this._fightLable = null;
        this._imageHead.pool();
        this._imageHead = null;
        this._txtName.pool();
        this._txtName = null;
        this._fightNum.dispose();
        this._fightNum = null;
        this._info = null;
    }
}