/**
 *author Anydo
 *create 2017-11-27
 *description 
*/
class BodyStateManger
{
    public buffCanDic:Object = {};
    public isingCanDic:Object = {};

    public constructor()
    {
        this.buffCanDic[BodyStateManger.BUFF_JIN_TIAO] = CanType.CAN_JUMP;
        this.buffCanDic[BodyStateManger.BUFF_XUAN_YUN] = CanType.CAN_WALK | CanType.CAN_JUMP | CanType.CAN_HIT | CanType.CAN_SPRINT;
        
        this.isingCanDic[BodyStateManger.ISING_JUMP] = CanType.CAN_WALK | CanType.CAN_HIT | CanType.CAN_HOOK | CanType.CAN_FLY | CanType.CAN_CHANGE_MAP;
        this.isingCanDic[BodyStateManger.ISING_SPRINT] = CanType.CAN_WALK | CanType.CAN_HIT | CanType.CAN_HOOK | CanType.CAN_FLY | CanType.CAN_CHANGE_MAP;
        this.isingCanDic[BodyStateManger.ISING_BF] = CanType.CAN_HOOK | CanType.CAN_TASK;
        this.isingCanDic[BodyStateManger.ISING_SUB] = CanType.CAN_TASK;
        this.isingCanDic[BodyStateManger.ISING_FLY] = CanType.CAN_WALK | CanType.CAN_HIT | CanType.CAN_HOOK | CanType.CAN_FLY | CanType.CAN_CHANGE_MAP;
        this.isingCanDic[BodyStateManger.ISING_SLIDE] = CanType.CAN_WALK | CanType.CAN_HIT | CanType.CAN_HOOK | CanType.CAN_FLY | CanType.CAN_CHANGE_MAP;
        this.isingCanDic[BodyStateManger.ISING_KITE] = CanType.CAN_WALK | CanType.CAN_HIT | CanType.CAN_HOOK | CanType.CAN_FLY | CanType.CAN_CHANGE_MAP;
        this.isingCanDic[BodyStateManger.ISING_WATER] = CanType.CAN_WALK | CanType.CAN_HIT | CanType.CAN_HOOK | CanType.CAN_FLY | CanType.CAN_CHANGE_MAP;
    }

    
    public static BUFF_BIAN_YANG:number = 1;//变羊
    public static BUFF_JIN_TIAO:number = 2;//禁跳
    public static BUFF_JIAN_HUI_XUE:number = 4;//禁回血
    public static BUFF_XUAN_YUN:number = 8;	//眩晕
    public static BUFF_ZHONG_DU:number = 16;//中毒
    public static BUFF_CHAO_FENG:number = 32;//嘲讽
    public static BUFF_CHEN_MO:number = 64;//沉默

    public static ISING_JUMP:number = 1;      //正在跳跃
    public static ISING_BF:number = 2;        //正在战场中
    public static ISING_SUB:number = 4;      //正在副本中
    public static ISING_FLY: number = 8;     //飞行传送中
    public static ISING_SPRINT:number = 16;      //正在冲刺
    public static ISING_SLIDE:number = 32;      //正在滑行
    public static ISING_KITE:number = 64;      //正在风筝上
    public static ISING_WATER:number = 128;      //正在水上漂
    public static ISING_COLLECT:number = 256;   //正在采集
}