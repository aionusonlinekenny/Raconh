/**
 * 协议号 
 */
class Protocol
{
    /**
     * 客户端日志
     */
    public static CLIENT_LOG:number = 12090;
    /**
     * 服务器时间
     */
    public static SYSTEM_SERVER_TIME:number = 10000;
    /**
     * 心跳包
     */
    public static GAME_HEARTBEAT:number = 10001;
    /**
     * 账号登录
     */
    public static GAME_LOGIN_REQUEST:number = 10010;
    /**
     * 角色列表
     */
    public static ROLE_LIST_REQUEST:number = 10011;
    /**
     * 随机名字
     */
    public static NICKNAME_RONDOM:number = 10012;
    /**
     * 创建角色
     */
    public static ROLE_CREATE:number = 10013;
    /**
     * 加载创角页面完成
     */
    public static ROLE_CREATE_STATISTICS:number = 10014;
    /**
     * 选择角色登录
     */
    public static ROLE_SELECT_LOGIN:number = 10015;
    /**
     * 踢下线
     */
    public static GAME_KICK_OFFLINE:number = 10016;
    /**
     * 游客/机器人登录请求
     */
    public static GUEST_LOGIN_REQUEST:number = 10020;
    /**
     * 聊天监控登录请求
     */
    public static CHAT_MONITOR_LOGIN:number = 10021;
    /**
     * GM命令列表
     */
    public static CMD_ADMIN_ALL:number = 10100;
    /**
     * 执行GM命令
     */
    public static CMD_ADMIN_REQUEST:number = 10101;
    /**
     * 地图进入
     */
    public static MAP_ENTER:number = 11000;
    /**
     * 地图加载完成通知服务端
     */
    public static MAP_LOAD_COMPLETE:number = 11001;
    /**
     * 地图添加玩家
     */
    public static MAP_PLAYER_ADD:number = 11010;
    /**
     * 地图玩家移除
     */
    public static MAP_PLAYER_REMOVE:number = 11011;
    /**
     * 地图添加怪物
     */
    public static MAP_MONSTER_ADD:number = 11012;
    /**
     * 地图怪物移除
     */
    public static MAP_MONSTER_REMOVE:number = 11013;
    /**
     * 地图怪物死亡
     */
    public static MAP_MONSTER_DEAD:number = 11014;
    /**
     * 更新地图参与者属性(32位整数)
     */
    public static MAP_ELEMENT_ATTR_UPDATE_32:number = 11017;
    /**
     * 更新地图参与者属性(64位整数)
     */
    public static MAP_ELEMENT_ATTR_UPDATE_64:number = 11018;
    /**
     * 更新地图参与者属性(字符串)
     */
    public static MAP_ELEMENT_ATTR_UPDATE_STR:number = 11019;
    /**
     * 人物广播移动路径
     */
    public static MAP_PLAYER_WALK:number = 11020;
    /**
     * 客户端发送同步位置到服务端
     */
    public static MAP_SELF_WALK_SYNC_POS:number = 11021;
    /**
     * 重置玩家位置
     */
    public static MAP_UPDATE_PLAYER_POS:number = 11022;
    /**
     * 广播怪物移动路径
     */
    public static MAP_MONSTER_WALK:number = 11030;
    /**
     * 人物基础信息，只登陆的时候发送一次
     */
    public static ROLE_BASE_INFO:number = 12000;
    /**
     * 服务端更新角色数据(数字32位)
     */
    public static ROLE_INFO_UPDATE_INT32:number = 12001;
    /**
     * 服务端更新角色数据(字符串)
     */
    public static ROLE_INFO_UPDATE_STR:number = 12002;
    /**
     * 服务端更新角色数据(数字64位)
     */
    public static ROLE_INFO_UPDATE_INT64:number = 12003;
    
    /**地图雕像 */
    public static MAP_STATUS_INFO:number = 11031;
//````````````````````````离线收益start```````````````````````````````
    /** 离线收益通知 */
    public static OFFLINE_PROFIT_NOTICE:number = 12023;
//````````````````````````离线收益end```````````````````````````````
    /**
     * 人物道具数据查询
     */
    public static GOODS_QUERY_INFO:number = 16000;
    /**
     * 刷新物品数据
     */
    public static CMD_UPDATE_ITEM_RETURN:number = 16001;
    /** 存储空间增加物品 */
    public static CMD_ADD_ITEM_RETURN:number = 16002;
    /** 删除物品通知 */
    public static CMD_DIELETE_ITEM_REUTNR:number = 16003;
    /** 删除物品 */
    public static CMD_DIELETE_ITEM:number = 16004;
    /** 使用背包物品 */
    public static CMD_USE_ITEM:number = 16005;
    /** 存储空间转移物品到另一个存储空间 */
    public static CMD_MOVE_ITEM:number =16006;

