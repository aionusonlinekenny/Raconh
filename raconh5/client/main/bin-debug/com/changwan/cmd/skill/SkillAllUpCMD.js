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
 * 技能一键升级协议
 * liangyan
 * create 2017-11-30
*/
var SkillAllUpCMD = (function (_super) {
    __extends(SkillAllUpCMD, _super);
    function SkillAllUpCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.SKILL_ALL_UP;
        return _this;
    }
    SkillAllUpCMD.prototype.processOut = function (pkg) {
        pkg.writeShort(this.arr.length);
        for (var i = 0; i < this.arr.length; i++) {
            pkg.writeShort(this.arr[i].id);
            pkg.writeShort(this.arr[i].level);
        }
    };
    return SkillAllUpCMD;
}(BaseCMD));
__reflect(SkillAllUpCMD.prototype, "SkillAllUpCMD");
//# sourceMappingURL=SkillAllUpCMD.js.map