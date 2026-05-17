var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 宗门建筑
 * Simon
 * 2017.12.14
 */
var ClubBuildView = /** @class */ (function (_super) {
    __extends(ClubBuildView, _super);
    function ClubBuildView() {
        var _this = _super.call(this) || this;
        _this._showViewId = -1;
        _this._txtWidth = 0;
        _this.skinName = Manager.path.getSkinName("club", "ClubBuildViewSkin");
        _this.touchChildren = true;
        return _this;
    }
    ClubBuildView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.touchEnabled = true;
        this._clubInfo = Manager.model.getClub().clubInfo;
        this._back0.load(PathInfo.getPath("res/club/club_buildingBg0.jpg", LoaderType.IMAGE));
        this._back1.load(PathInfo.getPath("res/club/club_buildingBg1.jpg", LoaderType.IMAGE));
        if (!this._gonggaoSp) {
            this._gonggaoSp = Manager.pool.create(egret.Shape);
            this._gonggaoSp.graphics.beginFill(0, 1);
            this._gonggaoSp.graphics.drawRect(0, 0, 400, 41);
            this._gonggaoSp.graphics.endFill();
            this._gonggaoSp.x = this._ggBg.x;
            this._gonggaoSp.y = this._ggBg.y;
            this.addChild(this._gonggaoSp);
            this._gonggao.mask = this._gonggaoSp;
        }
        this._gonggao.text = LangCVO.getContent("club15");
        this._gonggao.cacheAsBitmap = true;
        this.updateArenaMaxAward(null);
        this.onUpdataClubInfoHandler(null);
        this.updateTower(null);
        Manager.render.add(this.showNotice, this);
    };
    ClubBuildView.prototype.showNotice = function () {
        if (this._gonggao.x < 557 - 384 - this._txtWidth)
            this._gonggao.x = 557;
        else
            this._gonggao.x -= 1;
    };
    ClubBuildView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._editBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._gfgBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._clubHomeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._clubCareerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnActivity.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnClubBF.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._lunjiantaiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getClub().addEventListener(ClubEvent.UPDATE_CLUB_NOTICE, this.onUpdateClubNoticeHandler, this);
        Manager.model.getClub().addEventListener(ClubEvent.UPDATE_CLUB_INFO, this.onUpdataClubInfoHandler, this);
        Manager.model.getClub().addEventListener(ClubEvent.UPDATE_CLUB_CAREER, this.onUpdataClubInfoHandler, this);
        Manager.model.getClubBF().addEventListener(ClubBFEvent.SCORE_UPDATE, this.updateClubBFRewards, this);
        Manager.model.getClubBF().addEventListener(ClubBFEvent.REWARES_GET_STATE, this.updateClubBFRewards, this);
        Manager.model.getClubLeaderWar().addEventListener(ClubLeaderWarEvent.CLUB_LEADER_WAR_INFO_UPDATE, this.updateClubBFRewards, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.GUILDCONTRI, this.onClubIconShowHander, this);
        Manager.model.getArena().addEventListener(ArenaEvent.UPDATE_PK_COUNT, this.updateArenaMaxAward, this);
        Manager.model.getArena().addEventListener(ArenaEvent.UPDATE_MAX_RANK_AWARD, this.updateArenaMaxAward, this);
        Manager.model.getLaird().addEventListener(LairdEvent.LAIRD_INFO_UPDATE, this.updateArenaMaxAward, this);
        Manager.model.getLaird().addEventListener(LairdEvent.COOLY_INFO_UPDATE, this.updateArenaMaxAward, this);
        Manager.model.getLaird().addEventListener(LairdEvent.LAIRD_CATCH_INFO_UPDATE, this.updateArenaMaxAward, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL, this.updateTower, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.FIGHT, this.updateTower, this);
        Manager.model.getJuyuan().addEventListener(JuyuanEvent.JUYUAN_PROGRESS_UPDATE, this.onClubIconShowHander, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.COIN, this.onClubIconShowHander, this);
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onClubIconShowHander, this);
    };
    ClubBuildView.prototype.removeEvent = function () {
        this._editBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._gfgBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._clubHomeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._clubCareerBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnActivity.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnClubBF.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._lunjiantaiBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getClub().removeEventListener(ClubEvent.UPDATE_CLUB_NOTICE, this.onUpdateClubNoticeHandler, this);
        Manager.model.getClub().removeEventListener(ClubEvent.UPDATE_CLUB_INFO, this.onUpdataClubInfoHandler, this);
        Manager.model.getClub().removeEventListener(ClubEvent.UPDATE_CLUB_CAREER, this.onUpdataClubInfoHandler, this);
        Manager.model.getClubBF().removeEventListener(ClubBFEvent.SCORE_UPDATE, this.updateClubBFRewards, this);
        Manager.model.getClubBF().removeEventListener(ClubBFEvent.REWARES_GET_STATE, this.updateClubBFRewards, this);
        Manager.model.getClubLeaderWar().removeEventListener(ClubLeaderWarEvent.CLUB_LEADER_WAR_INFO_UPDATE, this.updateClubBFRewards, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.GUILDCONTRI, this.onClubIconShowHander, this);
        Manager.model.getArena().removeEventListener(ArenaEvent.UPDATE_PK_COUNT, this.updateArenaMaxAward, this);
        Manager.model.getArena().removeEventListener(ArenaEvent.UPDATE_MAX_RANK_AWARD, this.updateArenaMaxAward, this);
        Manager.model.getLaird().removeEventListener(LairdEvent.LAIRD_INFO_UPDATE, this.updateArenaMaxAward, this);
        Manager.model.getLaird().removeEventListener(LairdEvent.COOLY_INFO_UPDATE, this.updateArenaMaxAward, this);
        Manager.model.getLaird().removeEventListener(LairdEvent.LAIRD_CATCH_INFO_UPDATE, this.updateArenaMaxAward, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.LEVEL, this.updateTower, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.FIGHT, this.updateTower, this);
        Manager.model.getJuyuan().removeEventListener(JuyuanEvent.JUYUAN_PROGRESS_UPDATE, this.onClubIconShowHander, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.COIN, this.onClubIconShowHander, this);
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onClubIconShowHander, this);
        _super.prototype.removeEvent.call(this);
    };
    ClubBuildView.prototype.updateArenaMaxAward = function (e) {
        if (e === void 0) { e = null; }
        this._lunjiantaiRedIcon.visible = OpenCVO.isOpen(OpenConst.ID_ARENA_PK) && (Manager.model.getArena().hasMaxAwardCanGet || Manager.model.getArena().hasPkCount)
            || OpenCVO.isOpen(OpenConst.ID_LAIRD) && Manager.model.getLaird().checkRedIcon();
    };
    ClubBuildView.prototype.updateTower = function (e) {
        this._icon4.visible = OpenCVO.isOpen(OpenConst.ID_JIUXIAOTA) && (Manager.model.getCopy().towerModel.canSaodang || Manager.model.getCopy().towerModel.canChallenge());
        if (e && e.type == GameObjectAttrEvent.LEVEL) {
            this.onClubIconShowHander();
        }
    };
    ClubBuildView.prototype.updateClubBFRewards = function (e) {
        if (e === void 0) { e = null; }
        this._clubBFRedIcon.visible = Manager.model.getClubBF().hasCanGet
            || OpenCVO.isOpen(OpenConst.ID_CLUB_LEADER) && Manager.model.getClubLeaderWar().checkCanMobai();
    };
    // private itemObject:ItemObject;
    // private itemList:Array<BaseGoods> = [];
    // private count:number = 0;
    ClubBuildView.prototype.onClickHandler = function (e) {
        // let list:Array<ItemsModelInfo> = Manager.model.getItems().bagList;
        // let infoList:Array<ItemsModelInfo> = [];
        // for(let i:number=0; i<30; i++)
        // {
        // 	if(list[i])
        // 	{
        // 		infoList.push(list[i]);
        // 	}
        // }
        // if(this.count % 2 == 0)
        // {
        // 	for(let i:number=0; i<this.itemList.length; i++)
        // 	{
        // 		if(this.itemList[i] && this.itemList[i].parent)
        // 			this.itemList[i].parent.removeChild(this.itemList[i]);
        // 		this.itemList[i].dispose();
        // 		this.itemList[i] = null;
        // 	}
        // 	this.itemList = [];
        // 	this.itemObject = Manager.pool.create(ItemObject, infoList, 10, 20);
        // 	this.addChild(this.itemObject);
        // }
        // else
        // {
        // 	if(this.itemObject)
        // 		this.itemObject.dispose();
        // 	this.itemObject = null;
        // 	let itemY:number = 20;
        // 	for(let i:number=0; i<infoList.length; i++)
        // 	{
        // 		if(i != 0 && i % 10 == 0)
        // 		{
        // 			itemY += 161;
        // 		}
        // 		let item:BaseGoods = new BaseGoods();
        // 		item.baseId = infoList[i].base_id;
        // 		item.count = infoList[i].quantity;
        // 		item.x = (i % 10) * 161;
        // 		item.y = itemY;
        // 		this.addChild(item);
        // 		this.itemList.push(item);
        // 	}
        // }
        // this.count += 1;
        // return;
        switch (e.currentTarget) {
            case this._editBtn:
                this._editNoticeView = Manager.view.show(49 /* ClubEditNoticeView */, this._clubInfo.desc);
                break;
            case this._gfgBtn:
                if (OpenCVO.isOpen(OpenConst.ID_JINGMAI, true)) {
                    Manager.view.show(145 /* GfgPanel */, 0);
                }
                else if (OpenCVO.isOpen(OpenConst.ID_JUYUAN, true)) {
                    Manager.view.show(145 /* GfgPanel */, 1);
                }
                break;
            case this._clubHomeBtn:
                if (OpenCVO.isOpen(OpenConst.ID_CLUB_CENTER, true))
                    this._clubView = Manager.view.show(40 /* ClubView */);
                break;
            case this._clubCareerBtn:
                if (OpenCVO.isOpen(OpenConst.ID_CLUB_CAREER, true))
                    this._careerView = Manager.view.show(44 /* ClubCareerView */);
                break;
            case this._btnActivity:
                if (OpenCVO.isOpen(OpenConst.ID_CLUB_COPY, true))
                    Manager.view.show(10 /* ActivityPanel */);
                break;
            case this._btnClubBF:
                if (OpenCVO.isOpen(OpenConst.ID_CLUB_WAR, true))
                    Manager.view.show(93 /* ClubBFPanel */);
                break;
            case this._lunjiantaiBtn:
                if (OpenCVO.isOpen(OpenConst.ID_ARENA_PK, true))
                    Manager.view.show(138 /* ClubLunjiantaiPanel */);
                break;
        }
    };
    ClubBuildView.prototype.initData = function () {
        _super.prototype.initData.call(this);
        if (this._showViewId != -1)
            this.startShowView();
        this._showViewId = -1;
        this.onClubIconShowHander();
        this.updateClubBFRewards(null);
        //引导
        if (Manager.model.getGuide().curID == GuideID.CLUB_JOIN) {
            var pos = this._lunjiantaiBtn.parent.localToGlobal(this._lunjiantaiBtn.x, this._lunjiantaiBtn.y);
            Manager.control.getTask().showGuide(pos, this._lunjiantaiBtn.width >> 1, this._lunjiantaiBtn.height >> 1, this.guideCB, this, false);
        }
    };
    ClubBuildView.prototype.startShowView = function () {
        switch (this._showViewId) {
            case 1: //盟会信息界面
                this._clubView = Manager.view.show(40 /* ClubView */);
                break;
            case 2: //盟会职位
                this._careerView = Manager.view.show(44 /* ClubCareerView */);
                break;
            case 3: //功法阁
                // if(OpenCVO.isOpen(OpenConst.ID_JINGMAI, true))
                // 	this._thisParent.showJingmai();
                if (OpenCVO.isOpen(OpenConst.ID_JINGMAI, true)) {
                    Manager.view.show(145 /* GfgPanel */, 0);
                }
                else if (OpenCVO.isOpen(OpenConst.ID_JUYUAN, true)) {
                    Manager.view.show(145 /* GfgPanel */, 1);
                }
                break;
            case 4: //论剑台
                if (OpenCVO.isOpen(OpenConst.ID_ARENA_PK, true))
                    Manager.view.show(138 /* ClubLunjiantaiPanel */);
                break;
        }
    };
    ClubBuildView.prototype.showView = function (index) {
        this._showViewId = index;
    };
    Object.defineProperty(ClubBuildView.prototype, "clubHomeBtn", {
        get: function () {
            return this._clubHomeBtn;
        },
        enumerable: true,
        configurable: true
    });
    ClubBuildView.prototype.onUpdataClubInfoHandler = function (e) {
        // if(this._clubInfo.donateList)
        // {
        // 	let count:number = 0;
        // 	let len:number = this._clubInfo.donateList.length;
        // 	for(let i:number=0; i<len; i++)
        // 	{
        // 		if(this._clubInfo.donateList[i].donateType == 2)
        // 		{
        // 			count = ClubDataCVO.getClubDonateById(2).count - this._clubInfo.donateList[i].count;
        // 		}
        // 	}
        // 	this._icon1.visible = count > 0;
        // }
        this._icon1.visible = Manager.model.getClub().checkCanDonate();
        this._icon2.visible = OpenCVO.isOpen(OpenConst.ID_CLUB_CAREER) && (this._clubInfo.isGetReward == 0 || Manager.model.getClub().checkCanUpgrade());
        this._editBtn.visible = (this._clubInfo.masterId == Manager.model.self.id ? true : false);
        if (this._clubInfo.masterName)
            this._masterName.text = this._clubInfo.masterName;
        else
            this._masterName.text = "";
        this.onUpdateClubNoticeHandler(null);
    };
    ClubBuildView.prototype.onUpdateClubNoticeHandler = function (e) {
        if (this._clubInfo.desc && this._clubInfo.desc != "") {
            this._gonggao.text = this._clubInfo.desc;
            this._gonggao.cacheAsBitmap = true;
        }
        this._txtWidth = StringUtils.getStrlen(this._gonggao.text) * 13;
    };
    ClubBuildView.prototype.reuse = function (thisParent) {
        _super.prototype.reuse.call(this);
        this._thisParent = thisParent;
    };
    ClubBuildView.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
    };
    ClubBuildView.prototype.onClubIconShowHander = function (e) {
        if (e === void 0) { e = null; }
        var bool = Manager.model.getJingMai().checkCoin() || Manager.model.getJuyuan().checkCoin();
        this._icon3.visible = bool;
    };
    ClubBuildView.prototype.guideCB = function () {
        if (OpenCVO.isOpen(OpenConst.ID_CLUB_COPY, true))
            Manager.link.link(LinkType.PANEL_CLUB_ARENA, 0);
    };
    ClubBuildView.prototype.dispose = function () {
        Manager.render.remove(this.showNotice, this);
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._back0, this._back1, this._ggBg, this._gonggao, this._editBtn, this._gfgBtn, this._btnActivity, this._clubHomeBtn, this._clubCareerBtn, this._masterName, this._btnClubBF);
        if (this._back0)
            this._back0.dispose();
        this._back0 = null;
        if (this._back1)
            this._back1.dispose();
        this._back1 = null;
        this._ggBg = null;
        if (this._gonggao)
            this._gonggao.dispose();
        this._gonggao = null;
        if (this._editBtn)
            this._editBtn.dispose();
        this._editBtn = null;
        this._gfgBtn = null;
        this._btnActivity = null;
        this._clubHomeBtn = null;
        this._clubCareerBtn = null;
        this._btnClubBF = null;
        this._lunjiantaiBtn = null;
        if (this._masterName)
            this._masterName.dispose();
        this._masterName = null;
        if (this._gonggaoSp)
            Manager.pool.push(this._gonggaoSp);
        this._gonggaoSp = null;
        this._icon1 = null;
        this._icon2 = null;
        this._icon3 = null;
        this._icon4 = null;
        this._lunjiantaiRedIcon = null;
        Manager.view.hide(49 /* ClubEditNoticeView */);
        Manager.view.hide(40 /* ClubView */);
        Manager.view.hide(44 /* ClubCareerView */);
    };
    return ClubBuildView;
}(UIComponent));
//# sourceMappingURL=ClubBuildView.js.map