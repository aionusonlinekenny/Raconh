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
 * 寻宝信息列表
 * pzx
 * create 18.2.7
 */
var ArtifactInfoListView = (function (_super) {
    __extends(ArtifactInfoListView, _super);
    function ArtifactInfoListView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("artifact", "ArtifactInfoListViewSkin");
        _this.visible = false;
        _this.touchChildren = true;
        return _this;
    }
    ArtifactInfoListView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._model = Manager.model.getArtifact();
        Manager.control.getArtifact().selfLog();
        this.onResizeHandler(null);
        this._scroll.initBtnListData(ArtifactInfoListItem, [], true);
    };
    ArtifactInfoListView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._model.addEventListener(ArtifactEvent.ARTIFACT_LOG_EVENT, this.drawData, this);
        this._closeImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseHandler, this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    ArtifactInfoListView.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._closeImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseHandler, this);
        this._model.removeEventListener(ArtifactEvent.ARTIFACT_LOG_EVENT, this.drawData, this);
        _super.prototype.removeEvent.call(this);
    };
    ArtifactInfoListView.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
        if (!this.visible)
            this.visible = true;
    };
    ArtifactInfoListView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    ArtifactInfoListView.prototype.drawData = function () {
        var arr = Manager.model.getArtifact().getSelfList();
        if (arr) {
            this._scroll.dataProvider(arr);
        }
    };
    ArtifactInfoListView.prototype.show = function () {
        Manager.layer.tipsLayer.addChild(this);
    };
    ArtifactInfoListView.prototype.hide = function () {
        this.dispose();
    };
    ArtifactInfoListView.prototype.onTouchCloseHandler = function (e) {
        Manager.view.hide(112 /* ArtifactInfoListView */);
    };
    ArtifactInfoListView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._closeImg.parent.removeChild(this._closeImg);
        this._scroll.dispose();
        this._closeImg = null;
        this._scroll = null;
    };
    return ArtifactInfoListView;
}(UIComponent));
__reflect(ArtifactInfoListView.prototype, "ArtifactInfoListView");
//# sourceMappingURL=ArtifactInfoListView.js.map