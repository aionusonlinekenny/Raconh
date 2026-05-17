/**
 * BOSS 结算协议
 * luzhihong
 * create 2018.1.2
 */
class BossResultCMD extends BaseCMD
{
	public constructor() 
	{
        super();
        this._protocol = Protocol.BOSS_RESULT;
	}
	
    public receive(pi:TCPPacketIn):void
    {
        let rank:number = pi.readShort();
        let isSucc:boolean = pi.readByte() != 0; 

        let infos:Array<ItemsModelInfo> = [];
        let len0:number = pi.readShort();
        let info:ItemsModelInfo;
        while(len0--)
        {
            info = new ItemsModelInfo();
            info.base_id = pi.readInt();
            info.bind = pi.readByte() != 1;
            info.quantity = pi.readInt();
            let len1:number = pi.readShort();
            let exarr:ExattrItemsinfo
            while(len1--)
            {
                exarr = new ExattrItemsinfo();
                exarr.type = pi.readShort();
                exarr.target = pi.readInt();
                exarr.value = pi.readInt();
                exarr.desc = pi.readUTF();
                info.infoList.push(exarr);
            }
            infos.push(info);
        }
        infos.sort(CopyModel.sortResultItems);

        if(isSucc)
        {
            Manager.render.add(this.showWinFun,this,3000,1,null,false,rank,infos);//策划需求延两秒再提示
        }
        else
        {
            Manager.render.add(this.showFailFun, this, 3000, 1);//策划需求延两秒再提示
        }
    }

    private showWinFun(interval:number,rank:number,infos:Array<ItemsModelInfo>):void
    {
         Manager.control.getBoss().showWin(rank, infos, 10, Manager.control.getBoss().exit);
    }

    private showFailFun(interval:number):void
    {
        Manager.control.getCopy().showFail(10, Manager.control.getBoss().exit);
    }
}