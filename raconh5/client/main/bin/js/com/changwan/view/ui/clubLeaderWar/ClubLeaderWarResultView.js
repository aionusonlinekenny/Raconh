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
var ClubLeaderWarResultView = /** @class */ (function (_super) {
    __extends(ClubLeaderWarResultView, _super);
    function ClubLeaderWarResultView() {
        var _this = _super.call(this) || this;
        _this._goodItems = [];
        _this._itemBox = new eui.Group();
        _this._itemBox.y = 378;
        _this.addChild(_this._itemBox);
        _this.skinName = Manager.path.getSkinName("clubLeaderWar", "ClubLeaderWarResultViewSkin");
        _this.touchChildren = true;
        return _this;
    }
    ClubLeaderWarResultView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHandler, this);
        this._btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHandler, this);
    };
    ClubLeaderWarResultView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btnOk.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHandler, this);
        this._btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHandler, this);
    };
    ClubLeaderWarResultView.prototype.onResizeHandler = function (e) {
        this.x = Math.round((Manager.global.gameMain.stage.stageWidth - this.width) / 2);
    };
    /**
     * @param textContent 倒计时时间（秒）
     * @param okCallback 回调函数
    */
    ClubLeaderWarResultView.prototype.show = function (infos, countDownTime, callback) {
        if (countDownTime === void 0) { countDownTime = 5; }
        if (callback === void 0) { callback = null; }
        this._infos = infos;
        this._countDownTime = countDownTime;
        this._callback = callback;
        if (this.parent == null) {
            this.x = (Manager.config.gameWidth - this.width) >> 1;
            this.y = 213;
            Manager.layer.tipsLayer.addChild(this);
        }
        this.setViewByData();
    };
    ClubLeaderWarResultView.prototype.hide = function () {
        this.dispose();
    };
    ClubLeaderWarResultView.prototype.setViewByData = function () {
        var resultObj = Manager.model.getArena().resultObj;
        if (resultObj.isWin) {
            this._picFail.visible = false;
            this._txt2.visible = this._txt3.visible = true;
            var nameStr = LangCVO.getContent("clubLeaderWar4", "<font color='#FD7100' size='30' face='Microsoft YaHei'>" + resultObj.enemyName + "</font>");
            HtmlUtil.setTextFlow(this._txt2, nameStr);
            this._txt3.text = LangCVO.getContent("clubLeaderWar5", resultObj.winCount, resultObj.rank);
            this._picTitle.source = "result_title_win_png";
        }
        else {
            this._picFail.visible = true;
            this._txt2.visible = this._txt3.visible = false;
            this._picTitle.source = "result_title_fail_png";
        }
        this.disposeItems();
        this._goodItems = [];
        for (var i = 0; i < 2; i++) {
            var item = Manager.pool.create(Goods);
            item.x = i * 150;
            var info = new ItemsModelInfo();
            info.base_id = (i == 0) ? ItemsConst.DONATE : ItemsConst.HONOUR;
            info.quantity = (i == 0) ? resultObj.donate : resultObj.honour;
            item.data = info;
            this._itemBox.addChild(item);
            this._goodItems.push(item);
        }
        this._itemBox.x = (this.width - this._itemBox.width) / 2;
        Manager.render.add(this.countDownHandler, this, 1000);
        this.countDownHandler();
    };
    ClubLeaderWarResultView.prototype.countDownHandler = function () {
        if (this._countDownTime == 0) {
            this.onCloseHandler(null);
            return;
        }
        this._txtTime.text = LangCVO.getContent("clubLeaderWar6", this._countDownTime);
        this._countDownTime--;
    };
    ClubLeaderWarResultView.prototype.onCloseHandler = function (e) {
        Manager.control.getClubLeaderWar().exitQuery();
        Manager.control.getClubLeaderWar().query();
        Manager.view.hide(107 /* ClubLeaderWarResultView */);
    };
    ClubLeaderWarResultView.prototype.disposeItems = function () {
        for (var i = 0; i < this._goodItems.length; i++) {
            Manager.pool.push(this._goodItems[i]);
        }
        this._goodItems = null;
    };
    ClubLeaderWarResultView.prototype.dispose = function () {
        if (this._callback)
            this._callback();
        Manager.render.remove(this.countDownHandler, this);
        _super.prototype.dispose.call(this);
        if (this._loadComplete) {
            this._btnOk.dispose();
            this._btnOk = null;
            this._txtTime.dispose();
            this._txtTime = null;
            this._back = null;
            this._picFail = null;
            this._picTitle = null;
            this._btnClose = null;
            this._txt2.dispose();
            this._txt2 = null;
            this._txt3.dispose();
            this._txt3 = null;
        }
        this.disposeItems();
        this.removeChild(this._itemBox);
        this._itemBox = null;
        this._infos = null;
        this._callback = null;
    };
    return ClubLeaderWarResultView;
}(UIComponent));
//# sourceMappingURL=ClubLeaderWarResultView.js.map