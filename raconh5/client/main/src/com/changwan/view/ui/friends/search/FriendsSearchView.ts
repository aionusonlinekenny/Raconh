/**
 * 好友搜索面板
 * liangyan
 * create 2017-11-03
*/
class FriendsSearchView extends UIComponent
{
    private _list:BaseVScrollerList;
    private _input:TextInput;
    private _searchBtn:Button;
    private _changeBtn:Button;
    private _addBtn:Button;

    private _model:FriendsModel;
    private _selectedItem:FriendsListItem;
    private _stageX:number;

    public constructor()
    {
        super();
        this.touchChildren = true;
        this.skinName = Manager.path.getSkinName("friends/search", "FriendsSearchViewSkin");
    }
    
    protected configUI():void
    {
        super.configUI();
        this._model = Manager.model.getFriends();
        (<eui.VerticalLayout>this._list.itemList.layout).gap = -5;
        Manager.control.getFriends().changeSuggest();

        this._input.prompt = "请输入玩家名字";
        this._input.textDisplay.textAlign = "center";
    }

    protected addEvent():void
    {
        super.addEvent();
        this._searchBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._changeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._list.itemList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShortcutHandler, this);

        this._model.addEventListener(FriendsEvent.SEARCH_SUCC, this.onInfoUpdateHandler, this);
        this._model.addEventListener(FriendsEvent.CHANGE_SUGGEST, this.onInfoUpdateHandler, this);
        this._model.addEventListener(FriendsEvent.ADD_PLAYER, this.onInfoUpdateHandler, this);

        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    }

    protected removeEvent():void
    {
        this._searchBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._changeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._addBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._list.itemList.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShortcutHandler, this);

        this._model.removeEventListener(FriendsEvent.SEARCH_SUCC, this.onInfoUpdateHandler, this);
        this._model.removeEventListener(FriendsEvent.CHANGE_SUGGEST, this.onInfoUpdateHandler, this);
        this._model.removeEventListener(FriendsEvent.ADD_PLAYER, this.onInfoUpdateHandler, this);

        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);

        super.removeEvent();
    }

    protected initData():void
    {
        super.initData();
        this.onResizeHandler(null);
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
        let infos:Array<FriendsPlayerInfo> = Manager.model.getFriends().searchInfos;
        this._list.initBtnListData(FriendsListItem, infos, true);
        this._list.itemList.selectedIndex = -1;
    }

    private onClickHandler(e:egret.TouchEvent):void
    {
        switch(e.currentTarget)
        {
            case this._searchBtn:
                if(cw.StringUtil.isEmptyStr(this._input.text))
                {
                    FloatTips.addTips("请输入角色姓名", Color.RED);
                    return;
                }
                Manager.control.getFriends().searchFriends(this._input.text);
                break;
            case this._changeBtn:
                Manager.control.getFriends().changeSuggest();
                break;
            case this._addBtn:
                let ids = this.getAllIDs();
                let length = ids.length;
                if(length > 0) Manager.control.getFriends().batchOperate(1, FriendsType.FRIEND, ids);
                break;
        }
    }

    private onShortcutHandler(e:egret.TouchEvent):void
    {
        if(e.target instanceof List) return;
        let index = this._list.itemList.selectedIndex;
        if(index < 0) return;
        let item = this._list.itemList.getChildAt(index) as FriendsListItem;
        if(ShortcutMenu.hasInstance && item == this._selectedItem)
        {
            ShortcutMenu.instance.move(e.stageX - this._stageX + 5, e.stageY + 5)
            return;
        }
        this._selectedItem = item;
        if(this._selectedItem == null) return;
        let info = this._selectedItem.data;
        if(info == null) return;
        ShortcutMenu.instance.showTip(e.localX  + 5, e.stageY + 5, info.id, info.nickName, info.type);
    }

    private onInfoUpdateHandler(e:FriendsEvent):void
    {
        if(e.type != FriendsEvent.ADD_PLAYER) this.invalidate(InvalidationType.DATA);
        else Manager.control.getFriends().changeSuggest();
    }

    private onResizeHandler(e:GlobalEvent):void
    {
        this._stageX = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
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
        ObjectUtil.removes(this._list, this._input, this._searchBtn, this._changeBtn, this._addBtn);
        this._list.dispose();
        this._list = null;
        this._input.dispose();
        this._input = null;
        this._searchBtn.dispose();
        this._searchBtn = null;
        this._changeBtn.dispose();
        this._changeBtn = null;
        this._addBtn.dispose();
        this._addBtn = null;

        this._model = null;
        if(this._selectedItem) this._selectedItem = null;
    }
}