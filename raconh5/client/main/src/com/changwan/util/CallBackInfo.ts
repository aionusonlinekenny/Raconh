/**
 * 回调函数信息类
 * devil
 * create  2017-11-10
 * update
*/
class CallBackInfo implements cw.IPool
{
    public callBack:Function;
    public target:any;
    public args:any[];

    public reuse(callBack:Function,target:any,...args:any[]):void
    {
        this.args = args;
        this.callBack = callBack;
        this.target = target;
    }
    public unuse():void
    {
        this.callBack = null;
        this.target = null;
        this.args = null;
    }
    public dispose():void
    {
        this.callBack = null;
        this.target = null;
        this.args = null;
    }

    public static contains(callBacks:CallBackInfo[],callBack:Function,target:any):number
    {
        let len = callBacks.length;
        for(let i = 0 ; i < len; i ++)
        {
            if(callBacks[i].callBack == callBack && callBacks[i].target == target)return i;
        }
        return -1;
    }

    public actCallBack():void
	{
		if(this.args == null || this.args.length == 0)this.callBack.call(this.target);
		else 
		{
			if(this.args.length == 1)this.callBack.call(this.target,this.args[0]);
			else if(this.args.length == 2)this.callBack.call(this.target,this.args[0],this.args[1]);
			else if(this.args.length == 3)this.callBack.call(this.target,this.args[0],this.args[1],this.args[2]);
			else if(this.args.length == 4)this.callBack.call(this.target,this.args[0],this.args[1],this.args[2],this.args[3]);
			else if(this.args.length == 5)this.callBack.call(this.target,this.args[0],this.args[1],this.args[2],this.args[3],this.args[4]);
		}
	}
}