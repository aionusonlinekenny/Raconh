/**
 *author Anydo
 *create 2017-11-17
 *description 
*/
class SkillAreaInfo implements cw.IPool
{
    /**
	 * 特效距离中心点距离
	 */	
	public dis:number;
	/**
	 * 相对目标方向的角度(°)
	 */	
	public angleCom:number;
	/**
	 * 出现时间点(ms)
	 */	
	public showTime:number;
	/**
	 * 水平缩放
	 */	
	public scaleX:number;
	/**
	 * 垂直缩放
	 */	
	public scaleY:number;
	/**
	 * 自转角度(°)
	 */	
	public angleSelf:number;
	/**
	 * 角度
	 */	
	public rotation:number;
	/**
	 * 技能特效移动数据
	 */	
	public moveConfig:string;

	public reuse(configStr:string,rotation:number):void
	{
        let arr:string[] = configStr.split(",");
		this.dis = parseInt(arr[0]);
		this.angleCom = parseInt(arr[1]);
		this.showTime = parseInt(arr[2]);
		this.scaleX = parseInt(arr[3]);
		this.scaleY = parseInt(arr[4]);
		this.angleSelf = parseInt(arr[5]);
		this.rotation = rotation;
		this.moveConfig = arr[6];
	}

	public unuse():void
	{
		this.dis = 0;
        this.angleCom = 0;
        this.showTime = 0;
		this.scaleX = 1;
		this.scaleY = 1;
        this.angleSelf = 0;
        this.rotation = 0;
        this.moveConfig = "";
	}
	
    public dispose():void
    {
    }
}