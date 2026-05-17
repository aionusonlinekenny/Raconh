/**
 * 请求盟会战力协议
 * luzhihong
 * create 2018.2.1
 */
class ClubBFPowersCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CLUB_BF_POWERS;
    }

    public receive(pi:TCPPacketIn):void
    {
                // array('name' => 'list','type' => 'arr', 'tuple' => 'true','desc' => '对象列表(自行排序吧)','vars' => array(
                //     array('name' => 'gtype', 'type' => 'int8', 'desc' => '盟会类型'),
                //     array('name' => 'fc', 'type' => 'int64', 'desc' => '盟会战力'),
                // )),
        let clubPowers:Array<Object> = [];
        let len:number = pi.readShort();
        while(len--)
        {
            clubPowers.push({id:pi.readByte(), power:pi.readInt64()});
        }
        clubPowers.sort(this.sortByPower);
        Manager.model.getClubBF().dispatchEvent(new ClubBFEvent(ClubBFEvent.CLUB_POWERS, clubPowers))
    }

    private sortByPower(obj0:Object, obj1:Object):number
    {
        if(obj0["power"] > obj1["power"]) return -1;
        if(obj0["power"] < obj1["power"]) return 1;
        return 0;
    }
}