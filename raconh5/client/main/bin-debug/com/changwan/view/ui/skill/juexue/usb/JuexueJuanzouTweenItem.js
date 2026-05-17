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
 * 绝学圈轴滚动动画
 * pzx
 * create 18.2.26
 */
var JuexueJuanzouTweenItem = (function (_super) {
    __extends(JuexueJuanzouTweenItem, _super);
    function JuexueJuanzouTweenItem() {
        var _this = _super.call(this) || this;
        _this._dic = 1;
        _this.touchEnabled = true;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("juexue", "JuexueJuanzouTweenItemSkin");
        return _this;
    }
    JuexueJuanzouTweenItem.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        if (!this._list) {
            this._list = [this._item0, this._item1, this._item2, this._item3, this._item4];
        }
        this._shp = Manager.pool.create(egret.Sprite);
        this._shp.touchEnabled = true;
        this._shp.graphics.beginFill(1, 0.05);
        this._shp.graphics.drawRect(0, 0, 640, 528);
        this._shp.graphics.endFill();
        this.addChildAt(this._shp, 0);
        this.mask = new egret.Rectangle(0, 0, 640, 528);
    };
    JuexueJuanzouTweenItem.prototype.initData = function () {
        _super.prototype.initData.call(this);
    };
    JuexueJuanzouTweenItem.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.starMoveHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeMoveHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.removeMoveHandler, this);
        this._item2.addEventListener(JuexueJuanzouChileItem.JuanzouTweenComtleteEvent, this.endPlayTween, this);
    };
    JuexueJuanzouTweenItem.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.starMoveHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.removeMoveHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.removeMoveHandler, this);
        this._item2.removeEventListener(JuexueJuanzouChileItem.JuanzouTweenComtleteEvent, this.endPlayTween, this);
    };
    JuexueJuanzouTweenItem.prototype.endPlayTween = function () {
        this.isStarPlay = false;
    };
    JuexueJuanzouTweenItem.prototype.starMoveHandler = function (e) {
        this._starPointX = e.stageX;
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveHandler, this);
        this._isMove = false;
    };
    JuexueJuanzouTweenItem.prototype.onMoveHandler = function (e) {
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
        this._isMove = true;
    };
    JuexueJuanzouTweenItem.prototype.removeMoveHandler = function (e) {
        var _this = this;
        if (e === void 0) { e = null; }
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveHandler, this);
        if (this.isStarPlay) {
            return;
        }
        if (!e) {
            if (this._dic >= 0) {
                if (this._item2.x >= JuexueJuanzouChileItem.maxRight) {
                    return;
                }
            }
            else {
                if (this._item2.x <= JuexueJuanzouChileItem.maxLife) {
                    return;
                }
            }
            this.isStarPlay = true;
            this._list.forEach(function (item, i) {
                item.onTouchMove(_this._dic);
            });
            return;
        }
        if (this._isMove)
            return;
        var item = e.target;
        if (item instanceof JuexueJuanzouChileItem) {
            if (item.x == JuexueJuanzouChileItem.list[2])
                return;
            var w_1 = Math.floor((item.x - 7) / JuexueJuanzouChileItem.apg);
            w_1 = 2 - w_1;
            this._list.forEach(function (item, i) {
                item.onTouchMove(w_1, true);
            });
            this.isStarPlay = true;
        }
    };
    //================================================
    JuexueJuanzouTweenItem.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
    };
    JuexueJuanzouTweenItem.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    JuexueJuanzouTweenItem.prototype.setData = function (data) {
        this._cvos = data;
        this.invalidate(InvalidationType.DATA);
    };
    JuexueJuanzouTweenItem.prototype.drawData = function () {
        var ln = this._list.length;
        var index = -1;
        for (var i = 0; i < ln; i++) {
            if (this._cvos[i]) {
                this._list[i].setData(this._cvos[i]);
                this._list[i].initPointX();
            }
        }
        var _loop_1 = function (j) {
            if (this_1._cvos[j].checkUpgrade()) {
                index = j;
                this_1._list.forEach(function (item, i) {
                    item.onTouchMove(2 - j);
                });
                return "break";
            }
        };
        var this_1 = this;
        for (var j = this._cvos.length - 1; j > -1; j--) {
            var state_1 = _loop_1(j);
            if (state_1 === "break")
                break;
        }
        //引导
        if (Manager.model.getGuide().curID == GuideID.JUEXUE_ACTIVE) {
            if (index < 0)
                Manager.control.getTask().hideGuide();
            else {
                this._guideIndex = index;
                var pos = this._list[2].parent.localToGlobal(this._list[2].x, this._list[2].y);
                Manager.control.getTask().showGuide(pos, -10, this._list[index].height >> 1, this.guideCB, this, false);
            }
        }
    };
    JuexueJuanzouTweenItem.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
    };
    JuexueJuanzouTweenItem.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.clear();
    };
    JuexueJuanzouTweenItem.prototype.clear = function (isRemove) {
        if (isRemove === void 0) { isRemove = false; }
        if (isRemove) {
            ObjectUtil.disposes(this._item0, this._item1, this._item2, this._item3, this._item4);
        }
        this.mask = null;
        this._item0 = null;
        this._item1 = null;
        this._item2 = null;
        this._item3 = null;
        this._item4 = null;
        this._list = null;
        Manager.pool.push(this._shp);
        this._shp = null;
        this.mask = null;
        this._cvos = null;
        this._guideIndex = -1;
    };
    JuexueJuanzouTweenItem.prototype.guideCB = function () {
        this._list[this._guideIndex].onTouchMove(0, true);
    };
    JuexueJuanzouTweenItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.clear(true);
    };
    return JuexueJuanzouTweenItem;
}(UIComponent));
__reflect(JuexueJuanzouTweenItem.prototype, "JuexueJuanzouTweenItem");
//# sourceMappingURL=JuexueJuanzouTweenItem.js.map