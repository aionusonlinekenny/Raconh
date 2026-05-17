/**
 *liangyan
 *create 2017-11-02
*/
class FriendsListItem extends ItemRenderer
{
    private _back:eui.Image;
    private _headBack:eui.Image;
    private _nameTxt:Label;
    private _fightTxt:Label;
    private _lvlTxt:Label;
    private _sign:eui.Image;
    private _statusTxt:Label;

    private _head:BitmapRemote;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("friends/friendsList", "FriendsListItemSkin");
    }
    
    protected createChildren():void
    {
        super.createChildren();
        this._head = Manager.pool.create(BitmapRemote);
        this._head.x = this._headBack.x + 27;
        this._head.y = this._headBack.y + 27;
        this.addChild(this._head);
    }

    protected dataChanged():void
    {
        let info = this.data as FriendsPlayerInfo;
        if(info == null) return;
        this._back.source = info.isOnline ? "common_wordBg_normal_png" : "common_wordBg_disables_png";
        this._head.load(Manager.path.getRoleHeadPath(1, info.career));
        info.isOnline ? this._head.filters = null : FilterUtil.setGrayFilter(this._head);
        this._nameTxt.text = info.nickName;
        this._fightTxt.text = "总战力：" + info.fightSum;
        this._lvlTxt.text = info.level + "级";
        this._sign.source = info.isOnline ? "friends_online_png" : "friends_offline_png";
        this._statusTxt.textFlow = new egret.HtmlTextParser().parse(info.onlineStatus);

        this._nameTxt.textColor = this._fightTxt.textColor = this._lvlTxt.textColor = info.isOnline ? 0x7C6E62 : 0x5A5B59;
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.removes(this._back, this._headBack, this._nameTxt, this._fightTxt, this._lvlTxt, this._sign, this._statusTxt, this._head);
        this._back = null;
        this._headBack = null;
        this._head.dispose();
        this._head = null;
        this._nameTxt.dispose();
        this._nameTxt = null;
        this._fightTxt.dispose();
        this._fightTxt = null;
        this._lvlTxt.dispose();
        this._lvlTxt = null;
        this._sign = null;
        this._statusTxt.dispose();
        this._statusTxt = null;

        if(this._head)
        {
            Manager.pool.push(this._head);
            this._head = null;
        }
    }
}