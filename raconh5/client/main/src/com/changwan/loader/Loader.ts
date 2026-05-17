/**
 *author liangshunmin
 *create 
 *update devlil 2017-11-13
 *description 
*/
class Loader implements cw.IPool
{
	private _priority:number;
	private _path:PathInfo;
	public get path():PathInfo
	{
		 return this._path; 
	}
	private _callBacks:CallBackInfo[];
	private _resourceGCType:number;
	public state:number;
	private _count:number;
	/**
	 * 引用数量
	 */
	public get count():number
	{
		 return this._count; 
	}
	/**
	 * 记录引用计数为0的时间
	 */
	private _unUseTimer:number;
	/**
	 * 加载后的数据
	 */
	public data:any;
	private _loadCount:number;//加载文件数量，资源，地图都是两份文件，值为2，默认为1
	
	public constructor()
	{
		this._callBacks = [];
		this.state = LoaderState.WAITING;
		this._count = 0;
		this._loadCount = 1;
	}

	public add(complete:Function,target:any):void
	{
		if(CallBackInfo.contains(this._callBacks,complete,target) == -1)
		{
			this._callBacks.push(Manager.pool.create(CallBackInfo,complete,target));
		}
	}

	public remove(complete:Function,target:any):void
	{
		var index = CallBackInfo.contains(this._callBacks,complete,target);
		if(index >= 0)
		{
			Manager.pool.push(this._callBacks[index]);
			this._callBacks.splice(index,1)
		}
	}

	public reuse(path:PathInfo,priority:number,resourceGCType:number):void
	{
		this._path = path;
		this._priority = priority;
		this._resourceGCType = resourceGCType;
		switch(this._path.loaderType)
		{
			case LoaderType.ANI:
			case LoaderType.MAP_DATA:
			case LoaderType.TEXTURE:
				this._loadCount = 2;
				break;
			default:
				this._loadCount = 1;
				break;
		}
	}

	public unuse():void
	{
		// RES.destroyRes(this._path.url);
		switch(this._path.loaderType)
		{
			case LoaderType.MAP_DATA:
				if(this.data.mapData != null)
				{
					Manager.pool.push(this.data.mapData);
					this.data.mapData = null;
					delete this.data.mapData;
				}

				if(this.data.bitmapData != null)
				{
					this.data.bitmapData.$dispose();
					this.data.bitmapData = null;
					delete this.data.bitmapData;
				}
				break;
			case LoaderType.ANI:
				this.data.jsonData = null;
				delete this.data.jsonData;
				if(this.data.aniData != null)
				{
					Manager.pool.push(this.data.aniData);
					this.data.aniData = null;
					delete this.data.aniData;
				}
				if(this.data.bitmapData != null)
				{
					this.data.bitmapData.$dispose();
					this.data.bitmapData = null;
					delete this.data.bitmapData;
				}
				break;
			case LoaderType.IMAGE:
				if(this.data != null)
				{
					this.data.$dispose();
				}
				break;
			case LoaderType.TEXTURE:
				this.data.jsonData = null;
				delete this.data.jsonData;
				if(this.data.bitmapData != null)
				{
					this.data.bitmapData.$dispose();
					this.data.bitmapData = null;
					delete this.data.bitmapData;
				}
				break;
		}
		this.data = null;
		for(let i = 0 ; i < this._callBacks.length; i ++)
		{
			Manager.pool.push(this._callBacks[i]);
		}
		this._callBacks.length = 0;
		this._path = null;
		this.state = LoaderState.WAITING;
		this._count = 0;
	}

	private $load(responseType:string):void 
	{
		let request:egret.HttpRequest = this.$getRequest(responseType);
		request.open(this._path.url);
		request.send();
	}

