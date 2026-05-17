var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BaseRender = (function () {
    function BaseRender() {
    }
    BaseRender.prototype.start = function () {
        this._invalidHash = {};
        this.invalidate(InvalidationType.ALL);
    };
    BaseRender.prototype.dispatchRender = function () {
        Manager.render.add(this.renderInvalid, this);
    };
    BaseRender.prototype.renderInvalid = function (interval) {
        this.removeRender();
        this.drawNow();
    };
    BaseRender.prototype.isInvalid = function () {
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
    BaseRender.prototype.validate = function () {
        this._invalidHash = {};
    };
    BaseRender.prototype.drawAll = function () { };
    BaseRender.prototype.draw = function () { };
    BaseRender.prototype.drawNow = function () {
        if (this.isInvalid(InvalidationType.ALL))
            this.drawAll();
        else
            this.draw();
        this.validate();
    };
    BaseRender.prototype.removeRender = function () {
        Manager.render.remove(this.renderInvalid, this);
    };
    BaseRender.prototype.invalidate = function (property) {
        this._invalidHash[property] = true;
        this.dispatchRender();
    };
    BaseRender.prototype.addEvent = function () {
    };
    BaseRender.prototype.removeEvent = function () {
    };
    BaseRender.prototype.stop = function () {
        this.removeRender();
        this.validate();
    };
    BaseRender.prototype.dispose = function () {
        this.removeRender();
        for (var key in this._invalidHash) {
            delete this._invalidHash[key];
        }
    };
    return BaseRender;
}());
__reflect(BaseRender.prototype, "BaseRender", ["cw.IDispose"]);
//# sourceMappingURL=BaseRender.js.map