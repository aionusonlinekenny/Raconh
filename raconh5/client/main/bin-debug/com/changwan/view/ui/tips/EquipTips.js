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
/**装备tips皮肤 */
var EquipTips = (function (_super) {
    __extends(EquipTips, _super);
    function EquipTips() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("tips", "EquipTipsSkin");
        return _this;
    }
    EquipTips.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._group.touchEnabled = false;
        this._goods.enabled = false;
        this._goods.count = 1;
        this._attrTextList = [this._attText1, this._attText2];
        this.onResizeHandler();
    };
    EquipTips.prototype.reuse = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        _super.prototype.reuse.call(this, args);
    };
    EquipTips.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    EquipTips.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    EquipTips.prototype.onResizeHandler = function (e) {
        this.x = Math.round((Manager.global.gameMain.stage.stageWidth - this.width) / 2);
    };
    EquipTips.prototype.onClickHandler = function (e) {
        switch (e.currentTarget) {
            case this._closeBtn:
                Manager.view.hide(45 /* EquipTips */);
                break;
        }
    };
    EquipTips.prototype.setData = function (value, value2) {
        this._cvo = value;
        this._info = value2;
        _super.prototype.setData.call(this, value);
    };
    EquipTips.prototype.show = function (value, value2) {
        this.touchChildren = true;
        this.setData(value, value2);
        Manager.layer.tipsLayer.addChild(this);
        this.y = Math.round((Manager.config.gameHeight - this.height) / 2);
    };
    EquipTips.prototype.hide = function () {
        Manager.layer.tipsLayer.removeChild(this);
    };
    EquipTips.prototype.drawData = function () {
        var cvo = this._cvo;
        var fightNum = 0; //战斗力
        var jipVO;
        this._goods.setCvo(cvo);
        if (this._info) {
            this._goods.setStar(this._info.getStar());
        }
        else {
            this._goods.setStar(0);
        }
        var strengthenLevel = 0;
        var zhuhunLevel = 0;
        var gemList = [];
        var strengthenInfo = Manager.model.getItems().equipStrengthenData.get(cvo.pos);
        if (strengthenInfo) {
            strengthenLevel = strengthenInfo.level;
            zhuhunLevel = strengthenInfo.zhuhunLevel;
            gemList = strengthenInfo.gemList;
            fightNum = strengthenInfo.zhuhunFighting + strengthenInfo.gemFighting;
        }
        if (strengthenLevel > 0)
            this._nameTxt.text = cvo.name + "+" + strengthenLevel;
        else
            this._nameTxt.text = cvo.name;
        this._level.text = cvo.needLevelStr;
        switch (cvo.needCarrer) {
            case 1:
                this._career.text = LangCVO.getContent("common2");
                break;
            case 2:
                this._career.text = LangCVO.getContent("common3");
                break;
            case 3:
                this._career.text = LangCVO.getContent("common4");
                break;
        }
        //===属性======
        var attr = Manager.pool.create(AttrVO, cvo.attr);
        fightNum += attr.getFighting();
        var attrArr = attr.attrInfos;
        for (var i = 0; i < this._attrTextList.length; i++) {
            if (attrArr[i]) {
                this._attrTextList[i].text = attrArr[i].desc();
            }
            else {
                this._attrTextList[i].text = "";
            }
        }
        //强化
        var info = EquipStrengthenCVO.getInfo(cvo.pos, strengthenLevel);
        if (strengthenLevel > 0 && info && info.attr.length > 0) {
            var str = attrArr[0].id + "," + info.attr[0][1] + "|" + attrArr[1].id + "," + info.attr[1][1];
            jipVO = Manager.pool.create(AttrVO, str);
            fightNum += jipVO.getFighting();
            Manager.pool.push(jipVO);
            HtmlUtil.setTextFlow(this._attAddValue1, HtmlUtil.addColorTag("（强化+" + String(info.attr[0][1]) + "）", "#38b800"));
            HtmlUtil.setTextFlow(this._attAddValue2, HtmlUtil.addColorTag("（强化+" + String(info.attr[1][1]) + "）", "#38b800"));
        }
        else {
            this._attAddValue1.text = "";
            this._attAddValue2.text = "";
        }
        Manager.pool.push(attr);
        var bgH = 248; //底图的高度
        //=====极品属性==================
        if (this._info && this._info.infoList.length > 0) {
            var jipinArr = this._info.infoList;
            var inArr = [];
            var jip = void 0;
            var jipinfo = void 0;
            for (jip = 0; jip < jipinArr.length; jip++) {
                jipinfo = jipinArr[jip];
                if (jipinfo.type == 1) {
                    //1为极品属性
                    inArr.push(jipinfo);
                }
            }
            if (inArr.length > 0) {
                if (this._jipinList == null)
                    this._jipinList = [];
                this._jipinGup.visible = true;
                inArr = ArrayUtil.sortOn(inArr, ["target"]);
                var jipln = inArr.length > this._jipinList.length ? inArr.length : this._jipinList.length;
                for (jip = 0; jip < jipln; jip++) {
                    jipinfo = inArr[jip];
                    if (!jipinfo) {
                        this._jipinList[jip].visible = false;
                        continue;
                    }
                    jipVO = Manager.pool.create(AttrVO, jipinfo.target + "," + jipinfo.value);
                    fightNum += jipVO.getFighting();
                    if (this._jipinList[jip] == null) {
                        this._jipinList[jip] = new egret.TextField();
                        this._jipinList[jip].width = 260;
                        this._jipinList[jip].height = 24;
                        this._jipinList[jip].x = 40;
                        this._jipinList[jip].y = (this._jipinGup.y + this._jipinGup.height + 10) + jip * 33;
                        this._group.addChild(this._jipinList[jip]);
                    }
                    var jiptxt = this._jipinList[jip];
                    jiptxt.visible = true;
                    var invo = jipVO.getinfo(jipinfo.target);
                    invo.sign = "+";
                    if (invo.showStar == 1) {
                        HtmlUtil.setTextFlow(jiptxt, HtmlUtil.addColorTag(invo.desc(), Color.PURPLE_STR));
                    }
                    else {
                        HtmlUtil.setTextFlow(jiptxt, HtmlUtil.addColorTag(invo.desc(), "#009bfd"));
                    }
                    Manager.pool.push(jipVO);
                    bgH = jiptxt.y + jiptxt.height + 15;
                }
            }
            else {
                this.jipinClear();
            }
        }
        else {
            this.jipinClear();
        }
        //=====铸魂==================
        var zhuhunInfo = EquipZhuhunCVO.getInfo(cvo.needCarrer, cvo.pos, zhuhunLevel);
        if (zhuhunLevel > 0 && zhuhunInfo && zhuhunInfo.zhuhunAttrList.length > 0) {
            this._zhuhunGup.visible = true;
            this._zhuhunGup.y = bgH;
            if (this._zhuhunList == null)
                this._zhuhunList = [];
            var zhln = zhuhunInfo.zhuhunAttrList.length > this._zhuhunList.length ? zhuhunInfo.zhuhunAttrList.length : this._zhuhunList.length;
            for (var i = 0; i < zhln; i++) {
                var zhArr = zhuhunInfo.zhuhunAttrList[i];
                if (!zhArr) {
                    this._zhuhunList[i].visible = false;
                    continue;
                }
                if (this._zhuhunList[i] == null) {
                    this._zhuhunList[i] = new egret.TextField();
                    this._zhuhunList[i].width = 260;
                    this._zhuhunList[i].height = 24;
                    this._zhuhunList[i].x = 40;
                    this._group.addChild(this._zhuhunList[i]);
                }
                var txt = this._zhuhunList[i];
                txt.y = (this._zhuhunGup.y + this._zhuhunGup.height + 10) + i * 33;
                txt.visible = true;
                jipVO = Manager.pool.create(AttrVO, zhArr[0] + "," + zhArr[1]);
                HtmlUtil.setTextFlow(txt, HtmlUtil.addColorTag(jipVO.getinfo(zhArr[0]).desc(), "#38b800"));
                Manager.pool.push(jipVO);
                bgH = txt.y + txt.height + 15;
            }
        }
        else {
            this.zhuhunClear();
        }
        //=============宝石============================
        if (gemList.length > 0) {
            this._gem.y = bgH;
            if (this._gemList == null)
                this._gemList = [];
            var ln = gemList.length > this._gemList.length ? gemList.length : this._gemList.length;
            for (var i = 0; i < ln; i++) {
                if (gemList[i] == null) {
                    this._gemList[i].visible = false;
                    continue;
                }
                if (!this._gemList[i]) {
                    this._gemList[i] = Manager.pool.create(TipsGemItem);
                    this._gemList[i].x = 30;
                    this._group.addChild(this._gemList[i]);
                }
                var gemany = gemList[i]; //{gemPos:gemPos, gemId:gemId}
                var item = this._gemList[i];
                item.y = (this._gem.y) + i * (this._gemList[i].height - 15);
                item.setData(gemany.gemId);
                item.visible = true;
                bgH = item.y + item.height - 10;
            }
        }
        else {
            this.gemClear();
        }
        //================
        this._fighting.text = "" + fightNum;
        this._bgImg.height = bgH + 30;
        _super.prototype.drawData.call(this);
    };
    EquipTips.prototype.jipinClear = function () {
        if (this._jipinList) {
            this._jipinList.forEach(function (txt, i) {
                txt.textFlow = null;
                txt.visible = false;
            });
        }
        this._jipinGup.visible = false;
    };
    EquipTips.prototype.zhuhunClear = function () {
        if (this._zhuhunList) {
            this._zhuhunList.forEach(function (txt, i) {
                txt.textFlow = null;
                txt.visible = false;
            });
        }
        this._zhuhunGup.visible = false;
    };
    EquipTips.prototype.gemClear = function () {
        this._gem.visible = false;
        if (this._gemList) {
            this._gemList.forEach(function (txt, i) {
                txt.visible = false;
                txt.unuse();
            });
        }
    };
    EquipTips.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this._goods.unuse();
        this._nameTxt.text = "";
        this._fighting.text = "";
        this._level.text = "";
        this._career.text = "";
        this._attText1.text = "";
        this._attText2.text = "";
        this._attAddValue1.text = "";
        this._attAddValue2.text = "";
        this._cvo = null;
        this._info = null;
        this.gemClear();
        this.zhuhunClear();
        this.jipinClear();
    };
    EquipTips.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        for (var i = 0; i < this._attrTextList.length; i++) {
            if (this._attrTextList[i]) {
                this._attrTextList[i].dispose();
                this._attrTextList[i] = null;
            }
        }
        this._attrTextList = null;
        if (this._jipinList) {
            for (var i = 0; i < this._jipinList.length; i++) {
                if (this._jipinList[i]) {
                    this._jipinList[i].parent.removeChild(this._jipinList[i]);
                    this._jipinList[i] = null;
                }
            }
            this._jipinList = null;
        }
        if (this._zhuhunList) {
            for (var i = 0; i < this._zhuhunList.length; i++) {
                if (this._zhuhunList[i]) {
                    this._zhuhunList[i].parent.removeChild(this._zhuhunList[i]);
                    this._zhuhunList[i] = null;
                }
            }
            this._zhuhunList = null;
        }
        if (this._gemList) {
            for (var i = 0; i < this._gemList.length; i++) {
                if (this._gemList[i]) {
                    this._gemList[i].dispose();
                    this._gemList[i] = null;
                }
            }
            this._gemList = null;
        }
        ObjectUtil.removes(this._group, this._bgImg, this._jipinGup, this._zhuhunGup, this._gem);
        ObjectUtil.disposes(this._closeBtn, this._goods, this._nameTxt, this._fighting, this._level, this._career, this._attText1, this._attText2, this._attAddValue1, this._attAddValue2);
        this._group = null;
        this._closeBtn = null;
        this._goods = null;
        this._nameTxt = null;
        this._fighting = null;
        this._level = null;
        this._career = null;
        this._attText1 = null;
        this._attText2 = null;
        this._attAddValue1 = null;
        this._attAddValue2 = null;
        this._cvo = null;
        this._info = null;
        this._bgImg = null;
        this._jipinGup = null;
        this._zhuhunGup = null;
        this._gem = null;
    };
    return EquipTips;
}(BaseItemsTips));
__reflect(EquipTips.prototype, "EquipTips");
//# sourceMappingURL=EquipTips.js.map