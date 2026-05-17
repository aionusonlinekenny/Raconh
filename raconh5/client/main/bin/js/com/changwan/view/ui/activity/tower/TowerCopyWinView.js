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
 * 爬塔副本胜利结算界面
 * liangyan
 * create 2017-12-27
*/
var TowerCopyWinView = /** @class */ (function (_super) {
    __extends(TowerCopyWinView, _super);
    function TowerCopyWinView() {
        var _this = _super.call(this) || this;
        _this._goodItems = [];
        _this.skinName = Manager.path.getSkinName("copy", "TowerCopyWinViewSkin");
        _this.touchChildren = true;
        return _this;
    }
    TowerCopyWinView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._nextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
    };
    TowerCopyWinView.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._nextBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    TowerCopyWinView.prototype.initData = function () {
        _super.prototype.initData.call(this);
        this.onResizeHandler(null);
    };
    TowerCopyWinView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    TowerCopyWinView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    TowerCopyWinView.prototype.drawData = function () {
        var _this = this;
        if (!this._infos)
            return;
        var goodsLen = this._goodItems.length;
        var infosLen = this._infos.length;
        var max = goodsLen > infosLen ? goodsLen : infosLen;
        var lineMaxCount = 4; //单行最多个数
        var dis = 128; //两个的位置差
        var padding = 42; //间隔
        var itemsH = Math.ceil(infosLen / lineMaxCount) * dis - padding;
        var lineW;
        var item;
        var lineNum = 0;
        for (var i = 0; i < max; i++) {
            if (i < infosLen) {
                if (i >= goodsLen) {
                    item = Manager.pool.create(Goods);
                    this.addChild(item);
                    this._goodItems.push(item);
                }
                if (i % lineMaxCount == 0) {
                    var lineCount = infosLen - Math.floor(i / lineMaxCount) * lineMaxCount;
                    if (lineCount > 4)
                        lineCount = 4;
                    lineW = lineCount * dis - padding;
                }
                this._goodItems[i].x = 330 - lineW / 2 + (i % lineMaxCount) * dis;
                this._goodItems[i].y = 440 - itemsH / 2 + Math.floor(i / lineMaxCount) * dis;
                this._goodItems[i].data = this._infos[i];
            }
            else {
                Manager.pool.push(Goods);
            }
        }
        window.clearInterval(this._interval);
        this._interval = window.setInterval(function () { return _this.countDown(); }, 1000);
        this.countDown();
    };
    TowerCopyWinView.prototype.countDown = function () {
        if (this._countDownTime == 0) {
            Manager.control.getCopy().enter(CopyConst.ID_TOWER);
            this._callback = null;
            Manager.view.hide(62 /* TowerCopyWinView */);
            return;
        }
        this._txt.text = LangCVO.getContent("activity2", this._countDownTime);
        this._countDownTime--;
    };
    TowerCopyWinView.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
    };
    TowerCopyWinView.prototype.onTouchHandler = function (e) {
        switch (e.currentTarget) {
            case this._confirmBtn:
                Manager.view.hide(62 /* TowerCopyWinView */);
                break;
            case this._nextBtn:
                // Manager.control.getCopy().enter(CopyConst.ID_TOWER);
                // this._callback = null;
                // Manager.view.hide(ViewID.TowerCopyWinView);
                var door = Manager.model.getGameobject().getSceneEffByType(SceneEffCVO.TYPE_TOWER);
                if (door) {
                    door.playShow();
                    Manager.model.getAuto().autoHook = false;
                    Manager.walk.moveTo(new egret.Point(2103, 671), Manager.model.getCopy().towerMoveToEnd, Manager.model.getCopy());
                }
                else {
                    Manager.control.getCopy().enter(CopyConst.ID_TOWER);
                }
                this._callback = null;
                Manager.view.hide(62 /* TowerCopyWinView */);
                break;
            case this._btnClose:
                Manager.view.hide(62 /* TowerCopyWinView */);
                break;
        }
    };
    /**
     * @param textContent 倒计时时间（秒）
     * @param okCallback 回调函数
    */
    TowerCopyWinView.prototype.show = function (infos, countDownTime, callback) {
        if (countDownTime === void 0) { countDownTime = 3; }
        if (callback === void 0) { callback = null; }
        this._infos = infos;
        this._countDownTime = countDownTime;
        this._callback = callback;
        if (this.parent == null)
            Manager.layer.tipsLayer.addChild(this);
        this.invalidate(InvalidationType.DATA);
    };
    TowerCopyWinView.prototype.hide = function () {
        if (this.parent)
            this.dispose();
    };
    TowerCopyWinView.prototype.dispose = function () {
        if (this._callback)
            this._callback();
        window.clearInterval(this._interval);
        _super.prototype.dispose.call(this);
        if (this._loadComplete) {
            ObjectUtil.removes(this._back, this._txt, this._confirmBtn, this._nextBtn, this._btnClose);
            this._back.bitmapData = null;
            this._back = null;
            this._txt.dispose();
            this._txt = null;
            this._confirmBtn.dispose();
            this._confirmBtn = null;
            this._nextBtn.dispose();
            this._nextBtn = null;
            this._btnClose.bitmapData = null;
            this._btnClose = null;
            for (var i = this._goodItems.length - 1; i >= 0; i--) {
                Manager.pool.push(this._goodItems[i]);
            }
            this._goodItems = null;
            this._infos = null;
            this._callback = null;
        }
    };
    return TowerCopyWinView;
}(UIComponent));
//# sourceMappingURL=TowerCopyWinView.js.map