/**
 *author Anydo
 *create 2018-1-31
 *description 
*/
class PetSkillUpgradeCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.PET_SKILL_UPGRADE;
    }

    public groupId:number;
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeShort(this.groupId);
    }

    public receive(pi:TCPPacketIn):void
    {
        let len:number = pi.readShort();
        for(let i:number = 0; i < len; i++)
        {
            let groupId:number = pi.readShort();
            let level:number = pi.readShort();
            Manager.model.getPet().setPetSkillLevel(groupId, level);
        }
    }
}