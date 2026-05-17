/**
 *author Anydo
 *create 2018-1-8
 *description 
*/
class ArenaPKHeadView extends UIComponent
{
    private _strip1:eui.Image;
    private _strip2:eui.Image;
	private _txtName1:Label;
	private _txtName2:Label;
    private _fightLable1:eui.Image;
    private _fightLable2:eui.Image;
    private _fightNum1:NumImgView2;
    private _fightNum2:NumImgView2;
    private _imageHead1:BitmapRemote;
    private _imageHead2:BitmapRemote;
    
    private _info1:AliveGameObjectInfo;
    private _info2:AliveGameObjectInfo;

    private WIDTH:number = 720;
    private FIGHT_SCALE:number = 0.8;

    public constructor()
    {
		super();
		this.skinName = Manager.path.getSkinName("arena", "ArenaPKHeadViewSkin");
	}

    protected configUI():void
	{
		super.configUI();
        this._fightNum1 = Manager.pool.create(NumImgView2);
        this._fightNum1.y = 13;
        this._fightNum1.scaleX = this._fightNum1.scaleY = this.FIGHT_SCALE;
        this.addChild(this._fightNum1);
        this._fightNum2 = Manager.pool.create(NumImgView2);
        this._fightNum2.y = 13;
        this._fightNum2.scaleX = this._fightNum2.scaleY = this.FIGHT_SCALE;
        this.addChild(this._fightNum2);

        this._info1.addEventListener(GameObjectAttrEvent.HP, this.__updateBlood1, this);
        this._info2.addEventListener(GameObjectAttrEvent.HP, this.__updateBlood2, this);
        this._fightNum1.setValue(this._info1.attrInfo.fight, "nums_fighting_", 20);
        this._fightNum2.setValue(this._info2.attrInfo.fight, "nums_fighting_", 20);
        this._fightNum1.x = this._fightLable1.x + 25;
        this._fightNum2.x = 610 - (String(this._info2.attrInfo.fight).length * 23) * this.FIGHT_SCALE;
        this._fightLable2.x = this._fightNum2.x - 25;

        if(this._info1 instanceof MonsterGameObjectInfo)
        {
            this._txtName1.text = (this._info1 as MonsterGameObjectInfo).cvo.name;
            this._imageHead1.load(Manager.path.getBossHeadPath((this._info1 as MonsterGameObjectInfo).cvo.url, "c"));
        }
        else 
        {
            this._txtName1.text = this._info1.attrInfo.nickName;
            this._imageHead1.load(Manager.path.getRoleHeadPath(2, this._info1.attrInfo.career));
        }
        if(this._info2 instanceof MonsterGameObjectInfo)
        {
            this._txtName2.text = (this._info2 as MonsterGameObjectInfo).cvo.name;
            this._imageHead2.load(Manager.path.getBossHeadPath((this._info2 as MonsterGameObjectInfo).cvo.url, "c"));
        }
        else 
        {
            this._txtName2.text = this._info2.attrInfo.nickName;
            this._imageHead2.load(Manager.path.getRoleHeadPath(2, this._info2.attrInfo.career));
        }

        if(this._info2 instanceof SelfGameObjectInfo)
        {
            this._strip1.source = "strip_red2_png";
            this._strip2.source = "strip_green2_png";
        }
        else 
        {
            this._strip1.source = "strip_green2_png";
            this._strip2.source = "strip_red2_png";
        }

        this.__updateBlood1(null);
        this.__updateBlood2(null);
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
		this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.WIDTH) / 2;
	}
    
    private __updateBlood1(e:GameObjectEvent):void
    {
        this._strip1.width = (this._info1.attrInfo.hp / this._info1.attrInfo.hpMax) * 164;
    }
    
    private __updateBlood2(e:GameObjectEvent):void
    {
        this._strip2.width = (this._info2.attrInfo.hp / this._info2.attrInfo.hpMax) * 164;
    }

    public show(selfInfo:AliveGameObjectInfo, enemyInfo:AliveGameObjectInfo):void
	{
        this._info1 = selfInfo;
        this._info2 = enemyInfo;
        this.onResizeHandler(null);
		Manager.layer.tipsLayer.addChild(this);
	}
    
    public hide():void
	{
        ObjectUtil.remove(this);
		this.dispose();
	}

    public dispose()
	{
		if(this._info1 != null) this._info1.removeEventListener(GameObjectAttrEvent.HP, this.__updateBlood1, this);
		if(this._info2 != null) this._info2.removeEventListener(GameObjectAttrEvent.HP, this.__updateBlood2, this);
        this._info1 = null;
        this._info2 = null;
		super.dispose();
		if(this._loadComplete)
		{
			this._txtName1.dispose();
			this._txtName1=null;
			this._txtName2.dispose();
			this._txtName2=null;
            if(this._fightNum1)
                Manager.pool.push(this._fightNum1);
			this._fightNum1=null;
            if(this._fightNum2)
                Manager.pool.push(this._fightNum2);
			this._fightNum2=null;
			this._fightLable2 = null;
			this._fightLable1 = null;
            this._imageHead1.dispose();
            this._imageHead1 = null;
            this._imageHead2.dispose();
            this._imageHead2 = null;

			this._strip1= null;
			this._strip2 =null;
		}
	}
}