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
 * 绝学
 * pzx
 * create 18.3.1
*/
var JuexueEvent = /** @class */ (function (_super) {
    __extends(JuexueEvent, _super);
    function JuexueEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**绝学 */
    JuexueEvent.JUEXUE_QUERY_EVENT = "JUEXUE_QUERY_EVENT";
    /**绝学升级 */
    JuexueEvent.JUEXUE_UPGRADE_EVENT = "JUEXUE_UPGRADE_EVENT";
    JuexueEvent.JUEXUE_AMBIT_EVENT = "JUEXUE_AMBIT_EVENT";
    return JuexueEvent;
}(BaseEvent));
//# sourceMappingURL=JuexueEvent.js.map