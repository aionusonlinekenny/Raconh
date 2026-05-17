/**
 *author Anydo
 *create 2017-11-27
 *description
*/
var BodyStateManger = /** @class */ (function () {
    function BodyStateManger() {
        this.buffCanDic = {};
        this.isingCanDic = {};
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
    BodyStateManger.BUFF_BIAN_YANG = 1; //变羊
    BodyStateManger.BUFF_JIN_TIAO = 2; //禁跳
    BodyStateManger.BUFF_JIAN_HUI_XUE = 4; //禁回血
    BodyStateManger.BUFF_XUAN_YUN = 8; //眩晕
    BodyStateManger.BUFF_ZHONG_DU = 16; //中毒
    BodyStateManger.BUFF_CHAO_FENG = 32; //嘲讽
    BodyStateManger.BUFF_CHEN_MO = 64; //沉默
    BodyStateManger.ISING_JUMP = 1; //正在跳跃
    BodyStateManger.ISING_BF = 2; //正在战场中
    BodyStateManger.ISING_SUB = 4; //正在副本中
    BodyStateManger.ISING_FLY = 8; //飞行传送中
    BodyStateManger.ISING_SPRINT = 16; //正在冲刺
    BodyStateManger.ISING_SLIDE = 32; //正在滑行
    BodyStateManger.ISING_KITE = 64; //正在风筝上
    BodyStateManger.ISING_WATER = 128; //正在水上漂
    BodyStateManger.ISING_COLLECT = 256; //正在采集
    return BodyStateManger;
}());
//# sourceMappingURL=BodyStateManger.js.map