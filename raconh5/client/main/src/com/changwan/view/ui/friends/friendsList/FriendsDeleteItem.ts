/**
 * 批量删除子项
 * liangyan
 * create 2017-11-04
*/
class FriendsDeleteItem extends ItemRenderer
{
    private _nameTxt:Label;
    private _lvlTxt:Label;
    private _offTxt:Label;
    private _cb:CheckBox;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("friends/friendsList", "FriendsDeleteItemSkin");
    }

    protected createChildren():void
    {
        super.createChildren();
        this.initEvent();
    }

    protected dataChanged():void
    {
        let info = this.data as FriendsPlayerInfo;
        if(info == null) return;
        this._nameTxt.text = info.nickName;
        this._lvlTxt.text = info.level + "级";
        this._offTxt.textFlow = new egret.HtmlTextParser().parse(info.onlineStatus);
        this._cb.selected = info.selected;

        this._nameTxt.textColor = this._offTxt.textColor = this._lvlTxt.textColor = info.isOnline ? 0x7C6E62 : 0x5A5B59;
    }

    public set cbSelected(value:boolean)
    {
        if(this._cb.selected == value) return;
        this._cb.selected = value;
    }

    private initEvent():void
    {
        this._cb.addEventListener(egret.Event.CHANGE, this.onChangeHandler, this);
    }

    private removeEvent():void
    {
        this._cb.addEventListener(egret.Event.CHANGE, this.onChangeHandler, this);
    }

    private onChangeHandler(e:egret.Event):void
    {
        this.data.selected = this._cb.selected;
    }

    public dispose():void
    {
        this.data.selected = false;
        this.removeEvent();
        super.dispose();
        ObjectUtil.removes(this._nameTxt, this._lvlTxt, this._offTxt, this._cb);
        this._nameTxt.dispose();
        this._nameTxt = null;
        this._lvlTxt.dispose();
        this._lvlTxt = null;
        this._offTxt.dispose();
        this._offTxt = null;
        this._cb.dispose();
        this._cb = null;
    }
}