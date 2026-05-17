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
 *create 2017-12-27
 *description
*/
var ArenaResultView = (function (_super) {
    __extends(ArenaResultView, _super);
    function ArenaResultView() {
        var _this = _super.call(this) || this;
        _this._goodItems = [];
        _this._itemBox = new eui.Group();
        _this._itemBox.y = 378;
        _this.addChild(_this._itemBox);
        _this.skinName = Manager.path.getSkinName("arena", "ArenaResultViewSkin");
        _this.touchChildren = true;
        return _this;
    }
    ArenaResultView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHandler, this);
        this._btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHandler, this);
    };
    ArenaResultView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btnOk.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHandler, this);
        this._btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHandler, this);
    };
    /**
     * @param textContent 倒计时时间（秒）
     * @param okCallback 回调函数
    */
    ArenaResultView.prototype.show = function (infos, countDownTime, callback) {
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
    ArenaResultView.prototype.hide = function () {
        this.dispose();
    };
    ArenaResultView.prototype.setViewByData = function () {
        var resultObj = Manager.model.getArena().resultObj;
        if (resultObj.isWin) {
            this._picFail.visible = false;
            this._txt1.visible = this._txt2.visible = this._txt3.visible = true;
            this._txt1.text = LangCVO.getContent("arena13");
            var str = LangCVO.getContent("arena14") + "<font color='#fd7100' face='Microsoft YaHei'>" + resultObj.enemyName + "</font>";
            HtmlUtil.setTextFlow(this._txt2, str);
            if (resultObj.rankNew < resultObj.rankMax || resultObj.rankNew < resultObj.rankOld) {
                str = LangCVO.getContent("arena16", "<font color='#38b800' face='Microsoft YaHei'>" + resultObj.rankNew + "</font>");
                HtmlUtil.setTextFlow(this._txt3, str);
                // this._txt3.text = LangCVO.getContent("arena16", resultObj.rankNew);
            }
            else
                this._txt3.text = LangCVO.getContent("arena17");
            this._picTitle.source = "result_title_win_png";
        }
        else {
            this._picFail.visible = true;
            this._txt1.visible = this._txt2.visible = this._txt3.visible = false;
            this._picTitle.source = "result_title_fail_png";
        }
        this.disposeItems();
        this._goodItems = [];
        for (var i = 0; i < 2; i++) {
            var item = Manager.pool.create(Goods);
            item.x = i * 150;
            var info = new ItemsModelInfo();
            info.base_id = (i == 0) ? ItemsConst.EXP : ItemsConst.HONOUR;
            info.quantity = (i == 0) ? resultObj.exp : resultObj.honour;
            item.data = info;
            this._itemBox.addChild(item);
            this._goodItems.push(item);
        }
        this._itemBox.x = (this.width - this._itemBox.width) / 2;
        Manager.render.add(this.countDownHandler, this, 1000);
        this.countDownHandler();
    };
    ArenaResultView.prototype.countDownHandler = function () {
        if (this._countDownTime == 0) {
            this.onCloseHandler(null);
            return;
        }
        this._txtTime.text = LangCVO.getContent("arena1", this._countDownTime);
        this._countDownTime--;
    };
    ArenaResultView.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
    };
    ArenaResultView.prototype.onCloseHandler = function (e) {
        Manager.socket.sendOnlyProtocol(Protocol.ARENA_EXIT);
        Manager.view.hide(55 /* ArenaResultView */);
    };
    ArenaResultView.prototype.disposeItems = function () {
        for (var i = 0; i < this._goodItems.length; i++) {
            Manager.pool.push(this._goodItems[i]);
        }
        this._goodItems = null;
    };
    ArenaResultView.prototype.dispose = function () {
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
            this._txt1.dispose();
            this._txt1 = null;
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
    return ArenaResultView;
}(UIComponent));
__reflect(ArenaResultView.prototype, "ArenaResultView", ["IViewManager"]);
//# sourceMappingURL=ArenaResultView.js.map