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
 * pzx
 * 福利
 * 2018.1.18
 */
var CashCowPanel = (function (_super) {
    __extends(CashCowPanel, _super);
    function CashCowPanel() {
        var _this = _super.call(this, false) || this;
        _this._curIndex = 0;
        return _this;
    }
    CashCowPanel.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        var boo = Manager.model.getcashCow().checkRewardCd();
        var levBoo = Manager.model.getcashCow().levItemModel.checkReward();
        this._btnDatas = [
            { tap_type: CashCowType.TAP_CASHCOW, bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "ashCow_jubaochan_png", imgClick: "ashCow_jubaochan_png", showRedIcon: boo },
        ];
        this._sevenDayModel = Manager.model.getcashCow().sevenDaysModel;
        this.hideSevenDayTab();
        //drq add
        this._btnDatas.push({ tap_type: CashCowType.TAP_QIANDAO, bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "qiandao_tab_png", imgClick: "qiandao_tab_png", showRedIcon: Manager.model.getQiandao().getTodayCanGet() });
        this._btnDatas.push({ tap_type: CashCowType.TAP_UPD_NOTICE, bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "cashCow_gonggao_png", imgClick: "cashCow_gonggao_png", showRedIcon: !UpdNoticCVO.cvo().isReward });
        if (this._bitimg == null) {
            this._bitimg = Manager.pool.create(BitmapRemote);
            this._bitimg.y = 116;
            this.basePanel.addChildAt(this._bitimg, 3);
        }
        this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, this._btnDatas, true);
        this.basePanel.scrollerList.itemList.layout.gap = -10;
    };
    CashCowPanel.prototype.hideSevenDayTab = function () {
        if (this._sevenDayModel.checkSevenDaysHide()) {
            this.removetTab(CashCowType.TAP_SEVENDAY);
        }
        else {
            var levBoo = this._sevenDayModel.checkSeverDaysReward();
            this._btnDatas.push({ tap_type: CashCowType.TAP_SEVENDAY, bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "ashCow_dengluli_png", imgClick: "ashCow_dengluli_png", showRedIcon: levBoo });
        }
    };
    CashCowPanel.prototype.removetTab = function (type) {
        for (var i = this._btnDatas.length - 1; i > -1; i--) {
            var info = this._btnDatas[i];
            if (info.tap_type == type) {
                this._btnDatas.splice(i, 1);
            }
        }
        this.basePanel.scrollerList.dataProvider(this._btnDatas);
    };
    CashCowPanel.prototype.addEvent = function () {
        Manager.model.getcashCow().addEventListener(CashCowEvent.CASHCOW_UPDATE_EVENT, this.onIconShowHandler, this);
        Manager.model.getcashCow().sevenDaysModel.addEventListener(CashCowEvent.SEVENDAYS_REWARD_EVENT, this.onIconShowHandler, this);
        Manager.model.getSysnotice().addEventListener(SysnoticeEvent.UPD_NOTICE_EVENT, this.onIconShowHandler, this);
        _super.prototype.addEvent.call(this);
    };
    CashCowPanel.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        Manager.model.getcashCow().removeEventListener(CashCowEvent.CASHCOW_UPDATE_EVENT, this.onIconShowHandler, this);
        Manager.model.getcashCow().sevenDaysModel.removeEventListener(CashCowEvent.SEVENDAYS_REWARD_EVENT, this.onIconShowHandler, this);
        Manager.model.getSysnotice().removeEventListener(SysnoticeEvent.UPD_NOTICE_EVENT, this.onIconShowHandler, this);
    };
    CashCowPanel.prototype.setPromptSign = function (index) {
        if (this.basePanel) {
            var dis = this.basePanel.scrollerList.itemList.getElementAt(index);
            return dis;
        }
        return null;
    };
    CashCowPanel.prototype.onIconShowHandler = function (e) {
        var btn;
        if (e.type == CashCowEvent.CASHCOW_UPDATE_EVENT) {
            btn = this.setPromptSign(0);
            var boo = Manager.model.getcashCow().checkRewardCd();
            if (btn)
                btn.setIconShow(boo);
        }
        // if(e.type == GameObjectAttrEvent.LEVEL || e.type == CashCowEvent.LEVITEM_UPDATE_EVENT)
        // {
        // 	if(Manager.model.getcashCow().levItemModel.checkTotalRaward())
        // 	{
        // 		this.removetTab(CashCowType.TAP_LEVITEM);
        // 		return;
        // 	}
        // 	btn = this.setPromptSign(1);
        // 	let boo:boolean = Manager.model.getcashCow().levItemModel.checkReward();
        // 	if(btn) btn.setIconShow(boo);
        // }
        if (e.type == CashCowEvent.SEVENDAYS_REWARD_EVENT) {
            if (this._sevenDayModel.checkSevenDaysHide()) {
                this.removetTab(CashCowType.TAP_SEVENDAY);
            }
            else {
                var index = this.getTabIndex(CashCowType.TAP_SEVENDAY);
                btn = this.setPromptSign(index);
                var levBoo = this._sevenDayModel.checkSeverDaysReward();
                if (btn)
                    btn.setIconShow(levBoo);
            }
        }
        if (e.type == SysnoticeEvent.UPD_NOTICE_EVENT) {
            var tap = this.getTabIndex(CashCowType.TAP_UPD_NOTICE);
            btn = this.setPromptSign(tap);
            if (btn)
                btn.setIconShow(!UpdNoticCVO.cvo().isReward);
        }
    };
    CashCowPanel.prototype.getTabIndex = function (type) {
        for (var i = this._btnDatas.length - 1; i > -1; i--) {
            var info = this._btnDatas[i];
            if (info.tap_type == type) {
                return i;
            }
        }
    };
    CashCowPanel.prototype.onFuncBtnChangeHandler = function (e) {
        _super.prototype.onFuncBtnChangeHandler.call(this, e);
        var index = this.basePanel.scrollerList.itemList.selectedIndex;
        if (index == -1)
            return;
        var isback = false;
        switch (index) {
            case 1:
                if (!OpenCVO.isOpen(OpenConst.ID_LEVEL_AWARD, true))
                    isback = true;
                break;
            case 2:
                if (!OpenCVO.isOpen(OpenConst.ID_SEVEN_AWARD, true))
                    isback = true;
                break;
        }
        if (isback) {
            this.basePanel.scrollerList.itemList.selectedIndex = this._curIndex;
            this.basePanel.scrollerList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
            return;
        }
        if (this._view) {
            this._view.dispose();
            this._view = null;
        }
        var type = this._btnDatas[index].tap_type;
        switch (type) {
            case CashCowType.TAP_CASHCOW:
                this._bitimg.visible = true;
                this._bitimg.x = 0;
                this.basePanel.title = "ashCow_jincanjubao_png";
                this._view = new CashCowView();
                this._bitimg.load(Manager.path.getPanelCashCowPath("cashCow_di"));
                this.basePanel.setBottomBackTop(998);
                break;
            // case CashCowType.TAP_LEVITEM:
            // 	this._bitimg.visible = false;
            //     this.basePanel.title = "ashCow_chongjihaoli_png";
            // 	this._view = new LevItemView();
            // 	this.basePanel.setBottomBackTop(1280);
            // 	break;
            case CashCowType.TAP_SEVENDAY:
                this._bitimg.visible = true;
                this._bitimg.load(Manager.path.getPanelCashCowPath("sevenDay_di"));
                this._bitimg.x = 5;
                this.basePanel.title = "ashCow_qitiandenglu_png";
                this._view = new SevenDaysView();
                this.basePanel.setBottomBackTop(994);
                break;
            case CashCowType.TAP_UPD_NOTICE:
                this.basePanel.title = "updNotice_youxigonggao_png";
                this._bitimg.visible = false;
                this._view = new UpdNoticeView();
                this.basePanel.setBottomBackTop(998);
                break;
            case CashCowType.TAP_QIANDAO://drq add
                this.basePanel.title = "qiandao_title_png";
                this._bitimg.visible = false;
                this._view = new QiandaoView();
                this.basePanel.setBottomBackTop(1280);
                break;
        }
        if (this._view && !this._view.parent)
            this.addChild(this._view);
        this._curIndex = index;
    };
    CashCowPanel.prototype.onClickHandler = function (e) {
        _super.prototype.onClickHandler.call(this, e);
        switch (e.currentTarget) {
            case this.basePanel.closeBtn:
            case this.basePanel.backBtn:
                Manager.view.hide(84 /* CashCowPanel */);
                break;
        }
    };
    //drq add
    CashCowPanel.prototype.delQiandaoRedIcon = function () {
        var index = this.getTabIndex(CashCowType.TAP_QIANDAO);
        var btn = this.setPromptSign(index);
        if (btn)
            btn.setIconShow(false);
    };
    CashCowPanel.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.remove(this._view);
        if (this._view)
            this._view.dispose();
        this._view = null;
        if (this._bitimg) {
            Manager.pool.push(this._bitimg);
            this._bitimg = null;
        }
    };
    return CashCowPanel;
}(Panel));
__reflect(CashCowPanel.prototype, "CashCowPanel");
//# sourceMappingURL=CashCowPanel.js.map