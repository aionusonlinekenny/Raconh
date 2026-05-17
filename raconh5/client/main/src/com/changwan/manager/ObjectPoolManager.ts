/**
 *  对象池管理器,类似cc.pool的方法，需要使用对象池管理的对象，需要实现reuse与unuse两个函数，reuse函数是从池中获得对象时使用，而unuse是对象放入池中时调用。
 */
class ObjectPoolManager
{
    private _objects = {};
    private _testCount = {};
    // private _useCount = {};

    public constructor()
    {
        this.initPools();
    }

    public create(cls:{new():any},...args:any[]):any
    {
        let result:any;
        let poolKey:string = egret.getQualifiedClassName(cls);
        let arr:any[] = this._objects[poolKey];
        if(arr != null && arr.length)
        {
            result = arr.shift();
        }
        else
        {
            result = new cls();
            if(this._testCount[poolKey] == null)this._testCount[poolKey] = 0;
            this._testCount[poolKey] ++;
            // if(this._testCount[poolKey] > 500)
            // {
            //     console.log(poolKey,this._testCount[poolKey]);
                
            // }
            // Trace.trace("____________________创建",poolKey,this._testCount[poolKey]);
            // if(this._useCount[poolKey] != null)Trace.trace(this._useCount[poolKey].length);
        }
        // if(this._useCount[poolKey] == null)this._useCount[poolKey] = [];
        // this._useCount[poolKey].push(result);
        if(result.reuse != null)
            result.reuse.apply(result,args);
        return result;
    }

    public push2(instance:any):void
    {
        let poolKey:string = egret.getQualifiedClassName(instance);
        if(this._objects[poolKey] == null)this._objects[poolKey] = [];
        let arr:any[] = this._objects[poolKey];
        if(arr.length < this.getPoolMax(poolKey))
        {
            if(arr.indexOf(instance) == -1)
            {
                this._objects[poolKey].push(instance);
            }
        }
        else
        {
            // Trace.error("注意对象池多于最大数量",poolKey);
            ObjectUtil.dispose(instance);
        }
    }

    public push(instance:any):void
    {
        let poolKey:string = egret.getQualifiedClassName(instance);
        if(this._objects[poolKey] == null)this._objects[poolKey] = [];
        let arr:any[] = this._objects[poolKey];
        if(arr.length < this.getPoolMax(poolKey))
        {
            if(arr.indexOf(instance) == -1)
            {
                if(instance.unuse != null)instance.unuse();
                else this.unuse(instance);
                this._objects[poolKey].push(instance);
            }
        }
        else
        {
            // Trace.error("注意对象池多于最大数量",poolKey);
            ObjectUtil.dispose(instance);
        }

        // if(this._useCount[poolKey] == null)this._useCount[poolKey] = [];
        // if(this._useCount[poolKey].indexOf(instance) != -1)
        // {
        //     this._useCount[poolKey].splice(this._useCount[poolKey].indexOf(instance),1);
        // }
    }

    private getPoolMax(poolKey:string):number
    {
        return 1000;
    }

    public unuse(instance:any):void
    {
        if(instance instanceof egret.Bitmap)
        {
            this.unuseBitmap(instance);
        }
        else if(instance instanceof egret.Texture)
        {
            // instance.dispose();
        }
        else if(instance instanceof egret.Shape)
        {
            if(instance.parent != null)instance.parent.removeChild(instance);
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
        else if(instance instanceof egret.Sprite)
        {
            if(instance.parent != null)instance.parent.removeChild(instance);
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
        else if(instance instanceof egret.DisplayObjectContainer)
        {
            if(instance.parent != null)instance.parent.removeChild(instance);
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
        else if(instance instanceof egret.MovieClipDataFactory)
        {
            instance.enableCache = true;
            instance.mcDataSet = null;
            instance.clearCache();
        }
        else if(instance instanceof egret.TextField)
        {
            if(instance.parent != null)instance.parent.removeChild(instance);
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
                0: egret.TextField.default_size,             //fontSize
                1: 0,              //lineSpacing
                2: egret.TextField.default_textColor,       //textColor
                3: NaN,           //textFieldWidth
                4: NaN,           //textFieldHeight
                5: 0,              //textWidth
                6: 0,              //textHeight
                7: 0,              //textDrawWidth
                8: egret.TextField.default_fontFamily,   //fontFamily
                9: "left",         //textAlign
                10: "top",         //verticalAlign
                11: "#ffffff",     //textColorString
                12: "",            //fontString
                13: "",            //text
                14: [],            //measuredWidths
                15: false,         //bold,
                16: false,         //italic,
                17: true,          //fontStringChanged,
                18: false,         //textLinesChanged,
                19: false,          //wordWrap
                20: false,         //displayAsPassword
                21: 0,              //maxChars
                22: 0, //selectionActivePosition,
                23: 0, //selectionAnchorPosition,
                24: egret.TextFieldType.DYNAMIC,              //type
                25: 0x000000,              //strokeColor
                26: "#000000",              //strokeColorString
                27: 0,              //stroke
                28: -1,              //scrollV
                29: 0,              //numLines
                30: false,              //multiline
                31: false,              //border
                32: 0x000000,              //borderColor
                33: false,              //background
                34: 0xffffff,              //backgroundColor
                35: null,           //restrictAnd
                36: null,           //restrictNot
                37: egret.TextFieldInputType.TEXT            //inputType
            };
        }
        else if(instance instanceof TCPPacketIn)
        {
            instance.clear();
        }
        else if(instance instanceof TCPPacketOut)
        {
            instance.clear();
        }
        else
        {
            Trace.error("未写对象池回收方法",egret.getQualifiedClassName(instance));
        }
    }

    public initPools():void
    {
        this.initCls(400,MapTiled);
        this.initCls(400,Loader);
        this.initCls(600,egret.Texture);
        this.initCls(600,AnimationFrameData);
        this.initCls(200,AnimationData);
        // this.initCls(150,RenderTexture);
    }

    private initCls(count:number,cls:any):void
    {
        let poolKey:string = egret.getQualifiedClassName(cls);
        let arr:any[] = this._objects[poolKey];
        if(arr == null)
        {
           arr = [];
           this._objects[poolKey] = arr;
           this._testCount[poolKey] = count;
        }
        for(let i:number = 0 ; i < count; i ++)
        {
            arr.push(new cls());
        }
    }

    public testCount():void
    {
        // for(let poolKey in this._objects)
        // {
        //     if(this._objects[poolKey].length > 0)
        //     {
        //         // if(poolKey == "MapTiled" || poolKey == "Loader")
        //          Trace.trace("对象实例：" + poolKey + "------" + this._objects[poolKey].length);
        //     }
        // }
        let count:number = 0;
        for(let poolKey in this._testCount)
        {
            count ++;
            Trace.trace("对象实例：" + poolKey + "------总数：" + this._testCount[poolKey] + "------缓存数：" + (this._objects[poolKey] ? this._objects[poolKey].length : 0));
        }
        Trace.trace(count + "****************************************************************************");
    }

    public unuseBitmap(instance:egret.Bitmap):void
    {
        if(instance.parent != null)instance.parent.removeChild(instance);
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
    }
}