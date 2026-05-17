/**
 * 视图管理器,只有注册了的视图才可以通过管理器打开
 * devil 2017-11-23
 */
class ViewManager
{
    private _opens:any;
    private _dataModal:any;//模态视图
    private _dataMulte:any;//多开视图
    private _dataSingle:any;//单开视图，一般是系统面板
    private _modal:DarkView2;
    private _modal2:DarkView2;
    private _modalDic:any;
    public constructor()
    {
        this._opens = {};
        this._dataModal = {};
        this._dataMulte = {};
        this._dataSingle = {};
        this._modalDic = {};
        this.initData();
    }

    private initData():void
    {
        //模态界面
        this._dataModal[ViewID.ReviveCDView] = true;
        this._dataModal[ViewID.ClubBF1v1Result] = true;
        this._dataModal[ViewID.ClubBFResult] = true;
        this._dataModal[ViewID.DialogView2] = true;
        this._dataModal[ViewID.MaterialSecondView] = true;
        this._dataModal[ViewID.CopyResultWin] = true;
        this._dataModal[ViewID.CopyExpResultView] = true;
        this._dataModal[ViewID.CopySilverResultView] = true;
        this._dataModal[ViewID.DevilResultView] = true;
        this._dataModal[ViewID.FireEyeLevelResultView] = true;
        this._dataModal[ViewID.ClubLeaderWarMatchingView] = true;
        this._dataModal[ViewID.OfflineProfitView] = true;
        this._dataModal[ViewID.ChuangongScussView] = true;
        this._dataModal[ViewID.BossResultWin] = true;
        this._dataModal[ViewID.CopyResultFail] = true;
        this._dataModal[ViewID.TowerCopyWinView] = true;
        this._dataModal[ViewID.TowerCopyWinView] = true;
        this._dataModal[ViewID.CopyRankView] = true;
        this._dataModal[ViewID.ItemsTips] = true;
        this._dataModal[ViewID.ClubCareerView] = true;
        this._dataModal[ViewID.TipsView] = true;
        this._dataModal[ViewID.CountDownTool] = true;
        this._dataModal[ViewID.ArenaResultView] = true;
        this._dataModal[ViewID.LandlordResultWin] = true;
        this._dataModal[ViewID.LandlordResultFail] = true;
        this._dataModal[ViewID.ClubLeaderWarResultView] = true;
        this._dataModal[ViewID.RollingWordsView] = true;
        this._dataModal[ViewID.ItemUseResultWin] = true;
        this._dataModal[ViewID.JuyuanResultView] = true;
        this._dataModal[ViewID.LifeGridHunResultWin] = true;
        this._dataModal[ViewID.ArenaMaxAwardView] = true;
        this._dataModal[ViewID.CopyExpAddRateView] = true;
        this._dataModal[ViewID.ArenaLogView] = true;
        this._dataModal[ViewID.ArenaAwardView] = true;
        this._dataModal[ViewID.ArtifactRewardView] = true;
        this._dataModal[ViewID.ArtifactInfoListView] = true;
        this._dataModal[ViewID.BagEquipTips] = true;
        this._dataModal[ViewID.ChuangongAwardView] = true;
        this._dataModal[ViewID.ClubJoinTipsView] = true;
        this._dataModal[ViewID.ClubEditNoticeView] = true;
        this._dataModal[ViewID.ClubView] = true;
        this._dataModal[ViewID.ClubCareerView] = true;
        this._dataModal[ViewID.ClubBFExplainView] = true;
        this._dataModal[ViewID.TextTips] = true;
        this._dataModal[ViewID.ClubLeaderWarRankView] = true;
        this._dataModal[ViewID.ClubLeaderWarMemberView] = true;
        this._dataModal[ViewID.TowerCopyBossView] = true;
        this._dataModal[ViewID.DevilRuleView] = true;
        this._dataModal[ViewID.GemAttrTips] = true;
        this._dataModal[ViewID.StarUpExplainView] = true;
        this._dataModal[ViewID.SuitAllAttrView] = true;
        this._dataModal[ViewID.SuitDisassemblyTips] = true;
        this._dataModal[ViewID.ZhuhunUpgrade] = true;
        this._dataModal[ViewID.ZhuhunAttrTips] = true;
        this._dataModal[ViewID.FriendsConfirmView] = true;
        this._dataModal[ViewID.FriendsBatchDelView] = true;
        this._dataModal[ViewID.FriendsChatView] = true;
        this._dataModal[ViewID.FirstChargeView] = true;
        this._dataModal[ViewID.RenameView] = true;
        this._dataModal[ViewID.JingmaiCondView] = true;
        this._dataModal[ViewID.JuyuanItem] = true;
        this._dataModal[ViewID.LandlordInteractView] = true;
        this._dataModal[ViewID.LandlordPressView] = true;
        this._dataModal[ViewID.ServerSelectView] = true;
        this._dataModal[ViewID.MailContentView] = true;
        this._dataModal[ViewID.MailAllFetchView] = true;
        this._dataModal[ViewID.MarketBuyTipsView] = true;
        this._dataModal[ViewID.MarketSaleTipsView] = true;
        this._dataModal[ViewID.MarketRecycleTipsView] = true;
        this._dataModal[ViewID.MarketSaleNotesView] = true;
        this._dataModal[ViewID.MaterialGetBoxView] = true;
        this._dataModal[ViewID.PetSkillView] = true;
        this._dataModal[ViewID.PetFeedView] = true;
        this._dataModal[ViewID.ReinSuccView] = true;
        this._dataModal[ViewID.RelicStuffAttrView] = true;
        this._dataModal[ViewID.RelicStuffCuccessView] = true;
        this._dataModal[ViewID.RoleAttrView] = true;
        this._dataModal[ViewID.WorldLevelView] = true;
        this._dataModal[ViewID.ShopBuyView] = true;
        this._dataModal[ViewID.LifeGridFuseView] = true;
        this._dataModal[ViewID.LifeGridBagView] = true;
        this._dataModal[ViewID.LifeGridListView] = true;
        this._dataModal[ViewID.Sysprivilege_ExperienceView] = true;
        //多开界面
        this._dataMulte[ViewID.BackgroundNoticeView] = BackgroundNoticeView;
        this._dataMulte[ViewID.FriendsBatchDelView] = FriendsBatchDelView;
        this._dataMulte[ViewID.MailAllFetchView] = MailAllFetchView;
        this._dataMulte[ViewID.SkillGainNewView] = SkillGainNewView;
        this._dataMulte[ViewID.MailContentView] = MailContentView;
        this._dataMulte[ViewID.FriendsChatView] = FriendsChatView;
        this._dataMulte[ViewID.ZhuhunAttrTips] = ZhuhunAttrTips;
        this._dataMulte[ViewID.ZhuhunUpgrade] = ZhuhunUpgrade;
        this._dataMulte[ViewID.GemAttrTips] = GemAttrTips;
        this._dataMulte[ViewID.ItemsTips] = ItemsTips;
        this._dataMulte[ViewID.BagEquipTips] = BagEquipTips;
        this._dataMulte[ViewID.RoleAttrView] = RoleAttrView;
        this._dataMulte[ViewID.TipsView] = TipsView;
        this._dataMulte[ViewID.TextTips] = TextTips;
        this._dataMulte[ViewID.CopyInfoView] = CopyInfoView;
        this._dataMulte[ViewID.CopyRankView] = CopyRankView;
        this._dataMulte[ViewID.CopyResultFail] = CopyResultFail;
        this._dataMulte[ViewID.CopyResultWin] = CopyResultWin;
        this._dataMulte[ViewID.BossResultWin] = BossResultWin;
        this._dataMulte[ViewID.BossReviveView] = BossReviveView;
        this._dataMulte[ViewID.BossEnemyView] = BossEnemyView;
        this._dataMulte[ViewID.ShopBuyView] = ShopBuyView;
        this._dataMulte[ViewID.ReviveCDView] = ReviveCDView;
        this._dataMulte[ViewID.ReviveChooseView] = ReviveChooseView;
        this._dataMulte[ViewID.BossBloodStrip] = BossBloodStrip2;
        this._dataMulte[ViewID.ServerSelectView] = ServerSelectView;
        this._dataMulte[ViewID.JingmaiCondView] = JingmaiCondView;
        this._dataMulte[ViewID.ClubJoinTipsView] = ClubJoinTipsView;
        this._dataMulte[ViewID.ClubView] = ClubView;
        this._dataMulte[ViewID.ReinSuccView] = ReinSuccView;
        this._dataMulte[ViewID.ClubCareerView] = ClubCareerView;
        this._dataMulte[ViewID.EquipTips] = EquipTips;
        this._dataMulte[ViewID.PetFeedView] = PetFeedView;
        this._dataMulte[ViewID.PetSkillView] = PetSkillView;
        this._dataMulte[ViewID.LifeGridListView] = LifeGridListView;
        this._dataMulte[ViewID.ArenaResultView] = ArenaResultView;
        this._dataMulte[ViewID.ArenaLogView] = ArenaLogView;
        this._dataMulte[ViewID.ArenaAwardView] = ArenaAwardView;
        this._dataMulte[ViewID.ArenaPKHeadView] = ArenaPKHeadView;
        this._dataMulte[ViewID.ArenaJumpBtnView] = ArenaJumpBtnView;
        this._dataMulte[ViewID.ArenaMaxAwardView] = ArenaMaxAwardView;
        this._dataMulte[ViewID.SysNoticeNewSystemView] = SysNoticeNewSystemView;
        this._dataMulte[ViewID.ClubEditNoticeView] = ClubEditNoticeView;
        this._dataMulte[ViewID.LoginView] = LoginView;
        this._dataMulte[ViewID.CreateRoleView] = CreateRoleView;
        this._dataMulte[ViewID.OfflineProfitView] = OfflineProfitView;
        this._dataMulte[ViewID.LifeGridBagView] = LifeGridBagView;
        this._dataMulte[ViewID.LifeGridFuseView] = LifeGridFuseView;
        this._dataMulte[ViewID.LifeGridLeveUpView] = LifeGridLeveUpView;
		this._dataMulte[ViewID.TowerCopyWinView] = TowerCopyWinView;
        this._dataMulte[ViewID.TowerCopyBossView] = TowerCopyBossView;
        this._dataMulte[ViewID.CopyExpInfoView] = CopyExpInfoView;
        this._dataMulte[ViewID.CopyExpAddRateView] = CopyExpAddRateView;
        this._dataMulte[ViewID.CopyExpResultView] = CopyExpResultView;
        this._dataMulte[ViewID.CopyWaveView] = CopyWaveView;
        this._dataMulte[ViewID.CopyCountDownView] = CopyCountDownView;
        this._dataMulte[ViewID.CopyBuffUnlockView] = CopyBuffUnlockView;
        this._dataMulte[ViewID.CopySilverInfoView] = CopySilverInfoView;
        this._dataMulte[ViewID.CopySilverResultView] = CopySilverResultView;
        this._dataMulte[ViewID.ClubBFExplainView] = ClubBFExplainView;
        this._dataMulte[ViewID.ClubBFClearCDView] = ClubBFClearCDView;
        this._dataMulte[ViewID.ClubBFBuyBuffView] = ClubBFBuyBuffView;
        this._dataMulte[ViewID.ClubBFAttackBuffView] = ClubBFAttackBuffView;
        this._dataMulte[ViewID.ClubBF1v1Result] = ClubBF1v1Result;
        this._dataMulte[ViewID.ClubBFResult] = ClubBFResult;
        this._dataMulte[ViewID.ClubBFMiniView] = ClubBFMiniView;
        this._dataMulte[ViewID.ClubBFClearCDBtn] = ClubBFClearCDBtn;
        this._dataMulte[ViewID.SwitchSceneAni] = SwitchSceneAni;
        this._dataMulte[ViewID.LifeGridHunResultWin] = LifeGridHunResultWin;
        this._dataMulte[ViewID.ItemUseResultWin] = ItemUseResultWin;
        this._dataMulte[ViewID.CountDownTool] = CountDownTool;
        this._dataMulte[ViewID.UseItemsTips] = UseItemsTips;
        this._dataMulte[ViewID.SuitAllAttrView] = SuitAllAttrView;
        this._dataMulte[ViewID.FriendsConfirmView] = FriendsConfirmView;
        this._dataMulte[ViewID.SuitDisassemblyTips] = SuitDisassemblyTips;
        this._dataMulte[ViewID.ChuangongView] = ChuangongView;
        this._dataMulte[ViewID.LandlordResultWin] = LandlordResultWin;
        this._dataMulte[ViewID.LandlordInteractView] = LandlordInteractView;
        this._dataMulte[ViewID.LandlordPressView] = LandlordPressView;
        this._dataMulte[ViewID.LandlordResultFail] = LandlordResultFail;
        this._dataMulte[ViewID.ClubLeaderWarMemberView] = ClubLeaderWarMemberView;
        this._dataMulte[ViewID.ClubLeaderWarMatchingView] = ClubLeaderWarMatchingView;
        this._dataMulte[ViewID.ClubLeaderWarRankView] = ClubLeaderWarRankView;
        this._dataMulte[ViewID.ClubLeaderWarResultView] = ClubLeaderWarResultView;
        this._dataMulte[ViewID.ClubLeaderWarLeaderRankView] = ClubLeaderWarLeaderRankView;
		this._dataMulte[ViewID.ArtifactRewardView] = ArtifactRewardView;
        this._dataMulte[ViewID.ArtifactInfoListView] = ArtifactInfoListView;
        this._dataMulte[ViewID.DialogView2] = DialogView2;
        this._dataMulte[ViewID.LifeGridUnLockedView] = LifeGridUnLockedView;
        this._dataMulte[ViewID.ShopPanelMulte] = ShopPanel;
        this._dataMulte[ViewID.PlayerBloodStrip] = PlayerBloodStrip2;
        this._dataMulte[ViewID.CloudTransferEffect] = CloudTransferEffect;
        this._dataMulte[ViewID.RollTips] = RollTips2;
        this._dataMulte[ViewID.MapNameEffect] = MapNameEffect;
        this._dataMulte[ViewID.RelicStuffAttrView] = RelicStuffAttrView;
        this._dataMulte[ViewID.RelicStuffCuccessView] = RelicStuffCuccessView;
        this._dataMulte[ViewID.SkillIconFlyEffect] = SkillIconFlyEffect;
        this._dataMulte[ViewID.RollingWordsView] = RollingWordsView;
        this._dataMulte[ViewID.MaterialSecondView] = MaterialSecondView;
        this._dataMulte[ViewID.CollectEffect] = CollectEffect;
        this._dataMulte[ViewID.MaterialGetBoxView] = MaterialGetBoxView;
        this._dataMulte[ViewID.FireEyeLevelResultView] = FireEyeLevelResultView;
        this._dataMulte[ViewID.RankPanel] = RankPanel;
        this._dataMulte[ViewID.ClubBFRewardsPanel] = ClubBFRewardsPanel;
        this._dataMulte[ViewID.WorldLevelView] = WorldLevelView;
        this._dataMulte[ViewID.ClubLunjiantaiPanel] = ClubLunjiantaiPanel;
        this._dataMulte[ViewID.JuyuanItem] = JuyuanItem;
        this._dataMulte[ViewID.JuyuanResultView] = JuyuanResultView;
        this._dataMulte[ViewID.DevilResultView] = DevilResultView;
        this._dataMulte[ViewID.DevilGrabListView] = DevilGrabListView;
        this._dataMulte[ViewID.MarketSaleNotesView] = MarketSaleNotesView;
        this._dataMulte[ViewID.StarUpExplainView] = StarUpExplainView;
        this._dataMulte[ViewID.DevilRuleView] = DevilRuleView;
        this._dataMulte[ViewID.MarketSaleTipsView] = MarketSaleTipsView;
        this._dataMulte[ViewID.MarketBuyTipsView] = MarketBuyTipsView;
        this._dataMulte[ViewID.MarketRecycleTipsView] = MarketRecycleTipsView;
        this._dataMulte[ViewID.MaterialWarningView] = MaterialWarningView;
        this._dataMulte[ViewID.DevilRollDiceView] = DevilRollDiceView;
        this._dataMulte[ViewID.DevilGrabEff] = DevilGrabEff;        this._dataMulte[ViewID.Sysprivilege_ExperienceView] = Sysprivilege_ExperienceView;
        
        //单开界面
        this._dataSingle[ViewID.ActivityPanel] = ActivityPanel;
        this._dataSingle[ViewID.BagPanel] = BagPanel;
        this._dataSingle[ViewID.MailPanel] = MailPanel;
        this._dataSingle[ViewID.EquipPanel] = EquipPanel;
        this._dataSingle[ViewID.FriendPanel] = FriendPanel;
        this._dataSingle[ViewID.MapPanel] = MapPanel;
        this._dataSingle[ViewID.RolePanel] = RolePanel;
        this._dataSingle[ViewID.BossPanel] = BossPanel;
        this._dataSingle[ViewID.ShopPanel] = ShopPanel;
        this._dataSingle[ViewID.SkillPanel] = SkillPanel;
        this._dataSingle[ViewID.ReinPanel] = ReinPanel;
        this._dataSingle[ViewID.ClubPanel] = ClubPanel;
        this._dataSingle[ViewID.ClubBFChallengePanel] = ClubBFChallengePanel;
        this._dataSingle[ViewID.RenameView] = RenameView;
        this._dataSingle[ViewID.VipPanel] = VipPanel;
        this._dataSingle[ViewID.SysChargePanel] = SysChargePanel;
        this._dataSingle[ViewID.FirstChargeView] = FirstChargeView;
        this._dataSingle[ViewID.SysNoticePanel] = SysNoticePanel;
        this._dataSingle[ViewID.SysPrivilegePane] = SysPrivilegePane;
        this._dataSingle[ViewID.ChuangongAwardView] = ChuangongAwardView;
        this._dataSingle[ViewID.ChuangongScussView] = ChuangongScussView;
        this._dataSingle[ViewID.CashCowPanel] = CashCowPanel;
        this._dataSingle[ViewID.RechargeActivityPanel] = RechargeActivityPanel;
        this._dataSingle[ViewID.ArtifactPanel] = ArtifactPanel;
        this._dataSingle[ViewID.ClubBFPanel] = ClubBFPanel;
        this._dataSingle[ViewID.TowerCopyPanel] = TowerCopyPanel;
        this._dataSingle[ViewID.CopySilverPanel] = CopySilverPanel;
        this._dataSingle[ViewID.CopyExpPanel] = CopyExpPanel;
        this._dataSingle[ViewID.MaterialPanel] = MaterialPanel;
        this._dataSingle[ViewID.DailyRebateView] = DailyRebateView;
        this._dataSingle[ViewID.SharePanel] = SharePanel;
        this._dataSingle[ViewID.SrvRankPanel] = SrvRankPanel;
        this._dataSingle[ViewID.FireEyePanel] = FireEyePanel;
        this._dataSingle[ViewID.DevilPanel] = DevilPanel;
        this._dataSingle[ViewID.MarketPanel] = MarketPanel;
        this._dataSingle[ViewID.GfgPanel] = GfgPanel;
        this._dataSingle[ViewID.StrongHoldPanel] = StrongHoldPanel;
    }

