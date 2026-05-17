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
 *author Anydo
 *create 2017-12-28
 *description
*/
var ArenaAwardView = (function (_super) {
    __extends(ArenaAwardView, _super);
    function ArenaAwardView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("arena", "ArenaAwardViewSkin");
        _this.touchChildren = true;
        return _this;
    }
    ArenaAwardView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._title.y = 145;
        this._popupView.viewY = 167;
        this._popupView.bgHeight = 937;
        this._popupView.diImgVisible = false;
        this._imageBg1.load(Manager.path.getCommonPath("diwenBack1.png"));
        var dailyCVOs = ArenaDailyCVO.cvos;
        this._listV.initBtnListData(ArenaDailyListItem, dailyCVOs, true);
        this._listV.itemList.layout.gap = 5;
        this._maxRankList = new ArenaMaxListView();
        this._maxRankList.x = 35;
        this._maxRankList.y = 949;
        this.addChild(this._maxRankList);
        HtmlUtil.setTextFlow(this._txt1, LangCVO.getContent("arena19"));
        this._txtRank.text = LangCVO.getContent("arena18") + Manager.model.getArena().myRank;
    };
    ArenaAwardView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._popupView.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHandler, this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    ArenaAwardView.prototype.removeEvent = function () {
        this._popupView.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHandler, this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    ArenaAwardView.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
    };
    ArenaAwardView.prototype.onCloseHandler = function (e) {
        Manager.view.hide(58 /* ArenaAwardView */);
    };
    ArenaAwardView.prototype.show = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.parent == null) {
            this.onResizeHandler(null);
            Manager.layer.tipsLayer.addChild(this);
        }
    };
    ArenaAwardView.prototype.hide = function () {
        this.dispose();
        // Manager.view.show(ViewID.ActivityPanel);
        if (Manager.model.getArena().closeOpenBfPanel) {
            Manager.model.getArena().closeOpenBfPanel = false;
            Manager.view.show(138 /* ClubLunjiantaiPanel */, 0);
        }
    };
    ArenaAwardView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this._loadComplete) {
            this._imageBg1.dispose();
            this._imageBg1 = null;
            this._listV.dispose();
            this._listV = null;
            this._popupView.dispose();
            this._popupView = null;
        }
        if (this._maxRankList) {
            this._maxRankList.dispose();
            this._maxRankList = null;
        }
    };
    return ArenaAwardView;
}(UIComponent));
__reflect(ArenaAwardView.prototype, "ArenaAwardView");
//# sourceMappingURL=ArenaAwardView.js.map