var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 所有地图相关的静态值
 * luzhihong
 * create 2017-11-01
 */
var MapConst = (function () {
    function MapConst() {
    }
    /*地图id*/
    MapConst.ID_HOME = 2000; //主城
    MapConst.ID_CLUB_BF = 4002; //盟会战地图id
    MapConst.ID_CLUB_BF_BOSS = 4003; //盟会战boss地图id
    MapConst.ID_CLUB_BF_1V1 = 4004; //盟会战1v1地图id
    MapConst.ID_ROOKIE_STORY = 3005; //新手剧情地图id
    MapConst.ID_ROOKIE_STORY_II = 3006; //新手剧情地图id
    /*地图类型*/
    MapConst.TYPE_FIELD = 1; //野外地图
    MapConst.TYPE_COPY = 2; //副本地图
    MapConst.TYPE_BOSS = 3; //BOSS地图
    MapConst.TYPE_MAIN = 4; //主城地图
    MapConst.TYPE_PK = 5; //野外PK
    MapConst.TYPE_ARENA = 6; //个人竞技
    MapConst.TYPE_GUILD = 7; //宗门地图
    MapConst.TYPE_CLUB_BF = 11; //盟会战准备地图
    /*界面隐藏类型*/
    MapConst.HIDE_MAP = "1"; //隐藏右上角地图
    MapConst.HIDE_ICONS = "2"; //隐藏图标
    MapConst.HIDE_RIGHT = "3"; //隐藏右边按钮
    MapConst.HIDE_PRE = "4"; //隐藏预告
    MapConst.HIDE_TASK = "5"; //隐藏任务
    MapConst.HIDE_EXIT = "6"; //隐藏退出按钮
    MapConst.HIDE_HEAD = "7"; //隐藏人物头像
    MapConst.HIDE_CHAT = "8"; //隐藏聊天栏（包括邮件和好友）
    return MapConst;
}());
__reflect(MapConst.prototype, "MapConst");
//# sourceMappingURL=MapConst.js.map