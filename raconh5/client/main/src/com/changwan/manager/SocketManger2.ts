class SocketManager2
{
    private _cmds;
    private _pkgs:Array<TCPPacketIn>;
    private onConnect:Function;
    private onClose:Function;
    private onError:Function;
    private thisObject:any;
    private _socket;
    private _isConnected:boolean;


    public hasInit:boolean = false;
    public isWss:boolean;//true:https  false:http
    /**
     * 是否正在重连
     */
    public isReconnect:boolean = false;
    /**
     * 重连次数
     */
    public reConnectCount:number = 0;

    /** 服务器验证字段0~127,0开始 */
    public verify:number = 0;

    /**
     * 是否需要重连
     */
    public needReconnect:boolean = true;

    public constructor()
    {
        this._cmds = {};
        this._pkgs = [];
    }


    public init():void
    {
        if(!this.hasInit) this.hasInit = true;
        Manager.render.add(this.render,this);
        this.initRemoteSocket();
    }

    private initRemoteSocket():void
    {
        if(DEBUG)egret.log("开始连接socket");
        if(this._socket == null) this.connect(Manager.model.getLogin().serverIP,Manager.model.getLogin().serverPort);
    }

    /**
     * 断开连接
     */
    public closeRemoteSocket():void
    {
        egret.log("closeRemoteSocket");
        if(this._socket)
        {
            this.thisObject = null;
            this.onConnect = null;
            this.onError = null;
            this.onClose = null;
            this._socket.close();
            this._socket = null;
        }
    }

    /** 服务端需要该协议，socket连接成功时发送 */
    private sendServerNeedCMD():void
    {
        var pkg:egret.ByteArray = new egret.ByteArray();
        pkg.writeUTFBytes("game_client------------");
        pkg.position = 0;
        this._socket.send(pkg.buffer);
    }
    /**
     * socket连接成功后操作
     */
	private socketCntedHandler():void
	{
        //发送心跳包
        Manager.control.getLogin().startSendHeartbeat();
        //发送账号登录请求
        Manager.control.getLogin().loginRequest();
    }

    public reConnect():boolean
    {
        if(this.isConnected) return false;
        if(!this.needReconnect) return false;
        if(Manager.global.lifecyclePause) return false;
        this.reConnectCount += 1;
        Trace.trace("ReConnect Socket Count:" + this.reConnectCount);
        this.initRemoteSocket();
        return false;
    }

    public clearPoolPkg():void
    {
        if(this._pkgs == null || this._pkgs.length <= 0) return;
        while(this._pkgs.length)
        {
            this.receive(this._pkgs.shift());
        }
    }

    public addCMD(protocol:number,cls:any):void
    {
        if(this._cmds[protocol] == undefined) this._cmds[protocol] = new cls();
    }
    private removeCMD(protocol:number):void
    {
        delete this._cmds[protocol];
    }
    public getCMD<T>(protocol:number):T
    {
        return this._cmds[protocol] as T;
    }

    public addVerify():void
    {
        this.verify ++;
        if(this.verify >= 128) this.verify = 0;
    }

    public send(pkg:TCPPacketOut):void
    {
        if(pkg.length == 0)return;
        if(this.isConnected)
        {
            pkg.writePacketLenAndVerify();
            pkg.position = 0;
            this._socket.send(pkg.buffer);
            Manager.pool.push(pkg);
        }
        else
        {
            this.tryReconnect();
        }
    }
    /**
     * 重连socket
     */
    private tryReconnect():void
    {
        if(this.isConnected) return;
        if(!this.needReconnect) return;
        if(this.isReconnect) return;
        this.isReconnect = true;
        this.reConnectCount = 0;
        this.reConnect();
    }

    public sendOnlyProtocol(protocol:number):void
    {
        var out:TCPPacketOut = new TCPPacketOut(protocol);
        this.send(out);
    }

    public addCallBacks(onConnect:Function, onClose:Function, onError:Function, thisObject:any):void 
    {
        this.onConnect = onConnect;
        this.onClose = onClose;
        this.onError = onError;
        this.thisObject = thisObject;
    }

    public connect(ip:string,port:number):void
    {
        let that = this;
        try
        {
            let socketServerUrl:string;
            if(this.isWss) socketServerUrl = "wss://" + ip + ":" + (port + 1000);
            else socketServerUrl = "ws://" + ip + ":" + port;
            if(egret.Capabilities.runtimeType == egret.RuntimeType.WEB)
            {
                this._socket = new window["WebSocket"](socketServerUrl);
                this._socket.binaryType = "arraybuffer";
                this._socket.onopen = onopen;
                this._socket.onclose = onclose;
                this._socket.onerror = onerror;
                this._socket.onmessage = onmessage
            }
            else
            {
                this._socket = new __global["egret_native"]["WebSocket"](socketServerUrl);
                this._socket.onOpen = onopen;
                this._socket.onClose = onclose;
                this._socket.onError = onerror;
                this._socket.onMessage = onmessage
            }
        }
        catch(e)
        {
            throw new Error(e);
        }

        function onopen():void
        {
            egret.log("socket connect");
            that._isConnected = true;
            that.isReconnect = false;
            Manager.control.getLogin().heartbeatLostCount = 0;
            if(that.reConnectCount > 0)
            {
                Manager.model.getLogin().isSocketReConnect = true;
                that.reConnectCount = 0;
            }
            that.verify = 0;
            that.sendServerNeedCMD();
            that.socketCntedHandler();
            if(that.onConnect != null)that.onConnect.call(that.thisObject);
        }
        function onclose(e):void
        {
            egret.log("socket close");
            that._isConnected = false;
            that._pkgs = [];
            that.reConnect();
            if(that.onClose != null)that.onClose.call(that.thisObject);
        }
        function onerror(e):void
        {
            egret.log("socket error");
            that._isConnected = false;
            that._pkgs = [];
            that.reConnect();
            if(that.onError != null)that.onError.call(that.thisObject);
        }
        function onmessage(msg):void
        {
            let pkg:TCPPacketIn;
            if(egret.Capabilities.runtimeType == egret.RuntimeType.WEB)
            {
                pkg = Manager.pool.create(TCPPacketIn);
                pkg.setArrayBuffer(msg.data);          
            }
            else
            {
                pkg = Manager.pool.create(TCPPacketIn);
                pkg.setArrayBuffer(msg);     
            }
            that._pkgs.push(pkg);
        }
    }

    public get isConnected():boolean
    {
        return this._socket != null && this._isConnected;
    }

    private receive(pkg:TCPPacketIn):void
	{
        let a:number = egret.getTimer();
        if(DEBUG) 
        {
            // Trace.trace(cw.ByteUtil.toHexDump("receive:" + pkg.protocol,pkg,0,pkg.length));
            // egret.log(cw.ByteUtil.toHexDump("receive:" + pkg.protocol,pkg,0,pkg.length));
        }
        var cmd:BaseCMD = this._cmds[pkg.protocol];
        if(cmd != null) cmd.receive(pkg);
        else 
        {
            if(pkg.protocol == 14000)
            {
                Trace.trace("140000");
            }
            Trace.trace("错误：服务器与客户端协议对不上 " + pkg.protocol);
        }
        if(true)
        {
            // Trace.trace("协议解析时间",pkg.protocol,egret.getTimer() - a);
            // if(pkg.protocol,egret.getTimer() - a >= 10)egret.log("协议解析时间",pkg.protocol,egret.getTimer() - a);
        }
	}

    private render(interval:number):void
    {
        if(!this.isConnected)return;
        let length = this._pkgs.length;
        if(length == 0)return;
        let i:number = 0;
        let pkg:TCPPacketIn;
        while(i < length)
        {
            pkg = this._pkgs[i];
            let position:number = pkg.position;
            let length2:number = pkg.length;
            while(position < length2)
            {
                let totalLen:number = pkg.readUnsignedShort() + 2;
                position = pkg.position;
                pkg.protocol = pkg.readShort();
                this.receive(pkg);
                position += totalLen;
                pkg.position = position;
            }
            Manager.pool.push(pkg);
            i++;
        }
        this._pkgs = [];
    }
}