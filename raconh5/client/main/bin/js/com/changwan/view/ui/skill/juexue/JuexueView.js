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
 * 绝学
 * pzx
 * create 2018.2.26
 */
var JuexueView = /** @class */ (function (_super) {
    __extends(JuexueView, _super);
    function JuexueView() {
        var _this = _super.call(this) || this;
        _this._curTabIndex = -1;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("juexue", "JuexueViewSkin");
        return _this;
    }
    JuexueView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._model = Manager.model.getjuexue();
        this._tabList = [
            { type: JuexueType.JUEXUE_ESOTERICA_1 },
            { type: JuexueType.JUEXUE_ESOTERICA_2 },
            { type: JuexueType.JUEXUE_ESOTERICA_3 },
            { type: JuexueType.JUEXUE_ESOTERICA_4 }
        ];
        this._hScroller.initBtnListData(JuexueTabBtn, this._tabList, true);
        JuexueView.instance = this;
        this._actImg.touchEnabled = false;
        if (!this._fighting) {
            this._fighting = Manager.pool.create(NumImgView2);
            this._fighting.y = 13;
            this._fighting.x = 116;
            this._fightgroup.addChild(this._fighting);
        }
        if (!this._stepsNumImg) {
            this._stepsNumImg = Manager.pool.create(NumImgView2);
            this._stepsNumImg.y = 211;
            this._stepsNumImg.x = 45;
            this.addChild(this._stepsNumImg);
        }
        this._txtList = [this._shuexiTxt0, this._shuexiTxt1, this._shuexiTxt2, this._shuexiTxt3];
        this.createAni();
        this._bitimg.load(Manager.path.getPanelUiImgPath("juexue/juexue_beijing2"), 710);
    };
    JuexueView.prototype.initData = function () {
        _super.prototype.initData.call(this);
        var index = 0;
        for (var _i = 0, _a = this._model.esotericaList; _i < _a.length; _i++) {
            var i = _a[_i];
            if (this._model.checkUpgrade(i)) {
                index = i - 1;
            }
        }
        this._hScroller.itemList.selectedIndex = index;
        this._initIndex = index;
        this.onShortcutHandler(null);
        this.updateJingJie();
    };
    JuexueView.prototype.updateFight = function () {
        this._fighting.setValue(JueXueCVO.totalFight() + this._ambitFight, "nums_fighting_", 25);
    };
    JuexueView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._hScroller.itemList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShortcutHandler, this);
        this._attrItem._item0.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeAttrItem, this);
        this._attrItem._item1.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeAttrItem, this);
        this._attrItem._item2.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeAttrItem, this);
        this._xinfuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openArtifactPanel, this);
        this._actBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.upgradeJuexueHandler, this);
        this._model.addEventListener(JuexueEvent.JUEXUE_QUERY_EVENT, this.upateViewHandler, this);
        this._cirImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUpgradeAmbitLvHandler, this);
        this._model.addEventListener(JuexueEvent.JUEXUE_AMBIT_EVENT, this.updateUpgradeAmbitHandler, this);
        this._model.addEventListener(JuexueEvent.JUEXUE_UPGRADE_EVENT, this.updateUpgradeHandler, this);
    };
    JuexueView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._hScroller.itemList.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShortcutHandler, this);
        this._attrItem._item0.close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeAttrItem, this);
        this._attrItem._item1.close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeAttrItem, this);
        this._attrItem._item2.close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeAttrItem, this);
        this._xinfuBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openArtifactPanel, this);
        this._actBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.upgradeJuexueHandler, this);
        this._model.removeEventListener(JuexueEvent.JUEXUE_QUERY_EVENT, this.upateViewHandler, this);
        this._cirImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onUpgradeAmbitLvHandler, this);
        this._model.removeEventListener(JuexueEvent.JUEXUE_AMBIT_EVENT, this.updateUpgradeAmbitHandler, this);
        this._model.removeEventListener(JuexueEvent.JUEXUE_UPGRADE_EVENT, this.updateUpgradeHandler, this);
    };
    /** 升级返回 */
    JuexueView.prototype.updateUpgradeHandler = function (e) {
        //this._openCvo = e.params;
        this.updateFight();
        this.updateActImg();
        this.updateJingJie();
        this.showActRedIcon();
    };
    //升级境界
    JuexueView.prototype.onUpgradeAmbitLvHandler = function () {
        var cvo = JueXueAmbitCVO.getInfo(this._model.ambitLv);
        if (cvo.loss == "") {
            var str = LangCVO.getContent("common56"); //已满级
            FloatTips.addTips(str, Color.RED);
            return;
        }
        else {
            var loss = new GainLossVO(cvo.loss);
            if (!loss.isEnough()) {
                var str = LangCVO.getContent("juexue2"); //激活/升级任意绝学可增加境界值（{0}）
                var color = HtmlUtil.addColorTag("" + loss.selfCount, Color.RED_STR);
                str = StringUtils.setParam(str, color + "/" + loss.num);
                FloatTips.addTips(str);
                return;
            }
        }
        Manager.control.getjuexue().ambitlv(this._model.ambitLv + 1);
    };
    //升级境界返回
    JuexueView.prototype.updateUpgradeAmbitHandler = function () {
        this._cirAni = Manager.animation.createEffectAnimation("juexueBz");
        this.addChild(this._cirAni);
        this._cirAni.x = 58;
        this._cirAni.y = 75;
        this._cirAni.play();
        this.updateJingJie();
        this.showActRedIcon();
    };
    /** 查询返回 */
    JuexueView.prototype.upateViewHandler = function () {
        this.onShortcutHandler(null);
        this.updateJingJie();
    };
    /** 刷新境界 */
    JuexueView.prototype.updateJingJie = function () {
        this._stepsNumImg.setValue(this._model.ambitLv, "nums_juexue1_", 20);
        if (this._model.ambitLv < 10) {
            this._stepsNumImg.x = 45;
        }
        else {
            this._stepsNumImg.x = 33;
        }
        var cvo = JueXueAmbitCVO.getInfo(this._model.ambitLv);
        this._ambitFight = 0;
        if (cvo) {
            var att = Manager.pool.create(AttrVO, cvo.attr);
            var arr = att.attrInfos;
            this._ambitFight = att.getFighting();
            for (var i = 0; i < this._txtList.length; i++) {
                if (arr[i]) {
                    if (i == 3) {
                        arr[i].sign = " +";
                    }
                    else {
                        arr[i].sign = "    +";
                    }
                    this._txtList[i].text = arr[i].desc(true);
                }
                else {
                    this._txtList[i].text = "";
                }
            }
            Manager.pool.push(att);
        }
        //=================exp================
        var cirW = 160; //写死，特效的高为160;
        if (cvo.loss == "") {
            this._redIcon.visible = false;
            this._expAni.y = 170;
        }
        else {
            var loss = new GainLossVO(cvo.loss);
            if (loss.isEnough()) {
                this._expAni.y = 170;
                this._redIcon.visible = true;
                this.juexue_extent();
            }
            else {
                this.clearJuexue_ExtendAni();
                this._expAni.y = 330 - loss.selfCount / loss.num * cirW;
                this._redIcon.visible = false;
            }
        }
        this.updateFight();
    };
    JuexueView.prototype.createAni = function () {
        if (this._expAni == null) {
            this._expAni = Manager.animation.createEffectAnimation("juexueXp");
            this.addChildAt(this._expAni, 3);
            this._expAni.x = 154;
            this._expAni.y = 170;
            this._expMask = Manager.pool.create(egret.Shape);
            this._expMask.x = 263;
            this._expMask.y = 280;
            this._expMask.graphics.beginFill(1, 1);
            this._expMask.graphics.drawCircle(0, 0, 80);
            this._expMask.graphics.endFill();
            this.addChild(this._expMask);
            this._expAni.mask = this._expMask;
        }
    };
    JuexueView.prototype.upgradeJuexueHandler = function (e) {
        if (e != null && Manager.model.getGuide().curID == GuideID.JUEXUE_ACTIVE)
            return;
        if (this._openCvo) {
            var loss = void 0;
            if (this._openCvo.lev > 0) {
                var levCvo = this._openCvo.levCvo;
                if (levCvo.loss.length > 0) {
                    loss = new GainLossVO(levCvo.loss);
                }
            }
            else {
                loss = new GainLossVO(this._openCvo.active_loss);
            }
            if (loss) {
                if (!loss.isEnough()) {
                    var cvo = ItemsCVO.getCvo(loss.baseId);
                    Manager.view.show(9 /* ItemsTips */, cvo);
                    return;
                }
            }
            Manager.control.getjuexue().upgrade(this._openCvo.id, this._openCvo.lev + 1);
        }
    };
    JuexueView.prototype.openArtifactPanel = function () {
        Manager.view.show(110 /* ArtifactPanel */);
    };
    JuexueView.prototype.closeAttrItem = function () {
        this._attrItem.visible = false;
        this._juanzouItem.visible = true;
        this._fightgroup.visible = true;
        this._btnGroup.visible = false;
        this._openCvo = null;
    };
    JuexueView.prototype.onShortcutHandler = function (e) {
        if (this._juanzouItem.isStarPlay || this._attrItem.isStarPlay)
            return;
        var index = this._hScroller.itemList.selectedIndex;
        if (index < 0)
            return;
        if (index == this._curTabIndex) {
            if (this._attrItem.visible) {
                this.closeAttrItem();
            }
        }
        var item = this._hScroller.itemList.getElementAt(index);
        if (this._curTabBtn) {
            this._curTabBtn.isSelected(false);
        }
        else {
            var item1 = this._hScroller.itemList.getElementAt(this._initIndex);
            if (item1)
                item1.isSelected(false);
        }
        if (item)
            item.isSelected(true);
        else
            this._hScroller.itemList.dataProvider.source[index].isSelected = true;
        this._curTabBtn = item;
        this._curTabIndex = index;
        var type = this._tabList[index].type;
        this.changeJuanZouData(type);
    };
    JuexueView.prototype.changeJuanZouData = function (type) {
        var arr = JueXueCVO.getList(type);
        this._juanzouItem.setData(arr);
        if (this._attrItem.visible) {
            this.closeAttrItem();
        }
    };
    JuexueView.prototype.playAttrItem = function (value) {
        this._openCvo = value;
        this._attrItem.setData(value);
        this._attrItem.visible = true;
        this._juanzouItem.visible = false;
        this._fightgroup.visible = false;
        this._btnGroup.visible = true;
        this.updateActImg();
        this.showActRedIcon();
        //引导
        if (Manager.model.getGuide().curID == GuideID.JUEXUE_ACTIVE) {
            if (this._actBtn) {
                if (!this._actBtn.visible)
                    Manager.control.getTask().hideGuide();
                else {
                    var pos = this._actBtn.parent.localToGlobal(this._actBtn.x, this._actBtn.y);
                    Manager.control.getTask().showGuide(pos, this._actBtn.width >> 1, this._actBtn.height >> 1, this.guideCB, this, false);
                }
            }
            else
                Manager.control.getTask().hideGuide();
        }
    };
    JuexueView.prototype.updateopenCvo = function (value) {
        this._openCvo = value;
        this.updateActImg();
        this.showActRedIcon();
    };
    /** 更新升级图片 */
    JuexueView.prototype.updateActImg = function () {
        if (this._openCvo.lev == 0) {
            this._actImg.source = "common_active_png";
        }
        else {
            this._actImg.source = "common_label_upgrade_png";
        }
    };
    /** 更新升级小红点 */
    JuexueView.prototype.showActRedIcon = function () {
        if (this._openCvo)
            this._actRedIcon.visible = this._openCvo.checkUpgrade();
    };
    JuexueView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
    };
    JuexueView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    JuexueView.prototype.setData = function (data) {
        this.invalidate(InvalidationType.DATA);
    };
    JuexueView.prototype.drawData = function () {
    };
    JuexueView.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
    };
    JuexueView.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.clear();
    };
    JuexueView.prototype.clear = function (isRemove) {
        if (isRemove === void 0) { isRemove = false; }
        if (isRemove) {
            ObjectUtil.disposes(this._hScroller, this._shuexiTxt0, this._shuexiTxt1, this._shuexiTxt2, this._shuexiTxt3, this._juanzouItem, this._curTabBtn, this._attrItem, this._xinfuBtn, this._actBtn);
            ObjectUtil.removes(this._fightgroup, this._btnGroup, this._actImg, this._actRedIcon, this._cirImg, this._redIcon);
        }
        this._model = null;
        this._hScroller = null;
        this._shuexiTxt0 = null;
        this._shuexiTxt1 = null;
        this._shuexiTxt2 = null;
        this._shuexiTxt3 = null;
        this._txtList = null;
        this._juanzouItem = null;
        this._curTabBtn = null;
        this._tabList = null;
        this._attrItem = null;
        JuexueView.instance = null;
        this._fightgroup = null;
        this._btnGroup = null;
        this._xinfuBtn = null;
        this._actBtn = null;
        this._actImg = null;
        Manager.pool.push(this._fighting);
        this._fighting = null;
        Manager.pool.push(this._stepsNumImg);
        this._stepsNumImg = null;
        this._openCvo = null;
        this._cirImg = null;
        Manager.pool.push(this._expAni);
        this._expAni = null;
        if (this._cirAni) {
            Manager.pool.push(this._cirAni);
            this._cirAni = null;
        }
        Manager.pool.push(this._expMask);
        this._expMask = null;
        this._actRedIcon = null;
        this._redIcon = null;
        if (this._bitimg) {
            Manager.pool.push(this._bitimg);
            this._bitimg = null;
        }
        this.clearJuexue_ExtendAni();
    };
    JuexueView.prototype.guideCB = function () {
        this.upgradeJuexueHandler(null);
        Manager.control.getTask().hideGuide();
    };
    JuexueView.prototype.juexue_extent = function () {
        this.clearJuexue_ExtendAni();
        this._juexue_extentAni = Manager.animation.createEffectAnimation("juexue_extent");
        this.addChild(this._juexue_extentAni);
        this._juexue_extentAni.x = 135;
        this._juexue_extentAni.y = 155;
    };
    JuexueView.prototype.clearJuexue_ExtendAni = function () {
        if (this._juexue_extentAni) {
            Manager.pool.push(this._juexue_extentAni);
            this._juexue_extentAni = null;
        }
    };
    JuexueView.prototype.dispose = function () {
        if (Manager.model.getGuide().curID == GuideID.JUEXUE_ACTIVE)
            Manager.control.getTask().hideGuide();
        _super.prototype.dispose.call(this);
        this.clear(true);
    };
    return JuexueView;
}(UIComponent));
//# sourceMappingURL=JuexueView.js.map