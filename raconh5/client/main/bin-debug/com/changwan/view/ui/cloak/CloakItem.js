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
 * 17.12.1
 * 披风item
 */
var CloakItem = (function (_super) {
    __extends(CloakItem, _super);
    function CloakItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("cloak", "CloakItemSkin");
        _this._model = Manager.model.getCloak();
        _this._goods.clear();
        _this.touchChildren = false;
        return _this;
    }
    CloakItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.addEvent();
    };
    CloakItem.prototype.addEvent = function () {
        this._model.addEventListener(CloakEvent.CLOAK_TAP_EVENT, this.onClickHandler, this);
        this._model.addEventListener(CloakEvent.CLOAK_WARE_EVENT, this.onWareHanler, this);
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.showRedIcon, this);
    };
    CloakItem.prototype.removeEvent = function () {
        this._model.removeEventListener(CloakEvent.CLOAK_TAP_EVENT, this.onClickHandler, this);
        this._model.removeEventListener(CloakEvent.CLOAK_WARE_EVENT, this.onWareHanler, this);
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.showRedIcon, this);
    };
    CloakItem.prototype.showRedIcon = function (e) {
        if (e.params == ItemsType.BAG) {
            var cvo = this.data;
        }
    };
    CloakItem.prototype.onClickHandler = function (e) {
        var cvo = this.data;
        this._effGup.visible = cvo.id == e.params;
        if (cvo.num > 0) {
            if (cvo.num >= 3) {
                this._redImg.visible = false;
            }
            else {
                var starCvo = cvo.starArr[cvo.num];
                var loss = new GainLossVO(starCvo.loss);
                this._redImg.visible = loss.isEnough();
            }
        }
        else {
            var conList = cvo.act_cond;
            var boo = true;
            for (var _i = 0, conList_1 = conList; _i < conList_1.length; _i++) {
                var con = conList_1[_i];
                if (con.type != ConditionVO.CAREER) {
                    if (!con.isSatisfy()) {
                        boo = false;
                        break;
                    }
                }
            }
            if (boo) {
                var loss = cvo.losse;
                this._redImg.visible = loss.isEnough();
            }
        }
    };
    CloakItem.prototype.onWareHanler = function () {
        var cvo = this.data;
        this._dangqianImg.visible = cvo.id == this._model.currentId;
    };
    CloakItem.prototype.dataChanged = function () {
        var cvo = this.data;
        var less = cvo.losse;
        this._goods.baseId = less.baseId;
        this._nameTxt.text = cvo.name;
        this._dangqianImg.visible = cvo.id == this._model.currentId;
        this._effGup.visible = cvo.id == this._model.pitchId;
        if (cvo.num > 0) {
            this._starGup.visible = true;
            for (var i = 1; i < 4; i++) {
                this["_star" + i].visible = i <= cvo.num ? true : false;
            }
            this._goods.bgImg.filters = null;
            this._diImg.filters = null;
            this._condTxt.visible = false;
            if (cvo.num >= 3) {
                this._redImg.visible = false;
            }
            else {
                var starCvo = cvo.starArr[cvo.num];
                var loss = new GainLossVO(starCvo.loss);
                this._redImg.visible = loss.isEnough();
            }
        }
        else {
            this._condTxt.text = "";
            this._condTxt.visible = true;
            this._starGup.visible = false;
            var conList = cvo.act_cond;
            var boo = true;
            for (var _i = 0, conList_2 = conList; _i < conList_2.length; _i++) {
                var con = conList_2[_i];
                if (con.type != ConditionVO.CAREER) {
                    if (!con.isSatisfy()) {
                        //this._condTxt.text = "可激活";
                        boo = false;
                        break;
                    }
                    if (con.type == ConditionVO.REIN) {
                        this._condTxt.text = con.value + "转可激活";
                    }
                    else if (con.type == ConditionVO.VIP) {
                        this._condTxt.text = "VIP" + con.value + "可激活";
                    }
                    else if (con.type == ConditionVO.LEVEL) {
                        this._condTxt.text = con.value + "级可激活";
                    }
                    break;
                }
            }
            FilterUtil.setGrayFilter(this._goods.bgImg);
            FilterUtil.setGrayFilter(this._diImg);
            if (boo) {
                var loss = cvo.losse;
                this._redImg.visible = loss.isEnough();
            }
        }
    };
    CloakItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.removeEvent();
        if (this._loadCompltet) {
            this._goods.dispose();
            this._goods = null;
            ObjectUtil.removes(this._star1, this._star2, this._star3, this._starGup, this._effGup, this._dangqianImg, this._diImg, this._redImg);
            this._starGup = null;
            this._star1 = null;
            this._star2 = null;
            this._star3 = null;
            this._nameTxt.dispose();
            this._condTxt.dispose();
            this._nameTxt = null;
            this._condTxt = null;
            this._effGup = null;
            this._dangqianImg = null;
            this._model = null;
            this._diImg = null;
            this._redImg = null;
        }
    };
    return CloakItem;
}(ItemRenderer));
__reflect(CloakItem.prototype, "CloakItem");
//# sourceMappingURL=CloakItem.js.map