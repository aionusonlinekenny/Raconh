/**
 * pzx 
 * 18.2.8
 * 寻宝积分领奖
 *  */
class ArtifactIntegralCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_ARTIFACT_INTEGRAL_REWARD;
    }
    /**积分 */
    public type:number;
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeShort(this.type);
    }
    public receive(ip:TCPPacketIn):void
    {
        // array('name'=>'state', 'type'=>'arr', 'tuple'=>'true', 'desc'=>array(
        //             array('name'=>'point', 'type'=>'int16', 'desc'=>'积分'),
        //             array('name'=>'is_rewarded', 'type'=>'int8', 'desc'=>'是否已领奖 0-否 1-是'),
        //         )),
        let ln:number = ip.readShort();
        for(let i:number = 0;i<ln;i++)
        {
            let point:number = ip.readShort();
            let reward:number = ip.readByte();
            ArtifactIntegralCVO.setisReward(ArtifactType.integral_type,point,reward);
        }
        Manager.model.getArtifact().integralReward();
    }
}