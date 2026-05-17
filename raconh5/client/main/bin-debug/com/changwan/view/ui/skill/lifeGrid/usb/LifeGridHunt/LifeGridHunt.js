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
 * 猎命
 * 17.12.29
 */
var LifeGridHunt = (function (_super) {
    __extends(LifeGridHunt, _super);
    function LifeGridHunt() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("lifeGrid/LifeGridHunt", "LifeGridHuntSkin");
        return _this;
    }
    LifeGridHunt.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._model = Manager.model.getLifeGrid();
        this._itemModel = Manager.model.getItems();
    };
    LifeGridHunt.prototype.addEvent = function () {
        this._hontBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHontHandler, this);
        this._hontTenBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHontHandler, this);
        this._model.addEventListener(LifeGridEvent.LIFEGRID_UPDATE_FREECD_EVENT, this.drawData, this);
        _super.prototype.addEvent.call(this);
    };
    LifeGridHunt.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._hontBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onHontHandler, this);
        this._hontTenBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onHontHandler, this);
        this._model.removeEventListener(LifeGridEvent.LIFEGRID_UPDATE_FREECD_EVENT, this.drawData, this);
    };
    LifeGridHunt.prototype.onHontHandler = function (e) {
        var btn = e.target;
        if (btn == this._hontBtn) {
            if (this._itemModel.lifeGridTotal - this._itemModel.lifeGridBagList.length < 2) {
                // Manager.tips.showTips(LangCVO.getContent("lifeGrid9"),this._callBackFunction);
                var ok = Manager.pool.create(CallBackInfo, LifeGridView.view.setTap, LifeGridView.view, LifeGridType.RESOLVE);
                Manager.tips.showTips(LangCVO.getContent("lifeGrid9"), ok);
                return;
            }
            var second = Math.round(this._model.freeCd - Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
            if (second <= 0) {
                Manager.control.getLifeGrid().hount(1);
                return;
            }
            var cvos1 = LifeGridCVO.getHuntCvo(LifeGridType.HUNT_ITEM);
            var loss1 = new GainLossVO(cvos1.loss);
            if (loss1.isEnough()) {
                Manager.control.getLifeGrid().hount(2);
            }
            else {
                cvos1 = LifeGridCVO.getHuntCvo(LifeGridType.HUNT_CVO);
                loss1 = new GainLossVO(cvos1.loss);
                if (loss1.isEnough()) {
                    Manager.control.getLifeGrid().hount(3);
                }
                else {
                    FloatTips.addTips(LangCVO.getContent("common33"), Color.RED);
                }
            }
        }
        if (btn == this._hontTenBtn) {
            if (this._itemModel.lifeGridTotal - this._itemModel.lifeGridBagList.length < 10) {
                // Manager.tips.showTips(LangCVO.getContent("lifeGrid9"),this._callBackFunction);
                var ok = Manager.pool.create(CallBackInfo, LifeGridView.view.setTap, LifeGridView.view, LifeGridType.RESOLVE);
                Manager.tips.showTips(LangCVO.getContent("lifeGrid9"), ok);
                return;
            }
            var cvos1 = LifeGridCVO.getHuntCvo(LifeGridType.HUNT_TEN_ITEM);
            var loss1 = new GainLossVO(cvos1.loss);
            if (loss1.isEnough()) {
                Manager.control.getLifeGrid().hount(5);
            }
            else {
                cvos1 = LifeGridCVO.getHuntCvo(LifeGridType.HUNT_TEN_CVO);
                loss1 = new GainLossVO(cvos1.loss);
                if (loss1.isEnough()) {
                    Manager.control.getLifeGrid().hount(4);
                }
                else {
                    FloatTips.addTips(LangCVO.getContent("common33"), Color.RED);
                }
            }
        }
    };
    LifeGridHunt.prototype.initData = function () {
        _super.prototype.initData.call(this);
    };
    LifeGridHunt.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    LifeGridHunt.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    LifeGridHunt.prototype.setData = function (data) {
        this.invalidate(InvalidationType.DATA);
    };
    LifeGridHunt.prototype.drawData = function () {
        var cvos1 = LifeGridCVO.getHuntCvo(LifeGridType.HUNT_TEN_ITEM);
        var loss1 = new GainLossVO(cvos1.loss);
        if (loss1.isEnough()) {
            this._resImg0.source = "LifeGrid_Item_png";
            this._lossTxt0.text = "" + loss1.num;
            //this._lossTxt0.text = loss1.selfCount + "/" + loss1.num;
        }
        else {
            this._resImg0.source = "playRes_gold_54_png";
            cvos1 = LifeGridCVO.getHuntCvo(LifeGridType.HUNT_TEN_CVO);
            loss1 = new GainLossVO(cvos1.loss);
            this._lossTxt0.text = "" + loss1.num;
            //this._lossTxt0.text = loss1.selfCount + "/" + loss1.num;
            //    if(!loss1.isEnough())
            //    {
            //        let str:string = HtmlUtil.addColorTag("" + loss1.selfCount,Color.RED_STR)+"/" + loss1.num;
            //        HtmlUtil.setTextFlow(this._lossTxt0,str);
            //    }
        }
        this._lossTxt0.width = this._lossTxt0.textWidth;
        var second = Math.round(this._model.freeCd - Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
        if (second > 0) {
            Manager.render.add(this.countdown, this, 1000);
            this._resImg1.visible = true;
            this._lossTxt1.visible = true;
            this._bgimg1.visible = true;
            this._redIcon.visible = false;
        }
        else {
            this.setIsFree();
            return;
        }
        var cvos = LifeGridCVO.getHuntCvo(LifeGridType.HUNT_ITEM);
        var loss = new GainLossVO(cvos.loss);
        if (loss.isEnough()) {
            this._resImg1.source = "LifeGrid_Item_png";
            this._lossTxt1.text = "" + loss.num;
            //this._lossTxt1.text = loss.selfCount + "/" + loss.num;
        }
        else {
            this._resImg1.source = "playRes_gold_54_png";
            cvos = LifeGridCVO.getHuntCvo(LifeGridType.HUNT_CVO);
            loss = new GainLossVO(cvos.loss);
            this._lossTxt1.text = "" + loss.num;
            //this._lossTxt1.text = loss.selfCount + "/" + loss.num;
            //    if(!loss.isEnough())
            //    {
            //        let str:string = HtmlUtil.addColorTag("" + loss.selfCount,Color.RED_STR)+"/" + loss.num;
            //        HtmlUtil.setTextFlow(this._lossTxt1,str);
            //    }
        }
    };
    LifeGridHunt.prototype.countdown = function () {
        var second = Math.round(this._model.freeCd - Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
        if (second <= 0) {
            this.setIsFree();
            Manager.render.remove(this.countdown, this);
            return;
        }
        this._cdTxt.text = cw.DateUtil.formatStr(second, cw.DateUtil.LEFT_HH_MM_SS, true) + LangCVO.getContent("lifeGrid7");
    };
    LifeGridHunt.prototype.setIsFree = function () {
        this._cdTxt.text = LangCVO.getContent("lifeGrid8"); //本次免费
        this._resImg1.visible = false;
        this._lossTxt1.visible = false;
        this._redIcon.visible = true;
        this._bgimg1.visible = false;
    };
    LifeGridHunt.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
    };
    LifeGridHunt.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
    };
    LifeGridHunt.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (Manager.render.contains(this.countdown, this))
            Manager.render.remove(this.countdown, this);
        ObjectUtil.removes(this._resImg0, this._resImg1, this._redIcon, this._bgimg1);
        ObjectUtil.disposes(this._hontBtn, this._hontTenBtn, this._lossTxt0, this._lossTxt1);
        this._bgimg1 = null;
        this._resImg1 = null;
        this._resImg0 = null;
        this._hontBtn = null;
        this._hontTenBtn = null;
        this._cdTxt = null;
        this._lossTxt1 = null;
        this._lossTxt0 = null;
        this._model = null;
        this._itemModel = null;
        this._redIcon = null;
    };
    return LifeGridHunt;
}(UIComponent));
__reflect(LifeGridHunt.prototype, "LifeGridHunt");
//# sourceMappingURL=LifeGridHunt.js.map