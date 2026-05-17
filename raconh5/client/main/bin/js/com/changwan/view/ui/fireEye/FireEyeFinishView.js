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
 * 火眼金睛完成等待视图
 * liangyan
 * create 2018-03-31
*/
var FireEyeFinishView = /** @class */ (function (_super) {
    __extends(FireEyeFinishView, _super);
    function FireEyeFinishView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("fireEye", "FireEyeFinishViewSkin");
        _this.touchChildren = true;
        return _this;
    }
    FireEyeFinishView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        var path = Manager.path.getFireEyePath("dark_back");
        this._back.load(path);
        this._back.touchEnabled = true;
    };
    FireEyeFinishView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this._back != null)
            Manager.pool.push(this._back);
        this._back = null;
    };
    return FireEyeFinishView;
}(UIComponent));
//# sourceMappingURL=FireEyeFinishView.js.map