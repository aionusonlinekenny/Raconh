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
// /**
//  * 主界面
//  * Simon 2017.11.28
//  * @update devil 2018-04-14
//  */
var HomeView2 = (function (_super) {
    __extends(HomeView2, _super);
    function HomeView2() {
        var _this = _super.call(this) || this;
        _this._initTask = false;
        // this.touchChildren = true;
        _this.start();
        _this.addEvent();
        _this.initData();
        return _this;
    }
    HomeView2.prototype.start = function () {
        _super.prototype.start.call(this);
        this._curMapCVO = Manager.model.getMap().mapCVO;
        this._needSetRight = parseInt(MapCVO.getConfigData(MapCVO.CONFIG_DAILY_ICON)) == 1;
        var layer = Manager.layer;
        this._head = new Head(layer.homeImageLayer, layer.homeLayer);
        this._map = new MiniMap(layer.homeImageLayer, layer.homeLayer);
        this._exit = new ExitBtn(layer.homeImageLayer);
        this._bar = new SkillBar(layer.homeImageLayer, layer.homeLayer);
        this._chat = new MailAndChatAndFriend(layer.homeImageLayer, layer.homeLayer);
        this._ronglian = new OnekeyRongLian2(layer.homeImageLayer);
        this._right = new ActivityIcon(ActivityIcon.RIGHT);
        this._top = new ActivityIcon(ActivityIcon.TOP);
        this._firstCharge = new FirstCharge(this);
        this._dailyRebate = new DailyRebate();
        // this._sysNoticeItem = new MainSysnoticeItem2(layer.homeImageLayer,layer.homeLayer);
        this._task = new Task(layer.homeImageLayer, layer.homeLayer);
        this._checkRed = new CheckRed(this);
    };
    HomeView2.prototype.initData = function () {
        Manager.control.getItems().itemsQuery(ItemsType.EQUIE);
        Manager.control.getItems().itemsQuery(ItemsType.BAG);
        Manager.control.getItems().itemsQuery(ItemsType.DEPOT);
        Manager.control.getItems().itemsQuery(ItemsType.LIFEGRID);
        Manager.control.getItems().itemsQuery(ItemsType.LIFEGRIDBAG);
        Manager.control.getSoldier().query();
        Manager.control.getClubLeaderWar().query();
        Manager.control.getEquip().suitInfoQuery();
        if (Manager.model.self.attrInfo.guildID != 0)
            Manager.control.getClub().query();
        GameDispatcher.getInstance().starCrossTime();
    };
    HomeView2.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.__resize, this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.ENTER_SCENE, this.__enterMap, this);
        Manager.model.getActIcon().addEventListener(ActIconEvent.SINGLE_UPDATE, this.__sigleUpdate, this);
        Manager.model.getTask().addEventListener(TaskEvent.TASK_COMPLETE_EVENT, this.__updateTask, this);
        Manager.model.getTask().addEventListener(TaskEvent.TASK_INIT_EVENT, this.__updateTask, this);
        Manager.model.getrelicstuff().addEventListener(RelicStuffEvent.RELICSTUFF_QUERY_EVENT, this.__onRelicUpdate, this);
    };
    HomeView2.prototype.getGlobalPos = function (id, subID) {
        if (id == HomeView2.SYSNOTICE_ITEM) {
            if (this._sysNoticeItem == null)
                return null;
            return this._sysNoticeItem.getGuidePos();
        }
        else if (id == HomeView2.TASK) {
            if (subID == 10)
                return this._task.getGuidePos("autoBtn");
            return this._task.getGuidePos();
        }
        else if (id == HomeView2.TOP_ICON)
            return this._top.getGuidePos(subID);
        else if (id == HomeView2.RIGHT_ICON)
            return this._right.getGuidePos(subID);
        else if (id == HomeView2.MAIN_RELICE_STUFF) {
            if (this._mainRelicStuffNotic == null)
                return null;
            else
                return this._mainRelicStuffNotic.getGuidPos();
        }
        else if (id == HomeView2.BAR) {
            return this._bar.getGuidPos(subID);
        }
        else if (id == HomeView2.FIRST_CHARGE) {
            return this._firstCharge.getGuidPos();
        }
    };
    HomeView2.prototype.__resize = function (e) {
        this.invalidate("drawSize");
    };
    HomeView2.prototype.__enterMap = function (e) {
        if (this._curMapCVO == Manager.model.getMap().mapCVO)
            return;
        this._curMapCVO = Manager.model.getMap().mapCVO;
        this.invalidate("drawMap");
    };
    HomeView2.prototype.__onRelicUpdate = function (e) {
        this.invalidate("drawMainReliceStuff");
    };
    HomeView2.prototype.__updateTask = function (e) {
        this.invalidate("drawTask");
        if (this._mainRelicStuffNotic == null) {
            this.switch(HomeView2.MAIN_RELICE_STUFF, true);
        }
        if (!this._initTask) {
            if (this._curMapCVO)
                this.switch(HomeView2.TASK, true);
            this._initTask = false;
        }
    };
    HomeView2.prototype.__sigleUpdate = function (e) {
        var id = Number(e.params);
        var info = DailyActivityCVO.getCVO(id);
        if (!info)
            return;
        switch (id) {
            case ActIconID.TRAINING:
                Manager.model.getGameobject().setTrainingEffect(info.status == DailyActivityCVO.STATE_IN);
                if (info.status != DailyActivityCVO.STATE_IN)
                    Manager.model.getTraining().updateActivityEnd();
                break;
        }
    };
    HomeView2.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawSize();
        if (this._curMapCVO)
            this.drawMap();
        this.drawTask();
        // if(OpenCVO.isOpen(OpenConst.ID_RELICSTUFF))this.drawMainReliceStuff();
    };
    HomeView2.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid("drawSize"))
            this.drawSize();
        if (this.isInvalid("drawMap"))
            this.drawMap();
        if (this.isInvalid("drawTask"))
            this.drawTask();
        if (this.isInvalid("drawMainReliceStuff"))
            this.drawMainReliceStuff();
    };
    HomeView2.prototype.drawTask = function () {
        this._bar.switchLock(!OpenCVO.isOpen(OpenConst.ID_RELICSTUFF));
        if (Manager.view.isOpening(119 /* RollTips */))
            return;
        var info = Manager.model.getTask().getcurTask();
        if (!info)
            return;
        var cvo = TaskCVO.getinfo(info.id);
        var vers = cvo.verse;
        if (vers == RollTips2.verseList[0]) {
            if (RollTips2.openPanel5)
                return;
            this._firstCharge.showTip();
        }
        else if (vers == RollTips2.verseList[1]) {
            if (RollTips2.openPanel10)
                return;
            var pos = this.getGlobalPos(HomeView2.TOP_ICON, ActIconID.ARTIFACT);
            Manager.view.show(119 /* RollTips */, RollTips2.verseList[1], pos);
        }
    };
    HomeView2.prototype.drawSize = function () {
        var gameWidth = Manager.config.gameWidth;
        var gameHeight = Manager.config.gameHeight;
        this._bar.layout(gameWidth, gameHeight);
        this._ronglian.layout(gameWidth, gameHeight);
        this._chat.layout(gameWidth, gameHeight);
        this._right.layout(gameWidth, gameHeight);
        this._top.layout(gameWidth, gameHeight);
        this._map.layout(gameWidth, gameHeight);
        if (this._sysNoticeItem)
            this._sysNoticeItem.layout(gameWidth, gameHeight);
        this._task.layout(gameWidth, gameHeight);
    };
    HomeView2.prototype.drawMainReliceStuff = function () {
        var recvo = Manager.model.getrelicstuff().getRelicStuff();
        if (recvo) {
            if (this._mainRelicStuffNotic)
                this._mainRelicStuffNotic.setData(recvo);
        }
        else
            this.disposeView(HomeView2.MAIN_RELICE_STUFF);
    };
    HomeView2.prototype.drawMap = function () {
        var configStr = this._curMapCVO.hideViews;
        var visible = false;
        this.switch(HomeView2.TASK, true);
        // let visible = configStr.indexOf(MapConst.HIDE_TASK) == -1;
        // let info:TaskInfo = Manager.model.getTask().getcurTask();
        // if(info)this._initTask = true;
        // this._task.switch(visible && info != null);
        // if(this._mainRelicStuffNotic)this._mainRelicStuffNotic.switch(visible);
        // this._dailyRebate.switch(visible);
        this.switch(HomeView2.DAILY, true);
        this.switch(HomeView2.FIRST_CHARGE, true);
        // this._firstCharge.switch(!Manager.model.getSysCharge().isReward && visible);
        // visible = configStr.indexOf(MapConst.HIDE_PRE) == -1;
        // this._sysNoticeItem.switch(visible);
        this.switch(HomeView2.SYSNOTICE_ITEM, true);
        visible = configStr.indexOf(MapConst.HIDE_HEAD) == -1;
        this._head.switch(visible);
        visible = configStr.indexOf(MapConst.HIDE_MAP) == -1;
        this._map.switch(visible);
        if (visible)
            this._map.onEnterMap(this._curMapCVO);
        this._exit.switch(configStr.indexOf(MapConst.HIDE_EXIT) == -1);
        this._chat.switch(configStr.indexOf(MapConst.HIDE_CHAT) == -1);
        if (!this._needSetRight)
            this._right.switch(configStr.indexOf(MapConst.HIDE_RIGHT) == -1);
        this._top.switch(configStr.indexOf(MapConst.HIDE_ICONS) == -1);
    };
    HomeView2.prototype.drawRedIcon = function (id, isShow) {
        this._bar.showRedIcon(id, isShow);
    };
    HomeView2.prototype.switch = function (id, visible, force) {
        if (force === void 0) { force = false; }
        if (!this._curMapCVO)
            return;
        var configStr = this._curMapCVO.hideViews;
        if (id == HomeView2.SYSNOTICE_ITEM) {
            visible = visible && configStr.indexOf(MapConst.HIDE_PRE) == -1;
            if (visible && this._sysNoticeItem == null) {
                this._sysNoticeItem = new MainSysnoticeItem2(Manager.layer.homeImageLayer, Manager.layer.homeLayer);
                this._sysNoticeItem.layout(Manager.config.gameWidth, Manager.config.gameHeight);
            }
            if (this._sysNoticeItem)
                this._sysNoticeItem.switch(visible);
        }
        else if (id == HomeView2.RIGHT_ICON) {
            visible = visible && configStr.indexOf(MapConst.HIDE_RIGHT) == -1;
            this._right.switch(visible);
        }
        else if (id == HomeView2.TOP_ICON) {
            visible = visible && (configStr.indexOf(MapConst.HIDE_ICONS) == -1);
            this._top.switch(visible);
        }
        else if (id == HomeView2.TASK) {
            var info = Manager.model.getTask().getcurTask();
            visible = visible && info != null && configStr.indexOf(MapConst.HIDE_TASK) == -1;
            if (info)
                this._initTask = true;
            this._task.switch(visible);
        }
        else if (id == HomeView2.FIRST_CHARGE) {
            if (!force)
                visible = visible && !Manager.model.getSysCharge().isReward && (configStr.indexOf(MapConst.HIDE_TASK) == -1);
            this._firstCharge.switch(visible);
        }
        else if (id == HomeView2.DAILY) {
            visible = visible && configStr.indexOf(MapConst.HIDE_TASK) == -1;
            this._dailyRebate.switch(visible);
        }
        else if (id == HomeView2.MAIN_RELICE_STUFF) {
            visible = visible && configStr.indexOf(MapConst.HIDE_TASK) == -1;
            if (visible) {
                if (this._mainRelicStuffNotic == null) {
                    var cvo = Manager.model.getrelicstuff().getRelicStuff();
                    if (cvo != null) {
                        this._mainRelicStuffNotic = new MainRelicStuffNotice2(Manager.layer.homeImageLayer, Manager.layer.homeLayer, this);
                        this._mainRelicStuffNotic.move(0, 300);
                        this._mainRelicStuffNotic.switch(true);
                        this._mainRelicStuffNotic.setData(cvo);
                    }
                }
            }
            if (this._mainRelicStuffNotic)
                this._mainRelicStuffNotic.switch(visible);
        }
    };
    HomeView2.prototype.disposeView = function (id) {
        if (id == HomeView2.MAIN_RELICE_STUFF && this._mainRelicStuffNotic) {
            if (this._mainRelicStuffNotic) {
                this._mainRelicStuffNotic.dispose();
                this._mainRelicStuffNotic = null;
            }
        }
    };
    HomeView2.prototype.updateIcon = function (type, cvo, isRemove) {
        if (type == ActivityIcon.RIGHT)
            this._right.updateIcon(cvo, isRemove);
        else
            this._top.updateIcon(cvo, isRemove);
    };
    HomeView2.prototype.guide = function (id, method) {
        if (method === void 0) { method = "guide"; }
        if (id == HomeView2.TASK) {
            if (method == "guide")
                this._task.guide();
            else if (method == "guideAutoHook")
                this._task.guideAutoHook();
        }
    };
    HomeView2.prototype.checkNeedOneKeyRonglian = function () {
        this._ronglian.switch(Manager.model.getBag().isTooLittle());
    };
    HomeView2.REIN_POS = 1;
    HomeView2.ROLE_POS = 2;
    HomeView2.SKILL_POS = 3;
    HomeView2.EQUIP_POS = 4;
    HomeView2.BAG_POS = 5;
    HomeView2.ZHONGMEN_POS = 6;
    HomeView2.SHOP_POS = 7;
    HomeView2.BOSS_POS = 8;
    HomeView2.DAILY_POS = 9;
    HomeView2.DABAOJIAN_POS = 10;
    HomeView2.SYSNOTICE_ITEM = 1;
    HomeView2.RIGHT_ICON = 2;
    HomeView2.TOP_ICON = 3;
    HomeView2.TASK = 4;
    HomeView2.MAIN_RELICE_STUFF = 5;
    HomeView2.BAR = 6;
    HomeView2.FIRST_CHARGE = 7;
    HomeView2.DAILY = 8;
    return HomeView2;
}(BaseRender));
__reflect(HomeView2.prototype, "HomeView2");
//# sourceMappingURL=HomeView2.js.map