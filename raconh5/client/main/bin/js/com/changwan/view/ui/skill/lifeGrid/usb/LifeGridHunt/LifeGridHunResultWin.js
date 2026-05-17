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
 * 猎命结果
 * 17-12-29
 */
var LifeGridHunResultWin = /** @class */ (function (_super) {
    __extends(LifeGridHunResultWin, _super);
    function LifeGridHunResultWin() {
        var _this = _super.call(this) || this;
        _this._goodItems = [];
        _this.touchChildren = true;
        _this.setskinname();
        return _this;
    }
    LifeGridHunResultWin.prototype.setskinname = function () {
        this.skinName = Manager.path.getSkinName("lifeGrid/LifeGridHunt", "LifeGridHunResultWinSkin");
    };
    LifeGridHunResultWin.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._back.titleImg.source = "lifeGrid_gxhd_png";
        this._back.setTxt("");
        this._currentView = Manager.pool.create(egret.DisplayObjectContainer);
        this._vScroller = new egret.ScrollView();
        this._vScroller.x = 50;
        this._vScroller.y = 130;
        this._vScroller.width = 600;
        this._vScroller.height = 345;
        this._vScroller.horizontalScrollPolicy = "off";
        this._vScroller.setContent(this._currentView);
        this.addChild(this._vScroller);
        this._vScroller.scrollSpeed = 0.01;
    };
    /**
     * @param value 猎命类型
    */
    LifeGridHunResultWin.prototype.show = function (infos, value) {
        this._infos = infos;
        this._type = value;
        if (this.parent == null) {
            this.x = (Manager.config.gameWidth - this.width) >> 1;
            this.y = 213;
            Manager.layer.tipsLayer.addChild(this);
        }
        this.invalidate(InvalidationType.DATA);
    };
    LifeGridHunResultWin.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    LifeGridHunResultWin.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    LifeGridHunResultWin.prototype.drawData = function () {
        if (this._type == 1 || this._type == 2 || this._type == 3) {
            this.drawData2();
            return;
        }
        var goodsLen = this._goodItems.length;
        var infosLen = this._infos.length;
        var max = goodsLen > infosLen ? goodsLen : infosLen;
        var lineMaxCount = 4; //单行最多个数
        var dis = 128; //两个的位置差
        var item;
        for (var i = 0; i < max; i++) {
            if (i < infosLen) {
                if (i >= goodsLen) {
                    item = Manager.pool.create(LifeGridHunResultItem);
                    this._currentView.addChild(item);
                    this._goodItems.push(item);
                }
                this._goodItems[i].x = (i % lineMaxCount) * dis;
                this._goodItems[i].y = Math.floor(i / lineMaxCount) * 182;
                this._goodItems[i].setData(this._infos[i]);
                this._goodItems[i].playAniEff();
            }
            else {
                Manager.pool.push(Goods);
            }
        }
        this.setHuntTen();
    };
    LifeGridHunResultWin.prototype.drawData2 = function () {
        this._group.visible = false;
        this._back.btn.x = 237;
        this._itemGroup.visible = true;
        this._currentView.visible = false;
        for (var i = 0; i < 2; i++) {
            var j = i + 1;
            if (this._infos[i]) {
                this["_item" + j].setData(this._infos[i]);
            }
            else {
                this["_item" + j].visible = false;
            }
        }
    };
    LifeGridHunResultWin.prototype.setHuntTen = function () {
        this._itemGroup.visible = false;
        this._currentView.visible = true;
        this._group.visible = true;
        this._back.btn.x = 65;
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
    };
    LifeGridHunResultWin.prototype.hide = function () {
        this.dispose();
    };
    LifeGridHunResultWin.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._back.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._back.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._hontTenBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    LifeGridHunResultWin.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._back.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._back.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._hontTenBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    LifeGridHunResultWin.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
    };
    LifeGridHunResultWin.prototype.onbuyClickCallback = function () {
        LifeGridView.view.setTap(LifeGridType.RESOLVE);
    };
    LifeGridHunResultWin.prototype.onClickHandler = function (e) {
        var btn = e.target;
        if (btn == this._hontTenBtn) {
            var _itemModel = Manager.model.getItems();
            if (_itemModel.lifeGridTotal - _itemModel.lifeGridBagList.length < 10) {
                var cbi = Manager.pool.create(CallBackInfo, this.onbuyClickCallback, this);
                Manager.tips.showTips(LangCVO.getContent("lifeGrid9"), cbi);
                Manager.view.hide(64 /* LifeGridHunResultWin */);
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
            return;
        }
        Manager.view.hide(64 /* LifeGridHunResultWin */);
    };
    LifeGridHunResultWin.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        for (var i = this._goodItems.length - 1; i >= 0; i--) {
            Manager.pool.push(this._goodItems[i]);
        }
        this._goodItems = null;
        this._infos = null;
        this._back.dispose();
        this._back = null;
        this.removeChild(this._group);
        this._group = null;
        this._lossTxt0.dispose();
        this._lossTxt0 = null;
        this._hontTenBtn.dispose();
        this._hontTenBtn = null;
        this._vScroller.removeContent();
        this.removeChild(this._vScroller);
        this._vScroller = null;
        Manager.pool.push(this._currentView);
        this._currentView = null;
        this.disposedraw();
    };
    LifeGridHunResultWin.prototype.disposedraw = function () {
        this._resImg0.parent.removeChild(this._resImg0);
        this._resImg0 = null;
        this._item1.dispose();
        this._item2.dispose();
        this._item1 = null;
        this._item2 = null;
        this.removeChild(this._itemGroup);
        this._itemGroup = null;
    };
    return LifeGridHunResultWin;
}(UIComponent));
//# sourceMappingURL=LifeGridHunResultWin.js.map