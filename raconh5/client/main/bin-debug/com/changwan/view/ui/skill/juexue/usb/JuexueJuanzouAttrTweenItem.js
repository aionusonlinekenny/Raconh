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
 * 绝学详情滚动动画
 * pzx
 * create 18.3.5
 */
var JuexueJuanzouAttrTweenItem = (function (_super) {
    __extends(JuexueJuanzouAttrTweenItem, _super);
    function JuexueJuanzouAttrTweenItem() {
        var _this = _super.call(this) || this;
        _this._dic = 1;
        _this.touchEnabled = true;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("juexue", "JuexueJuanzouAttrTweenItemSkin");
        return _this;
    }
    JuexueJuanzouAttrTweenItem.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        if (!this._list) {
            for (var i = 0; i < 3; i++) {
                this["_item" + i] = Manager.pool.create(JuexueJuanzouAttrItem);
                var item = this["_item" + i];
                item.x = i * 640 - 640;
                this.addChild(item);
            }
            this._list = [this._item0, this._item1, this._item2];
            this._item0.visible = true;
            this._item2.visible = true;
        }
        this.mask = new egret.Rectangle(-7, 0, 640, 528);
    };
    JuexueJuanzouAttrTweenItem.prototype.initData = function () {
        _super.prototype.initData.call(this);
    };
    JuexueJuanzouAttrTweenItem.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.starMoveHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeMoveHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.removeMoveHandler, this);
        this._item0.addEventListener(JuexueJuanzouChileItem.JuanzouTweenComtleteEvent, this.endPlayTween, this);
        this._item1.addEventListener(JuexueJuanzouChileItem.JuanzouTweenComtleteEvent, this.endPlayTween, this);
        this._item2.addEventListener(JuexueJuanzouChileItem.JuanzouTweenComtleteEvent, this.endPlayTween, this);
    };
    JuexueJuanzouAttrTweenItem.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.starMoveHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.removeMoveHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.removeMoveHandler, this);
        this._item2.removeEventListener(JuexueJuanzouChileItem.JuanzouTweenComtleteEvent, this.endPlayTween, this);
        this._item0.removeEventListener(JuexueJuanzouChileItem.JuanzouTweenComtleteEvent, this.endPlayTween, this);
        this._item1.removeEventListener(JuexueJuanzouChileItem.JuanzouTweenComtleteEvent, this.endPlayTween, this);
    };
    JuexueJuanzouAttrTweenItem.prototype.endPlayTween = function () {
        this.isStarPlay = false;
    };
    JuexueJuanzouAttrTweenItem.prototype.starMoveHandler = function (e) {
        this._starPointX = e.stageX;
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveHandler, this);
    };
    JuexueJuanzouAttrTweenItem.prototype.onMoveHandler = function (e) {
        var di = e.stageX - this._starPointX;
        if (Math.abs(di) > 150) {
            if (di >= 0) {
                this._dic = 1;
            }
            else {
                this._dic = -1;
            }
            this.removeMoveHandler();
        }
    };
    JuexueJuanzouAttrTweenItem.prototype.removeMoveHandler = function (e) {
        var _this = this;
        if (e === void 0) { e = null; }
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveHandler, this);
        if (this.isStarPlay) {
            return;
        }
        if (!e) {
            var index = this._cvos.indexOf(this._cvo) - this._dic;
            if (index < 0 || index >= this._cvos.length) {
                return;
            }
            this._cvo = this._cvos[index];
            if (this._dic < 0) {
                this._list.forEach(function (item, i) {
                    if (item.x == JuexueJuanzouAttrItem.WIDTH) {
                        item.setData(_this._cvo);
                    }
                    item.onTouchMove(_this._dic);
                });
            }
            else {
                this._list.forEach(function (item, i) {
                    if (item.x == -JuexueJuanzouAttrItem.WIDTH) {
                        item.setData(_this._cvo);
                    }
                    item.onTouchMove(_this._dic);
                });
            }
            this.isStarPlay = true;
        }
    };
    //================================================
    JuexueJuanzouAttrTweenItem.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
    };
    JuexueJuanzouAttrTweenItem.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    JuexueJuanzouAttrTweenItem.prototype.setData = function (data) {
        this._cvo = data;
        this._cvos = JueXueCVO.getList(this._cvo.type);
        if (this._item1) {
            this._item1.initPoint();
        }
        this.invalidate(InvalidationType.DATA);
    };
    JuexueJuanzouAttrTweenItem.prototype.drawData = function () {
        for (var i = this._list.length - 1; i > -1; i--) {
            this._list[i].x = (i - 1) * JuexueJuanzouAttrItem.WIDTH;
        }
        this._item1.isPlay = true;
        this._item1.setData(this._cvo);
    };
    JuexueJuanzouAttrTweenItem.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
    };
    JuexueJuanzouAttrTweenItem.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.clear();
    };
    JuexueJuanzouAttrTweenItem.prototype.clear = function (isRemove) {
        if (isRemove === void 0) { isRemove = false; }
        if (isRemove) {
            ObjectUtil.disposes(this._item0, this._item1, this._item2);
        }
        this._item0 = null;
        this._item1 = null;
        this._item2 = null;
        this._list = null;
        this._cvos = null;
        this._cvo = null;
        this.mask = null;
    };
    JuexueJuanzouAttrTweenItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.clear(true);
    };
    return JuexueJuanzouAttrTweenItem;
}(UIComponent));
__reflect(JuexueJuanzouAttrTweenItem.prototype, "JuexueJuanzouAttrTweenItem");
//# sourceMappingURL=JuexueJuanzouAttrTweenItem.js.map