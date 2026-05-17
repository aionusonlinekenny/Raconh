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
 * 登陆事件
 * luzhihong
 * create 2017-12-14
 */
var LoginEvent = (function (_super) {
    __extends(LoginEvent, _super);
    function LoginEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 更新膜拜列表
     */
    LoginEvent.RANDOM_NAME = "RANDOM_NAME";
    /**
     * 更新排行数据
     */
    LoginEvent.UPDATE_RANK_LIST = "UPDATE_RANK_LIST";
    return LoginEvent;
}(BaseEvent));
__reflect(LoginEvent.prototype, "LoginEvent");
//# sourceMappingURL=LoginEvent.js.map