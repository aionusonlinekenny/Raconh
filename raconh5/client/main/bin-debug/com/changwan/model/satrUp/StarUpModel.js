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
 * drq
 * 升星Model
 * 2018.4.16
 */
var StarUpModel = (function (_super) {
    __extends(StarUpModel, _super);
    function StarUpModel() {
        var _this = _super.call(this) || this;
        _this._model = _this;
        _this._cvo = StarUpCVO.getCvo();
        return _this;
    }
    //获取所有装备
    StarUpModel.prototype.getAllEquipList = function () {
        var items1 = Manager.model.getItems().getBagItem(); //背包装备
        var items2 = Manager.model.getItems().equipList.values(); //身上装备
        //排序
        for (var i = 0; i < items1.length; i++) {
            for (var j = 0; j < items1.length - 1; j++) {
                if (items1[j + 1].base_id < items1[j].base_id) {
                    var aaa = items1[j + 1];
                    items1[j + 1] = items1[j];
                    items1[j] = aaa;
                }
            }
        }
        for (var i = 0; i < items2.length; i++) {
            for (var j = 0; j < items2.length - 1; j++) {
                if (items2[j + 1].base_id < items2[j].base_id) {
                    var aaa = items2[j + 1];
                    items2[j + 1] = items2[j];
                    items2[j] = aaa;
                }
            }
        }
        this._allEquipList = items2.concat(items1);
        return this._allEquipList;
    };
    //获取红色1星、2星装备数组
    StarUpModel.prototype.getStarUpList = function () {
        var starUpList = [];
        var list = this.getAllEquipList();
        for (var i = 0; i < list.length; i++) {
            if (list[i].cvo.quality == 6) {
                if (list[i].getStar() == 1 || list[i].getStar() == 2) {
                    for (var j = 0; j < this._cvo.length; j++) {
                        if (this._cvo[j].item_id == list[i].base_id) {
                            starUpList.push(list[i]);
                            break;
                        }
                    }
                }
            }
        }
        return starUpList;
    };
    StarUpModel.prototype.checkCoin = function () {
        if (!OpenCVO.isOpen(OpenConst.ID_STARUP))
            return false;
        var arr = this.getStarUpList();
        for (var h = 0; h < arr.length; h++) {
            var getBottomList = this.getBottomList(arr[h]);
            if (getBottomList.length > 0)
                return true;
        }
        return false;
    };
    StarUpModel.prototype.getBottomList = function (data) {
        var star = data.getStar();
        var list = this._model.getAllEquipList();
        var bottomList = [];
        if (star == 1) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].storagetype != 1) {
                    if (list[i].cvo.quality == 5) {
                        if (list[i].getStar() == 2) {
                            //去除主装备
                            if (data.id != list[i].id || data.storagetype != list[i].storagetype) {
                                //判断是否在升星表中
                                for (var j = 0; j < this._cvo.length; j++) {
                                    if (this._cvo[j].item_id == list[i].base_id && this._cvo[j].star == list[i].getStar()) {
                                        bottomList.push(list[i]);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        else if (star == 2) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].storagetype != 1) {
                    if (list[i].cvo.quality == 6) {
                        if (list[i].getStar() == 2 || list[i].getStar() == 3) {
                            //去除主装备
                            if (data.id != list[i].id || data.storagetype != list[i].storagetype) {
                                //判断是否在升星表中
                                for (var j = 0; j < this._cvo.length; j++) {
                                    if (this._cvo[j].item_id == list[i].base_id && this._cvo[j].star == list[i].getStar()) {
                                        bottomList.push(list[i]);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return bottomList;
    };
    return StarUpModel;
}(egret.EventDispatcher));
__reflect(StarUpModel.prototype, "StarUpModel");
//# sourceMappingURL=StarUpModel.js.map