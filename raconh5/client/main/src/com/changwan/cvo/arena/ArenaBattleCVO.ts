/**
 *author Anydo
 *create 2018-1-3
 *description 
*/
class ArenaBattleCVO
{
    /** 回合数 */
    public step:number;
    /** 自己动作 */
    public selfAction:string;
    /** 自己技能特效(根据职业算出具体技能id) */
    public selfSkill:number;
    /** 对方动作 */
    public enemyAction:string;
    /** 对方技能特效(根据职业算出具体技能id) */
    public enemySkill:number;
    /**
     * 自己战力比 = 自己战力 / 对方战力
     * 对方战力比 = 对方战力 / 自己战力
     * 自己伤害值 = (自己普攻伤害百分比+自己技能伤害百分比) * 自己战力比 * 对方总血量
     * 对方伤害值 = (对方普攻伤害百分比+对方技能伤害百分比) * 对方战力比 * 自己总血量
     * 备注：伤害值向上取整
     */
    /** 自己普攻伤害百分比(%) */
    public selfComHurt:number;
    /** 自己技能伤害百分比(%) */
    public selfSkillHurt:number;
    /** 对方普攻伤害百分比(%) */
    public enemyComHurt:number;
    /** 对方技能伤害百分比(%) */
    public enemySkillHurt:number;

    private static _cvos:Object;

    public static parse(bytes:egret.ByteArray):void
    {
        ArenaBattleCVO._cvos = {};
        let cvoCount:number = bytes.readShort();
        for(let i:number = 0 ; i < cvoCount; i ++)
        {
            let cvo:ArenaBattleCVO = new ArenaBattleCVO();
            cvo.step = bytes.readByte();
            cvo.selfAction = bytes.readUTF();
            cvo.selfSkill = bytes.readByte();
            cvo.enemyAction = bytes.readUTF();
            cvo.enemySkill = bytes.readByte();
            cvo.selfComHurt = bytes.readByte();
            cvo.selfSkillHurt = bytes.readByte();
            cvo.enemyComHurt = bytes.readByte();
            cvo.enemySkillHurt = bytes.readByte();
            ArenaBattleCVO._cvos[cvo.step] = cvo;
        }
    }

    public static getCVOByStep(step:number):ArenaBattleCVO
    {
        return ArenaBattleCVO._cvos[step];
    }
}