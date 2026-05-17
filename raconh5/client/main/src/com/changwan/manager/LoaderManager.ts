/**
 *author liangshunmin
 *create 
 *update devlil 2017-11-13
 *description 
*/
class LoaderManager
{
   private _loadersCanGC = {}; //释放内存
   private _loaderTextureCanGC = {};
   private _loadersCanotGC={};//长驻内存
   private _loaderReady:Array<Loader>;
   private _loadFailDic={};//记录加载失败的路径
   private _resGC={};//通过res方式加载
   private _queues:Array<any>;
   private _thread:number;
   private _loadingCount:number;
   public asset:AssetAdapter;
   private _needSort:boolean;

   public constructor()
    {
        this._queues = [];
        this._loaderReady = [];
        this._needSort = false;
        this._loadingCount = 0;
        // this._thread = 100;
        this._thread = 7;
        RES.setMaxLoadingThread(this._thread);
        Manager.render.add(this.render,this,100);
        Manager.render.add(this.renderReady,this);
    }

    public load(path:PathInfo,complete:Function,target:any,resourceGCType?:number,priority?:number):void
    {
        // if(path.url.indexOf("cw.txt") == -1 
        // && path.url.indexOf("back.jpg") == -1 
        // && path.url.indexOf("path.txt") == -1 
        // && path.url.indexOf("res/skill") == -1 
        // && path.url.indexOf("res/body") == -1
        // && path.url.indexOf("res/wing") == -1
        // && path.url.indexOf("res/monster") == -1
        // && path.url.indexOf("res/map") == -1
        // && path.url.indexOf("res/weapon") == -1
        // )return;
        // Trace.trace("loadermanager",path.url);
        // if(this._loadFailDic[path.url] > 3) 
        // {
        //     GameDispatcher.getInstance().dispatchEvent(new GlobalEvent(GlobalEvent.RESOURCE_LOAD_FAIL, path.url));
        //     return;
        // }
        if(resourceGCType == null)resourceGCType = ResourceGCType.NOW;
        if(priority == null)priority = ResPriorityType.LOAD_LEVEL1;
        let loader:Loader = this._loadersCanotGC[path.url];
        if(loader == null)loader = this._loadersCanGC[path.url];
        // if(resourceGCType != ResourceGCType.NEVER)loader = this._loadersCanGC[path.url];
        // else loader = this._loadersCanotGC[path.url];
        if(loader == null)//开始加载
        {
            loader = Manager.pool.create(Loader,path,priority,resourceGCType);
            loader.add(this.complete,this);
            if(resourceGCType != ResourceGCType.NEVER)this._loadersCanGC[path.url] = loader;
            else this._loadersCanotGC[path.url] = loader;
            this._queues.push(loader);
            this._needSort = true;
        }
        if(loader.state == LoaderState.SUCESS)
        {
            loader.addCount();//引用加1;
            complete.call(target,loader);
        }
        else if(loader.state == LoaderState.FAIL)
        {

        }
        else
        {
            loader.add(complete,target);
        }
        // if(this._queues.length > 0) this.next.call(this);
    }

    public addReady(value:Loader):void
   {
       if(this._loaderReady.indexOf(value) == -1)this._loaderReady.push(value);
   }

    // public getRes(key:string,complete:Function,target:any):void
    // {
    //     let result:any = this._resGC[key];
    //     let calls:CallBackInfo[];
    //     if(result == null)
    //     {
    //         calls = [];
    //         result = calls;
    //         this._resGC[key] = result;
    //         calls.push(Manager.pool.create(CallBackInfo,complete,target));
    //         this.asset.getAsset(key,this.resComplete,this);
    //     }
    //     else
    //     {
    //         if(result instanceof egret.Texture)
    //         {
    //             complete.call(target,result);
    //         }
    //         else if(result instanceof Array)
    //         {
    //             calls = result;
    //             if(CallBackInfo.contains(calls,complete,target) == -1)
    //             {
    //                 calls.push(Manager.pool.create(CallBackInfo,complete,target));
    //             }
    //         }
    //     }
    // }


