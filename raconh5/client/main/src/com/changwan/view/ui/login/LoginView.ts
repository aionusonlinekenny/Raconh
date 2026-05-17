/**
 * 登陆界面
 * luzhihong
 * create 2017-12-14
 */
class LoginView extends UIComponent implements IViewManager 
{
    private _back: BitmapRemote;
    private _serverBack: eui.Image;
    private _icon: eui.Image;
    private _txtServer: Label;
    private _txtClick: Label;
    private _btnEnter: eui.Image;
    public serverList: any;

    private _inputClient: Label;
    private _groupDebug:eui.Group;

    public constructor() {
        super();
        this.touchChildren = true;
        this.skinName = Manager.path.getSkinName("login", "LoginViewSkin");
    }

    protected configUI(): void {
        super.configUI();
        this._back.load(PathInfo.getPath("res/loading/back.jpg", LoaderType.IMAGE), 880, 1280);

        this.x = -80;
        this._btnEnter.touchEnabled = true;

        
        // if(DEBUG && Manager.model.getLogin().clientName == "")
        // {
        //     this._groupDebug.visible = true;
        //     let str: string = egret.localStorage.getItem("username");
        //     if(str == null) str = new Date().getTime().toString();
        //     if(str && str != "") this._inputClient.text = str;
        // }
        if(Manager.model.getLogin().clientName == "")
        {
            this._groupDebug.visible = true;
            let str: string = egret.localStorage.getItem("username");
            if(str == null) str = new Date().getTime().toString();
            if(str && str != "") this._inputClient.text = str;
        }
    }

    public show(): void {
        if (this.parent == null) Manager.layer.uiLayer.addChild(this);

        // RES.getResByUrl("serverList.json?v=" + Math.random(), this.onLoadServerListComplete,this, RES.ResourceItem.TYPE_TEXT);

        //this.postDataToServer();
        this.setServer({ "name": "脚本网1区", "host": "192.168.3.88", "port": 9001, "serverID": 10001, "state": 0 });
    }

    private postDataToServer() {
        // http://192.168.10.202:8200/api/server_list.php?username=lk12
        var url: string = Manager.config.apiUrl + "server_list.php?username=" + Manager.model.getLogin().clientName;
        var loader: egret.URLLoader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);

        var request: egret.URLRequest = new egret.URLRequest(url);
        request.method = egret.URLRequestMethod.POST;
        //发送数据格式："a=1&b=2&c=3"
        // request.data = new egret.URLVariables("username=" + Manager.model.getLogin().clientName);
        loader.load(request);
    }

    private onGetComplete(event: egret.Event): void {
        var loader: egret.URLLoader = <egret.URLLoader>event.target;
        var data: egret.URLVariables = loader.data;
        // // 1.采用js的解析方法
        // var js = eval("("+data.toString()+")");
        // // 2.采用json解析器方法
        var json = JSON.parse(data.toString());
        this.serverList = json.items;
        //如果有历史服务器，取历史服务器（第一个），无则取最新的服（第二类第一个）
        if (this.serverList[0].list.length > 0) this.setServer(this.serverList[0].list[0]);
        else this.setServer(this.serverList[1].list[0]);
    }

    public hide(): void {
        this.dispose();
    }

    // private onLoadServerListComplete(content:string,url:string):void
    // {
    //     let json = JSON.parse(content);
    //     this.serverList = json.items;
    //     this.setServer(this.serverList[0].list[0]);
    //     RES.destroyRes(url);
    // }

    public setServer(data: any): void {
        // { "name":"202服务器", "host":"192.168.10.202" , "port":9001, "serverID":10001, "state":0 },
        Manager.model.getLogin().serverIP = data.host;
         Manager.model.getLogin().serverIP = "192.168.3.88"//"192.168.1.232";
        //Manager.model.getLogin().serverIP ="192.168.10.54"// data.host;
        Manager.model.getLogin().serverPort = data.port;
        Manager.model.getLogin().ssl_Port = data.ssl_port;
        Manager.model.getLogin().serverId = data.serverID;
        //(0无 1新 2火)
        if (data.state == 1) this._icon.source = "login_iconNew_png";
        else if (data.state == 2) this._icon.source = "login_iconHot_png";
        else this._icon.source = "";
        this._txtServer.text = data.name;
    }

    protected addEvent(): void {
        super.addEvent();

        // GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._serverBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnEnter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        // Manager.model.getLogin().addEventListener(CopyEvent.UPDATE_RANK, this.updateRank, this);
    }

    protected removeEvent(): void {
        super.removeEvent();

        // GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._serverBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnEnter.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        // Manager.model.getLogin().removeEventListener(CopyEvent.UPDATE_RANK, this.updateRank, this);
    }

    // private onResizeHandler(e:GlobalEvent):void
    // {
    //     this.x = Math.round(Manager.config.gameWidth - this.width) / 2;
    // }

    private onClickHandler(e: egret.TouchEvent): void {
        //if (this.serverList == null) return;
        switch (e.currentTarget) {
            case this._serverBack:
                Manager.view.show(ViewID.ServerSelectView, this);
                break;
            case this._btnEnter:
                // if(DEBUG)
                // {
                //     Manager.model.getLogin().clientName = this._inputClient.text;
                //     let key:string = "username";
                //     let value:string = this._inputClient.text;
                //     egret.localStorage.setItem(key,value);
                // }
                  Manager.model.getLogin().clientName = this._inputClient.text;
                    let key:string = "username";
                    let value:string = this._inputClient.text;
                    egret.localStorage.setItem(key,value);

                Manager.socket.init();
                break;
        }
    }

    public dispose(): void {
        super.dispose();
        ObjectUtil.removes(this._serverBack, this._icon, this._btnEnter, this._groupDebug);
        ObjectUtil.disposes(this._back, this._txtServer, this._txtClick, this._inputClient)
        this._back = null;
        this._serverBack = null;
        this._icon = null;
        this._txtServer = null;
        this._txtClick = null;
        this._btnEnter = null;
        this._groupDebug = null;
        this._inputClient = null;
        this.serverList = null;
    }
}