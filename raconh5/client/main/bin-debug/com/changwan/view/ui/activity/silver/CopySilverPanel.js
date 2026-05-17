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
 * 银币副本面板
 * luzhihong
 * create 2017-11-22
 */
var CopySilverPanel = (function (_super) {
    __extends(CopySilverPanel, _super);
    function CopySilverPanel() {
        var _this = _super.call(this, false) || this;
        _this._index = -1;
        return _this;
    }
    CopySilverPanel.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.basePanel.setBottomBackTop(985);
        this.basePanel.title = "activity_title_3_png";
        var btnDatas = [
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "copy_silver_btn_png", imgClick: "copy_silver_btn_png" }
        ];
        this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, btnDatas);
        this.basePanel.scrollerList.itemList.layout.gap = 0;
        Manager.render.add(this.renderInvalid, this);
    };
    CopySilverPanel.prototype.renderInvalid = function (interval) {
        Manager.render.remove(this.renderInvalid, this);
        this.updateSilverCopy();
    };
    CopySilverPanel.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.getCopy().addEventListener(CopyEvent.UPDATE_SINGLE, this.updateSilverCopy, this);
        Manager.model.getCopy().addEventListener(CopyEvent.UPDATE_SINGLE, this.updateSilverCopy, this);
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.updateItem, this);
    };
    CopySilverPanel.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        Manager.model.getCopy().removeEventListener(CopyEvent.UPDATE_SINGLE, this.updateSilverCopy, this);
        Manager.model.getCopy().removeEventListener(CopyEvent.UPDATE_SINGLE, this.updateSilverCopy, this);
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.updateItem, this);
    };
    CopySilverPanel.prototype.updateItem = function (e) {
        this.updateSilverCopy();
    };
    CopySilverPanel.prototype.updateSilverCopy = function (e) {
        if (e === void 0) { e = null; }
        var btn = this.basePanel.scrollerList.itemList.getElementAt(0);
        if (btn) {
            var cvo = CopyCVO.getCVO(CopyConst.ID_SILVER);
            btn.setIconShow(OpenCVO.isOpen(OpenConst.ID_JINYUTANG) && Manager.model.getCopy().expModel.leftCount > 0 && cvo.isLossEnough() && cvo.isAllCondSatisfy());
        }
    };
    CopySilverPanel.prototype.onClickHandler = function (e) {
        _super.prototype.onClickHandler.call(this, e);
        switch (e.currentTarget) {
            case this.basePanel.closeBtn:
            case this.basePanel.backBtn:
                Manager.view.hide(122 /* CopySilverPanel */);
                break;
        }
    };
    CopySilverPanel.prototype.onFuncBtnChangeHandler = function (e) {
        _super.prototype.onFuncBtnChangeHandler.call(this, e);
        var index = this.basePanel.scrollerList.itemList.selectedIndex;
        if (index == -1 || index == this._index)
            return;
        // let isBack:boolean = false;
        // switch(index)
        // {
        // 	case 0:
        // 		isBack = !OpenCVO.isOpen(OpenConst.ID_JINYUTANG, true);
        // 		break;
        // }
        // if(isBack)
        // {
        // 	if(this._index == undefined || this._index < 0) this._index = 0;
        // 	this.basePanel.scrollerList.itemList.selectedIndex = this._index;
        // 	return;
        // }
        this._index = index;
        if (this._curView != null) {
            this._curView.dispose();
        }
        switch (index) {
            case 0:
                this._curView = new CopySilverView();
                break;
        }
        this.basePanel.addChildAt(this._curView, 2);
        // this.basePanel.title = "activity_title_" + this._index + "_png";
    };
    CopySilverPanel.prototype.dispose = function () {
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
    };
    return CopySilverPanel;
}(Panel));
__reflect(CopySilverPanel.prototype, "CopySilverPanel");
//# sourceMappingURL=CopySilverPanel.js.map