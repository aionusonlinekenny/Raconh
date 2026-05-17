/**
 * 新手引导model
 * luzh
 * 17.11.14
 */
var GuideModel = /** @class */ (function () {
    function GuideModel() {
    }
    Object.defineProperty(GuideModel.prototype, "curID", {
        get: function () { return this._curID; },
        set: function (value) {
            if (this._curID == value)
                return;
            this._curID = value;
            this.guideByID();
        },
        enumerable: true,
        configurable: true
    });
    GuideModel.prototype.guideByID = function () {
        var view;
        switch (this._curID) {
            case GuideID.TASK_NORMAL:
            case GuideID.TASK:
                if (Manager.model.getTask().isAutoTask) {
                    this._curID = 0;
                    break;
                }
                Manager.control.getTask().showGuide(Manager.model.getLogin().home.getGlobalPos(HomeView2.TASK), 150, 125, this.taskCB, this, this._curID == GuideID.TASK ? true : false);
                break;
            case GuideID.SYS_NOTICE:
                if (Manager.view.isOpening(80 /* SysNoticePanel */)) {
                    Manager.view.hide(80 /* SysNoticePanel */);
                    this._curID = GuideID.SYS_NOTICE;
                }
                Manager.control.getTask().showGuide(Manager.model.getLogin().home.getGlobalPos(HomeView2.SYSNOTICE_ITEM), 105, 60, this.sysNoticeCB, this);
                break;
            case GuideID.PET_UPGRADE:
                if (Manager.view.isOpening(17 /* RolePanel */)) {
                    Manager.view.hide(17 /* RolePanel */);
                    this._curID = GuideID.PET_UPGRADE;
                }
                Manager.control.getTask().showGuide(Manager.model.getLogin().home.getGlobalPos(HomeView2.BAR, HomeView2.ROLE_POS), 50, 60, this.petUpgradeCB, this);
                break;
            case GuideID.RONG_LIAN:
                if (Manager.view.isOpening(11 /* BagPanel */)) {
                    Manager.view.hide(11 /* BagPanel */);
                    this._curID = GuideID.RONG_LIAN;
                }
                Manager.control.getTask().showGuide(Manager.model.getLogin().home.getGlobalPos(HomeView2.BAR, HomeView2.BAG_POS), 50, 60, this.ronglianCB, this);
                break;
            case GuideID.STRENTHEN:
                if (Manager.view.isOpening(12 /* EquipPanel */)) {
                    Manager.view.hide(12 /* EquipPanel */);
                    this._curID = GuideID.STRENTHEN;
                }
                Manager.control.getTask().showGuide(Manager.model.getLogin().home.getGlobalPos(HomeView2.BAR, HomeView2.EQUIP_POS), 50, 60, this.strenthenCB, this);
                break;
            case GuideID.GEM_INLAY:
                if (Manager.view.isOpening(12 /* EquipPanel */)) {
                    Manager.view.hide(12 /* EquipPanel */);
                    this._curID = GuideID.GEM_INLAY;
                }
                Manager.control.getTask().showGuide(Manager.model.getLogin().home.getGlobalPos(HomeView2.BAR, HomeView2.EQUIP_POS), 50, 60, this.gemInlayCB, this);
                break;
            case GuideID.CLUB_JOIN:
                if (Manager.view.isOpening(38 /* ClubPanel */)) {
                    Manager.view.hide(38 /* ClubPanel */);
                    this._curID = GuideID.CLUB_JOIN;
                }
                Manager.control.getTask().showGuide(Manager.model.getLogin().home.getGlobalPos(HomeView2.BAR, HomeView2.ZHONGMEN_POS), 50, 50, this.clubJoinCB, this);
                break;
            case GuideID.CLUB_DONATE:
                Manager.link.link(LinkType.VIEW_CLUB);
                break;
            case GuideID.SKILL_UPGRADE:
                if (Manager.view.isOpening(19 /* SkillPanel */)) {
                    Manager.view.hide(19 /* SkillPanel */);
                    this._curID = GuideID.SKILL_UPGRADE;
                }
                Manager.control.getTask().showGuide(Manager.model.getLogin().home.getGlobalPos(HomeView2.BAR, HomeView2.SKILL_POS), 50, 60, this.skillUpgradeCB, this);
                break;
            case GuideID.ARTIFACT:
                if (Manager.view.isOpening(110 /* ArtifactPanel */)) {
                    Manager.view.hide(110 /* ArtifactPanel */);
                    this._curID = GuideID.ARTIFACT;
                }
                Manager.control.getTask().showGuide(Manager.model.getLogin().home.getGlobalPos(HomeView2.TOP_ICON, ActIconID.ARTIFACT), 59, 59, this.artifactCB, this);
                break;
            case GuideID.JUEXUE_ACTIVE:
                if (Manager.view.isOpening(19 /* SkillPanel */)) {
                    Manager.view.hide(19 /* SkillPanel */);
                    this._curID = GuideID.JUEXUE_ACTIVE;
                }
                Manager.control.getTask().showGuide(Manager.model.getLogin().home.getGlobalPos(HomeView2.BAR, HomeView2.SKILL_POS), 50, 60, this.juexueCB, this);
                break;
            case GuideID.WEAR_EQUIP:
                if (Manager.view.isOpening(17 /* RolePanel */)) {
                    Manager.view.hide(17 /* RolePanel */);
                    this._curID = GuideID.WEAR_EQUIP;
                }
                Manager.control.getTask().showGuide(Manager.model.getLogin().home.getGlobalPos(HomeView2.BAR, HomeView2.ROLE_POS), 50, 60, this.wearEquipCB, this);
                break;
            case GuideID.RELIC_PIECE:
            case GuideID.RELIC_ACTIVE:
                var temp = this._curID;
                if (Manager.view.isOpening(37 /* ReinPanel */)) {
                    Manager.view.hide(37 /* ReinPanel */);
                    this._curID = temp;
                }
                Manager.control.getTask().showGuide(Manager.model.getLogin().home.getGlobalPos(HomeView2.MAIN_RELICE_STUFF), 100, 100, this.relicCB, this);
                break;
            case GuideID.AUTO_HOOK:
                Manager.control.getTask().showGuide(Manager.model.getLogin().home.getGlobalPos(HomeView2.TASK), 55, 25, this.autoCB, this);
                break;
            // case GuideID.MATERIAL:
            //     if(Manager.view.isOpening(ViewID.MaterialPanel))
            //     {
            //         Manager.view.hide(ViewID.MaterialPanel);
            //         this._curID = GuideID.MATERIAL;
            //     }
            //     Manager.control.getTask().showGuide(Manager.model.getLogin().home.getGlobalPos(HomeView2.RIGHT_ICON,ActIconID.MATERIAL), 60, 58, this.materialCB, this);
            //     break;
            case GuideID.YAN_WU:
                if (Manager.view.isOpening(10 /* ActivityPanel */)) {
                    Manager.view.hide(10 /* ActivityPanel */);
                    this._curID = GuideID.YAN_WU;
                }
                Manager.control.getTask().showGuide(Manager.model.getLogin().home.getGlobalPos(HomeView2.RIGHT_ICON, ActIconID.DAILY), 60, 58, this.yanwuCB, this);
                break;
            case GuideID.EXP_COPY:
                if (Manager.model.getCopy().curID != CopyConst.ID_EXP)
                    return;
                view = Manager.view.getView(70 /* CopyExpInfoView */);
                if (view != null)
                    view.setGuide();
                break;
            case GuideID.COIN_COPY:
                if (Manager.model.getCopy().curID != CopyConst.ID_SILVER)
                    return;
                view = Manager.view.getView(86 /* CopySilverInfoView */);
                if (view != null)
                    view.setGuide();
                break;
            default:
                break;
        }
    };
    GuideModel.prototype.taskCB = function () {
        Manager.model.getLogin().home.guide(HomeView2.TASK);
    };
    GuideModel.prototype.sysNoticeCB = function () {
        Manager.view.show(80 /* SysNoticePanel */);
    };
    GuideModel.prototype.petUpgradeCB = function () {
        Manager.view.show(17 /* RolePanel */);
    };
    GuideModel.prototype.ronglianCB = function () {
        Manager.link.link(LinkType.PANEL_BAG, 2);
    };
    GuideModel.prototype.strenthenCB = function () {
        Manager.link.link(LinkType.PANEL_EQUIP, 0);
    };
    GuideModel.prototype.gemInlayCB = function () {
        Manager.link.link(LinkType.PANEL_EQUIP, 1);
    };
    GuideModel.prototype.clubJoinCB = function () {
        Manager.link.link(LinkType.PANEL_CLUB);
        Manager.control.getTask().hideGuide();
        this._curID = GuideID.CLUB_JOIN;
    };
    GuideModel.prototype.skillUpgradeCB = function () {
        Manager.link.link(LinkType.PANEL_SKILL, 0);
    };
    GuideModel.prototype.artifactCB = function () {
        Manager.view.show(110 /* ArtifactPanel */);
    };
    GuideModel.prototype.juexueCB = function () {
        Manager.link.link(LinkType.PANEL_SKILL, 1);
    };
    GuideModel.prototype.wearEquipCB = function () {
        Manager.link.link(LinkType.PANEL_ROLE, 0);
    };
    GuideModel.prototype.relicCB = function () {
        Manager.link.link(LinkType.PANEL_REIN, 0);
    };
    GuideModel.prototype.autoCB = function () {
        Manager.model.getLogin().home.guide(HomeView2.TASK, "guideAutoHook");
        Manager.control.getTask().hideGuide();
    };
    GuideModel.prototype.materialCB = function () {
        Manager.link.link(LinkType.PANEL_MATERIAL);
    };
    GuideModel.prototype.yanwuCB = function () {
        Manager.link.link(LinkType.PANEL_ACTIVITY, 0);
    };
    return GuideModel;
}());
//# sourceMappingURL=GuideModel.js.map