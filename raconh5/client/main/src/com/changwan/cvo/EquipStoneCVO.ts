class EquipStoneCVO
{
    public id:number;
    public level:number;
    public nextId:number;
    public stoneType:number;
    public attr:Array<number>;

    private static _cvos = {};
    private static _suitCvos = {};
    private static _stonePosCvos = {};

    public static parse(bytes:egret.ByteArray):void
    {
        let tableCount:number = bytes.readByte();
        for(let i:number = 0 ; i<tableCount; i ++)
        {
            let cvoCount = bytes.readShort();
            if(i == 0)
            {
                for(let j:number=0; j<cvoCount; j++)
                {
                    let info:EquipStoneCVO = new EquipStoneCVO();
                    info.id = bytes.readInt();
                    info.level = bytes.readShort();
                    info.nextId = bytes.readInt();
                    info.stoneType = bytes.readShort();
                    this._cvos[info.id] = info;
                }
            }
            else if(i == 1)
            {
                for(let j:number=0; j<cvoCount; j++)
                {
                    let suitInfo:EquipStoneSuitInfo = new EquipStoneSuitInfo();
                    suitInfo.id = bytes.readShort();
                    suitInfo.level = bytes.readShort();
                    suitInfo.attr = [];
                    let arr:string = bytes.readUTF();
                    if(arr.length != 0)
                    {
                        let arr1:Array<string> = arr.split("|");
                        for(let k=0; k<arr1.length; k++)
                        {
                            let arr2:Array<string> = arr1[k].split(",");
                            let list:Array<number> = [];
                            list.push(Number(arr2[0]));
                            list.push(Number(arr2[1]));
                            suitInfo.attr.push(list);
                        }
                    }
                    this._suitCvos[suitInfo.level] = suitInfo;
                }
            }
            else if(i == 2)
            {
                for(let j:number=0; j<cvoCount; j++)
                {
                    let stonePosInfo:EquipStonePosInfo = new EquipStonePosInfo();
                    stonePosInfo.id = bytes.readShort();
                    stonePosInfo.equipPos = bytes.readShort();
                    stonePosInfo.stonePos = bytes.readShort();
                    stonePosInfo.stoneType = bytes.readShort();
                    this._stonePosCvos[stonePosInfo.equipPos + "_" + stonePosInfo.stonePos] = stonePosInfo;
                }
            }
        }
    }

    public static getGemInfo(id:number):EquipStoneCVO
    {
        return this._cvos[id];
    }

    public static getGemInfoByTypeLevel(type:number, level:number):EquipStoneCVO
    {
        for(let i in this._cvos)
        {
            if(this._cvos[i].stoneType == type && this._cvos[i].level == level)
                return this._cvos[i];
        }
        return null;
    }

    public static getGemSuitInfo(level:number):EquipStoneSuitInfo
    {
        return this._suitCvos[level];
    }

    public static getGemPosInfo(equipPos:number, stonePos:number):EquipStonePosInfo
    {
        return this._suitCvos[equipPos + "_" + stonePos];
    }
}