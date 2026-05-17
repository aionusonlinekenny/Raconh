/**
 * 火眼金睛今日是否已参与
 * liangyan
 * create 2018-03-26
*/
class FireEyeHasJoinCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.FIRE_EYE_HAS_JOIN;
    }

    public receive(pi:TCPPacketIn):void
    {
        Manager.model.getFireEye().hasJoin = pi.readByte() == 1;
    }
}