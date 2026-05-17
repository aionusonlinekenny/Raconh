var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LandlordType = (function () {
    function LandlordType() {
    }
    /**身份 */
    LandlordType.IDENTITY = 0;
    /**互动 */
    LandlordType.INTERACTION = 1;
    /**抓捕 */
    LandlordType.ARREST = 2;
    /**信息 */
    LandlordType.MESSAGE = 3;
    return LandlordType;
}());
__reflect(LandlordType.prototype, "LandlordType");
//# sourceMappingURL=LandlordType.js.map