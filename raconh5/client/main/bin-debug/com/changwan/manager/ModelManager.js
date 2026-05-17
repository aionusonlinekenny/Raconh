var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
var ModelManager = (function (_super) {
    __extends(ModelManager, _super);
    function ModelManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ModelManager.prototype.getmarketModel = function () {
        if (this._marketModel === undefined)
            this._marketModel = new MarketModel;
        return this._marketModel;
    };
    ModelManager.prototype.getshare = function () {
        if (this._share === undefined)
            this._share = new ShareModel();
        return this._share;
    };
    ModelManager.prototype.getsrvRank = function () {
        if (this._srvRank === undefined)
            this._srvRank = new SrvRankModel();
        return this._srvRank;
    };
    ModelManager.prototype.getdailyRebate = function () {
        if (this._dailyRebate === undefined)
            this._dailyRebate = new DailyRebateModel();
        return this._dailyRebate;
    };
    ModelManager.prototype.getrelicstuff = function () {
        if (this._relicstuff === undefined)
            this._relicstuff = new RelicStuffModel();
        return this._relicstuff;
    };
    ModelManager.prototype.getjuexue = function () {
        if (this._juexue === undefined)
            this._juexue = new JuexueModel();
        return this._juexue;
    };
    ModelManager.prototype.getArtifact = function () {
        if (this._artifact === undefined)
            this._artifact = new ArtifactModel();
        return this._artifact;
    };
    ModelManager.prototype.getrechargeActivity = function () {
        if (this._rechargeActivity === undefined)
            this._rechargeActivity = new RechargeActivityModel();
        return this._rechargeActivity;
    };
    ModelManager.prototype.getcashCow = function () {
        if (this._cashCow === undefined)
            this._cashCow = new CashCowModel();
        return this._cashCow;
    };
    ModelManager.prototype.getSysInvest = function () {
        if (this._sysInvest === undefined)
            this._sysInvest = new SysInvestModel();
        return this._sysInvest;
    };
    ModelManager.prototype.getSysPrivilege = function () {
        if (this._sysprivilege === undefined)
            this._sysprivilege = new SysPrivilegeModel();
        return this._sysprivilege;
    };
    ModelManager.prototype.getSysCharge = function () {
        if (this._sysCharge === undefined)
            this._sysCharge = new SysChargeModel();
        return this._sysCharge;
    };
    ModelManager.prototype.getLifeGrid = function () {
        if (this._lifeGrid === undefined)
            this._lifeGrid = new LifeGridModel();
        return this._lifeGrid;
    };
    ModelManager.prototype.getSysnotice = function () {
        if (this._sysnotice === undefined)
            this._sysnotice = new SysnoticeModel();
        return this._sysnotice;
    };
    ModelManager.prototype.getLogin = function () {
        if (this._login === undefined)
            this._login = new LoginModel();
        return this._login;
    };
    ModelManager.prototype.getMap = function () {
        if (this._map === undefined)
            this._map = new MapModel();
        return this._map;
    };
    ModelManager.prototype.getGameobject = function () {
        if (this._gameobject === undefined)
            this._gameobject = new GameObjectModel();
        return this._gameobject;
    };
    ModelManager.prototype.getMail = function () {
        if (this._mail === undefined)
            this._mail = new MailModel();
        return this._mail;
    };
    ModelManager.prototype.getItems = function () {
        if (this._items === undefined)
            this._items = new ItemsModel();
        return this._items;
    };
    ModelManager.prototype.getRole = function () {
        if (this._role === undefined)
            this._role = new RoleModel();
        return this._role;
    };
    ModelManager.prototype.getRank = function () {
        if (this._rank === undefined)
            this._rank = new RankModel();
        return this._rank;
    };
    ModelManager.prototype.getDrop = function () {
        if (this._drop === undefined)
            this._drop = new DropModel();
        return this._drop;
    };
    ModelManager.prototype.getActivity = function () {
        if (this._activity === undefined)
            this._activity = new ActivityModel();
        return this._activity;
    };
    ModelManager.prototype.getCopy = function () {
        if (this._copy === undefined)
            this._copy = new CopyModel();
        return this._copy;
    };
    ModelManager.prototype.getBoss = function () {
        if (this._boss === undefined)
            this._boss = new BossModel();
        return this._boss;
    };
    ModelManager.prototype.getFriends = function () {
        if (this._friends === undefined)
            this._friends = new FriendsModel();
        return this._friends;
    };
    ModelManager.prototype.getAuto = function () {
        if (this._auto === undefined)
            this._auto = new AutoModel();
        return this._auto;
    };
    ModelManager.prototype.getTask = function () {
        if (this._task === undefined)
            this._task = new TaskModel();
        return this._task;
    };
    ModelManager.prototype.getGuide = function () {
        if (this._guide === undefined)
            this._guide = new GuideModel();
        return this._guide;
    };
    ModelManager.prototype.getChat = function () {
        if (this._chat === undefined)
            this._chat = new ChatModel();
        return this._chat;
    };
    ModelManager.prototype.getSkill = function () {
        if (this._skill === undefined)
            this._skill = new SkillModel();
        return this._skill;
    };
    ModelManager.prototype.getJingMai = function () {
        if (this._jianMai === undefined)
            this._jianMai = new JingMaiModel;
        return this._jianMai;
    };
    ModelManager.prototype.getShop = function () {
        if (this._shop === undefined)
            this._shop = new ShopModel();
        return this._shop;
    };
    ModelManager.prototype.getDress = function () {
        if (this._dress === undefined)
            this._dress = new DressModel();
        return this._dress;
    };
    ModelManager.prototype.getCloak = function () {
        if (this._cloak === undefined)
            this._cloak = new CloakModel();
        return this._cloak;
    };
    ModelManager.prototype.getBag = function () {
        if (this._bag === undefined)
            this._bag = new BagModel();
        return this._bag;
    };
    ModelManager.prototype.getEquip = function () {
        if (this._equip === undefined)
            this._equip = new EquipModel();
        return this._equip;
    };
    ModelManager.prototype.getRein = function () {
        if (this._rein === undefined)
            this._rein = new ReinModel();
        return this._rein;
    };
    ModelManager.prototype.getClub = function () {
        if (this._club === undefined)
            this._club = new ClubModel();
        return this._club;
    };
    ModelManager.prototype.getClubBF = function () {
        if (this._clubBF === undefined)
            this._clubBF = new ClubBFModel();
        return this._clubBF;
    };
    ModelManager.prototype.getPet = function () {
        if (this._pet === undefined)
            this._pet = new PetModel();
        return this._pet;
    };
    ModelManager.prototype.getVip = function () {
        if (this._vip === undefined)
            this._vip = new VipModel();
        return this._vip;
    };
    ModelManager.prototype.getActIcon = function () {
        if (this._actIcon === undefined)
            this._actIcon = new ActIconModel();
        return this._actIcon;
    };
    ModelManager.prototype.getSoldier = function () {
        if (this._soldier === undefined)
            this._soldier = new SoldierModel();
        return this._soldier;
    };
    ModelManager.prototype.getArena = function () {
        if (this._arena === undefined)
            this._arena = new ArenaModel();
        return this._arena;
    };
    ModelManager.prototype.getTraining = function () {
        if (this._training === undefined)
            this._training = new TrainingModel();
        return this._training;
    };
    ModelManager.prototype.getLaird = function () {
        if (this._laird === undefined)
            this._laird = new LairdModel();
        return this._laird;
    };
    ModelManager.prototype.getClubLeaderWar = function () {
        if (this._clubLeaderWar === undefined)
            this._clubLeaderWar = new ClubLeaderWarModel();
        return this._clubLeaderWar;
    };
    ModelManager.prototype.getMaterialCopy = function () {
        if (this._materialCopy === undefined)
            this._materialCopy = new MaterialCopyModel();
        return this._materialCopy;
    };
    ModelManager.prototype.getQiandao = function () {
        if (this._qiandao === undefined)
            this._qiandao = new QiandaoModel();
        return this._qiandao;
    };
    ModelManager.prototype.getFireEye = function () {
        if (this._fireEye === undefined)
            this._fireEye = new FireEyeModel();
        return this._fireEye;
    };
    ModelManager.prototype.getJuyuan = function () {
        if (this._juyuan === undefined)
            this._juyuan = new JuyuanModel();
        return this._juyuan;
    };
    ModelManager.prototype.getDevil = function () {
        if (this._devil === undefined)
            this._devil = new DevilModel();
        return this._devil;
    };
    ModelManager.prototype.getStarUp = function () {
        if (this._starUp === undefined)
            this._starUp = new StarUpModel();
        return this._starUp;
    };
    ModelManager.prototype.getExchange = function () {
        if (this._exchange === undefined)
            this._exchange = new ExchangeModel();
        return this._exchange;
    };
    return ModelManager;
}(egret.EventDispatcher));
__reflect(ModelManager.prototype, "ModelManager");
//# sourceMappingURL=ModelManager.js.map