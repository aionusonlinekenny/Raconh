/**
 *author Anydo
 *create 2018-1-31
 *description 
*/
class PetSkillLevelCVO
{
    public static cvos:Object;

    public id:number;
    public skillGroupId:number;
    public skillLevel:number;
    public des:string;
    /**升级消耗 */
    public loss:GainLossVO;

    public parseOne(data:egret.ByteArray):void
    {
        this.id = data.readShort();
        this.skillGroupId = data.readShort();
        this.skillLevel = data.readShort();
        this.des = data.readUTF();
        this.loss = new GainLossVO(data.readUTF());
    }

    public static getCVO(groupId:number, level:number):PetSkillLevelCVO
    {
        let cvo:PetSkillLevelCVO;
        for(let id in this.cvos)
        {
            cvo = this.cvos[id];
            if(cvo.skillGroupId == groupId && cvo.skillLevel == level) return cvo;
        }
        return null;
    }
}