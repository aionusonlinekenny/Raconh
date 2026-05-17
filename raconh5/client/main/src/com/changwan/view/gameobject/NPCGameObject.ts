/**
 * npc对象视图类
 * chenhuang
 * create  
 * update devil 2017-11-07
*/
class NPCGameObject extends GameObject
{
     private _npcGameObjectInfo:NPCGameObjectInfo;
     private _txtName:egret.TextField;
     private _elementShow:ElementNoAliveAnimation;
     private _headIcon:BitmapRemote;

     public constructor()
     {
        super();
     }

    public start():void
    {
        super.start();
        this._elementShow = Manager.pool.create(ElementNoAliveAnimation, this);
    }

	protected addEvent():void
	{
        super.addEvent();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
	}

	protected removeEvent():void
	{
		super.removeEvent();
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
	}

    private onClickHandler(e:egret.TouchEvent):void
    {
        // if(this._npcGameObjectInfo && this._npcGameObjectInfo.cvo && this._npcGameObjectInfo.cvo.link != null)
        // {
        //     Manager.link.linkStr(this._npcGameObjectInfo.cvo.link);
        // }
        if(Manager.model.getMap().isInRookieMap()) return;//新手地图中屏蔽点击NPC，防止打断流程
        Manager.walk.moveToNPC(this._npcGameObjectInfo.cvo);
    }

    public reuse(info:GameObjectInfo):void
	{
        this._npcGameObjectInfo = info as NPCGameObjectInfo;
        super.reuse(info);
        this.touchEnabled = true;
    }

    public unuse():void
    {
        super.unuse();
        this._npcGameObjectInfo = null;
        Manager.pool.push(this._elementShow);
        this._elementShow = null;
        if(this._txtName != null)
		{
            Manager.pool.push(this._txtName);
			this._txtName = null;
		}
        if(this._headIcon != null)
		{
            Manager.pool.push(this._headIcon);
			this._headIcon = null;
		}
    }

    protected drawAll():void
    {
        super.drawAll();
        this._elementShow.drawNPC();
        this.drawNpcName();
        this.drawHeadIcon();
    }

    protected drawNpcName():void
	{
        if(this._txtName == null) this._txtName = Manager.pool.create(egret.TextField);
        let nameHtml = StringUtils.setParam(LangCVO.getContent("common1"), Color.WHITE_STR, this._npcGameObjectInfo.cvo.name);
        HtmlUtil.setTextFlow(this._txtName, nameHtml);
		this._txtName.width = this._txtName.textWidth;
		this._txtName.x = - this._txtName.width >> 1;
        this._txtName.y = -this._npcGameObjectInfo.cvo.height - this._txtName.height;
		if(this._txtName.parent == null) this.addChild(this._txtName);
	}

    protected drawHeadIcon():void
    {
        if(this._npcGameObjectInfo.cvo.iconRes == "") return;
        if(this._headIcon == null)
        {
            this._headIcon = Manager.pool.create(BitmapRemote);
        }
        if(!this._headIcon.parent)
            this.addChild(this._headIcon);
        this._headIcon.load(Manager.path.getNpcHeadIcon(this._npcGameObjectInfo.cvo.iconRes), -1, -1, this.onLoadNpcHeadIconComplete, this);
    }

    private onLoadNpcHeadIconComplete():void
    {
        if(this._headIcon)
        {
            this._headIcon.x = -this._headIcon.width >> 1;
            this._headIcon.y = -this._npcGameObjectInfo.cvo.height - this._txtName.height - this._headIcon.height;
        }
    }

    protected disposeSelf():void
    {
        if(this._txtName != null)
		{
            Manager.pool.push(this._txtName);
			this._txtName = null;
		}
        if(this._headIcon != null)
		{
            Manager.pool.push(this._headIcon);
			this._headIcon = null;
		}
        this._npcGameObjectInfo = null;
        Manager.pool.push(this._elementShow);
        this._elementShow = null;
        super.disposeSelf();
    }
}