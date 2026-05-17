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
 * drq
 * 聚元 结算界面
 * 2018.4.8
 */
var JuyuanResultView = /** @class */ (function (_super) {
    __extends(JuyuanResultView, _super);
    function JuyuanResultView() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("juyuan", "JuyuanResultSkin");
        return _this;
    }
    JuyuanResultView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        if (!this._bimfont) {
            this._bimfont = Manager.pool.create(NumImgView2);
            this._bimfont.x = 238 + 115 + 10;
            this._bimfont.y = 560;
            this.addChild(this._bimfont);
        }
    };
    JuyuanResultView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
    };
    JuyuanResultView.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._enterBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    JuyuanResultView.prototype.initData = function () {
        _super.prototype.initData.call(this);
        this.onResizeHandler(null);
    };
    JuyuanResultView.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
    };
    JuyuanResultView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    JuyuanResultView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    JuyuanResultView.prototype.drawData = function () {
        var name = LangCVO.getContent("juyuan3" + (this._data.id));
        var text = LangCVO.getContent("juyuan7", name);
        var list = Manager.model.getJuyuan().getNextStepList(this._data.sort_id);
        var attr = list.attr;
        var attvo = Manager.pool.create(AttrVO, attr);
        var fight = attvo.getFighting();
        this._ballback.source = "juyuan_icon_" + (this._data.id) + "_png";
        this._txt.text = text;
        this._bimfont.setValue(fight, "nums_fighting_", 28);
        Manager.render.add(this.countDown, this, 1000);
    };
    JuyuanResultView.prototype.countDown = function () {
        if (this._countDownTime == 0) {
            Manager.view.hide(140 /* JuyuanResultView */);
            return;
        }
        this._time.text = LangCVO.getContent("juyuan8", this._countDownTime);
        this._countDownTime--;
    };
    JuyuanResultView.prototype.onTouchHandler = function (e) {
        Manager.view.hide(140 /* JuyuanResultView */);
    };
    /**
     * @param textContent 倒计时时间（秒）
     * @param okCallback 回调函数
    */
    JuyuanResultView.prototype.show = function (curId, countDownTime, callback) {
        if (countDownTime === void 0) { countDownTime = 3; }
        if (callback === void 0) { callback = null; }
        this._data = Manager.model.getJuyuan().getCurList(curId - 1);
        this._ballback;
        this._countDownTime = countDownTime;
        this._callback = callback;
        if (this.parent == null)
            Manager.layer.tipsLayer.addChild(this);
        this.invalidate(InvalidationType.DATA);
    };
    JuyuanResultView.prototype.hide = function () {
        if (this.parent)
            this.dispose();
    };
    JuyuanResultView.prototype.dispose = function () {
        if (this._callback)
            this._callback();
        Manager.render.remove(this.countDown, this);
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._back, this._enterBtn, this._btnClose, this._ballback);
        ObjectUtil.disposes(this._txt, this._time);
        if (this._bimfont)
            this._bimfont.dispose();
        this._back.bitmapData = null;
        this._bimfont = null;
        this._back = null;
        this._txt = null;
        this._time = null;
        this._enterBtn = null;
        this._btnClose = null;
        this._callback = null;
    };
    return JuyuanResultView;
}(UIComponent));
//# sourceMappingURL=JuyuanResultView.js.map