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
 * 活动面板
 * luzhihong
 * create 2017-11-22
 */
var ActivityPanel = (function (_super) {
    __extends(ActivityPanel, _super);
    function ActivityPanel() {
        var _this = _super.call(this, false) || this;
        _this._index = -1;
        return _this;
    }
    ActivityPanel.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.basePanel.setBottomBackTop(1280);
        this.basePanel.title = "activity_title_0_png";
        var btnDatas = [
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "activity_btn_0_png", imgClick: "activity_btn_0_png", index: 0 },
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "activity_btn_1_png", imgClick: "activity_btn_1_png", index: 1 }
            // {bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "activity_copy_tower_btn_png", imgClick: "activity_copy_tower_btn_png"}
            // { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "arenaBtnPic_png", imgClick: "arenaBtnPic_png" },
            // { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "landlord_btn_png", imgClick: "landlord_btn_png"}
        ];
        if (OpenCVO.isOpen(OpenConst.ID_JIUXIAOTA))
            btnDatas.push({ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "activity_copy_tower_btn_png", imgClick: "activity_copy_tower_btn_png", index: 2 });
        // if(OpenCVO.isOpen(OpenConst.ID_STORM))
        // 	btnDatas.push( {bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "storm_btn_png", imgClick: "storm_btn_png", index:3} );
        this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, btnDatas);
        this.basePanel.scrollerList.itemList.layout.gap = 0;
        Manager.render.add(this.renderInvalid, this);
    };
    ActivityPanel.prototype.renderInvalid = function (interval) {
        Manager.render.remove(this.renderInvalid, this);
        this.updateDaily();
        this.updateTower();
        // this.delayCheckShowRedIcon();
        // this.delayCheckShowRedIcon3();
    };
    ActivityPanel.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.getActivity().addEventListener(ActivityEvent.DAILY_SCHEDULE_UPDATE, this.updateDaily, this);
        Manager.model.getActivity().addEventListener(ActivityEvent.DAILY_UPDATE, this.updateDaily, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL, this.updateTower, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.FIGHT, this.updateTower, this);
        // Manager.model.getArena().addEventListener(ArenaEvent.UPDATE_PK_COUNT, this.delayCheckShowRedIcon, this);
        // Manager.model.getArena().addEventListener(ArenaEvent.UPDATE_MAX_RANK_AWARD, this.delayCheckShowRedIcon, this);
        // Manager.model.getLaird().addEventListener(LairdEvent.LAIRD_INFO_UPDATE, this.delayCheckShowRedIcon3, this);
        // Manager.model.getLaird().addEventListener(LairdEvent.COOLY_INFO_UPDATE, this.delayCheckShowRedIcon3, this);
        // Manager.model.getLaird().addEventListener(LairdEvent.LAIRD_CATCH_INFO_UPDATE, this.delayCheckShowRedIcon3, this);
    };
    ActivityPanel.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        Manager.model.getActivity().removeEventListener(ActivityEvent.DAILY_SCHEDULE_UPDATE, this.updateDaily, this);
        Manager.model.getActivity().removeEventListener(ActivityEvent.DAILY_UPDATE, this.updateDaily, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.LEVEL, this.updateTower, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.FIGHT, this.updateTower, this);
        // Manager.model.getArena().removeEventListener(ArenaEvent.UPDATE_PK_COUNT, this.delayCheckShowRedIcon, this);
        // Manager.model.getArena().removeEventListener(ArenaEvent.UPDATE_MAX_RANK_AWARD, this.delayCheckShowRedIcon, this);
        // Manager.model.getLaird().removeEventListener(LairdEvent.LAIRD_INFO_UPDATE, this.delayCheckShowRedIcon3, this);
        // Manager.model.getLaird().removeEventListener(LairdEvent.COOLY_INFO_UPDATE, this.delayCheckShowRedIcon3, this);
        // Manager.model.getLaird().removeEventListener(LairdEvent.LAIRD_CATCH_INFO_UPDATE, this.delayCheckShowRedIcon3, this);
    };
    // private delayCheckShowRedIcon(e?:ArenaEvent):void
    // {
    //     Manager.render.add(this.checkShowRedIcon2, this, 500);
    // }
    // private delayCheckShowRedIcon3(e?:LairdEvent):void
    // {
    //     Manager.render.add(this.checkShowRedIcon3, this, 500);
    // }
    // private checkShowRedIcon2():void
    // {
    //     Manager.render.remove(this.checkShowRedIcon2, this);
    //     let lairdBtn:BaseFuncBtn = this.basePanel.scrollerList.itemList.getElementAt(2) as BaseFuncBtn;
    // 	if(lairdBtn)
    //     {
    //         let bol:boolean = OpenCVO.isOpen(OpenConst.ID_ARENA_PK) && (Manager.model.getArena().hasMaxAwardCanGet || Manager.model.getArena().hasPkCount);
    // 		lairdBtn.setIconShow(bol);
    //     }
    // }
    // private checkShowRedIcon3():void
    // {
    //     Manager.render.remove(this.checkShowRedIcon3, this);
    // 	if(!this.basePanel) return;
    //     let lairdBtn:BaseFuncBtn = this.basePanel.scrollerList.itemList.getElementAt(3) as BaseFuncBtn;
    // 	if(lairdBtn)
    // 		lairdBtn.setIconShow(Manager.model.getLaird().checkRedIcon());
    // }
    ActivityPanel.prototype.updateDaily = function (e) {
        if (e === void 0) { e = null; }
        var btn = this.basePanel.scrollerList.itemList.getElementAt(0);
        if (btn) {
            btn.setIconShow(ActivityCVO.hasCanget(0) || ActivityScheduleCVO.hasCanget());
        }
        btn = this.basePanel.scrollerList.itemList.getElementAt(1);
        if (btn) {
            btn.setIconShow(ActivityCVO.hasCanget(1) || ActivityScheduleCVO.hasCanget());
        }
    };
    ActivityPanel.prototype.updateTower = function (e) {
        if (e === void 0) { e = null; }
        if (!OpenCVO.isOpen(OpenConst.ID_JIUXIAOTA))
            return;
        var btn = this.basePanel.scrollerList.itemList.getElementAt(2);
        if (btn) {
            var model = Manager.model.getCopy().towerModel;
            btn.setIconShow(OpenCVO.isOpen(OpenConst.ID_JIUXIAOTA) && (model.canSaodang || model.canChallenge()));
        }
    };
    ActivityPanel.prototype.onClickHandler = function (e) {
        _super.prototype.onClickHandler.call(this, e);
        switch (e.currentTarget) {
            case this.basePanel.closeBtn:
            case this.basePanel.backBtn:
                Manager.view.hide(10 /* ActivityPanel */);
                break;
        }
    };
    ActivityPanel.prototype.onFuncBtnChangeHandler = function (e) {
        var selectedindex = this.basePanel.scrollerList.itemList.selectedIndex;
        var btn = this.basePanel.scrollerList.itemList.getElementAt(selectedindex);
        this._index = selectedindex;
        //this._index = btn ? btn.data.index : 0;
        _super.prototype.onFuncBtnChangeHandler.call(this, e);
        if (this._curView) {
            ObjectUtil.dispose(this._curView);
            // this._curView.dispose();
            this._curView = null;
        }
        switch (this._index) {
            case 0:
                this.basePanel.title = "activity_title_0_png";
                this.basePanel.setBottomBackTop(1280);
                this._curView = ObjectUtil.createObj(DailyView);
                break;
            case 1:
                this.basePanel.title = "activity_title_act_png";
                this.basePanel.setBottomBackTop(1280);
                this._curView = ObjectUtil.createObj(DailyViewII);
                break;
            case 2:
                this.basePanel.title = "activity_title_1_png";
                this.basePanel.setBottomBackTop(900);
                this._curView = ObjectUtil.createObj(TowerCopyView);
                break;
            case 3:
                this.basePanel.title = "storm_title_png";
                this.basePanel.setBottomBackTop(1280);
                this._curView = ObjectUtil.createObj(StormView);
        }
        this.basePanel.addChildAt(this._curView, 2);
    };
    ActivityPanel.prototype.changeMenuItem = function (index) {
        this.basePanel.scrollerList.itemList.selectedIndex = index;
        this.basePanel.scrollerList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
    };
    ActivityPanel.prototype.dispose = function () {
        Manager.render.remove(this.renderInvalid, this);
        _super.prototype.dispose.call(this);
        ObjectUtil.dispose(this._curView);
        this._curView = null;
    };
    return ActivityPanel;
}(Panel));
__reflect(ActivityPanel.prototype, "ActivityPanel");
//# sourceMappingURL=ActivityPanel.js.map