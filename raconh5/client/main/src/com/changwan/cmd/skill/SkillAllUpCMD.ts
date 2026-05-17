/**
 * 技能一键升级协议
 * liangyan
 * create 2017-11-30
*/
class SkillAllUpCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.SKILL_ALL_UP;
    }

    public arr:Array<any>;
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeShort(this.arr.length);
        for(let i = 0; i < this.arr.length; i++)
        {
            pkg.writeShort(this.arr[i].id);
            pkg.writeShort(this.arr[i].level);
        }
    }
}