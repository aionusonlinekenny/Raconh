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
 * 魔神降临进入、离开抢夺效果
 * liangyan
 * create 2018-04-24
*/
var DevilGrabEff = /** @class */ (function (_super) {
    __extends(DevilGrabEff, _super);
    function DevilGrabEff() {
        var _this = _super.call(this) || this;
        _this.IMG_W = 300;
        _this.IMG_H = 300;
        _this._stageW = 0;
        _this._stageH = 0;
        _this.start();
        _this.addEvent();
        return _this;
    }
    DevilGrabEff.prototype.start = function () {
        this._img = BitmapRes.create("devil_change_map_png", 0, 0, -1, -1, this.loadFinish, this);
        this.addChild(this._img);
    };
    DevilGrabEff.prototype.addEvent = function () {
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    DevilGrabEff.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    DevilGrabEff.prototype.onResizeHandler = function (e) {
        if (e != null || this._stageW == 0 || this._stageH == 0) {
            this._stageW = Manager.global.gameMain.stage.stageWidth;
            this._stageH = Manager.global.gameMain.stage.stageHeight;
        }
        this.x = Math.round(this._stageW - this.width) / 2;
        this.y = Math.round(this._stageH - this.height) / 2;
    };
    DevilGrabEff.prototype.loadFinish = function () {
        if (this._stageW == 0 || this._stageH == 0) {
            this._stageW = Manager.global.gameMain.stage.stageWidth;
            this._stageH = Manager.global.gameMain.stage.stageHeight;
        }
        this._targetW = Math.ceil(this._stageW / this.IMG_W + 6) * this.IMG_W;
        this._targetH = Math.ceil(this._stageH / this.IMG_H + 6) * this.IMG_H;
        Manager.render.add(this.render, this, 0, 0, null, true);
    };
    DevilGrabEff.prototype.render = function () {
        if (!this._img)
            return;
        if (this._isShow) {
            this._img.width += 210;
            this._img.height += 105;
        }
        else
            this._img.width -= 210;
        this.onResizeHandler(null);
        if (this._img.width >= this._targetW && this._img.height >= this._targetH)
            this._isShow = false;
        else if (this._img.width < this.IMG_W) {
            Manager.render.remove(this.render, this);
            this.hideView();
        }
    };
    DevilGrabEff.prototype.hideView = function () {
        Manager.view.hide(155 /* DevilGrabEff */);
    };
    DevilGrabEff.prototype.show = function () {
        if (!this.parent) {
            this._isShow = true;
            this.onResizeHandler(null);
            Manager.layer.tipImageLayer.addChild(this);
        }
    };
    DevilGrabEff.prototype.hide = function () {
        if (this.parent)
            this.dispose();
    };
    DevilGrabEff.prototype.dispose = function () {
        Manager.render.remove(this.render, this);
        this.removeEvent();
        if (this._img)
            Manager.pool.push(this._img);
        this._img = null;
    };
    return DevilGrabEff;
}(egret.DisplayObjectContainer));
//# sourceMappingURL=DevilGrabEff.js.map