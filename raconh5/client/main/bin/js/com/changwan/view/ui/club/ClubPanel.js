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
 * 宗门
 * Simon
 * 2017.12.14
 */
var ClubPanel = /** @class */ (function (_super) {
    __extends(ClubPanel, _super);
    //private _curView:UIComponent;
    //private _inJingmaiPanel:boolean = false;
    function ClubPanel() {
        return _super.call(this, false) || this;
    }
    ClubPanel.prototype.initData = function () {
        _super.prototype.initData.call(this);
        if (Manager.model.self.attrInfo.guildID == 0) {
            this.basePanel.title = "club_chooseClub_png";
            if (!this._chooseClubView)
                this._chooseClubView = Manager.pool.create(ChooseClubView);
            this.addChild(this._chooseClubView);
        }
        else {
            var id = Manager.model.self.attrInfo.guildID;
            this.basePanel.title = "club_name" + String(id).substr(String(id).length - 1, 1) + "2_png";
            if (!this._clubBuildView)
                this._clubBuildView = Manager.pool.create(ClubBuildView, this);
            this.addChild(this._clubBuildView);
            Manager.control.getClub().query();
        }
    };
    ClubPanel.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.getClub().addEventListener(ClubEvent.UPDATE_CLUB_INFO, this.onClubInfoUpdate, this);
    };
    ClubPanel.prototype.removeEvent = function () {
        Manager.model.getClub().removeEventListener(ClubEvent.UPDATE_CLUB_INFO, this.onClubInfoUpdate, this);
        _super.prototype.removeEvent.call(this);
    };
    ClubPanel.prototype.onClubInfoUpdate = function (e) {
        if (this._chooseClubView) {
            Manager.pool.push(this._chooseClubView);
            this._chooseClubView = null;
        }
        if (!this._clubBuildView) {
            this._clubBuildView = Manager.pool.create(ClubBuildView, this);
            this.addChild(this._clubBuildView);
            //this.addChildAt()
        }
    };
    ClubPanel.prototype.onClickHandler = function (e) {
        _super.prototype.onClickHandler.call(this, e);
        switch (e.currentTarget) {
            case this.basePanel.closeBtn:
            case this.basePanel.backBtn:
                this.initData();
                if (this._bitimg) {
                    this._bitimg.visible = false;
                }
                Manager.view.hide(38 /* ClubPanel */);
                if (Manager.model.getGuide().curID == GuideID.CLUB_JOIN)
                    Manager.control.getTask().hideGuide();
                break;
        }
    };
    // public showJingmai():void
    // {
    // 	if(this._chooseClubView)
    // 	{
    // 		Manager.pool.push(this._chooseClubView);
    // 		this._chooseClubView = null;
    // 	}
    // 	if(this._clubBuildView)
    // 	{
    // 		Manager.pool.push(this._clubBuildView);
    // 		this._clubBuildView = null;
    // 	}
    // 	this._inJingmaiPanel = true;
    // 	if(this._bitimg == null)
    // 	{
    // 		this._bitimg = Manager.pool.create(BitmapRemote);
    // 		this.basePanel.addChildAt(this._bitimg,3);
    // 	}
    // 	if(!this._curView)
    // 	{
    // 		let menuBtnContent = [
    // 			{ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "role_jingmai_click_png", imgClick: "role_jingmai_click_png", showRedIcon: Manager.model.getJingMai().checkCoin() },
    // 			{ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "juyuan_panel_icon_png", imgClick: "juyuan_panel_icon_png", showRedIcon:Manager.model.getJuyuan().checkCoin() }
    // 		];
    // 		this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, menuBtnContent);
    // 		(<eui.HorizontalLayout>this.basePanel.scrollerList.itemList.layout).gap = 0;
    // 	//this.basePanel.title = "role_title5_png";
    // 	this.basePanel.scrollerList.itemList.selectedIndex=0
    // 	this.onFuncBtnChangeHandler(null);
    // 	}
    // }
    ClubPanel.prototype.show = function (viewId) {
        _super.prototype.show.call(this);
        if (this._clubBuildView)
            this._clubBuildView.showView(viewId);
    };
    // protected onFuncBtnChangeHandler(e:eui.UIEvent):void
    // {
    // 	if(!this._inJingmaiPanel) return;
    // 	let index:number = this.basePanel.scrollerList.itemList.selectedIndex;
    // 	if(index == -1) return;
    // 	if(this._curView)
    // 	{
    // 		this._curView.dispose();
    // 		//Manager.pool.push(this._curView);
    // 		this._curView = null;
    // 	}
    // 	super.onFuncBtnChangeHandler(e);
    // 	switch(index)
    // 	{
    // 		case 0:
    // 			this.basePanel.title = "jingmai_title_png";
    // 			this.basePanel.setBottomBackTop(978);
    // 			this._curView = Manager.pool.create(JingmaiView, this);
    // 			this._bitimg.visible = true;
    // 			this._bitimg.load(Manager.path.getPanelUiImgPath("jingmai/jingmai_zhengdi","png"));
    // 			this._bitimg.y = 171;
    // 			this._bitimg.x = 70;
    // 			break;
    // 		case 1:
    //             this.basePanel.title = "juyuan_title_png";
    //             this.basePanel.setBottomBackTop(978);
    // 			this._bitimg.visible = true;
    // 			this._bitimg.load(Manager.path.getPanelUiImgPath("juyuan/juyuan_back","jpg"));
    // 			this._bitimg.y = 90;//115;
    // 			this._bitimg.x = 0;
    // 			this._curView = Manager.pool.create(JuyuanView);
    // 			break;
    // 	}
    //     if(this._curView && !this._curView.parent)this.addChild(this._curView);
    // 	// if(Manager.model.getJuyuan()._toJuyuan)//需要跳到聚元
    // 	// {
    // 	// 	if(!this._clubBuildView)
    // 	// 		this._clubBuildView = Manager.pool.create(ClubBuildView, this);
    // 	// 	this.addChild(this._clubBuildView);
    // 	// 	Manager.pool.push(this._clubBuildView);
    // 	// }
    // 	//this.basePanel.addChildAt(this._curView, this.basePanel.getChildIndex(this.basePanel.bottomBackImg) + 1);
    // }
    ClubPanel.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this._chooseClubView)
            this._chooseClubView.dispose();
        this._chooseClubView = null;
        if (this._clubBuildView)
            this._clubBuildView.dispose();
        this._clubBuildView = null;
        // if(this._jingmaiView)
        // 	this._jingmaiView.dispose();
        // this._jingmaiView = null;
        if (this._bitimg)
            this._bitimg.dispose();
        this._bitimg = null;
    };
    return ClubPanel;
}(Panel));
//# sourceMappingURL=ClubPanel.js.map