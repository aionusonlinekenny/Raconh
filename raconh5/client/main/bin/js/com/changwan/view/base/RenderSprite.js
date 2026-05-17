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
var RenderSprite = /** @class */ (function (_super) {
    __extends(RenderSprite, _super);
    function RenderSprite() {
        return _super.call(this, true) || this;
    }
    RenderSprite.prototype.start = function () {
        _super.prototype.start.call(this);
        this._invalidHash = {};
        this.invalidate(InvalidationType.ALL);
    };
    RenderSprite.prototype.__addedToStage = function (e) {
        this.dispatchRender();
    };
    RenderSprite.prototype.__removeFromStage = function (e) {
        this.removeRender();
    };
    RenderSprite.prototype.validate = function () {
        this._invalidHash = {};
    };
    RenderSprite.prototype.isInvalid = function () {
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
    RenderSprite.prototype.invalidate = function (property) {
        this._invalidHash[property] = true;
        this.dispatchRender();
    };
    RenderSprite.prototype.drawAll = function () { };
    RenderSprite.prototype.draw = function () { };
    RenderSprite.prototype.drawNow = function () {
        if (this.isInvalid(InvalidationType.ALL))
            this.drawAll();
        else
            this.draw();
        this.validate();
    };
    RenderSprite.prototype.dispatchRender = function () {
        if (this.stage == null)
            return;
        Manager.render.add(this.renderInvalid, this);
    };
    RenderSprite.prototype.removeRender = function () {
        Manager.render.remove(this.renderInvalid, this);
    };
    RenderSprite.prototype.renderInvalid = function (interval) {
        this.removeRender();
        this.drawNow();
    };
    RenderSprite.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.removeRender();
        for (var key in this._invalidHash) {
            delete this._invalidHash[key];
        }
    };
    RenderSprite.prototype.disposeSelf = function () {
        _super.prototype.disposeSelf.call(this);
        this.removeRender();
        for (var key in this._invalidHash) {
            delete this._invalidHash[key];
        }
    };
    return RenderSprite;
}(Sprite));
//# sourceMappingURL=RenderSprite.js.map