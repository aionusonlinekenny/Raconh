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
 * 好友事件
 * liangyan
 * create 2017-11-06
*/
var FriendsEvent = /** @class */ (function (_super) {
    __extends(FriendsEvent, _super);
    function FriendsEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FriendsEvent.CHANGE_PLAYER_TYPE = "CHANGE_PLAYER_TYPE";
    FriendsEvent.ADD_PLAYER = "ADD_PLAYER";
    FriendsEvent.UPDATE_PLAYER = "UPDATE_PLAYER";
    FriendsEvent.DELETE_PLAYER = "DELETE_PLAYER";
    FriendsEvent.UPDATE_AFTER_DELETE = "UPDATE_AFTER_DELETE";
    /**查找好友成功 */
    FriendsEvent.SEARCH_SUCC = "SEARCH_SUCC";
    /**换一批推荐好友 */
    FriendsEvent.CHANGE_SUGGEST = "CHANGE_SUGGEST";
    /**空列表 */
    FriendsEvent.CLEAR_LIST = "CLEAR_LIST";
    /**显示/隐藏消息tips */
    FriendsEvent.SHOW_HIDE_TIPS = "SHOW_HIDE_TIPS";
    return FriendsEvent;
}(BaseEvent));
//# sourceMappingURL=FriendsEvent.js.map