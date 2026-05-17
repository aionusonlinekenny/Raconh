/**
 * 盟会战排名奖励项
 * luzhihong
 * create 2018.1.30
 */
class ClubBFChallengeItem extends ItemRenderer
{
    private _head:BitmapRemote;
    private _flag:eui.Image;
    private _txtName:Label;
    private _txtPower:Label;
    private _txtWin:Label;
    private _info:ClubBFPlayerInfo;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("clubBF", "ClubBFChallengeItemSkin");
    }

	protected createChildren():void
    {
        super.createChildren();
        this.addEvent();
    }

    protected dataChanged():void
    {
        this._info = this.data as ClubBFPlayerInfo;
        this._flag.source = this._info.isDef ? "arenaLogFsIcon_png" : "arenaLogJgIcon_png";
        if(this._info.isRobot)
        {
            let cvo:MonsterCVO = MonsterCVO.getCVO(this._info.tempID);
            this._head.load(Manager.path.getBossHeadPath(cvo.url, "r"));
            this._txtName.text = LangCVO.getContent("clubBF38");//援军
            // this._txtPower.text = LangCVO.getContent("clubBF40") + LangCVO.getContent("clubBF39");//未知
            this._txtPower.text = LangCVO.getContent("clubBF40") + this._info.power;//战力：
            this._txtWin.text = LangCVO.getContent("clubBF41") + LangCVO.getContent("clubBF39");//未知
        }
        else 
        {
            this._head.load(Manager.path.getRoleHeadPath(1,this._info.career));
            this._txtName.text = this._info.name;
            this._txtPower.text = LangCVO.getContent("clubBF40") + this._info.power;//战力：
            this._txtWin.text = LangCVO.getContent("clubBF41") + this._info.winCount;//连胜：
        }
    }

    private addEvent():void
    {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    }

    private removeEvent():void
    {
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    }

    private onClickHandler(e:egret.TouchEvent):void
    {
        let isSelfDef:boolean = Manager.model.getClubBF().isSelfDef;
        if(this._info.isDef == isSelfDef) 
        {
            FloatTips.addTips(LangCVO.getContent("clubBF42"));//你与该玩家同阵营，无需挑战
            return;
        }
        Manager.control.getClubBF().challengePlayer(this._info.isRobot, this._info.id);
    }

    public dispose():void
    {
        this.removeEvent();
		super.dispose();
        ObjectUtil.disposes(this._head, this._txtName, this._txtPower, this._txtWin);
        ObjectUtil.remove(this._flag);
        this._head = null;
        this._flag = null;
        this._txtName = null;
        this._txtPower = null;
        this._txtWin = null;
        this._info = null;
	}
}