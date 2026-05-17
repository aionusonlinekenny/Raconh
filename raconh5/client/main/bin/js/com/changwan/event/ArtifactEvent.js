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
 *author pzx
 *create 18.2.8
*/
var ArtifactEvent = /** @class */ (function (_super) {
    __extends(ArtifactEvent, _super);
    function ArtifactEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArtifactEvent.ARTIFACT_QUERY_EVENT = "ARTIFACT_QUERY_EVENT";
    /** 寻宝 */
    ArtifactEvent.ARTIFACT_INTEGRAL_EVENT = "ARTIFACT_INTEGRAL_EVENT";
    ArtifactEvent.ARTIFACT_REWARD_EVENT = "ARTIFACT_REWARD_EVENT";
    ArtifactEvent.ARTIFACT_LOG_EVENT = "ARTIFACT_LOG_EVENT";
    return ArtifactEvent;
}(BaseEvent));
//# sourceMappingURL=ArtifactEvent.js.map