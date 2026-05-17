/**
 * 好友聊天信息
 * liangyan
 * create 2017-11-03
*/
class FriendsChatInfo
{
    /**发送者名称 */
    public fromName:string;
    /**发送者角色ID */
    private _fromID:number;
    public get fromID():number {return this._fromID;}
    public set fromID(v:number)
    {
        this._fromID = v;
        this._isSelf = (this._fromID == Manager.model.self.id);
    }
    /**发送者职业 */
    public fromCareer:number;
    /**发送者vip等级 */
    public fromVip:number;
    /**目标角色名称 */
    public targetName:string;
    /**目标角色ID */
    public targetID:number;
    /**目标角色职业 */
    public targetCareer:number;
    /**目标角色vip等级 */
    public targetVip:number;
    /**玩家类型 (0:普通玩家 1:GM 2:指导员) */
    public type:number;
    /**聊天内容 */
    public content:string;
    /**转生 */
    public zhuansheng:number;
    /**等级 */
    public level:number;
    /**头像id */
    public headID:number;
    /**帮派名字 */
    public corpsName:string;
    /**是否自动回复 */
    public isAuto:boolean;
    /**发送者平台数据 */
    public platDatas:Array<Object>;
    /**发送时间 */
    public time:number;
    /**发送者是否为自己 */
    private _isSelf:boolean;
    public get isSelf():boolean
    {
        return this._isSelf;
    }
    /** */
    public hasDraw:boolean = false;
}