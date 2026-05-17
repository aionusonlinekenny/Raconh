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
 * BOSS面板
 * luzhihong
 * create 2017-12-23
 */
var BossPanel = (function (_super) {
    __extends(BossPanel, _super);
    function BossPanel() {
        return _super.call(this, false) || this;
    }
    BossPanel.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.basePanel.setBottomBackTop(1200);
        var btnDatas = [
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "boss_btn_0_png", imgClick: "boss_btn_0_png" },
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "boss_btn_1_png", imgClick: "boss_btn_1_png" },
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "devil_btn_png", imgClick: "devil_btn_png" },
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "boss_diaoluo_png", imgClick: "boss_diaoluo_png" }
        ];
        this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, btnDatas);
        this.basePanel.scrollerList.itemList.layout.gap = 0;
        Manager.render.add(this.renderInvalid, this);
    };
    BossPanel.prototype.renderInvalid = function (interval) {
        Manager.render.remove(this.renderInvalid, this);
        this.updateRedIcon();
    };
    BossPanel.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL, this.updateRedIcon, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.TURN_LIVE, this.updateRedIcon, this);
        Manager.model.getCopy().addEventListener(CopyEvent.UPDATE_SINGLE, this.updateRedIcon, this);
        Manager.model.getBoss().addEventListener(BossEvent.CHALLENGE_TIMES, this.updateRedIcon, this);
    };
    BossPanel.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.LEVEL, this.updateRedIcon, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.TURN_LIVE, this.updateRedIcon, this);
        Manager.model.getCopy().removeEventListener(CopyEvent.UPDATE_SINGLE, this.updateRedIcon, this);
        Manager.model.getBoss().removeEventListener(BossEvent.CHALLENGE_TIMES, this.updateRedIcon, this);
    };
    BossPanel.prototype.updateRedIcon = function (e) {
        if (e == null || e instanceof GameObjectAttrEvent || e.type == CopyEvent.UPDATE_SINGLE) {
            this.setBtnRedIcon(0, Manager.model.getBoss().privateChallenge);
        }
        if (e == null || e instanceof GameObjectAttrEvent || e.type == BossEvent.CHALLENGE_TIMES) {
            this.setBtnRedIcon(1, OpenCVO.isOpen(OpenConst.ID_PUBLIC_BOSS) && Manager.model.getBoss().publicChallenge);
        }
    };
    BossPanel.prototype.setBtnRedIcon = function (index, isShow) {
        var btn = this.basePanel.scrollerList.itemList.getElementAt(index);
        if (btn)
            btn.setIconShow(isShow);
    };
    BossPanel.prototype.onClickHandler = function (e) {
        _super.prototype.onClickHandler.call(this, e);
        switch (e.currentTarget) {
            case this.basePanel.closeBtn:
            case this.basePanel.backBtn:
                Manager.view.hide(30 /* BossPanel */);
                break;
        }
    };
    BossPanel.prototype.onFuncBtnChangeHandler = function (e) {
        _super.prototype.onFuncBtnChangeHandler.call(this, e);
        var index = this.basePanel.scrollerList.itemList.selectedIndex;
        if (index == -1)
            return;
        var isBack = false;
        switch (index) {
            case 1:
                isBack = !OpenCVO.isOpen(OpenConst.ID_PUBLIC_BOSS, true);
                break;
        }
        if (isBack) {
            if (this._index == undefined || this._index < 0)
                this._index = 0;
            this.basePanel.scrollerList.itemList.selectedIndex = this._index;
            this.basePanel.scrollerList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
            return;
        }
        this._index = index;
        if (this._curView != null) {
            this._curView.dispose();
            this.basePanel.backImg.visible = true;
            if (this._bitimg)
                Manager.pool.push(this._bitimg);
            this._bitimg = null;
        }
        switch (index) {
            case 0:
                this.basePanel.title = "boss_title_0_png";
                this.basePanel.setBottomBackTop(1280);
                this._curView = new BossPrivateView();
                break;
            case 1:
                this.basePanel.title = "boss_title_1_png";
                this.basePanel.setBottomBackTop(1280);
                this._curView = new BossPublicView();
                break;
            case 2:
                Manager.control.getDevil().askInfo();
                this.basePanel.title = "devil_title_png";
                this.basePanel.backImg.visible = false;
                this.basePanel.setBottomBackTop(980);
                this._curView = new DevilView();
                if (this._bitimg == null) {
                    var path = Manager.path.getDevilPath("back", Extension.JPG);
                    this._bitimg = Manager.pool.create(BitmapRemote, path);
                    this._bitimg.x = 6;
                    this._bitimg.y = 110;
                    this.basePanel.addChildAt(this._bitimg, 0);
                }
                this._curView = new DevilView();
                break;
            case 3:
                this.basePanel.title = "boss_title_3_png";
                this.basePanel.setBottomBackTop(1280);
                this._curView = new RareDropView();
                break;
        }
        this.addChild(this._curView);
    };
    BossPanel.prototype.show = function (tabindex) {
        if (tabindex === void 0) { tabindex = 1; }
        _super.prototype.show.call(this, tabindex);
    };
    BossPanel.prototype.dispose = function () {
        Manager.render.remove(this.renderInvalid, this);
        _super.prototype.dispose.call(this);
        if (this._curView != null) {
            this._curView.dispose();
            this._curView = null;
        }
        if (this._bitimg)
            Manager.pool.push(this._bitimg);
        this._bitimg = null;
    };
    return BossPanel;
}(Panel));
__reflect(BossPanel.prototype, "BossPanel");
//# sourceMappingURL=BossPanel.js.map