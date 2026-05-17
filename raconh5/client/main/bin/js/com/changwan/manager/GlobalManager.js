var GlobalManager = /** @class */ (function () {
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
//# sourceMappingURL=GlobalManager.js.map