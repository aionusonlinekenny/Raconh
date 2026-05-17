/**
 * pzx
 * 18.1.11
 */
class SysPrivilegeModel extends egret.EventDispatcher
{
    private _datas:Array<SysPrivilegeInfo>;
    /**剩余体验的时间 0未激活，大于０为时间，－１已过时*/
    private _exp_Time:number = -1;
    public constructor()
    {
        super();
        this._datas = [];
		let data:SysPrivilegeInfo = new SysPrivilegeInfo();
		data.id = SysprivilegeType.GOLD_CARD;
		data.fightImg = "sysprivilege_fight5888";
		data.kaImg = "sysprivilege_huangjinka_png";
		data.activeImg = "sysprivilege_28_png";
		data.animationPath = "";
		//会变的
		data.item2_itemImg = "sysprivilege_item2_png";
		data.item2_titleImg = "sysprivilege_title2_png";
        data.rmb = 28;
		this._datas[0] = data;


		data = new SysPrivilegeInfo();
		data.id = SysprivilegeType.DIAMOND_CARD;
		data.fightImg = "sysprivilege_fight38888";
		data.kaImg = "sysprivilege_zuanshika_png";
		data.activeImg = "sysprivilege_188_png";
		data.animationPath = "";

		data.item2_itemImg = "sysprivilege_item_chongwu2_png";
		data.item2_titleImg = "sysprivilege_jueban_png";
        data.aniPath = "mochong7001";
        data.rmb = 188;
		this._datas[1] = data;
    }
    public getdata(value:number):SysPrivilegeInfo
    {
        return this._datas[value];
    }
    public getdata2(type:number):SysPrivilegeInfo
    {
        for(let i:number = 0; i < this._datas.length; i++)
        {
            if(this._datas[i].id == type) return this._datas[i];
        }
        return null;
    }
    /**
     * 服务端返回数据
     * @param id 特权id 已激活
     * @param 是否已领奖 1 已领
     */
    public updateData(id:number,reward:number):void
    {
        for(let info of this._datas)
        {
            if(info.id == id)
            {
                info.setActive();//有id就当激活
                info.setReward(reward);
            }
        }
        this.dispatchEvent(new SysPrivilegeEvent(SysPrivilegeEvent.SYSPRIVILEGE_UPDATE_EVENT));
    }
/** 检测是否有奖励 */
    public checkReward():boolean
    {
        for(let info of this._datas)
        {
            if(info.isActive)
            {
                if(!info.isreward)
                {
                    return true;
                }
            }
        }
        return false;
    }


    public expTime(value:number):void
    { 
        this._exp_Time = value;
        if(value>0)
        {
            Manager.render.add(this.startTimer,this,1000);
        }
    }
/**剩余体验的时间 0未激活，大于０为时间，－１已过时*/
    public getExpTime():number
    {
        return this._exp_Time;
    }
    public startTimer():void
    {
        if(this._exp_Time>0)
        {
            this._exp_Time--;
        }
        else
        {
            Manager.render.remove(this.startTimer,this);
            Manager.view.show(ViewID.Sysprivilege_ExperienceView,2);
        }
        this.dispatchEvent(new SysPrivilegeEvent(SysPrivilegeEvent.SYSPRIVILEGE_EXP_TIME_EVENT));
    }
  
}