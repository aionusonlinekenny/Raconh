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
 * drq
 * 功法阁
 * 2018.4.11
 */
var GfgPanel = /** @class */ (function (_super) {
    __extends(GfgPanel, _super);
    function GfgPanel() {
        return _super.call(this, false) || this;
        // this.skinName = Manager.path.getSkinName("gfg", "gfgPanelSkin");
    }
    GfgPanel.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._btnDatas = [
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "role_jingmai_click_png", imgClick: "role_jingmai_click_png", showRedIcon: Manager.model.getJingMai().checkCoin() },
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "juyuan_panel_icon_png", imgClick: "juyuan_panel_icon_png", showRedIcon: Manager.model.getJuyuan().checkCoin() }
        ];
        if (this._bitimg == null) {
            this._bitimg = Manager.pool.create(BitmapRemote);
            this._bitimg.y = 116;
            this.basePanel.addChildAt(this._bitimg, 3);
        }
        this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, this._btnDatas);
        this.basePanel.scrollerList.itemList.layout.gap = 0;
    };
    GfgPanel.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.GUILDCONTRI, this.onGfgIconShowHander, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL, this.onGfgIconShowHander, this);
        Manager.model.getJuyuan().addEventListener(JuyuanEvent.JUYUAN_PROGRESS_UPDATE, this.onGfgIconShowHander, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.COIN, this.onGfgIconShowHander, this);
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onGfgIconShowHander, this);
    };
    GfgPanel.prototype.removeEvent = function () {
        Manager.model.self.removeEventListener(GameObjectAttrEvent.GUILDCONTRI, this.onGfgIconShowHander, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.LEVEL, this.onGfgIconShowHander, this);
        Manager.model.getJuyuan().removeEventListener(JuyuanEvent.JUYUAN_PROGRESS_UPDATE, this.onGfgIconShowHander, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.COIN, this.onGfgIconShowHander, this);
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onGfgIconShowHander, this);
        _super.prototype.removeEvent.call(this);
    };
    //更新红点
    GfgPanel.prototype.onGfgIconShowHander = function (e) {
        if (!e)
            return;
        if (e.type == GameObjectAttrEvent.GUILDCONTRI) {
            var dis = this.basePanel.scrollerList.itemList.getElementAt(0);
            dis.setIconShow(Manager.model.getJingMai().checkCoin());
        }
        if (e.type == GameObjectAttrEvent.LEVEL || e.type == JuyuanEvent.JUYUAN_PROGRESS_UPDATE || e.type == GameObjectAttrEvent.COIN || ItemsEvent.ITEM_UPDATE_EVENT) {
            var dis = this.basePanel.scrollerList.itemList.getElementAt(1);
            dis.setIconShow(Manager.model.getJuyuan().checkCoin());
        }
    };
    GfgPanel.prototype.onFuncBtnChangeHandler = function (e) {
        var index = this.basePanel.scrollerList.itemList.selectedIndex;
        if (index == -1)
            return;
        if (this._curView) {
            this._curView.dispose();
            this._curView = null;
        }
        _super.prototype.onFuncBtnChangeHandler.call(this, e);
        switch (index) {
            case 0:
                if (OpenCVO.isOpen(OpenConst.ID_JINGMAI, true)) {
                    this.basePanel.title = "jingmai_title_png";
                    this.basePanel.setBottomBackTop(978);
                    this._curView = Manager.pool.create(JingmaiView, this);
                    this._bitimg.visible = true;
                    this._bitimg.load(Manager.path.getPanelUiImgPath("jingmai/jingmai_zhengdi", "png"));
                    this._bitimg.y = 171;
                    this._bitimg.x = 70;
                }
                else if (OpenCVO.isOpen(OpenConst.ID_JUYUAN, true)) {
                    Manager.view.show(145 /* GfgPanel */, 1);
                }
                else {
                    Manager.view.show(38 /* ClubPanel */);
                }
                break;
            case 1:
                if (OpenCVO.isOpen(OpenConst.ID_JUYUAN, true)) {
                    this.basePanel.title = "juyuan_title_png";
                    this.basePanel.setBottomBackTop(978);
                    this._bitimg.visible = true;
                    this._bitimg.load(Manager.path.getPanelUiImgPath("juyuan/juyuan_back", "jpg"));
                    this._bitimg.y = 90; //115;
                    this._bitimg.x = 0;
                    this._curView = Manager.pool.create(JuyuanView);
                }
                else if (OpenCVO.isOpen(OpenConst.ID_JINGMAI)) {
                    Manager.view.show(145 /* GfgPanel */, 0);
                }
                else {
                    Manager.view.show(38 /* ClubPanel */);
                }
                break;
        }
        if (this._curView && !this._curView.parent)
            this.addChild(this._curView);
    };
    GfgPanel.prototype.onClickHandler = function (e) {
        _super.prototype.onClickHandler.call(this, e);
        switch (e.currentTarget) {
            case this.basePanel.closeBtn:
            case this.basePanel.backBtn:
                Manager.view.show(38 /* ClubPanel */);
                break;
        }
    };
    GfgPanel.prototype.dispose = function () {
        if (this._curView)
            this._curView.dispose();
        _super.prototype.dispose.call(this);
        ObjectUtil.remove(this._curView);
        this._curView = null;
        if (this._bitimg) {
            Manager.pool.push(this._bitimg);
            this._bitimg = null;
        }
        this._btnDatas = null;
    };
    return GfgPanel;
}(Panel));
//# sourceMappingURL=GfgPanel.js.map