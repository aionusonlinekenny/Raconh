var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        //模块资源列表
        _this.loadList = [];
        _this.once(egret.Event.ADDED_TO_STAGE, _this.handleAddToStage, _this);
        return _this;
    }
    Main.prototype.onResize = function (e) {
        Manager.camera.updateSize();
        Manager.config.gameWidth = this.stage.stageWidth;
        Manager.config.gameHeight = this.stage.stageHeight;
        GameDispatcher.getInstance().dispatchEvent(new GlobalEvent(GlobalEvent.RESIZE));
    };
    Main.prototype.handleAddToStage = function (e) {
        this.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
        this.initGameSetting();
    };
    Main.prototype.initGameSetting = function () {
        //资源跨域设置
        egret.ImageLoader.crossOrigin = "anonymous";
        if (egret.Capabilities.isMobile) {
            // this.stage.scaleMode = egret.StageScaleMode.FIXED_NARROW;
            // this.stage.orientation = egret.OrientationMode.PORTRAIT;
        }
        else {
            // this.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
        }
        //资源版本控制
        var vc = new RES.VersionController();
        vc.getVirtualUrl = function (url) {
            if (url.indexOf("?v") == -1)
                url = url + "?v=" + Manager.config.clientVersion;
            // if(url.indexOf("?v") == -1)url = url + "?v=" + Math.random();
            return url;
        };
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
    };
    Main.prototype.loadVersion = function () {
        RES.getResByUrl("resource/cw/version.zip?v=" + version, this.onLoadVersionComplete, this, RES.ResourceItem.TYPE_BIN);
    };
    Main.prototype.onLoadVersionComplete = function (data, url) {
        setLoading(2);
        var zip = new JSZip(data);
        var v = zip.file("version.txt");
        var bytes = new egret.ByteArray(v.asArrayBuffer());
        bytes.endian = egret.Endian.LITTLE_ENDIAN;
        var path;
        while (bytes.bytesAvailable > 0) {
            new PathInfo(bytes.readUTF(), bytes.readInt());
        }
        this.loadDatas();
        RES.destroyRes(url);
    };
    Main.prototype.loadDatas = function () {
        Manager.loader.load(Manager.path.getCVOPath(), this.loadDataComplete, this, ResourceGCType.CVO, ResPriorityType.LOAD_LEVEL5);
    };
    Main.prototype.loadDataComplete = function (loader) {
        setLoading(3);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.PARSE_CVO_COMPLETE, this.handleParaCVOComplete, this);
        Manager.cvo.loadDataComplete(loader.data);
    };
    Main.prototype.handleParaCVOComplete = function (e) {
        setLoading(4);
        Manager.loader.remove(Manager.path.getCVOPath(), this.loadDataComplete, this);
        this.initRes();
    };
    Main.prototype.initRes = function () {
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            // egret.ticker.pause();
            // Trace.trace("egret.lifecycle.onPause");
            Manager.global.lifecyclePause = true;
            Manager.sound.webFocusListener();
            Manager.socket.clearPoolPkg();
        };
        egret.lifecycle.onResume = function () {
            // egret.ticker.resume();
            // Trace.trace("egret.lifecycle.onResume");
            Manager.global.lifecyclePause = false;
            Manager.sound.webFocusListener();
            if (Manager.socket.hasInit && !Manager.socket.isConnected)
                Manager.socket.reConnect();
            GameDispatcher.getInstance().dispatchEvent(new GlobalEvent(GlobalEvent.LIFECYCLE_RESUME));
        };
        //注入自定义的素材解析器
        egret.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        Manager.loader.asset = egret.getImplementation("eui.IAssetAdapter");
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     */
    Main.prototype.onConfigComplete = function (event) {
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
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
    };
    /**
     * 主题文件加载完成,开始预加载
     */
    Main.prototype.onThemeLoadComplete = function () {
        setLoading(6);
        this.initPreLoad();
    };
    /**
     * 开始预加载资源
     */
    Main.prototype.initPreLoad = function () {
        Manager.loader.load(PathInfo.getPath("res/loading/back.jpg", LoaderType.IMAGE), this.onPreLoadComplete, this, ResourceGCType.COMMON, ResPriorityType.LOAD_LEVEL5); //开始加载
    };
    Main.prototype.onPreLoadComplete = function () {
        setLoading(7);
        Manager.loader.remove(PathInfo.getPath("res/loading/back.jpg", LoaderType.IMAGE), this.loadDataComplete, this);
        //平台初始化
        Manager.platform.init(this.initPlatformComplete, this);
    };
    Main.prototype.initPlatformComplete = function () {
        setLoading(8);
        this.startCreateScene();
    };
    /**
     * 创建场景界面
     */
    Main.prototype.startCreateScene = function () {
        // this.stage.dirtyRegionPolicy = egret.DirtyRegionPolicy.OFF;
        this.checkInitSocket();
    };
    Main.prototype.checkInitSocket = function () {
        Manager.view.show(28 /* LoginView */);
        // cleanLoading();
        Manager.render.add(cleanLoading, this, 200, 1);
        this.label = new Label();
        this.label.y = 1240;
        this.label.textColor = 0xff0000;
        this.label.text = "版本号：" + version;
        if (false)
            this.addChild(this.label);
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map