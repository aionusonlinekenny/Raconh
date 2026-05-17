class Manager
{
    public static config:ConfigManager;
    public static path:PathManager;
    public static global:GlobalManager;
    public static render:RenderManager;
    public static control:ControlManager;
    public static model:ModelManager;
    public static loader:LoaderManager;
    public static cvo:CVOManager;
    public static camera:CameraManager;
    public static layer:LayerManager;
    // public static socket:SocketManager2;
    public static socket:SocketManager;
    public static pool:ObjectPoolManager;
    public static animation:AnimationManager;
    public static tips:TipsManager;
    public static view:ViewManager;
    public static link:LinkManage;
    public static bodyState:BodyStateManger;
    public static walk:WalkManager;
    public static jump:JumpManager;
    public static sound:SoundManager;
    public static platform:PlatformManager;

    public static setup(main:Main):void
    {
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
        if(egret.getDefinitionByName("KeyManager"))new (egret.getDefinitionByName("KeyManager"))();
        this.view = new ViewManager();
        this.link = new LinkManage();
        this.bodyState = new BodyStateManger();
        this.walk = new WalkManager();
        this.jump = new JumpManager();
        this.sound = new SoundManager();
        this.platform = new PlatformManager();
    }
}