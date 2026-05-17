var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 *liangyan
 *create 2017-11-02
*/
var FriendPanel = (function (_super) {
    __extends(FriendPanel, _super);
    function FriendPanel() {
        return _super.call(this, false) || this;
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
    FriendPanel.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        if (!this._menuBtnContent) {
            this._menuBtnContent = [
                { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "friends_btn_normal_png", imgClick: "friends_btn_normal_png" },
                { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "search_btn_normal_png", imgClick: "search_btn_normal_png" },
                { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "blacklist_btn_normal_png", imgClick: "blacklist_btn_normal_png" },
                { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "private_btn_normal_png", imgClick: "private_btn_normal_png" }
            ];
        }
        this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, this._menuBtnContent);
        this.basePanel.scrollerList.itemList.layout.gap = 0;
        // this.basePanel.backBtn.selected = false;
        this._msgTipsIcon = Manager.pool.create(BitmapRes, "main_red_icon_png");
        this._msgTipsIcon.x = 520;
        this._msgTipsIcon.y = 1160;
        this._msgTipsIcon.visible = Manager.model.getFriends().hasUnReadMsg;
    };
    FriendPanel.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.getFriends().addEventListener(FriendsEvent.SHOW_HIDE_TIPS, this.onMsgUpdateHandler, this);
    };
    FriendPanel.prototype.removeEvent = function () {
        Manager.model.getFriends().removeEventListener(FriendsEvent.SHOW_HIDE_TIPS, this.onMsgUpdateHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    FriendPanel.prototype.onClickHandler = function (e) {
        _super.prototype.onClickHandler.call(this, e);
        switch (e.currentTarget) {
            case this.basePanel.closeBtn:
            case this.basePanel.backBtn:
                Manager.view.hide(13 /* FriendPanel */);
                break;
        }
    };
    FriendPanel.prototype.onFuncBtnChangeHandler = function (e) {
        _super.prototype.onFuncBtnChangeHandler.call(this, e);
        var index = this.basePanel.scrollerList.itemList.selectedIndex;
        if (index == -1)
            return;
        if (this._curView)
            this._curView.dispose();
        this.basePanel.title = "friends_title" + index + "_png";
        switch (index) {
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
        if (this._curView.parent == null)
            this.addChild(this._curView);
    };
    FriendPanel.prototype.onMsgUpdateHandler = function (e) {
        this._msgTipsIcon.visible = Manager.model.getFriends().hasUnReadMsg;
    };
    FriendPanel.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        Manager.pool.push(this._msgTipsIcon);
        this._msgTipsIcon = null;
        ObjectUtil.removes(this.basePanel, this._curView);
        this.basePanel = null;
        this._curView = null;
        this._menuBtnContent.length = 0;
    };
    return FriendPanel;
}(Panel));
__reflect(FriendPanel.prototype, "FriendPanel");
//# sourceMappingURL=FriendPanel.js.map