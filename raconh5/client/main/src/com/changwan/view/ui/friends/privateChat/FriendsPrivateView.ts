/**
 * 好友私聊面板
 * liangyan
 * create 2017-11-03
*/
class FriendsPrivateView extends UIComponent
{
    private _list:BaseVScrollerList;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("friends/privateChat", "FriendsPrivateViewSkin");
    }

    protected configUI():void
    {
        super.configUI();
        this.touchChildren = true;
        (<eui.VerticalLayout>this._list.itemList.layout).gap = -5;
    }

    protected addEvent():void
    {
        super.addEvent();
        Manager.model.getFriends().addEventListener(ChatEvent.ADD_PRIVATE_MSG, this.onInfoUpdateHandler, this);
        this._list.itemList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
    }

    protected removeEvent():void
    {
        Manager.model.getFriends().removeEventListener(ChatEvent.ADD_PRIVATE_MSG, this.onInfoUpdateHandler, this);
        this._list.itemList.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
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
        let infos = Manager.model.getFriends().chatDatas;
        let dataArr:Array<FriendsChatInfo> = [];
        for(let key in infos)
        {
            let len:number = infos[key].length;
            if(len > 0)
            {
                dataArr.push(infos[key][len - 1]);
            }
        }
        dataArr.sort((a:FriendsChatInfo, b:FriendsChatInfo) => { return (a.time > b.time ? -1 : 1) })
        this._list.initBtnListData(FriendsPrivateItem, dataArr, true);
    }

    private onInfoUpdateHandler(e:ChatEvent):void
    {
        this.invalidate(InvalidationType.DATA);
    }

    private onTouchHandler(e:egret.TouchEvent):void
    {
        if(e.target instanceof List) return;
        let index = this._list.itemList.selectedIndex;
        if(index < 0) return;
        let item = this._list.itemList.getChildAt(index) as FriendsPrivateItem;
        let info = item.data as FriendsChatInfo;
        Manager.view.show(ViewID.FriendsChatView,info.isSelf ? info.targetID : info.fromID, info.isSelf ? info.targetName : info.fromName);
        Manager.model.getFriends().dispatchEvent(new FriendsEvent(FriendsEvent.SHOW_HIDE_TIPS));
        item.updatebubble(0);
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.remove(this._list);
        this._list.dispose();
        this._list = null;
    }
}