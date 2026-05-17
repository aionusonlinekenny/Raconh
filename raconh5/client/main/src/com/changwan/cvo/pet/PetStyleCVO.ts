/**
 *author Anydo
 *create 2018-2-1
 *description 
*/
class PetStyleCVO
{
    public static cvos:PetStyleCVO[];

    public id:number;
    public name:string;
    public resId:number;
    /** 激活类型 1品阶激活 2道具激活 */
    public activeType:number;
    /** activeType为1时表示激活所需的品阶 activeType为2时为空 */
    public activeJie:number;
    /** 属性 */
    public attrVO:AttrVO;

    public parseOne(data:egret.ByteArray):void
    {
        this.id = data.readByte();
        this.name = data.readUTF();
        this.resId = data.readShort();
        this.attrVO = Manager.pool.create(AttrVO, data.readUTF())
        this.activeType = data.readByte();
        this.activeJie = data.readByte();
    }

    public static getCVOByResId(resId:number):PetStyleCVO
    {
        let cvo:PetStyleCVO;
        for(let i:number = 0; i < PetStyleCVO.cvos.length; i++)
        {
            cvo = PetStyleCVO.cvos[i];
            if(cvo.resId == resId) return cvo;
        }
        return null;
    }
}