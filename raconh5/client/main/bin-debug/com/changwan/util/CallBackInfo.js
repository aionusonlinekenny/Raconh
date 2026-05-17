var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 回调函数信息类
 * devil
 * create  2017-11-10
 * update
*/
var CallBackInfo = (function () {
    function CallBackInfo() {
    }
    CallBackInfo.prototype.reuse = function (callBack, target) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        this.args = args;
        this.callBack = callBack;
        this.target = target;
    };
    CallBackInfo.prototype.unuse = function () {
        this.callBack = null;
        this.target = null;
        this.args = null;
    };
    CallBackInfo.prototype.dispose = function () {
        this.callBack = null;
        this.target = null;
        this.args = null;
    };
    CallBackInfo.contains = function (callBacks, callBack, target) {
        var len = callBacks.length;
        for (var i = 0; i < len; i++) {
            if (callBacks[i].callBack == callBack && callBacks[i].target == target)
                return i;
        }
        return -1;
    };
    CallBackInfo.prototype.actCallBack = function () {
        if (this.args == null || this.args.length == 0)
            this.callBack.call(this.target);
        else {
            if (this.args.length == 1)
                this.callBack.call(this.target, this.args[0]);
            else if (this.args.length == 2)
                this.callBack.call(this.target, this.args[0], this.args[1]);
            else if (this.args.length == 3)
                this.callBack.call(this.target, this.args[0], this.args[1], this.args[2]);
            else if (this.args.length == 4)
                this.callBack.call(this.target, this.args[0], this.args[1], this.args[2], this.args[3]);
            else if (this.args.length == 5)
                this.callBack.call(this.target, this.args[0], this.args[1], this.args[2], this.args[3], this.args[4]);
        }
    };
    return CallBackInfo;
}());
__reflect(CallBackInfo.prototype, "CallBackInfo", ["cw.IPool", "cw.IDispose"]);
//# sourceMappingURL=CallBackInfo.js.map