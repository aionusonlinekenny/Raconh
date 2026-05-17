/**
 *author Anydo
 *create 2017-11-17
 *description 
*/
class SkillLineInfo implements cw.IPool
{
    /**
	 * 特效距离中心点距离
	 */	
	public dis:number;
	/**
	 * 相对目标方向的角度(°)
	 */	
	public angle:number;
	/**
	 * 出现时间点(ms)
	 */	
	public showTime:number;
	/**
	 * 向左时特效自动垂直翻转
	 */	
	public autoOverturn:boolean;
	/**
	 * 角度
	 */	
	public rotation:number;
	/**
	 * 技能特效移动数据
	 */	
	public moveConfig:string;
	
	public reuse(configStr:string,rotation:number,autoOverturn:boolean):void
	{
		let arr:string[] = configStr.split(",");
		this.dis = parseInt(arr[0]);
		this.angle = parseInt(arr[1]);
		if(autoOverturn) this.angle *= -1;
		this.showTime = parseInt(arr[2]);
		this.autoOverturn = autoOverturn;
		this.rotation = rotation;
		this.moveConfig = arr[3];
	}

	public unuse():void
	{
         this.dis = 0;
         this.angle = 0;
         this.showTime = 0;
         this.autoOverturn = false;
		 this.rotation = 0;
		 this.moveConfig = "";
	}
	
    public dispose():void
    {
    }
}