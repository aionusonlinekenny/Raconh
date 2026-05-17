/**
 * 宗门Event
 * Simon
 * create 2017-12-16
 */
class ClubEvent extends BaseEvent
{
    //宗门信息
    public static UPDATE_CLUB_INFO:string = "UPDATE_CLUB_INFO";
    //宗门推荐加入信息更新
    public static UPDATE_CLUB_RECOMMEND:string = "UPDATE_CLUB_RECOMMEND";
    //宗门更新成员列表信息
    public static UPDATE_CLUB_MEMBERINFO_LIST:string = "UPDATE_CLUB_MEMBERINFO_LIST";
    //宗门更新贡献信息
    public static UPDATE_CLUB_DONATE:string = "UPDATE_CLUB_DONATE";
    //修改宗门公告
    public static UPDATE_CLUB_NOTICE:string = "UPDATE_CLUB_NOTICE";
    //修改宗门职位
    public static UPDATE_CLUB_CAREER:string = "UPDATE_CLUB_CAREER";
}