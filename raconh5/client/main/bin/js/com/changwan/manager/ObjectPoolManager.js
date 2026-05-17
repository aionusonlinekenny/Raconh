/**
 *  对象池管理器,类似cc.pool的方法，需要使用对象池管理的对象，需要实现reuse与unuse两个函数，reuse函数是从池中获得对象时使用，而unuse是对象放入池中时调用。
 */
var ObjectPoolManager = /** @class */ (function () {
    // private _useCount = {};
    function ObjectPoolManager() {
        this._objects = {};
        this._testCount = {};
        this.initPools();
    }
    ObjectPoolManager.prototype.create = function (cls) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var result;
        var poolKey = egret.getQualifiedClassName(cls);
        var arr = this._objects[poolKey];
        if (arr != null && arr.length) {
            result = arr.shift();
        }
        else {
            result = new cls();
            if (this._testCount[poolKey] == null)
                this._testCount[poolKey] = 0;
            this._testCount[poolKey]++;
            // if(this._testCount[poolKey] > 500)
            // {
            //     console.log(poolKey,this._testCount[poolKey]);
            // }
            // Trace.trace("____________________创建",poolKey,this._testCount[poolKey]);
            // if(this._useCount[poolKey] != null)Trace.trace(this._useCount[poolKey].length);
        }
        // if(this._useCount[poolKey] == null)this._useCount[poolKey] = [];
        // this._useCount[poolKey].push(result);
        if (result.reuse != null)
            result.reuse.apply(result, args);
        return result;
    };
    ObjectPoolManager.prototype.push2 = function (instance) {
        var poolKey = egret.getQualifiedClassName(instance);
        if (this._objects[poolKey] == null)
            this._objects[poolKey] = [];
        var arr = this._objects[poolKey];
        if (arr.length < this.getPoolMax(poolKey)) {
            if (arr.indexOf(instance) == -1) {
                this._objects[poolKey].push(instance);
            }
        }
        else {
            // Trace.error("注意对象池多于最大数量",poolKey);
            ObjectUtil.dispose(instance);
        }
    };
    ObjectPoolManager.prototype.push = function (instance) {
        var poolKey = egret.getQualifiedClassName(instance);
        if (this._objects[poolKey] == null)
            this._objects[poolKey] = [];
        var arr = this._objects[poolKey];
        if (arr.length < this.getPoolMax(poolKey)) {
            if (arr.indexOf(instance) == -1) {
                if (instance.unuse != null)
                    instance.unuse();
                else
                    this.unuse(instance);
                this._objects[poolKey].push(instance);
            }
        }
        else {
            // Trace.error("注意对象池多于最大数量",poolKey);
            ObjectUtil.dispose(instance);
        }
        // if(this._useCount[poolKey] == null)this._useCount[poolKey] = [];
        // if(this._useCount[poolKey].indexOf(instance) != -1)
        // {
        //     this._useCount[poolKey].splice(this._useCount[poolKey].indexOf(instance),1);
        // }
    };
    ObjectPoolManager.prototype.getPoolMax = function (poolKey) {
        return 1000;
    };
    ObjectPoolManager.prototype.unuse = function (instance) {
        if (instance instanceof egret.Bitmap) {
            this.unuseBitmap(instance);
        }
        else if (instance instanceof egret.Texture) {
            // instance.dispose();
        }
        else if (instance instanceof egret.Shape) {
            if (instance.parent != null)
                instance.parent.removeChild(instance);
            instance.x = 0;
            instance.y = 0;
            instance.alpha = 1;
            instance.scaleX = 1;
            instance.scaleY = 1;
            instance.rotation = 0;
            instance.visible = true;
            instance.anchorOffsetX = 0;
            instance.anchorOffsetY = 0;
            instance.graphics.clear();
            instance.touchEnabled = false;
            instance.blendMode = egret.BlendMode.NORMAL;
        }
        else if (instance instanceof egret.Sprite) {
            if (instance.parent != null)
                instance.parent.removeChild(instance);
            instance.x = 0;
            instance.y = 0;
            instance.alpha = 1;
            instance.scaleX = 1;
            instance.scaleY = 1;
            instance.rotation = 0;
            instance.visible = true;
            instance.anchorOffsetX = 0;
            instance.anchorOffsetY = 0;
            instance.graphics.clear();
            instance.touchEnabled = false;
            instance.touchChildren = true;
        }
        else if (instance instanceof egret.DisplayObjectContainer) {
            if (instance.parent != null)
                instance.parent.removeChild(instance);
            instance.x = 0;
            instance.y = 0;
            instance.alpha = 1;
            instance.scaleX = 1;
            instance.scaleY = 1;
            instance.rotation = 0;
            instance.visible = true;
            instance.anchorOffsetX = 0;
            instance.anchorOffsetY = 0;
            instance.touchEnabled = false;
            instance.touchChildren = true;
            instance.cacheAsBitmap = false;
        }
        else if (instance instanceof egret.MovieClipDataFactory) {
            instance.enableCache = true;
            instance.mcDataSet = null;
            instance.clearCache();
        }
        else if (instance instanceof egret.TextField) {
            if (instance.parent != null)
                instance.parent.removeChild(instance);
            instance.x = 0;
            instance.y = 0;
            instance.alpha = 1;
            instance.scaleX = 1;
            instance.scaleY = 1;
            instance.rotation = 0;
            instance.visible = true;
            instance.anchorOffsetX = 0;
            instance.anchorOffsetY = 0;
            instance.text = "";
            instance.$TextField =
                {
                    0: egret.TextField.default_size,
                    1: 0,
                    2: egret.TextField.default_textColor,
                    3: NaN,
                    4: NaN,
                    5: 0,
                    6: 0,
                    7: 0,
                    8: egret.TextField.default_fontFamily,
                    9: "left",
                    10: "top",
                    11: "#ffffff",
                    12: "",
                    13: "",
                    14: [],
                    15: false,
                    16: false,
                    17: true,
                    18: false,
                    19: false,
                    20: false,
                    21: 0,
                    22: 0,
                    23: 0,
                    24: egret.TextFieldType.DYNAMIC,
                    25: 0x000000,
                    26: "#000000",
                    27: 0,
                    28: -1,
                    29: 0,
                    30: false,
                    31: false,
                    32: 0x000000,
                    33: false,
                    34: 0xffffff,
                    35: null,
                    36: null,
                    37: egret.TextFieldInputType.TEXT //inputType
                };
        }
        else if (instance instanceof TCPPacketIn) {
            instance.clear();
        }
        else if (instance instanceof TCPPacketOut) {
            instance.clear();
        }
        else {
            Trace.error("未写对象池回收方法", egret.getQualifiedClassName(instance));
        }
    };
    ObjectPoolManager.prototype.initPools = function () {
        this.initCls(400, MapTiled);
        this.initCls(400, Loader);
        this.initCls(600, egret.Texture);
        this.initCls(600, AnimationFrameData);
        this.initCls(200, AnimationData);
        // this.initCls(150,RenderTexture);
    };
    ObjectPoolManager.prototype.initCls = function (count, cls) {
        var poolKey = egret.getQualifiedClassName(cls);
        var arr = this._objects[poolKey];
        if (arr == null) {
            arr = [];
            this._objects[poolKey] = arr;
            this._testCount[poolKey] = count;
        }
        for (var i = 0; i < count; i++) {
            arr.push(new cls());
        }
    };
    ObjectPoolManager.prototype.testCount = function () {
        // for(let poolKey in this._objects)
        // {
        //     if(this._objects[poolKey].length > 0)
        //     {
        //         // if(poolKey == "MapTiled" || poolKey == "Loader")
        //          Trace.trace("对象实例：" + poolKey + "------" + this._objects[poolKey].length);
        //     }
        // }
        var count = 0;
        for (var poolKey in this._testCount) {
            count++;
            Trace.trace("对象实例：" + poolKey + "------总数：" + this._testCount[poolKey] + "------缓存数：" + (this._objects[poolKey] ? this._objects[poolKey].length : 0));
        }
        Trace.trace(count + "****************************************************************************");
    };
    ObjectPoolManager.prototype.unuseBitmap = function (instance) {
        if (instance.parent != null)
            instance.parent.removeChild(instance);
        instance.bitmapData = null;
        instance.texture = null;
        instance.x = 0;
        instance.y = 0;
        instance.alpha = 1;
        instance.scaleX = 1;
        instance.scaleY = 1;
        instance.scale9Grid = null;
        instance.rotation = 0;
        instance.visible = true;
        instance.anchorOffsetX = 0;
        instance.anchorOffsetY = 0;
        instance.smoothing = true;
        instance.touchEnabled = false;
        instance.mask = null;
        instance.pixelHitTest = false;
        instance.filters = null;
    };
    return ObjectPoolManager;
}());
//# sourceMappingURL=ObjectPoolManager.js.map