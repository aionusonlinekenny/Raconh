/**
 * 协议号
 */
var Protocol = /** @class */ (function () {
    function Protocol() {
    }
    /**
     * 客户端日志
     */
    Protocol.CLIENT_LOG = 12090;
    /**
     * 服务器时间
     */
    Protocol.SYSTEM_SERVER_TIME = 10000;
    /**
     * 心跳包
     */
    Protocol.GAME_HEARTBEAT = 10001;
    /**
     * 账号登录
     */
    Protocol.GAME_LOGIN_REQUEST = 10010;
    /**
     * 角色列表
     */
    Protocol.ROLE_LIST_REQUEST = 10011;
    /**
     * 随机名字
     */
    Protocol.NICKNAME_RONDOM = 10012;
    /**
     * 创建角色
     */
    Protocol.ROLE_CREATE = 10013;
    /**
     * 加载创角页面完成
     */
    Protocol.ROLE_CREATE_STATISTICS = 10014;
    /**
     * 选择角色登录
     */
    Protocol.ROLE_SELECT_LOGIN = 10015;
    /**
     * 踢下线
     */
    Protocol.GAME_KICK_OFFLINE = 10016;
    /**
     * 游客/机器人登录请求
     */
    Protocol.GUEST_LOGIN_REQUEST = 10020;
    /**
     * 聊天监控登录请求
     */
    Protocol.CHAT_MONITOR_LOGIN = 10021;
    /**
     * GM命令列表
     */
    Protocol.CMD_ADMIN_ALL = 10100;
    /**
     * 执行GM命令
     */
    Protocol.CMD_ADMIN_REQUEST = 10101;
    /**
     * 地图进入
     */
    Protocol.MAP_ENTER = 11000;
    /**
     * 地图加载完成通知服务端
     */
    Protocol.MAP_LOAD_COMPLETE = 11001;
    /**
     * 地图添加玩家
     */
    Protocol.MAP_PLAYER_ADD = 11010;
    /**
     * 地图玩家移除
     */
    Protocol.MAP_PLAYER_REMOVE = 11011;
    /**
     * 地图添加怪物
     */
    Protocol.MAP_MONSTER_ADD = 11012;
    /**
     * 地图怪物移除
     */
    Protocol.MAP_MONSTER_REMOVE = 11013;
    /**
     * 地图怪物死亡
     */
    Protocol.MAP_MONSTER_DEAD = 11014;
    /**
     * 更新地图参与者属性(32位整数)
     */
    Protocol.MAP_ELEMENT_ATTR_UPDATE_32 = 11017;
    /**
     * 更新地图参与者属性(64位整数)
     */
    Protocol.MAP_ELEMENT_ATTR_UPDATE_64 = 11018;
    /**
     * 更新地图参与者属性(字符串)
     */
    Protocol.MAP_ELEMENT_ATTR_UPDATE_STR = 11019;
    /**
     * 人物广播移动路径
     */
    Protocol.MAP_PLAYER_WALK = 11020;
    /**
     * 客户端发送同步位置到服务端
     */
    Protocol.MAP_SELF_WALK_SYNC_POS = 11021;
    /**
     * 重置玩家位置
     */
    Protocol.MAP_UPDATE_PLAYER_POS = 11022;
    /**
     * 广播怪物移动路径
     */
    Protocol.MAP_MONSTER_WALK = 11030;
    /**
     * 人物基础信息，只登陆的时候发送一次
     */
    Protocol.ROLE_BASE_INFO = 12000;
    /**
     * 服务端更新角色数据(数字32位)
     */
    Protocol.ROLE_INFO_UPDATE_INT32 = 12001;
    /**
     * 服务端更新角色数据(字符串)
     */
    Protocol.ROLE_INFO_UPDATE_STR = 12002;
    /**
     * 服务端更新角色数据(数字64位)
     */
    Protocol.ROLE_INFO_UPDATE_INT64 = 12003;
    /**地图雕像 */
    Protocol.MAP_STATUS_INFO = 11031;
    //````````````````````````离线收益start```````````````````````````````
    /** 离线收益通知 */
    Protocol.OFFLINE_PROFIT_NOTICE = 12023;
    //````````````````````````离线收益end```````````````````````````````
    /**
     * 人物道具数据查询
     */
    Protocol.GOODS_QUERY_INFO = 16000;
    /**
     * 刷新物品数据
     */
    Protocol.CMD_UPDATE_ITEM_RETURN = 16001;
    /** 存储空间增加物品 */
    Protocol.CMD_ADD_ITEM_RETURN = 16002;
    /** 删除物品通知 */
    Protocol.CMD_DIELETE_ITEM_REUTNR = 16003;
    /** 删除物品 */
    Protocol.CMD_DIELETE_ITEM = 16004;
    /** 使用背包物品 */
    Protocol.CMD_USE_ITEM = 16005;
    /** 存储空间转移物品到另一个存储空间 */
    Protocol.CMD_MOVE_ITEM = 16006;
    /**
     * 装备强化信息
     */
    Protocol.EQUIP_STRENGTHEN_INFO = 16100;
    /**
     * 装备强化
     */
    Protocol.EQUIP_STRENGTHEN = 16101;
    /**
     * 装备铸魂
     */
    Protocol.EQUIP_ZHUHUN = 16102;
    /**
     * 宝石镶嵌
     */
    Protocol.EQUIP_GEM = 16103;
    /**
     * 宝石卸下
     */
    Protocol.EQUIP_GEM_PICKOFF = 16104;
    /**
     * 宝石升级
     */
    Protocol.EQUIP_GEM_UPGRADE = 16105;
    /**
     * 装备熔炼
     */
    Protocol.EQUIP_RONGLIAN = 16106;
    /**
     * 一键装备
     */
    Protocol.EQUIP_ONEKEY = 16107;
    //````````````````````````排行榜start`````````````````````````````
    /**
     * 返回膜拜列表
     */
    Protocol.RANK_WORSHIP_LIST = 16700;
    /**
     * 膜拜
     */
    Protocol.RANK_WORSHIP = 16701;
    /**
     * 排行榜列表
     */
    Protocol.RANK_LIST = 16702;
    //````````````````````````排行榜end```````````````````````````````
    //````````````````````````掉落start`````````````````````````````
    /**
     * 返回掉落列表
     */
    Protocol.DROP_LIST = 16007;
    /**
     * 返回贵重掉落列表
     */
    Protocol.DROP_RARE_LIST = 16008;
    //````````````````````````掉落end```````````````````````````````
    //````````````````````````服饰start`````````````````````````````
    /**
     * 服饰初始化
     */
    Protocol.FASHION_INIT = 20300;
    /**
     * 服饰激活
     */
    Protocol.FASHION_ACTIVE = 20302;
    /**
     * 服饰使用或卸下
     */
    Protocol.FASHION_WEAR = 20304;
    /**
     * 服饰升星或增加时长
     */
    Protocol.FASHION_UP = 20306;
    /**
     * 服饰失效
     */
    Protocol.FASHION_TIMEOUT = 20307;
    //````````````````````````服饰end```````````````````````````````
    //````````````````````````日常start`````````````````````````````
    /**
     * 领取日常奖励
     */
    Protocol.DAILY_GET = 16900;
    /**
     * 领取日常阶段奖励
     */
    Protocol.DAILY_SCHEDULE_GET = 16901;
    //````````````````````````日常end```````````````````````````````
    //````````````````````````BOSS start`````````````````````````````
    /**
     * 进入BOSS地图
     */
    Protocol.BOSS_ENTER = 20400;
    /**
     * 退出BOSS地图
     */
    Protocol.BOSS_EXIT = 20401;
    /**
     * BOSS信息
     */
    Protocol.BOSS_INFOS = 20402;
    /**
     * 进入次数和恢复时间
     */
    Protocol.BOSS_ENTER_COUNT = 20403;
    /**
     * BOSS关注
     */
    Protocol.BOSS_ATTENTION = 20404;
    /**
     * BOSS刷新提示
     */
    Protocol.BOSS_NOTICE = 20405;
    /**
     * BOSS敌对玩家信息
     */
    Protocol.BOSS_ENEMY = 20406;
    /**
     * BOSS 伤害信息
     */
    Protocol.BOSS_HURT_RANK = 20407;
    /**
     * BOSS 结算
     */
    Protocol.BOSS_RESULT = 20408;
    //````````````````````````BOSS end```````````````````````````````
    //````````````````````````副本start`````````````````````````````
    /**
     * 副本信息
     */
    Protocol.COPY_INFOS = 13501;
    /**
     * 副本信息更新
     */
    Protocol.COPY_UPDATE = 13502;
    /**
     * 副本进入
     */
    Protocol.COPY_ENTER = 13503;
    /**
     * 副本退出
     */
    Protocol.COPY_EXTI = 13504;
    /**
     * 副本结算
     */
    Protocol.COPY_RESULT = 13505;
    /**
     * 副本挂机点
     */
    Protocol.COPY_HOOK_POS = 13506;
    /**
     * 取消副本挂机点
     */
    Protocol.COPY_HOOK_POS_CANCEL = 13512;
    /**
     * 副本排行
     */
    Protocol.COPY_RANK = 13507;
    /**
     * 副本结束时间
     */
    Protocol.COPY_END_TIME = 13508;
    /**
     * 副本扫荡
     */
    Protocol.COPY_SAO_DANG = 13509;
    /**
     * 副本倒计时
     */
    Protocol.COPY_COUNT_DOWN = 13510;
    /**
     * 副本通知后端刷怪，账号第一次进入副本特殊处理
     *  */
    Protocol.COPY_ASK_MONSTER = 13535;
    /**
     * 缥缈录警告提示
     */
    Protocol.COPY_WARNING_TIP = 13536;
    /**爬塔副本信息 */
    Protocol.TOWER_COPY_INFO = 13515;
    /**爬塔副本杀死怪物的时候通知取消挂机 */
    Protocol.TOWER_COPY_KILL_END = 13511;
    /**经验副本信息 */
    Protocol.COPY_EXP_INFO = 13516;
    /**经验副本购买次数 */
    Protocol.COPY_EXP_BUY_COUNT = 13517;
    /**经验副本鼓舞购买 */
    Protocol.COPY_EXP_INSPIRE = 13518;
    /**经验副本数据 */
    Protocol.COPY_EXP_DATA = 13519;
    /**副本波数 */
    Protocol.COPY_WAVE = 13520;
    /**经验副本击杀数更新 */
    Protocol.COPY_EXP_KILLS = 13521;
    /**经验副本经验更新 */
    Protocol.COPY_EXP_GAINS = 13522;
    /**经验副本结算 */
    Protocol.COPY_EXP_RESULT = 13523;
    /**银币副本冷却时间 */
    Protocol.COPY_SILVER_COOLING = 13524;
    /**银币副本小面板信息 */
    Protocol.COPY_SILVER_MINI = 13525;
    /**银币副本结束信息 */
    Protocol.COPY_SILVER_RESULT = 13526;
    /**银币副本buff时间 */
    Protocol.COPY_BUFF_UNLOCK = 13527;
    /**银币副本宝箱 */
    Protocol.COPY_SILVER_BOXES = 13528;
    //````````````````````````副本end```````````````````````````````
    //````````````````````````邮件start`````````````````````````````
    /**
     * 邮件列表
     */
    Protocol.MAIL_LIST = 15200;
    /**
     * 收到新邮件
     */
    Protocol.MAIL_RECEIVE = 15201;
    /**
     * 删除邮件
     */
    Protocol.MAIL_DELETE = 15202;
    /**
     * 阅读邮件
     */
    Protocol.MAIL_READ = 15203;
    /**
     * 收取附件
     */
    Protocol.MAIL_FETCH = 15204;
    /**
     * 一键领取附件
     */
    Protocol.MAIL_ALL_FETCH = 15205;
    //````````````````````````邮件end```````````````````````````````
    //````````````````````````好友start`````````````````````````````
    /**好友列表 */
    Protocol.FRIENDS_LIST = 15100;
    /**好友批量操作 */
    Protocol.FRIENDS_BATCH_OPERATE = 15109;
    /**好友搜索 */
    Protocol.FRIENDS_SEARCH = 15113;
    /**好友信息更新 */
    Protocol.FRIENDS_UPDATE_INFO = 15111;
    /**好友/黑名单添加 */
    Protocol.FRIENDS_ADD = 15102;
    /**好友/黑名单删除 */
    Protocol.FRIENDS_DELETE = 15112;
    /**换一批推荐好友 */
    Protocol.FRIENDS_SUGGEST_CHANGE = 15107;
    //````````````````````````好友end```````````````````````````````
    //````````````````````````任务start```````````````````````````````
    /**请求已接任务列表*/
    Protocol.CMD_TASK_LIST = 13000;
    /**更新已接任务, 或者增加已接任务*/
    Protocol.CMD_TASK_UPDATE = 13001;
    /**提交任务*/
    Protocol.CMD_TASK_COMMIT = 13002;
    /**请求已完成主线任务列表*/
    //public static CMD_TASK_MAIN_HISTORT:number = 13004;
    //````````````````````````任务end```````````````````````````````
    //````````````````````````战斗start```````````````````````````````
    /**人物攻击发出*/
    Protocol.BATTLE_UPDATE = 14000;
    /**宠物攻击发出*/
    Protocol.PET_ATTACK = 14010;
    /**中毒扣血通知*/
    Protocol.POISONING_NOTICE = 11023;
    /**人物死亡,攻击者的信息 */
    Protocol.REVIVE_INFO = 12020;
    /**人物请求复活*/
    Protocol.REVIVE_APPLY = 12021;
    /**人物复活更新位置血量*/
    Protocol.REVIVE_UPDATE = 12022;
    /**人物复活场景通知*/
    Protocol.REVIVE_NOTICE = 11086;
    //````````````````````````战斗end```````````````````````````````
    //````````````````````````个人竞技start```````````````````````````````
    Protocol.ARENA_MAX_RANK_AWARD = 20800; //个人竞技历史最高排行奖励
    Protocol.ARENA_PK_LOG = 20801; //个人竞技PK记录
    Protocol.ARENA_RANK_UPDATE = 20802; //个人竞技当前排行数据
    Protocol.ARENA_PK_SEND = 20803; //个人竞技发起挑战
    Protocol.ARENA_PK_RESULT_PLAYER = 20804; //个人竞技PK数据（玩家）
    Protocol.ARENA_PK_RESULT_ROBOT = 20805; //个人竞技PK数据（机器人）
    Protocol.ARENA_PK_COUNT = 20806; //个人竞技挑战次数数据
    Protocol.ARENA_EXIT = 20807; //退出个人竞技
    //````````````````````````个人竞技end```````````````````````````````
    //````````````````````````BUFF start```````````````````````````````
    /**玩家自己buff列表（登录时发送一次）*/
    Protocol.BUFF_SELF_LIST = 10400;
    /**玩家自己buff添加 */
    Protocol.BUFF_SELF_ADD = 10401;
    /**玩家自己buff移除 */
    Protocol.BUFF_SELF_REMOVE = 10402;
    /**除自己外的buff添加 */
    Protocol.BUFF_MAP_ADD = 10410;
    /**除自己外的buff移除 */
    Protocol.BUFF_MAP_REMOVE = 10411;
    //````````````````````````BUFF end```````````````````````````````
    //````````````````````````聊天start```````````````````````````````
    /**频道聊天*/
    Protocol.CHAT_CHANNEL_MSG = 20001;
    /**好友私聊*/
    Protocol.CHAT_PRIVATE_MSG = 20002;
    /**公告*/
    Protocol.CHAT_NOTICE = 20010;
    /**增加经验*/
    Protocol.EXP_ADD = 20011;
    /**击杀记录*/
    Protocol.KILL_RECORD = 20012;
    //````````````````````````聊天end```````````````````````````````
    //````````````````````````经脉start```````````````````````````````
    /**经脉信息请求*/
    Protocol.CMD_JINGMAI_QUEYT_INFO = 20100;
    /**经脉冲脉/突破*/
    Protocol.CMD_JINGMAI_LV_UP = 20101;
    //````````````````````````经脉end```````````````````````````````
    //````````````````````````技能start```````````````````````````````
    /**技能信息*/
    Protocol.SKILL_INFO = 11500;
    /**升级主动技能*/
    Protocol.SKILL_ACTIVE_UPGRADE = 11501;
    /**激活被动技能 */
    Protocol.SKILL_PASSIVE_ACT = 11502;
    /**一键升级技能 */
    Protocol.SKILL_ALL_UP = 11503;
    /**更改技能CD */
    Protocol.SKILL_CD_CHANGE = 11504;
    /**更新单个技能 */
    Protocol.SKILL_SINGLE_UPDATE = 11505;
    //````````````````````````技能end```````````````````````````````
    //````````````````````````商城start```````````````````````````````
    /**商城信息请求*/
    Protocol.CMD_SHOP_QUEYT = 12100;
    /**购买商品*/
    Protocol.CMD_SHOP_BUY = 12101;
    //````````````````````````商城end```````````````````````````````
    //````````````````````````称号start```````````````````````````````
    /**请求称号信息*/
    Protocol.TITLE_REQUEST = 16300;
    /**佩戴称号*/
    Protocol.TITLE_WEAR = 16302;
    /**卸下称号 */
    Protocol.TITLE_TAKE_OFF = 16304;
    /**激活称号 */
    Protocol.TITLE_ACTIVE = 16305;
    /**获得称号 */
    Protocol.TITLE_GAIN = 16306;
    /**删除称号 */
    Protocol.TITLE_DELETE = 16307;
    //````````````````````````称号end```````````````````````````````
    //````````````````````````披风start```````````````````````````````
    /**查询信息*/
    Protocol.CMD_CLOAK_QUEYT = 20701;
    /**披风激活*/
    Protocol.CMD_CLOAK_ACTIVATE = 20702;
    /**披风穿戴*/
    Protocol.CMD_CLOAK_WARE = 20703;
    /**披风升星*/
    Protocol.CMD_CLOAK_STAR = 20704;
    //````````````````````````披风end```````````````````````````````
    //````````````````````````改名start```````````````````````````````
    Protocol.CMD_ROLE_RENAME = 12032;
    //````````````````````````改名end```````````````````````````````
    //````````````````````````转生start```````````````````````````````
    /**转生信息*/
    Protocol.REIN_INFO = 19700;
    /**转生申请*/
    Protocol.REIN_APPLY = 19701;
    //````````````````````````转生end```````````````````````````````
    //````````````````````````宗门start```````````````````````````````
    /**宗门信息 */
    Protocol.CLUB_INFO = 15400;
    /**宗门数据每日更新 */
    Protocol.CLUB_DAILY_UPDATE = 15401;
    /**宗主数据更新 */
    Protocol.CLUB_CHIEF_UPDATE = 15402;
    /**宗门推荐请求 */
    Protocol.CLUB_RECOMMEND = 15411;
    /**申请加入宗门 */
    Protocol.CLUB_JOIN = 15412;
    /**修改公告 */
    Protocol.CLUB_ALTER = 15413;
    /**宗门成员列表 */
    Protocol.CLUB_MEMBERLIST = 15414;
    /**宗门职位福利 */
    Protocol.CLUB_SALARY = 15415;
    /**宗门捐献 */
    Protocol.CLUB_DONATE = 15416;
    /**晋升 */
    Protocol.CLUB_UPGRADE = 15417;
    //````````````````````````宗门end```````````````````````````````
    //````````````````````````盟会战start```````````````````````````````
    /**挑战玩家结算 */
    Protocol.CLUB_BF_1V1_RESULT = 19401;
    /**挑战BOSS结算 */
    Protocol.CLUB_BF_CHALLENGE_BOSS_RESULT = 19402;
    /**盟会战结算 */
    Protocol.CLUB_BF_RESULT = 19403;
    /**请求玩家数据 */
    Protocol.CLUB_BF_PLAYER_INFO = 19409;
    /**请求盟会战数据 */
    Protocol.CLUB_BF_INFO = 19410;
    /**请求盟会战力 */
    Protocol.CLUB_BF_POWERS = 19411;
    /**进入战场 */
    Protocol.CLUB_BF_ENTER = 19412;
    /**领取个人积分奖励 */
    Protocol.CLUB_BF_GET_REWARDS = 19413;
    /**清除挑战cd */
    Protocol.CLUB_BF_CLEAR_CD = 19414;
    /**请求挑战列表 */
    Protocol.CLUB_BF_LIST = 19415;
    /**挑战玩家 */
    Protocol.CLUB_BF_CHALLENGE_PLAYER = 19416;
    /**挑战boss */
    Protocol.CLUB_BF_CHALLENGE_BOSS = 19417;
    /**退出地图（挑战玩家/挑战boss/退出战场） */
    Protocol.CLUB_BF_EXIT = 19418;
    /**进入挑战区 */
    Protocol.CLUB_BF_ENTER_DOOR = 19419;
    /**购买盟会buff加成 */
    Protocol.CLUB_BF_BUY_BUFF = 19420;
    /**战场内数据 */
    Protocol.CLUB_BF_MINI_INFO = 19421;
    //````````````````````````盟会战end```````````````````````````````
    //````````````````````````预告start```````````````````````````````
    /**系统预告信息请求 */
    Protocol.CMD_SYSNOTICE_QUERY = 20500;
    /** 领取奖励 */
    Protocol.CMD_SYSNOTICE_REWARD = 20501;
    //````````````````````````预告end```````````````````````````````
    //````````````````````````宠物start```````````````````````````````
    /**宠物全部信息 */
    Protocol.PET_ALL_INFO = 20200;
    /**宠物进阶 */
    Protocol.PET_UPGRADE = 20201;
    /**宠物资质丹使用 */
    Protocol.PET_ZZD_USE = 20202;
    /**宠物悟性丹使用 */
    Protocol.PET_WXD_USE = 20203;
    /**宠物幻化 */
    Protocol.PET_HUANHUA = 20204;
    /**宠物技能升级 */
    Protocol.PET_SKILL_UPGRADE = 20205;
    /**通过道具使用获得的宠物外形 */
    Protocol.PET_ITEM_STYLE_LIST = 20206;
    //````````````````````````宠物end```````````````````````````````
    //````````````````````````兵魂start```````````````````````````````
    /**兵魂信息 */
    Protocol.SHENBING_INFO = 20601;
    /**兵魂激活 */
    Protocol.SHENBING_ACTIVATE = 20602;
    /**兵魂穿戴 */
    Protocol.SHENBING_PUTON = 20603;
    /**兵魂升星 */
    Protocol.SHENBING_UPGRADE_START = 20604;
    //````````````````````````兵魂end```````````````````````````````
    //````````````````````````vip start```````````````````````````````
    /**vip额度更新 */
    Protocol.VIP_EXP_UPDATE = 12401;
    /**VIP奖励更新 */
    Protocol.VIP_REWARDS_UPDATE = 12402;
    //````````````````````````vip end```````````````````````````````
    //````````````````````````活动图标 start```````````````````````````````
    /**活动状态更新 */
    Protocol.ACTIVITY_UPDATE = 15700;
    /**活动状态列表 */
    Protocol.ACTIVITY_LIST_UPDATE = 15701;
    /**活动结束前10秒 */
    Protocol.ACTIVITY_END = 15702;
    //````````````````````````活动图标 end```````````````````````````````
    //````````````````````````命格 start```````````````````````````````
    /**下次免费时间戳(秒 )*/
    Protocol.CMD_LIFEGRID_INFO = 19100;
    /**命格穿戴 */
    Protocol.CMD_LIFEGRID_WARE = 19111;
    /**命格升级 */
    Protocol.CMD_LIFEGRID_LEV_UP = 19112;
    /**命格分解 */
    Protocol.CMD_LIFEGRID_SEPARATE = 19113;
    /**猎命 */
    Protocol.CMD_LIFEGRID_HUNT = 19114;
    //````````````````````````命格 end```````````````````````````````
    //````````````````````````充值 start```````````````````````````````
    /**充值 */
    Protocol.CMD_SYSCHARGE_QUERY = 13635;
    /** 首充豪礼是否领奖 */
    Protocol.CMD_FIRSTCHARGE = 13636;
    //````````````````````````充值 end```````````````````````````````
    //````````````````````````套装 start```````````````````````````````
    /**套装信息 */
    Protocol.SUIT_INFO = 16108;
    /**套装升阶 */
    Protocol.SUIT_UPGRADE = 16109;
    /**套装拆解 */
    Protocol.SUIT_SPLIT = 16110;
    //````````````````````````套装 end```````````````````````````````
    //````````````````````````特权卡start```````````````````````````````
    /**特权卡信息请求 */
    Protocol.CMD_SYSPRIVILEGE_QUERY = 13638;
    /** 特权卡领取奖励 */
    Protocol.CMD_SYSPRIVILEGE_REWARD = 13637;
    /**特权卡体验 */
    Protocol.CMD_SYSPRIVILEGE_EXPERIENCE = 13601;
    //````````````````````````特权卡end```````````````````````````````
    //````````````````````````传功start```````````````````````````````
    /**传功活动开始 */
    Protocol.CMD_TRAINING_PUSH_INFO = 19200;
    /**传功状态数据 */
    Protocol.CMD_TRAINING_PUSH_STATUS = 19201;
    /**传功活动结束 */
    Protocol.CMD_TRAINING_PUSH_END = 19202;
    /**准备进行传功 */
    Protocol.CMD_TRAINING_PREPARE = 19211;
    /**传功进行确认 */
    Protocol.CMD_TRAINING_COMMIT = 19212;
    //````````````````````````传功end```````````````````````````````
    //````````````````````````投资start```````````````````````````````
    /**投资信息请求 */
    Protocol.CMD_SYSINVEST_QUERY = 13639;
    /** 投资领取奖励 */
    Protocol.CMD_SYSINVEST_REWARD = 13640;
    //```````````````````投资end```````````````````````````````
    //````````````````````````金蟾start```````````````````````````````
    /**金蟾查询 */
    Protocol.CMD_CASHCOW_QUERY = 13641;
    /** 金蟾领取奖励 */
    Protocol.CMD_CASHCOW_REWARD = 13642;
    //```````````````````金蟾end```````````````````````````````
    //```````````````````斗地主start```````````````````````````````
    /**玩家数据 */
    Protocol.CMD_LAIRD_INFO = 19300;
    /**身份数据 */
    Protocol.CMD_LAIRD_COOLY = 19301;
    /**新增记录数据 */
    Protocol.CMD_LAIRD_ADD_INTERACT_REC = 19302;
    /**主动请求返回 19300,19301 */
    Protocol.CMD_LAIRD_UPDATE = 19310;
    /**抓捕对象列表 */
    Protocol.CMD_LAIRD_CATCH = 19311;
    /**盟会成员列表 */
    Protocol.CMD_LAIRD_GUILD = 19312;
    /**互动 */
    Protocol.CMD_LAIRD_INTERACT = 19313;
    /**求救 */
    Protocol.CMD_LAIRD_SEEK_HELP = 19314;
    /**斗地主战斗 */
    Protocol.CMD_LAIRD_FIGHT = 19315;
    /**提取经验 */
    Protocol.CMD_LAIRD_PICK_EXP = 19316;
    /**请求记录数据 */
    Protocol.CMD_LAIRD_INTERACT_REC = 19317;
    /**退出地图 */
    Protocol.CMD_LAIRD_QUIT = 19318;
    /**释放苦工 */
    Protocol.CMD_LAIRD_FREE_PLAYER = 19319;
    /**更新记录状态 */
    Protocol.CMD_LAIRD_UPDATE_NOTE_STATUS = 19320;
    //```````````````````斗地主end```````````````````````````````
    //````````````````````````充值活动start```````````````````````````````
    /**充值活动查询 */
    Protocol.CMD_RECHARGEACTIVITY_QUERY = 13628;
    /** 充值活动领取奖励 */
    Protocol.CMD_RECHARGEACTIVITY_REWARD = 13629;
    //```````````````````充值活动end```````````````````````````````
    //````````````````````````冲级好礼start```````````````````````````````
    /**冲级好礼查询 */
    Protocol.CMD_LEVITEM_QUERY = 13630;
    /** 冲级好礼领取奖励 */
    Protocol.CMD_LEVITEM_REWARD = 13631;
    //```````````````````冲级好礼end```````````````````````````````
    //````````````````````````七天登陆start```````````````````````````````
    /**七天登陆查询 */
    Protocol.CMD_SEVENDAYS_QUERY = 13643;
    /** 七天登陆领取奖励 */
    Protocol.CMD_SEVENDAYS_REWARD = 13644;
    //```````````````````七天登陆end```````````````````````````````
    //````````````````````````珍希掉落start```````````````````````````````
    /**珍希掉落查询 */
    Protocol.CMD_RAREDROP_QUERY = 16009;
    //```````````````````珍希掉落end```````````````````````````````
    //````````````````````````盟主战start```````````````````````````````
    /**活动进行时信息 */
    Protocol.CMD_CLUB_LEADER_WAR_START_INFO = 20900;
    /**活动结束时信息 */
    Protocol.CMD_CLUB_LEADER_WAR_END_INFO = 20901;
    /**排行数据 */
    Protocol.CMD_CLUB_LEADER_WAR_RANK = 20902;
    /**匹配对手 */
    Protocol.CMD_CLUB_LEADER_WAR_MATCH = 20903;
    /**战斗对手数据 */
    Protocol.CMD_CLUB_LEADER_WAR_PLAY_INFO = 20904;
    /**购买次数 */
    Protocol.CMD_CLUB_LEADER_WAR_BUY_COUNT = 20905;
    /**退出地图 */
    Protocol.CMD_CLUB_LEADER_WAR_EXIT = 20906;
    /**任命 */
    Protocol.CMD_CLUB_LEADER_WAR_DESIGNATE = 20907;
    /**三大盟主信息 */
    Protocol.CMD_CLUB_LEADER_WAR_LEADER_INFO = 20908;
    /**膜拜 */
    Protocol.CMD_CLUB_LEADER_WAR_WORSHIP = 20910;
    //````````````````````````盟主战end```````````````````````````````
    //````````````````````````珍宝阁start```````````````````````````````
    /**珍宝阁查询 */
    Protocol.CMD_TREASUREGARRET_QUERY = 17200;
    /** 珍宝阁刷新 */
    Protocol.CMD_TREASUREGARRET_UPDATE = 17201;
    //```````````````````珍宝阁end```````````````````````````````
    //````````````````````````寻宝start```````````````````````````````
    /**寻宝查询 */
    Protocol.CMD_ARTIFACT_QUERY = 17500;
    /** 发送寻宝 */
    Protocol.CMD_ARTIFACT_HUNTING = 17501;
    /** 积分领奖 */
    Protocol.CMD_ARTIFACT_INTEGRAL_REWARD = 17502;
    /**寻宝纪录 */
    Protocol.CMD_ARTIFACT_LOG = 17503;
    //```````````````````寻宝end```````````````````````````````
    //````````````````````````绝学start```````````````````````````````
    /**绝学查询 */
    Protocol.CMD_JUEXUE_QUERY = 19501;
    /** 绝学升级 */
    Protocol.CMD_JUEXUE_UPGRADE = 19502;
    /** 境界升级 */
    Protocol.CMD_JUEXUE_AMBIT = 19503;
    //```````````````````绝学end```````````````````````````````
    //````````````````````````神器start```````````````````````````````
    /**神器查询 */
    Protocol.CMD_RELICSTUFF_QUERY = 19800;
    /**神器激活/ 碎片激活*/
    Protocol.CMD_RELICSTUFF_ACTIVITY = 19801;
    //````````````````````````神器end```````````````````````````````
    //````````````````````````天天返利start```````````````````````````````
    /**天天返利查询 */
    Protocol.CMD_DAILYREBATE_QUERY = 16200;
    /**天天返利领奖*/
    Protocol.CMD_DAILYREBATE_REWARD = 16201;
    //````````````````````````天天返利end```````````````````````````````
    /**新手剧情 */
    Protocol.ROOKIE_STORY = 13006;
    //````````````````````````缥缈录副本start```````````````````````````````
    /**缥缈录信息 */
    Protocol.MATERIAL_COPY_INFO = 13529;
    /**缥缈录奖励 */
    Protocol.MATERIAL_COPY_AWARD = 13530;
    /**生成采集宝箱 */
    Protocol.MATERIAL_COPY_MAKE_BOX = 13531;
    /**采集宝箱完成 */
    Protocol.MATERIAL_COPY_COLLECTION = 13532;
    /**副本所有信息更新 */
    Protocol.MATERIAL_COPY_ALL_INFO_UPDATE = 13533;
    /**副本信息更新 */
    Protocol.MATERIAL_COPY_INFO_UPDATE = 13534;
    //````````````````````````缥缈录副本end```````````````````````````````
    //````````````````````````分享start```````````````````````````````
    /**分享请求*/
    Protocol.CMD_SHARE_INFO = 13645;
    /**分享信息查询 */
    Protocol.CMD_SHARE_QUERY = 13646;
    /**分享领奖 */
    Protocol.CMD_SHARE_REWARD = 13647;
    //````````````````````````分享end```````````````````````````````
    /** 游戏公告 */
    Protocol.CMD_UPD_NOTICE = 13648;
    //````````````````````````冲榜竞技start```````````````````````````````
    /**冲榜竞技信息查询 */
    Protocol.CMD_SRVRANK_QUERY = 16703;
    /**冲榜竞技领奖 */
    Protocol.CMD_SRVRANK_REWARD = 16704;
    //````````````````````````冲榜竞技end```````````````````````````````
    //````````````````````````签到start```````````````````````````````
    /**签到信息请求*/
    Protocol.CMD_SIGH_INFO = 21100;
    /**日常签到/补签 */
    Protocol.CMD_DAILY_SIGN = 21101;
    /**签到阶段领奖 */
    Protocol.CMD_DAILY_AWARD = 21102;
    //````````````````````````签到end```````````````````````````````
    //````````````````````````火眼金睛start```````````````````````````````
    /**火眼金睛今日是否已参与*/
    Protocol.FIRE_EYE_HAS_JOIN = 21501;
    /**火眼金睛已匹配到玩家 */
    Protocol.FIRE_EYE_MATCH_SUCC = 21502;
    /**火眼金睛下一关数据 */
    Protocol.FIRE_EYE_NEXT = 21503;
    /**火眼金睛物品数据 */
    Protocol.FIRE_EYE_GOODS_DATA = 21504;
    /**火眼金睛玩家数据 */
    Protocol.FIRE_EYE_PLAYER_DATA = 21505;
    /**火眼金睛关结算数据 */
    Protocol.FIRE_EYE_LEVEL_RESULT = 21506;
    /**火眼金睛活动结算数据 */
    Protocol.FIRE_EYE_ACT_DATA = 21507;
    /**火眼金睛已领取的奖励数据 */
    Protocol.FIRE_EYE_HAS_FETCH = 21508;
    /**火眼金睛参与活动（进入匹配队列） */
    Protocol.FIRE_EYE_MATCH = 21511;
    /**火眼金睛请求对手数据 */
    Protocol.FIRE_EYE_ENEMY_DATA = 21512;
    /**火眼金睛领取奖励 */
    Protocol.FIRE_EYE_FETCH = 21513;
    /**火眼金睛选中物品 */
    Protocol.FIRE_EYE_SELECT = 21514;
    /**火眼金睛选中特殊物品 */
    Protocol.FIRE_EYE_SELECT_SPECIAL = 21515;
    //````````````````````````火眼金睛end```````````````````````````````
    /**世界等级 */
    Protocol.CMD_WORLD_LEVE = 12403;
    //````````````````````````聚元start```````````````````````````````
    /**聚元信息*/
    Protocol.CMD_GATHER_INFO = 16400;
    /**聚元、突破 */
    Protocol.CMD_PROGRESS = 16401;
    //````````````````````````聚元end``
    //````````````````````````魔神降临start```````````````````````````````
    /**魔神降临通知摇奖*/
    Protocol.DEVIL_NOTICE_ROLL = 21601;
    /**魔神降临摇奖数据 */
    Protocol.DEVIL_ROLL_INFO = 21602;
    /**魔神降临活动结算数据 */
    Protocol.DEVIL_ACT_RESULT = 21603;
    /**魔神降临活动摇奖奖励 */
    Protocol.DEVIL_ROLL_REWARDS = 21604;
    /**魔神降临数据 */
    Protocol.DEVIL_INFO = 21611;
    /**进入魔神降临地图 */
    Protocol.DEVIL_ENTER = 21612;
    /**退出魔神降临地图 */
    Protocol.DEVIL_EXIT = 21613;
    /**魔神降临请求抢夺列表 */
    Protocol.DEVIL_GRAB_LIST = 21614;
    /**魔神降临挑战玩家 */
    Protocol.DEVIL_CHALLENGE = 21615;
    /**魔神降临摇奖 */
    Protocol.DEVIL_ROLL_DICE = 21616;
    /**魔神降临请求排名列表 */
    Protocol.DEVIL_RANK_LIST = 21617;
    /**魔神降临退出1v1场景 */
    Protocol.DEVIL_EXIT_GRAB = 21618;
    //````````````````````````魔神降临end``
    //````````````````````````升星start```````````````````````````````
    /**升星*/
    Protocol.CMD_UP_STAR = 16111;
    //````````````````````````升星end``
    //````````````````````````市场start```````````````````````````````
    /**市场查询*/
    Protocol.CMD_ALL_MARKET = 11300;
    /** 请求摊位 */
    Protocol.CMD_REQ_MARKET = 11301;
    /** 上架 */
    Protocol.CMD_STUFF_AUCTION = 11302;
    /** 下架 */
    Protocol.CMD_CANCEL_AUCTION = 11303;
    /** 购买拍卖物品 */
    Protocol.CMD_BUY_AUCTION = 11304;
    /** 查询我的历史记录 */
    Protocol.CMD_REQ_LOG = 11305;
    /** 更新 */
    Protocol.CMD_UPD_MARKET_INFO = 11306;
    //````````````````````````市场end``
    //````````````````````````兑换活动start```````````````````````````````
    /**兑换活动 初始信息*/
    Protocol.CMD_EXCHANGE_INFO = 13611;
    /**兑换活动 兑换*/
    Protocol.CMD_EXCHANGE = 13612;
    return Protocol;
}());
//# sourceMappingURL=Protocol.js.map