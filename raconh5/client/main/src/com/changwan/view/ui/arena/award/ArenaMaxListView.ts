/**
 *author Anydo
 *create 2018-1-5
 *description 
*/
class ArenaMaxListView extends UIComponent
{
    private _scroll:Scroller;
    private _group:eui.Group;

    private _items:ArenaMaxListItem[];
    private _needSetScrollH:boolean;

    public constructor()
    {
		super();
        this._needSetScrollH = true;
        this.skinName = Manager.path.getSkinName("arena", "ArenaMaxListViewSkin");
        this.touchChildren = true;
	}

    protected configUI():void
	{
		super.configUI();
        let maxCVOs:Array<ArenaMaxRankCVO> = ArenaMaxRankCVO.cvos;
        this._items = [];
        for(let i:number = maxCVOs.length - 1; i >= 0; i--)
        {
            let item:ArenaMaxListItem = new ArenaMaxListItem();
            item.setCVO(maxCVOs[i]);
            item.x = i * 162;
            item.y = 2;
            this._group.addChild(item);
            this._items.push(item);
        }
        this._scroll.validateNow();
        this._scroll.scrollPolicyV = eui.ScrollPolicy.OFF;
	}

	protected initData():void
	{
        // Manager.control.getArena().cmdMaxRankAward(0);
        this.updateGetData();
    }

    protected addEvent():void
    {
        super.addEvent();
        Manager.model.getArena().addEventListener(ArenaEvent.UPDATE_MAX_RANK_AWARD, this.updateGetData, this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
        Manager.model.getArena().removeEventListener(ArenaEvent.UPDATE_MAX_RANK_AWARD, this.updateGetData, this);
    }

    private updateGetData(e:ArenaEvent=null):void
	{
        for(let i:number = 0; i < this._items.length; i++)
        {
            this._items[i].updateGetData();
        }
        
        if(this._needSetScrollH)
        {
            this._needSetScrollH = false;
            let maxCVOs:Array<ArenaMaxRankCVO> = ArenaMaxRankCVO.cvos;
            let index:number = 0;
            for(; index < maxCVOs.length; index++)
            {
                if(Manager.model.getArena().maxGetedIDs.indexOf(maxCVOs[index].id) == -1) break;
            }
            if(index > maxCVOs.length) index = maxCVOs.length;
            let differ:number = ArenaMaxListItem.WIDTH * index;
            if(differ > (this._scroll.viewport.contentWidth - this._scroll.viewport.width)) this._scroll.viewport.scrollH = this._scroll.viewport.contentWidth - this._scroll.viewport.width;
            else if(differ < 0) this._scroll.viewport.scrollH = 0;
            else this._scroll.viewport.scrollH = differ;
        }
    }

    private clearItems():void
    {
        for(let i:number = 0; i < this._items.length; i++)
        {
            this._items[i].dispose();
        }
        this._items = [];
    }

    public dispose():void
    {
        super.dispose();
        this._scroll.dispose();
        this._scroll = null;
        this.clearItems();
        this._group = null;
    }
}