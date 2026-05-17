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
 * pzx
 * 17.12.1
 * 披风mddel
 */
var CloakModel = /** @class */ (function (_super) {
    __extends(CloakModel, _super);
    function CloakModel() {
        var _this = _super.call(this) || this;
        _this._currentId = 0;
        return _this;
    }
    /**查询 */
    CloakModel.prototype.queryList = function (currenId, dic) {
        this._cloakList = dic;
        this._currentId = currenId;
        this.dispatchEvent(new CloakEvent(CloakEvent.CLOAK_UPDATE_EVENT));
        // this.dispatchEvent(new ShopEvent(ShopEvent.SHOP_UPDATE_EVENT));
    };
    /**返回激活 */
    CloakModel.prototype.activateCloak = function (id, num) {
        this._cloakList.add(id, num);
        this.dispatchEvent(new CloakEvent(CloakEvent.CLOAK_UPDATE_EVENT));
        this.setCurrentId(id);
    };
    //返回升星
    CloakModel.prototype.upGradeStarCloak = function (id, num) {
        this._cloakList.remove(id);
        this._cloakList.add(id, num);
        this.dispatchEvent(new CloakEvent(CloakEvent.CLOAK_UPDATE_EVENT));
    };
    /** 返回 穿戴*/
    CloakModel.prototype.setCurrentId = function (value) {
        this._currentId = value;
        this.dispatchEvent(new CloakEvent(CloakEvent.CLOAK_WARE_EVENT));
    };
    CloakModel.prototype.getcloakList = function () {
        if (this._cloakList == null) {
            Manager.control.getCloak().query();
            this._cloakList = new Dictionary();
        }
        return this._cloakList;
    };
    /**获取例表 */
    CloakModel.prototype.getList = function () {
        var arr = CloakCVO.getList();
        var dic = this.getcloakList();
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var info = arr_1[_i];
            if (dic.containsKey(info.id)) {
                info.setStarNum(dic.get(info.id));
            }
        }
        arr = ArrayUtil.sortOn(arr, ["sort"]);
        return arr;
    };
    Object.defineProperty(CloakModel.prototype, "currentId", {
        /**当前使用披风id(0则是卸下) */
        get: function () {
            return this._currentId;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 是否可激活或者升星的披风
     */
    CloakModel.prototype.checkActiveCloak = function () {
        if (!OpenCVO.isOpen(OpenConst.ID_CLOAK))
            return false;
        if (this._cloakList == null) {
            this.getcloakList();
            return false;
        }
        var arr = this.getList();
        for (var _i = 0, arr_2 = arr; _i < arr_2.length; _i++) {
            var info = arr_2[_i];
            if (info.num == 0) {
                var conList = info.act_cond;
                var boo = true;
                for (var _a = 0, conList_1 = conList; _a < conList_1.length; _a++) {
                    var con = conList_1[_a];
                    if (!con.isSatisfy()) {
                        boo = false;
                        break;
                    }
                }
                if (boo) {
                    var loss = info.losse;
                    if (loss.isEnough()) {
                        return true;
                    }
                }
            }
            else {
                if (info.num < 3) {
                    var starCvo = info.starArr[info.num];
                    var loss = new GainLossVO(starCvo.loss);
                    if (loss.isEnough()) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    return CloakModel;
}(egret.EventDispatcher));
//# sourceMappingURL=CloakModel.js.map