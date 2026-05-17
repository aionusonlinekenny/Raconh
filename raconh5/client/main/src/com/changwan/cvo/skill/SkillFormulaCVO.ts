/**
 * 技能公式表
 * liangyan
 * create 2017-11-21
*/
class SkillFormulaCVO
{
    public static cvos:Object;
    /**技能ID */
    public id:number;
    /**类型 */
    public type:string;
    /**参数1 */
    public arg1:number;
    /**参数2 */
    public arg2:number;
    /**参数3 */
    public arg3:number;

    public parse(data:egret.ByteArray):void
    {
        this.id = data.readShort();
        this.type = data.readUTF();
        this.arg1 = data.readShort();
        this.arg2 = data.readShort();
        this.arg3 = data.readShort();
    }

    public static getCVO(id:number, type:string):SkillFormulaCVO
    {
        let result:SkillFormulaCVO;
        let arr:Array<SkillFormulaCVO> = SkillFormulaCVO.cvos[type];
        if(!arr) return null;
        let len = arr.length;
        for(let i = 0; i < len; i++)
        {
            if(arr[i].id == id) return arr[i];
        }
        return null;
    }

    public getFormulaResult(level:number):number
    {
        let skillCvo = SkillCVO.getCVO(this.id);
        if(this.type == SkillFormulaType.CONDITION || this.type == SkillFormulaType.LOSS) level += 1;
        if(level > skillCvo.maxLevel) return 99999999999;
        // return level * this.arg1 + this.arg2;
        if(this.type == SkillFormulaType.LOSS)
        {
            return Math.floor((this.arg1 / 1000) * Math.pow(level, this.arg2 / 1000) + this.arg3);
        }
        else
        {
            return level * this.arg1 + this.arg2;
        }
    }
}