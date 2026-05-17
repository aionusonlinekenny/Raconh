var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 平台相关的静态值
 * luzh
 * create  2018.3.28
 * update
*/
var PlatformConst = (function () {
    function PlatformConst() {
    }
    /*默认平台*/
    PlatformConst.P_DEFAULT = "def";
    /*裤袋平台*/
    PlatformConst.P_KU_DAI = "kudai";
    return PlatformConst;
}());
__reflect(PlatformConst.prototype, "PlatformConst");
//# sourceMappingURL=PlatformConst.js.map