    public loadTexture(source: string, complete:Function, target: any): void 
    {
        // function onGetRes(data: any): void {
        //     compFunc.call(thisObject, data, source);
        // }
        // if (RES.hasRes(source)) {
        //     let data = RES.getRes(source);
        //     if (data) {
        //         onGetRes(data);
        //     }
        //     else {
        //         RES.getResAsync(source, onGetRes, this);
        //     }
        // }
        // else 
        // {
        //     RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
        // }

        let tloader:TextureLoader = this._loaderTextureCanGC[source];
        if(tloader == null)
        {
            tloader = Manager.pool.create(TextureLoader,source,ResPriorityType.LOAD_LEVEL5,ResourceGCType.COMMON);
            tloader.add(this.complete,this);
            this._loaderTextureCanGC[source] = tloader;
            this._queues.push(tloader);
            this._needSort = true;
        }
        if(tloader.state == LoaderState.SUCESS)
        {
            tloader.addCount();//引用加1;
            complete.call(target,tloader.data,source);
        }
        else if(tloader.state == LoaderState.FAIL)
        {

        }
        else
        {
            tloader.add2(complete,target);
        }
    }

    // private resComplete(texture:egret.Texture,key:string):void
    // {
    //     let calls:CallBackInfo[] = this._resGC[key];
    //     let len:number = calls.length;
    //     for(let i:number = 0 ; i < len; i ++)
    //     {
    //         calls[i].callBack.call(calls[i].target,texture);
    //         Manager.pool.push(calls[i]);
    //     }
    //     calls.length = 0;
    //     calls = null;
    //     this._resGC[key] = texture;
    // }

    // public removeRes(key:string,complete:Function,target:any):void
    // {
    //     let calls:CallBackInfo[] = this._resGC[key];
    //     if(calls != null)
    //     {
    //         let index:number = CallBackInfo.contains(calls,complete,target);
    //         if(index != -1)
    //         {
    //             Manager.pool.push(calls[index]);
    //             calls.splice(index,1);
    //         }
    //     }
    // }

    private complete(loader:any):void
    {
        loader.removeCount();
        this._loadingCount --;
        // if(this._needSort)
        // {
        //     this._needSort = false;
        //     this._queues.sort(this.sortQueues);
        // }
        // this.next.call(this);
    }

    private next():void
    {
        // if(this._queues.length <= 0)return;
        if(this._needSort)
        {
            this._needSort = false;
            this._queues.sort(this.sortQueues);
        }
        while(this._loadingCount < this._thread)
        {
            if(this._queues.length > 0)
            {
                this._queues.shift().load();;
                this._loadingCount ++;
            }
            else break;
        }
    }

    public oneLoadErrorHandler(url:string):void
    {
        this._loadingCount --;
        if(!this._loadFailDic[url]) this._loadFailDic[url] = 1;
        else this._loadFailDic[url] = (this._loadFailDic[url] + 1);
        // if(this._queues.length > 0) this.next.call(this);
        GameDispatcher.getInstance().dispatchEvent(new GlobalEvent(GlobalEvent.RESOURCE_LOAD_FAIL, url));
    }

    private renderReady(interval:number):void
    {
        let len:number = this._loaderReady.length;
        if(len > 0 && this._loaderReady[0].success())this._loaderReady.shift();
        // for(let i:number = 0 ; i < len; i ++)
        // {
        //     this._loaderReady.shift().success();
        // }
        // Trace.trace("准备数量",len);
    }

    private render(interval:number):void
    {
        let that = this;
        if(that._queues.length > 0) that.next();
        // let bol:boolean = false;
        // if(KeyManager.bol) bol = true;
        for(let key in that._loadersCanGC)
        {
            let loader:Loader = that._loadersCanGC[key];
            if(((loader.state == LoaderState.SUCESS)||(loader.state == LoaderState.FAIL)) &&loader.release())
            {
                delete that._loadersCanGC[key];
                // break;
            }
            else
            {
                // if(bol) Trace.trace("引用数量：",loader.count,"路径：",loader.path.url);
            }
        }
        // KeyManager.bol = false;
    }

    private sortQueues(value1:any, value2:any):number
	{
		if(value1.priority > value2.priority) return -1;
		else if(value1.priority < value2.priority) return 1;
		return 0;
	}

    public remove(path:PathInfo,complete:Function,target:any):void
    {
        var loader:Loader = this._loadersCanGC[path.url];
        if(loader == null)loader = this._loadersCanotGC[path.url];
        if(loader != null)
        {
            if(loader.state == LoaderState.SUCESS)loader.removeCount();
            else if(loader.state == LoaderState.FAIL){}
            else loader.remove(complete,target);
        }
    }

    public removeTexture(source:string,complete:Function,target:any):void
    {
        var loader:Loader = this._loaderTextureCanGC[source];
        if(loader != null)
        {
            if(loader.state == LoaderState.SUCESS)loader.removeCount();
            else if(loader.state == LoaderState.FAIL){}
            else loader.remove(complete,target);
        }
    }

}