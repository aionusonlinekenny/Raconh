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
 * 银币副本宝箱
 * luzhihong
 * create 2018.1.20
 */
var CopySilverBoxesCMD = (function (_super) {
    __extends(CopySilverBoxesCMD, _super);
    function CopySilverBoxesCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.COPY_SILVER_BOXES;
        return _this;
    }
    CopySilverBoxesCMD.prototype.receive = function (pi) {
        var boxes = {};
        var len = pi.readShort();
        while (len--) {
            boxes[pi.readByte()] = { id: pi.readInt64(), pos: new egret.Point(pi.readInt(), pi.readInt()), time: pi.readInt(), total: pi.readShort() }; //序号、id、恢复时间戳、总冷却时间
        }
        Manager.model.getCopy().silverModel.boxesData = boxes;
        Manager.model.getCopy().silverModel.dispatchEvent(new CopyEvent(CopyEvent.SILVER_BOXES, boxes));
    };
    return CopySilverBoxesCMD;
}(BaseCMD));
__reflect(CopySilverBoxesCMD.prototype, "CopySilverBoxesCMD");
//# sourceMappingURL=CopySilverBoxesCMD.js.map