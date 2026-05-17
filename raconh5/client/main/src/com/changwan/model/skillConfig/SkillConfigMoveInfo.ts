/**
 *author Anydo
 *create 2017-11-17
 *description 
*/
class SkillConfigMoveInfo implements cw.IPool
{
    //延迟秒数
    public delayTime:number;
    //相对起始点的偏移
    public moveDisX:number;
    public moveDisY:number;
    //起始点
    public startX:number;
    public startY:number;
    //目标点
    public targetX:number;
    public targetY:number;
    //速度
    public speedX:number;
    public speedY:number;
    //加速度
    public speedAddX:number;
    public speedAddY:number;
    //运行时间
    public runTime:number;
    
    public reuse(configStr:string,angleCom:number)
    {
        //延迟秒数&起始速度(每秒的移动像素)&加速度&相对起始点的X偏移(左减右加)&相对起始点的Y偏移(上加下减)
        let arr:string[] = configStr.split("&");
        this.delayTime = parseFloat(arr[0]);
        let tspeed:number = parseFloat(arr[1]);
        let tspeedAdd:number = parseFloat(arr[2]);
        let tempX:number = parseInt(arr[3]);
        let tempY:number = parseInt(arr[4]);
        let vd1:Vector2D = new Vector2D(tempX,tempY);
        let tAngle:number = (vd1.angle * 180) / Math.PI;//弧度转角度
        tAngle = -tAngle;
        tAngle = (tAngle + 360) % 360;
        tAngle = (tAngle + angleCom + 360) % 360;
        tAngle = tAngle * Math.PI / 180;//角度转弧度
        let vd2:Vector2D = new Vector2D(1,0);
        vd2.angle = tAngle;
        
        vd2.length = vd1.length;
        this.moveDisX = Number(vd2.x.toFixed(3));
        this.moveDisY = Number(vd2.y.toFixed(3));
        
        vd2.length = tspeed;
        this.speedX = Number(vd2.x.toFixed(3));
        this.speedY = Number(vd2.y.toFixed(3));
        
        vd2.length = tspeedAdd;
        this.speedAddX = Number(vd2.x.toFixed(3));
        this.speedAddY = Number(vd2.y.toFixed(3));
    }

	public unuse():void
	{
         this.delayTime = 0;
         this.moveDisX = 0;
         this.moveDisY = 0;
         this.startX = 0;
         this.startY = 0;
         this.targetX = 0;
         this.targetY = 0;
         this.speedX = 0;
         this.speedY = 0;
         this.speedAddX = 0;
         this.speedAddY = 0;
         this.runTime = 0;
	}
    
    public setStart(startX:number,startY:number):void
    {
        this.runTime = 0;
        this.startX = startX;
        this.startY = startY;
        this.targetX = startX + this.moveDisX;
        this.targetY = startY + this.moveDisY;
    }
    
    public getRunDiS(interval:number):number[]
    {
        this.runTime += interval;
        let ttime:number = this.runTime / 1000;
        let disX:number = this.speedX * ttime + 0.5 * this.speedAddX * ttime * ttime;
        let disY:number = this.speedY * ttime + 0.5 * this.speedAddY * ttime * ttime;
        return [disX,disY];
    }

    public dispose():void
    {
    }
}