/**
 * 
 * pzx
 * create 2018-3-16
 * 分享
 * 
*/
class ShareModel extends egret.EventDispatcher
{
    public canShare:boolean;//是否支持分享


    public returnQuery(reward:number,share:number):void
    {
        let cvo:ShareCVO = ShareCVO.cvo();
        cvo.setReward(reward);
        cvo.setStatus(share);
        this.dispatchEvent(new ShareEvent(ShareEvent.SHARE_UPDATE));
    }
    public returnShareInfo(status:number):void
    {
        let cvo:ShareCVO = ShareCVO.cvo();
        cvo.setStatus(status);
        this.dispatchEvent(new ShareEvent(ShareEvent.SHARE_UPDATE));
    }
    public returnShareReward(status:number):void
    {
        let cvo:ShareCVO = ShareCVO.cvo();
        cvo.setReward(status);
        this.dispatchEvent(new ShareEvent(ShareEvent.SHARE_UPDATE));
    }
    
   
    
}