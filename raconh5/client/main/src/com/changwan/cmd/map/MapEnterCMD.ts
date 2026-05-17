/**
 *author Anydo
 *create 2017-11-1
 *description 地图进入协议
*/
class MapEnterCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.MAP_ENTER;
    }

    public mapID:number;
    protected processOut(pkg:TCPPacketOut):void
    {
        
        pkg.writeInt(this.mapID);
    }

    public receive(pi:TCPPacketIn):void
    {
        let oldMapID:number = Manager.model.getMap().getId();
        let newMapID:number = pi.readInt();
        Manager.model.getMap().enterMapX = pi.readShort();
        Manager.model.getMap().enterMapY = pi.readShort();
        egret.log("进入地图",oldMapID,newMapID,Manager.model.getMap().enterMapX,Manager.model.getMap().enterMapY);
        let mapLongID:number = pi.readInt64();

        let curIsReConnect:boolean = this.socketReConnectHandle();
        Manager.control.getMap().mapEnterReceive(newMapID, mapLongID, curIsReConnect);
        
        GameDispatcher.getInstance().dispatchEvent(new GlobalEvent(GlobalEvent.ENTER_SCENE, curIsReConnect));
    }

    private socketReConnectHandle():boolean
    {
        if(!Manager.model.getLogin().isSocketReConnect) return false;
        Manager.model.getLogin().isSocketReConnect = false;
        if(Manager.model.self.getAliveFlag())
        {
            Manager.view.hide(ViewID.ReviveCDView);
            Manager.view.hide(ViewID.ReviveChooseView);
        }
        if(Manager.model.getArena().resultObj != null)
        {
            Manager.model.getArena().exitArenaHandler();
        }
        return true;
    }
}