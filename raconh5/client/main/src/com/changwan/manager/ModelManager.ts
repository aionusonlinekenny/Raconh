class ModelManager extends egret.EventDispatcher
{
    public self:SelfGameObjectInfo;
    private _map:MapModel;
    private _login:LoginModel;
    private _gameobject:GameObjectModel;
    private _mail:MailModel;
    private _items:ItemsModel;
    private _role:RoleModel;
    private _rank:RankModel;
    private _drop:DropModel;
    private _activity:ActivityModel;
    private _copy:CopyModel;
    private _boss:BossModel;
    private _friends:FriendsModel;
    private _auto:AutoModel;
    private _task:TaskModel;
    private _guide:GuideModel;
	private _chat:ChatModel;
    private _skill:SkillModel;
    private _jianMai:JingMaiModel;
    private _shop:ShopModel;
    private _dress:DressModel;
    private _cloak:CloakModel;
    private _bag:BagModel;
    private _equip:EquipModel;
    private _rein:ReinModel;
    private _club:ClubModel;
    private _clubBF:ClubBFModel;
    private _sysnotice:SysnoticeModel;
	private _pet:PetModel;
    private _vip:VipModel;
    private _actIcon:ActIconModel;
    private _soldier:SoldierModel;
    private _lifeGrid:LifeGridModel;
    private _arena:ArenaModel;
    private _sysCharge:SysChargeModel;
    private _sysprivilege:SysPrivilegeModel;
    private _training:TrainingModel;
    private _sysInvest:SysInvestModel;
    private _cashCow:CashCowModel;
    private _laird:LairdModel;
    private _rechargeActivity:RechargeActivityModel;
    private _clubLeaderWar:ClubLeaderWarModel;
    private _artifact:ArtifactModel;
    private _juexue:JuexueModel;
    private _relicstuff:RelicStuffModel;
    private _dailyRebate:DailyRebateModel;
    private _srvRank:SrvRankModel;
    private _share:ShareModel;
    private _materialCopy:MaterialCopyModel;
    private _qiandao:QiandaoModel;
    private _fireEye:FireEyeModel;
    private _juyuan:JuyuanModel;
    private _devil:DevilModel;
    private _starUp:StarUpModel;
    private _marketModel:MarketModel;
    private _exchange:ExchangeModel;

    public getmarketModel():MarketModel
    {
        if(this._marketModel === undefined) this._marketModel = new MarketModel;
        return this._marketModel;
    }

    public getshare():ShareModel
    {
        if(this._share === undefined) this._share = new ShareModel();
        return this._share;
    }

    public getsrvRank():SrvRankModel
    {
        if(this._srvRank === undefined) this._srvRank = new SrvRankModel();
        return this._srvRank;
    }

    public getdailyRebate():DailyRebateModel
    {
        if(this._dailyRebate === undefined) this._dailyRebate = new DailyRebateModel();
        return this._dailyRebate;
    }

    public getrelicstuff():RelicStuffModel
    {
        if(this._relicstuff === undefined) this._relicstuff = new RelicStuffModel();
        return this._relicstuff;
    }

    public getjuexue():JuexueModel
    {
        if(this._juexue === undefined) this._juexue = new JuexueModel();
        return this._juexue;
    }

    public getArtifact():ArtifactModel
    {
        if(this._artifact === undefined) this._artifact = new ArtifactModel();
        return this._artifact;
    }

    public getrechargeActivity():RechargeActivityModel
    {
        if(this._rechargeActivity === undefined) this._rechargeActivity = new RechargeActivityModel();
        return this._rechargeActivity;
    }

    public getcashCow():CashCowModel
    {
        if(this._cashCow === undefined) this._cashCow = new CashCowModel();
        return this._cashCow;
    }
    public getSysInvest():SysInvestModel
    {
        if(this._sysInvest === undefined) this._sysInvest = new SysInvestModel();
        return this._sysInvest;
    }

    public getSysPrivilege():SysPrivilegeModel
    {
        if(this._sysprivilege === undefined) this._sysprivilege = new SysPrivilegeModel();
        return this._sysprivilege;
    }

    public getSysCharge():SysChargeModel
    {
        if(this._sysCharge === undefined) this._sysCharge = new SysChargeModel();
        return this._sysCharge;
    }

    public getLifeGrid():LifeGridModel
    {
        if(this._lifeGrid === undefined) this._lifeGrid = new LifeGridModel();
        return this._lifeGrid;
    }

    public getSysnotice():SysnoticeModel
    {
        if(this._sysnotice === undefined) this._sysnotice = new SysnoticeModel();
        return this._sysnotice;
    }

    public getLogin():LoginModel
    {
        if(this._login === undefined) this._login = new LoginModel();
        return this._login;
    }
    public getMap():MapModel
    {
        if(this._map === undefined) this._map = new MapModel();
        return this._map;
    }
    public getGameobject():GameObjectModel
    {
        if(this._gameobject === undefined) this._gameobject = new GameObjectModel();
        return this._gameobject;
    }
    public getMail():MailModel
    {
        if(this._mail === undefined) this._mail = new MailModel();
        return this._mail;
    }
      public getItems():ItemsModel
    {
        if(this._items === undefined) this._items = new ItemsModel();
        return this._items;
    }
    public getRole():RoleModel
    {
        if(this._role === undefined) this._role = new RoleModel();
        return this._role;
    }
    public getRank():RankModel
    {
        if(this._rank === undefined) this._rank = new RankModel();
        return this._rank;
    }
    public getDrop():DropModel
    {
        if(this._drop === undefined) this._drop = new DropModel();
        return this._drop;
    }
    public getActivity():ActivityModel
    {
        if(this._activity === undefined) this._activity = new ActivityModel();
        return this._activity;
    }
    public getCopy():CopyModel
    {
        if(this._copy === undefined) this._copy = new CopyModel();
        return this._copy;
    }
    public getBoss():BossModel
    {
        if(this._boss === undefined) this._boss = new BossModel();
        return this._boss;
    }
    public getFriends():FriendsModel
    {
        if(this._friends === undefined) this._friends = new FriendsModel();
        return this._friends;
    }
    public getAuto():AutoModel
    {
        if(this._auto === undefined) this._auto = new AutoModel();
        return this._auto;
    }
     public getTask():TaskModel
    {
        if(this._task === undefined) this._task = new TaskModel();
        return this._task;
    }
    public getGuide():GuideModel
    {
        if(this._guide === undefined) this._guide = new GuideModel();
        return this._guide;
    }
    
	public getChat():ChatModel
    {
        if(this._chat === undefined) this._chat = new ChatModel();
        return this._chat;
    }
	public getSkill():SkillModel
    {
        if(this._skill === undefined) this._skill = new SkillModel();
        return this._skill;
    }
    public getJingMai():JingMaiModel
    {
        if(this._jianMai === undefined) this._jianMai = new JingMaiModel;
        return this._jianMai;
    }
    public getShop():ShopModel
    {
        if(this._shop=== undefined) this._shop =  new ShopModel();
        return this._shop;
    }
     public getDress():DressModel
    {
        if(this._dress === undefined) this._dress = new DressModel();
        return this._dress;
    }
    public getCloak():CloakModel
    {
        if(this._cloak=== undefined) this._cloak =  new CloakModel();
        return this._cloak;
    }
    public getBag():BagModel
    {
        if(this._bag === undefined) this._bag =  new BagModel();
        return this._bag;
    }
    public getEquip():EquipModel
    {
        if(this._equip === undefined) this._equip = new EquipModel();
        return this._equip;
    }
    public getRein():ReinModel
    {
        if(this._rein === undefined) this._rein = new ReinModel();
        return this._rein;
    }
    public getClub():ClubModel
    {
        if(this._club === undefined) this._club = new ClubModel();
        return this._club;
    }
    public getClubBF():ClubBFModel
    {
        if(this._clubBF === undefined) this._clubBF = new ClubBFModel();
        return this._clubBF;
    }
    public getPet():PetModel
    {
        if(this._pet === undefined) this._pet = new PetModel();
        return this._pet;
    }
    public getVip():VipModel
    {
        if(this._vip === undefined) this._vip = new VipModel();
        return this._vip;
    }
    public getActIcon():ActIconModel
    {
        if(this._actIcon === undefined) this._actIcon = new ActIconModel();
        return this._actIcon;
    }
    public getSoldier():SoldierModel
    {
        if(this._soldier === undefined) this._soldier = new SoldierModel();
        return this._soldier;
    }
    public getArena():ArenaModel
    {
        if(this._arena === undefined) this._arena = new ArenaModel();
        return this._arena;
    }
    public getTraining():TrainingModel
    {
        if(this._training === undefined) this._training = new TrainingModel();
        return this._training;
    }
    public getLaird():LairdModel
    {
        if(this._laird === undefined) this._laird = new LairdModel();
        return this._laird;
    }
    public getClubLeaderWar():ClubLeaderWarModel
    {
        if(this._clubLeaderWar === undefined) this._clubLeaderWar = new ClubLeaderWarModel();
        return this._clubLeaderWar;
    }
    public getMaterialCopy():MaterialCopyModel
    {
        if(this._materialCopy === undefined) this._materialCopy = new MaterialCopyModel();
        return this._materialCopy;
    }
    public getQiandao():QiandaoModel
    {
        if(this._qiandao === undefined) this._qiandao = new QiandaoModel();
        return this._qiandao;
    }
    public getFireEye():FireEyeModel
    {
        if(this._fireEye === undefined) this._fireEye = new FireEyeModel();
        return this._fireEye;
    }
    public getJuyuan():JuyuanModel
    {
        if(this._juyuan === undefined) this._juyuan = new JuyuanModel();
        return this._juyuan;
    }
    public getDevil():DevilModel
    {
        if(this._devil === undefined) this._devil = new DevilModel();
        return this._devil;
    }
    public getStarUp():StarUpModel
    {
        if(this._starUp === undefined) this._starUp = new StarUpModel();
        return this._starUp;
    }
    public getExchange():ExchangeModel
    {
        if(this._exchange === undefined) this._exchange = new ExchangeModel();
        return this._exchange;
    }
}