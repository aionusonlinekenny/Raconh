/**
 * 游戏socket
 */
class SocketManager
{
    private _cmds:Object;
    
	public remoteSocket:egret.WebSocket;
    /**
     * 连接是否已关闭
     */
    public isClose:boolean = true;
    /**
     * 是否正在重连
     */
    public isReconnect:boolean = false;
    /**
     * 是否需要重连
     */
    public needReconnect:boolean = true;
    /**
     * 重连次数
     */
    public reConnectCount:number = 0;

    public isWss:boolean;//true:https  false:http

    public hasInit:boolean = false;

    /** 服务器验证字段0~127,0开始 */
    public verify:number = 0;

    private _readBuffer:egret.ByteArray = new egret.ByteArray();
    private _tempBuffer:egret.ByteArray = new egret.ByteArray();
    private _writeOffset:number = 0;
    private _readOffset:number = 0;
    private _totalLen:number = 0;

    public get isConnected():boolean
    {
        return !this.isClose;
    }

    public constructor()
    {
        this._cmds = {};
        this._pkgs = [];
    }

    public init():void
    {
        if(!this.hasInit) this.hasInit = true;
        this.initRemoteSocket();
    }

    private initRemoteSocket():void
    {
        if(DEBUG)egret.log("开始连接socket");
        if(this.remoteSocket == undefined || this.remoteSocket == null)
        {
            //创建 WebSocket 对象
            this.remoteSocket = new egret.WebSocket();
            //设置数据格式为二进制，默认为字符串
            this.remoteSocket.type = egret.WebSocket.TYPE_BINARY;
        }
        //添加链接打开侦听，连接成功会调用此方法
        this.remoteSocket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        //添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
        this.remoteSocket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        //添加异常侦听，出现异常会调用此方法
        this.remoteSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
        //添加收到数据侦听，收到数据会调用此方法
        this.remoteSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        if(DEBUG)egret.log("开始连接socket2",Manager.model.getLogin().serverIP, Manager.model.getLogin().serverPort);
        //连接服务器
        this.socketConnect();
    }

    private socketConnect():void
    {
        // this.remoteSocket.connect(Manager.model.getLogin().serverIP, Manager.model.getLogin().serverPort);
        let url:string;
        //https链接时，服务端要求在原来的端口号基础上加1000
        if(this.isWss) url = "wss://" + Manager.model.getLogin().serverIP + ":" + (Manager.model.getLogin().ssl_Port);
        else url = "ws://" + Manager.model.getLogin().serverIP + ":" + Manager.model.getLogin().serverPort;
        this.remoteSocket.connectByUrl(url);
    }

    /**
     * 断开连接
     */
    public closeRemoteSocket():void
    {
        egret.log("closeRemoteSocket");
        if(this.remoteSocket)
        {
            this.remoteSocket.removeEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            this.remoteSocket.removeEventListener(egret.Event.CLOSE, this.onSocketClose, this);
            this.remoteSocket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
            this.remoteSocket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            this.remoteSocket.close();
            this.remoteSocket = null;
        }
    }

	private onSocketOpen():void
	{
        Trace.trace("socket connected...");
        egret.log("socket connected...");
        this.isClose = false;
        this.isReconnect = false;
        Manager.control.getLogin().heartbeatLostCount = 0;
        if(this.reConnectCount > 0)
        {
            Manager.model.getLogin().isSocketReConnect = true;
            this.reConnectCount = 0;
        }
        this.verify = 0;

        this.sendServerNeedCMD();
        this.socketCntedHandler();
    }

    /** 服务端需要该协议，socket连接成功时发送 */
    private sendServerNeedCMD():void
    {
        var byte:egret.ByteArray = new egret.ByteArray();
        byte.writeUTFBytes("game_client------------");
        byte.position = 0;
        this.remoteSocket.writeBytes(byte, 0, byte.bytesAvailable);
        this.remoteSocket.flush();
    }

    private onSocketClose():void
    {
        this.isClose = true;
        Trace.trace("socket closed...");
        egret.log("socket closed...");
        this.reConnect();
    }

    private onSocketError(e:egret.IOErrorEvent):void
    {
        this.isClose = true;
        Trace.trace("socket connect error....",e);
        this.reConnect();
    }

	private onReceiveMessage(e:egret.ProgressEvent):void
	{
        let a:number = egret.getTimer();
        this._tempBuffer.clear();
		this.remoteSocket.readBytes(this._tempBuffer);
        this._readBuffer.writeBytes(this._tempBuffer, this._writeOffset, this._tempBuffer.length);
		this._writeOffset += this._tempBuffer.length;
		if(this._writeOffset > 0)
		{
			this._readBuffer.position = 0;
		    this.readPackage();
		}
	}

