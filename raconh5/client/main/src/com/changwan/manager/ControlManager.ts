class ControlManager
{
    private _map:MapControl;
    private _login:LoginControl;
    private _mail:MailControl;
    private _itemsControl:ItemsControl;
    private _roleControl:RoleControl;
    private _rank:RankControl;
    private _drop:DropControl;
    private _activity:ActivityControl;
    private _copy:CopyControl;
    private _boss:BossControl;
    private _friends:FriendsControl;
    private _equip:EquipControl;
    private _task:TaskControl;
	private _chat:ChatControl;
    private _battle:BattleControl;
    private _jianMai:JingMaiControl;
    private _skill:SkillControl;
    private _shop:ShopControl;
    private _dress:DressControl;
    private _buff:BuffControl;
    private _cloak:CloakControl;
    private _rename:RenameControl;
    private _rein:ReinControl;
    private _club:ClubControl;
    private _clubBF:ClubBFControl;
    private _sysnotice:SysnoticeControl
	private _pet:PetControl;
    private _vip:VipControl;
    private _actIcon:ActIconControl;
    private _soldier:SoldierControl;
    private _lifeGrid:LifeGridControl;
    private _arena:ArenaControl;
    private _sysCharge:SysChargeControl;
    private _firstCharge:FirstChargeControl;
    private _sysPrivilege:SysPrivilegeControl;
    private _training:TrainingControl;
    private _sysInvest:SysInvestControl;
    private _cashCow:CashCowControl;
    private _rechargeActivity:RecheargeActivityControl;
    private _laird:LairdControl;
    private _clubLeaderWar:ClubLeaderWarControl;
    private _artifact:ArtifactControl;
    private _juexue:JuexueControl;
    private _relicstuff:RelicStuffControl
    private _dailyRebate:DailyRebateControl;
    private _srvRank:SrvRankControl;
    private _share:ShareControl;
    private _materialCopy:MaterialControl;
    private _qiandao:QiandaoControl;
    private _fireEye:FireEyeControl;
    private _juyuan:JuyuanControl;
    private _devil:DevilControl;
    private _starUp:StarUpControl;
    private _market:MarketControl;
    private _exchange:ExchangeControl;

    public constructor()
    {
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
    public getmarket():MarketControl
    {
        if(this._market === undefined) this._market = new MarketControl();
        return this._market;
    }
    public getshare():ShareControl
    {
        if(this._share === undefined) this._share = new ShareControl();
        return this._share;
    }
    public getsrvRank():SrvRankControl
    {
        if(this._srvRank === undefined) this._srvRank = new SrvRankControl();
        return this._srvRank;
    }
    public getdailyRebate():DailyRebateControl
    {
        if(this._dailyRebate === undefined) this._dailyRebate = new DailyRebateControl();
        return this._dailyRebate;
    }
    public getRelicstuff():RelicStuffControl
    {
        if(this._relicstuff === undefined) this._relicstuff = new RelicStuffControl();
        return this._relicstuff;
    }
    public getjuexue():JuexueControl
    {
        if(this._juexue === undefined) this._juexue = new JuexueControl();
        return this._juexue;
    }
    public getArtifact():ArtifactControl
    {
        if(this._artifact === undefined) this._artifact = new ArtifactControl();
        return this._artifact;
    }

    public getLaird():LairdControl
    {
        if(this._laird === undefined) this._laird = new LairdControl();
        return this._laird;
    }
    public getRecheargeActivity():RecheargeActivityControl
    {
        if(this._rechargeActivity === undefined) this._rechargeActivity = new RecheargeActivityControl();
        return this._rechargeActivity;
    }
    public getcashCow():CashCowControl
    {
        if(this._cashCow === undefined) this._cashCow = new CashCowControl();
        return this._cashCow;
    }
    public getSysInvest():SysInvestControl
    {
        if(this._sysInvest === undefined) this._sysInvest = new SysInvestControl();
        return this._sysInvest;
    }
    public getSysPrivilege():SysPrivilegeControl
    {
        if(this._sysPrivilege === undefined) this._sysPrivilege = new SysPrivilegeControl();
        return this._sysPrivilege;
    }
    public getFirstCharge():FirstChargeControl
    {
        if(this._firstCharge === undefined) this._firstCharge = new FirstChargeControl();
        return this._firstCharge;
    }
    public getSysCharge():SysChargeControl
    {
        if(this._sysCharge === undefined) this._sysCharge = new SysChargeControl();
        return this._sysCharge;
    }
    public getLifeGrid():LifeGridControl
    {
        if(this._lifeGrid === undefined) this._lifeGrid = new LifeGridControl();
        return this._lifeGrid;
    }
    public getSysnotice():SysnoticeControl
    {
        if(this._sysnotice === undefined) this._sysnotice = new SysnoticeControl();
        return this._sysnotice;
    }

    public getMap():MapControl
    {
        if(this._map === undefined) this._map = new MapControl();
        return this._map;
    }
    public getLogin():LoginControl
    {
        if(this._login === undefined) this._login = new LoginControl();
        return this._login;
    }
    public getMail():MailControl
    {
        if(this._mail === undefined) this._mail = new MailControl();
        return this._mail;
    }
    public getItems():ItemsControl
    {
        if(this._itemsControl === undefined) this._itemsControl = new ItemsControl();
        return this._itemsControl;
    }
    public getRole():RoleControl
    {
        if(this._roleControl === undefined) this._roleControl = new RoleControl();
        return this._roleControl;
    }
    public getRank():RankControl
    {
        if(this._rank === undefined) this._rank = new RankControl();
        return this._rank;
    }
    public getDrop():DropControl
    {
        if(this._drop === undefined) this._drop = new DropControl();
        return this._drop;
    }
    public getActivity():ActivityControl
    {
        if(this._activity === undefined) this._activity = new ActivityControl();
        return this._activity;
    }
    public getCopy():CopyControl
    {
        if(this._copy === undefined) this._copy = new CopyControl();
        return this._copy;
    }
    public getBoss():BossControl
    {
        if(this._boss === undefined) this._boss = new BossControl();
        return this._boss;
    }
    public getFriends():FriendsControl
    {
        if(this._friends === undefined) this._friends = new FriendsControl();
        return this._friends;
    }
    public getEquip():EquipControl
    {
        if(this._equip === undefined) this._equip = new EquipControl();
        return this._equip;
    }
    public getTask():TaskControl
    {
        if(this._task === undefined) this._task = new TaskControl();
        return this._task;
    }
	public getChat():ChatControl
    {
        if(this._chat === undefined) this._chat = new ChatControl();
        return this._chat;
    }
    public getBattle():BattleControl
    {
        if(this._battle === undefined) this._battle = new BattleControl();
        return this._battle;
    }
    public getJingMai():JingMaiControl
    {
        if(this._jianMai === undefined) this._jianMai = new JingMaiControl;
        return this._jianMai;
    }
    public getSkill():SkillControl
    {
        if(this._skill === undefined) this._skill = new SkillControl();
        return this._skill;
    }
    public getShop():ShopControl
    {
        if(this._shop === undefined) this._shop = new ShopControl();
        return this._shop;
    }
    public getDress():DressControl
    {
        if(this._dress === undefined) this._dress = new DressControl();
        return this._dress;
    }
    public getBuff():BuffControl
    {
        if(this._buff === undefined) this._buff = new BuffControl();
        return this._buff;
    }
    public getCloak():CloakControl
    {
        if(this._cloak === undefined) this._cloak = new CloakControl();
        return this._cloak;
    }
	public getRename():RenameControl
	    {
	        if(this._rename === undefined) this._rename = new RenameControl();
	        return this._rename;
	    }
    public getRein():ReinControl
    {
        if(this._rein === undefined) this._rein = new ReinControl();
        return this._rein;
    }
    public getClub():ClubControl
    {
        if(this._club === undefined) this._club = new ClubControl();
        return this._club;
    }
    public getClubBF():ClubBFControl
    {
        if(this._clubBF === undefined) this._clubBF = new ClubBFControl();
        return this._clubBF;
    }
    public getPet():PetControl
    {
        if(this._pet === undefined) this._pet = new PetControl();
        return this._pet;
    }
    public getVip():VipControl
    {
        if(this._vip === undefined) this._vip = new VipControl();
        return this._vip;
    }
    public getActIcon():ActIconControl
    {
        if(this._actIcon === undefined) this._actIcon = new ActIconControl();
        return this._actIcon;
    }
    public getSoldier():SoldierControl
    {
        if(this._soldier === undefined) this._soldier = new SoldierControl();
        return this._soldier;
    }
    public getArena():ArenaControl
    {
        if(this._arena === undefined) this._arena = new ArenaControl();
        return this._arena;
    }
    public getTraining():TrainingControl
    {
        if(this._training === undefined) this._training = new TrainingControl();
        return this._training;
    }
    public getClubLeaderWar():ClubLeaderWarControl
    {
        if(this._clubLeaderWar === undefined) this._clubLeaderWar = new ClubLeaderWarControl();
        return this._clubLeaderWar;
    }
    public getMaterialCopy():MaterialControl
    {
        if(this._materialCopy === undefined) this._materialCopy = new MaterialControl();
        return this._materialCopy;
    }
    public geQiandao():QiandaoControl
    {
        if(this._qiandao === undefined) this._qiandao = new QiandaoControl();
        return this._qiandao;
    }
    public getFireEye():FireEyeControl
    {
        if(this._fireEye === undefined) this._fireEye = new FireEyeControl();
        return this._fireEye;
    }
    public getJuyuan():JuyuanControl
    {
        if(this._juyuan === undefined) this._juyuan = new JuyuanControl();
        return this._juyuan;
    }
    public getDevil():DevilControl
    {
        if(this._devil === undefined) this._devil = new DevilControl();
        return this._devil;
    }
    public getStarUp():StarUpControl
    {
        if(this._starUp === undefined) this._starUp = new StarUpControl();
        return this._starUp;
    }
    public getExchange():ExchangeControl
    {
        if(this._exchange === undefined) this._exchange = new ExchangeControl();
        return this._exchange;
    }
}