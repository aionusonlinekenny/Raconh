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
 * 成功弹出框
 * luzhihong
 * create 2017-12-1
 */
var BossResultWin = /** @class */ (function (_super) {
    __extends(BossResultWin, _super);
    function BossResultWin() {
        var _this = _super.call(this) || this;
        _this._goodItems = [];
        _this.skinName = Manager.path.getSkinName("boss", "BossResultWinSkin");
        _this.touchChildren = true;
        return _this;
    }
    /**
     * @param textContent 倒计时时间（秒）
     * @param okCallback 回调函数
    */
    BossResultWin.prototype.show = function (myRank, infos, countDownTime, callback) {
        if (countDownTime === void 0) { countDownTime = 3; }
        if (callback === void 0) { callback = null; }
        this._myRank = myRank;
        this._infos = infos;
        this._endTime = egret.getTimer() + countDownTime * 1000;
        this._callback = callback;
        if (this.parent == null) {
            Manager.layer.tipsLayer.addChild(this);
            this.onResizeHandler(null);
        }
        this.invalidate(InvalidationType.DATA);
    };
    BossResultWin.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    BossResultWin.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    BossResultWin.prototype.drawData = function () {
        this._txtRank.text = LangCVO.getContent("boss14", this._myRank);
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
                this._goodItems[i].y = 370 - itemsH / 2 + Math.floor(i / lineMaxCount) * dis;
                this._goodItems[i].data = this._infos[i];
            }
            else {
                Manager.pool.push(Goods);
            }
        }
        Manager.render.add(this.countDown, this, 1000);
        this.countDown();
    };
    BossResultWin.prototype.countDown = function () {
        var left = this.leftTime;
        if (left == 0) {
            Manager.view.hide(69 /* BossResultWin */);
            return;
        }
        this._back.setTxt(LangCVO.getContent("activity2", left));
    };
    Object.defineProperty(BossResultWin.prototype, "leftTime", {
        get: function () {
            var left = Math.floor((this._endTime - egret.getTimer()) / 1000);
            return left > 0 ? left : 0;
        },
        enumerable: true,
        configurable: true
    });
    BossResultWin.prototype.hide = function () {
        this.dispose();
    };
    BossResultWin.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._back.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._back.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    BossResultWin.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._back.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._back.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    BossResultWin.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.config.gameWidth - this.width) / 2;
        this.y = 213;
    };
    BossResultWin.prototype.onClickHandler = function (e) {
        // if(this._callback && e.currentTarget != this._btnClose) this._callback();
        Manager.view.hide(69 /* BossResultWin */);
    };
    BossResultWin.prototype.dispose = function () {
        if (this._callback)
            this._callback();
        Manager.render.remove(this.countDown, this);
        _super.prototype.dispose.call(this);
        for (var i = this._goodItems.length - 1; i >= 0; i--) {
            Manager.pool.push(this._goodItems[i]);
        }
        this._goodItems = null;
        if (this._loadComplete) {
            this._back.dispose();
            this._back = null;
            this._txtRank.dispose();
            this._txtRank = null;
        }
        this._infos = null;
        this._callback = null;
    };
    return BossResultWin;
}(UIComponent));
//# sourceMappingURL=BossResultWin.js.map