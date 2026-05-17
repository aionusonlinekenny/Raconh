/**
 * 副本Model
 * luzhihong
 * create 2017.12.4
 */
class CopyModel extends egret.EventDispatcher
{
    public constructor()
    {
        super();
        this._towerModel = new TowerCopyModel();
        this._expModel = new CopyExpModel();
        this._silverModel = new CopySilverModel();
    }

    private _towerModel:TowerCopyModel;
    /**爬塔副本model */
    public get towerModel():TowerCopyModel
    {
        return this._towerModel;
    }

    private _expModel:CopyExpModel;
    /**经验副本model */
    public get expModel():CopyExpModel
    {
        return this._expModel;
    }
    
    private _silverModel:CopySilverModel;
    /**经验副本model */
    public get silverModel():CopySilverModel
    {
        return this._silverModel;
    }
    
    private _buyCount:Object={};//vip已购买进入次数
    public setBuyCount(type:number, value:number)
    {
        if(this._buyCount[type] == value) return;
        this._buyCount[type] = value;
        this.dispatchEvent(new CopyEvent(CopyEvent.UPDATE_BUY_COUNT, type));
    }
    public getBuyCount(type:number):number
    {
        return this._buyCount[type] ? this._buyCount[type] : 0;
    }

    public curID:number;//当前副本id

    public clean():void
    {
        this.curID = 0;
    }
    

    public static sortResultItems(a:ItemsModelInfo, b:ItemsModelInfo):number
    { 
        // 优先排列装备-再到其他的银币什么的
        // 然后装备里优先按品质的顺序排列 
        //装备类放前面
        if(a.cvo.group == ItemsConst.GROUP_EQUIP && b.cvo.group != ItemsConst.GROUP_EQUIP) return -1;
        if(a.cvo.group != ItemsConst.GROUP_EQUIP && b.cvo.group == ItemsConst.GROUP_EQUIP) return 1;
        //资产类放第二
        if(a.cvo.group == ItemsConst.GROUP_MONEY && b.cvo.group != ItemsConst.GROUP_MONEY) return -1;
        if(a.cvo.group != ItemsConst.GROUP_MONEY && b.cvo.group == ItemsConst.GROUP_MONEY) return 1;
        //高品质的放前面
        if(a.cvo.color > b.cvo.color) return -1;
        if(a.cvo.color < b.cvo.color) return 1;
        return (a.id < b.id ? -1 : 1);
    }

    public towerMoveToEnd():void
    {
        Manager.control.getCopy().enter(CopyConst.ID_TOWER);
    }
}