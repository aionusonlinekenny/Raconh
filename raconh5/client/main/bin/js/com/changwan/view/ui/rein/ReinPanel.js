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
 * 转生主界面
 * liangyan
 * create 2017-12-14
*/
var ReinPanel = /** @class */ (function (_super) {
    __extends(ReinPanel, _super);
    function ReinPanel() {
        return _super.call(this, false) || this;
    }
    ReinPanel.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        // this.basePanel.backBtn.selected = false;
        var boo = Manager.model.getrelicstuff().checkActivity();
        this._menuBtnContent = [];
        if (OpenCVO.isOpen(OpenConst.ID_RELICSTUFF))
            this._menuBtnContent.push({ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "relicStuff_shenbingxiao_png", imgClick: "relicStuff_shenbingxiao_png", showRedIcon: boo });
        if (OpenCVO.isOpen(OpenConst.ID_REIN))
            this._menuBtnContent.push({ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "rein_btn_normal_png", imgClick: "rein_btn_normal_png" });
        this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, this._menuBtnContent);
        this.basePanel.scrollerList.itemList.layout.gap = 0;
        this.basePanel.setBottomBackTop(980);
        Manager.render.add(this.renderInvalid, this);
    };
    ReinPanel.prototype.renderInvalid = function (interval) {
        Manager.render.remove(this.renderInvalid, this);
        this.updateRelic();
        this.updateRein();
    };
    ReinPanel.prototype.setPromptSign = function (index) {
        if (this.basePanel) {
            var dis = this.basePanel.scrollerList.itemList.getElementAt(index);
            return dis;
        }
        return null;
    };
    ReinPanel.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.getrelicstuff().addEventListener(RelicStuffEvent.RELICSTUFF_ACTIVITY_EVENT, this.updateRelic, this);
        Manager.model.getTask().addEventListener(TaskEvent.TASK_UPDATE_EVENT, this.updateRelic, this);
        Manager.model.getTask().addEventListener(TaskEvent.TASK_INIT_EVENT, this.updateRelic, this);
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.updateRein, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL, this.updateRein, this);
        Manager.model.getCopy().addEventListener(CopyEvent.UPDATE_SINGLE, this.updateRein, this);
        Manager.model.getRein().addEventListener(ReinEvent.REIN_BOSS_UPDATE, this.updateRein, this);
    };
    ReinPanel.prototype.removeEvent = function () {
        Manager.model.getrelicstuff().removeEventListener(RelicStuffEvent.RELICSTUFF_ACTIVITY_EVENT, this.updateRelic, this);
        Manager.model.getTask().removeEventListener(TaskEvent.TASK_UPDATE_EVENT, this.updateRelic, this);
        Manager.model.getTask().removeEventListener(TaskEvent.TASK_INIT_EVENT, this.updateRelic, this);
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.updateRein, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.LEVEL, this.updateRein, this);
        Manager.model.getCopy().removeEventListener(CopyEvent.UPDATE_SINGLE, this.updateRein, this);
        Manager.model.getRein().removeEventListener(ReinEvent.REIN_BOSS_UPDATE, this.updateRein, this);
        _super.prototype.removeEvent.call(this);
    };
    ReinPanel.prototype.onFuncBtnChangeHandler = function (e) {
        var index = this.basePanel.scrollerList.itemList.selectedIndex;
        if (index == -1)
            return;
        var isBack = false;
        switch (index) {
            case 1:
                isBack = !OpenCVO.isOpen(OpenConst.ID_REIN, true);
                break;
        }
        if (isBack) {
            this.basePanel.scrollerList.itemList.selectedIndex = this._oldIndex;
            this.basePanel.scrollerList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
            return;
        }
        _super.prototype.onFuncBtnChangeHandler.call(this, e);
        if (this._view) {
            this._view.dispose();
            this._view = null;
            if (this._bitimg)
                Manager.pool.push(this._bitimg);
            this._bitimg = null;
        }
        switch (index) {
            case 1:
                this.basePanel.backImg.source = "";
                if (this._bitimg == null)
                    this._bitimg = Manager.pool.create(BitmapRemote);
                this._bitimg.load(Manager.path.getReinPath("rein_back", Extension.JPG));
                this.basePanel.addChildAt(this._bitimg, 0);
                this._view = Manager.pool.create(ReinView);
                break;
            case 0:
                this.basePanel.backImg.source = "common_panelBg_png";
                this._view = Manager.pool.create(RelicStuffView);
                if (this._bitimg == null) {
                    this._bitimg = Manager.pool.create(BitmapRemote);
                    this._bitimg.y = 116;
                    this._bitimg.x = 0;
                    this.basePanel.addChildAt(this._bitimg, 3);
                    this._bitimg.load(Manager.path.getRelicStuffPath("relicStuffdi", Extension.JPG));
                }
                this._bitimg.visible = true;
                break;
        }
        this.basePanel.title = "rein_title" + index + "_png";
        if (this._view && !this._view.parent) {
            this.addChild(this._view);
            this._oldIndex = index;
        }
    };
    Object.defineProperty(ReinPanel.prototype, "curView", {
        get: function () {
            return this._view;
        },
        enumerable: true,
        configurable: true
    });
    ReinPanel.prototype.onClickHandler = function (e) {
        _super.prototype.onClickHandler.call(this, e);
        switch (e.currentTarget) {
            case this.basePanel.closeBtn:
            case this.basePanel.backBtn:
                Manager.view.hide(37 /* ReinPanel */);
                break;
        }
    };
    ReinPanel.prototype.updateRelic = function (e) {
        if (e === void 0) { e = null; }
        if (!OpenCVO.isOpen(OpenConst.ID_RELICSTUFF))
            return;
        var btn = this.setPromptSign(0);
        if (btn)
            btn.setIconShow(Manager.model.getrelicstuff().checkActivity());
    };
    ReinPanel.prototype.updateRein = function (e) {
        if (e === void 0) { e = null; }
        if (!OpenCVO.isOpen(OpenConst.ID_REIN))
            return;
        var btn = this.setPromptSign(1);
        if (btn)
            btn.setIconShow(Manager.model.getRein().getCheckCanRein());
    };
    ReinPanel.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.remove(this._view);
        if (this._view)
            this._view.dispose();
        this._view = null;
        this._menuBtnContent.length = 0;
        if (this._bitimg) {
            Manager.pool.push(this._bitimg);
            this._bitimg = null;
        }
    };
    return ReinPanel;
}(Panel));
//# sourceMappingURL=ReinPanel.js.map