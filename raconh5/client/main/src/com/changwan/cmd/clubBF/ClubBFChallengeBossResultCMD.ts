/**
 * 挑战BOSS结算协议
 * luzhihong
 * create 2018.2.1
 */
class ClubBFChallengeBossResultCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CLUB_BF_CHALLENGE_BOSS_RESULT;
    }

    public receive(pi:TCPPacketIn):void
    {
                // array('name' => 'combat_res', 'type' => 'int8', 'desc' => '战斗结果，0失败，1胜利'),
                // array('name' => 'hurt', 'type' => 'int64', 'desc' => '对boss造成的伤害值'),
                // array('name' => 'boss_hp', 'type' => 'int64', 'desc' => 'boss剩余血量'),
                // array('name' => 'boss_max_hp', 'type' => 'int64', 'desc' => 'boss最大血量'),
                // array('name'=>'items','type'=>'arr',  'record'=>'item_cli','desc'=>'获得返回','vars' => array(
                //     array('name'=>'base_id', 'type'=>'int32', 'desc'=>'物品id'),
                //     array('name'=>'bind', 'type'=>'int8', 'desc'=>'是否绑定'),
                //     array('name'=>'quantity', 'type'=>'int32', 'desc'=>'数量'),
                // )),
        let data:Object = {};
        data["isWin"] = pi.readByte() != 0; 
        data["hurt"] = pi.readInt64();
        data["boss_hp"] = pi.readInt64();
        data["boss_max_hp"] = pi.readInt64();

        let infos:Array<ItemsModelInfo> = [];
        let len0:number = pi.readShort();
        let info:ItemsModelInfo;
        while(len0--)
        {
            info = new ItemsModelInfo();
            info.base_id = pi.readInt();
            info.bind = pi.readByte() != 1;
            info.quantity = pi.readInt();
            // let len1:number = pi.readShort();
            // let exarr:ExattrItemsinfo
            // while(len1--)
            // {
            //     exarr = new ExattrItemsinfo();
            //     exarr.type = pi.readShort();
            //     exarr.target = pi.readInt();
            //     exarr.value = pi.readInt();
            //     exarr.desc = pi.readUTF();
            //     info.infoList.push(exarr);
            // }
            infos.push(info);
        }
        infos.sort(CopyModel.sortResultItems);
        data["infos"] = infos;

        Manager.model.getAuto().autoHook = false;
        Manager.view.show(ViewID.ClubBF1v1Result, true, data);
    }
}