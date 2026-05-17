class Trace
{
    public static trace(...args:any[]):void
    {
        if(DEBUG)
        {
            // console.log.apply(this,args);
        }
    }

    public static error(...args:any[]):void
    {
        args.unshift("【错误】：");
        console.log.apply(this,args);//各种逻辑错误，发布之后也需要显示的日志
    }

    private static isSendToMany:boolean;//是否短时间发送过多
    private static lastMarkTime:number = 0;//上次清空数量时间
    private static sendCount:number = 0;//累计发送数量
    /**
     * 发送日志到服务器
     */
    public static log(...args:any[]):void
    {
        if(this.isSendToMany) return;//短时间发送过多，则不再发送

        var len:number = args.length;
        let str:string = len > 0 ? args[0]+"" : "";//日志内容
        for(let i:number = 1; i<len; i++)
        {
            str += "," + args[i];
        }

        if(str != "")
        {
            Manager.control.getLogin().sendLogToServer(str);//发送日志



            this.sendCount++;
            if(this.sendCount > 10000) //短时间累计发送数量过万，则设置isSendToMany为true，后面不再发送日志
            {
                this.isSendToMany = true;
                Manager.control.getLogin().sendLogToServer("短时间发送日志过多，停止发送日志！");
            }

            let curTime:number = egret.getTimer();
            if(curTime - this.lastMarkTime > 60000) //1分钟清空一次数量
            {
                this.lastMarkTime = curTime;
                this.sendCount = 0;
            }
        }
    }
}