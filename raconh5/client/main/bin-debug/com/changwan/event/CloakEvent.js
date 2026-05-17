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
 * pzx
 * 17.12.1
 */
var CloakEvent = (function (_super) {
    __extends(CloakEvent, _super);
    function CloakEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //更新
    CloakEvent.CLOAK_UPDATE_EVENT = "CLOAK_UPDATE_EVENT";
    //选中刷新
    CloakEvent.CLOAK_TAP_EVENT = "CLOAK_TAP_EVENT";
    /** 穿上 */
    CloakEvent.CLOAK_WARE_EVENT = "CLOAK_WARE_EVENT";
    return CloakEvent;
}(BaseEvent));
__reflect(CloakEvent.prototype, "CloakEvent");
//# sourceMappingURL=CloakEvent.js.map