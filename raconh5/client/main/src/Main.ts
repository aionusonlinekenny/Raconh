declare var version:number;
declare function setLoading(cur:number):any;//
declare function cleanLoading():void;
declare function loginToken(callBack:Function):void;

class Main extends egret.DisplayObjectContainer
{
    //模块资源列表
    public loadList:Array<string> = [];
    public label:Label;

    public constructor()
    {
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.handleAddToStage,this);
    }

    private onResize(e:egret.Event):void
    {
            Manager.camera.updateSize();
            Manager.config.gameWidth = this.stage.stageWidth;
            Manager.config.gameHeight = this.stage.stageHeight;
            GameDispatcher.getInstance().dispatchEvent(new GlobalEvent(GlobalEvent.RESIZE));
    }

    private handleAddToStage(e:egret.Event):void
    {
        this.stage.addEventListener(egret.Event.RESIZE,this.onResize,this);
        this.initGameSetting();
    }
    
    private initGameSetting()
    {
        //资源跨域设置
        egret.ImageLoader.crossOrigin = "anonymous";
        if(egret.Capabilities.isMobile)
        {
            // this.stage.scaleMode = egret.StageScaleMode.FIXED_NARROW;
            // this.stage.orientation = egret.OrientationMode.PORTRAIT;
        }
        else 
        {
            // this.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
        }
        //资源版本控制
        let vc:RES.VersionController = new RES.VersionController();
        vc.getVirtualUrl = function (url:string):string 
                            {
                                if(url.indexOf("?v") == -1)url = url + "?v=" + Manager.config.clientVersion;
                                // if(url.indexOf("?v") == -1)url = url + "?v=" + Math.random();
                                return url;
                            }         
        RES.registerVersionController(vc);

        // if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB)
        // {
        //     Trace.trace("----run at web-----");
        // }
        // else
        // {
        //     Trace.trace("----run at native-----");
        // }
        this.loadVersion();
        Manager.setup(this);
        Manager.config.gameWidth = this.stage.stageWidth;
        Manager.config.gameHeight = this.stage.stageHeight;
        egret.Capabilities.$boundingClientWidth = Manager.config.gameWidth;
        egret.Capabilities.$boundingClientHeight = Manager.config.gameHeight;
        this.stage.setContentSize(Manager.config.gameWidth, Manager.config.gameHeight);
    }

    private loadVersion():void
    {
        RES.getResByUrl("resource/cw/version.zip?v=" + version,this.onLoadVersionComplete,this,RES.ResourceItem.TYPE_BIN);
    }

    private onLoadVersionComplete(data:ArrayBuffer,url):void
    {
        setLoading(2);
        let zip = new JSZip(data);
        let v:any = zip.file("version.txt");
        let bytes:egret.ByteArray = new egret.ByteArray(v.asArrayBuffer());
        bytes.endian = egret.Endian.LITTLE_ENDIAN;
        let path:PathInfo;
        while(bytes.bytesAvailable > 0)
        {
            new PathInfo(bytes.readUTF(),bytes.readInt());
        }
        this.loadDatas();
        RES.destroyRes(url);
    }

    private loadDatas():void
    {
        Manager.loader.load(Manager.path.getCVOPath(),this.loadDataComplete,this,ResourceGCType.CVO,ResPriorityType.LOAD_LEVEL5);
    }

    private loadDataComplete(loader:Loader):void
    {
        setLoading(3);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.PARSE_CVO_COMPLETE,this.handleParaCVOComplete,this)
        Manager.cvo.loadDataComplete(loader.data);
    }

    private handleParaCVOComplete(e:GlobalEvent):void
    {
        setLoading(4);
        Manager.loader.remove(Manager.path.getCVOPath(),this.loadDataComplete,this);
        this.initRes();
    }

    private initRes()
    {
        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            // egret.ticker.pause();
            // Trace.trace("egret.lifecycle.onPause");
            Manager.global.lifecyclePause = true;
            Manager.sound.webFocusListener();
            Manager.socket.clearPoolPkg();
        }

        egret.lifecycle.onResume = () => {
            // egret.ticker.resume();
            // Trace.trace("egret.lifecycle.onResume");
            Manager.global.lifecyclePause = false;
            Manager.sound.webFocusListener();
            if(Manager.socket.hasInit && !Manager.socket.isConnected) Manager.socket.reConnect();
            GameDispatcher.getInstance().dispatchEvent(new GlobalEvent(GlobalEvent.LIFECYCLE_RESUME));
        }

        //注入自定义的素材解析器
        egret.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        Manager.loader.asset = egret.getImplementation("eui.IAssetAdapter");
        
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     */
    private onConfigComplete(event: RES.ResourceEvent): void
    {
        setLoading(5);
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        //if(DEBUG)
        // {
        //     let theme = new eui.Theme("resource/default.thm.json", this.stage);
        //     theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
        // }
        // if(RELEASE)
        // {
        //     this.onThemeLoadComplete();
        // }
        let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
    }

    /**
     * 主题文件加载完成,开始预加载
     */
    private onThemeLoadComplete(): void
    {
        setLoading(6);
        this.initPreLoad();
    }

    /**
     * 开始预加载资源
     */
    private initPreLoad():void
    {
        Manager.loader.load(PathInfo.getPath("res/loading/back.jpg", LoaderType.IMAGE), this.onPreLoadComplete, this, ResourceGCType.COMMON, ResPriorityType.LOAD_LEVEL5);//开始加载
    }

    private onPreLoadComplete():void
    {
        setLoading(7);
        Manager.loader.remove(PathInfo.getPath("res/loading/back.jpg", LoaderType.IMAGE),this.loadDataComplete,this);
        //平台初始化
        Manager.platform.init(this.initPlatformComplete, this);
    }
    
    private initPlatformComplete():void
    {
        setLoading(8);
        this.startCreateScene();
    }

    /**
     * 创建场景界面
     */
    protected startCreateScene(): void
    {
        // this.stage.dirtyRegionPolicy = egret.DirtyRegionPolicy.OFF;
        this.checkInitSocket();
    }

    private checkInitSocket():void
    {
        Manager.view.show(ViewID.LoginView);
        // cleanLoading();
        Manager.render.add(cleanLoading, this, 200, 1);
        
        this.label = new Label();
        this.label.y = 1240;
        this.label.textColor = 0xff0000;
        this.label.text = "版本号：" + version;
        if(RELEASE)this.addChild(this.label);
    }
}