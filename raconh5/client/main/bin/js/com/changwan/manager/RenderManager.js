var RenderManager = /** @class */ (function () {
    function RenderManager() {
        this._test = {};
        this._callbacks = [];
        this._interval = 0;
        this._lastTickTime = 0;
        this._shape = new egret.DisplayObject();
        this._shape.addEventListener(egret.Event.ENTER_FRAME, this.handleEnterFrame, this);
        // egret.startTick(this.render, this);
    }
    Object.defineProperty(RenderManager.prototype, "interval", {
        get: function () {
            return this._interval;
        },
        enumerable: true,
        configurable: true
    });
    RenderManager.prototype.handleEnterFrame = function (e) {
        var that = this;
        var nowTime = egret.getTimer();
        that._interval = nowTime - that._lastTickTime;
        // if(that._interval > 60) egret.log("a______",that._interval,that._callbacks.length);
        that._lastTickTime = nowTime;
        var len = that._callbacks.length - 1;
        var updateFlag;
        var info;
        for (var i = len; i >= 0; i--) {
            updateFlag = false;
            info = that._callbacks[i];
            if (!info.alive) {
                Manager.pool.push(info);
                that._callbacks.splice(i, 1);
                continue;
            }
            if (info.deley > 0) {
                info.interval += that._interval;
                if (info.interval >= info.deley) {
                    updateFlag = true;
                }
            }
            else {
                updateFlag = true;
            }
            if (updateFlag) {
                updateFlag = false;
                // let a:number = egret.getTimer();
                if (info.deley > 0) {
                    // info.render.call(info.target, info.interval);
                    that.render(info, info.interval);
                    info.interval = 0;
                }
                else {
                    // info.render.call(info.target, that._interval);
                    that.render(info, that._interval);
                }
                // if(egret.getTimer() -a > 50)egret.log("函数调用时间",egret.getQualifiedClassName(info.target),egret.getTimer() - a);
                // if(KeyManager.bol)Trace.trace("iiiiiiiii",i,info.target);
                if (this._test[egret.getQualifiedClassName(info.target)] == null)
                    this._test[egret.getQualifiedClassName(info.target)] = 0;
                else
                    this._test[egret.getQualifiedClassName(info.target)]++;
                if (info.repeat > 0) {
                    info.repeat--;
                    if (info.repeat <= 0) {
                        if (info.endUpdate != null)
                            info.endUpdate.call(info.target);
                        info.alive = false;
                    }
                }
            }
        }
        if (KeyManager.bol) {
            var max = 0;
            var result = "";
            for (var key in this._test) {
                if (max < this._test[key]) {
                    max = this._test[key];
                    result = key;
                }
            }
            console.log("循环调用最多的类", key, max);
            this._test = {};
            KeyManager.bol = false;
        }
    };
    RenderManager.prototype.render = function (info, internal) {
        if (info.args == null || info.args.length == 0)
            info.render.call(info.target, internal);
        else {
            if (info.args.length == 1)
                info.render.call(info.target, internal, info.args[0]);
            else if (info.args.length == 2)
                info.render.call(info.target, internal, info.args[0], info.args[1]);
            else if (info.args.length == 3)
                info.render.call(info.target, internal, info.args[0], info.args[1], info.args[2]);
            else if (info.args.length == 4)
                info.render.call(info.target, internal, info.args[0], info.args[1], info.args[2], info.args[3]);
            else if (info.args.length == 5)
                info.render.call(info.target, internal, info.args[0], info.args[1], info.args[2], info.args[3], info.args[4]);
        }
    };
    /**
    * 添加计时器render:Function, target:any, deley:number = 0, repeat:number = 0, endUpdate:Function = null, forceReset:boolean = false,...args:any[]
    * @params render 单次回调函数
    * @params target 包含函数的对象
    * @params deley 执行时间间隔，单位毫秒，0表示每帧都执行
    * @params repeat 执行次数，0表示无限次
    * @params endUpdate 最后一次执行的回调函数
    * @params forceReset 强制重置设置，比如之前已add该render，则重置该render的值
    */
    RenderManager.prototype.add = function (render, target, deley, repeat, endUpdate, forceReset) {
        if (deley === void 0) { deley = 0; }
        if (repeat === void 0) { repeat = 0; }
        if (endUpdate === void 0) { endUpdate = null; }
        if (forceReset === void 0) { forceReset = false; }
        var args = [];
        for (var _i = 6; _i < arguments.length; _i++) {
            args[_i - 6] = arguments[_i];
        }
        // if(deley == 0) deley = Manager.global.FRAME_TIME;
        var index = this.contains2(render, target);
        if (index == -1) {
            var info = Manager.pool.create(RenderTimerInfo, render, target, deley, repeat, endUpdate, args);
            this._callbacks.push(info);
        }
        else {
            if (forceReset) {
                this._callbacks[index].reuse(render, target, deley, repeat, endUpdate, args);
                this._callbacks[index].interval = 0;
            }
            else {
                this._callbacks[index].alive = true;
            }
        }
    };
    /**
    * 移除计时器
    */
    RenderManager.prototype.remove = function (render, target) {
        var index = this.contains2(render, target);
        if (index >= 0) {
            this._callbacks[index].alive = false;
        }
    };
    /**
     * 是否包含指定的函数及对象，并且alive为true
     * @params render 回调函数
     * @params target 回调对象
     * @params return 大于-1则表示不包含，否则会返回当前的索引值
     */
    RenderManager.prototype.contains = function (render, target) {
        var length = this._callbacks.length;
        for (var i = 0; i < length; i++) {
            if (this._callbacks[i].target == target && this._callbacks[i].render == render && this._callbacks[i].alive)
                return true;
        }
        return false;
    };
    /**
     * 是否包含指定的函数及对象
     * @params render 回调函数
     * @params target 回调对象
     * @params return 大于-1则表示不包含，否则会返回当前的索引值
     */
    RenderManager.prototype.contains2 = function (render, target) {
        var length = this._callbacks.length;
        for (var i = 0; i < length; i++) {
            if (this._callbacks[i].target == target && this._callbacks[i].render == render)
                return i;
        }
        return -1;
    };
    return RenderManager;
}());
//# sourceMappingURL=RenderManager.js.map