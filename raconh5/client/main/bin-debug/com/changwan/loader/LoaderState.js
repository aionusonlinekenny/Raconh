var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * loader状态
 */
var LoaderState = (function () {
    function LoaderState() {
    }
    /**
     * 等待状态
     */
    LoaderState.WAITING = 0;
    /**
     * 正在加载
     */
    LoaderState.LOADING = 1;
    /**
     * 加载成功
     */
    LoaderState.SUCESS = 2;
    /**
     * 加载失败
     */
    LoaderState.FAIL = 3;
    LoaderState.SUCESS_READY = 4;
    return LoaderState;
}());
__reflect(LoaderState.prototype, "LoaderState");
//# sourceMappingURL=LoaderState.js.map