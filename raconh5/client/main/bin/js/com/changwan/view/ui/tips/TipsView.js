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
 * pzx
 * 2017.11.27
 * 提示
 */
var TipsView = /** @class */ (function (_super) {
    __extends(TipsView, _super);
    // private _data:any;
    function TipsView() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("common", "TipsViewSkin");
        return _this;
    }
    TipsView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._content.lineSpacing = 10;
    };
    /**
     * @param textContent 提示内容
     * @param okCallback 确定回调函数
     * @param isShowCancelBtn 是否显示取消按钮
     * @param cancelCallback 取消回调函数
     * @param data 需求传递的数据
    */
    // public show(textContent:string, okCallback:Function = null, isShowCancelBtn:boolean = false, cancelCallback:Function = null, data:any = null):void
    TipsView.prototype.show = function (textContent, okCallback, isShowCancelBtn, cancelCallback) {
        if (okCallback === void 0) { okCallback = null; }
        if (isShowCancelBtn === void 0) { isShowCancelBtn = false; }
        if (cancelCallback === void 0) { cancelCallback = null; }
        this._textContent = textContent;
        // this._okCallback = okCallback;
        // this._cancelCallback = cancelCallback;
        this._ok = okCallback;
        this._cancel = cancelCallback;
        this._isShowCancelBtn = isShowCancelBtn;
        // this._data = data;
        this.invalidate(InvalidationType.DATA);
        if (this.parent == null) {
            this.visible = false;
            this.onResizeHandler(null);
            Manager.layer.tipsLayer.addChild(this);
        }
    };
    TipsView.prototype.hide = function () {
        this.dispose();
    };
    TipsView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    TipsView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this._content.wordWrap = true;
        this.drawData();
    };
    TipsView.prototype.drawData = function () {
        if (this._isShowCancelBtn) {
            this._btnOk.x = 247;
            this._btnCancel.visible = true;
        }
        else {
            this._btnOk.x = 127;
            this._btnCancel.visible = false;
        }
        HtmlUtil.setTextFlow(this._content, this._textContent);
        this.visible = true;
    };
    TipsView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    TipsView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btnCancel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnOk.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    TipsView.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
    };
    TipsView.prototype.onClickHandler = function (e) {
        switch (e.currentTarget) {
            case this._btnOk:
                // if(this._okCallback != null)
                // {
                //     if(this._data) this._okCallback(this._data);
                //     else this._okCallback();
                // }
                if (this._ok != null) {
                    // if(this._data != null)this._ok.callBack.apply(this._ok.target,this._data);
                    // else this._ok.callBack.apply(this._ok.target);
                    this._ok.actCallBack();
                }
                break;
            case this._btnCancel:
                // if(this._cancelCallback != null)
                // {
                //     if(this._data) this._cancelCallback(this._data);
                //     else this._cancelCallback();
                // }
                if (this._cancel != null) {
                    // if(this._data != null)this._cancel.callBack.apply(this._cancel.target,this._data);
                    // else this._cancel.callBack.apply(this._cancel.target);
                    this._cancel.actCallBack();
                }
                break;
        }
        Manager.view.hide(22 /* TipsView */);
    };
    TipsView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._back, this._line, this._btnClose);
        this._back = null;
        this._line = null;
        this._title.dispose();
        this._title = null;
        this._content.dispose();
        this._content = null;
        this._btnCancel.dispose();
        this._btnCancel = null;
        this._btnOk.dispose();
        this._btnOk = null;
        this._btnClose = null;
        // this._okCallback = null;
        // this._cancelCallback = null;
        if (this._ok) {
            Manager.pool.push(this._ok);
            this._ok = null;
        }
        if (this._cancel) {
            Manager.pool.push(this._cancel);
            this._cancel = null;
        }
        // this._data = null;
    };
    return TipsView;
}(UIComponent));
//# sourceMappingURL=TipsView.js.map