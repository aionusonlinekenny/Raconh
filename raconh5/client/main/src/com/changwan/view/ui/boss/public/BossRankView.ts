/**
 * boss敌人
 * luzh
 * create 2017-12.25
*/
class BossRankView extends UIComponent
{
    private _btn:eui.Image;
    private _txtMy:Label;
    private _txtFirst:Label;
    private _group:eui.Group;
    private _back:eui.Image;
    private _txtRank:Label;
    private _isShow:boolean;
    private _infos:Array<BossPlayerInfo>;

    private _type:number;

    /**伤害类型 */
    public static TYPE_DMG = 1;
    /**积分类型 */
    public static TYPE_SCORE = 2;

    public constructor(type:number)
    {
        super();
        this.skinName = Manager.path.getSkinName("boss", "BossRankViewSkin");
        this._type = type;
        this.touchChildren = true;
    }

    protected addEvent():void
    {
        super.addEvent();
        // Manager.model.getBoss().addEventListener(BossEvent.RANK_LIST, this.updateList, this);
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
    }
    protected removeEvent():void
    {
        // Manager.model.getBoss().removeEventListener(BossEvent.RANK_LIST, this.updateList, this);
        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        super.removeEvent();
    }

    private onTouchHandler(e:egret.TouchEvent)
    {
        this._isShow = !this._isShow;
		this.invalidate("drawShowList");
    }

    // private updateList(e:BossEvent)
    // {
    //     this._infos = e.params;
	// 	this.invalidate("drawList");
    // }
    public updateList(list:Array<BossPlayerInfo>)
    {
        this._infos = list;
		this.invalidate("drawList");
    }

    private drawList():void
    {
        if(this._infos == null) return;
        let info:BossPlayerInfo
        if(this._infos.length > 0) 
        {
            info = this._infos.shift();
            //boss13 自身伤害：        devil7 自身积分：
            let str = this._type == BossRankView.TYPE_DMG ? LangCVO.getContent("boss13") : LangCVO.getContent("devil7");
            this._txtMy.text = info.rank + "." + str + GameUtil.getNumShortStr(info.hurt);
        }

        if(this._infos.length > 0) 
        {
            info = this._infos.shift();
            this._txtFirst.text = info.rank + "." + info.name + ":" + GameUtil.getNumShortStr(info.hurt);
        }

        let len:number = this._infos.length;
        let str:string = "";
        for(let i:number=0; i<len; i++)
        {
            if(i>0) str += "\n";
            str += this._infos[i].rank + "." + this._infos[i].name + ":" + GameUtil.getNumShortStr(this._infos[i].hurt);
        }
        this._txtRank.text = str;
        this._back.height = this._txtRank.height + 18;
        
        ObjectUtil.addOrRemove(this._group, this, this._isShow && this._infos.length>0);
    }

    private drawShowList():void
    {
        ObjectUtil.addOrRemove(this._group, this, this._isShow && this._infos.length>0);
        this._btn.scaleY = this._isShow ? -1 : 1;
    }

	protected draw():void
	{
		super.draw();
		if(this.isInvalid("drawList")) this.drawList();
		if(this.isInvalid("drawShowList")) this.drawShowList();
	}

    protected drawAll():void
    {
        super.drawAll();
        this.drawList();
        this.drawShowList();
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.removes(this._btn, this._group, this._back);
        ObjectUtil.disposes(this._txtMy, this._txtFirst, this._txtRank);
        this._btn = null;
        this._txtMy = null;
        this._txtFirst = null;
        this._group = null;
        this._back = null;
        this._txtRank = null;

        this._type = 0;
    }
}