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
 *  副本挂机点
 * luzhihong
 * create 2017.12.4
 */
var CopyHookPosCMD = (function (_super) {
    __extends(CopyHookPosCMD, _super);
    function CopyHookPosCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.COPY_HOOK_POS;
        return _this;
    }
    CopyHookPosCMD.prototype.receive = function (pi) {
        // array('name' => 'x', 'type' => 'int32', 'desc' => 'x坐标'),
        // array('name' => 'y', 'type' => 'int32', 'desc' => 'y坐标'),
        Manager.model.getAuto().hookPos = new egret.Point(pi.readInt(), pi.readInt());
    };
    return CopyHookPosCMD;
}(BaseCMD));
__reflect(CopyHookPosCMD.prototype, "CopyHookPosCMD");
//# sourceMappingURL=CopyHookPosCMD.js.map