/**
 *author liangshunmin
 *create 
 *update devlil 2017-11-13
 *description 
*/
class TextureLoader implements cw.IPool
{
	public priority:ResPriorityType;
	private _source:string;
	public get source():string{ return this._source; }
	private _callBacks:CallBackInfo[];
	private _callBacks2:CallBackInfo[];
	private _resourceGCType:number;
	public set resourceGCType(value:number)
	{
		this._resourceGCType = value;
	}
	public state:number;
	private _count:number;
	private _unUseTimer:number;
	public data:egret.Texture;

	public constructor()
	{
		this._callBacks = [];
		this._callBacks2 = [];
		this.state = LoaderState.WAITING;
		this._count = 0;
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
			Manager.pool.push(this._callBacks.splice(index,1)[0]);
		}
	}

	public add2(complete:Function,target:any):void
	{
		if(CallBackInfo.contains(this._callBacks2,complete,target) == -1)
		{
			this._callBacks2.push(Manager.pool.create(CallBackInfo,complete,target));
		}
	}

	public remove2(complete:Function,target:any):void
	{
		var index = CallBackInfo.contains(this._callBacks2,complete,target);
		if(index >= 0)
		{
			Manager.pool.push(this._callBacks2.splice(index,1)[0]);
		}
	}

	public reuse(source:string,priority:number,resourceGCType:number):void
	{
		this._source = source;
		this.priority = priority;
		this._resourceGCType = resourceGCType;
	}

	public unuse():void
	{
		RES.destroyRes(this._source);
        Manager.pool.push(this.data);
		this.data = null;
		for(let i = 0 ; i < this._callBacks.length; i ++)
		{
			Manager.pool.push(this._callBacks[i]);
		}
		this._callBacks.length = 0;
		for(let i = 0 ; i < this._callBacks2.length; i ++)
		{
			Manager.pool.push(this._callBacks2[i]);
		}
		this._callBacks2.length = 0;
		this._source = null;
		this.state = LoaderState.WAITING;
		this._count = 0;
	}

	public load():void
	{
		this.state = LoaderState.LOADING;
        RES.getResAsync(this._source, this.handleComplete, this);
	}

	public dispose():void
	{
		RES.destroyRes(this._source);
		this._source = null;
		for(let i = 0 ; i < this._callBacks.length; i ++)
		{
			Manager.pool.push(this._callBacks[i]);
		}
		this._callBacks = null;
		for(let i = 0 ; i < this._callBacks2.length; i ++)
		{
			Manager.pool.push(this._callBacks2[i]);
		}
		this._callBacks2 = null;
        Manager.pool.push(this.data);
		this.data = null;
	}

	private handleComplete(data:any,url:string):void
	{
		if(data == undefined)
		{
			Manager.loader.oneLoadErrorHandler(this._source);
			Trace.error("加载皮肤贴图错误:", this._source);
			for(let i = 0 ; i < this._callBacks.length; i ++)
			{
				Manager.pool.push(this._callBacks[i]);
			}
			this._callBacks.length = 0;
			for(let i = 0 ; i < this._callBacks2.length; i ++)
			{
				Manager.pool.push(this._callBacks2[i]);
			}
			this._callBacks2.length = 0;
			this.removeCount();
			this.state = LoaderState.FAIL;
			this._resourceGCType = ResourceGCType.NOW;
			this._unUseTimer = egret.getTimer();
		}
		else
		{
			this.data = data;
			this.state = LoaderState.SUCESS;
			this.callBack();
		}
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
		let len2 = this._callBacks2.length;
		for(let i = 0 ; i < len2; i ++)
		{
            this._callBacks2[i].callBack.call(this._callBacks2[i].target,this.data,this._source);
		}
		this._count += len2;
		for(let i = 0 ; i < this._callBacks2.length; i ++)
		{
			Manager.pool.push(this._callBacks2[i]);
		}
		this._callBacks2.length = 0;
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
			Trace.error("wrong!!!!!!!!!!!",this._source);
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