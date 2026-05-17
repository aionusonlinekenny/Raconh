/**
 * 主线副本表
 * luzhihong
 * create 2017-12-2
 */
 class MainCopyCVO
{
    private static _cvos:Object;

    /*层数*/
    public cell:number;
    /*名字*/
    public name:string;
    /*怪物ID*/
    public monID:number;
    public get monCVO():MonsterCVO
    {
        return MonsterCVO.getCVO(this.monID);
    }
    /*功能预告id*/
    public sysID:number;
    /*副本进入条件(任务id)*/
    public taskID:number;

    /*解析表*/
    public static parse(bytes:egret.ByteArray):void
    {
        MainCopyCVO._cvos = [];
        let cvo:MainCopyCVO;
        let rowCount:number = bytes.readShort();
        for (let j = 0; j < rowCount; j++)
        {
            cvo = new MainCopyCVO();
            cvo.cell = bytes.readShort();
            cvo.name = bytes.readUTF();
            let monStr:string = bytes.readUTF();
            cvo.sysID = bytes.readShort();
            let taskStr:string = bytes.readUTF();

            var reg:RegExp = /{|}| /g;
            monStr = monStr.replace(reg,"");
            let arr:Array<string> = monStr.split(",");
            cvo.monID = parseInt(arr[0]);

            taskStr = taskStr.replace(reg,"");
            arr = taskStr.split(",");
            if(arr.length > 2) cvo.taskID = parseInt(arr[2]);
            
            MainCopyCVO._cvos[cvo.cell] = cvo;
        }
    }

    
    public static getCVO(cell:number):MainCopyCVO
    {
        return MainCopyCVO._cvos[cell];
    }
}