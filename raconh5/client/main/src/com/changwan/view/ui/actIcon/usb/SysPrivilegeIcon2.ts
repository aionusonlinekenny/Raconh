/**
 * 投资活动图标
 * pzx
* @update devil 2018-04-16
*/
class SysPrivilegeIcon2 extends ActBaseIcon2
{
    public constructor(imageContainer01:egret.DisplayObjectContainer,imageContainer:egret.DisplayObjectContainer,container1:egret.DisplayObjectContainer)
    {
        super(imageContainer01,imageContainer,container1);
    }

    protected addEvent():void
    {
        super.addEvent();
        Manager.model.getSysInvest().addEventListener(SysInvestEvent.SYSINVEST_UPDATE_EVENT,this.__drawRed,this);
        Manager.model.getSysPrivilege().addEventListener(SysPrivilegeEvent.SYSPRIVILEGE_UPDATE_EVENT,this.__drawRed,this);
    }

    protected removeEvent():void
    {
        Manager.model.getSysInvest().removeEventListener(SysInvestEvent.SYSINVEST_UPDATE_EVENT,this.__drawRed,this);
        Manager.model.getSysPrivilege().removeEventListener(SysPrivilegeEvent.SYSPRIVILEGE_UPDATE_EVENT,this.__drawRed,this);
        super.removeEvent();
    }

    protected hasRedIcon():boolean
    {
        let boo:boolean = Manager.model.getSysInvest().checkReward(SysInvestType.SYSINVEST_MONTH_TYPE)
        ||Manager.model.getSysInvest().checkReward(SysInvestType.SYSINVEST_EXTREME_TYPE)
        ||Manager.model.getSysPrivilege().checkReward();
        return boo;
    }
}