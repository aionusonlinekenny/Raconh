/**
 * 珍希掉落信息
 * pzx
 * create 2018.2.1
 */
class RareDropInfo
{
    /*玩家名*/
    public name:string;
    /** 掉落时间 */
    public time:number;
    /*怪物id*/
    public mon_id:number;
    
    public item:ItemsModelInfo = new ItemsModelInfo();
}