    public show(id:ViewID,...args:any[]):any
    {
        let cls = this._dataSingle[id];
        let needModal:boolean = (!!this._dataModal[id]);
        let needModal2:boolean = (!!cls) && egret.Capabilities.isMobile;
        if(this.isOpening(id))
        {
            this._opens[id].show.apply(this._opens[id],args);
            return;
        }
        if(needModal && !needModal2)
        {
            if(!this._modal)
            {
                this._modal = Manager.pool.create(DarkView2, false);
                this.setModalAlpha(0.8);
            }
            this._modalDic[id] = true;
        }
        if(needModal2)
        {
            if(!this._modal2)
            {
                this._modal2 = Manager.pool.create(DarkView2, true);
            }
            ObjectUtil.remove(Manager.layer.mapLayer);
            // ObjectUtil.remove(Manager.layer.uiLayer_home);
        }
        if(!!cls)
        {
            for(let key in this._opens)
            {
                if(!!this._dataSingle[key])this.hide(Number(key));
            }
        }
        else cls = this._dataMulte[id];
        let view:IViewManager = new cls();
        this._opens[id] = view;
        view.show.apply(view,args);
        return view;
    }

    public isOpening(id:ViewID):boolean
    {
        return !!this._opens[id];
    }

    public getView(id:ViewID):IViewManager
    {
        return this._opens[id] ? this._opens[id] : null;
    }

