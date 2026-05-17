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
 * 经验副本击杀数更新协议
 * luzhihong
 * create 2018.1.12
 */
var CopyExpKillsCMD = (function (_super) {
    __extends(CopyExpKillsCMD, _super);
    function CopyExpKillsCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.COPY_EXP_KILLS;
        return _this;
    }
    CopyExpKillsCMD.prototype.receive = function (pi) {
        // array('name' => 'kill_cnt', 'type' => 'int16', 'desc' => '已击杀的怪物数量'),
        Manager.model.getCopy().expModel.kills = pi.readShort();
    };
    return CopyExpKillsCMD;
}(BaseCMD));
__reflect(CopyExpKillsCMD.prototype, "CopyExpKillsCMD");
//# sourceMappingURL=CopyExpKillsCMD.js.map