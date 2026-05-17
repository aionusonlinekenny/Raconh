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
 * boss敌人
 * luzh
 * create 2017-12.25
*/
var BossRankView = (function (_super) {
    __extends(BossRankView, _super);
    function BossRankView(type) {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("boss", "BossRankViewSkin");
        _this._type = type;
        _this.touchChildren = true;
        return _this;
    }
    BossRankView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        // Manager.model.getBoss().addEventListener(BossEvent.RANK_LIST, this.updateList, this);
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
    };
    BossRankView.prototype.removeEvent = function () {
        // Manager.model.getBoss().removeEventListener(BossEvent.RANK_LIST, this.updateList, this);
        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    BossRankView.prototype.onTouchHandler = function (e) {
        this._isShow = !this._isShow;
        this.invalidate("drawShowList");
    };
    // private updateList(e:BossEvent)
    // {
    //     this._infos = e.params;
    // 	this.invalidate("drawList");
    // }
    BossRankView.prototype.updateList = function (list) {
        this._infos = list;
        this.invalidate("drawList");
    };
    BossRankView.prototype.drawList = function () {
        if (this._infos == null)
            return;
        var info;
        if (this._infos.length > 0) {
            info = this._infos.shift();
            //boss13 自身伤害：        devil7 自身积分：
            var str_1 = this._type == BossRankView.TYPE_DMG ? LangCVO.getContent("boss13") : LangCVO.getContent("devil7");
            this._txtMy.text = info.rank + "." + str_1 + GameUtil.getNumShortStr(info.hurt);
        }
        if (this._infos.length > 0) {
            info = this._infos.shift();
            this._txtFirst.text = info.rank + "." + info.name + ":" + GameUtil.getNumShortStr(info.hurt);
        }
        var len = this._infos.length;
        var str = "";
        for (var i = 0; i < len; i++) {
            if (i > 0)
                str += "\n";
            str += this._infos[i].rank + "." + this._infos[i].name + ":" + GameUtil.getNumShortStr(this._infos[i].hurt);
        }
        this._txtRank.text = str;
        this._back.height = this._txtRank.height + 18;
        ObjectUtil.addOrRemove(this._group, this, this._isShow && this._infos.length > 0);
    };
    BossRankView.prototype.drawShowList = function () {
        ObjectUtil.addOrRemove(this._group, this, this._isShow && this._infos.length > 0);
        this._btn.scaleY = this._isShow ? -1 : 1;
    };
    BossRankView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid("drawList"))
            this.drawList();
        if (this.isInvalid("drawShowList"))
            this.drawShowList();
    };
    BossRankView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawList();
        this.drawShowList();
    };
    BossRankView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._btn, this._group, this._back);
        ObjectUtil.disposes(this._txtMy, this._txtFirst, this._txtRank);
        this._btn = null;
        this._txtMy = null;
        this._txtFirst = null;
        this._group = null;
        this._back = null;
        this._txtRank = null;
        this._type = 0;
    };
    /**伤害类型 */
    BossRankView.TYPE_DMG = 1;
    /**积分类型 */
    BossRankView.TYPE_SCORE = 2;
    return BossRankView;
}(UIComponent));
__reflect(BossRankView.prototype, "BossRankView");
//# sourceMappingURL=BossRankView.js.map