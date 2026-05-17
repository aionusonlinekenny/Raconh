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
 * 命格页签容器
 * pzx
 * create 17.12.25
 */
var LifeGridContainer = (function (_super) {
    __extends(LifeGridContainer, _super);
    function LifeGridContainer() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("lifeGrid/lifegridview", "LifeGridContainerSkin");
        LifeGridContainer.instince = _this;
        return _this;
    }
    LifeGridContainer.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._itemModel = Manager.model.getItems();
        this._model = Manager.model.getLifeGrid();
        for (var i = 1; i < 9; i++) {
            var item = this["_ball" + i];
            item.id = i;
            item.addEventListener(LifeGridEvent.LV_UPGRADE_EVENT, this.onLvLossHandler, this);
        }
        if (!this._fighting) {
            this._fighting = Manager.pool.create(NumImgView2);
            this._fighting.y = this._finghtImg.y + 10;
            this._fighting.x = this._finghtImg.x + 120;
            this.addChild(this._fighting);
        }
    };
    LifeGridContainer.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._model.addEventListener(LifeGridEvent.LIFEGRID_WARE_EVENT, this.onWareHandler, this);
        this._model.addEventListener(LifeGridEvent.LIFEGRID_LVUP_EVENT, this.darwData, this);
        this._fuwenBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenLifeGridListHandler, this);
        this._towerImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterCopyHandler, this);
    };
    LifeGridContainer.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._model.removeEventListener(LifeGridEvent.LIFEGRID_WARE_EVENT, this.onWareHandler, this);
        this._model.removeEventListener(LifeGridEvent.LIFEGRID_LVUP_EVENT, this.darwData, this);
        this._fuwenBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenLifeGridListHandler, this);
        for (var i = 1; i < 9; i++) {
            var item = this["_ball" + i];
            item.removeEventListener(LifeGridEvent.LV_UPGRADE_EVENT, this.onLvLossHandler, this);
        }
        this._towerImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.enterCopyHandler, this);
    };
    LifeGridContainer.prototype.enterCopyHandler = function () {
        Manager.view.show(10 /* ActivityPanel */, 2);
    };
    LifeGridContainer.prototype.onOpenLifeGridListHandler = function (e) {
        Manager.view.show(56 /* LifeGridListView */);
    };
    LifeGridContainer.prototype.onWareHandler = function (e) {
        var pos = e.params;
        var arr = this._itemModel.lifeGridList;
        this["_ball" + pos].playEffect(arr[pos]);
    };
    LifeGridContainer.prototype.initData = function () {
        _super.prototype.initData.call(this);
        this.darwData();
    };
    LifeGridContainer.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
    };
    LifeGridContainer.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.darwData();
    };
    LifeGridContainer.prototype.setData = function (data) {
        this.invalidate(InvalidationType.DATA);
    };
    LifeGridContainer.prototype.darwData = function () {
        var arr = this._itemModel.lifeGridList;
        var ln = LifeGridType.LIFENUM + 1;
        var figt = 0;
        this._ln = LifeGridType.LIFENUM;
        var index = 0;
        for (var i = 1; i < ln; i++) {
            var ball = this["_ball" + i];
            ball.setData(arr[i]);
            if (arr[i]) {
                var exinfo = arr[i].infoList[0];
                var cvo = LifeGridCVO.getInfo(arr[i].base_id, exinfo.value);
                figt += cvo.fightnum;
            }
            else {
                if (index == 0) {
                    var cvo = LifeGridCVO.getholeCvo(i);
                    var conticion = new ConditionVO(cvo.cond);
                    if (!conticion.isSatisfy()) {
                        index = conticion.value2;
                    }
                }
            }
        }
        this._fighting.setValue(figt, "nums_fighting_", 25);
        if (index > 0) {
            var str = StringUtils.setParam(LangCVO.getContent("lifeGrid13"), index);
            HtmlUtil.setTextFlow(this._nextPassTxt, str);
        }
        else {
            this._nextPassTxt.text = "";
        }
    };
    /** 打开升级界面，所有升级的小红点要消失直到命魂有更新 */
    LifeGridContainer.prototype.hideLossRedIcon = function () {
        this._ln = 1;
        this.onLvLossHandler(null);
    };
    //**多个名格可升级，选中等级最低的命格，相同等级优先取品质越高的命格 */
    LifeGridContainer.prototype.onLvLossHandler = function (e) {
        this._ln--;
        if (this._ln == 0) {
            var ln = LifeGridType.LIFENUM + 1;
            var n = 10000;
            var itemId = 0;
            for (var i = 1; i < ln; i++) {
                var ball = this["_ball" + i];
                ball.setLossRedIcon(false);
                if (ball.losslv > 0) {
                    //取最小等级
                    n = n > ball.losslv ? ball.losslv : n;
                }
            }
            if (n != 10000) {
                var quar = 0;
                for (var i = 1; i < ln; i++) {
                    var ball = this["_ball" + i];
                    if (ball.losslv == n) {
                        if (quar < ball.getItemCvo().quality) {
                            quar = ball.getItemCvo().quality;
                            itemId = ball.id;
                        }
                    }
                }
            }
            if (this._model.openLeveUpView)
                return;
            if (itemId > 0) {
                this["_ball" + itemId].setLossRedIcon(true);
            }
        }
    };
    LifeGridContainer.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
    };
    LifeGridContainer.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
    };
    LifeGridContainer.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.disposes(this._ball1, this._ball2, this._ball3, this._ball4, this._ball5, this._ball6, this._ball7, this._ball8, this._fuwenBtn);
        this._ball8 = null;
        this._ball1 = null;
        this._ball2 = null;
        this._ball3 = null;
        this._ball4 = null;
        this._ball5 = null;
        this._ball6 = null;
        this._ball7 = null;
        this._fuwenBtn = null;
        this._itemModel = null;
        this._model = null;
        this.removeChild(this._fighting);
        Manager.pool.push(this._fighting);
        this._fighting = null;
        this.removeChild(this._finghtImg);
        this._finghtImg = null;
        LifeGridContainer.instince = null;
        this.removeChild(this._towerImg);
        this._towerImg = null;
    };
    return LifeGridContainer;
}(UIComponent));
__reflect(LifeGridContainer.prototype, "LifeGridContainer");
//# sourceMappingURL=LifeGridContainer.js.map