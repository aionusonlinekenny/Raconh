var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 链接
 * luzhihong
 * create 2017-11-23
 */
var LinkManage = (function () {
    function LinkManage() {
    }
    LinkManage.prototype.linkStr = function (str) {
        if (str == null || str == "")
            return;
        var arr = str.split("|");
        if (arr.length > 0)
            this.link(parseInt(arr.shift()), arr);
    };
    LinkManage.prototype.link = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        switch (type) {
            // case LinkType.GOTO://寻路到某地图某点(1|mapID|x|y)
            //     break;
            case LinkType.GOTO_NPC://寻路到NPC(2|NPC_ID)
                //if(Manager.model.getTraining().info.status == )
                var npcCVO = NpcCVO.getCVO(parseInt(args[0]));
                if (npcCVO)
                    Manager.walk.moveToNPC(npcCVO);
                break;
            case LinkType.USE_ITEMS://物品使用(3|base_id)
                var itemInfo = Manager.model.getItems().getItemModesInfo(parseInt(args[0]));
                Manager.model.getItems().useItems(itemInfo, itemInfo.quantity);
                break;
            case LinkType.PANEL_ROLE:
                Manager.view.show(17 /* RolePanel */, args[0]);
                break;
            case LinkType.PANEL_EQUIP:
                if (OpenCVO.isOpen(OpenConst.ID_STRENGTHEN, true))
                    Manager.view.show(12 /* EquipPanel */, parseInt(args[0]));
                break;
            case LinkType.PANEL_BAG:
                Manager.view.show(11 /* BagPanel */, parseInt(args[0]));
                break;
            case LinkType.PANEL_MAIL:
                Manager.view.show(14 /* MailPanel */, parseInt(args[0]));
                break;
            case LinkType.PANEL_MAP:
                Manager.view.show(15 /* MapPanel */, parseInt(args[0]));
                break;
            case LinkType.PANEL_RANK:
                Manager.view.show(16 /* RankPanel */, parseInt(args[0]));
                break;
            case LinkType.PANEL_SHOP:
                if (!Manager.view.isOpening(18 /* ShopPanel */) && !Manager.view.isOpening(115 /* ShopPanelMulte */)) {
                    Manager.view.show(18 /* ShopPanel */, parseInt(args[0]));
                }
                break;
            case LinkType.PANEL_CLUB:
                Manager.view.show(38 /* ClubPanel */, parseInt(args[0]));
                break;
            case LinkType.PANEL_SKILL:
                Manager.view.show(19 /* SkillPanel */, parseInt(args[0]));
                break;
            case LinkType.PANEL_ACTIVITY:
                Manager.view.show(10 /* ActivityPanel */, parseInt(args[0]));
                break;
            case LinkType.PANEL_BOSS:
                Manager.view.show(30 /* BossPanel */, parseInt(args[0]));
                break;
            case LinkType.PANEL_FIRST_CHARGE:
                Manager.view.show(76 /* FirstChargeView */, parseInt(args[0]));
                break;
            case LinkType.PANEL_RECHARGE:
                Manager.view.show(77 /* SysChargePanel */, parseInt(args[0]));
                break;
            case LinkType.PANEL_BF:
                // Manager.view.show(ViewID.BFPanel, parseInt(args[0]));
                break;
            case LinkType.PANEL_VIP:
                var str = args[0];
                if (str.length > 1) {
                    var pag = Number(str.substr(0, 1));
                    var view = Manager.view.show(51 /* VipPanel */, pag);
                    var lev = str.substr(1, 2);
                    view.setVipPage(Number(lev));
                }
                else {
                    Manager.view.show(51 /* VipPanel */, parseInt(args[0]));
                }
                break;
            case LinkType.PANEL_REIN:
                Manager.view.show(37 /* ReinPanel */, parseInt(args[0]));
                break;
            case LinkType.PANEL_FRIEND:
                Manager.view.show(13 /* FriendPanel */, parseInt(args[0]));
                break;
            case LinkType.PANEL_SHOP_MULTE:
                if (!Manager.view.isOpening(18 /* ShopPanel */) && !Manager.view.isOpening(115 /* ShopPanelMulte */)) {
                    Manager.view.show(115 /* ShopPanelMulte */, parseInt(args[0]));
                }
                break;
            case LinkType.PANEL_ARTIFACT:
                Manager.view.show(110 /* ArtifactPanel */);
                break;
            case LinkType.PANEL_CASHCOW:
                Manager.view.show(84 /* CashCowPanel */, parseInt(args[0]));
                break;
            case LinkType.PANEL_SYSPRIVILEGE:
                Manager.view.show(73 /* SysPrivilegePane */, parseInt(args[0]));
                break;
            case LinkType.PANEL_RECHARGEACTIVITY:
                Manager.view.show(88 /* RechargeActivityPanel */, parseInt(args[0]));
                break;
            case LinkType.PANEL_CLUBBF:
                Manager.view.show(93 /* ClubBFPanel */, parseInt(args[0]));
                break;
            case LinkType.PANEL_COPY_TOWER:
                if (!OpenCVO.isOpen(OpenConst.ID_JIUXIAOTA, true))
                    return;
                Manager.view.show(121 /* TowerCopyPanel */, parseInt(args[0]));
                break;
            case LinkType.PANEL_COPY_EXP:
                if (!OpenCVO.isOpen(OpenConst.ID_YANWU, true))
                    return;
                Manager.view.show(123 /* CopyExpPanel */, parseInt(args[0]));
                break;
            case LinkType.PANEL_COPY_SILVER:
                if (!OpenCVO.isOpen(OpenConst.ID_JINYUTANG, true))
                    return;
                Manager.view.show(122 /* CopySilverPanel */, parseInt(args[0]));
                break;
            case LinkType.VIEW_CLUB:
                Manager.view.show(40 /* ClubView */);
                break;
            case LinkType.PANEL_DAILYREBATE:
                Manager.view.show(130 /* DailyRebateView */);
                break;
            case LinkType.PANEL_SHARE:
                Manager.view.show(131 /* SharePanel */);
                break;
            case LinkType.PANEL_MATERIAL:
                Manager.view.show(128 /* MaterialPanel */);
                break;
            case LinkType.PANEL_SRV_RANK:
                Manager.view.show(134 /* SrvRankPanel */);
                break;
            case LinkType.PANEL_FIRE_EYE:
                Manager.view.show(136 /* FireEyePanel */, parseInt(args[0]));
                break;
            case LinkType.VIEW_CLUB_CAREER:
                Manager.view.show(44 /* ClubCareerView */);
                break;
            case LinkType.PANEL_CLUB_ARENA:
                Manager.view.show(138 /* ClubLunjiantaiPanel */, parseInt(args[0]));
                break;
            case LinkType.PANEL_DEVIL:
                Manager.view.show(30 /* BossPanel */, parseInt(args[0]));
                break;
            case LinkType.PANEL_GFG:
                Manager.view.show(145 /* GfgPanel */, parseInt(args[0]));
                break;
            case LinkType.PANEL_MARKET:
                if (OpenCVO.isOpen(OpenConst.ID_MARKET, true)) {
                    Manager.view.show(144 /* MarketPanel */, parseInt(args[0]));
                }
                break;
        }
    };
    return LinkManage;
}());
__reflect(LinkManage.prototype, "LinkManage");
//# sourceMappingURL=LinkManage.js.map