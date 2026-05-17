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
 * 掉落珍稀物品弹出框
 * luzhihong
 * create 2017-11-20
 */
var DropAlert = (function (_super) {
    __extends(DropAlert, _super);
    function DropAlert() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("drop", "DropAlertSkin");
        _this.touchEnabled = _this.touchChildren = false;
        return _this;
    }
    DropAlert.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.initGoodsItem();
    };
    DropAlert.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    DropAlert.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    DropAlert.prototype.onResizeHandler = function (e) {
        this.x = (Manager.config.gameWidth - 480) >> 1;
        this.y = 830;
    };
    DropAlert.prototype.initGoodsItem = function () {
        if (!this._goodItems) {
            this._goodItems = [];
            var item;
            for (var i = 0; i < 3; i++) {
                item = Manager.pool.create(Goods);
                item.y = 59;
                this.addChild(item);
                this._goodItems.push(item);
            }
        }
    };
    DropAlert.prototype.reuse = function (infos) {
        this.initGoodsItem();
        this.unuse();
        _super.prototype.reuse.call(this);
        Manager.layer.tipsLayer.addChild(this);
        this._back.width = 100;
        this._title.alpha = 0;
        //停留时间
        var stayTime = 1000;
        var count = infos.length;
        var posArr;
        if (count == 1)
            posArr = [168];
        else if (count == 2)
            posArr = [89, 246];
        else
            posArr = [42, 168, 295];
        for (var i = 0; i < 3; i++) {
            if (i < count) {
                this._goodItems[i].visible = true;
                this._goodItems[i].data = infos[i];
                this._goodItems[i].x = posArr[i];
                egret.Tween.get(this._goodItems[i]).wait(400 + 100 * i).to({ alpha: 1 }, 200)
                    .wait(stayTime - 200 * i).to({ alpha: 0 }, 200);
            }
            else
                this._goodItems[i].visible = false;
        }
        egret.Tween.get(this._back).to({ width: 480 }, 200)
            .wait(stayTime + 700).to({ width: 100 }, 200)
            .call(this.callback, this);
        egret.Tween.get(this._title).wait(200).to({ alpha: 1 }, 150)
            .wait(stayTime + 400).to({ alpha: 0 }, 150);
        this.onResizeHandler(null);
    };
    DropAlert.prototype.callback = function () {
        Manager.control.getDrop().hideAlert();
    };
    DropAlert.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        egret.Tween.removeTweens(this._back);
        egret.Tween.removeTweens(this._title);
        for (var i = 0; i < 3; i++) {
            this._goodItems[i].alpha = 0;
            egret.Tween.removeTweens(this._goodItems[i]);
        }
    };
    DropAlert.prototype.dispose = function () {
        egret.Tween.removeTweens(this._back);
        egret.Tween.removeTweens(this._title);
        for (var i = 0; i < 3; i++) {
            egret.Tween.removeTweens(this._goodItems[i]);
            Manager.pool.push(this._goodItems[i]);
        }
        _super.prototype.dispose.call(this);
        this._back = null;
        this._title = null;
        this._goodItems = null;
    };
    return DropAlert;
}(UIComponent));
__reflect(DropAlert.prototype, "DropAlert");
//# sourceMappingURL=DropAlert.js.map