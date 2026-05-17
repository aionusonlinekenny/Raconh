var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏socket
 */
var SocketManager = (function () {
    function SocketManager() {
        /**
         * 连接是否已关闭
         */
        this.isClose = true;
        /**
         * 是否正在重连
         */
        this.isReconnect = false;
        /**
         * 是否需要重连
         */
        this.needReconnect = true;
        /**
         * 重连次数
         */
        this.reConnectCount = 0;
        this.hasInit = false;
        /** 服务器验证字段0~127,0开始 */
        this.verify = 0;
        this._readBuffer = new egret.ByteArray();
        this._tempBuffer = new egret.ByteArray();
        this._writeOffset = 0;
        this._readOffset = 0;
        this._totalLen = 0;
        this._cmds = {};
        this._pkgs = [];
    }
    Object.defineProperty(SocketManager.prototype, "isConnected", {
        get: function () {
            return !this.isClose;
        },
        enumerable: true,
        configurable: true
    });
    SocketManager.prototype.init = function () {
        if (!this.hasInit)
            this.hasInit = true;
        this.initRemoteSocket();
    };
    SocketManager.prototype.initRemoteSocket = function () {
        if (true)
            egret.log("开始连接socket");
        if (this.remoteSocket == undefined || this.remoteSocket == null) {
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
        if (true)
            egret.log("开始连接socket2", Manager.model.getLogin().serverIP, Manager.model.getLogin().serverPort);
        //连接服务器
        this.socketConnect();
    };
    SocketManager.prototype.socketConnect = function () {
        // this.remoteSocket.connect(Manager.model.getLogin().serverIP, Manager.model.getLogin().serverPort);
        var url;
        //https链接时，服务端要求在原来的端口号基础上加1000
        if (this.isWss)
            url = "wss://" + Manager.model.getLogin().serverIP + ":" + (Manager.model.getLogin().ssl_Port);
        else
            url = "ws://" + Manager.model.getLogin().serverIP + ":" + Manager.model.getLogin().serverPort;
        this.remoteSocket.connectByUrl(url);
    };
    /**
     * 断开连接
     */
    SocketManager.prototype.closeRemoteSocket = function () {
        egret.log("closeRemoteSocket");
        if (this.remoteSocket) {
            this.remoteSocket.removeEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            this.remoteSocket.removeEventListener(egret.Event.CLOSE, this.onSocketClose, this);
            this.remoteSocket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
            this.remoteSocket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            this.remoteSocket.close();
            this.remoteSocket = null;
        }
    };
    SocketManager.prototype.onSocketOpen = function () {
        Trace.trace("socket connected...");
        egret.log("socket connected...");
        this.isClose = false;
        this.isReconnect = false;
        Manager.control.getLogin().heartbeatLostCount = 0;
        if (this.reConnectCount > 0) {
            Manager.model.getLogin().isSocketReConnect = true;
            this.reConnectCount = 0;
        }
        this.verify = 0;
        this.sendServerNeedCMD();
        this.socketCntedHandler();
    };
    /** 服务端需要该协议，socket连接成功时发送 */
    SocketManager.prototype.sendServerNeedCMD = function () {
        var byte = new egret.ByteArray();
        byte.writeUTFBytes("game_client------------");
        byte.position = 0;
        this.remoteSocket.writeBytes(byte, 0, byte.bytesAvailable);
        this.remoteSocket.flush();
    };
    SocketManager.prototype.onSocketClose = function () {
        this.isClose = true;
        Trace.trace("socket closed...");
        egret.log("socket closed...");
        this.reConnect();
    };
    SocketManager.prototype.onSocketError = function (e) {
        this.isClose = true;
        Trace.trace("socket connect error....", e);
        this.reConnect();
    };
    SocketManager.prototype.onReceiveMessage = function (e) {
        var a = egret.getTimer();
        this._tempBuffer.clear();
        this.remoteSocket.readBytes(this._tempBuffer);
        this._readBuffer.writeBytes(this._tempBuffer, this._writeOffset, this._tempBuffer.length);
        this._writeOffset += this._tempBuffer.length;
        if (this._writeOffset > 0) {
            this._readBuffer.position = 0;
            this.readPackage();
        }
    };
    //只要有数据就写入缓存，缓存中够一条协议的长度时才会被读出
    SocketManager.prototype.readPackage = function () {
        var dataLeft = this._writeOffset - this._readOffset;
        while (dataLeft > 2 && this._totalLen == 0 || dataLeft >= this._totalLen && this._totalLen > 0) {
            var pkg;
            if (this._totalLen == 0) {
                this._totalLen = this._readBuffer.readUnsignedShort();
                this._totalLen += 2; //服务端长度只指数据长度，不包含2个字节的协议头，所以前端手动加上2
                this._readOffset += 2;
                dataLeft -= 2;
            }
            if (dataLeft >= this._totalLen) {
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
        if (dataLeft > 0) {
            this._readBuffer.writeBytes(this._readBuffer, this._readOffset, dataLeft);
        }
        this._readOffset = 0;
        this._writeOffset = dataLeft;
    };
    //只要有数据就写入缓存，缓存中够一条协议的长度时才会被读出
    SocketManager.prototype.render = function (interval) {
        this.receive(this._pkgs.shift());
        if (this._pkgs.length == 0)
            Manager.render.remove(this.render, this);
    };
    SocketManager.prototype.addPkg = function (pkg) {
        if (Manager.global.lifecyclePause || pkg.protocol == Protocol.MAP_ENTER) {
            this.receive(pkg);
        }
        else {
            if (this._pkgs.length == 0)
                Manager.render.add(this.render, this);
            this._pkgs.push(pkg);
        }
    };
    SocketManager.prototype.clearPoolPkg = function () {
        if (this._pkgs == null || this._pkgs.length <= 0)
            return;
        if (Manager.render.contains(this.render, this))
            Manager.render.remove(this.render, this);
        while (this._pkgs.length) {
            this.receive(this._pkgs.shift());
        }
    };
    SocketManager.prototype.receive = function (pkg) {
        var a = egret.getTimer();
        if (true) {
            // Trace.trace(cw.ByteUtil.toHexDump("receive:" + pkg.protocol,pkg,0,pkg.length));
            // egret.log(cw.ByteUtil.toHexDump("receive:" + pkg.protocol,pkg,0,pkg.length));
        }
        var cmd = this._cmds[pkg.protocol];
        if (cmd != null) {
            cmd.receive(pkg);
            pkg.clear();
        }
        else {
            Trace.trace("错误：服务器与客户端协议对不上 " + pkg.protocol);
        }
        if (true) {
            // Trace.trace("协议解析时间",pkg.protocol,egret.getTimer() - a);
            // if(pkg.protocol,egret.getTimer() - a >= 10)egret.log("协议解析时间",pkg.protocol,egret.getTimer() - a);
        }
    };
    SocketManager.prototype.addCMD = function (protocol, cls) {
        if (this._cmds[protocol] == undefined)
            this._cmds[protocol] = new cls();
    };
    SocketManager.prototype.removeCMD = function (protocol) {
        delete this._cmds[protocol];
    };
    SocketManager.prototype.getCMD = function (protocol) {
        return this._cmds[protocol];
    };
    SocketManager.prototype.addVerify = function () {
        this.verify++;
        if (this.verify >= 128)
            this.verify = 0;
    };
    /**
     * 重连socket
     */
    SocketManager.prototype.tryReconnect = function () {
        if (!this.isClose)
            return;
        if (!this.needReconnect)
            return;
        if (this.isReconnect)
            return;
        this.isReconnect = true;
        this.reConnectCount = 0;
        this.reConnect();
    };
    SocketManager.prototype.reConnect = function () {
        if (!this.isClose)
            return false;
        if (!this.needReconnect)
            return false;
        if (Manager.global.lifecyclePause)
            return false;
        if (false && this.reConnectCount >= 3) {
            this.reConnectCount = 0;
            this.closeRemoteSocket();
            this.clearBufferData();
            this.initRemoteSocket();
        }
        else {
            this.reConnectCount += 1;
            Trace.trace("ReConnect Socket Count:" + this.reConnectCount);
            if (this.remoteSocket) {
                this.socketConnect();
            }
        }
        return false;
    };
    SocketManager.prototype.clearBufferData = function () {
        this._totalLen = 0;
        this._readOffset = 0;
        this._writeOffset = 0;
        this._tempBuffer.clear();
        this._readBuffer.clear();
    };
    SocketManager.prototype.send = function (msg) {
        if (!this.hasInit) {
            Trace.error("SocketManager未连接就尝试发送协议", msg.protocol);
            return;
        }
        if (this.isClose) {
            this.tryReconnect();
            return;
        }
        this.sendMsg(msg);
        msg.clear();
    };
    SocketManager.prototype.sendOnlyProtocol = function (protocol) {
        var out = new TCPPacketOut(protocol);
        this.send(out);
    };
    SocketManager.prototype.sendMsg = function (datas) {
        if (datas.length == 0)
            return;
        datas.writePacketLenAndVerify();
        // if(DEBUG)egret.log(cw.ByteUtil.toHexDump("send:" + datas.protocol,datas,0,datas.length));
        this.remoteSocket.writeBytes(datas, 0, datas.bytesAvailable);
        this.remoteSocket.flush();
    };
    /**
     * socket连接成功后操作
     */
    SocketManager.prototype.socketCntedHandler = function () {
        //发送心跳包
        Manager.control.getLogin().startSendHeartbeat();
        // Manager.control.getRole();
        //发送账号登录请求
        Manager.control.getLogin().loginRequest();
    };
    return SocketManager;
}());
__reflect(SocketManager.prototype, "SocketManager");
//# sourceMappingURL=SocketManager.js.map