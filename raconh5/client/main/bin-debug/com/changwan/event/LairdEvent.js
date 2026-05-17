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
var LairdEvent = (function (_super) {
    __extends(LairdEvent, _super);
    function LairdEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**玩家数据 */
    LairdEvent.LAIRD_INFO_UPDATE = "LAIRD_INFO_UPDATE";
    /**身份数据 */
    LairdEvent.COOLY_INFO_UPDATE = "COOLY_INFO_UPDATE";
    /**抓捕对像信息 */
    LairdEvent.LAIRD_CATCH_INFO_UPDATE = "LAIRD_CATCH_INFO_UPDATE";
    /**信息记录列表 */
    LairdEvent.LAIRD_INTERACTREC_LIST_UPDATE = "LAIRD_INTERACTREC_LIST_UPDATE";
    /**盟会成员信息 */
    LairdEvent.LAIRD_CLUB_MEMBER_INFO_UPDATE = "LAIRD_CLUB_MEMBER_INFO_UPDATE";
    /**提取经验更新 */
    LairdEvent.LAIRD_PICK_EXP_UPDATE = "LAIRD_PICK_EXP_UPDATE";
    /**更新求救次数 */
    LairdEvent.LAIRD_SEEK_HELP_UPDATE = "LAIRD_SEEK_HELP_UPDATE";
    return LairdEvent;
}(BaseEvent));
__reflect(LairdEvent.prototype, "LairdEvent");
//# sourceMappingURL=LairdEvent.js.map