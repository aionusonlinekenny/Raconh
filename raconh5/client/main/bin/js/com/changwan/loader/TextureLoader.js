/**
 *author liangshunmin
 *create
 *update devlil 2017-11-13
 *description
*/
var TextureLoader = /** @class */ (function () {
    function TextureLoader() {
        this._callBacks = [];
        this._callBacks2 = [];
        this.state = LoaderState.WAITING;
        this._count = 0;
    }
    Object.defineProperty(TextureLoader.prototype, "source", {
        get: function () { return this._source; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextureLoader.prototype, "resourceGCType", {
        set: function (value) {
            this._resourceGCType = value;
        },
        enumerable: true,
        configurable: true
    });
    TextureLoader.prototype.add = function (complete, target) {
        if (CallBackInfo.contains(this._callBacks, complete, target) == -1) {
            this._callBacks.push(Manager.pool.create(CallBackInfo, complete, target));
        }
    };
    TextureLoader.prototype.remove = function (complete, target) {
        var index = CallBackInfo.contains(this._callBacks, complete, target);
        if (index >= 0) {
            Manager.pool.push(this._callBacks.splice(index, 1)[0]);
        }
    };
    TextureLoader.prototype.add2 = function (complete, target) {
        if (CallBackInfo.contains(this._callBacks2, complete, target) == -1) {
            this._callBacks2.push(Manager.pool.create(CallBackInfo, complete, target));
        }
    };
    TextureLoader.prototype.remove2 = function (complete, target) {
        var index = CallBackInfo.contains(this._callBacks2, complete, target);
        if (index >= 0) {
            Manager.pool.push(this._callBacks2.splice(index, 1)[0]);
        }
    };
    TextureLoader.prototype.reuse = function (source, priority, resourceGCType) {
        this._source = source;
        this.priority = priority;
        this._resourceGCType = resourceGCType;
    };
    TextureLoader.prototype.unuse = function () {
        RES.destroyRes(this._source);
        Manager.pool.push(this.data);
        this.data = null;
        for (var i = 0; i < this._callBacks.length; i++) {
            Manager.pool.push(this._callBacks[i]);
        }
        this._callBacks.length = 0;
        for (var i = 0; i < this._callBacks2.length; i++) {
            Manager.pool.push(this._callBacks2[i]);
        }
        this._callBacks2.length = 0;
        this._source = null;
        this.state = LoaderState.WAITING;
        this._count = 0;
    };
    TextureLoader.prototype.load = function () {
        this.state = LoaderState.LOADING;
        RES.getResAsync(this._source, this.handleComplete, this);
    };
    TextureLoader.prototype.dispose = function () {
        RES.destroyRes(this._source);
        this._source = null;
        for (var i = 0; i < this._callBacks.length; i++) {
            Manager.pool.push(this._callBacks[i]);
        }
        this._callBacks = null;
        for (var i = 0; i < this._callBacks2.length; i++) {
            Manager.pool.push(this._callBacks2[i]);
        }
        this._callBacks2 = null;
        Manager.pool.push(this.data);
        this.data = null;
    };
    TextureLoader.prototype.handleComplete = function (data, url) {
        if (data == undefined) {
            Manager.loader.oneLoadErrorHandler(this._source);
            Trace.error("加载皮肤贴图错误:", this._source);
            for (var i = 0; i < this._callBacks.length; i++) {
                Manager.pool.push(this._callBacks[i]);
            }
            this._callBacks.length = 0;
            for (var i = 0; i < this._callBacks2.length; i++) {
                Manager.pool.push(this._callBacks2[i]);
            }
            this._callBacks2.length = 0;
            this.removeCount();
            this.state = LoaderState.FAIL;
            this._resourceGCType = ResourceGCType.NOW;
            this._unUseTimer = egret.getTimer();
        }
        else {
            this.data = data;
            this.state = LoaderState.SUCESS;
            this.callBack();
        }
    };
    TextureLoader.prototype.callBack = function () {
        var len = this._callBacks.length;
        for (var i = 0; i < len; i++) {
            this._callBacks[i].callBack.call(this._callBacks[i].target, this);
        }
        this._count += len;
        for (var i = 0; i < this._callBacks.length; i++) {
            Manager.pool.push(this._callBacks[i]);
        }
        this._callBacks.length = 0;
        var len2 = this._callBacks2.length;
        for (var i = 0; i < len2; i++) {
            this._callBacks2[i].callBack.call(this._callBacks2[i].target, this.data, this._source);
        }
        this._count += len2;
        for (var i = 0; i < this._callBacks2.length; i++) {
            Manager.pool.push(this._callBacks2[i]);
        }
        this._callBacks2.length = 0;
    };
    TextureLoader.prototype.addCount = function () {
        this._count++;
    };
    TextureLoader.prototype.removeCount = function () {
        this._count--;
        if (this._count <= 0)
            this._unUseTimer = egret.getTimer();
    };
    TextureLoader.prototype.release = function () {
        if (this._count < 0) {
            Trace.error("wrong!!!!!!!!!!!", this._source);
        }
        if (this._count <= 0) {
            if (egret.getTimer() - this._unUseTimer >= ResourceGCType.getGCTime(this._resourceGCType)) {
                // Trace.error("release",this._count,this._path.url,new Date().getTime());
                Manager.pool.push(this);
                return true;
            }
            return false;
        }
        return false;
    };
    return TextureLoader;
}());
//# sourceMappingURL=TextureLoader.js.map