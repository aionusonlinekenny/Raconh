/**
 * 火眼金睛玩家数据
 * liangyan
 * create 2018-03-26
*/
class FireEyePlayerDataCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.FIRE_EYE_PLAYER_DATA;
    }

    public receive(pi:TCPPacketIn):void
    {
        let count = pi.readShort();
        let player:FireEyePlayerData;
        let targetNum:number;
        while(count > 0)
        {
            player = new FireEyePlayerData();
            player.id = pi.readInt64();
            player.score = pi.readInt();
            targetNum = pi.readShort();
            while (targetNum > 0)
            {
                let target:any = {};
                target.type = pi.readByte();
                target.num = pi.readByte();
                player.targets.push(target);
                targetNum--;
            }
            player.winTimes = pi.readByte();
            if(player.id == Manager.model.self.id) Manager.model.getFireEye().myGameInfo = player;
            else Manager.model.getFireEye().enemyGameInfo = player;
            count--;
        }
        let myRate = Manager.model.getFireEye().myGameInfo.rate;
        let enemyRate = Manager.model.getFireEye().enemyGameInfo.rate;
        if(myRate == 100 && myRate > enemyRate)
        {
            if(Manager.control.getFireEye().finishView != null)
            {
                Manager.control.getFireEye().finishView.dispose();
                Manager.control.getFireEye().finishView = null;
            }
            Manager.control.getFireEye().finishView = new FireEyeFinishView();
            (Manager.view.getView(ViewID.FireEyePanel) as FireEyePanel).addChild(Manager.control.getFireEye().finishView);
        }
        Manager.model.getFireEye().dispatchEvent(new FireEyeEvent(FireEyeEvent.FIRE_EYE_PLAYER_DATA));
    }
}