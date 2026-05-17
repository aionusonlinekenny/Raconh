/**
 * 好友黑名单面板
 * liangyan
 * create 2017-11-03
*/
class FriendsBlackView extends UIComponent
{
    private _list:BaseVScrollerList;
    private _deleteBtn:Button;

    private _model:FriendsModel;
    private _selectedItem:FriendsListItem;

    public constructor()
    {
        super();
        this.touchChildren = true;
        this.skinName = Manager.path.getSkinName("friends/blackList", "FriendsBlackViewSkin");
    }

    protected configUI():void
    {
        super.configUI();
        this._model = Manager.model.getFriends();
        (<eui.VerticalLayout>this._list.itemList.layout).gap = -5;
    }

    protected addEvent():void
    {
        super.addEvent();
        this._deleteBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._list.itemList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShortcutHandler, this);

        this._model.addEventListener(FriendsEvent.ADD_PLAYER, this.onInfoUpdateHandler, this);
        this._model.addEventListener(FriendsEvent.DELETE_PLAYER, this.onInfoUpdateHandler, this);
        this._model.addEventListener(FriendsEvent.CHANGE_PLAYER_TYPE, this.onInfoUpdateHandler, this);
        this._model.addEventListener(FriendsEvent.UPDATE_PLAYER, this.onInfoUpdateHandler, this);
        this._model.addEventListener(FriendsEvent.CLEAR_LIST, this.onInfoUpdateHandler, this);
    }

    protected removeEvent():void
    {
        this._deleteBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._list.itemList.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShortcutHandler, this);

        this._model.removeEventListener(FriendsEvent.ADD_PLAYER, this.onInfoUpdateHandler, this);
        this._model.removeEventListener(FriendsEvent.DELETE_PLAYER, this.onInfoUpdateHandler, this);
        this._model.removeEventListener(FriendsEvent.CHANGE_PLAYER_TYPE, this.onInfoUpdateHandler, this);
        this._model.removeEventListener(FriendsEvent.UPDATE_PLAYER, this.onInfoUpdateHandler, this);
        this._model.removeEventListener(FriendsEvent.CLEAR_LIST, this.onInfoUpdateHandler, this);

        super.removeEvent();
    }

    protected drawAll():void
	{
		super.drawAll();
        this.drawData();
	}

	protected draw():void
	{
		super.draw();
        if(this.isInvalid(InvalidationType.DATA)) this.drawData();
	}

    private drawData():void
    {
        let infos:Array<FriendsPlayerInfo> = Manager.model.getFriends().getFriendsByType(FriendsType.BLACK);
        infos.sort((a:FriendsPlayerInfo, b:FriendsPlayerInfo) => { return (a.lastOnlineTime > b.lastOnlineTime ? -1 : 1) });
        this._list.initBtnListData(FriendsListItem, infos, true);
        this._list.itemList.selectedIndex = -1;
    }

    private onClickHandler(e:egret.TouchEvent):void
    {
        switch(e.currentTarget)
        {
            case this._deleteBtn:
                let ids = this.getAllIDs();
                Manager.view.show(ViewID.FriendsConfirmView, ids);
                break;
        }
    }

    private onInfoUpdateHandler(e:FriendsEvent):void
    {
        this.invalidate(InvalidationType.DATA);
    }

    private onShortcutHandler(e:egret.TouchEvent):void
    {
        if(e.target instanceof List) return;
        let index = this._list.itemList.selectedIndex;
        if(index < 0) return;
        let item = this._list.itemList.getChildAt(index) as FriendsListItem;
        if(ShortcutMenu.hasInstance && item == this._selectedItem)
        {
            ShortcutMenu.instance.move(e.localX + 5, e.stageY + 5)
            return;
        }
        this._selectedItem = item;
        if(this._selectedItem == null) return;
        let info = this._selectedItem.data;
        if(info == null) return;
        ShortcutMenu.instance.showTip(e.localX + 5, e.stageY + 5, info.id, info.nickName, info.type);
    }

    private getAllIDs():Array<number>
    {
        let result:Array<number> = [];
        let dataLen = this._list.itemList.dataProvider.length;
        let info:FriendsPlayerInfo;
        for(let i = 0; i < dataLen; i++)
        {
            info = this._list.itemList.dataProvider.getItemAt(i) as FriendsPlayerInfo;
            if(info == null) continue;
            result.push(info.id);
        }
        return result;
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.removes(this._list, this._deleteBtn);
        this._list.dispose();
        this._list = null;
        this._deleteBtn.dispose();
        this._deleteBtn = null;

        this._model = null;
        if(this._selectedItem) this._selectedItem = null;
    }
}