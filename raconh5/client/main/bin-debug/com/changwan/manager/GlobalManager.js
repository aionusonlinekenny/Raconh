var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GlobalManager = (function () {
    function GlobalManager(main) {
        this.gameMain = main;
        this.FRAME_TIME = 1000 / this.gameMain.stage.frameRate;
        this.ANI_INTERVAL = 33;
        this.FRAME_TIME_60 = 1000 / 60;
        this.gameReOpen = false;
        this.lifecyclePause = false;
        this.heartBeatTime = 60 * 1000;
    }
    return GlobalManager;
}());
__reflect(GlobalManager.prototype, "GlobalManager");
//# sourceMappingURL=GlobalManager.js.map