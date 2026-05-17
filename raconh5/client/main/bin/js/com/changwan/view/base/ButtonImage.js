/**
 *author Anydo
 *create 2018-4-15
 *description
*/
var ButtonImage = /** @class */ (function () {
    function ButtonImage() {
        this._backIsLoaded = false;
        this._labelIsLoaded = false;
        this._disposeFlag = false;
    }
    Object.defineProperty(ButtonImage.prototype, "enabled", {
        get: function () { return this._enabled; },
        set: function (value) {
            if (this._enabled == value)
                return;
            this._enabled = value;
            if (this._enabled) {
                this._imageContainer.filters = null;
                this._imageContainer.touchEnabled = true;
            }
            else {
                this._imageContainer.touchEnabled = false;
                this._imageBack.source = this._backUpSkin;
                FilterUtil.setGrayFilter(this._imageContainer);
            }
        },
        enumerable: true,
        configurable: true
    });
    ButtonImage.prototype.start = function (imageContainer, tx, ty) {
        this._imageContainer = ObjectUtil.createConainer(true, false);
        this._imageContainer.x = tx;
        this._imageContainer.y = ty;
        imageContainer.addChild(this._imageContainer);
        this._imageBack = BitmapRes.create("", 0, 0, this._width, this._height, this.backLoadedComplete, this);
        this._imageContainer.addChild(this._imageBack);
        this._imageBack.source = this._backUpSkin;
        if (this._labelSkin != "") {
            this._imageLabel = BitmapRes.create("", 0, 0, -1, -1, this.labelLoadedComplete, this);
            this._imageContainer.addChild(this._imageLabel);
            this._imageLabel.source = this._labelSkin;
        }
    };
    ButtonImage.prototype.addEvent = function () {
        this._imageContainer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._imageContainer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onDownHandler, this);
        this._imageContainer.addEventListener(egret.TouchEvent.TOUCH_END, this.onUpHandler, this);
        this._imageContainer.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onUpHandler, this);
    };
    ButtonImage.prototype.removeEvent = function () {
        this._imageContainer.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._imageContainer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onDownHandler, this);
        this._imageContainer.removeEventListener(egret.TouchEvent.TOUCH_END, this.onUpHandler, this);
        this._imageContainer.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onUpHandler, this);
    };
    ButtonImage.prototype.onUpHandler = function (e) {
        if (this._backDownSkin == "")
            return;
        this._imageBack.source = this._backUpSkin;
    };
    ButtonImage.prototype.onDownHandler = function (e) {
        if (!this._enabled)
            return;
        if (this._backDownSkin == "")
            return;
        this._imageBack.source = this._backDownSkin;
    };
    ButtonImage.prototype.onClickHandler = function (e) {
        if (!this._enabled)
            return;
        if (this._callback != null) {
            this._callback.call(this._callbackTarget);
        }
    };
    ButtonImage.prototype.backLoadedComplete = function () {
        if (this._backIsLoaded)
            return;
        this._backIsLoaded = true;
        this.setLabelPos();
    };
    ButtonImage.prototype.labelLoadedComplete = function () {
        this._labelIsLoaded = true;
        this.setLabelPos();
    };
    ButtonImage.prototype.setLabelPos = function () {
        if (!this._backIsLoaded || !this._labelIsLoaded)
            return;
        this._imageLabel.x = (this._imageBack.width - this._imageLabel.width) / 2;
        this._imageLabel.y = (this._imageBack.height - this._imageLabel.height) / 2;
    };
    ButtonImage.create = function (imageContainer, backUpSkin, backDownSkin, labelSkin, clickCallback, callbackTarget, twidth, theight, tx, ty) {
        if (backDownSkin === void 0) { backDownSkin = ""; }
        if (labelSkin === void 0) { labelSkin = ""; }
        if (clickCallback === void 0) { clickCallback = null; }
        if (callbackTarget === void 0) { callbackTarget = null; }
        if (twidth === void 0) { twidth = -1; }
        if (theight === void 0) { theight = -1; }
        if (tx === void 0) { tx = 0; }
        if (ty === void 0) { ty = 0; }
        var result = Manager.pool.create(ButtonImage, imageContainer, backUpSkin, backDownSkin, labelSkin, clickCallback, callbackTarget, twidth, theight, tx, ty);
        return result;
    };
    ButtonImage.prototype.reuse = function (imageContainer, backUpSkin, backDownSkin, labelSkin, clickCallback, callbackTarget, twidth, theight, tx, ty) {
        if (backDownSkin === void 0) { backDownSkin = ""; }
        if (labelSkin === void 0) { labelSkin = ""; }
        if (clickCallback === void 0) { clickCallback = null; }
        if (callbackTarget === void 0) { callbackTarget = null; }
        if (twidth === void 0) { twidth = -1; }
        if (theight === void 0) { theight = -1; }
        if (tx === void 0) { tx = 0; }
        if (ty === void 0) { ty = 0; }
        this._backUpSkin = backUpSkin;
        this._backDownSkin = backDownSkin;
        this._labelSkin = labelSkin;
        this._width = twidth;
        this._height = theight;
        this._callback = clickCallback;
        this._callbackTarget = callbackTarget;
        this._enabled = true;
        this._backIsLoaded = false;
        this._labelIsLoaded = false;
        this._disposeFlag = false;
        this.start(imageContainer, tx, ty);
        this.addEvent();
    };
    ButtonImage.prototype.unuse = function () {
        this.removeEvent();
        ObjectUtil.remove(this._imageContainer);
        this._imageContainer = null;
        if (this._imageBack) {
            Manager.pool.push(this._imageBack);
            this._imageBack = null;
        }
        if (this._imageLabel) {
            Manager.pool.push(this._imageLabel);
            this._imageLabel = null;
        }
        this._callback = null;
        this._callbackTarget = null;
        this._enabled = true;
        this._labelSkin = "";
        this._backUpSkin = "";
        this._backDownSkin = "";
    };
    ButtonImage.prototype.dispose = function () {
        if (!this._disposeFlag) {
            this._disposeFlag = true;
            this.disposeSelf();
        }
        else {
            Trace.error("ButtonImage同时删除多次");
        }
    };
    ButtonImage.prototype.disposeSelf = function () {
        this.removeEvent();
        ObjectUtil.remove(this._imageContainer);
        this._imageContainer = null;
        if (this._imageBack) {
            Manager.pool.push(this._imageBack);
            this._imageBack = null;
        }
        if (this._imageLabel) {
            Manager.pool.push(this._imageLabel);
            this._imageLabel = null;
        }
        this._callback = null;
        this._callbackTarget = null;
    };
    return ButtonImage;
}());
//# sourceMappingURL=ButtonImage.js.map