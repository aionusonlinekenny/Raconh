/**
 * 转生controller
 * liangyan
 * create 2017-12-14
*/
class ReinControl extends BaseControl
{
    public constructor()
    {
        super();
    }

    protected addCMD():void
    {
        Manager.socket.addCMD(Protocol.REIN_INFO, ReinInfoCMD);
        Manager.socket.addCMD(Protocol.REIN_APPLY, ReinApplyCMD);
    }

    /**转生信息 */
    public reinInfo():void
    {
        let cmd = Manager.socket.getCMD(Protocol.REIN_INFO) as ReinInfoCMD;
        cmd.send();
    }
    /**转生申请 */
    public reinApply():void
    {
        let cmd = Manager.socket.getCMD(Protocol.REIN_APPLY) as ReinApplyCMD;
        cmd.send();
    }
}