    /**
     * 装备强化信息
     */
    public static EQUIP_STRENGTHEN_INFO:number = 16100;
    /**
     * 装备强化
     */
    public static EQUIP_STRENGTHEN:number = 16101;
    /**
     * 装备铸魂
     */
    public static EQUIP_ZHUHUN:number = 16102;
    /**
     * 宝石镶嵌
     */
    public static EQUIP_GEM:number = 16103;
    /**
     * 宝石卸下
     */
    public static EQUIP_GEM_PICKOFF:number = 16104;
    /**
     * 宝石升级
     */
    public static EQUIP_GEM_UPGRADE:number = 16105;
    /**
     * 装备熔炼
     */
    public static EQUIP_RONGLIAN:number = 16106;
    /**
     * 一键装备
     */
    public static EQUIP_ONEKEY:number = 16107;

    
//````````````````````````排行榜start`````````````````````````````
    /**
     * 返回膜拜列表
     */
    public static RANK_WORSHIP_LIST:number = 16700;
    /**
     * 膜拜
     */
    public static RANK_WORSHIP:number = 16701;
    /**
     * 排行榜列表
     */
    public static RANK_LIST:number = 16702;
//````````````````````````排行榜end```````````````````````````````

    
//````````````````````````掉落start`````````````````````````````
    /**
     * 返回掉落列表
     */
    public static DROP_LIST:number = 16007;
    /**
     * 返回贵重掉落列表
     */
    public static DROP_RARE_LIST:number = 16008;
//````````````````````````掉落end```````````````````````````````


//````````````````````````服饰start`````````````````````````````
    /**
     * 服饰初始化
     */
    public static FASHION_INIT:number = 20300;
    /**
     * 服饰激活
     */
    public static FASHION_ACTIVE:number = 20302;
    /**
     * 服饰使用或卸下
     */
    public static FASHION_WEAR:number = 20304;
    /**
     * 服饰升星或增加时长
     */
    public static FASHION_UP:number = 20306;
    /**
     * 服饰失效
     */
    public static FASHION_TIMEOUT:number = 20307;
//````````````````````````服饰end```````````````````````````````


    
//````````````````````````日常start`````````````````````````````
    /**
     * 领取日常奖励
     */
    public static DAILY_GET:number = 16900;
    /**
     * 领取日常阶段奖励
     */
    public static DAILY_SCHEDULE_GET:number = 16901;
//````````````````````````日常end```````````````````````````````
    

//````````````````````````BOSS start`````````````````````````````
    /**
     * 进入BOSS地图
     */
    public static BOSS_ENTER:number = 20400;
    /**
     * 退出BOSS地图
     */
    public static BOSS_EXIT:number = 20401;
    /**
     * BOSS信息
     */
    public static BOSS_INFOS:number = 20402;
    /**
     * 进入次数和恢复时间
     */
    public static BOSS_ENTER_COUNT:number = 20403;
    /**
     * BOSS关注
     */
    public static BOSS_ATTENTION:number = 20404;
    /**
     * BOSS刷新提示
     */
    public static BOSS_NOTICE:number = 20405;
    /**
     * BOSS敌对玩家信息
     */
    public static BOSS_ENEMY:number = 20406;
    /**
     * BOSS 伤害信息
     */
    public static BOSS_HURT_RANK:number = 20407;
    /**
     * BOSS 结算
     */
    public static BOSS_RESULT:number = 20408;
//````````````````````````BOSS end```````````````````````````````

    
//````````````````````````副本start`````````````````````````````
    /**
     * 副本信息
     */
    public static COPY_INFOS:number = 13501;
    /**
     * 副本信息更新
     */
    public static COPY_UPDATE:number = 13502;
    /**
     * 副本进入
     */
    public static COPY_ENTER:number = 13503;
    /**
     * 副本退出
     */
    public static COPY_EXTI:number = 13504;
    /**
     * 副本结算
     */
    public static COPY_RESULT:number = 13505;
    /**
     * 副本挂机点
     */
    public static COPY_HOOK_POS:number = 13506;
    /**
     * 取消副本挂机点
     */
    public static COPY_HOOK_POS_CANCEL:number = 13512;

    /**
     * 副本排行
     */
    public static COPY_RANK:number = 13507;
    /**
     * 副本结束时间
     */
    public static COPY_END_TIME:number = 13508;
    /**
     * 副本扫荡
     */
    public static COPY_SAO_DANG:number = 13509;
    /**
     * 副本倒计时
     */
    public static COPY_COUNT_DOWN:number = 13510;
    /**
     * 副本通知后端刷怪，账号第一次进入副本特殊处理
     *  */
    public static COPY_ASK_MONSTER:number = 13535;
    /**
     * 缥缈录警告提示
     */
    public static COPY_WARNING_TIP:number = 13536;


