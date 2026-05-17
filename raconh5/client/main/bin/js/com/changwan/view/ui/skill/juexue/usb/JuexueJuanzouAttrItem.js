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
var JuexueJuanzouAttrItem = /** @class */ (function (_super) {
    __extends(JuexueJuanzouAttrItem, _super);
    function JuexueJuanzouAttrItem() {
        var _this = _super.call(this) || this;
        _this._itemEndPox = -3;
        _this._groupPox = 92;
        _this.skinName = Manager.path.getSkinName("juexue", "JuexueJuanzouAttrItemSkin");
        _this.visible = false;
        return _this;
    }
    JuexueJuanzouAttrItem.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.touchChildren = true;
        this._mask = Manager.pool.create(egret.Shape);
        this._mask.graphics.beginFill(1, 1);
        this._mask.graphics.drawRect(0, 0, 542, 454);
        this._mask.graphics.endFill();
        this.addChild(this._mask);
        this._mask.y = 53;
        this._group.mask = this._mask;
        this._item = Manager.pool.create(JuexueJuanzouChileItem);
        this._item.isScaleBoo = false;
        this._item.x = 5;
        this._item.y = 5;
        this.addChild(this._item);
        if (!this._fighting) {
            this._fighting = Manager.pool.create(NumImgView2);
            this._fighting.y = 400;
            this._fighting.x = 160;
            this._group.addChild(this._fighting);
        }
        this.close.touchEnabled = true;
    };
    JuexueJuanzouAttrItem.prototype.play = function () {
        this.initPoint();
        egret.Tween.get(this._item, { loop: false }).to({ x: this._itemEndPox }, 500);
        egret.Tween.get(this._group, { loop: false }).to({ x: this._groupPox }, 500);
        egret.Tween.get(this._mask, { loop: false }).to({ x: this._groupPox }, 500);
        this.visible = true;
        this.isPlay = false;
    };
    JuexueJuanzouAttrItem.prototype.initPoint = function () {
        this._item.x = 260;
        this._group.x = -168;
        this._mask.x = 332;
    };
    JuexueJuanzouAttrItem.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.getjuexue().addEventListener(JuexueEvent.JUEXUE_UPGRADE_EVENT, this.onUpgradeLvHandler, this);
        this._lossTxt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openItemTips, this);
    };
    JuexueJuanzouAttrItem.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        Manager.model.getjuexue().removeEventListener(JuexueEvent.JUEXUE_UPGRADE_EVENT, this.onUpgradeLvHandler, this);
        this._lossTxt.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openItemTips, this);
    };
    JuexueJuanzouAttrItem.prototype.onUpgradeLvHandler = function (e) {
        this._cvo = e.params;
        this.isPlay = false;
        this.drawData();
    };
    JuexueJuanzouAttrItem.prototype.openItemTips = function () {
        var loss;
        if (this._cvo.lev > 0) {
            var levCvo = this._cvo.levCvo;
            if (levCvo.loss.length > 0) {
                loss = new GainLossVO(levCvo.loss);
            }
        }
        else {
            loss = new GainLossVO(this._cvo.active_loss);
        }
        if (loss) {
            //激活升级消耗
            var itemInfo = ItemsCVO.getCvo(loss.baseId);
            Manager.view.show(9 /* ItemsTips */, itemInfo);
        }
    };
    JuexueJuanzouAttrItem.prototype.initData = function () {
        _super.prototype.initData.call(this);
    };
    JuexueJuanzouAttrItem.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        if (this._cvo)
            this.drawData();
    };
    JuexueJuanzouAttrItem.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    JuexueJuanzouAttrItem.prototype.setData = function (data) {
        this._cvo = data;
        this.invalidate(InvalidationType.DATA);
    };
    JuexueJuanzouAttrItem.prototype.drawData = function () {
        var attr;
        this._item.setData(this._cvo);
        var loss;
        var str;
        var itemInfo;
        if (this._cvo.lev > 0) {
            var levCvo = this._cvo.levCvo;
            attr = Manager.pool.create(AttrVO, levCvo.attr);
            if (levCvo.loss.length > 0) {
                loss = new GainLossVO(levCvo.loss);
            }
        }
        else {
            attr = Manager.pool.create(AttrVO, this._cvo.attr);
            loss = new GainLossVO(this._cvo.active_loss);
        }
        if (loss) {
            //激活升级消耗
            itemInfo = ItemsCVO.getCvo(loss.baseId);
            var color = "" + loss.selfCount;
            if (!loss.isEnough()) {
                color = HtmlUtil.addColorTag(color, Color.RED_STR);
            }
            str = HtmlUtil.addColorTag(itemInfo.name, itemInfo.colorStr) + "：" + color + "/" + loss.num;
            HtmlUtil.setTextFlow(this._lossTxt, str);
            this._mainjiImg.visible = false;
            this._actGroup.visible = true;
        }
        else {
            //已满级
            this._lossTxt.text = "";
            this._mainjiImg.visible = true;
            this._actGroup.visible = false;
        }
        var attrList = attr.attrInfos;
        this._attr5.text = attrList[0].desc();
        this._attr6.text = attrList[1].desc();
        this._attr7.text = LangCVO.getContent("juexue1") + " +" + this._cvo.getJingjie();
        Manager.pool.push(attr);
        var exlist = JueXueExtraAttrCVO.getCvos(this._cvo.id);
        for (var i = exlist.length - 1; i > -1; i--) {
            var exCvo = exlist[i];
            var txt = this["_attr" + i];
            var sce = "";
            if (exCvo.leve < 10) {
                sce = "0";
            }
            var des = sce + exCvo.leve + LangCVO.getContent("common15") + "：" + exCvo.getAttrVOinfo().desc();
            if (exCvo.leve > this._cvo.lev) {
                des = HtmlUtil.addColorTag(des, Color.DEF_STR);
            }
            else {
                des = HtmlUtil.addColorTag(des, Color.GREEN_STR);
            }
            HtmlUtil.setTextFlow(txt, des);
        }
        this._fighting.setValue(this._cvo.getFight(), "nums_fighting_", 25);
        if (this.isPlay) {
            this.play();
        }
    };
    JuexueJuanzouAttrItem.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
    };
    JuexueJuanzouAttrItem.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.clear();
    };
    JuexueJuanzouAttrItem.prototype.clear = function (isRemove) {
        if (isRemove === void 0) { isRemove = false; }
        this._group.mask = null;
        egret.Tween.removeTweens(this._item);
        egret.Tween.removeTweens(this._group);
        egret.Tween.removeTweens(this._mask);
        if (isRemove) {
            ObjectUtil.removes(this._group, this.close, this._mainjiImg, this._actGroup);
            ObjectUtil.disposes(this._lossTxt, this._attr0, this._attr1, this._attr2, this._attr3, this._attr4, this._attr5, this._attr6, this._attr7, this._item);
        }
        this._group = null;
        this._lossTxt = null;
        this._attr0 = null;
        this._attr1 = null;
        this._attr2 = null;
        this._attr3 = null;
        this._attr5 = null;
        this._attr6 = null;
        this._attr7 = null;
        this._attr4 = null;
        this.close = null;
        this._item = null;
        Manager.pool.push(this._mask);
        this._mask = null;
        this._cvo = null;
        Manager.pool.push(this._fighting);
        this._fighting = null;
        this._mainjiImg = null;
        this._actGroup = null;
    };
    JuexueJuanzouAttrItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.clear(true);
    };
    /**
     * dic 方向*陪数
     */
    JuexueJuanzouAttrItem.prototype.onTouchMove = function (dic) {
        this._item.x = this._itemEndPox;
        this._group.x = this._groupPox;
        this._mask.x = this._groupPox;
        var s = dic * JuexueJuanzouAttrItem.WIDTH + this.x;
        egret.Tween.get(this, { loop: false }).to({ x: s, alpha: 1 }, 500).call(this.tweenCallBack, this);
    };
    JuexueJuanzouAttrItem.prototype.tweenCallBack = function () {
        this.dispatchEvent(new egret.Event(JuexueJuanzouChileItem.JuanzouTweenComtleteEvent));
        if (this.x == 0) {
            JuexueView.instance.updateopenCvo(this._cvo);
        }
        if (this.x == -1280) {
            this.x = JuexueJuanzouAttrItem.WIDTH;
        }
        if (this.x == 1280) {
            this.x = -JuexueJuanzouAttrItem.WIDTH;
        }
    };
    /** 固定宽 */
    JuexueJuanzouAttrItem.WIDTH = 640;
    return JuexueJuanzouAttrItem;
}(UIComponent));
//# sourceMappingURL=JuexueJuanzouAttrItem.js.map