/**
 * 盟会战结算协议
 * luzhihong
 * create 2018.2.1
 */
class ClubBFResultCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CLUB_BF_RESULT;
    }

    public receive(pi:TCPPacketIn):void
    {
                // array('name' => 'def_gtype', 'type' => 'int8', 'desc' => '防守方盟会类型'),

                // array('name' => 'win_gtype', 'type' => 'int8', 'desc' => '占领城池的盟会类型'),
                // array('name' => 'win_cnt', 'type' => 'int32', 'desc' => '连胜数'),

                // array('name' => 'score', 'type' => 'int32', 'desc' => '个人积分数'),
                // array('name' => 'guild_rank', 'type' => 'int32', 'desc' => '盟会积分排名'),
                // array('name'=>'items','type'=>'arr',  'record'=>'item_cli','desc'=>'获得返回','vars' => array(
                //     array('name'=>'base_id', 'type'=>'int32', 'desc'=>'物品id'),
                //     array('name'=>'bind', 'type'=>'int8', 'desc'=>'是否绑定'),
                //     array('name'=>'quantity', 'type'=>'int32', 'desc'=>'数量'),
                // )),
                // array('name' => 'guild_score_list', 'type' => 'arr', 'desc' => '盟会积分', 'vars' => array(
                //     array('name' => 'gtype', 'type' => 'int8', 'desc' => '盟会类型'),
                //     array('name' => 'score', 'type' => 'int32', 'desc' => '盟会积分'),
                // )),
        let defClubType:number = pi.readByte();
        let winClubType:number = pi.readByte();
        let winCount:number = pi.readInt();

        let score:number = pi.readInt();
        let rank:number = pi.readInt();

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

		let clubScores:Object = {};
        len0 = pi.readShort();
        while(len0--)
        {
            clubScores[pi.readByte()] = pi.readInt();
        }

        Manager.view.show(ViewID.ClubBFResult, defClubType, winClubType, winCount, score, rank, infos, clubScores);
    }
}