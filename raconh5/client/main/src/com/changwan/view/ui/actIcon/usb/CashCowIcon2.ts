/**
 * 福利活动图标
 * pzx
 * create 2018-3-7
 * @update  devil 2018-04-16
*/
class CashCowIcon2 extends ActBaseIcon2
{
    public constructor(imageContainer01:egret.DisplayObjectContainer,imageContainer:egret.DisplayObjectContainer,container1:egret.DisplayObjectContainer)
    {
        super(imageContainer01,imageContainer,container1);
    }

    protected addEvent():void
    {
        super.addEvent();
        Manager.model.getcashCow().addEventListener(CashCowEvent.CASHCOW_UPDATE_EVENT,this.__drawRed,this);
		Manager.model.getcashCow().sevenDaysModel.addEventListener(CashCowEvent.SEVENDAYS_REWARD_EVENT,this.__drawRed,this);
        Manager.model.getSysnotice().addEventListener(SysnoticeEvent.UPD_NOTICE_EVENT,this.__drawRed,this);
        Manager.model.getQiandao().addEventListener(QiandaoEvent.QIANDAO_INFO_UPDATE,this.__drawRed,this);
        Manager.model.getQiandao().addEventListener(QiandaoEvent.QIANDAO_SIGN_UPDATE,this.__drawRed,this);
    }

    protected removeEvent():void
    {
        Manager.model.getcashCow().removeEventListener(CashCowEvent.CASHCOW_UPDATE_EVENT,this.__drawRed,this);
		Manager.model.getcashCow().sevenDaysModel.removeEventListener(CashCowEvent.SEVENDAYS_REWARD_EVENT,this.__drawRed,this);
        Manager.model.getSysnotice().removeEventListener(SysnoticeEvent.UPD_NOTICE_EVENT,this.__drawRed,this);
        Manager.model.getQiandao().removeEventListener(QiandaoEvent.QIANDAO_INFO_UPDATE,this.__drawRed,this);
        Manager.model.getQiandao().removeEventListener(QiandaoEvent.QIANDAO_SIGN_UPDATE,this.__drawRed,this);
        super.removeEvent();
    }

    protected hasRedIcon():boolean
    {
        let boo:boolean = Manager.model.getcashCow().checkRewardCd()
        ||Manager.model.getcashCow().sevenDaysModel.checkSeverDaysReward()|| !UpdNoticCVO.cvo().isReward || Manager.model.getQiandao().getTodayCanGet();
        return boo;
    }
}