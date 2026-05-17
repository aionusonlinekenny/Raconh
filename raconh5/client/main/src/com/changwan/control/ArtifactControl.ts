/**
 * pzx 
 * 18.2.8
     * 寻宝Control
     */
class ArtifactControl extends BaseControl
{
    public constructor()
    {
		super();
	}

    protected addCMD():void
    {
         Manager.socket.addCMD(Protocol.CMD_ARTIFACT_QUERY,ArtifactQueryCMD);
         Manager.socket.addCMD(Protocol.CMD_ARTIFACT_HUNTING,ArtifactSendHuntingCMD);
         Manager.socket.addCMD(Protocol.CMD_ARTIFACT_INTEGRAL_REWARD,ArtifactIntegralCMD);
         Manager.socket.addCMD(Protocol.CMD_ARTIFACT_LOG,ArtifactLogCMD);
    }
    /**
     * 查询
     */
    public query():void
    {
        let cmd:ArtifactQueryCMD = Manager.socket.getCMD(Protocol.CMD_ARTIFACT_QUERY) as ArtifactQueryCMD;
        cmd.send();
    }
/**
 * 寻宝
 */
    public hunting(type:number):void
    {
        let cmd:ArtifactSendHuntingCMD = Manager.socket.getCMD(Protocol.CMD_ARTIFACT_HUNTING) as ArtifactSendHuntingCMD;
        cmd.type = type;
        cmd.send();
    }
    /**
     *积分领奖
     */
    public integralReward(type:number):void
    {
        let cmd:ArtifactIntegralCMD = Manager.socket.getCMD(Protocol.CMD_ARTIFACT_INTEGRAL_REWARD) as ArtifactIntegralCMD;
        cmd.type = type;
        cmd.send();
    }
    /**
     * 个人寻宝记录
     */
    public selfLog():void
    {
        let cmd:ArtifactLogCMD = Manager.socket.getCMD(Protocol.CMD_ARTIFACT_LOG) as ArtifactLogCMD;
        cmd.send();
    }
}