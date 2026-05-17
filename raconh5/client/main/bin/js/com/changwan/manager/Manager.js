var Manager = /** @class */ (function () {
    function Manager() {
    }
    Manager.setup = function (main) {
        this.pool = new ObjectPoolManager();
        this.animation = new AnimationManager();
        this.config = new ConfigManager();
        this.path = new PathManager();
        this.global = new GlobalManager(main);
        this.render = new RenderManager();
        this.layer = new LayerManager();
        this.model = new ModelManager();
        this.socket = new SocketManager();
        // this.socket = new SocketManager2();
        this.control = new ControlManager();
        this.loader = new LoaderManager();
        this.cvo = new CVOManager();
        this.camera = new CameraManager();
        this.tips = new TipsManager();
        if (egret.getDefinitionByName("KeyManager"))
            new (egret.getDefinitionByName("KeyManager"))();
        this.view = new ViewManager();
        this.link = new LinkManage();
        this.bodyState = new BodyStateManger();
        this.walk = new WalkManager();
        this.jump = new JumpManager();
        this.sound = new SoundManager();
        this.platform = new PlatformManager();
    };
    return Manager;
}());
//# sourceMappingURL=Manager.js.map