/**
 *liangyan
 *create 2017-11-02
*/
class FriendPanel extends Panel
{
	private _msgTipsIcon:BitmapRes;

    private _curView:UIComponent;
    private _menuBtnContent:Array<any>;

    public constructor()
    {
        super(false);
    }

    // /**
	//  * value1:底部功能按钮数据
	//  */
	// public reuse(...args:any[]):void
	// {
    //     super.reuse(args);

	// 	this._menuBtnContent = args[1];
	// 	if(!this._menuBtnContent)
	// 	{
	// 		this._menuBtnContent = [
	// 			{ bgImgNormal: "common_menuBtn_normal_png", bgImgClick: "common_menuBtn_click_png", imgNormal: "friends_btn_normal_png", imgClick: "friends_btn_click_png" },
	// 			{ bgImgNormal: "common_menuBtn_normal_png", bgImgClick: "common_menuBtn_click_png", imgNormal: "search_btn_normal_png", imgClick: "search_btn_click_png" },
	// 			{ bgImgNormal: "common_menuBtn_normal_png", bgImgClick: "common_menuBtn_click_png", imgNormal: "blacklist_btn_normal_png", imgClick: "blacklist_btn_click_png" },
	// 			{ bgImgNormal: "common_menuBtn_normal_png", bgImgClick: "common_menuBtn_click_png", imgNormal: "private_btn_normal_png", imgClick: "private_btn_click_png" }
	// 		];
	// 	}
	// 	this._basePanel.scrollerList.initBtnListData(BaseFuncBtn, this._menuBtnContent);
	// 	(<eui.HorizontalLayout>this._basePanel.scrollerList.itemList.layout).gap = -2;
    // }

    protected configUI():void
    {
		super.configUI();

		if(!this._menuBtnContent)
		{
			this._menuBtnContent = [
				{ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "friends_btn_normal_png", imgClick: "friends_btn_normal_png" },
				{ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "search_btn_normal_png", imgClick: "search_btn_normal_png" },
				{ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "blacklist_btn_normal_png", imgClick: "blacklist_btn_normal_png" },
				{ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "private_btn_normal_png", imgClick: "private_btn_normal_png" }
			];
		}
		this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, this._menuBtnContent);
		(<eui.HorizontalLayout>this.basePanel.scrollerList.itemList.layout).gap = 0;
		// this.basePanel.backBtn.selected = false;

		this._msgTipsIcon = Manager.pool.create(BitmapRes, "main_red_icon_png");
		this._msgTipsIcon.x = 520;
		this._msgTipsIcon.y = 1160;
		this._msgTipsIcon.visible = Manager.model.getFriends().hasUnReadMsg;
    }

	protected addEvent():void
	{
		super.addEvent();

		Manager.model.getFriends().addEventListener(FriendsEvent.SHOW_HIDE_TIPS, this.onMsgUpdateHandler, this);
	}

	protected removeEvent():void
	{
		Manager.model.getFriends().removeEventListener(FriendsEvent.SHOW_HIDE_TIPS, this.onMsgUpdateHandler, this);
        
		super.removeEvent();
	}

    protected onClickHandler(e:egret.TouchEvent):void
    {
		super.onClickHandler(e);

        switch(e.currentTarget)
        {
            case this.basePanel.closeBtn:
            case this.basePanel.backBtn:
				Manager.view.hide(ViewID.FriendPanel);
                break;
        }
    }

    protected onFuncBtnChangeHandler(e:eui.UIEvent):void
	{
		super.onFuncBtnChangeHandler(e);

		var index:number = this.basePanel.scrollerList.itemList.selectedIndex;
		if(index == -1) return;
		if(this._curView) this._curView.dispose();
		this.basePanel.title = "friends_title" + index + "_png";
		switch(index)
		{
			case 0:
				this._curView = Manager.pool.create(FriendsListView);
				this.basePanel.setBottomBackTop(982);
				break;
			case 1:
				this._curView = Manager.pool.create(FriendsSearchView);
				this.basePanel.setBottomBackTop(979);
				break;
			case 2:
				this._curView = Manager.pool.create(FriendsBlackView);
				this.basePanel.setBottomBackTop(981);
				break;
			case 3:
				this._curView = Manager.pool.create(FriendsPrivateView);
				this.basePanel.setBottomBackTop(1280);
				break;
		}
		if(this._curView.parent == null) this.addChild(this._curView);
	}
	
	private onMsgUpdateHandler(e:FriendsType):void
	{
		this._msgTipsIcon.visible = Manager.model.getFriends().hasUnReadMsg;
	}

	public dispose():void
	{
		super.dispose();
		Manager.pool.push(this._msgTipsIcon);
		this._msgTipsIcon = null;
		ObjectUtil.removes(this.basePanel, this._curView);
		this.basePanel = null;
		this._curView = null;

		this._menuBtnContent.length = 0;
	}
}