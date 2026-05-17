class LairdFightCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_LAIRD_FIGHT;
    }

    public type:number;
    public targetId:number;

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeByte(this.type);
        pkg.writeInt64(this.targetId);
    }

    public receive(pi:TCPPacketIn):void
    {
        let arr:Array<any> = [];
        let child:any;
        let noticeId:number = pi.readShort();
        let len:number = pi.readShort();
        for(let i:number=0; i<len; i++)
        {
            child = {};
            child.type = pi.readByte();
            child.content = pi.readUTF();
            arr.push(child);
        }
        let textCvo = TextDataCVO.getCVO(noticeId);
        if(textCvo)
        {
            let content:string = textCvo.content;
            Manager.model.getLaird().resultContent = Manager.model.getChat().parseLink(content, arr);
        }
        
        // Manager.layer.panelDarkLayer.visible = false;
        // Manager.layer.uiLayer.visible = false;
        // Manager.layer.effectLayer.visible = false;
        Manager.view.hide(ViewID.ClubPanel);
        ObjectUtil.remove(Manager.layer.panelDarkLayer);
        ObjectUtil.remove(Manager.layer.uiLayer);
        ObjectUtil.remove(Manager.layer.effectLayer);
    }
}