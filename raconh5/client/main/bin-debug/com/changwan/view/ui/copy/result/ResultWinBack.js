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
 *author Anydo
 *create 2017-12-27
 *description
*/
var ResultWinBack = (function (_super) {
    __extends(ResultWinBack, _super);
    function ResultWinBack() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("copy", "ResultWinBackSkin");
        _this.touchChildren = true;
        return _this;
    }
    ResultWinBack.prototype.setBackHeight = function (h) {
        if (h === void 0) { h = 567; }
        this._back.height = h;
        this._txt.y = this._back.y + this._back.height - 81;
        this.btn.y = this._back.y + this._back.height - 121;
    };
    ResultWinBack.prototype.setTxt = function (msg) {
        this._txt.text = msg;
    };
    ResultWinBack.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this._loadComplete) {
            ObjectUtil.removes(this.btnClose, this._back, this.titleImg);
            this._back = null;
            this.btnClose = null;
            this.btn.dispose();
            this.btn = null;
            this._txt.dispose();
            this._txt = null;
            this.titleImg = null;
        }
    };
    return ResultWinBack;
}(UIComponent));
__reflect(ResultWinBack.prototype, "ResultWinBack");
//# sourceMappingURL=ResultWinBack.js.map