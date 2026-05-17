/**
 *author Anydo
 *create 2017-12-28
 *description 
*/
class ArenaLogListItem extends ItemRenderer
{
    private _picFlag:BitmapRes;
    private _picResult:BitmapRes;
    private _txtTime:Label;
    private _txtName:Label;
    private _txtHonour:Label;
    private _txtRank:Label;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("arena", "ArenaLogListItemSkin");
    }

    protected dataChanged():void
    {
        let info:ArenaLogInfo = this.data as ArenaLogInfo;
        if(info == null) return;
        this._picResult = Manager.pool.create(BitmapRes, info.isWin ? "arenaLogWinIcon_png" : "arenaLogFailIcon_png");
        this._picResult.x = 7;
        this._picResult.y = 5;
        this.addChild(this._picResult);
        this._picFlag = Manager.pool.create(BitmapRes, info.isAttack ? "arenaLogJgIcon_png" : "arenaLogFsIcon_png");
        this.addChild(this._picFlag);
        this._txtTime.text = cw.DateUtil.formatStr(info.logTime, cw.DateUtil.YYYY_MM_DD_HH_MM_SS);
        this._txtName.text = info.enemyName;
        this._txtHonour.text = String(info.honour);
        if(info.rankOld > info.rankNew) this._txtRank.text = LangCVO.getContent("arena3", info.rankNew);//"排名降低至第{0}名";
        else if(info.rankOld < info.rankNew) this._txtRank.text = LangCVO.getContent("arena2", info.rankNew);//"排名上升至第{0}名";
        else this._txtRank.text = "";
    }

    public dispose():void
    {
        super.dispose();
        Manager.pool.push(this._picFlag);
        this._picFlag = null;
        Manager.pool.push(this._picResult);
        this._picResult = null;
        this._txtTime.dispose();
        this._txtTime = null;
        this._txtName.dispose();
        this._txtName = null;
        this._txtHonour.dispose();
        this._txtHonour = null;
        this._txtRank.dispose();
        this._txtRank = null;
    }
}