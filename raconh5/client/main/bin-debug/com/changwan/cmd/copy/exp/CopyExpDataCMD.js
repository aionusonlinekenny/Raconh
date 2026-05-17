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
 * 经验副本数据协议
 * luzhihong
 * create 2018.1.12
 */
var CopyExpDataCMD = (function (_super) {
    __extends(CopyExpDataCMD, _super);
    function CopyExpDataCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.COPY_EXP_DATA;
        return _this;
    }
    CopyExpDataCMD.prototype.receive = function (pi) {
        // array('name' => 'wheel', 'type' => 'int8', 'desc' => '当前波数'),
        // array('name' => 'inspire', 'type' => 'int16', 'desc' => '鼓舞加成'),
        // array('name' => 'kill_cnt', 'type' => 'int16', 'desc' => '已击杀的怪物数量'),
        // array('name' => 'exp', 'type' => 'int32', 'desc' => '已获得的经验数'),
        Manager.model.getCopy().expModel.initData(pi.readByte(), pi.readShort(), pi.readShort(), pi.readInt());
    };
    return CopyExpDataCMD;
}(BaseCMD));
__reflect(CopyExpDataCMD.prototype, "CopyExpDataCMD");
//# sourceMappingURL=CopyExpDataCMD.js.map