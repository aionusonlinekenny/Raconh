/**
 * 套装
 * Simon
 * 2018.1.4
 */
class SuitCVO
{
    public id:number;
    public suitId:number;
    /**类型:1防御,2为攻击 */
    public type:number;
    /**等阶 */
    public level:number;
    public num:number;
    public attr:Array<any>;
    public attrInfo:AttrVO;

    private static _suitInfoList = {};
    private static _suitUpgradeList = {};

    public static parse(bytes:egret.ByteArray):void
    {
        let tableCount:number = bytes.readByte();
        for(let i:number = 0; i<tableCount; i ++)
        {
            let cvoCount = bytes.readShort();
            if(i == 0)
            {
                for(let j:number=0; j<cvoCount; j++)
                {
                    let cvo:SuitCVO = new SuitCVO();
                    cvo.id = bytes.readByte();
                    cvo.suitId = bytes.readInt();
                    cvo.type = Number(String(cvo.suitId).substr(0,1));
                    cvo.level = Number(String(cvo.suitId).substr(String(cvo.suitId).length - 2, 2));
                    cvo.num = bytes.readByte();
                    let str:string = bytes.readUTF();
                    cvo.attr = [];
                    let arr:Array<string> = str.split("|");
                    for(let k:number=0; k<arr.length; k++)
                    {
                        let arr2:Array<string> = arr[k].split(",");
                        cvo.attr.push({key:Number(arr2[0]), value:Number(arr2[1])});
                    }
                    cvo.attrInfo = Manager.pool.create(AttrVO, str);
                    this._suitInfoList[cvo.type + "_" + cvo.level + "_" + cvo.num] = cvo;
                }
            }
            if(i == 1)
            {
                for(let j:number=0; j<cvoCount; j++)
                {
                    let cvo:SuitUpgradeCVO = new SuitUpgradeCVO();
                    cvo.id = bytes.readByte();
                    cvo.level = bytes.readByte();
                    cvo.pos = bytes.readByte();
                    cvo.loss = new GainLossVO(bytes.readUTF());
                    this._suitUpgradeList[cvo.level + "_" + cvo.pos] = cvo;
                }
            }
        }
    }

    /**
     * 返回套装信息
     * type:类型
     * level:等阶
     * num:件数
     */
    public static getSuitInfo(type:number, level:number, num:number):SuitCVO
    {
        return this._suitInfoList[type + "_" + level + "_" + num];
    }

    public static getSuitUpgradeInfo(level:number, pos:number):SuitUpgradeCVO
    {
        return this._suitUpgradeList[level + "_" + pos];
    }
}


class SuitUpgradeCVO
{
    public id:number;
    public level:number;
    public pos:number;
    public loss:GainLossVO;
}