	//只要有数据就写入缓存，缓存中够一条协议的长度时才会被读出
	private readPackage():void
	{
		var dataLeft:number = this._writeOffset - this._readOffset;
		while(dataLeft > 2 && this._totalLen == 0 || dataLeft >= this._totalLen && this._totalLen > 0)
		{
			var pkg:TCPPacketIn;
			if(this._totalLen == 0)
			{
				this._totalLen = this._readBuffer.readUnsignedShort();
                this._totalLen += 2;//服务端长度只指数据长度，不包含2个字节的协议头，所以前端手动加上2
				this._readOffset += 2;
				dataLeft -= 2;
			}
			if(dataLeft >= this._totalLen)
			{
				pkg = new TCPPacketIn();
				this._readBuffer.readBytes(pkg, 0, this._totalLen);
				this._readOffset += this._totalLen;
				pkg.parse();
				// this.receive(pkg);
                this.addPkg(pkg);
                // Trace.trace("协议头:",pkg.protocol);
				this._totalLen = 0;
			}
			dataLeft = this._writeOffset - this._readOffset;
		}
		//剩下不到一条协议，先写入缓存，再有数据进入继续拼接
		this._readBuffer.position = 0;
		if(dataLeft > 0)
		{
			this._readBuffer.writeBytes(this._readBuffer, this._readOffset, dataLeft);
		}
		this._readOffset = 0;
		this._writeOffset = dataLeft;
	}

    	//只要有数据就写入缓存，缓存中够一条协议的长度时才会被读出
	private render(interval:number):void
	{
        this.receive(this._pkgs.shift());
        if(this._pkgs.length == 0)Manager.render.remove(this.render,this);
	}

    private _pkgs:Array<TCPPacketIn>;

    private addPkg(pkg:TCPPacketIn):void
    {
        if(Manager.global.lifecyclePause || pkg.protocol == Protocol.MAP_ENTER)
        {
            this.receive(pkg);
        }
        else
        {
            if(this._pkgs.length == 0)Manager.render.add(this.render,this);
            this._pkgs.push(pkg);
        }
    }

    public clearPoolPkg():void
    {
        if(this._pkgs == null || this._pkgs.length <= 0) return;
        if(Manager.render.contains(this.render, this)) Manager.render.remove(this.render,this);
        while(this._pkgs.length)
        {
            this.receive(this._pkgs.shift());
        }
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
        if(cmd != null) 
        {
            cmd.receive(pkg);
            pkg.clear();
        }
        else 
        {
            Trace.trace("错误：服务器与客户端协议对不上 " + pkg.protocol);
        }
        if(true)
        {
            // Trace.trace("协议解析时间",pkg.protocol,egret.getTimer() - a);
            // if(pkg.protocol,egret.getTimer() - a >= 10)egret.log("协议解析时间",pkg.protocol,egret.getTimer() - a);
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

    /**
     * 重连socket
     */
    private tryReconnect():void
    {
        if(!this.isClose) return;
        if(!this.needReconnect) return;
        if(this.isReconnect) return;
        this.isReconnect = true;
        this.reConnectCount = 0;
        this.reConnect();
    }

    public reConnect():boolean
    {
        if(!this.isClose) return false;
        if(!this.needReconnect) return false;
        if(Manager.global.lifecyclePause) return false;
        if(false && this.reConnectCount >= 3)
        {
            this.reConnectCount = 0;
            this.closeRemoteSocket();
            this.clearBufferData();
            this.initRemoteSocket();
        } 
        else 
        {
            this.reConnectCount += 1;
            Trace.trace("ReConnect Socket Count:" + this.reConnectCount);
            if(this.remoteSocket)
            {
                this.socketConnect();
            }
        }
        return false;
    }

    private clearBufferData():void
    {
        this._totalLen = 0;
        this._readOffset = 0;
        this._writeOffset = 0;
        this._tempBuffer.clear();
        this._readBuffer.clear();
    }

    public send(msg:TCPPacketOut):void
	{
        if(!this.hasInit) 
        {
            Trace.error("SocketManager未连接就尝试发送协议", msg.protocol);
            return;
        }
        if(this.isClose)
        {
            this.tryReconnect();
            return;
        }
        this.sendMsg(msg);
        msg.clear();
    }

    public sendOnlyProtocol(protocol:number):void
    {
        var out:TCPPacketOut = new TCPPacketOut(protocol);
        this.send(out);
    }

    private sendMsg(datas:TCPPacketOut):void
    {
        if(datas.length == 0) return;
        datas.writePacketLenAndVerify();
        // if(DEBUG)egret.log(cw.ByteUtil.toHexDump("send:" + datas.protocol,datas,0,datas.length));
        this.remoteSocket.writeBytes(datas, 0, datas.bytesAvailable);
        this.remoteSocket.flush();
    }

    /**
     * socket连接成功后操作
     */
	private socketCntedHandler():void
	{
        //发送心跳包
        Manager.control.getLogin().startSendHeartbeat();

        // Manager.control.getRole();
        
        //发送账号登录请求
        Manager.control.getLogin().loginRequest();
    }
}