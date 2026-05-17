/**
 * 批量删除好友界面
 * liangyan
 * create 2017-11-06
*/
class FriendsBatchDelView extends UIComponent implements IViewManager
{
    private _basePopUp:BasePopUpView;
    private _titleImg:eui.Image;
    private _list:BaseVScrollerList;
    private _delBtn:Button;
    private _allCB:CheckBox;

    public constructor()
    {
        super();
        this.touchChildren = true;
        this.skinName = Manager.path.getSkinName("friends/friendsList", "FriendsBatchDeleteSkin");
    }

    protected configUI():void
    {
        super.configUI();
    }

    protected addEvent():void
    {
        super.addEvent();
        this._basePopUp.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._delBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._allCB.addEventListener(egret.Event.CHANGE, this.onChangeHandler, this);
        
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    }

    protected removeEvent():void
    {
        this._basePopUp.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._delBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._allCB.removeEventListener(egret.Event.CHANGE, this.onChangeHandler, this);

        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
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
        let infos:Array<FriendsPlayerInfo> = Manager.model.getFriends().getBatchDelInfos();
        this._list.initBtnListData(FriendsDeleteItem, infos, true);
    }

    private onClickHandler(e:egret.TouchEvent):void
    {
        let dataLen:number;
        let itemLen:number;
        switch(e.currentTarget)
        {
            case this._basePopUp.closeBtn:
                this._allCB.selected = false;
                this.onChangeHandler(null);
                break;
            case this._delBtn:
                let ids = this.getSelectedIDs();
                let length = ids.length;
                if(length > 0) Manager.control.getFriends().batchOperate(0, FriendsType.FRIEND, ids);
                break;
        }
        Manager.view.hide(ViewID.FriendsBatchDelView);
    }

    private onInfoUpdateHandler():void
    {
        this.invalidate(InvalidationType.DATA);
    }

    private onChangeHandler(e:egret.Event):void
    {
        let dataLen = this._list.itemList.dataProvider.length;
        let itemLen = this._list.itemList.numChildren;
        let selected = this._allCB.selected;
        for(let i = 0; i < dataLen; i++)
        {
            if(i < itemLen) (this._list.itemList.getChildAt(i) as FriendsDeleteItem).cbSelected = selected;
            this._list.itemList.dataProvider.getItemAt(i).selected = selected;
        }
    }

    private onResizeHandler(e:GlobalEvent):void
    {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
    }

    private getSelectedIDs():Array<number>
    {
        let result:Array<number> = [];
        let dataLen = this._list.itemList.dataProvider.length;
        let info:FriendsPlayerInfo;
        for(let i = 0; i < dataLen; i++)
        {
            info = this._list.itemList.dataProvider.getItemAt(i) as FriendsPlayerInfo;
            if(info == null) continue;
            if(info.selected)
            {
                result.push(info.id);
            }
        }
        return result;
    }

    public show():void
    {
        if(!this.parent) Manager.layer.tipsLayer.addChild(this);
    }

    public hide():void
    {
        if(this.parent != null) this.dispose();
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.removes(this._basePopUp, this._titleImg, this._delBtn, this._list, this._allCB);
        this._basePopUp.dispose();
        this._basePopUp = null;
        this._list.dispose();
        this._list = null;
        this._titleImg = null;
        this._delBtn.dispose();
        this._delBtn = null;
        this._allCB.dispose();
        this._allCB = null;
    }

}