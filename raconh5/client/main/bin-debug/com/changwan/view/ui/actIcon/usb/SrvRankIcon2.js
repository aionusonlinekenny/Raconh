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
/**
 * 冲榜竞技图标
 * pzx
 * create 2018-3-１６
*/
var SrvRankIcon2 = (function (_super) {
    __extends(SrvRankIcon2, _super);
    function SrvRankIcon2(imageContainer01, imageContainer, container1) {
        return _super.call(this, imageContainer01, imageContainer, container1) || this;
    }
    SrvRankIcon2.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.getsrvRank().addEventListener(SrvRankEvent.SRVRANK_UPDATE_LIST, this.__drawRed, this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.CROSS_DAY_EVENT, this.CrossDayHandler, this);
        this.addDayEvent();
    };
    SrvRankIcon2.prototype.CrossDayHandler = function () {
        var i = Manager.model.getLogin().serverTimeInfo.serverOpenDays;
        if (i < 8) {
            this.addDayEvent();
        }
        else {
            Manager.model.getActIcon().removeID(this._cvo.id);
        }
    };
    SrvRankIcon2.prototype.addDayEvent = function () {
        var i = Manager.model.getLogin().serverTimeInfo.serverOpenDays;
        this.removeDayEvent(i);
        switch (i) {
            case SrvRankType.PET_TYPE:
                Manager.model.getPet().addEventListener(PetEvent.UPDATE_ALL_ATTR, this.__drawRed, this);
                break;
            case SrvRankType.LEVE_TYPE:
                Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL, this.__drawRed, this);
                Manager.model.self.addEventListener(GameObjectAttrEvent.TURN_LIVE, this.__drawRed, this);
                break;
            case SrvRankType.JUEXUE_TYPE:
                Manager.model.self.addEventListener(GameObjectAttrEvent.JUEXUE_AMBIT, this.__drawRed, this);
                break;
            case SrvRankType.LIFEGRID_TYPE:
                Manager.model.getLifeGrid().addEventListener(LifeGridEvent.LIFEGRID_WARE_EVENT, this.__drawRed, this);
                Manager.model.getLifeGrid().addEventListener(LifeGridEvent.LIFEGRID_LVUP_EVENT, this.__drawRed, this);
                break;
            case SrvRankType.SOUL_TYPE:
                Manager.model.getItems().addEventListener(ItemsEvent.EQUIP_STRENGTHEN_UPDATE_EVENT, this.__drawRed, this);
                break;
            case SrvRankType.GEM_TYPE:
                Manager.model.getEquip().addEventListener(EquipEvent.GEM_UPDATE_EVENT, this.__drawRed, this);
                break;
            case SrvRankType.FIGHT_TYPE:
                Manager.model.self.addEventListener(GameObjectAttrEvent.FIGHT, this.__drawRed, this);
                break;
        }
    };
    SrvRankIcon2.prototype.removeDayEvent = function (day) {
        day--;
        switch (day) {
            case SrvRankType.PET_TYPE:
                Manager.model.getPet().removeEventListener(PetEvent.UPDATE_ALL_ATTR, this.__drawRed, this);
                break;
            case SrvRankType.LEVE_TYPE:
                Manager.model.self.removeEventListener(GameObjectAttrEvent.LEVEL, this.__drawRed, this);
                Manager.model.self.removeEventListener(GameObjectAttrEvent.TURN_LIVE, this.__drawRed, this);
                break;
            case SrvRankType.JUEXUE_TYPE:
                Manager.model.self.removeEventListener(GameObjectAttrEvent.JUEXUE_AMBIT, this.__drawRed, this);
                break;
            case SrvRankType.LIFEGRID_TYPE:
                Manager.model.getLifeGrid().removeEventListener(LifeGridEvent.LIFEGRID_WARE_EVENT, this.__drawRed, this);
                Manager.model.getLifeGrid().removeEventListener(LifeGridEvent.LIFEGRID_LVUP_EVENT, this.__drawRed, this);
                break;
            case SrvRankType.SOUL_TYPE:
                Manager.model.getItems().removeEventListener(ItemsEvent.EQUIP_STRENGTHEN_UPDATE_EVENT, this.__drawRed, this);
                break;
            case SrvRankType.GEM_TYPE:
                Manager.model.getEquip().removeEventListener(EquipEvent.GEM_UPDATE_EVENT, this.__drawRed, this);
                break;
            case SrvRankType.FIGHT_TYPE:
                Manager.model.self.removeEventListener(GameObjectAttrEvent.FIGHT, this.__drawRed, this);
                break;
        }
    };
    SrvRankIcon2.prototype.removeEvent = function () {
        Manager.model.getsrvRank().removeEventListener(SrvRankEvent.SRVRANK_UPDATE_LIST, this.__drawRed, this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.CROSS_DAY_EVENT, this.CrossDayHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    SrvRankIcon2.prototype.hasRedIcon = function () {
        var i = Manager.model.getLogin().serverTimeInfo.serverOpenDays;
        if (i < 8) {
            var arr = SrvRankCVO.cvos(i);
            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                var cvo = arr_1[_i];
                if (cvo.checkReward()) {
                    return true;
                }
            }
        }
        return false;
    };
    return SrvRankIcon2;
}(ActBaseIcon2));
__reflect(SrvRankIcon2.prototype, "SrvRankIcon2");
//# sourceMappingURL=SrvRankIcon2.js.map