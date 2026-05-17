var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SocketManager2 = (function () {
    function SocketManager2() {
        this.hasInit = false;
        /**
         * 是否正在重连
         */
        this.isReconnect = false;
        /**
         * 重连次数
         */
        this.reConnectCount = 0;
        /** 服务器验证字段0~127,0开始 */
        this.verify = 0;
        /**
         * 是否需要重连
         */
        this.needReconnect = true;
        this._cmds = {};
        this._pkgs = [];
    }
    SocketManager2.prototype.init = function () {
        if (!this.hasInit)
            this.hasInit = true;
        Manager.render.add(this.render, this);
        this.initRemoteSocket();
    };
    SocketManager2.prototype.initRemoteSocket = function () {
        if (true)
            egret.log("开始连接socket");
        if (this._socket == null)
            this.connect(Manager.model.getLogin().serverIP, Manager.model.getLogin().serverPort);
    };
    /**
     * 断开连接
     */
    SocketManager2.prototype.closeRemoteSocket = function () {
        egret.log("closeRemoteSocket");
        if (this._socket) {
            this.thisObject = null;
            this.onConnect = null;
            this.onError = null;
            this.onClose = null;
            this._socket.close();
            this._socket = null;
        }
    };
    /** 服务端需要该协议，socket连接成功时发送 */
    SocketManager2.prototype.sendServerNeedCMD = function () {
        var pkg = new egret.ByteArray();
        pkg.writeUTFBytes("game_client------------");
        pkg.position = 0;
        this._socket.send(pkg.buffer);
    };
    /**
     * socket连接成功后操作
     */
    SocketManager2.prototype.socketCntedHandler = function () {
        //发送心跳包
        Manager.control.getLogin().startSendHeartbeat();
        //发送账号登录请求
        Manager.control.getLogin().loginRequest();
    };
    SocketManager2.prototype.reConnect = function () {
        if (this.isConnected)
            return false;
        if (!this.needReconnect)
            return false;
        if (Manager.global.lifecyclePause)
            return false;
        this.reConnectCount += 1;
        Trace.trace("ReConnect Socket Count:" + this.reConnectCount);
        this.initRemoteSocket();
        return false;
    };
    SocketManager2.prototype.clearPoolPkg = function () {
        if (this._pkgs == null || this._pkgs.length <= 0)
            return;
        while (this._pkgs.length) {
            this.receive(this._pkgs.shift());
        }
    };
    SocketManager2.prototype.addCMD = function (protocol, cls) {
        if (this._cmds[protocol] == undefined)
            this._cmds[protocol] = new cls();
    };
    SocketManager2.prototype.removeCMD = function (protocol) {
        delete this._cmds[protocol];
    };
    SocketManager2.prototype.getCMD = function (protocol) {
        return this._cmds[protocol];
    };
    SocketManager2.prototype.addVerify = function () {
        this.verify++;
        if (this.verify >= 128)
            this.verify = 0;
    };
    SocketManager2.prototype.send = function (pkg) {
        if (pkg.length == 0)
            return;
        if (this.isConnected) {
            pkg.writePacketLenAndVerify();
            pkg.position = 0;
            this._socket.send(pkg.buffer);
            Manager.pool.push(pkg);
        }
        else {
            this.tryReconnect();
        }
    };
    /**
     * 重连socket
     */
    SocketManager2.prototype.tryReconnect = function () {
        if (this.isConnected)
            return;
        if (!this.needReconnect)
            return;
        if (this.isReconnect)
            return;
        this.isReconnect = true;
        this.reConnectCount = 0;
        this.reConnect();
    };
    SocketManager2.prototype.sendOnlyProtocol = function (protocol) {
        var out = new TCPPacketOut(protocol);
        this.send(out);
    };
    SocketManager2.prototype.addCallBacks = function (onConnect, onClose, onError, thisObject) {
        this.onConnect = onConnect;
        this.onClose = onClose;
        this.onError = onError;
        this.thisObject = thisObject;
    };
    SocketManager2.prototype.connect = function (ip, port) {
        var that = this;
        try {
            var socketServerUrl = void 0;
            if (this.isWss)
                socketServerUrl = "wss://" + ip + ":" + (port + 1000);
            else
                socketServerUrl = "ws://" + ip + ":" + port;
            if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                this._socket = new window["WebSocket"](socketServerUrl);
                this._socket.binaryType = "arraybuffer";
                this._socket.onopen = onopen;
                this._socket.onclose = onclose;
                this._socket.onerror = onerror;
                this._socket.onmessage = onmessage;
            }
            else {
                this._socket = new __global["egret_native"]["WebSocket"](socketServerUrl);
                this._socket.onOpen = onopen;
                this._socket.onClose = onclose;
                this._socket.onError = onerror;
                this._socket.onMessage = onmessage;
            }
        }
        catch (e) {
            throw new Error(e);
        }
        function onopen() {
            egret.log("socket connect");
            that._isConnected = true;
            that.isReconnect = false;
            Manager.control.getLogin().heartbeatLostCount = 0;
            if (that.reConnectCount > 0) {
                Manager.model.getLogin().isSocketReConnect = true;
                that.reConnectCount = 0;
            }
            that.verify = 0;
            that.sendServerNeedCMD();
            that.socketCntedHandler();
            if (that.onConnect != null)
                that.onConnect.call(that.thisObject);
        }
        function onclose(e) {
            egret.log("socket close");
            that._isConnected = false;
            that._pkgs = [];
            that.reConnect();
            if (that.onClose != null)
                that.onClose.call(that.thisObject);
        }
        function onerror(e) {
            egret.log("socket error");
            that._isConnected = false;
            that._pkgs = [];
            that.reConnect();
            if (that.onError != null)
                that.onError.call(that.thisObject);
        }
        function onmessage(msg) {
            var pkg;
            if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                pkg = Manager.pool.create(TCPPacketIn);
                pkg.setArrayBuffer(msg.data);
            }
            else {
                pkg = Manager.pool.create(TCPPacketIn);
                pkg.setArrayBuffer(msg);
            }
            that._pkgs.push(pkg);
        }
    };
    Object.defineProperty(SocketManager2.prototype, "isConnected", {
        get: function () {
            return this._socket != null && this._isConnected;
        },
        enumerable: true,
        configurable: true
    });
    SocketManager2.prototype.receive = function (pkg) {
        var a = egret.getTimer();
        if (true) {
            // Trace.trace(cw.ByteUtil.toHexDump("receive:" + pkg.protocol,pkg,0,pkg.length));
            // egret.log(cw.ByteUtil.toHexDump("receive:" + pkg.protocol,pkg,0,pkg.length));
        }
        var cmd = this._cmds[pkg.protocol];
        if (cmd != null)
            cmd.receive(pkg);
        else {
            if (pkg.protocol == 14000) {
                Trace.trace("140000");
            }
            Trace.trace("错误：服务器与客户端协议对不上 " + pkg.protocol);
        }
        if (true) {
            // Trace.trace("协议解析时间",pkg.protocol,egret.getTimer() - a);
            // if(pkg.protocol,egret.getTimer() - a >= 10)egret.log("协议解析时间",pkg.protocol,egret.getTimer() - a);
        }
    };
    SocketManager2.prototype.render = function (interval) {
        if (!this.isConnected)
            return;
        var length = this._pkgs.length;
        if (length == 0)
            return;
        var i = 0;
        var pkg;
        while (i < length) {
            pkg = this._pkgs[i];
            var position = pkg.position;
            var length2 = pkg.length;
            while (position < length2) {
                var totalLen = pkg.readUnsignedShort() + 2;
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
    };
    return SocketManager2;
}());
__reflect(SocketManager2.prototype, "SocketManager2");
//# sourceMappingURL=SocketManger2.js.map