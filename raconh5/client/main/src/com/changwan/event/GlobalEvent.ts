/**
 *author Anydo
 *create 2017-11-3
 *description 
*/
class GlobalEvent extends BaseEvent
{
	//进入场景
	public static ENTER_SCENE:string = "enterScene";
	//点击场景
	public static SCENE_CLICK:string = "sceneClick";
	//cd冷却
	public static COOL_DOWN_UPDATE:string = "coolDownUpdate";
	//animation动画加载错误
	public static ANIMATION_LOAD_ERROR:string = "animationLoadError";
	//远程资源加载错误
	public static RESOURCE_LOAD_FAIL:string = "resourceLoadFail";
	//animation动画加载完成
	public static ANIMATION_LOAD_COMPLETE:string = "animationLoadComplete";
	//animation动画播放完毕
	public static ANIMATION_PLAY_COMPLETE:string = "animationPlayComplete";
	//舞台大小变化
	public static RESIZE:string = "resize";
	//模板表解析完成
	public static PARSE_CVO_COMPLETE:string = "parseCVOComplete";
	//从后台切回来、重新获得焦点
	public static LIFECYCLE_RESUME:string = "lifecycleResume";
	/** 跨天事件 */
	public static CROSS_DAY_EVENT:string = "CROSS_DAY_EVENT";
}