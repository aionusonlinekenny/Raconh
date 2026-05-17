/**
 * loader状态
 */
var LoaderState = /** @class */ (function () {
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
//# sourceMappingURL=LoaderState.js.map