    public setModalAlpha(alpha:number=0.8):void
    {
        if(this._modal) this._modal.setAlpha(alpha);
    }

    public hide(id:ViewID):void
    {
        if(this._opens[id])
        {
            this._opens[id].hide();
            delete this._opens[id];
        }
        if(!!this._modalDic[id] && !!this._modal)
        {
            delete this._modalDic[id];
            let hasModal:boolean = false;
            for(let key in this._modalDic)
            {
                if(this._modalDic[key] != null)
                {
                    hasModal = true;
                    break;
                }
            }
            if(!hasModal)
            {
                Manager.pool.push(this._modal);
                this._modal = null;
            }
        }
        let cls = this._dataSingle[id];
        let needHideModal2:boolean = (!!cls) && egret.Capabilities.isMobile;
        if(needHideModal2)
        {
            if(this._modal2)
            {
                Manager.pool.push(this._modal2);
                this._modal2 = null;
            }
            if(Manager.layer.mapLayer.parent == null) Manager.global.gameMain.addChildAt(Manager.layer.mapLayer, LayerIndex.mapLayer);
            if(Manager.layer.uiLayer.parent == null) Manager.global.gameMain.addChildAt(Manager.layer.uiLayer, LayerIndex.uiLayer);
            if(Manager.layer.uiImageLayer.parent == null) Manager.global.gameMain.addChildAt(Manager.layer.uiImageLayer, LayerIndex.uiImageLayer);
            if(Manager.layer.iconImageLayer.parent == null) Manager.global.gameMain.addChildAt(Manager.layer.iconImageLayer, LayerIndex.iconImageLayer);
        }
    }
}