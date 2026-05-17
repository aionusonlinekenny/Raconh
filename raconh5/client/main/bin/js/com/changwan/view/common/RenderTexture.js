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
var RenderTexture = /** @class */ (function (_super) {
    __extends(RenderTexture, _super);
    function RenderTexture() {
        return _super.call(this) || this;
    }
    RenderTexture.prototype.reuse = function () { };
    RenderTexture.prototype.unuse = function () {
    };
    RenderTexture.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return RenderTexture;
}(egret.RenderTexture));
//# sourceMappingURL=RenderTexture.js.map