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
 * 寻宝
 * pzx
 * create 18.2.7
 */
var ArtifactPanel = (function (_super) {
    __extends(ArtifactPanel, _super);
    function ArtifactPanel() {
        return _super.call(this, false) || this;
    }
    ArtifactPanel.prototype.onFuncBtnChangeHandler = function (e) {
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
                this.basePanel.downFrameImg.visible = false;
                this.basePanel.backBtn.visible = false;
                this.basePanel.scrollerList.visible = false;
                this.basePanel.title = "artifact_lingyange_png";
                this.basePanel.setBottomBackTop(1170);
                this._view = Manager.pool.create(ArtifactView);
                if (this._bitimg == null) {
                    this._bitimg = Manager.pool.create(BitmapRemote);
                    this._bitimg.x = 0;
                    this._bitimg.y = 113;
                    this.basePanel.addChildAt(this._bitimg, 3);
                    this._bitimg.load(Manager.path.getArtifact("artifact_di.jpg"));
                }
                this._bitimg.visible = true;
                if (Manager.view.isOpening(119 /* RollTips */))
                    Manager.view.hide(119 /* RollTips */);
                break;
        }
        if (this._view && !this._view.parent)
            this.addChild(this._view);
    };
    Object.defineProperty(ArtifactPanel.prototype, "curView", {
        get: function () {
            return this._view;
        },
        enumerable: true,
        configurable: true
    });
    ArtifactPanel.prototype.onClickHandler = function (e) {
        _super.prototype.onClickHandler.call(this, e);
        switch (e.currentTarget) {
            case this.basePanel.closeBtn:
            case this.basePanel.backBtn:
                Manager.view.hide(110 /* ArtifactPanel */);
                break;
        }
    };
    ArtifactPanel.prototype.dispose = function () {
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
    return ArtifactPanel;
}(Panel));
__reflect(ArtifactPanel.prototype, "ArtifactPanel");
//# sourceMappingURL=ArtifactPanel.js.map