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
 * 表情
 * liangyan
 * create 2017-11-10
*/
var Face = (function (_super) {
    __extends(Face, _super);
    function Face() {
        return _super.call(this) || this;
    }
    Face.prototype.start = function () {
        _super.prototype.start.call(this);
        this.genFace();
    };
    Face.prototype.genFace = function () {
        this._face = Manager.animation.createFaceAnimation(this._type);
        if (this._face == null)
            return;
        if (!this._face.parent)
            this.addChild(this._face);
    };
    Object.defineProperty(Face.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Face.prototype, "faceName", {
        get: function () {
            var num = Number(this._type);
            if (num < 10)
                return "#0" + this._type;
            else
                return "#" + this._type;
        },
        enumerable: true,
        configurable: true
    });
    Face.prototype.reuse = function (type) {
        this._type = type;
        _super.prototype.reuse.call(this);
    };
    Face.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        Manager.pool.push(this._face);
        this._face = null;
        this._type = "";
    };
    Face.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.remove(this._face);
        Manager.pool.push(this._face);
        this._face = null;
    };
    Face.SIZE = 28;
    return Face;
}(Sprite));
__reflect(Face.prototype, "Face");
//# sourceMappingURL=Face.js.map