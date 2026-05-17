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
 * pzx
 * 17.12.27
 * 命格model
 */
var LifeGridModel = (function (_super) {
    __extends(LifeGridModel, _super);
    function LifeGridModel() {
        var _this = _super.call(this) || this;
        /** 下次免费时间戳(秒) */
        _this._freeCd = 600;
        /** 升级命格界面是否打开 */
        _this.openLeveUpView = false;
        Manager.model.self.addEventListener(GameObjectAttrEvent.SOUL, _this.onIconShowHandler, _this, false, 1);
        return _this;
    }
    /** 打开升级界面，所有升级的小红点要消失 直到命魂有更新*/
    LifeGridModel.prototype.onIconShowHandler = function () {
        if (LifeGridLeveUpView.isHied) {
            this.openLeveUpView = false;
        }
    };
    LifeGridModel.prototype.returnqueryCd = function (cd) {
        this._freeCd = cd;
        this.dispatchEvent(new LifeGridEvent(LifeGridEvent.LIFEGRID_UPDATE_FREECD_EVENT));
        if (!this.isFree()) {
            Manager.render.add(this.countdown, this, 60000);
        }
    };
    LifeGridModel.prototype.countdown = function () {
        if (this.isFree()) {
            Manager.render.remove(this.countdown, this);
            this.dispatchEvent(new LifeGridEvent(LifeGridEvent.LIFEGRID_UPDATE_FREECD_EVENT));
        }
    };
    /**命格穿戴 @param 位置*/
    LifeGridModel.prototype.returnWare = function (pos) {
        this.dispatchEvent(new LifeGridEvent(LifeGridEvent.LIFEGRID_WARE_EVENT, pos));
    };
    //命格升级  是否成功，1:true，0:false
    LifeGridModel.prototype.returnLvUP = function (succe, pos) {
        if (succe == 1) {
            this.openLeveUpView = false;
            this.dispatchEvent(new LifeGridEvent(LifeGridEvent.LIFEGRID_LVUP_EVENT, pos));
        }
    };
    //命格分解
    LifeGridModel.prototype.returnSeparate = function (arr) {
        this.dispatchEvent(new LifeGridEvent(LifeGridEvent.LIFEGRID_SEPARATE_EVENT, arr));
    };
    //猎命  type 猎命类型 1免费 2单次首具，3单次元宝，4，5 十次猎命
    LifeGridModel.prototype.returnHunt = function (arr, type) {
        // this._type = type;
        // this.dispatchEvent(new LifeGridEvent(LifeGridEvent.LIFEGRID_HUNT_EVENT,arr));
        Manager.view.show(64 /* LifeGridHunResultWin */, arr, type);
        if (type == 1) {
            Manager.control.getLifeGrid().query();
        }
        else {
            this.dispatchEvent(new LifeGridEvent(LifeGridEvent.LIFEGRID_UPDATE_FREECD_EVENT));
        }
    };
    Object.defineProperty(LifeGridModel.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LifeGridModel.prototype, "freeCd", {
        /**下次免费时间戳(秒) */
        get: function () {
            return this._freeCd;
        },
        enumerable: true,
        configurable: true
    });
    /**当前有空格子时，入口按钮、页签、格子图标有叹号提示  true为有空格子*/
    LifeGridModel.prototype.getIsAware = function () {
        if (Manager.model.getItems().lifeGridBagList.length == 0) {
            return false;
        }
        var ln = 9;
        var arr = Manager.model.getItems().lifeGridList;
        for (var i = 1; i < ln; i++) {
            var cvo = LifeGridCVO.getholeCvo(i);
            var conticion = new ConditionVO(cvo.cond);
            if (conticion.isSatisfy()) {
                if (!arr[i]) {
                    return true;
                }
            }
        }
        return false;
    };
    /** 当获得更高品质的同种类型命格时(一毛一样的属性组)，入口按钮、页签、当前装备的命格有【可替换】标识，对应的高品质命格有【推荐】标识 */
    LifeGridModel.prototype.getIsSenior = function (data) {
        if (data === void 0) { data = null; }
        var baglist = Manager.model.getItems().lifeGridBagList;
        if (baglist.length == 0) {
            return false;
        }
        var arr;
        if (data) {
            arr = data;
        }
        else {
            arr = Manager.model.getItems().lifeGridList;
        }
        var ln = arr.length;
        for (var i = 0; i < ln; i++) {
            var baginfo = [];
            if (arr[i]) {
                var lifeCvo = LifeGridCVO.getDataInfo(arr[i]);
                var awerattArr = lifeCvo.attrVos(); //穿上的
                for (var _i = 0, baglist_1 = baglist; _i < baglist_1.length; _i++) {
                    var info = baglist_1[_i];
                    //背包内的
                    var baglifeCvo = LifeGridCVO.getDataInfo(info);
                    var bagattArr = baglifeCvo.attrVos();
                    var n = this.getqeual(awerattArr, bagattArr);
                    if (n == 0) {
                        continue;
                    }
                    else {
                        var aln = awerattArr.length;
                        var bln = bagattArr.length;
                        if (aln == bln && aln == n) {
                            //(一毛一样的属性组)
                            baginfo.push(info);
                        }
                    }
                }
                for (var _a = 0, baginfo_1 = baginfo; _a < baginfo_1.length; _a++) {
                    var info = baginfo_1[_a];
                    var cvo = arr[i].cvo;
                    if (info.cvo.quality > cvo.quality) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    /** 返回i个相同，0表示无相同 */
    LifeGridModel.prototype.getqeual = function (value1, value2) {
        var i = 0;
        for (var j = 0; j < value2.length; j++) {
            if (value1[0]) {
                if (value1[0].id == value2[j].id) {
                    i++;
                }
            }
            if (value1[1]) {
                if (value1[0].id == value2[j].id) {
                    i++;
                }
            }
        }
        return i;
    };
    /**当有免费猎命次数时，入口按钮、页签、免费猎命按钮有叹号提示 */
    LifeGridModel.prototype.isFree = function () {
        if (!OpenCVO.isOpen(OpenConst.ID_LIEFGRID))
            return false;
        var second = Math.round(this._freeCd - Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
        if (second <= 0) {
            return true;
        }
        return false;
    };
    /** 是否有足够的命魂升级     另外打开命格升级界面，所有关于升级的小红点消失，直到命魂有更新*/
    LifeGridModel.prototype.isUpgrade = function () {
        if (this.openLeveUpView)
            return false;
        var arr = Manager.model.getItems().lifeGridList;
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var info = arr_1[_i];
            if (info) {
                var cvo = LifeGridCVO.getDataInfo(info);
                if (cvo.lev_loss != "") {
                    var loss = new GainLossVO(cvo.lev_loss);
                    if (loss.isEnough()) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    /** 是否有可分解的晶石 */
    LifeGridModel.prototype.checkSeparate = function () {
        var arr = Manager.model.getItems().lifeGridBagList;
        for (var _i = 0, arr_2 = arr; _i < arr_2.length; _i++) {
            var info = arr_2[_i];
            if (info.cvo.type == ItemsType.TYPE_LIFEGRID_SPAR) {
                return true;
            }
        }
        return false;
    };
    /** 命格总战力 */
    LifeGridModel.prototype.getAllFight = function () {
        var arr = Manager.model.getItems().lifeGridList;
        var ln = arr.length;
        var figt = 0;
        for (var i = 1; i < ln; i++) {
            if (arr[i]) {
                var exinfo = arr[i].infoList[0];
                var cvo = LifeGridCVO.getInfo(arr[i].base_id, exinfo.value);
                figt += cvo.fightnum;
            }
        }
        return figt;
    };
    return LifeGridModel;
}(egret.EventDispatcher));
__reflect(LifeGridModel.prototype, "LifeGridModel");
//# sourceMappingURL=LifeGridModel.js.map