var Trace = /** @class */ (function () {
    function Trace() {
    }
    Trace.trace = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (DEBUG) {
            // console.log.apply(this,args);
        }
    };
    Trace.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args.unshift("【错误】：");
        console.log.apply(this, args); //各种逻辑错误，发布之后也需要显示的日志
    };
    /**
     * 发送日志到服务器
     */
    Trace.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.isSendToMany)
            return; //短时间发送过多，则不再发送
        var len = args.length;
        var str = len > 0 ? args[0] + "" : ""; //日志内容
        for (var i = 1; i < len; i++) {
            str += "," + args[i];
        }
        if (str != "") {
            Manager.control.getLogin().sendLogToServer(str); //发送日志
            this.sendCount++;
            if (this.sendCount > 10000) //短时间累计发送数量过万，则设置isSendToMany为true，后面不再发送日志
             {
                this.isSendToMany = true;
                Manager.control.getLogin().sendLogToServer("短时间发送日志过多，停止发送日志！");
            }
            var curTime = egret.getTimer();
            if (curTime - this.lastMarkTime > 60000) //1分钟清空一次数量
             {
                this.lastMarkTime = curTime;
                this.sendCount = 0;
            }
        }
    };
    Trace.lastMarkTime = 0; //上次清空数量时间
    Trace.sendCount = 0; //累计发送数量
    return Trace;
}());
//# sourceMappingURL=Trace.js.map