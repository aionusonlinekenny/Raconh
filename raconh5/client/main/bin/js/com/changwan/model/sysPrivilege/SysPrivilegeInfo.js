var SysPrivilegeInfo = /** @class */ (function () {
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
//# sourceMappingURL=SysPrivilegeInfo.js.map