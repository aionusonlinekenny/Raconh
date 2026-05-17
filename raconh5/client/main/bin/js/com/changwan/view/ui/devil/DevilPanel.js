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
 * 魔神降临panel
 * liangyan
 * create 2018-04-10
*/
var DevilPanel = /** @class */ (function (_super) {
    __extends(DevilPanel, _super);
    function DevilPanel() {
        return _super.call(this, false) || this;
    }
    DevilPanel.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        // this.basePanel.backBtn.selected = false;
        this._menuBtnContent = [];
        this._menuBtnContent.push({ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "devil_btn_png", imgClick: "devil_btn_png" });
        this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, this._menuBtnContent);
        this.basePanel.scrollerList.itemList.layout.gap = 0;
        this.basePanel.setBottomBackTop(980);
    };
    DevilPanel.prototype.onFuncBtnChangeHandler = function (e) {
        var index = this.basePanel.scrollerList.itemList.selectedIndex;
        if (index == -1)
            return;
        _super.prototype.onFuncBtnChangeHandler.call(this, e);
        if (this._view) {
            this._view.dispose();
            this._view = null;
            if (this._bitimg)
                Manager.pool.push(this._bitimg);
            this._bitimg = null;
        }
        switch (index) {
            case 0:
                Manager.control.getDevil().askInfo();
                this.basePanel.title = "devil_title_png";
                // this.basePanel.backImg.source = "";
                this.basePanel.backImg.visible = false;
                this.basePanel.setBottomBackTop(980);
                this._view = Manager.pool.create(DevilView);
                if (this._bitimg == null) {
                    var path = Manager.path.getDevilPath("back", Extension.JPG);
                    this._bitimg = Manager.pool.create(BitmapRemote, path);
                    this._bitimg.x = 6;
                    this._bitimg.y = 110;
                    this.basePanel.addChildAt(this._bitimg, 0);
                }
                break;
        }
        if (this._view && !this._view.parent)
            this.addChild(this._view);
    };
    Object.defineProperty(DevilPanel.prototype, "curView", {
        get: function () {
            return this._view;
        },
        enumerable: true,
        configurable: true
    });
    DevilPanel.prototype.onClickHandler = function (e) {
        _super.prototype.onClickHandler.call(this, e);
        switch (e.currentTarget) {
            case this.basePanel.closeBtn:
            case this.basePanel.backBtn:
                Manager.view.hide(141 /* DevilPanel */);
                break;
        }
    };
    DevilPanel.prototype.dispose = function () {
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
    return DevilPanel;
}(Panel));
//# sourceMappingURL=DevilPanel.js.map