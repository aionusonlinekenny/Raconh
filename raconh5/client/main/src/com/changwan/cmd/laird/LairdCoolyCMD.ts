class LairdCoolyCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_LAIRD_COOLY;
    }

    protected processOut(pkg:TCPPacketOut):void
    {
        // pkg.writeByte(this.trainingType);
    }

    public receive(pi:TCPPacketIn):void
    {
        let model:LairdModel = Manager.model.getLaird();
        model.curStatus = pi.readByte();
        
        model.lordInfoList = [];
        let len1:number = pi.readShort();
        for(let i:number=0; i<len1; i++)
        {
            let info:LordInfo = new LordInfo();
            info.id = pi.readInt64();
            info.name = pi.readUTF();
            info.level = pi.readShort();
            info.career = pi.readByte();
            info.guildName = pi.readUTF();
            model.lordInfoList.push(info);
        }

        model.coolyInfoList = [];
        let len2:number = pi.readShort();
        for(let i:number=0; i<len2; i++)
        {
            let info:CoolyInfo = new CoolyInfo();
            info.id = pi.readInt64();
            info.name = pi.readUTF();
            info.level = pi.readShort();
            info.career = pi.readByte();
            info.fight = pi.readInt();
            info.clubName = pi.readUTF();
            if(info.clubName == "")
            {
                let num:number = Math.floor(Math.random() * 3) + 17;
                info.clubName = LangCVO.getContent("club" + num);
            }
            info.catchTimes = pi.readInt();
            info.freeTimes = pi.readInt();
            info.pickSec = pi.readInt();
            info.isPickAll = pi.readByte();
            model.coolyInfoList.push(info);
        }
        
        model.dispatchEvent(new LairdEvent(LairdEvent.COOLY_INFO_UPDATE));
    }
}