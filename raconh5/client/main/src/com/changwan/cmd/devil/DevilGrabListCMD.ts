/**
 * 魔神降临请求抢夺列表
 * liangyan
 * create 2018-04-10
*/
class DevilGrabListCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.DEVIL_GRAB_LIST;
    }

    public receive(pi:TCPPacketIn):void
    {
        let second = pi.readInt();
        let now = Manager.model.getLogin().serverTimeInfo.serverTime/1000;
        Manager.model.getDevil().canGrabTime = now + second;
        let count = pi.readShort();
        let info:DevilGrabInfo;
        let infos = new Array<DevilGrabInfo>();
        while(count > 0)
        {
            info = new DevilGrabInfo();
            info.id = pi.readInt64();
            info.name = pi.readUTF();
            info.career = pi.readByte();
            info.score = pi.readInt();
            info.winTimes = pi.readShort();
            info.fight = pi.readInt();
            infos.push(info);
            count--;
        }
        Manager.model.getDevil().grabInfos = infos;
    }
}