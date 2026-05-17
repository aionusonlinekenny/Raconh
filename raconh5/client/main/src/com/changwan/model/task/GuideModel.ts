/**
 * 新手引导model
 * luzh
 * 17.11.14
 */
class GuideModel
{
    private _curID:number;//引导id

    public get curID():number{return this._curID;}
    public set curID(value:number)
    {
        if(this._curID == value) return;
        this._curID = value;
        this.guideByID();
    }

    private guideByID():void
    {
        let view:any;
        switch(this._curID)
        {
            case GuideID.TASK_NORMAL:
            case GuideID.TASK:
                if(Manager.model.getTask().isAutoTask)
                {
                    this._curID = 0;
                    break;
                }
                Manager.control.getTask().showGuide(Manager.model.getLogin().home.getGlobalPos(HomeView2.TASK), 150, 125, this.taskCB, this, this._curID == GuideID.TASK ? true : false);
                break;
            case GuideID.SYS_NOTICE:
                if(Manager.view.isOpening(ViewID.SysNoticePanel))
                {
                    Manager.view.hide(ViewID.SysNoticePanel);
                    this._curID = GuideID.SYS_NOTICE;
                }
                Manager.control.getTask().showGuide( Manager.model.getLogin().home.getGlobalPos(HomeView2.SYSNOTICE_ITEM), 105, 60, this.sysNoticeCB, this);
                break;
            case GuideID.PET_UPGRADE:
                if(Manager.view.isOpening(ViewID.RolePanel))
                {
                    Manager.view.hide(ViewID.RolePanel);
                    this._curID = GuideID.PET_UPGRADE;
                }
                Manager.control.getTask().showGuide(Manager.model.getLogin().home.getGlobalPos(HomeView2.BAR,HomeView2.ROLE_POS), 50, 60, this.petUpgradeCB, this);
                break;
            case GuideID.RONG_LIAN:
                if(Manager.view.isOpening(ViewID.BagPanel))
                {
                    Manager.view.hide(ViewID.BagPanel);
                    this._curID = GuideID.RONG_LIAN;
                }
               Manager.control.getTask().showGuide(Manager.model.getLogin().home.getGlobalPos(HomeView2.BAR,HomeView2.BAG_POS), 50, 60, this.ronglianCB, this);
                break;
            case GuideID.STRENTHEN:
                if(Manager.view.isOpening(ViewID.EquipPanel))
                {
                    Manager.view.hide(ViewID.EquipPanel);
                    this._curID = GuideID.STRENTHEN;
                }
                Manager.control.getTask().showGuide(Manager.model.getLogin().home.getGlobalPos(HomeView2.BAR,HomeView2.EQUIP_POS), 50, 60, this.strenthenCB, this);
                break;
            case GuideID.GEM_INLAY:
                if(Manager.view.isOpening(ViewID.EquipPanel))
                {
                    Manager.view.hide(ViewID.EquipPanel);
                    this._curID = GuideID.GEM_INLAY;
                }
                Manager.control.getTask().showGuide(Manager.model.getLogin().home.getGlobalPos(HomeView2.BAR,HomeView2.EQUIP_POS), 50, 60, this.gemInlayCB, this);
                break;
            case GuideID.CLUB_JOIN:
                if(Manager.view.isOpening(ViewID.ClubPanel))
                {
                    Manager.view.hide(ViewID.ClubPanel);
                    this._curID = GuideID.CLUB_JOIN;
                }
                Manager.control.getTask().showGuide(Manager.model.getLogin().home.getGlobalPos(HomeView2.BAR,HomeView2.ZHONGMEN_POS), 50, 50, this.clubJoinCB, this);
                break;
            case GuideID.CLUB_DONATE:
                Manager.link.link(LinkType.VIEW_CLUB);
                break;
            case GuideID.SKILL_UPGRADE:
                if(Manager.view.isOpening(ViewID.SkillPanel))
                {
                    Manager.view.hide(ViewID.SkillPanel);
                    this._curID = GuideID.SKILL_UPGRADE;
                }
                Manager.control.getTask().showGuide(Manager.model.getLogin().home.getGlobalPos(HomeView2.BAR,HomeView2.SKILL_POS), 50, 60, this.skillUpgradeCB, this);
                break;
            case GuideID.ARTIFACT:
                if(Manager.view.isOpening(ViewID.ArtifactPanel))
                {
                    Manager.view.hide(ViewID.ArtifactPanel);
                    this._curID = GuideID.ARTIFACT;
                }
                Manager.control.getTask().showGuide(Manager.model.getLogin().home.getGlobalPos(HomeView2.TOP_ICON,ActIconID.ARTIFACT), 59, 59, this.artifactCB, this);
                break;
            case GuideID.JUEXUE_ACTIVE:
                if(Manager.view.isOpening(ViewID.SkillPanel))
                {
                    Manager.view.hide(ViewID.SkillPanel);
                    this._curID = GuideID.JUEXUE_ACTIVE;
                }
                Manager.control.getTask().showGuide(Manager.model.getLogin().home.getGlobalPos(HomeView2.BAR,HomeView2.SKILL_POS), 50, 60, this.juexueCB, this);
                break;
            case GuideID.WEAR_EQUIP:
                if(Manager.view.isOpening(ViewID.RolePanel))
                {
                    Manager.view.hide(ViewID.RolePanel);
                    this._curID = GuideID.WEAR_EQUIP;
                }
                Manager.control.getTask().showGuide(Manager.model.getLogin().home.getGlobalPos(HomeView2.BAR,HomeView2.ROLE_POS), 50, 60, this.wearEquipCB, this);
                break;
            case GuideID.RELIC_PIECE:
            case GuideID.RELIC_ACTIVE:
                let temp = this._curID;
                if(Manager.view.isOpening(ViewID.ReinPanel))
                {
                    Manager.view.hide(ViewID.ReinPanel);
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
                if(Manager.view.isOpening(ViewID.ActivityPanel))
                {
                    Manager.view.hide(ViewID.ActivityPanel);
                    this._curID = GuideID.YAN_WU;
                }
                Manager.control.getTask().showGuide(Manager.model.getLogin().home.getGlobalPos(HomeView2.RIGHT_ICON,ActIconID.DAILY), 60, 58, this.yanwuCB, this);
                break;
            case GuideID.EXP_COPY:
                if(Manager.model.getCopy().curID != CopyConst.ID_EXP) return;
                view = Manager.view.getView(ViewID.CopyExpInfoView) as CopyExpInfoView;
                if(view != null) view.setGuide();
                break;
            case GuideID.COIN_COPY:
                if(Manager.model.getCopy().curID != CopyConst.ID_SILVER) return;
                view = Manager.view.getView(ViewID.CopySilverInfoView) as CopySilverInfoView;
                if(view != null) view.setGuide();
                break;
            default:
                break;
        }
    }

    private taskCB():void
    {
        Manager.model.getLogin().home.guide(HomeView2.TASK)
    }

    private sysNoticeCB():void
    {
        Manager.view.show(ViewID.SysNoticePanel);
    }

    private petUpgradeCB():void
    {
        Manager.view.show(ViewID.RolePanel);
    }

    private ronglianCB():void
    {
        Manager.link.link(LinkType.PANEL_BAG, 2);
    }

    private strenthenCB():void
    {
        Manager.link.link(LinkType.PANEL_EQUIP, 0);
    }

    private gemInlayCB():void
    {
        Manager.link.link(LinkType.PANEL_EQUIP, 1);
    }

    private clubJoinCB():void
    {
        Manager.link.link(LinkType.PANEL_CLUB);
        Manager.control.getTask().hideGuide();
        this._curID = GuideID.CLUB_JOIN;
    }

    private skillUpgradeCB():void
    {
        Manager.link.link(LinkType.PANEL_SKILL, 0);
    }

    private artifactCB():void
    {
        Manager.view.show(ViewID.ArtifactPanel);
    }

    private juexueCB():void
    {
        Manager.link.link(LinkType.PANEL_SKILL, 1);
    }

    private wearEquipCB():void
    {
        Manager.link.link(LinkType.PANEL_ROLE, 0);
    }

    private relicCB():void
    {
        Manager.link.link(LinkType.PANEL_REIN, 0);
    }

    private autoCB():void
    {
        Manager.model.getLogin().home.guide(HomeView2.TASK,"guideAutoHook");
        Manager.control.getTask().hideGuide();
    }

    private materialCB():void
    {
        Manager.link.link(LinkType.PANEL_MATERIAL);
    }

    private yanwuCB():void
    {
        Manager.link.link(LinkType.PANEL_ACTIVITY, 0);
    }
}