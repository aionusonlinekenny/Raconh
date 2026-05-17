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
 * 兵魂
 * Simon
 * 2017.12.21
 */
var SoldierModel = (function (_super) {
    __extends(SoldierModel, _super);
    function SoldierModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.curSoldierId = 0;
        _this.canUpgradeLocal = 0;
        _this.list = [];
        return _this;
    }
    SoldierModel.prototype.activate = function (id, star) {
        this._soldierList.add(id, star);
        this.list = this.getList();
        this.dispatchEvent(new SoldierEvent(SoldierEvent.SOLDIER_UPGRADE_STAR, id));
    };
    SoldierModel.prototype.upgradeStar = function (id, star) {
        this._soldierList.remove(id);
        this._soldierList.add(id, star);
        this.list = this.getList();
        this.dispatchEvent(new SoldierEvent(SoldierEvent.SOLDIER_UPGRADE_STAR, id));
    };
    Object.defineProperty(SoldierModel.prototype, "currentId", {
        get: function () {
            return this.curSoldierId;
        },
        set: function (value) {
            this.curSoldierId = value;
            this.dispatchEvent(new SoldierEvent(SoldierEvent.SOLDIER_PUTON));
        },
        enumerable: true,
        configurable: true
    });
    SoldierModel.prototype.getList = function () {
        var arr = SoldierCVO.getList();
        var dic = this.getSoldierList();
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var info = arr_1[_i];
            if (dic.containsKey(info.id)) {
                info.soldierStarNum = dic.get(info.id);
            }
        }
        arr = ArrayUtil.sortOn(arr, ["sort"]);
        return arr;
    };
    SoldierModel.prototype.getSoldierList = function () {
        if (this._soldierList == null) {
            this._soldierList = new Dictionary();
        }
        return this._soldierList;
    };
    SoldierModel.prototype.checkCanUpgrade = function (localId) {
        if (localId === void 0) { localId = 0; }
        if (!OpenCVO.isOpen(OpenConst.ID_SHENBING))
            return false;
        var ret = false;
        var list = this.getList();
        var i = 0;
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var info = list_1[_i];
            if (localId != 0 && info.id != localId)
                continue;
            if (info.soldierStarNum < 10) {
                var needItemInfo = new GainLossVO(info.starInfoList[info.soldierStarNum + 1].loss);
                if (needItemInfo) {
                    if (Manager.model.getItems().getCountItemById(needItemInfo.baseId) >= needItemInfo.num) {
                        ret = true;
                        this.canUpgradeLocal = info.id;
                        break;
                    }
                }
                else
                    return false;
            }
            i += 1;
        }
        if (!ret && localId == 0)
            this.canUpgradeLocal = 0;
        return ret;
    };
    return SoldierModel;
}(egret.EventDispatcher));
__reflect(SoldierModel.prototype, "SoldierModel");
//# sourceMappingURL=SoldierModel.js.map