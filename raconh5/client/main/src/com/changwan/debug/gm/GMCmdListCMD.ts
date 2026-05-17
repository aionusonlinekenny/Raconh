class GMCmdListCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_ADMIN_ALL;
    }

    public str:string;

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeUTF(this.str);
    }

    public receive(pi:TCPPacketIn):void
    {
        let list:Array<any> = [];
        let len:number = pi.readShort();
        for(let i:number=0; i<len; i++)
        {
            let type:string = pi.readUTF();
            let cmd:string = pi.readUTF();
            let desc:string = pi.readUTF();
            let example:string = pi.readUTF();
            list.push({type:type, cmd:cmd, desc:desc, example:example});
        }

        GM.instance.getCMDList(list);
    }
}