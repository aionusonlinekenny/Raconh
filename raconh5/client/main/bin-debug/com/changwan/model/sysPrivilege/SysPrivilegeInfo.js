var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SysPrivilegeInfo = (function () {
    function SysPrivilegeInfo() {
        this._isActive = false;
        this._isreward = false;
    }
    /**是否已激活 */
    SysPrivilegeInfo.prototype.setActive = function () {
        this._isActive = true;
    };
    Object.defineProperty(SysPrivilegeInfo.prototype, "isActive", {
        /**是否已激活 */
        get: function () {
            return this._isActive;
        },
        enumerable: true,
        configurable: true
    });
    /**是否已领取 */
    SysPrivilegeInfo.prototype.setReward = function (value) {
        this._isreward = value == 1;
    };
    Object.defineProperty(SysPrivilegeInfo.prototype, "isreward", {
        /**是否已领取 */
        get: function () {
            return this._isreward;
        },
        enumerable: true,
        configurable: true
    });
    return SysPrivilegeInfo;
}());
__reflect(SysPrivilegeInfo.prototype, "SysPrivilegeInfo");
//# sourceMappingURL=SysPrivilegeInfo.js.map