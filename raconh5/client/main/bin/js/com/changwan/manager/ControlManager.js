var ControlManager = /** @class */ (function () {
    function ControlManager() {
        this.getLogin();
        this.getMap();
        this.getTask();
        this.getRank();
        this.getActivity();
        this.getDrop();
        this.getCopy();
        this.getBoss();
        this.getRole();
        this.getMail();
        this.getFriends();
        this.getChat();
        this.getJingMai();
        this.getSkill();
        this.getShop();
        this.getDress();
        this.getBuff();
        this.getCloak();
        this.getEquip();
        this.getRein();
        this.getClub();
        this.getSysnotice();
        this.getPet();
        this.getVip();
        this.getActIcon();
        this.getSoldier();
        this.getLifeGrid();
        this.getArena();
        this.getFirstCharge();
        this.getTraining();
        this.getSysInvest();
        this.getcashCow();
        this.getRecheargeActivity();
        this.getLaird();
        this.getClubBF();
        this.getSysPrivilege();
        this.getClubLeaderWar();
        this.getShop();
        this.getjuexue();
        this.getRelicstuff();
        this.getdailyRebate();
        this.getsrvRank();
        this.getshare();
        this.geQiandao();
        this.getBattle();
        this.getFireEye();
        this.getMaterialCopy();
        this.getDevil();
        this.getJuyuan();
        this.getStarUp();
        this.getArtifact();
        this.getExchange();
    }
    ControlManager.prototype.getmarket = function () {
        if (this._market === undefined)
            this._market = new MarketControl();
        return this._market;
    };
    ControlManager.prototype.getshare = function () {
        if (this._share === undefined)
            this._share = new ShareControl();
        return this._share;
    };
    ControlManager.prototype.getsrvRank = function () {
        if (this._srvRank === undefined)
            this._srvRank = new SrvRankControl();
        return this._srvRank;
    };
    ControlManager.prototype.getdailyRebate = function () {
        if (this._dailyRebate === undefined)
            this._dailyRebate = new DailyRebateControl();
        return this._dailyRebate;
    };
    ControlManager.prototype.getRelicstuff = function () {
        if (this._relicstuff === undefined)
            this._relicstuff = new RelicStuffControl();
        return this._relicstuff;
    };
    ControlManager.prototype.getjuexue = function () {
        if (this._juexue === undefined)
            this._juexue = new JuexueControl();
        return this._juexue;
    };
    ControlManager.prototype.getArtifact = function () {
        if (this._artifact === undefined)
            this._artifact = new ArtifactControl();
        return this._artifact;
    };
    ControlManager.prototype.getLaird = function () {
        if (this._laird === undefined)
            this._laird = new LairdControl();
        return this._laird;
    };
    ControlManager.prototype.getRecheargeActivity = function () {
        if (this._rechargeActivity === undefined)
            this._rechargeActivity = new RecheargeActivityControl();
        return this._rechargeActivity;
    };
    ControlManager.prototype.getcashCow = function () {
        if (this._cashCow === undefined)
            this._cashCow = new CashCowControl();
        return this._cashCow;
    };
    ControlManager.prototype.getSysInvest = function () {
        if (this._sysInvest === undefined)
            this._sysInvest = new SysInvestControl();
        return this._sysInvest;
    };
    ControlManager.prototype.getSysPrivilege = function () {
        if (this._sysPrivilege === undefined)
            this._sysPrivilege = new SysPrivilegeControl();
        return this._sysPrivilege;
    };
    ControlManager.prototype.getFirstCharge = function () {
        if (this._firstCharge === undefined)
            this._firstCharge = new FirstChargeControl();
        return this._firstCharge;
    };
    ControlManager.prototype.getSysCharge = function () {
        if (this._sysCharge === undefined)
            this._sysCharge = new SysChargeControl();
        return this._sysCharge;
    };
    ControlManager.prototype.getLifeGrid = function () {
        if (this._lifeGrid === undefined)
            this._lifeGrid = new LifeGridControl();
        return this._lifeGrid;
    };
    ControlManager.prototype.getSysnotice = function () {
        if (this._sysnotice === undefined)
            this._sysnotice = new SysnoticeControl();
        return this._sysnotice;
    };
    ControlManager.prototype.getMap = function () {
        if (this._map === undefined)
            this._map = new MapControl();
        return this._map;
    };
    ControlManager.prototype.getLogin = function () {
        if (this._login === undefined)
            this._login = new LoginControl();
        return this._login;
    };
    ControlManager.prototype.getMail = function () {
        if (this._mail === undefined)
            this._mail = new MailControl();
        return this._mail;
    };
    ControlManager.prototype.getItems = function () {
        if (this._itemsControl === undefined)
            this._itemsControl = new ItemsControl();
        return this._itemsControl;
    };
    ControlManager.prototype.getRole = function () {
        if (this._roleControl === undefined)
            this._roleControl = new RoleControl();
        return this._roleControl;
    };
    ControlManager.prototype.getRank = function () {
        if (this._rank === undefined)
            this._rank = new RankControl();
        return this._rank;
    };
    ControlManager.prototype.getDrop = function () {
        if (this._drop === undefined)
            this._drop = new DropControl();
        return this._drop;
    };
    ControlManager.prototype.getActivity = function () {
        if (this._activity === undefined)
            this._activity = new ActivityControl();
        return this._activity;
    };
    ControlManager.prototype.getCopy = function () {
        if (this._copy === undefined)
            this._copy = new CopyControl();
        return this._copy;
    };
    ControlManager.prototype.getBoss = function () {
        if (this._boss === undefined)
            this._boss = new BossControl();
        return this._boss;
    };
    ControlManager.prototype.getFriends = function () {
        if (this._friends === undefined)
            this._friends = new FriendsControl();
        return this._friends;
    };
    ControlManager.prototype.getEquip = function () {
        if (this._equip === undefined)
            this._equip = new EquipControl();
        return this._equip;
    };
    ControlManager.prototype.getTask = function () {
        if (this._task === undefined)
            this._task = new TaskControl();
        return this._task;
    };
    ControlManager.prototype.getChat = function () {
        if (this._chat === undefined)
            this._chat = new ChatControl();
        return this._chat;
    };
    ControlManager.prototype.getBattle = function () {
        if (this._battle === undefined)
            this._battle = new BattleControl();
        return this._battle;
    };
    ControlManager.prototype.getJingMai = function () {
        if (this._jianMai === undefined)
            this._jianMai = new JingMaiControl;
        return this._jianMai;
    };
    ControlManager.prototype.getSkill = function () {
        if (this._skill === undefined)
            this._skill = new SkillControl();
        return this._skill;
    };
    ControlManager.prototype.getShop = function () {
        if (this._shop === undefined)
            this._shop = new ShopControl();
        return this._shop;
    };
    ControlManager.prototype.getDress = function () {
        if (this._dress === undefined)
            this._dress = new DressControl();
        return this._dress;
    };
    ControlManager.prototype.getBuff = function () {
        if (this._buff === undefined)
            this._buff = new BuffControl();
        return this._buff;
    };
    ControlManager.prototype.getCloak = function () {
        if (this._cloak === undefined)
            this._cloak = new CloakControl();
        return this._cloak;
    };
    ControlManager.prototype.getRename = function () {
        if (this._rename === undefined)
            this._rename = new RenameControl();
        return this._rename;
    };
    ControlManager.prototype.getRein = function () {
        if (this._rein === undefined)
            this._rein = new ReinControl();
        return this._rein;
    };
    ControlManager.prototype.getClub = function () {
        if (this._club === undefined)
            this._club = new ClubControl();
        return this._club;
    };
    ControlManager.prototype.getClubBF = function () {
        if (this._clubBF === undefined)
            this._clubBF = new ClubBFControl();
        return this._clubBF;
    };
    ControlManager.prototype.getPet = function () {
        if (this._pet === undefined)
            this._pet = new PetControl();
        return this._pet;
    };
    ControlManager.prototype.getVip = function () {
        if (this._vip === undefined)
            this._vip = new VipControl();
        return this._vip;
    };
    ControlManager.prototype.getActIcon = function () {
        if (this._actIcon === undefined)
            this._actIcon = new ActIconControl();
        return this._actIcon;
    };
    ControlManager.prototype.getSoldier = function () {
        if (this._soldier === undefined)
            this._soldier = new SoldierControl();
        return this._soldier;
    };
    ControlManager.prototype.getArena = function () {
        if (this._arena === undefined)
            this._arena = new ArenaControl();
        return this._arena;
    };
    ControlManager.prototype.getTraining = function () {
        if (this._training === undefined)
            this._training = new TrainingControl();
        return this._training;
    };
    ControlManager.prototype.getClubLeaderWar = function () {
        if (this._clubLeaderWar === undefined)
            this._clubLeaderWar = new ClubLeaderWarControl();
        return this._clubLeaderWar;
    };
    ControlManager.prototype.getMaterialCopy = function () {
        if (this._materialCopy === undefined)
            this._materialCopy = new MaterialControl();
        return this._materialCopy;
    };
    ControlManager.prototype.geQiandao = function () {
        if (this._qiandao === undefined)
            this._qiandao = new QiandaoControl();
        return this._qiandao;
    };
    ControlManager.prototype.getFireEye = function () {
        if (this._fireEye === undefined)
            this._fireEye = new FireEyeControl();
        return this._fireEye;
    };
    ControlManager.prototype.getJuyuan = function () {
        if (this._juyuan === undefined)
            this._juyuan = new JuyuanControl();
        return this._juyuan;
    };
    ControlManager.prototype.getDevil = function () {
        if (this._devil === undefined)
            this._devil = new DevilControl();
        return this._devil;
    };
    ControlManager.prototype.getStarUp = function () {
        if (this._starUp === undefined)
            this._starUp = new StarUpControl();
        return this._starUp;
    };
    ControlManager.prototype.getExchange = function () {
        if (this._exchange === undefined)
            this._exchange = new ExchangeControl();
        return this._exchange;
    };
    return ControlManager;
}());
//# sourceMappingURL=ControlManager.js.map