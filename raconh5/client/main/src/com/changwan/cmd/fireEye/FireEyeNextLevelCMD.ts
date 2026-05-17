/**
 * 火眼金睛下一关数据
 * liangyan
 * create 2018-03-26
*/
class FireEyeNextLevelCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.FIRE_EYE_NEXT;
    }

    public receive(pi:TCPPacketIn):void
    {
        let info = new FireEyeNextLevelInfo();
        info.level = pi.readByte();
        let count = pi.readShort();
        info.datas = [];
        while (count > 0)
        {
            info.datas.push({type:pi.readByte(), num:pi.readByte()});
            count--;
        }
        //闯关开始时间戳（当前时间小于此值，则需倒计时结束才能开始闯关）
        info.startTime = pi.readInt();
        info.levelTime = pi.readInt();
        Manager.model.getFireEye().nextInfo = info;
        Manager.model.getFireEye().dispatchEvent(new FireEyeEvent(FireEyeEvent.FIRE_EYE_NEXT_DATA));
    }
}