    /**爬塔副本信息 */
    public static TOWER_COPY_INFO:number = 13515;
    /**爬塔副本杀死怪物的时候通知取消挂机 */
    public static TOWER_COPY_KILL_END:number = 13511;

    /**经验副本信息 */
    public static COPY_EXP_INFO:number = 13516;
    /**经验副本购买次数 */
    public static COPY_EXP_BUY_COUNT:number = 13517;
    /**经验副本鼓舞购买 */
    public static COPY_EXP_INSPIRE:number = 13518;
    /**经验副本数据 */
    public static COPY_EXP_DATA:number = 13519;
    /**副本波数 */
    public static COPY_WAVE:number = 13520;
    /**经验副本击杀数更新 */
    public static COPY_EXP_KILLS:number = 13521;
    /**经验副本经验更新 */
    public static COPY_EXP_GAINS:number = 13522;
    /**经验副本结算 */
    public static COPY_EXP_RESULT:number = 13523;
    
    /**银币副本冷却时间 */
    public static COPY_SILVER_COOLING:number = 13524;
    /**银币副本小面板信息 */
    public static COPY_SILVER_MINI:number = 13525;
    /**银币副本结束信息 */
    public static COPY_SILVER_RESULT:number = 13526;
    /**银币副本buff时间 */
    public static COPY_BUFF_UNLOCK:number = 13527;
    /**银币副本宝箱 */
    public static COPY_SILVER_BOXES:number = 13528;
//````````````````````````副本end```````````````````````````````


//````````````````````````邮件start`````````````````````````````
    /**
     * 邮件列表
     */
    public static MAIL_LIST:number = 15200;
    /**
     * 收到新邮件
     */
    public static MAIL_RECEIVE:number = 15201;
    /**
     * 删除邮件
     */
    public static MAIL_DELETE:number = 15202;
    /**
     * 阅读邮件
     */
    public static MAIL_READ:number = 15203;
    /**
     * 收取附件
     */
    public static MAIL_FETCH:number = 15204;
    /**
     * 一键领取附件
     */
    public static MAIL_ALL_FETCH:number = 15205;
//````````````````````````邮件end```````````````````````````````

//````````````````````````好友start`````````````````````````````
    /**好友列表 */
    public static FRIENDS_LIST:number = 15100;
    /**好友批量操作 */
    public static FRIENDS_BATCH_OPERATE:number = 15109;
    /**好友搜索 */
    public static FRIENDS_SEARCH:number = 15113;
    /**好友信息更新 */
    public static FRIENDS_UPDATE_INFO:number = 15111;
    /**好友/黑名单添加 */
    public static FRIENDS_ADD:number = 15102;
    /**好友/黑名单删除 */
    public static FRIENDS_DELETE:number = 15112;
    /**换一批推荐好友 */
    public static FRIENDS_SUGGEST_CHANGE:number = 15107;
//````````````````````````好友end```````````````````````````````

//````````````````````````任务start```````````````````````````````
    /**请求已接任务列表*/
    public static CMD_TASK_LIST:number = 13000;
    /**更新已接任务, 或者增加已接任务*/
    public static CMD_TASK_UPDATE:number = 13001;
    /**提交任务*/
    public static CMD_TASK_COMMIT:number = 13002;
    /**请求已完成主线任务列表*/
    //public static CMD_TASK_MAIN_HISTORT:number = 13004;
//````````````````````````任务end```````````````````````````````

//````````````````````````战斗start```````````````````````````````
    /**人物攻击发出*/
    public static BATTLE_UPDATE:number = 14000;
    /**宠物攻击发出*/
    public static PET_ATTACK:number = 14010;
    /**中毒扣血通知*/
    public static POISONING_NOTICE:number = 11023;
    /**人物死亡,攻击者的信息 */
    public static REVIVE_INFO:number = 12020;
    /**人物请求复活*/
    public static REVIVE_APPLY:number = 12021;
    /**人物复活更新位置血量*/
    public static REVIVE_UPDATE:number = 12022;
    /**人物复活场景通知*/
    public static REVIVE_NOTICE:number = 11086;
//````````````````````````战斗end```````````````````````````````

//````````````````````````个人竞技start```````````````````````````````
    public static ARENA_MAX_RANK_AWARD:number = 20800;//个人竞技历史最高排行奖励
    public static ARENA_PK_LOG:number = 20801;//个人竞技PK记录
    public static ARENA_RANK_UPDATE:number = 20802;//个人竞技当前排行数据
    public static ARENA_PK_SEND:number = 20803;//个人竞技发起挑战
    public static ARENA_PK_RESULT_PLAYER:number = 20804;//个人竞技PK数据（玩家）
    public static ARENA_PK_RESULT_ROBOT:number = 20805;//个人竞技PK数据（机器人）
    public static ARENA_PK_COUNT:number = 20806;//个人竞技挑战次数数据
    public static ARENA_EXIT:number = 20807;//退出个人竞技
//````````````````````````个人竞技end```````````````````````````````

//````````````````````````BUFF start```````````````````````````````
    /**玩家自己buff列表（登录时发送一次）*/
    public static BUFF_SELF_LIST:number = 10400;
    /**玩家自己buff添加 */
    public static BUFF_SELF_ADD:number = 10401;
    /**玩家自己buff移除 */
    public static BUFF_SELF_REMOVE:number = 10402;
    /**除自己外的buff添加 */
    public static BUFF_MAP_ADD:number = 10410;
    /**除自己外的buff移除 */
    public static BUFF_MAP_REMOVE:number = 10411;
//````````````````````````BUFF end```````````````````````````````

//````````````````````````聊天start```````````````````````````````
    /**频道聊天*/
    public static CHAT_CHANNEL_MSG:number = 20001;
    /**好友私聊*/
    public static CHAT_PRIVATE_MSG:number = 20002;
    /**公告*/
    public static CHAT_NOTICE:number = 20010;
    /**增加经验*/
    public static EXP_ADD:number = 20011;
    /**击杀记录*/
    public static KILL_RECORD:number = 20012;
//````````````````````````聊天end```````````````````````````````
//````````````````````````经脉start```````````````````````````````
    /**经脉信息请求*/
    public static CMD_JINGMAI_QUEYT_INFO:number = 20100;
    /**经脉冲脉/突破*/
    public static CMD_JINGMAI_LV_UP:number = 20101;
  
//````````````````````````经脉end```````````````````````````````
//````````````````````````技能start```````````````````````````````
    /**技能信息*/
    public static SKILL_INFO:number = 11500;
    /**升级主动技能*/
    public static SKILL_ACTIVE_UPGRADE:number = 11501;
    /**激活被动技能 */
    public static SKILL_PASSIVE_ACT:number = 11502;
    /**一键升级技能 */
    public static SKILL_ALL_UP:number = 11503;
    /**更改技能CD */
    public static SKILL_CD_CHANGE:number = 11504;
    /**更新单个技能 */
    public static SKILL_SINGLE_UPDATE:number = 11505;
  
//````````````````````````技能end```````````````````````````````
//````````````````````````商城start```````````````````````````````
    /**商城信息请求*/
    public static CMD_SHOP_QUEYT:number = 12100;
    /**购买商品*/
    public static CMD_SHOP_BUY:number = 12101;
  
//````````````````````````商城end```````````````````````````````
//````````````````````````称号start```````````````````````````````
    /**请求称号信息*/
    public static TITLE_REQUEST:number = 16300;
    /**佩戴称号*/
    public static TITLE_WEAR:number = 16302;
    /**卸下称号 */
    public static TITLE_TAKE_OFF:number = 16304;
    /**激活称号 */
    public static TITLE_ACTIVE:number = 16305;
    /**获得称号 */
    public static TITLE_GAIN:number = 16306;
    /**删除称号 */
    public static TITLE_DELETE:number = 16307;
//````````````````````````称号end```````````````````````````````
//````````````````````````披风start```````````````````````````````
    /**查询信息*/
    public static CMD_CLOAK_QUEYT:number = 20701;
    /**披风激活*/
    public static CMD_CLOAK_ACTIVATE:number = 20702;
     /**披风穿戴*/
    public static CMD_CLOAK_WARE:number = 20703;
    /**披风升星*/
    public static CMD_CLOAK_STAR:number = 20704;
  
//````````````````````````披风end```````````````````````````````
//````````````````````````改名start```````````````````````````````
    public static CMD_ROLE_RENAME:number = 12032;
//````````````````````````改名end```````````````````````````````

//````````````````````````转生start```````````````````````````````
    /**转生信息*/
    public static REIN_INFO:number = 19700;
    /**转生申请*/
    public static REIN_APPLY:number = 19701;
//````````````````````````转生end```````````````````````````````

//````````````````````````宗门start```````````````````````````````
    /**宗门信息 */
    public static CLUB_INFO:number = 15400;
    /**宗门数据每日更新 */
    public static CLUB_DAILY_UPDATE:number = 15401;
    /**宗主数据更新 */
    public static CLUB_CHIEF_UPDATE:number = 15402;
    /**宗门推荐请求 */
    public static CLUB_RECOMMEND:number = 15411;
    /**申请加入宗门 */
    public static CLUB_JOIN:number = 15412;
    /**修改公告 */
    public static CLUB_ALTER:number = 15413;
    /**宗门成员列表 */
    public static CLUB_MEMBERLIST:number = 15414;
    /**宗门职位福利 */
    public static CLUB_SALARY:number = 15415;
    /**宗门捐献 */
    public static CLUB_DONATE:number = 15416;
    /**晋升 */
    public static CLUB_UPGRADE:number = 15417;

//````````````````````````宗门end```````````````````````````````

//````````````````````````盟会战start```````````````````````````````
    /**挑战玩家结算 */
    public static CLUB_BF_1V1_RESULT:number = 19401;
    /**挑战BOSS结算 */
    public static CLUB_BF_CHALLENGE_BOSS_RESULT:number = 19402;
    /**盟会战结算 */
    public static CLUB_BF_RESULT:number = 19403;
    /**请求玩家数据 */
    public static CLUB_BF_PLAYER_INFO:number = 19409;
    /**请求盟会战数据 */
    public static CLUB_BF_INFO:number = 19410;
    /**请求盟会战力 */
    public static CLUB_BF_POWERS:number = 19411;
    /**进入战场 */
    public static CLUB_BF_ENTER:number = 19412;
    /**领取个人积分奖励 */
    public static CLUB_BF_GET_REWARDS:number = 19413;
    /**清除挑战cd */
    public static CLUB_BF_CLEAR_CD:number = 19414;
    /**请求挑战列表 */
    public static CLUB_BF_LIST:number = 19415;
    /**挑战玩家 */
    public static CLUB_BF_CHALLENGE_PLAYER:number = 19416;
    /**挑战boss */
    public static CLUB_BF_CHALLENGE_BOSS:number = 19417;
    /**退出地图（挑战玩家/挑战boss/退出战场） */
    public static CLUB_BF_EXIT:number = 19418;
    /**进入挑战区 */
    public static CLUB_BF_ENTER_DOOR:number = 19419;
    /**购买盟会buff加成 */
    public static CLUB_BF_BUY_BUFF:number = 19420;
    /**战场内数据 */
    public static CLUB_BF_MINI_INFO:number = 19421;
//````````````````````````盟会战end```````````````````````````````



//````````````````````````预告start```````````````````````````````
    /**系统预告信息请求 */
    public static CMD_SYSNOTICE_QUERY:number = 20500;
    /** 领取奖励 */
    public static CMD_SYSNOTICE_REWARD:number = 20501
//````````````````````````预告end```````````````````````````````

//````````````````````````宠物start```````````````````````````````
    /**宠物全部信息 */
    public static PET_ALL_INFO:number = 20200;
    /**宠物进阶 */
    public static PET_UPGRADE:number = 20201;
    /**宠物资质丹使用 */
    public static PET_ZZD_USE:number = 20202;
    /**宠物悟性丹使用 */
    public static PET_WXD_USE:number = 20203;
    /**宠物幻化 */
    public static PET_HUANHUA:number = 20204;
    /**宠物技能升级 */
    public static PET_SKILL_UPGRADE:number = 20205;
    /**通过道具使用获得的宠物外形 */
    public static PET_ITEM_STYLE_LIST:number = 20206;
//````````````````````````宠物end```````````````````````````````

//````````````````````````兵魂start```````````````````````````````
    /**兵魂信息 */
    public static SHENBING_INFO:number = 20601;
    /**兵魂激活 */
    public static SHENBING_ACTIVATE:number = 20602;
    /**兵魂穿戴 */
    public static SHENBING_PUTON:number = 20603;
    /**兵魂升星 */
    public static SHENBING_UPGRADE_START:number = 20604;
//````````````````````````兵魂end```````````````````````````````

//````````````````````````vip start```````````````````````````````
    /**vip额度更新 */
    public static VIP_EXP_UPDATE:number = 12401;
    /**VIP奖励更新 */
    public static VIP_REWARDS_UPDATE:number = 12402;
//````````````````````````vip end```````````````````````````````

//````````````````````````活动图标 start```````````````````````````````
    /**活动状态更新 */
    public static ACTIVITY_UPDATE:number = 15700;
    /**活动状态列表 */
    public static ACTIVITY_LIST_UPDATE:number = 15701;
    /**活动结束前10秒 */
    public static ACTIVITY_END:number = 15702;
//````````````````````````活动图标 end```````````````````````````````
//````````````````````````命格 start```````````````````````````````
    /**下次免费时间戳(秒 )*/
    public static CMD_LIFEGRID_INFO:number = 19100;
    /**命格穿戴 */
    public static CMD_LIFEGRID_WARE:number = 19111;
    /**命格升级 */
    public static CMD_LIFEGRID_LEV_UP:number = 19112;
    /**命格分解 */
    public static CMD_LIFEGRID_SEPARATE:number = 19113;
    /**猎命 */
    public static CMD_LIFEGRID_HUNT:number = 19114;
//````````````````````````命格 end```````````````````````````````
//````````````````````````充值 start```````````````````````````````
    /**充值 */
    public static CMD_SYSCHARGE_QUERY:number = 13635;
    /** 首充豪礼是否领奖 */
    public static CMD_FIRSTCHARGE:number = 13636;
//````````````````````````充值 end```````````````````````````````

//````````````````````````套装 start```````````````````````````````
    /**套装信息 */
    public static SUIT_INFO:number = 16108;
    /**套装升阶 */
    public static SUIT_UPGRADE:number = 16109;
    /**套装拆解 */
    public static SUIT_SPLIT:number = 16110;
//````````````````````````套装 end```````````````````````````````
//````````````````````````特权卡start```````````````````````````````
    /**特权卡信息请求 */
    public static CMD_SYSPRIVILEGE_QUERY:number = 13638;
    /** 特权卡领取奖励 */
    public static CMD_SYSPRIVILEGE_REWARD:number = 13637;
    /**特权卡体验 */
    public static CMD_SYSPRIVILEGE_EXPERIENCE:number = 13601;
//````````````````````````特权卡end```````````````````````````````

//````````````````````````传功start```````````````````````````````
    /**传功活动开始 */
    public static CMD_TRAINING_PUSH_INFO:number = 19200;
    /**传功状态数据 */
    public static CMD_TRAINING_PUSH_STATUS:number = 19201;
    /**传功活动结束 */
    public static CMD_TRAINING_PUSH_END:number = 19202;
    /**准备进行传功 */
    public static CMD_TRAINING_PREPARE:number = 19211;
    /**传功进行确认 */
    public static CMD_TRAINING_COMMIT:number = 19212;
//````````````````````````传功end```````````````````````````````
//````````````````````````投资start```````````````````````````````
    /**投资信息请求 */
    public static CMD_SYSINVEST_QUERY:number = 13639;
    /** 投资领取奖励 */
    public static CMD_SYSINVEST_REWARD:number = 13640;
//```````````````````投资end```````````````````````````````
//````````````````````````金蟾start```````````````````````````````
    /**金蟾查询 */
    public static CMD_CASHCOW_QUERY:number = 13641;
    /** 金蟾领取奖励 */
    public static CMD_CASHCOW_REWARD:number = 13642;
//```````````````````金蟾end```````````````````````````````
//```````````````````斗地主start```````````````````````````````
    /**玩家数据 */
    public static CMD_LAIRD_INFO:number = 19300;
    /**身份数据 */
    public static CMD_LAIRD_COOLY:number = 19301;
    /**新增记录数据 */
    public static CMD_LAIRD_ADD_INTERACT_REC:number = 19302;
    /**主动请求返回 19300,19301 */
    public static CMD_LAIRD_UPDATE:number = 19310;
    /**抓捕对象列表 */
    public static CMD_LAIRD_CATCH:number = 19311;
    /**盟会成员列表 */
    public static CMD_LAIRD_GUILD:number = 19312;
    /**互动 */
    public static CMD_LAIRD_INTERACT:number = 19313;
    /**求救 */
    public static CMD_LAIRD_SEEK_HELP:number = 19314;
    /**斗地主战斗 */
    public static CMD_LAIRD_FIGHT:number = 19315;
    /**提取经验 */
    public static CMD_LAIRD_PICK_EXP:number = 19316;
    /**请求记录数据 */
    public static CMD_LAIRD_INTERACT_REC:number = 19317;
    /**退出地图 */
    public static CMD_LAIRD_QUIT:number = 19318;
    /**释放苦工 */
    public static CMD_LAIRD_FREE_PLAYER:number = 19319;
    /**更新记录状态 */
    public static CMD_LAIRD_UPDATE_NOTE_STATUS:number = 19320;
//```````````````````斗地主end```````````````````````````````
//````````````````````````充值活动start```````````````````````````````
    /**充值活动查询 */
    public static CMD_RECHARGEACTIVITY_QUERY:number = 13628;
    /** 充值活动领取奖励 */
    public static CMD_RECHARGEACTIVITY_REWARD:number = 13629;
//```````````````````充值活动end```````````````````````````````

//````````````````````````冲级好礼start```````````````````````````````
    /**冲级好礼查询 */
    public static CMD_LEVITEM_QUERY:number = 13630;
    /** 冲级好礼领取奖励 */
    public static CMD_LEVITEM_REWARD:number = 13631;
//```````````````````冲级好礼end```````````````````````````````
//````````````````````````七天登陆start```````````````````````````````
    /**七天登陆查询 */
    public static CMD_SEVENDAYS_QUERY:number = 13643;
    /** 七天登陆领取奖励 */
    public static CMD_SEVENDAYS_REWARD:number = 13644;
//```````````````````七天登陆end```````````````````````````````
//````````````````````````珍希掉落start```````````````````````````````
    /**珍希掉落查询 */
    public static CMD_RAREDROP_QUERY:number = 16009;
//```````````````````珍希掉落end```````````````````````````````

//````````````````````````盟主战start```````````````````````````````
    /**活动进行时信息 */
    public static CMD_CLUB_LEADER_WAR_START_INFO:number = 20900;
    /**活动结束时信息 */
    public static CMD_CLUB_LEADER_WAR_END_INFO:number = 20901;
    /**排行数据 */
    public static CMD_CLUB_LEADER_WAR_RANK:number = 20902;
    /**匹配对手 */
    public static CMD_CLUB_LEADER_WAR_MATCH:number = 20903;
    /**战斗对手数据 */
    public static CMD_CLUB_LEADER_WAR_PLAY_INFO:number = 20904;
    /**购买次数 */
    public static CMD_CLUB_LEADER_WAR_BUY_COUNT:number = 20905;
    /**退出地图 */
    public static CMD_CLUB_LEADER_WAR_EXIT:number = 20906;
    /**任命 */
    public static CMD_CLUB_LEADER_WAR_DESIGNATE:number = 20907;
    /**三大盟主信息 */
    public static CMD_CLUB_LEADER_WAR_LEADER_INFO:number = 20908;
    /**膜拜 */
    public static CMD_CLUB_LEADER_WAR_WORSHIP:number = 20910;
//````````````````````````盟主战end```````````````````````````````
//````````````````````````珍宝阁start```````````````````````````````
    /**珍宝阁查询 */
    public static CMD_TREASUREGARRET_QUERY:number = 17200;
    /** 珍宝阁刷新 */
    public static CMD_TREASUREGARRET_UPDATE:number = 17201;
//```````````````````珍宝阁end```````````````````````````````
//````````````````````````寻宝start```````````````````````````````
    /**寻宝查询 */
    public static CMD_ARTIFACT_QUERY:number = 17500;
    /** 发送寻宝 */
    public static CMD_ARTIFACT_HUNTING:number = 17501;
/** 积分领奖 */
    public static CMD_ARTIFACT_INTEGRAL_REWARD:number = 17502;
/**寻宝纪录 */
    public static CMD_ARTIFACT_LOG:number = 17503;
//```````````````````寻宝end```````````````````````````````
//````````````````````````绝学start```````````````````````````````
    /**绝学查询 */
    public static CMD_JUEXUE_QUERY:number = 19501;
    /** 绝学升级 */
    public static CMD_JUEXUE_UPGRADE:number = 19502;
/** 境界升级 */
    public static CMD_JUEXUE_AMBIT:number = 19503;
//```````````````````绝学end```````````````````````````````
//````````````````````````神器start```````````````````````````````
    /**神器查询 */
    public static CMD_RELICSTUFF_QUERY:number = 19800;
    /**神器激活/ 碎片激活*/
    public static CMD_RELICSTUFF_ACTIVITY:number = 19801;
//````````````````````````神器end```````````````````````````````
//````````````````````````天天返利start```````````````````````````````
    /**天天返利查询 */
    public static CMD_DAILYREBATE_QUERY:number = 16200;
    /**天天返利领奖*/
    public static CMD_DAILYREBATE_REWARD:number = 16201;
//````````````````````````天天返利end```````````````````````````````
    /**新手剧情 */
    public static ROOKIE_STORY:number = 13006;
//````````````````````````缥缈录副本start```````````````````````````````
    /**缥缈录信息 */
    public static MATERIAL_COPY_INFO:number = 13529;
    /**缥缈录奖励 */
    public static MATERIAL_COPY_AWARD:number = 13530;
    /**生成采集宝箱 */
    public static MATERIAL_COPY_MAKE_BOX:number = 13531;
    /**采集宝箱完成 */
    public static MATERIAL_COPY_COLLECTION:number = 13532;
    /**副本所有信息更新 */
    public static MATERIAL_COPY_ALL_INFO_UPDATE:number = 13533;
    /**副本信息更新 */
    public static MATERIAL_COPY_INFO_UPDATE:number = 13534;
//````````````````````````缥缈录副本end```````````````````````````````

//````````````````````````分享start```````````````````````````````
    /**分享请求*/
    public static CMD_SHARE_INFO:number = 13645;
    /**分享信息查询 */
    public static CMD_SHARE_QUERY:number = 13646;
     /**分享领奖 */
    public static CMD_SHARE_REWARD:number = 13647;
//````````````````````````分享end```````````````````````````````
    /** 游戏公告 */
    public static CMD_UPD_NOTICE:number = 13648;

//````````````````````````冲榜竞技start```````````````````````````````
    /**冲榜竞技信息查询 */
    public static CMD_SRVRANK_QUERY:number = 16703;
     /**冲榜竞技领奖 */
    public static CMD_SRVRANK_REWARD:number = 16704;
//````````````````````````冲榜竞技end```````````````````````````````
//````````````````````````签到start```````````````````````````````
    /**签到信息请求*/
    public static CMD_SIGH_INFO:number = 21100;
    /**日常签到/补签 */
    public static CMD_DAILY_SIGN:number = 21101;
     /**签到阶段领奖 */
    public static CMD_DAILY_AWARD:number = 21102;
//````````````````````````签到end```````````````````````````````
//````````````````````````火眼金睛start```````````````````````````````
    /**火眼金睛今日是否已参与*/
    public static FIRE_EYE_HAS_JOIN:number = 21501;
    /**火眼金睛已匹配到玩家 */
    public static FIRE_EYE_MATCH_SUCC:number = 21502;
    /**火眼金睛下一关数据 */
    public static FIRE_EYE_NEXT:number = 21503;
    /**火眼金睛物品数据 */
    public static FIRE_EYE_GOODS_DATA:number = 21504;
    /**火眼金睛玩家数据 */
    public static FIRE_EYE_PLAYER_DATA:number = 21505;
    /**火眼金睛关结算数据 */
    public static FIRE_EYE_LEVEL_RESULT:number = 21506;
    /**火眼金睛活动结算数据 */
    public static FIRE_EYE_ACT_DATA:number = 21507;
    /**火眼金睛已领取的奖励数据 */
    public static FIRE_EYE_HAS_FETCH:number = 21508;
    /**火眼金睛参与活动（进入匹配队列） */
    public static FIRE_EYE_MATCH:number = 21511;
    /**火眼金睛请求对手数据 */
    public static FIRE_EYE_ENEMY_DATA:number = 21512;
    /**火眼金睛领取奖励 */
    public static FIRE_EYE_FETCH:number = 21513;
    /**火眼金睛选中物品 */
    public static FIRE_EYE_SELECT:number = 21514;
    /**火眼金睛选中特殊物品 */
    public static FIRE_EYE_SELECT_SPECIAL:number = 21515;
//````````````````````````火眼金睛end```````````````````````````````

