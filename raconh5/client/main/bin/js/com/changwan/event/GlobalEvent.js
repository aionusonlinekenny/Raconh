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
 *author Anydo
 *create 2017-11-3
 *description
*/
var GlobalEvent = /** @class */ (function (_super) {
    __extends(GlobalEvent, _super);
    function GlobalEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //进入场景
    GlobalEvent.ENTER_SCENE = "enterScene";
    //点击场景
    GlobalEvent.SCENE_CLICK = "sceneClick";
    //cd冷却
    GlobalEvent.COOL_DOWN_UPDATE = "coolDownUpdate";
    //animation动画加载错误
    GlobalEvent.ANIMATION_LOAD_ERROR = "animationLoadError";
    //远程资源加载错误
    GlobalEvent.RESOURCE_LOAD_FAIL = "resourceLoadFail";
    //animation动画加载完成
    GlobalEvent.ANIMATION_LOAD_COMPLETE = "animationLoadComplete";
    //animation动画播放完毕
    GlobalEvent.ANIMATION_PLAY_COMPLETE = "animationPlayComplete";
    //舞台大小变化
    GlobalEvent.RESIZE = "resize";
    //模板表解析完成
    GlobalEvent.PARSE_CVO_COMPLETE = "parseCVOComplete";
    //从后台切回来、重新获得焦点
    GlobalEvent.LIFECYCLE_RESUME = "lifecycleResume";
    /** 跨天事件 */
    GlobalEvent.CROSS_DAY_EVENT = "CROSS_DAY_EVENT";
    return GlobalEvent;
}(BaseEvent));
//# sourceMappingURL=GlobalEvent.js.map