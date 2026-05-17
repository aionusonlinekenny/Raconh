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
 * 副本波数协议
 * luzhihong
 * create 2018.1.12
 */
var CopyWaveCMD = (function (_super) {
    __extends(CopyWaveCMD, _super);
    function CopyWaveCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.COPY_WAVE;
        return _this;
    }
    CopyWaveCMD.prototype.receive = function (pi) {
        // array('name' => 'wheel', 'type' => 'int8', 'desc' => '当前波数'),
        var wave = pi.readByte();
        Manager.model.getCopy().expModel.wave = wave;
        Manager.view.show(74 /* CopyWaveView */, wave);
    };
    return CopyWaveCMD;
}(BaseCMD));
__reflect(CopyWaveCMD.prototype, "CopyWaveCMD");
//# sourceMappingURL=CopyWaveCMD.js.map