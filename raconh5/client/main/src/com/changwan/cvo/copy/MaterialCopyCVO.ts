/**
 * 缥缈录
 * Simon
 * create 2018-3-16
 */
class MaterialCopyCVO
{
    private static cvos:Object;
    public static typeList1:Object;
    public static typeList2:Object;
    public static typeList3:Object;
    public static MAX_CELL:number = 0;

    /**层数 */
    public cell:number;
    /**关卡名称 */
    public name:string;
    /**难度1 */
    public type1:number;
    /**难度2 */
    public type2:number;
    /**难度3 */
    public type3:number;
    /**星数 */
    public star:number;
    /**星数奖励 */
    public boxAward:GainLossVO[];
    /**采集宝箱奖励 */
    public collectAward:GainLossVO;
    /**怪物 */
    public monsterInfo:string;
    /**进入条件 */
    public conds:ConditionVO;
    /**通关奖励 */
    public passAward:GainLossVO[];
    /**推荐战力 */
    public fight:number;

    /*解析表*/
    public static parse(bytes:egret.ByteArray):void
    {
        MaterialCopyCVO.cvos = [];
        MaterialCopyCVO.typeList1 = [];
        MaterialCopyCVO.typeList2 = [];
        MaterialCopyCVO.typeList3 = [];
        let cvo:MaterialCopyCVO;
        let rowCount:number = bytes.readShort();
        for (let j = 0; j < rowCount; j++)
        {
            cvo = new MaterialCopyCVO();
            cvo.cell = bytes.readShort();
            cvo.name = bytes.readUTF();
            cvo.type1 = bytes.readByte();
            cvo.type2 = bytes.readByte();
            cvo.type3 = bytes.readByte();
            cvo.star = bytes.readByte();
            // cvo.totalStar = bytes.readShort();
            // cvo.award = new GainLossVO(bytes.readUTF());
            // cvo.boxAward = GainLossVO.parse(bytes.readUTF());
            cvo.collectAward = new GainLossVO(bytes.readUTF());
            cvo.monsterInfo = bytes.readUTF();
            cvo.conds = new ConditionVO(bytes.readUTF());
            cvo.passAward = GainLossVO.parse(bytes.readUTF());
            cvo.fight = bytes.readInt();
            MaterialCopyCVO.cvos[cvo.cell] = cvo;
            if(!MaterialCopyCVO.typeList1[cvo.type1])
                MaterialCopyCVO.typeList1[cvo.type1] = [];
            MaterialCopyCVO.typeList1[cvo.type1].push(cvo);
            if(!MaterialCopyCVO.typeList2[cvo.type1 + "_" + cvo.type2])
                MaterialCopyCVO.typeList2[cvo.type1 + "_" + cvo.type2] = [];
            MaterialCopyCVO.typeList2[cvo.type1 + "_" + cvo.type2].push(cvo);
            MaterialCopyCVO.typeList3[cvo.type1 + "_" + cvo.type2 + "_" + cvo.type3] = cvo;
            MaterialCopyCVO.MAX_CELL = cvo.cell;
        }
    }

    public static getCellInfo(cell:number):MaterialCopyCVO
    {
        return MaterialCopyCVO.cvos[cell];
    }

    public static getCopyNameById(type1:number):string
    {
        for(let key in MaterialCopyCVO.cvos)
        {
            if(MaterialCopyCVO.cvos[key].type1 == type1)
                return MaterialCopyCVO.cvos[key].name;
        }
        return "";
    }

    public static getMinFightType(type:number, fight:number):MaterialCopyCVO
    {
        for(let i:number=0; i<5; i++)
        {
            for(let j:number=0; j<3; j++)
            {
                let info:MaterialCopyCVO = MaterialCopyCVO.typeList3[type + "_" + (i + 1) + "_" + (j + 1)];
                if(info)
                {
                    if(Number(fight) >= Number(info.fight))
                        return info;
                }
            }
        }
        return null;
    }

    public static getFirstCell(type:number):MaterialCopyCVO
    {
        return MaterialCopyCVO.typeList3[type + "_1_1"];
    }
}