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
 * 爬塔面板
 * luzhihong
 * create 2017-11-22
 */
var TowerCopyPanel = (function (_super) {
    __extends(TowerCopyPanel, _super);
    function TowerCopyPanel() {
        var _this = _super.call(this, false) || this;
        _this._index = -1;
        return _this;
    }
    TowerCopyPanel.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.basePanel.setBottomBackTop(985);
        this.basePanel.title = "activity_title_1_png";
        var btnDatas = [
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "activity_copy_tower_btn_png", imgClick: "activity_copy_tower_btn_png" },
        ];
        this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, btnDatas);
        this.basePanel.scrollerList.itemList.layout.gap = 0;
        Manager.render.add(this.renderInvalid, this);
    };
    TowerCopyPanel.prototype.renderInvalid = function (interval) {
        Manager.render.remove(this.renderInvalid, this);
        this.updateTower();
    };
    TowerCopyPanel.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL, this.updateTower, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.FIGHT, this.updateTower, this);
    };
    TowerCopyPanel.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.LEVEL, this.updateTower, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.FIGHT, this.updateTower, this);
    };
    TowerCopyPanel.prototype.updateTower = function (e) {
        if (e === void 0) { e = null; }
        var btn = this.basePanel.scrollerList.itemList.getElementAt(0);
        if (btn) {
            var model = Manager.model.getCopy().towerModel;
            btn.setIconShow(OpenCVO.isOpen(OpenConst.ID_JIUXIAOTA) && (model.canSaodang || model.canChallenge()));
        }
    };
    TowerCopyPanel.prototype.onClickHandler = function (e) {
        _super.prototype.onClickHandler.call(this, e);
        switch (e.currentTarget) {
            case this.basePanel.closeBtn:
            case this.basePanel.backBtn:
                Manager.view.hide(121 /* TowerCopyPanel */);
                break;
        }
    };
    TowerCopyPanel.prototype.onFuncBtnChangeHandler = function (e) {
        _super.prototype.onFuncBtnChangeHandler.call(this, e);
        var index = this.basePanel.scrollerList.itemList.selectedIndex;
        if (index == -1 || index == this._index)
            return;
        // let isBack:boolean = false;
        // switch(index)
        // {
        // 	case 0:
        // 		isBack = !OpenCVO.isOpen(OpenConst.ID_JIUXIAOTA, true);
        // 		break;
        // }
        // if(isBack)
        // {
        // 	if(this._index == undefined || this._index < 0) this._index = 0;
        // 	this.basePanel.scrollerList.itemList.selectedIndex = this._index;
        // 	return;
        // }
        this._index = index;
        // if(this._curView != null)
        // {
        // 	this._curView.dispose();
        // 	this.basePanel.backImg.source = "common_panelBg_png";
        // }
        switch (index) {
            case 0:
                this._curView = new TowerCopyView();
                this.basePanel.backImg.source = "";
                if (this._bg == null)
                    this._bg = Manager.pool.create(BitmapRemote);
                this._bg.y = 118;
                this._bg.load(Manager.path.getActivityPath("activity_copy_tower_bg.jpg"));
                this.basePanel.addChildAt(this._bg, this.basePanel.getChildIndex(this.basePanel.backImg) - 1);
                // this.basePanel.setBottomBackTop(985);
                break;
        }
        this.basePanel.addChildAt(this._curView, 2);
        // this.basePanel.title = "activity_title_" + this._index + "_png";
    };
    TowerCopyPanel.prototype.dispose = function () {
        Manager.render.remove(this.renderInvalid, this);
        _super.prototype.dispose.call(this);
        if (this.basePanel != null) {
            this.basePanel.dispose();
            this.basePanel = null;
        }
        if (this._curView != null) {
            this._curView.dispose();
            this._curView = null;
        }
        if (this._bg)
            Manager.pool.push(this._bg);
        this._bg = null;
    };
    return TowerCopyPanel;
}(Panel));
__reflect(TowerCopyPanel.prototype, "TowerCopyPanel");
//# sourceMappingURL=TowerCopyPanel.js.map