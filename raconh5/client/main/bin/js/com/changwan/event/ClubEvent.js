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
 * 宗门Event
 * Simon
 * create 2017-12-16
 */
var ClubEvent = /** @class */ (function (_super) {
    __extends(ClubEvent, _super);
    function ClubEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //宗门信息
    ClubEvent.UPDATE_CLUB_INFO = "UPDATE_CLUB_INFO";
    //宗门推荐加入信息更新
    ClubEvent.UPDATE_CLUB_RECOMMEND = "UPDATE_CLUB_RECOMMEND";
    //宗门更新成员列表信息
    ClubEvent.UPDATE_CLUB_MEMBERINFO_LIST = "UPDATE_CLUB_MEMBERINFO_LIST";
    //宗门更新贡献信息
    ClubEvent.UPDATE_CLUB_DONATE = "UPDATE_CLUB_DONATE";
    //修改宗门公告
    ClubEvent.UPDATE_CLUB_NOTICE = "UPDATE_CLUB_NOTICE";
    //修改宗门职位
    ClubEvent.UPDATE_CLUB_CAREER = "UPDATE_CLUB_CAREER";
    return ClubEvent;
}(BaseEvent));
//# sourceMappingURL=ClubEvent.js.map