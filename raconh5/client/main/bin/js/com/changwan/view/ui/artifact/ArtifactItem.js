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
 * 寻宝scrollItem
 * pzx
 * create 18.2.7
 */
var ArtifactItem = /** @class */ (function (_super) {
    __extends(ArtifactItem, _super);
    function ArtifactItem() {
        var _this = _super.call(this) || this;
        _this._STAR_X = 10;
        _this._CENTER_X = 330;
        _this._isFrist = true;
        _this.skinName = Manager.path.getSkinName("artifact", "ArtifactItemSkin");
        _this.visible = false;
        return _this;
    }
    ArtifactItem.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._stateList = [0.7, 0.7, 0.8, 0.9, 1, 1, 0.9, 0.8, 0.7];
        if (!this._list) {
            this._list = [];
            for (var i = 0; i < 9; i++) {
                var txt = this["_label" + i];
                this._list.push(txt);
                var n = this._stateList[i];
                txt.x = this._STAR_X;
                //txt.x = this._STAR_X+this._CENTER_X*(1-n);
                //txt.alpha = n;
                //txt.scaleX = txt.scaleY = n;
            }
        }
        this._lastY = this._list[this._list.length - 1].y;
        this._max_num = this._list.length - 1;
        this._group.mask = new egret.Rectangle(5, 6, 710, 252);
        this._max_data = Manager.model.getArtifact().MAX_NUM;
    };
    ArtifactItem.prototype.drawTween = function () {
        var ln = this._list.length;
        this._endnum = 0;
        this._list[this._max_num].y = this._lastY;
        for (var i = 0; i < ln; i++) {
            var n = this._stateList[i];
            egret.Tween.get(this._list[i], { loop: false }).to({ x: this._STAR_X, y: this._list[i].y - 32 }, 1000).call(this.tweenEnd, this, [i]);
            //egret.Tween.get(this._list[i], {loop: false}).to({x:this._STAR_X+this._CENTER_X*(1-n), y:this._list[i].y-32, alpha:n,scaleX:n,scaleY:n}, 1000).call(this.tweenEnd,this,[i]);
        }
    };
    ArtifactItem.prototype.tweenEnd = function (index) {
        this._endnum++;
        if (this._endnum == this._max_num) {
            this._dataIndex++;
            var txt = this._list.splice(0, 1)[0];
            this._list.push(txt);
            if (this._dataIndex >= this._max_data) {
                this._dataIndex = 0;
            }
            var info = this._data[this._dataIndex];
            HtmlUtil.setTextFlow(txt, info.desc);
        }
    };
    ArtifactItem.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        if (this._data) {
            this.drawData();
        }
    };
    ArtifactItem.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    ArtifactItem.prototype.setData = function (data) {
        this._data = data;
        if (this._isFrist) {
            this._isFrist = false;
            this.invalidate(InvalidationType.DATA);
        }
    };
    ArtifactItem.prototype.drawData = function () {
        for (var i = this._list.length - 1; i > -1; i--) {
            var info = this._data[i];
            HtmlUtil.setTextFlow(this._list[i], info.desc);
        }
        this._dataIndex = this._max_num;
        this.drawTween();
        Manager.render.add(this.drawTween, this, 1010);
        this.visible = true;
    };
    ArtifactItem.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
    };
    ArtifactItem.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.clear();
    };
    ArtifactItem.prototype.clear = function (isRemove) {
        if (isRemove === void 0) { isRemove = false; }
        if (Manager.render.contains(this.drawTween, this))
            Manager.render.remove(this.drawTween, this);
        for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
            var txt = _a[_i];
            egret.Tween.removeTweens(txt);
            txt.dispose();
        }
        this._list = null;
        this._stateList = null;
        if (isRemove) {
            ObjectUtil.remove(this._group);
        }
        this._label0 = null;
        this._label1 = null;
        this._label2 = null;
        this._label3 = null;
        ;
        this._label4 = null;
        this._label5 = null;
        this._label6 = null;
        this._label7 = null;
        this._label8 = null;
        this.mask = null;
        this._group = null;
        this._data = null;
    };
    ArtifactItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.clear(true);
    };
    return ArtifactItem;
}(UIComponent));
//# sourceMappingURL=ArtifactItem.js.map