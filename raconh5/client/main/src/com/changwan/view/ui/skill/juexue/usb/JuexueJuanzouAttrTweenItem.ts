/**
 * 绝学详情滚动动画
 * pzx 
 * create 18.3.5
 */
class JuexueJuanzouAttrTweenItem extends UIComponent{
	public _item0:JuexueJuanzouAttrItem;
	public _item1:JuexueJuanzouAttrItem;
	public _item2:JuexueJuanzouAttrItem;
	private _list:JuexueJuanzouAttrItem[];

    /**动画是否开始*/
    public isStarPlay:boolean;
    private _cvos:JueXueCVO[];
    private _cvo:JueXueCVO;
	public constructor()
    {
        super();
        this.touchEnabled = true;
        this.touchChildren = true;
        this.skinName = Manager.path.getSkinName("juexue", "JuexueJuanzouAttrTweenItemSkin");
    }
    protected configUI():void
    {
        super.configUI();

		if(!this._list)
		{
            for(let i:number=0;i<3;i++)
            {
                this["_item"+i] = Manager.pool.create(JuexueJuanzouAttrItem);
                let item:JuexueJuanzouAttrItem = this["_item"+i];
                item.x = i*640-640;
                this.addChild(item);
            }
			this._list = [this._item0,this._item1,this._item2];
            this._item0.visible = true;
            this._item2.visible = true;
		}
        
        this.mask = new egret.Rectangle(-7,0,640,528);
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
        this._item0.addEventListener(JuexueJuanzouChileItem.JuanzouTweenComtleteEvent,this.endPlayTween,this);
        this._item1.addEventListener(JuexueJuanzouChileItem.JuanzouTweenComtleteEvent,this.endPlayTween,this);
        this._item2.addEventListener(JuexueJuanzouChileItem.JuanzouTweenComtleteEvent,this.endPlayTween,this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
		this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.starMoveHandler,this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END,this.removeMoveHandler,this);
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.removeMoveHandler, this);
        this._item2.removeEventListener(JuexueJuanzouChileItem.JuanzouTweenComtleteEvent,this.endPlayTween,this);
        this._item0.removeEventListener(JuexueJuanzouChileItem.JuanzouTweenComtleteEvent,this.endPlayTween,this);
        this._item1.removeEventListener(JuexueJuanzouChileItem.JuanzouTweenComtleteEvent,this.endPlayTween,this);
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
            
            let index:number = this._cvos.indexOf(this._cvo)-this._dic;
            if(index<0 || index >=this._cvos.length)
            {
                return;
            }
            this._cvo = this._cvos[index];
            if(this._dic<0)
            {
                this._list.forEach((item,i)=>{
                    if(item.x == JuexueJuanzouAttrItem.WIDTH)
                    {
                        item.setData(this._cvo);
                    }
                    item.onTouchMove(this._dic);
                })
            }
            else
            {
                this._list.forEach((item,i)=>{
                    if(item.x == -JuexueJuanzouAttrItem.WIDTH)
                    {
                        item.setData(this._cvo);
                    }
                    item.onTouchMove(this._dic);
                })
            }
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

    public setData(data:JueXueCVO):void
    {
        this._cvo = data;
        this._cvos = JueXueCVO.getList(this._cvo.type);
        if(this._item1) {
            this._item1.initPoint();
        }
        this.invalidate(InvalidationType.DATA);
    }

    private drawData():void{
        for(let i:number=this._list.length-1;i>-1;i--)
        {
            this._list[i].x = (i-1) * JuexueJuanzouAttrItem.WIDTH;
        }
        this._item1.isPlay = true;
        this._item1.setData(this._cvo);
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
			ObjectUtil.disposes(this._item0,this._item1,this._item2);
		}
        this._item0=null;
        this._item1=null;
        this._item2=null;
        this._list=null;
        this._cvos=null;
        this._cvo=null;
        this.mask = null;
		
	}

    public dispose():void
    {
        super.dispose();
        this.clear(true);
    }
}