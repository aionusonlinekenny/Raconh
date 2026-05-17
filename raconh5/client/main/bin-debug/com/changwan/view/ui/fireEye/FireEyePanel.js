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
 * 火眼金睛panel
 * liangyan
 * create 2017-03-23
*/
var FireEyePanel = (function (_super) {
    __extends(FireEyePanel, _super);
    function FireEyePanel() {
        return _super.call(this, false) || this;
    }
    FireEyePanel.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        // this.basePanel.backBtn.selected = false;
        this._menuBtnContent = [
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "fireEye_btn_png", imgClick: "fireEye_btn_png" },
        ];
        this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, this._menuBtnContent);
        this.basePanel.scrollerList.itemList.layout.gap = 0;
    };
    FireEyePanel.prototype.setPromptSign = function (index) {
        if (this.basePanel) {
            var dis = this.basePanel.scrollerList.itemList.getElementAt(index);
            return dis;
        }
        return null;
    };
    FireEyePanel.prototype.onFuncBtnChangeHandler = function (e) {
        var index = this.basePanel.scrollerList.itemList.selectedIndex;
        if (index == -1)
            return;
        _super.prototype.onFuncBtnChangeHandler.call(this, e);
        if (this._view) {
            this._view.dispose();
            this._view = null;
            if (this._bg0)
                Manager.pool.push(this._bg0);
            this._bg0 = null;
            if (this._bg1)
                Manager.pool.push(this._bg1);
            this._bg1 = null;
        }
        this.basePanel.title = "fireEye_label_title_png";
        this.basePanel.backImg.visible = false;
        switch (index) {
            case 0:
                this.basePanel.scrollerList.itemList.visible = this.basePanel.backBtn.visible = true;
                this.basePanel.setBottomBackTop(970);
                if (this._bg0 == null)
                    this._bg0 = Manager.pool.create(BitmapRemote);
                this._bg0.load(Manager.path.getFireEyePath("back1", Extension.JPG));
                this._bg0.x = 2;
                this._bg0.y = 95;
                this.basePanel.addChildAt(this._bg0, 0);
                this._view = Manager.pool.create(FireEyeView);
                break;
            case 1:
                this.basePanel.scrollerList.itemList.visible = this.basePanel.backBtn.visible = false;
                this.basePanel.setBottomBackTop(1280);
                if (this._bg0 == null)
                    this._bg0 = Manager.pool.create(BitmapRemote);
                this._bg0.load(Manager.path.getFireEyePath("back_0", Extension.JPG));
                this._bg0.x = 3;
                this._bg0.y = 102;
                this.basePanel.addChildAt(this._bg0, 0);
                if (this._bg1 == null)
                    this._bg1 = Manager.pool.create(BitmapRemote);
                this._bg1.load(Manager.path.getFireEyePath("back_1", Extension.JPG));
                this._bg1.x = 3;
                this._bg1.y = 682;
                this.basePanel.addChildAt(this._bg1, 0);
                this._view = Manager.pool.create(FireEyeLevelInfoView);
                break;
            case 2:
                this.basePanel.scrollerList.itemList.visible = this.basePanel.backBtn.visible = false;
                this.basePanel.setBottomBackTop(1280);
                if (this._bg0 == null)
                    this._bg0 = Manager.pool.create(BitmapRemote);
                this._bg0.load(Manager.path.getFireEyePath("back_0", Extension.JPG));
                this._bg0.x = 3;
                this._bg0.y = 102;
                this.basePanel.addChildAt(this._bg0, 0);
                if (this._bg1 == null)
                    this._bg1 = Manager.pool.create(BitmapRemote);
                this._bg1.load(Manager.path.getFireEyePath("back_1", Extension.JPG));
                this._bg1.x = 3;
                this._bg1.y = 682;
                this.basePanel.addChildAt(this._bg1, 0);
                this._view = Manager.pool.create(FireEyeGameView);
                break;
            case 3:
                this.basePanel.scrollerList.itemList.visible = this.basePanel.backBtn.visible = false;
                this.basePanel.setBottomBackTop(1280);
                if (this._bg0 == null)
                    this._bg0 = Manager.pool.create(BitmapRemote);
                this._bg0.load(Manager.path.getFireEyePath("back_0", Extension.JPG));
                this._bg0.x = 3;
                this._bg0.y = 102;
                this.basePanel.addChildAt(this._bg0, 0);
                if (this._bg1 == null)
                    this._bg1 = Manager.pool.create(BitmapRemote);
                this._bg1.load(Manager.path.getFireEyePath("back_1", Extension.JPG));
                this._bg1.x = 3;
                this._bg1.y = 682;
                this.basePanel.addChildAt(this._bg1, 0);
                this._view = Manager.pool.create(FireEyeResultView);
                break;
        }
        if (this._view && !this._view.parent)
            this.addChild(this._view);
    };
    FireEyePanel.prototype.onClickHandler = function (e) {
        _super.prototype.onClickHandler.call(this, e);
        switch (e.currentTarget) {
            case this.basePanel.closeBtn:
            case this.basePanel.backBtn:
                if (this._view instanceof FireEyeView || this._view instanceof FireEyeResultView)
                    Manager.view.hide(136 /* FireEyePanel */);
                else if (this._view instanceof FireEyeLevelInfoView || this._view instanceof FireEyeGameView) {
                    var ok = Manager.pool.create(CallBackInfo, Manager.view.hide, Manager.view, 136 /* FireEyePanel */);
                    var cancel = Manager.pool.create(CallBackInfo, Manager.view.hide, Manager.view, 22 /* TipsView */);
                    Manager.view.show(22 /* TipsView */, LangCVO.getContent("fireEye11"), ok, true, cancel);
                }
                break;
        }
    };
    FireEyePanel.prototype.showView = function (value) {
        this.basePanel.scrollerList.itemList.selectedIndex = value;
        this.basePanel.scrollerList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
    };
    /**根据选中的结果画勾画叉 */
    FireEyePanel.prototype.drawStatus = function (id, newData) {
        if (this._view instanceof FireEyeGameView)
            this._view.drawStatus(id, newData);
    };
    FireEyePanel.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.remove(this._view);
        if (this._view)
            this._view.dispose();
        this._view = null;
        if (this._bg0)
            Manager.pool.push(this._bg0);
        this._bg0 = null;
        if (this._bg1)
            Manager.pool.push(this._bg1);
        this._bg1 = null;
        this._menuBtnContent.length = 0;
    };
    return FireEyePanel;
}(Panel));
__reflect(FireEyePanel.prototype, "FireEyePanel");
//# sourceMappingURL=FireEyePanel.js.map