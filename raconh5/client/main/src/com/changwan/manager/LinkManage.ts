/**
 * 链接
 * luzhihong
 * create 2017-11-23
 */
class LinkManage
{
    public constructor()
    {
    }

    public linkStr(str:string):void
    {
        if(str == null || str == "") return;
        let arr:Array<string> = str.split("|");
        if(arr.length > 0) this.link(parseInt(arr.shift()), arr);
    }

    public link(type:number, ...args:any[]):void
    {
        switch(type)
        {
            // case LinkType.GOTO://寻路到某地图某点(1|mapID|x|y)
            //     break;
            case LinkType.GOTO_NPC://寻路到NPC(2|NPC_ID)
                //if(Manager.model.getTraining().info.status == )
                let npcCVO:NpcCVO = NpcCVO.getCVO(parseInt(args[0]));
                if(npcCVO) Manager.walk.moveToNPC(npcCVO);
                break;
            case LinkType.USE_ITEMS://物品使用(3|base_id)
                let itemInfo:ItemsModelInfo = Manager.model.getItems().getItemModesInfo(parseInt(args[0]));
                Manager.model.getItems().useItems(itemInfo, itemInfo.quantity);
                break;
            case LinkType.PANEL_ROLE:
                Manager.view.show(ViewID.RolePanel, args[0]);
                break;
            case LinkType.PANEL_EQUIP:
                if(OpenCVO.isOpen(OpenConst.ID_STRENGTHEN, true))
                    Manager.view.show(ViewID.EquipPanel, parseInt(args[0]));
                break;
            case LinkType.PANEL_BAG:
                Manager.view.show(ViewID.BagPanel, parseInt(args[0]));
                break;
            case LinkType.PANEL_MAIL:
                Manager.view.show(ViewID.MailPanel, parseInt(args[0]));
                break;
            case LinkType.PANEL_MAP:
                Manager.view.show(ViewID.MapPanel, parseInt(args[0]));
                break;
            case LinkType.PANEL_RANK:
                Manager.view.show(ViewID.RankPanel, parseInt(args[0]));
                break;
            case LinkType.PANEL_SHOP:
                if(!Manager.view.isOpening(ViewID.ShopPanel) && !Manager.view.isOpening(ViewID.ShopPanelMulte))
                {
                    Manager.view.show(ViewID.ShopPanel, parseInt(args[0]));
                }
                break;
            case LinkType.PANEL_CLUB:
                Manager.view.show(ViewID.ClubPanel, parseInt(args[0]));
                break;
            case LinkType.PANEL_SKILL:
                Manager.view.show(ViewID.SkillPanel, parseInt(args[0]));
                break;
            case LinkType.PANEL_ACTIVITY:
                Manager.view.show(ViewID.ActivityPanel, parseInt(args[0]));
                break;
            case LinkType.PANEL_BOSS:
                Manager.view.show(ViewID.BossPanel, parseInt(args[0]));
                break;
            case LinkType.PANEL_FIRST_CHARGE:
                Manager.view.show(ViewID.FirstChargeView, parseInt(args[0]));
                break;
            case LinkType.PANEL_RECHARGE:
				Manager.view.show(ViewID.SysChargePanel, parseInt(args[0]));
                break;
            case LinkType.PANEL_BF:
				// Manager.view.show(ViewID.BFPanel, parseInt(args[0]));
                break;
            case LinkType.PANEL_VIP:
                let str:string = args[0];
                if(str.length>1)
                {
                    let pag:number = Number(str.substr(0,1));
                    let view:VipPanel = Manager.view.show(ViewID.VipPanel, pag);
                    let lev:string = str.substr(1,2);
                    view.setVipPage(Number(lev));
                }
                else
                {
                    Manager.view.show(ViewID.VipPanel, parseInt(args[0]));
                }
                break;
            case LinkType.PANEL_REIN:
				Manager.view.show(ViewID.ReinPanel, parseInt(args[0]));
                break;
            case LinkType.PANEL_FRIEND:
				Manager.view.show(ViewID.FriendPanel, parseInt(args[0]));
                break;
            case LinkType.PANEL_SHOP_MULTE:
                if(!Manager.view.isOpening(ViewID.ShopPanel) && !Manager.view.isOpening(ViewID.ShopPanelMulte))
                {
                    Manager.view.show(ViewID.ShopPanelMulte, parseInt(args[0]));
                }
                break;
            case LinkType.PANEL_ARTIFACT:
				Manager.view.show(ViewID.ArtifactPanel);
                break;
            case LinkType.PANEL_CASHCOW:
				Manager.view.show(ViewID.CashCowPanel, parseInt(args[0]));
                break;
            case LinkType.PANEL_SYSPRIVILEGE:
				Manager.view.show(ViewID.SysPrivilegePane, parseInt(args[0]));
                break;
            case LinkType.PANEL_RECHARGEACTIVITY:
				Manager.view.show(ViewID.RechargeActivityPanel, parseInt(args[0]));
                break;
            case LinkType.PANEL_CLUBBF:
				Manager.view.show(ViewID.ClubBFPanel, parseInt(args[0]));
                break;
            case LinkType.PANEL_COPY_TOWER:
                if(!OpenCVO.isOpen(OpenConst.ID_JIUXIAOTA, true)) return;
				Manager.view.show(ViewID.TowerCopyPanel, parseInt(args[0]));
                break;
            case LinkType.PANEL_COPY_EXP:
                if(!OpenCVO.isOpen(OpenConst.ID_YANWU, true)) return;
				Manager.view.show(ViewID.CopyExpPanel, parseInt(args[0]));
                break;
            case LinkType.PANEL_COPY_SILVER:
                if(!OpenCVO.isOpen(OpenConst.ID_JINYUTANG, true)) return;
				Manager.view.show(ViewID.CopySilverPanel, parseInt(args[0]));
                break;
            case LinkType.VIEW_CLUB:
				Manager.view.show(ViewID.ClubView);
                break;
            case LinkType.PANEL_DAILYREBATE:
				Manager.view.show(ViewID.DailyRebateView);
                break;
            case LinkType.PANEL_SHARE:
				Manager.view.show(ViewID.SharePanel);
                break;
            case LinkType.PANEL_MATERIAL:
                Manager.view.show(ViewID.MaterialPanel);
                break;
            case LinkType.PANEL_SRV_RANK:
                Manager.view.show(ViewID.SrvRankPanel);
                break;
            case LinkType.PANEL_FIRE_EYE:
                Manager.view.show(ViewID.FireEyePanel, parseInt(args[0]));
                break;
            case LinkType.VIEW_CLUB_CAREER:
                Manager.view.show(ViewID.ClubCareerView);
                break;
            case LinkType.PANEL_CLUB_ARENA:
                Manager.view.show(ViewID.ClubLunjiantaiPanel, parseInt(args[0]));
                break;
            case LinkType.PANEL_DEVIL:
                Manager.view.show(ViewID.BossPanel, parseInt(args[0]));
                break;
            case LinkType.PANEL_GFG:
                Manager.view.show(ViewID.GfgPanel, parseInt(args[0]));
                break;
            case LinkType.PANEL_MARKET:
                if(OpenCVO.isOpen(OpenConst.ID_MARKET,true))
                {
                    Manager.view.show(ViewID.MarketPanel, parseInt(args[0]));
                }
                break;
        }
    }
}