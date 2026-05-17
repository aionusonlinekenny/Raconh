/**
 * 宠物模板表
 * liangyan
 * create 2017-12-16
*/
class PetCVO
{
    private static _cvos:Object;
    /**最大阶数 */
    public static MAX_PINJIE:number;

    public id:number;
    /**品阶 */
    public pinjie:number;
    /**星数 */
    public star:number;
    /**升星进度 */
    public starExp:number;
    /**升星消耗 */
    public loss:GainLossVO;
    public attrStr:string;
    /**资质丹上限 */
    public zzdMax:number;
    /**悟性丹上限 */
    public wxdMax:number;
    /**新激活技能id */
    public newSkillID:number;

    private parseOne(data:egret.ByteArray):void
    {
        this.id = data.readShort();
        this.pinjie = data.readByte();
        this.star = data.readByte();
        this.starExp = data.readShort();
        this.loss = new GainLossVO(data.readUTF());
        this.attrStr = data.readUTF();
        this.zzdMax = data.readShort();
        this.wxdMax = data.readShort();
        this.newSkillID = data.readShort();
    }

    private static setMaxPinjie():void
    {
        let count = 0;
        for(let key in PetCVO._cvos)
        {
            count ++;
        }
        PetCVO.MAX_PINJIE = count;
    }

    public static parse(bytes:egret.ByteArray):void
    {
        var tableCount:number = bytes.readByte();
        for(let t:number = 0 ; t < tableCount; t++)
        {
            if(t == 0)
            {
                PetCVO._cvos = {};
                let baseCount:number = bytes.readShort();
                let cvo:PetCVO;
                for (let i = 0; i < baseCount; i++)
                {
                    cvo = new PetCVO();
                    cvo.parseOne(bytes);
                    if(!PetCVO._cvos.hasOwnProperty("" + cvo.pinjie)) PetCVO._cvos[cvo.pinjie] = new Array<PetCVO>();
                    PetCVO._cvos[cvo.pinjie].push(cvo);
                }
                this.setMaxPinjie();
            }
            else if(t == 1)
            {
                PetSkillLevelCVO.cvos = {};
                let levelCount:number = bytes.readShort();
                let cvo:PetSkillLevelCVO;
                for (let i = 0; i < levelCount; i++)
                {
                    cvo = new PetSkillLevelCVO();
                    cvo.parseOne(bytes);
                    PetSkillLevelCVO.cvos[cvo.id] = cvo;
                }
            }
            else if(t == 2)
            {
                PetBombCVO.cvos = {};
                let bombCount:number = bytes.readShort();
                let cvo:PetBombCVO;
                for (let i = 0; i < bombCount; i++)
                {
                    cvo = new PetBombCVO();
                    cvo.parseOne(bytes);
                    PetBombCVO.cvos[cvo.resId] = cvo;
                }
            }
            else if(t == 3)
            {
                PetStyleCVO.cvos = [];
                let styleCount:number = bytes.readShort();
                let cvo:PetStyleCVO;
                for (let i = 0; i < styleCount; i++)
                {
                    cvo = new PetStyleCVO();
                    cvo.parseOne(bytes);
                    PetStyleCVO.cvos.push(cvo);
                }
            }
        }
    }

    public static getCVO(pinjie:number, star:number):PetCVO
    {
        let arr:Array<PetCVO> = PetCVO._cvos[pinjie];
        if(!arr) return null;
        for(let i = 0; i < arr.length; i++)
        {
            if(arr[i].star == star) return arr[i];
        }
    }

    public static getCVOByNewSkillId(newSkillId:number):PetCVO
    {
        for(let key in PetCVO._cvos)
        {
            let arr:Array<PetCVO> = PetCVO._cvos[key];
            for(let i:number = 0; i < arr.length; i++)
            {
                if(arr[i].newSkillID == newSkillId) return arr[i];
            }
        }
        return null;
    }
}