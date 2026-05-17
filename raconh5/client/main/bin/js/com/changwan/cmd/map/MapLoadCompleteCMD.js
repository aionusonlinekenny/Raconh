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
 *author Anydo
 *create 2017-11-3
 *description
*/
var MapLoadCompleteCMD = /** @class */ (function (_super) {
    __extends(MapLoadCompleteCMD, _super);
    function MapLoadCompleteCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.MAP_LOAD_COMPLETE;
        return _this;
    }
    MapLoadCompleteCMD.prototype.receive = function (pi) {
    };
    return MapLoadCompleteCMD;
}(BaseCMD));
//# sourceMappingURL=MapLoadCompleteCMD.js.map