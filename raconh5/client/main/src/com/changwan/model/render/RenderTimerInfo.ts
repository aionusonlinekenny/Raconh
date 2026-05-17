class RenderTimerInfo implements cw.IPool
{
	public render:Function;
	public endUpdate:Function;
	public target:any;
	public alive:boolean;//false失效true生效
	public deley:number;//延时值
	public repeat:number;//重复次数，如果小于等于0则为无限次循环
	public interval:number;//中间变量值，用于记录用
	public args:any[];


	public constructor()
	{
	   this.alive = false;
	   this.deley = 0;
	   this.repeat = 0;
	   this.interval = 0;
	}
	public dispose():void
	{
		this.render = null;
		this.endUpdate = null;
		this.target = null;
		this.args.length = 0;
		this.args = null;
	};
	public reuse(render:Function,target:any,deley:number,repeat:number,endUpdate:Function,args:any[]):void
	{
		this.render = render;
		this.endUpdate = endUpdate;
		this.target = target;
		this.deley = deley;
		this.repeat = repeat;
		this.alive = true;
		this.args = args;
	}
	public unuse():void
	{
		this.render = null;
		this.endUpdate = null;
		this.target = null;
		this.alive = false;
		this.deley = 0;
		this.repeat = 0;
		this.interval = 0;
		this.args.length = 0;
		this.args = null;
	}
}