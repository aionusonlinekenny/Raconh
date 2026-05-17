/**
 * pzx 
 * 17.12.14
 * 改名
 *  */
class RenameCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_ROLE_RENAME;
    }

    public rename:string;

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeUTF(this.rename)
    }


    public receive(ip:TCPPacketIn):void
    {
        // 'desc' => '改名结果',
        //     'content' => array(
        //         array('name' => 'result', 'type' => 'int8', 'desc' => '1成功0失败'),
        let result:number = ip.readByte();
        if(result == 1)
        {
            let self:SelfGameObjectInfo = Manager.model.self;
            // self.attrUpdateNickname();
            self.dispatchEvent(new RenameEvent(RenameEvent.UPDATE_RENAME_EVENT))
        }
    }
}