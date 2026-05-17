/**
 * 火眼金睛请求对手数据
 * liangyan
 * create 2018-03-27
*/
class FireEyeAskDataCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.FIRE_EYE_ENEMY_DATA;
    }

    public receive(pi:TCPPacketIn):void
    {
        let count = pi.readShort();
        let info:FireEyeEnemyInfo;
        while (count > 0)
        {
            info = new FireEyeEnemyInfo();
            info.id = pi.readInt64();
            info.name = pi.readUTF();
            info.career = pi.readByte();
            info.score = pi.readInt();
            if(info.id != Manager.model.self.id) Manager.model.getFireEye().enemyInfo = info;
            else Manager.model.getFireEye().myInfo = info;
            count--;
        }
    }
}