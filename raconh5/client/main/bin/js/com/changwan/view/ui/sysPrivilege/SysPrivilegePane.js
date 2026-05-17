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
 * 特权卡
 * 2018.1.10
 */
var SysPrivilegePane = /** @class */ (function (_super) {
    __extends(SysPrivilegePane, _super);
    function SysPrivilegePane() {
        var _this = _super.call(this, false) || this;
        _this._index = 0;
        return _this;
    }
    SysPrivilegePane.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        var boo1 = Manager.model.getSysInvest().checkReward(SysInvestType.SYSINVEST_MONTH_TYPE);
        var boo2 = Manager.model.getSysInvest().checkReward(SysInvestType.SYSINVEST_EXTREME_TYPE);
        var btnDatas = [
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "sysprivilege_huangjin1_png", imgClick: "sysprivilege_huangjin1_png" },
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "sysprivilege_zuanshi1_png", imgClick: "sysprivilege_zuanshi1_png" },
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "sysInvest_banyueka_png", imgClick: "sysInvest_banyueka_png", showRedIcon: boo1 },
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "sysInvest_zhizunka_png", imgClick: "sysInvest_zhizunka_png", showRedIcon: boo2 }
        ];
        this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, btnDatas);
        this.basePanel.scrollerList.itemList.layout.gap = 0;
        if (this._bitimg == null) {
            this._bitimg = Manager.pool.create(BitmapRemote);
            this._bitimg.x = 5;
            this._bitimg.y = 116;
            this.basePanel.addChildAt(this._bitimg, 3);
        }
        if (this._view == null) {
            this._view = new SysPrivilegeView();
            this.addChild(this._view);
        }
        this._model = Manager.model.getSysPrivilege();
    };
    SysPrivilegePane.prototype.initData = function () {
        _super.prototype.initData.call(this);
        Manager.control.getSysPrivilege().query();
    };
    SysPrivilegePane.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._model.addEventListener(SysPrivilegeEvent.SYSPRIVILEGE_UPDATE_EVENT, this.updateData, this);
        Manager.model.getSysInvest().addEventListener(SysInvestEvent.SYSINVEST_UPDATE_EVENT, this.onIconShowHandler, this);
    };
    SysPrivilegePane.prototype.updateData = function (e) {
        this._view.setData(this._model.getdata(this._index));
        this.onIconShowHandler(e);
    };
    SysPrivilegePane.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._model.removeEventListener(SysPrivilegeEvent.SYSPRIVILEGE_UPDATE_EVENT, this.updateData, this);
        Manager.model.getSysInvest().removeEventListener(SysInvestEvent.SYSINVEST_UPDATE_EVENT, this.onIconShowHandler, this);
    };
    SysPrivilegePane.prototype.setPromptSign = function (index) {
        if (this.basePanel) {
            var dis = this.basePanel.scrollerList.itemList.getElementAt(index);
            return dis;
        }
        return null;
    };
    SysPrivilegePane.prototype.onIconShowHandler = function (e) {
        var btn;
        if (e.type == SysPrivilegeEvent.SYSPRIVILEGE_UPDATE_EVENT) {
            var boo3 = this._model.getdata(0).isActive && !this._model.getdata(0).isreward;
            var boo4 = this._model.getdata(1).isActive && !this._model.getdata(1).isreward;
            btn = this.setPromptSign(0);
            if (btn)
                btn.setIconShow(boo3);
            btn = this.setPromptSign(1);
            if (btn)
                btn.setIconShow(boo4);
            return;
        }
        var boo1 = Manager.model.getSysInvest().checkReward(SysInvestType.SYSINVEST_MONTH_TYPE);
        var boo2 = Manager.model.getSysInvest().checkReward(SysInvestType.SYSINVEST_EXTREME_TYPE);
        btn = this.setPromptSign(2);
        if (btn)
            btn.setIconShow(boo1);
        btn = this.setPromptSign(3);
        if (btn)
            btn.setIconShow(boo2);
    };
    SysPrivilegePane.prototype.onFuncBtnChangeHandler = function (e) {
        _super.prototype.onFuncBtnChangeHandler.call(this, e);
        var index = this.basePanel.scrollerList.itemList.selectedIndex;
        if (index == -1)
            return;
        switch (index) {
            case 0:
                this.basePanel.title = "sysprivilege_huangjintequan_png";
                this._view.setData(this._model.getdata(index));
                this._bitimg.load(Manager.path.getPanelSysPrivilegePath("sysprivilege_beijing"));
                this.basePanel.setBottomBackTop(1040);
                this._view.visible = true;
                if (this._investView)
                    this._investView.visible = false;
                break;
            case 1:
                this.basePanel.title = "sysprivilege_zuanshitequan_png";
                this._view.setData(this._model.getdata(index));
                this._bitimg.load(Manager.path.getPanelSysPrivilegePath("sysprivilege_beijing"));
                this.basePanel.setBottomBackTop(1040);
                this._view.visible = true;
                if (this._investView)
                    this._investView.visible = false;
                break;
            case 2:
                this.basePanel.title = "sysInvest_banyue_png";
                this.basePanel.setBottomBackTop(1280);
                this._bitimg.load(Manager.path.getPanelSysPrivilegePath("sysInvest_10bei"));
                if (this._investView == null) {
                    this.createInvest();
                }
                this._view.visible = false;
                this._investView.visible = true;
                this._investView.setData(SysInvestType.SYSINVEST_MONTH_TYPE);
                break;
            case 3:
                this.basePanel.title = "sysInvest_dengjitouzi_png";
                this.basePanel.setBottomBackTop(1280);
                this._bitimg.load(Manager.path.getPanelSysPrivilegePath("sysInvest_100bei"));
                if (this._investView == null) {
                    this.createInvest();
                }
                this._view.visible = false;
                this._investView.visible = true;
                this._investView.setData(SysInvestType.SYSINVEST_EXTREME_TYPE);
                break;
        }
        this._index = index;
    };
    SysPrivilegePane.prototype.createInvest = function () {
        this._investView = new SysInvestView();
        this.addChild(this._investView);
    };
    SysPrivilegePane.prototype.onClickHandler = function (e) {
        _super.prototype.onClickHandler.call(this, e);
        switch (e.currentTarget) {
            case this.basePanel.closeBtn:
            case this.basePanel.backBtn:
                Manager.view.hide(73 /* SysPrivilegePane */);
                break;
        }
    };
    SysPrivilegePane.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._view, this._bitimg);
        if (this._view)
            this._view.dispose();
        this._view = null;
        Manager.pool.push(this._bitimg);
        this._bitimg = null;
        this._model = null;
    };
    return SysPrivilegePane;
}(Panel));
//# sourceMappingURL=SysPrivilegePane.js.map