	/**
	 * 获取一个URLLoader对象
	 * 
	 */
	private $getRequest(responseType:string):egret.HttpRequest 
	{
		let request:egret.HttpRequest = Manager.pool.create(egret.HttpRequest);
		request.addEventListener(egret.Event.COMPLETE, this.handleComplete, this);
		request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.handleComplete, this);
		request.responseType = responseType;
		return request;
	}

	private $getLoader():egret.ImageLoader 
	{
		let loader:egret.ImageLoader = Manager.pool.create(egret.ImageLoader);
		loader.addEventListener(egret.Event.COMPLETE, this.handleComplete, this);
		loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.handleComplete, this);
		return loader;
	}



	private $loadImage(url:string):void
	{
		let loader = this.$getLoader();
		loader.load(url);
	}

	/**
	 * 一项加载结束
	 */
	private handleComplete(event:egret.Event):void 
	{
		let request:any = event.target;
		request.removeEventListener(egret.Event.COMPLETE, this.handleComplete, this);
		request.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.handleComplete, this);
		if(request instanceof egret.HttpRequest)this.$analyzeData(request.response);
		else this.$analyzeData(request.data);
		Manager.pool.push2(request);
	}


	/**
	 * 解析并缓存加载成功的数据
	 */
	private $analyzeData(data:any):void 
	{
		if (!data)
		{
			Manager.loader.oneLoadErrorHandler(this._path.url);
			Trace.error("加载文件错误:", this._path.url);
			for(let i = 0 ; i < this._callBacks.length; i ++)
			{
				Manager.pool.push(this._callBacks[i]);
			}
			this._callBacks.length = 0;
			this.removeCount();
			this.state = LoaderState.FAIL;
			this._resourceGCType = ResourceGCType.NOW;
			this._unUseTimer = egret.getTimer();
			Trace.log("加载资源不存在",this._path.url);
			return;
		}
		try
		{
			switch(this._path.loaderType)
			{
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
					if(data instanceof egret.BitmapData)
					{
						this.data.bitmapData = data;
					}
					else 
					{
						this.data.jsonData = JSON.parse(<string>data);
					}
					if(this._loadCount <= 0)
					{
						this.state = LoaderState.SUCESS_READY;
						Manager.loader.addReady(this);
					}
					break;
				case LoaderType.MAP_DATA:
					this._loadCount--;
					if(data instanceof egret.BitmapData)
					{
						this.data.bitmapData = data;
					}
					else
					{
						let path:egret.ByteArray = new egret.ByteArray(data);
						this.data.mapData = Manager.pool.create(MapData, path);
					}
					if(this._loadCount <= 0)
					{
						this.state = LoaderState.SUCESS;
						this.callBack();
					}
					break;
				case LoaderType.TEXTURE:
					this._loadCount--;
					if(data instanceof egret.BitmapData)
					{
						this.data.bitmapData = data;
					}
					else 
					{
						this.data.jsonData = JSON.parse(<string>data);
					}
					if(this._loadCount <= 0)
					{
						this.state = LoaderState.SUCESS;
						// this.data.sheet = new egret.SpriteSheet();
						this.callBack();
					}
					break;
			}
		}
		catch (e) 
		{
			egret.$warn(1017,this._path.url, data);
		}
	}

	public load():void
	{
		this.state = LoaderState.LOADING;
		switch(this._path.loaderType)
		{
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
	}

	public dispose():void
	{
		this.unuse();
		this._callBacks = null;
	}
	
	public success():boolean
	{
		if(this._path.loaderType == LoaderType.ANI && this.data.aniData == null)
		{
			this.data.aniData = Manager.pool.create(AnimationData, this.data.jsonData, this.data.bitmapData);
			// return false;
		}
		this.state = LoaderState.SUCESS;
		this.callBack();
		return true;
	}

	private callBack():void
	{
		let len = this._callBacks.length;
		for(let i = 0 ; i < len; i ++)
		{
			this._callBacks[i].callBack.call(this._callBacks[i].target,this);
		}
		this._count += len;
		for(let i = 0 ; i < this._callBacks.length; i ++)
		{
			Manager.pool.push(this._callBacks[i]);
		}
		this._callBacks.length = 0;
	}

	public addCount():void
	{   
		this._count ++;
	}
	public removeCount():void
	{
		this._count --;
		if(this._count <= 0)this._unUseTimer = egret.getTimer();
	}

	public release():boolean
	{
		if(this._count < 0)
		{
			Trace.error("wrong!!!!!!!!!!!",this._path.url);
		}
		if(this._count <= 0)
		{
			if(egret.getTimer() - this._unUseTimer >= ResourceGCType.getGCTime(this._resourceGCType))
			{
				// Trace.error("release",this._count,this._path.url,new Date().getTime());
				Manager.pool.push(this);
				return true;
			}
			return false;
		}
		return false;
	}
}