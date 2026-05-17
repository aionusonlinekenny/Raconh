/**
 *author liangshunmin
 *create
 *update devlil 2017-11-13
 *description
*/
var Loader = /** @class */ (function () {
    function Loader() {
        this._callBacks = [];
        this.state = LoaderState.WAITING;
        this._count = 0;
        this._loadCount = 1;
    }
    Object.defineProperty(Loader.prototype, "path", {
        get: function () {
            return this._path;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Loader.prototype, "count", {
        /**
         * 引用数量
         */
        get: function () {
            return this._count;
        },
        enumerable: true,
        configurable: true
    });
    Loader.prototype.add = function (complete, target) {
        if (CallBackInfo.contains(this._callBacks, complete, target) == -1) {
            this._callBacks.push(Manager.pool.create(CallBackInfo, complete, target));
        }
    };
    Loader.prototype.remove = function (complete, target) {
        var index = CallBackInfo.contains(this._callBacks, complete, target);
        if (index >= 0) {
            Manager.pool.push(this._callBacks[index]);
            this._callBacks.splice(index, 1);
        }
    };
    Loader.prototype.reuse = function (path, priority, resourceGCType) {
        this._path = path;
        this._priority = priority;
        this._resourceGCType = resourceGCType;
        switch (this._path.loaderType) {
            case LoaderType.ANI:
            case LoaderType.MAP_DATA:
            case LoaderType.TEXTURE:
                this._loadCount = 2;
                break;
            default:
                this._loadCount = 1;
                break;
        }
    };
    Loader.prototype.unuse = function () {
        // RES.destroyRes(this._path.url);
        switch (this._path.loaderType) {
            case LoaderType.MAP_DATA:
                if (this.data.mapData != null) {
                    Manager.pool.push(this.data.mapData);
                    this.data.mapData = null;
                    delete this.data.mapData;
                }
                if (this.data.bitmapData != null) {
                    this.data.bitmapData.$dispose();
                    this.data.bitmapData = null;
                    delete this.data.bitmapData;
                }
                break;
            case LoaderType.ANI:
                this.data.jsonData = null;
                delete this.data.jsonData;
                if (this.data.aniData != null) {
                    Manager.pool.push(this.data.aniData);
                    this.data.aniData = null;
                    delete this.data.aniData;
                }
                if (this.data.bitmapData != null) {
                    this.data.bitmapData.$dispose();
                    this.data.bitmapData = null;
                    delete this.data.bitmapData;
                }
                break;
            case LoaderType.IMAGE:
                if (this.data != null) {
                    this.data.$dispose();
                }
                break;
            case LoaderType.TEXTURE:
                this.data.jsonData = null;
                delete this.data.jsonData;
                if (this.data.bitmapData != null) {
                    this.data.bitmapData.$dispose();
                    this.data.bitmapData = null;
                    delete this.data.bitmapData;
                }
                break;
        }
        this.data = null;
        for (var i = 0; i < this._callBacks.length; i++) {
            Manager.pool.push(this._callBacks[i]);
        }
        this._callBacks.length = 0;
        this._path = null;
        this.state = LoaderState.WAITING;
        this._count = 0;
    };
    Loader.prototype.$load = function (responseType) {
        var request = this.$getRequest(responseType);
        request.open(this._path.url);
        request.send();
    };
    /**
     * 获取一个URLLoader对象
     *
     */
    Loader.prototype.$getRequest = function (responseType) {
        var request = Manager.pool.create(egret.HttpRequest);
        request.addEventListener(egret.Event.COMPLETE, this.handleComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.handleComplete, this);
        request.responseType = responseType;
        return request;
    };
    Loader.prototype.$getLoader = function () {
        var loader = Manager.pool.create(egret.ImageLoader);
        loader.addEventListener(egret.Event.COMPLETE, this.handleComplete, this);
        loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.handleComplete, this);
        return loader;
    };
    Loader.prototype.$loadImage = function (url) {
        var loader = this.$getLoader();
        loader.load(url);
    };
    /**
     * 一项加载结束
     */
    Loader.prototype.handleComplete = function (event) {
        var request = event.target;
        request.removeEventListener(egret.Event.COMPLETE, this.handleComplete, this);
        request.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.handleComplete, this);
        if (request instanceof egret.HttpRequest)
            this.$analyzeData(request.response);
        else
            this.$analyzeData(request.data);
        Manager.pool.push2(request);
    };
    /**
     * 解析并缓存加载成功的数据
     */
    Loader.prototype.$analyzeData = function (data) {
        if (!data) {
            Manager.loader.oneLoadErrorHandler(this._path.url);
            Trace.error("加载文件错误:", this._path.url);
            for (var i = 0; i < this._callBacks.length; i++) {
                Manager.pool.push(this._callBacks[i]);
            }
            this._callBacks.length = 0;
            this.removeCount();
            this.state = LoaderState.FAIL;
            this._resourceGCType = ResourceGCType.NOW;
            this._unUseTimer = egret.getTimer();
            Trace.log("加载资源不存在", this._path.url);
            return;
        }
        try {
            switch (this._path.loaderType) {
                case LoaderType.BIN:
                    this.data = data;
                    this.state = LoaderState.SUCESS;
                    // this.state = LoaderState.SUCESS_READY;
                    // Manager.loader.addReady(this);
                    this.callBack();
                    break;
                case LoaderType.IMAGE:
                    this.data = data;
                    this.state = LoaderState.SUCESS;
                    this.callBack();
                    break;
                case LoaderType.ANI:
                    this._loadCount--;
                    if (data instanceof egret.BitmapData) {
                        this.data.bitmapData = data;
                    }
                    else {
                        this.data.jsonData = JSON.parse(data);
                    }
                    if (this._loadCount <= 0) {
                        this.state = LoaderState.SUCESS_READY;
                        Manager.loader.addReady(this);
                    }
                    break;
                case LoaderType.MAP_DATA:
                    this._loadCount--;
                    if (data instanceof egret.BitmapData) {
                        this.data.bitmapData = data;
                    }
                    else {
                        var path = new egret.ByteArray(data);
                        this.data.mapData = Manager.pool.create(MapData, path);
                    }
                    if (this._loadCount <= 0) {
                        this.state = LoaderState.SUCESS;
                        this.callBack();
                    }
                    break;
                case LoaderType.TEXTURE:
                    this._loadCount--;
                    if (data instanceof egret.BitmapData) {
                        this.data.bitmapData = data;
                    }
                    else {
                        this.data.jsonData = JSON.parse(data);
                    }
                    if (this._loadCount <= 0) {
                        this.state = LoaderState.SUCESS;
                        // this.data.sheet = new egret.SpriteSheet();
                        this.callBack();
                    }
                    break;
            }
        }
        catch (e) {
            egret.$warn(1017, this._path.url, data);
        }
    };
    Loader.prototype.load = function () {
        this.state = LoaderState.LOADING;
        switch (this._path.loaderType) {
            case LoaderType.BIN:
                this.$load(egret.HttpResponseType.ARRAY_BUFFER);
                break;
            case LoaderType.IMAGE:
                this.$loadImage(this._path.url);
                break;
            case LoaderType.ANI:
                this.data = {};
                this.$load(egret.HttpResponseType.TEXT);
                this.$loadImage(this._path.url2);
                break;
            case LoaderType.MAP_DATA:
                this.data = {};
                this.$load(egret.HttpResponseType.ARRAY_BUFFER);
                this.$loadImage(this._path.url2);
                break;
            case LoaderType.TEXTURE:
                this.data = {};
                this.$load(egret.HttpResponseType.TEXT);
                this.$loadImage(this._path.url2);
                break;
        }
    };
    Loader.prototype.dispose = function () {
        this.unuse();
        this._callBacks = null;
    };
    Loader.prototype.success = function () {
        if (this._path.loaderType == LoaderType.ANI && this.data.aniData == null) {
            this.data.aniData = Manager.pool.create(AnimationData, this.data.jsonData, this.data.bitmapData);
            // return false;
        }
        this.state = LoaderState.SUCESS;
        this.callBack();
        return true;
    };
    Loader.prototype.callBack = function () {
        var len = this._callBacks.length;
        for (var i = 0; i < len; i++) {
            this._callBacks[i].callBack.call(this._callBacks[i].target, this);
        }
        this._count += len;
        for (var i = 0; i < this._callBacks.length; i++) {
            Manager.pool.push(this._callBacks[i]);
        }
        this._callBacks.length = 0;
    };
    Loader.prototype.addCount = function () {
        this._count++;
    };
    Loader.prototype.removeCount = function () {
        this._count--;
        if (this._count <= 0)
            this._unUseTimer = egret.getTimer();
    };
    Loader.prototype.release = function () {
        if (this._count < 0) {
            Trace.error("wrong!!!!!!!!!!!", this._path.url);
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
    return Loader;
}());
//# sourceMappingURL=Loader.js.map