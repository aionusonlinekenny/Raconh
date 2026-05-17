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
 * 副本排行界面
 * luzhihong
 * create 2017-12-1
 */
var CopyRankView = (function (_super) {
    __extends(CopyRankView, _super);
    function CopyRankView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("copy", "CopyRankSkin");
        _this.touchChildren = true;
        return _this;
    }
    CopyRankView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        if (!this._bgImg) {
            this._bgImg = Manager.pool.create(BitmapRemote);
            this._bgImg.x = 0;
            this._bgImg.y = 776;
            this._bgImg.load(PathInfo.getPath("res/common/panel_bg2.png", LoaderType.IMAGE), 720, 130);
            this.addChildAt(this._bgImg, 3);
        }
        this._list.initBtnListData(CopyRankItem, null, true);
        this._list.itemList.layout.gap = -5;
        this.onResizeHandler(null);
    };
    CopyRankView.prototype.getRank = function () {
        Manager.control.getCopy().getRank(this._id, 1);
    };
    /**
     * @param id 副本ID
    */
    CopyRankView.prototype.show = function (id) {
        this._id = id;
        if (this.parent == null) {
            Manager.layer.tipsLayer.addChild(this);
        }
        else
            this.getRank();
    };
    CopyRankView.prototype.hide = function () {
        this.dispose();
    };
    CopyRankView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getCopy().addEventListener(CopyEvent.UPDATE_RANK, this.updateRank, this);
        this.getRank();
    };
    CopyRankView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getCopy().removeEventListener(CopyEvent.UPDATE_RANK, this.updateRank, this);
    };
    CopyRankView.prototype.updateRank = function (e) {
        //[id, index, infos]
        if (e.params[0] == this._id) {
            this._rankInfos = e.params[2];
            this.invalidate("updateRank");
        }
    };
    CopyRankView.prototype.drawRank = function () {
        this._list.dataProvider(this._rankInfos);
        var myInfo;
        for (var i = this._rankInfos.length - 1; i >= 0; i--) {
            if (this._rankInfos[i].id == Manager.model.self.id) {
                myInfo = this._rankInfos[i];
                break;
            }
        }
        if (myInfo) {
            this._txtRank.text = "排名：" + myInfo.rank;
            this._txtValue.text = "当前：" + myInfo.value;
        }
        else {
            this._txtRank.text = "排名：" + "未上榜";
            this._txtValue.text = "当前：" + this.getMyValue();
        }
    };
    CopyRankView.prototype.getMyValue = function () {
        if (this._id == CopyConst.ID_MAIN)
            return CopyCVO.getCVO(this._id).cell;
        return 0;
    };
    CopyRankView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid("updateRank"))
            this.drawRank();
    };
    CopyRankView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
    };
    CopyRankView.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
    };
    CopyRankView.prototype.onClickHandler = function (e) {
        Manager.view.hide(24 /* CopyRankView */);
    };
    CopyRankView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._labelValue, this._bgImg);
        this._labelValue = null;
        if (this._bgImg)
            Manager.pool.push(this._bgImg);
        this._bgImg = null;
        this._list.dispose();
        this._list = null;
        this._txtRank.dispose();
        this._txtRank = null;
        this._txtValue.dispose();
        this._txtValue = null;
        this._btnClose.dispose();
        this._btnClose = null;
        this._rankInfos = null;
    };
    return CopyRankView;
}(UIComponent));
__reflect(CopyRankView.prototype, "CopyRankView", ["IViewManager"]);
//# sourceMappingURL=CopyRankView.js.map