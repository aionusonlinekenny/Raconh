/**
 * 角色类型
 */
class GameObjectType
{
    public static EMPTY:number = 0;
    public static SELF:number = 1;
    public static OTHER:number = 2;
    public static MONSTER_NORMAL:number = 4;
    public static MONSTER_BOSS:number = 8;
    public static NPC:number = 16;
    public static COLLECT:number = 32;
    public static DROP:number = 64;
    public static PET:number = 128;
    public static SELF_PET:number = 256;
    public static JUMP_POINT:number = 512;
    public static SCENE_EFF:number = 1024;
    public static SCENE_ROBOT:number = 2048;
    public static STATUE:number = 4096;//雕像
		

    public static get monsterTypes():number[]
    {
         return [this.MONSTER_NORMAL, this.MONSTER_BOSS];
    }

    /**
     * 需要排序的类型
     */
    public static get needSortTypes():number[]
    {
        return [this.SELF,this.OTHER,this.MONSTER_NORMAL,this.MONSTER_BOSS,this.NPC,this.COLLECT,this.PET,this.SELF_PET,this.SCENE_ROBOT,this.STATUE];
    }

    public static get types():number[]
    {
         return [this.SELF, this.OTHER, this.MONSTER_NORMAL, this.MONSTER_BOSS, this.NPC, this.COLLECT, this.DROP, this.PET, this.SELF_PET, this.JUMP_POINT,this.SCENE_EFF,this.SCENE_ROBOT,this.STATUE];
    }

    public static isPlayer(type:number):boolean
    {
        return (type ==  this.SELF ||  type == this.OTHER);
    }

    public static isMonster(type:number):boolean
    {
        return type == this.MONSTER_NORMAL || type == this.MONSTER_BOSS;
    }
}