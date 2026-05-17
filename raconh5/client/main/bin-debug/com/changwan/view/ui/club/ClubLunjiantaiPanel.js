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
 * 论剑台主界面
 * Simon
 * create 2018-3-30
 */
var ClubLunjiantaiPanel = (function (_super) {
    __extends(ClubLunjiantaiPanel, _super);
    // private _bg:BitmapRemote;
    function ClubLunjiantaiPanel() {
        var _this = _super.call(this, false) || this;
        _this._index = -1;
        return _this;
    }
    ClubLunjiantaiPanel.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.basePanel.setBottomBackTop(1280);
        this.basePanel.title = "arenaTitle1_png";
        var btnDatas = [
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "arenaBtnPic_png", imgClick: "arenaBtnPic_png" },
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "landlord_btn_png", imgClick: "landlord_btn_png" }
            // {bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "activity_copy_tower_btn_png", imgClick: "activity_copy_tower_btn_png"}
        ];
        this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, btnDatas);
        this.basePanel.scrollerList.itemList.layout.gap = 0;
        Manager.render.add(this.renderInvalid, this);
    };
    ClubLunjiantaiPanel.prototype.renderInvalid = function (interval) {
        Manager.render.remove(this.renderInvalid, this);
        this.delayCheckShowRedIcon();
        this.delayCheckShowRedIcon3();
        // this.updateTower();
    };
    ClubLunjiantaiPanel.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.getArena().addEventListener(ArenaEvent.UPDATE_PK_COUNT, this.delayCheckShowRedIcon, this);
        Manager.model.getArena().addEventListener(ArenaEvent.UPDATE_MAX_RANK_AWARD, this.delayCheckShowRedIcon, this);
        Manager.model.getLaird().addEventListener(LairdEvent.LAIRD_INFO_UPDATE, this.delayCheckShowRedIcon3, this);
        Manager.model.getLaird().addEventListener(LairdEvent.COOLY_INFO_UPDATE, this.delayCheckShowRedIcon3, this);
        Manager.model.getLaird().addEventListener(LairdEvent.LAIRD_CATCH_INFO_UPDATE, this.delayCheckShowRedIcon3, this);
        // Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL, this.updateTower, this);
        // Manager.model.self.addEventListener(GameObjectAttrEvent.FIGHT, this.updateTower, this);
    };
    ClubLunjiantaiPanel.prototype.removeEvent = function () {
        Manager.model.getArena().removeEventListener(ArenaEvent.UPDATE_PK_COUNT, this.delayCheckShowRedIcon, this);
        Manager.model.getArena().removeEventListener(ArenaEvent.UPDATE_MAX_RANK_AWARD, this.delayCheckShowRedIcon, this);
        Manager.model.getLaird().removeEventListener(LairdEvent.LAIRD_INFO_UPDATE, this.delayCheckShowRedIcon3, this);
        Manager.model.getLaird().removeEventListener(LairdEvent.COOLY_INFO_UPDATE, this.delayCheckShowRedIcon3, this);
        Manager.model.getLaird().removeEventListener(LairdEvent.LAIRD_CATCH_INFO_UPDATE, this.delayCheckShowRedIcon3, this);
        // Manager.model.self.removeEventListener(GameObjectAttrEvent.LEVEL, this.updateTower, this);
        // Manager.model.self.removeEventListener(GameObjectAttrEvent.FIGHT, this.updateTower, this);
        _super.prototype.removeEvent.call(this);
    };
    ClubLunjiantaiPanel.prototype.delayCheckShowRedIcon = function (e) {
        Manager.render.add(this.checkShowRedIcon2, this, 500);
    };
    ClubLunjiantaiPanel.prototype.delayCheckShowRedIcon3 = function (e) {
        Manager.render.add(this.checkShowRedIcon3, this, 500);
    };
    ClubLunjiantaiPanel.prototype.checkShowRedIcon2 = function () {
        Manager.render.remove(this.checkShowRedIcon2, this);
        if (!this.basePanel)
            return;
        var arenaBtn = this.basePanel.scrollerList.itemList.getElementAt(0);
        if (arenaBtn) {
            var bol = OpenCVO.isOpen(OpenConst.ID_ARENA_PK) && (Manager.model.getArena().hasMaxAwardCanGet || Manager.model.getArena().hasPkCount);
            arenaBtn.setIconShow(bol);
        }
    };
    ClubLunjiantaiPanel.prototype.checkShowRedIcon3 = function () {
        Manager.render.remove(this.checkShowRedIcon3, this);
        if (!this.basePanel)
            return;
        var lairdBtn = this.basePanel.scrollerList.itemList.getElementAt(1);
        if (lairdBtn)
            lairdBtn.setIconShow(Manager.model.getLaird().checkRedIcon());
    };
    // private updateTower(e:GameObjectAttrEvent = null):void
    // {
    // 	let btn:BaseFuncBtn = this.basePanel.scrollerList.itemList.getElementAt(2) as BaseFuncBtn;
    //     if(btn) 
    // 	{
    // 		let model = Manager.model.getCopy().towerModel;
    // 		btn.setIconShow(OpenCVO.isOpen(OpenConst.ID_JIUXIAOTA) && (model.canSaodang || model.canChallenge()));
    // 	}
    // }
    ClubLunjiantaiPanel.prototype.onClickHandler = function (e) {
        _super.prototype.onClickHandler.call(this, e);
        switch (e.currentTarget) {
            case this.basePanel.closeBtn:
            case this.basePanel.backBtn:
                Manager.view.hide(138 /* ClubLunjiantaiPanel */);
                break;
        }
    };
    ClubLunjiantaiPanel.prototype.onFuncBtnChangeHandler = function (e) {
        var index = this.basePanel.scrollerList.itemList.selectedIndex;
        if (index == -1 || index == this._index)
            return;
        var isBack = false;
        switch (index) {
            case 1:
                isBack = !OpenCVO.isOpen(OpenConst.ID_LAIRD, true);
                break;
        }
        if (isBack) {
            if (this._index == undefined || this._index < 0)
                this._index = 0;
            this.basePanel.scrollerList.itemList.selectedIndex = this._index;
            this.basePanel.scrollerList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
            return;
        }
        _super.prototype.onFuncBtnChangeHandler.call(this, e);
        this._index = index;
        if (this._curView) {
            this._curView.dispose();
            this._curView = null;
        }
        // if(index != 2)
        // {
        //     if(this._bg && this._bg.parent)
        //         this._bg.parent.removeChild(this._bg);
        // }
        switch (index) {
            case 0:
                this.basePanel.title = "arenaTitle1_png";
                this.basePanel.setBottomBackTop(982);
                this.basePanel.backImg.source = "common_panelBg_png";
                this._curView = Manager.pool.create(ArenaView);
                break;
            case 1:
                this.basePanel.title = "landlord_title_png";
                this.basePanel.setBottomBackTop(1182);
                this.basePanel.backImg.source = "common_panelBg_png";
                this._curView = Manager.pool.create(LandlordView, this);
                break;
        }
        this.basePanel.addChildAt(this._curView, 2);
    };
    ClubLunjiantaiPanel.prototype.changeMenuItem = function (index) {
        this.basePanel.scrollerList.itemList.selectedIndex = index;
        this.basePanel.scrollerList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
    };
    ClubLunjiantaiPanel.prototype.dispose = function () {
        Manager.render.remove(this.renderInvalid, this);
        Manager.render.remove(this.checkShowRedIcon2, this);
        Manager.render.remove(this.delayCheckShowRedIcon3, this);
        _super.prototype.dispose.call(this);
        if (this._curView != null) {
            this._curView.dispose();
            this._curView = null;
        }
        // if(this._bg) Manager.pool.push(this._bg);
        // this._bg = null;
    };
    return ClubLunjiantaiPanel;
}(Panel));
__reflect(ClubLunjiantaiPanel.prototype, "ClubLunjiantaiPanel");
//# sourceMappingURL=ClubLunjiantaiPanel.js.map