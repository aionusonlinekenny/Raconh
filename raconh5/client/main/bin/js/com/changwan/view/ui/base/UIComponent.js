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
 * update devil 2017-11-23
 */
var UIComponent = /** @class */ (function (_super) {
    __extends(UIComponent, _super);
    function UIComponent() {
        var _this = _super.call(this) || this;
        _this._invalidHash = {};
        _this._loadComplete = false;
        _this.touchEnabled = false;
        _this.touchChildren = false;
        _this.invalidate(InvalidationType.ALL);
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onCompleteHandler, _this);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.__addedToStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.__removeFromStage, _this);
        return _this;
    }
    UIComponent.prototype.__addedToStage = function (e) {
        this.dispatchRender();
    };
    UIComponent.prototype.__removeFromStage = function (e) {
        this.removeRender();
    };
    UIComponent.prototype.validate = function () {
        this._invalidHash = {};
    };
    UIComponent.prototype.invalidate = function (property) {
        this._invalidHash[property] = true;
        this.dispatchRender();
    };
    UIComponent.prototype.isInvalid = function () {
        var properties = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            properties[_i] = arguments[_i];
        }
        if (this._invalidHash[InvalidationType.ALL])
            return true;
        while (properties.length > 0) {
            if (this._invalidHash[properties.pop()])
                return true;
        }
        return false;
    };
    UIComponent.prototype.drawAll = function () {
        this.drawInit();
    };
    UIComponent.prototype.draw = function () { };
    UIComponent.prototype.drawNow = function () {
        if (this.isInvalid(InvalidationType.ALL))
            this.drawAll();
        else
            this.draw();
        this.validate();
    };
    UIComponent.prototype.dispatchRender = function () {
        if (this.stage == null || !this._loadComplete)
            return;
        Manager.render.add(this.renderInvalid, this);
    };
    UIComponent.prototype.removeRender = function () {
        Manager.render.remove(this.renderInvalid, this);
    };
    UIComponent.prototype.renderInvalid = function (interval) {
        this.removeRender();
        this.drawNow();
    };
    UIComponent.prototype.onCompleteHandler = function (e) {
        this._loadComplete = true;
        this.dispatchRender();
    };
    UIComponent.prototype.configUI = function () {
    };
    UIComponent.prototype.initData = function () { };
    UIComponent.prototype.drawInit = function () {
        this.configUI();
        this.addEvent();
        this.initData();
    };
    UIComponent.prototype.addEvent = function () {
    };
    UIComponent.prototype.removeEvent = function () {
        this.removeEventListener(eui.UIEvent.COMPLETE, this.onCompleteHandler, this);
    };
    UIComponent.prototype.dispose = function () {
        this.removeRender();
        this.removeEvent();
        for (var key in this._invalidHash) {
            delete this._invalidHash[key];
        }
        this._invalidHash = null;
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.__addedToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.__removeFromStage, this);
        if (this.parent)
            this.parent.removeChild(this);
    };
    UIComponent.prototype.reuse = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._invalidHash = {};
        this.invalidate(InvalidationType.ALL);
    };
    UIComponent.prototype.unuse = function () {
        this.removeEvent();
        this.removeRender();
        this.touchEnabled = false;
        this.touchChildren = false;
        for (var key in this._invalidHash) {
            delete this._invalidHash[key];
        }
        if (this.parent)
            this.parent.removeChild(this);
    };
    return UIComponent;
}(eui.Component));
//# sourceMappingURL=UIComponent.js.map