    /**世界等级 */
    public static CMD_WORLD_LEVE:number = 12403;
//````````````````````````聚元start```````````````````````````````
    /**聚元信息*/
    public static CMD_GATHER_INFO:number = 16400;
    /**聚元、突破 */
    public static CMD_PROGRESS:number = 16401;
//````````````````````````聚元end``
//````````````````````````魔神降临start```````````````````````````````
    /**魔神降临通知摇奖*/
    public static DEVIL_NOTICE_ROLL:number = 21601;
    /**魔神降临摇奖数据 */
    public static DEVIL_ROLL_INFO:number = 21602;
    /**魔神降临活动结算数据 */
    public static DEVIL_ACT_RESULT:number = 21603;
    /**魔神降临活动摇奖奖励 */
    public static DEVIL_ROLL_REWARDS:number = 21604;
    /**魔神降临数据 */
    public static DEVIL_INFO:number = 21611;
    /**进入魔神降临地图 */
    public static DEVIL_ENTER:number = 21612;
    /**退出魔神降临地图 */
    public static DEVIL_EXIT:number = 21613;
    /**魔神降临请求抢夺列表 */
    public static DEVIL_GRAB_LIST:number = 21614;
    /**魔神降临挑战玩家 */
    public static DEVIL_CHALLENGE:number = 21615;
    /**魔神降临摇奖 */
    public static DEVIL_ROLL_DICE:number = 21616;
    /**魔神降临请求排名列表 */
    public static DEVIL_RANK_LIST:number = 21617;
    /**魔神降临退出1v1场景 */
    public static DEVIL_EXIT_GRAB:number = 21618;
//````````````````````````魔神降临end``
//````````````````````````升星start```````````````````````````````
    /**升星*/
    public static CMD_UP_STAR:number = 16111;
//````````````````````````升星end``

//````````````````````````市场start```````````````````````````````
    /**市场查询*/
    public static CMD_ALL_MARKET:number = 11300;
    /** 请求摊位 */
    public static CMD_REQ_MARKET:number = 11301;
     /** 上架 */
    public static CMD_STUFF_AUCTION:number = 11302;
     /** 下架 */
    public static CMD_CANCEL_AUCTION:number = 11303;
    /** 购买拍卖物品 */
    public static CMD_BUY_AUCTION:number = 11304;
    /** 查询我的历史记录 */
    public static CMD_REQ_LOG:number = 11305;
    /** 更新 */
    public static CMD_UPD_MARKET_INFO:number = 11306;

//````````````````````````市场end``
//````````````````````````兑换活动start```````````````````````````````
    /**兑换活动 初始信息*/
    public static CMD_EXCHANGE_INFO:number = 13611;
    /**兑换活动 兑换*/
    public static CMD_EXCHANGE:number = 13612;

//````````````````````````兑换活动end``
}