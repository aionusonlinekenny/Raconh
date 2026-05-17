/**
 * 绝学圈轴滚动动画
 * pzx 
 * create 18.2.26
 */
class JuexueJuanzouTweenItem extends UIComponent{
	private _item0:JuexueJuanzouChileItem;
	private _item1:JuexueJuanzouChileItem;
	private _item2:JuexueJuanzouChileItem;
	private _item3:JuexueJuanzouChileItem;
	private _item4:JuexueJuanzouChileItem;
    
	private _list:JuexueJuanzouChileItem[];

    private _shp:egret.Sprite;
    /**动画是否开始*/
    public isStarPlay:boolean;
    private _isMove:boolean;

    private _cvos:JueXueCVO[];

    private _guideIndex:number;
	public constructor()
    {
        super();
        this.touchEnabled = true;
        this.touchChildren = true;
        this.skinName = Manager.path.getSkinName("juexue", "JuexueJuanzouTweenItemSkin");
    }
    protected configUI():void
    {
        super.configUI();
		if(!this._list)
		{
			this._list = [this._item0,this._item1,this._item2,this._item3,this._item4];
		}
        
        this._shp = Manager.pool.create(egret.Sprite);
        this._shp.touchEnabled = true;
        this._shp.graphics.beginFill(1,0.05);
        this._shp.graphics.drawRect(0,0,640,528);
        this._shp.graphics.endFill();
        this.addChildAt(this._shp,0);
      
        this.mask = new egret.Rectangle(0,0,640,528);
    }

    protected initData():void
    {
        super.initData();
    }
    protected addEvent():void
    {
        super.addEvent();
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.starMoveHandler,this);
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.removeMoveHandler,this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.removeMoveHandler, this);
        this._item2.addEventListener(JuexueJuanzouChileItem.JuanzouTweenComtleteEvent,this.endPlayTween,this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
		this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.starMoveHandler,this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END,this.removeMoveHandler,this);
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.removeMoveHandler, this);
        this._item2.removeEventListener(JuexueJuanzouChileItem.JuanzouTweenComtleteEvent,this.endPlayTween,this);
    }
    private endPlayTween():void
    {
        this.isStarPlay = false;
    }

    private  _starPointX:number;
    private _dic:number=1;
	private starMoveHandler(e:egret.TouchEvent):void
	{
        this._starPointX = e.stageX;
		this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMoveHandler,this);
        this._isMove = false;
	}
	private onMoveHandler(e:egret.TouchEvent):void
	{
        let di:number = e.stageX - this._starPointX;
        if(Math.abs(di)>150)
        {
            if(di>=0)
            {
                this._dic = 1;
            }
            else
            {
                this._dic = -1;
            }
            this.removeMoveHandler();
        }
        this._isMove = true;
	}
    private removeMoveHandler(e:egret.TouchEvent=null):void
    {
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMoveHandler,this);
        if(this.isStarPlay)
        {
            return;
        }
        if(!e)
        {
            if(this._dic>=0)
            {
                if(this._item2.x >= JuexueJuanzouChileItem.maxRight)
                {
                    return;
                }
            }
            else 
            {
                if(this._item2.x <= JuexueJuanzouChileItem.maxLife)
                {
                    return;
                }
            }
            this.isStarPlay = true;
            this._list.forEach((item,i)=>{
                item.onTouchMove(this._dic);
            })
            return;
        }
        if(this._isMove) return;
        let item = e.target;
        if(item instanceof JuexueJuanzouChileItem)
        {
            if(item.x == JuexueJuanzouChileItem.list[2]) return;
            
            let w:number = Math.floor((item.x-7)/JuexueJuanzouChileItem.apg);
            w = 2-w;
            this._list.forEach((item,i)=>{
                item.onTouchMove(w,true);
            })
            this.isStarPlay = true;
        }
    }
//================================================
    protected drawAll():void
	{
		super.drawAll();
	}

	protected draw():void
	{
		super.draw();
        if(this.isInvalid(InvalidationType.DATA)) this.drawData();
	}

    public setData(data:Array<JueXueCVO>):void
    {
        this._cvos = data;
        this.invalidate(InvalidationType.DATA);
    }

    private drawData():void{
        let ln:number = this._list.length;
        let index = -1;
        for(let i:number = 0;i<ln;i++)
        {
            if(this._cvos[i])
            {
                this._list[i].setData(this._cvos[i]);
                this._list[i].initPointX();
            }
        }
        for(let j:number = this._cvos.length-1;j>-1;j--)
        {
            if(this._cvos[j].checkUpgrade())
            {
                index = j;
                this._list.forEach((item,i)=>{
                    item.onTouchMove(2-j);
                })
                break;
            }
        }

        //引导
        if(Manager.model.getGuide().curID == GuideID.JUEXUE_ACTIVE)
        {
            if(index < 0) Manager.control.getTask().hideGuide();
            else
            {
                this._guideIndex = index;
                let pos:egret.Point = this._list[2].parent.localToGlobal(this._list[2].x,this._list[2].y);
                Manager.control.getTask().showGuide(pos, -10, this._list[index].height>>1, this.guideCB, this, false);
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
		this.clear();
    }
	
	private clear(isRemove:boolean=false):void
	{
		if(isRemove)
		{
			ObjectUtil.disposes(this._item0,this._item1,this._item2,this._item3,this._item4)
		}
        this.mask = null;
        this._item0=null;
        this._item1=null;
        this._item2=null;
        this._item3=null;
        this._item4=null;
        
        this._list=null;
        Manager.pool.push(this._shp);
        this._shp=null;
        this.mask=null;
        this._cvos=null;
        this._guideIndex = -1;
	}

    private guideCB():void
    {
        this._list[this._guideIndex].onTouchMove(0, true)
    }

    public dispose():void
    {
        super.dispose();
        this.clear(true);
    }
}