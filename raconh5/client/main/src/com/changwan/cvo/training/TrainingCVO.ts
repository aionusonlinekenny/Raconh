class TrainingCVO
{
    private static _cvos = {};
    private static _posCvos = {};
    private static _expCvos = {};
    public static regionInfo:TrainingInfo;

    public id:number;
    public name:string;
    public loss:GainLossVO;
    public gain:GainLossVO;
    public item:GainLossVO;
    public expRatio:number;
    public fixPos:number;

	public constructor()
    {}

    public static parse(bytes:egret.ByteArray):void
    {
        let tableCount:number = bytes.readByte();
        for(let i:number = 0; i < tableCount; i++)
        {
            let count:number = bytes.readShort();
            if(i == 0)
            {
                for(let j:number = 0; j < count; j++)
                {
                    let info:TrainingCVO = new TrainingCVO();
                    info.id = bytes.readByte();
                    info.name = bytes.readUTF();
                    info.loss = new GainLossVO(bytes.readUTF());
                    info.gain = new GainLossVO(bytes.readUTF());
                    info.item = new GainLossVO(bytes.readUTF());
                    info.expRatio = bytes.readShort();
                    info.fixPos = bytes.readByte();
                    this._cvos[info.id] = info;
                }
            }
            if(i == 1)
            {
                for(let j:number = 0; j < count; j++)
                {
                    let info:TrainingPosCVO = new TrainingPosCVO();
                    info.id = bytes.readShort();
                    info.type = bytes.readByte();
                    let s:string = bytes.readUTF();
                    s = s.replace("{", "").replace("}", "");
                    let arr:Array<string> = s.split(",");
                    info.pos = new egret.Point(Number(arr[0]), Number(arr[1]));
                    info.direction = bytes.readUTF();
                    this._posCvos[info.id] = info;
                }
            }
            if(i == 2)
            {
                for(let j:number = 0; j < count; j++)
                {
                    let info:TrainingExpCVO = new TrainingExpCVO();
                    info.id = bytes.readByte();
                    info.minLevel = bytes.readShort();
                    info.maxLevel = bytes.readShort();
                    info.exp = bytes.readInt();
                    this._expCvos[info.id] = info;
                }
            }
            if(i == 3)
            {
                let id:number = bytes.readByte();
                let str:string = bytes.readUTF();
                str = str.replace("{", "").replace("}", "");
                let arr:Array<string> = str.split(",");
                this.regionInfo = new TrainingInfo();
                this.regionInfo.trainingPoint = new egret.Point(Number(arr[0]), Number(arr[1]));
                this.regionInfo.trainingRadius = Number(arr[2]);
            }
        }
    }

    public static getInfo(id:number):TrainingCVO
    {
        return this._cvos[id];
    }

    public static getPosInfo(id:number):TrainingPosCVO
    {
        return this._posCvos[id];
    }

    public static getExpInfo(level:number):TrainingExpCVO
    {
        for(let info in this._expCvos)
        {
            if(this._expCvos[info])
            {
                if(level >= this._expCvos[info].minLevel && level < this._expCvos[info].maxLevel)
                {
                    return this._expCvos[info];
                }
            }
        }
        return null;
    }
}

class TrainingPosCVO
{
    public id:number;
    public type:number;
    public pos:egret.Point;
    public direction:string;
}

class TrainingExpCVO
{
    public id:number;
    public minLevel:number;
    public maxLevel:number;
    public exp:number;
}

class TrainingInfo
{
    /**传功区域中心点 */
    public trainingPoint:egret.Point;
    /**传功区域半径 */
    public trainingRadius:number;
}