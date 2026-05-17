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
 * 副本通知后端刷怪，账号第一次进入副本特殊处理
 * liangyan
 * create 2018.04.10
 */
var CopyAskMonsterCMD = (function (_super) {
    __extends(CopyAskMonsterCMD, _super);
    function CopyAskMonsterCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.COPY_ASK_MONSTER;
        return _this;
    }
    CopyAskMonsterCMD.prototype.processOut = function (pkg) {
        pkg.writeInt(this.copyID);
    };
    return CopyAskMonsterCMD;
}(BaseCMD));
__reflect(CopyAskMonsterCMD.prototype, "CopyAskMonsterCMD");
//# sourceMappingURL=CopyAskMonsterCMD.js.map