/**
 * 视图管理器,只有注册了的视图才可以通过管理器打开
 * devil 2017-11-23
 */
var ViewManager = /** @class */ (function () {
    function ViewManager() {
        this._opens = {};
        this._dataModal = {};
        this._dataMulte = {};
        this._dataSingle = {};
        this._modalDic = {};
        this.initData();
    }
    ViewManager.prototype.initData = function () {
        //模态界面
        this._dataModal[34 /* ReviveCDView */] = true;
        this._dataModal[98 /* ClubBF1v1Result */] = true;
        this._dataModal[99 /* ClubBFResult */] = true;
        this._dataModal[113 /* DialogView2 */] = true;
        this._dataModal[129 /* MaterialSecondView */] = true;
        this._dataModal[26 /* CopyResultWin */] = true;
        this._dataModal[72 /* CopyExpResultView */] = true;
        this._dataModal[87 /* CopySilverResultView */] = true;
        this._dataModal[142 /* DevilResultView */] = true;
        this._dataModal[135 /* FireEyeLevelResultView */] = true;
        this._dataModal[105 /* ClubLeaderWarMatchingView */] = true;
        this._dataModal[50 /* OfflineProfitView */] = true;
        this._dataModal[83 /* ChuangongScussView */] = true;
        this._dataModal[69 /* BossResultWin */] = true;
        this._dataModal[25 /* CopyResultFail */] = true;
        this._dataModal[62 /* TowerCopyWinView */] = true;
        this._dataModal[62 /* TowerCopyWinView */] = true;
        this._dataModal[24 /* CopyRankView */] = true;
        this._dataModal[9 /* ItemsTips */] = true;
        this._dataModal[44 /* ClubCareerView */] = true;
        this._dataModal[22 /* TipsView */] = true;
        this._dataModal[67 /* CountDownTool */] = true;
        this._dataModal[55 /* ArenaResultView */] = true;
        this._dataModal[89 /* LandlordResultWin */] = true;
        this._dataModal[92 /* LandlordResultFail */] = true;
        this._dataModal[107 /* ClubLeaderWarResultView */] = true;
        this._dataModal[127 /* RollingWordsView */] = true;
        this._dataModal[65 /* ItemUseResultWin */] = true;
        this._dataModal[140 /* JuyuanResultView */] = true;
        this._dataModal[64 /* LifeGridHunResultWin */] = true;
        this._dataModal[61 /* ArenaMaxAwardView */] = true;
        this._dataModal[71 /* CopyExpAddRateView */] = true;
        this._dataModal[57 /* ArenaLogView */] = true;
        this._dataModal[58 /* ArenaAwardView */] = true;
        this._dataModal[111 /* ArtifactRewardView */] = true;
        this._dataModal[112 /* ArtifactInfoListView */] = true;
        this._dataModal[20 /* BagEquipTips */] = true;
        this._dataModal[82 /* ChuangongAwardView */] = true;
        this._dataModal[39 /* ClubJoinTipsView */] = true;
        this._dataModal[49 /* ClubEditNoticeView */] = true;
        this._dataModal[40 /* ClubView */] = true;
        this._dataModal[44 /* ClubCareerView */] = true;
        this._dataModal[94 /* ClubBFExplainView */] = true;
        this._dataModal[109 /* TextTips */] = true;
        this._dataModal[106 /* ClubLeaderWarRankView */] = true;
        this._dataModal[104 /* ClubLeaderWarMemberView */] = true;
        this._dataModal[63 /* TowerCopyBossView */] = true;
        this._dataModal[148 /* DevilRuleView */] = true;
        this._dataModal[8 /* GemAttrTips */] = true;
        this._dataModal[147 /* StarUpExplainView */] = true;
        this._dataModal[78 /* SuitAllAttrView */] = true;
        this._dataModal[79 /* SuitDisassemblyTips */] = true;
        this._dataModal[7 /* ZhuhunUpgrade */] = true;
        this._dataModal[6 /* ZhuhunAttrTips */] = true;
        this._dataModal[116 /* FriendsConfirmView */] = true;
        this._dataModal[1 /* FriendsBatchDelView */] = true;
        this._dataModal[5 /* FriendsChatView */] = true;
        this._dataModal[76 /* FirstChargeView */] = true;
        this._dataModal[41 /* RenameView */] = true;
        this._dataModal[42 /* JingmaiCondView */] = true;
        this._dataModal[139 /* JuyuanItem */] = true;
        this._dataModal[90 /* LandlordInteractView */] = true;
        this._dataModal[91 /* LandlordPressView */] = true;
        this._dataModal[27 /* ServerSelectView */] = true;
        this._dataModal[4 /* MailContentView */] = true;
        this._dataModal[2 /* MailAllFetchView */] = true;
        this._dataModal[150 /* MarketBuyTipsView */] = true;
        this._dataModal[149 /* MarketSaleTipsView */] = true;
        this._dataModal[151 /* MarketRecycleTipsView */] = true;
        this._dataModal[146 /* MarketSaleNotesView */] = true;
        this._dataModal[133 /* MaterialGetBoxView */] = true;
        this._dataModal[47 /* PetSkillView */] = true;
        this._dataModal[46 /* PetFeedView */] = true;
        this._dataModal[43 /* ReinSuccView */] = true;
        this._dataModal[124 /* RelicStuffAttrView */] = true;
        this._dataModal[125 /* RelicStuffCuccessView */] = true;
        this._dataModal[21 /* RoleAttrView */] = true;
        this._dataModal[137 /* WorldLevelView */] = true;
        this._dataModal[33 /* ShopBuyView */] = true;
        this._dataModal[54 /* LifeGridFuseView */] = true;
        this._dataModal[52 /* LifeGridBagView */] = true;
        this._dataModal[56 /* LifeGridListView */] = true;
        this._dataModal[156 /* Sysprivilege_ExperienceView */] = true;
        //多开界面
        this._dataMulte[0 /* BackgroundNoticeView */] = BackgroundNoticeView;
        this._dataMulte[1 /* FriendsBatchDelView */] = FriendsBatchDelView;
        this._dataMulte[2 /* MailAllFetchView */] = MailAllFetchView;
        this._dataMulte[3 /* SkillGainNewView */] = SkillGainNewView;
        this._dataMulte[4 /* MailContentView */] = MailContentView;
        this._dataMulte[5 /* FriendsChatView */] = FriendsChatView;
        this._dataMulte[6 /* ZhuhunAttrTips */] = ZhuhunAttrTips;
        this._dataMulte[7 /* ZhuhunUpgrade */] = ZhuhunUpgrade;
        this._dataMulte[8 /* GemAttrTips */] = GemAttrTips;
        this._dataMulte[9 /* ItemsTips */] = ItemsTips;
        this._dataMulte[20 /* BagEquipTips */] = BagEquipTips;
        this._dataMulte[21 /* RoleAttrView */] = RoleAttrView;
        this._dataMulte[22 /* TipsView */] = TipsView;
        this._dataMulte[109 /* TextTips */] = TextTips;
        this._dataMulte[23 /* CopyInfoView */] = CopyInfoView;
        this._dataMulte[24 /* CopyRankView */] = CopyRankView;
        this._dataMulte[25 /* CopyResultFail */] = CopyResultFail;
        this._dataMulte[26 /* CopyResultWin */] = CopyResultWin;
        this._dataMulte[69 /* BossResultWin */] = BossResultWin;
        this._dataMulte[31 /* BossReviveView */] = BossReviveView;
        this._dataMulte[32 /* BossEnemyView */] = BossEnemyView;
        this._dataMulte[33 /* ShopBuyView */] = ShopBuyView;
        this._dataMulte[34 /* ReviveCDView */] = ReviveCDView;
        this._dataMulte[35 /* ReviveChooseView */] = ReviveChooseView;
        this._dataMulte[36 /* BossBloodStrip */] = BossBloodStrip2;
        this._dataMulte[27 /* ServerSelectView */] = ServerSelectView;
        this._dataMulte[42 /* JingmaiCondView */] = JingmaiCondView;
        this._dataMulte[39 /* ClubJoinTipsView */] = ClubJoinTipsView;
        this._dataMulte[40 /* ClubView */] = ClubView;
        this._dataMulte[43 /* ReinSuccView */] = ReinSuccView;
        this._dataMulte[44 /* ClubCareerView */] = ClubCareerView;
        this._dataMulte[45 /* EquipTips */] = EquipTips;
        this._dataMulte[46 /* PetFeedView */] = PetFeedView;
        this._dataMulte[47 /* PetSkillView */] = PetSkillView;
        this._dataMulte[56 /* LifeGridListView */] = LifeGridListView;
        this._dataMulte[55 /* ArenaResultView */] = ArenaResultView;
        this._dataMulte[57 /* ArenaLogView */] = ArenaLogView;
        this._dataMulte[58 /* ArenaAwardView */] = ArenaAwardView;
        this._dataMulte[59 /* ArenaPKHeadView */] = ArenaPKHeadView;
        this._dataMulte[60 /* ArenaJumpBtnView */] = ArenaJumpBtnView;
        this._dataMulte[61 /* ArenaMaxAwardView */] = ArenaMaxAwardView;
        this._dataMulte[48 /* SysNoticeNewSystemView */] = SysNoticeNewSystemView;
        this._dataMulte[49 /* ClubEditNoticeView */] = ClubEditNoticeView;
        this._dataMulte[28 /* LoginView */] = LoginView;
        this._dataMulte[29 /* CreateRoleView */] = CreateRoleView;
        this._dataMulte[50 /* OfflineProfitView */] = OfflineProfitView;
        this._dataMulte[52 /* LifeGridBagView */] = LifeGridBagView;
        this._dataMulte[54 /* LifeGridFuseView */] = LifeGridFuseView;
        this._dataMulte[53 /* LifeGridLeveUpView */] = LifeGridLeveUpView;
        this._dataMulte[62 /* TowerCopyWinView */] = TowerCopyWinView;
        this._dataMulte[63 /* TowerCopyBossView */] = TowerCopyBossView;
        this._dataMulte[70 /* CopyExpInfoView */] = CopyExpInfoView;
        this._dataMulte[71 /* CopyExpAddRateView */] = CopyExpAddRateView;
        this._dataMulte[72 /* CopyExpResultView */] = CopyExpResultView;
        this._dataMulte[74 /* CopyWaveView */] = CopyWaveView;
        this._dataMulte[75 /* CopyCountDownView */] = CopyCountDownView;
        this._dataMulte[85 /* CopyBuffUnlockView */] = CopyBuffUnlockView;
        this._dataMulte[86 /* CopySilverInfoView */] = CopySilverInfoView;
        this._dataMulte[87 /* CopySilverResultView */] = CopySilverResultView;
        this._dataMulte[94 /* ClubBFExplainView */] = ClubBFExplainView;
        this._dataMulte[95 /* ClubBFClearCDView */] = ClubBFClearCDView;
        this._dataMulte[96 /* ClubBFBuyBuffView */] = ClubBFBuyBuffView;
        this._dataMulte[97 /* ClubBFAttackBuffView */] = ClubBFAttackBuffView;
        this._dataMulte[98 /* ClubBF1v1Result */] = ClubBF1v1Result;
        this._dataMulte[99 /* ClubBFResult */] = ClubBFResult;
        this._dataMulte[100 /* ClubBFMiniView */] = ClubBFMiniView;
        this._dataMulte[101 /* ClubBFClearCDBtn */] = ClubBFClearCDBtn;
        this._dataMulte[68 /* SwitchSceneAni */] = SwitchSceneAni;
        this._dataMulte[64 /* LifeGridHunResultWin */] = LifeGridHunResultWin;
        this._dataMulte[65 /* ItemUseResultWin */] = ItemUseResultWin;
        this._dataMulte[67 /* CountDownTool */] = CountDownTool;
        this._dataMulte[66 /* UseItemsTips */] = UseItemsTips;
        this._dataMulte[78 /* SuitAllAttrView */] = SuitAllAttrView;
        this._dataMulte[116 /* FriendsConfirmView */] = FriendsConfirmView;
        this._dataMulte[79 /* SuitDisassemblyTips */] = SuitDisassemblyTips;
        this._dataMulte[81 /* ChuangongView */] = ChuangongView;
        this._dataMulte[89 /* LandlordResultWin */] = LandlordResultWin;
        this._dataMulte[90 /* LandlordInteractView */] = LandlordInteractView;
        this._dataMulte[91 /* LandlordPressView */] = LandlordPressView;
        this._dataMulte[92 /* LandlordResultFail */] = LandlordResultFail;
        this._dataMulte[104 /* ClubLeaderWarMemberView */] = ClubLeaderWarMemberView;
        this._dataMulte[105 /* ClubLeaderWarMatchingView */] = ClubLeaderWarMatchingView;
        this._dataMulte[106 /* ClubLeaderWarRankView */] = ClubLeaderWarRankView;
        this._dataMulte[107 /* ClubLeaderWarResultView */] = ClubLeaderWarResultView;
        this._dataMulte[108 /* ClubLeaderWarLeaderRankView */] = ClubLeaderWarLeaderRankView;
        this._dataMulte[111 /* ArtifactRewardView */] = ArtifactRewardView;
        this._dataMulte[112 /* ArtifactInfoListView */] = ArtifactInfoListView;
        this._dataMulte[113 /* DialogView2 */] = DialogView2;
        this._dataMulte[114 /* LifeGridUnLockedView */] = LifeGridUnLockedView;
        this._dataMulte[115 /* ShopPanelMulte */] = ShopPanel;
        this._dataMulte[117 /* PlayerBloodStrip */] = PlayerBloodStrip2;
        this._dataMulte[118 /* CloudTransferEffect */] = CloudTransferEffect;
        this._dataMulte[119 /* RollTips */] = RollTips2;
        this._dataMulte[120 /* MapNameEffect */] = MapNameEffect;
        this._dataMulte[124 /* RelicStuffAttrView */] = RelicStuffAttrView;
        this._dataMulte[125 /* RelicStuffCuccessView */] = RelicStuffCuccessView;
        this._dataMulte[126 /* SkillIconFlyEffect */] = SkillIconFlyEffect;
        this._dataMulte[127 /* RollingWordsView */] = RollingWordsView;
        this._dataMulte[129 /* MaterialSecondView */] = MaterialSecondView;
        this._dataMulte[132 /* CollectEffect */] = CollectEffect;
        this._dataMulte[133 /* MaterialGetBoxView */] = MaterialGetBoxView;
        this._dataMulte[135 /* FireEyeLevelResultView */] = FireEyeLevelResultView;
        this._dataMulte[16 /* RankPanel */] = RankPanel;
        this._dataMulte[103 /* ClubBFRewardsPanel */] = ClubBFRewardsPanel;
        this._dataMulte[137 /* WorldLevelView */] = WorldLevelView;
        this._dataMulte[138 /* ClubLunjiantaiPanel */] = ClubLunjiantaiPanel;
        this._dataMulte[139 /* JuyuanItem */] = JuyuanItem;
        this._dataMulte[140 /* JuyuanResultView */] = JuyuanResultView;
        this._dataMulte[142 /* DevilResultView */] = DevilResultView;
        this._dataMulte[143 /* DevilGrabListView */] = DevilGrabListView;
        this._dataMulte[146 /* MarketSaleNotesView */] = MarketSaleNotesView;
        this._dataMulte[147 /* StarUpExplainView */] = StarUpExplainView;
        this._dataMulte[148 /* DevilRuleView */] = DevilRuleView;
        this._dataMulte[149 /* MarketSaleTipsView */] = MarketSaleTipsView;
        this._dataMulte[150 /* MarketBuyTipsView */] = MarketBuyTipsView;
        this._dataMulte[151 /* MarketRecycleTipsView */] = MarketRecycleTipsView;
        this._dataMulte[152 /* MaterialWarningView */] = MaterialWarningView;
        this._dataMulte[153 /* DevilRollDiceView */] = DevilRollDiceView;
        this._dataMulte[155 /* DevilGrabEff */] = DevilGrabEff;
        this._dataMulte[156 /* Sysprivilege_ExperienceView */] = Sysprivilege_ExperienceView;
        //单开界面
        this._dataSingle[10 /* ActivityPanel */] = ActivityPanel;
        this._dataSingle[11 /* BagPanel */] = BagPanel;
        this._dataSingle[14 /* MailPanel */] = MailPanel;
        this._dataSingle[12 /* EquipPanel */] = EquipPanel;
        this._dataSingle[13 /* FriendPanel */] = FriendPanel;
        this._dataSingle[15 /* MapPanel */] = MapPanel;
        this._dataSingle[17 /* RolePanel */] = RolePanel;
        this._dataSingle[30 /* BossPanel */] = BossPanel;
        this._dataSingle[18 /* ShopPanel */] = ShopPanel;
        this._dataSingle[19 /* SkillPanel */] = SkillPanel;
        this._dataSingle[37 /* ReinPanel */] = ReinPanel;
        this._dataSingle[38 /* ClubPanel */] = ClubPanel;
        this._dataSingle[102 /* ClubBFChallengePanel */] = ClubBFChallengePanel;
        this._dataSingle[41 /* RenameView */] = RenameView;
        this._dataSingle[51 /* VipPanel */] = VipPanel;
        this._dataSingle[77 /* SysChargePanel */] = SysChargePanel;
        this._dataSingle[76 /* FirstChargeView */] = FirstChargeView;
        this._dataSingle[80 /* SysNoticePanel */] = SysNoticePanel;
        this._dataSingle[73 /* SysPrivilegePane */] = SysPrivilegePane;
        this._dataSingle[82 /* ChuangongAwardView */] = ChuangongAwardView;
        this._dataSingle[83 /* ChuangongScussView */] = ChuangongScussView;
        this._dataSingle[84 /* CashCowPanel */] = CashCowPanel;
        this._dataSingle[88 /* RechargeActivityPanel */] = RechargeActivityPanel;
        this._dataSingle[110 /* ArtifactPanel */] = ArtifactPanel;
        this._dataSingle[93 /* ClubBFPanel */] = ClubBFPanel;
        this._dataSingle[121 /* TowerCopyPanel */] = TowerCopyPanel;
        this._dataSingle[122 /* CopySilverPanel */] = CopySilverPanel;
        this._dataSingle[123 /* CopyExpPanel */] = CopyExpPanel;
        this._dataSingle[128 /* MaterialPanel */] = MaterialPanel;
        this._dataSingle[130 /* DailyRebateView */] = DailyRebateView;
        this._dataSingle[131 /* SharePanel */] = SharePanel;
        this._dataSingle[134 /* SrvRankPanel */] = SrvRankPanel;
        this._dataSingle[136 /* FireEyePanel */] = FireEyePanel;
        this._dataSingle[141 /* DevilPanel */] = DevilPanel;
        this._dataSingle[144 /* MarketPanel */] = MarketPanel;
        this._dataSingle[145 /* GfgPanel */] = GfgPanel;
        this._dataSingle[154 /* StrongHoldPanel */] = StrongHoldPanel;
    };
    ViewManager.prototype.show = function (id) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var cls = this._dataSingle[id];
        var needModal = (!!this._dataModal[id]);
        var needModal2 = (!!cls) && egret.Capabilities.isMobile;
        if (this.isOpening(id)) {
            this._opens[id].show.apply(this._opens[id], args);
            return;
        }
        if (needModal && !needModal2) {
            if (!this._modal) {
                this._modal = Manager.pool.create(DarkView2, false);
                this.setModalAlpha(0.8);
            }
            this._modalDic[id] = true;
        }
        if (needModal2) {
            if (!this._modal2) {
                this._modal2 = Manager.pool.create(DarkView2, true);
            }
            ObjectUtil.remove(Manager.layer.mapLayer);
            // ObjectUtil.remove(Manager.layer.uiLayer_home);
        }
        if (!!cls) {
            for (var key in this._opens) {
                if (!!this._dataSingle[key])
                    this.hide(Number(key));
            }
        }
        else
            cls = this._dataMulte[id];
        var view = new cls();
        this._opens[id] = view;
        view.show.apply(view, args);
        return view;
    };
    ViewManager.prototype.isOpening = function (id) {
        return !!this._opens[id];
    };
    ViewManager.prototype.getView = function (id) {
        return this._opens[id] ? this._opens[id] : null;
    };
    ViewManager.prototype.setModalAlpha = function (alpha) {
        if (alpha === void 0) { alpha = 0.8; }
        if (this._modal)
            this._modal.setAlpha(alpha);
    };
    ViewManager.prototype.hide = function (id) {
        if (this._opens[id]) {
            this._opens[id].hide();
            delete this._opens[id];
        }
        if (!!this._modalDic[id] && !!this._modal) {
            delete this._modalDic[id];
            var hasModal = false;
            for (var key in this._modalDic) {
                if (this._modalDic[key] != null) {
                    hasModal = true;
                    break;
                }
            }
            if (!hasModal) {
                Manager.pool.push(this._modal);
                this._modal = null;
            }
        }
        var cls = this._dataSingle[id];
        var needHideModal2 = (!!cls) && egret.Capabilities.isMobile;
        if (needHideModal2) {
            if (this._modal2) {
                Manager.pool.push(this._modal2);
                this._modal2 = null;
            }
            if (Manager.layer.mapLayer.parent == null)
                Manager.global.gameMain.addChildAt(Manager.layer.mapLayer, 0 /* mapLayer */);
            if (Manager.layer.uiLayer.parent == null)
                Manager.global.gameMain.addChildAt(Manager.layer.uiLayer, 16 /* uiLayer */);
            if (Manager.layer.uiImageLayer.parent == null)
                Manager.global.gameMain.addChildAt(Manager.layer.uiImageLayer, 13 /* uiImageLayer */);
            if (Manager.layer.iconImageLayer.parent == null)
                Manager.global.gameMain.addChildAt(Manager.layer.iconImageLayer, 10 /* iconImageLayer */);
        }
    };
    return ViewManager;
}());
//# sourceMappingURL=ViewManager.js.map