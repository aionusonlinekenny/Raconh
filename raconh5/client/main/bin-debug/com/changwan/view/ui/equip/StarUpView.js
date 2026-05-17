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
 * drq
 * 升星
 * 2018.4.12
 */
var StarUpView = (function (_super) {
    __extends(StarUpView, _super);
    function StarUpView(thisParent) {
        var _this = _super.call(this) || this;
        _this._oldList = [];
        _this._newList = [];
        _this._itemsData = [];
        _this._itemList = [];
        _this._topItemList = [];
        _this._objList = [];
        _this._thisParent = thisParent;
        _this.skinName = Manager.path.getSkinName("equip", "StarUpViewSkin");
        _this._model = Manager.model.getStarUp();
        _this._cvo = StarUpCVO.getCvo();
        return _this;
    }
    StarUpView.prototype.configUI = function () {
        this._objList = [this._thisParent._equipItemList, this._thisParent._fighting, this._thisParent._equipName, this._thisParent._topBtn, this._thisParent._titleBg, this._thisParent._fightImg2, this._thisParent._fightImg];
        for (var i = 0; i < 7; i++) {
            this._objList[i].visible = false;
        }
        _super.prototype.configUI.call(this);
        this.touchChildren = true;
        this._itemMainBg.touchEnabled = true;
        this._oldList = [this._oldTxt01, this._oldTxt02, this._oldTxt03];
        this._newList = [this._newTxt01, this._newTxt02, this._newTxt03];
        this._itemsData = [null, null, null, null, null];
        this._itemTopList = [this._item01, this._item02, this._item03, this._item04, this._item05];
        //初始化
        for (var i = 0; i < 3; i++) {
            this._oldList[i].text = "";
            this._newList[i].text = "";
        }
        this._success.text = LangCVO.getContent("starUp2") + "0%";
        if (!this._BgImg01) {
            this._BgImg01 = Manager.pool.create(BitmapRemote);
            this._BgImg01.x = 103.5;
            this._BgImg01.y = 140;
            this.addChildAt(this._BgImg01, 0);
            this._BgImg01.load(PathInfo.getPath("res/starUp/starUp_back01.png", LoaderType.IMAGE), 513, 513);
        }
        if (!this._BgImg02) {
            this._BgImg02 = Manager.pool.create(BitmapRemote);
            this._BgImg02.x = 103.5;
            this._BgImg02.y = 140;
            this.addChildAt(this._BgImg02, 0);
            this._BgImg02.load(PathInfo.getPath("res/starUp/starUp_back02.png", LoaderType.IMAGE), 513, 513);
        }
        this.createBottomScroll([]);
    };
    StarUpView.prototype.show = function () {
    };
    StarUpView.prototype.hide = function () {
        this.dispose();
    };
    StarUpView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._explainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._itemMainBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._allUpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._starUpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getStarUp().addEventListener(StarUpEvent.STARUP_UPDATE, this.starUp, this);
    };
    StarUpView.prototype.removeEvent = function () {
        this._itemMainBg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._explainBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._allUpBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._starUpBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getStarUp().removeEventListener(StarUpEvent.STARUP_UPDATE, this.starUp, this);
        _super.prototype.removeEvent.call(this);
    };
    StarUpView.prototype.onClickHandler = function (e) {
        switch (e.currentTarget) {
            case this._explainBtn:
                Manager.view.show(147 /* StarUpExplainView */, "starUp_sm_png", 1, LangCVO.getContent("starUp1"), true);
                break;
            case this._itemMainBg:
                var list = this._model.getStarUpList();
                var len = list.length;
                if (len == 0) {
                    Manager.view.show(147 /* StarUpExplainView */, "starUp_zzb_png", 2, "starUp_tip_png", false, 535, 48);
                }
                else {
                    Manager.view.show(147 /* StarUpExplainView */, "starUp_zzb_png", 3, "", false, 1, 1, list);
                }
                break;
            case this._allUpBtn:
                if (this._itemMaindata) {
                    for (var i = 0; i < 5; i++) {
                        if (this._itemsData[i] == null) {
                            for (var j = 0; j < this._itemList.length; j++) {
                                var item = this._hScroll.itemList.getChildAt(j);
                                if (item._state || this._itemList[j].base_id == undefined) {
                                    continue;
                                }
                                this._itemsData[i] = this._itemList[j];
                                item._state = true;
                                item.filters = [FilterUtil.getBrightFilter(-40)];
                                break;
                            }
                        }
                    }
                    this.createTopItem();
                }
                else {
                    FloatTips.addTips(LangCVO.getContent("starUp3"), Color.RED);
                }
                break;
            case this._starUpBtn:
                if (this._itemMaindata) {
                    var type = this._itemMaindata.storagetype;
                    var id = this._itemMaindata.id;
                    var arr = [];
                    for (var i = 0; i < this._itemsData.length; i++) {
                        if (this._itemsData[i] && this._itemsData[i] != undefined) {
                            arr.push(this._itemsData[i].id);
                        }
                    }
                    if (arr.length == 0) {
                        FloatTips.addTips(LangCVO.getContent("starUp4"), Color.RED);
                    }
                    else {
                        Manager.control.getStarUp().sendStarUp(type, id, arr);
                    }
                }
                else {
                    FloatTips.addTips(LangCVO.getContent("starUp3"), Color.RED);
                }
                break;
        }
    };
    //创建上方装备
    StarUpView.prototype.createTopItem = function () {
        var posList = [{ x: 289.5, y: 100 }, { x: 540, y: 315 }, { x: 456, y: 538 }, { x: 166, y: 538 }, { x: 50, y: 315 }];
        var offer_total = 0;
        for (var i = 0; i < 5; i++) {
            if (!this._itemTopList[i]) {
                this._itemTopList[i] = Manager.pool.create(BaseGoods);
                this._itemTopList[i].x = posList[i].x;
                this._itemTopList[i].y = posList[i].y;
                this.addChild(this._itemTopList[i]);
            }
            if (this._itemsData[i]) {
                this._itemTopList[i].visible = true;
                this._itemTopList[i].setCvo(this._itemsData[i].cvo);
                this._itemTopList[i].setStar(this._itemsData[i].getStar());
                //概率 升星成功率=放入副装备分值总和/主装备所需分值*100%
                for (var j = 0; j < this._cvo.length; j++) {
                    if (this._itemsData[i].base_id == this._cvo[j].item_id && this._cvo[j].star == this._itemsData[i].getStar()) {
                        offer_total += this._cvo[j].offer_val;
                        break;
                    }
                }
            }
            else {
                this._itemTopList[i].setCvo(null);
                this._itemTopList[i].visible = false;
            }
            if (this._itemMaindata) {
                var need = 0;
                for (var j = 0; j < this._cvo.length; j++) {
                    if (this._itemMaindata.base_id == this._cvo[j].item_id && this._cvo[j].star == this._itemMaindata.getStar()) {
                        need = this._cvo[j].need_val;
                        break;
                    }
                }
                if (need == 0) {
                }
                else {
                    var success = (offer_total / need * 100);
                    var str = void 0;
                    if (success < 100) {
                        str = success.toFixed(1);
                    }
                    else {
                        str = "100";
                    }
                    this._success.text = LangCVO.getContent("starUp2") + str + "%";
                }
            }
        }
    };
    //更新主装备
    StarUpView.prototype.updateMainEquip = function (data, isStarUp) {
        if (isStarUp === void 0) { isStarUp = false; }
        var oldData = this._itemMaindata;
        this._itemMaindata = data;
        //主装备
        this._itemMain = Manager.pool.create(BaseGoods);
        this.addChild(this._itemMain);
        this._itemMain.x = 290;
        this._itemMain.y = 320;
        this._itemMain.setCvo(this._itemMaindata.cvo);
        this._itemMain.setStar(this._itemMaindata.getStar());
        this._itemMain.touchEnabled = false;
        this._itemMain.touchChildren = false;
        //极品属性
        for (var j = 0; j < 3; j++) {
            this._newList[j].text = "";
        }
        var attr = this._itemMaindata.infoList;
        //let attvo:AttrVO = Manager.pool.create(AttrVO,attr);
        var count = 2;
        for (var i = 0; i < attr.length; i++) {
            if (attr[i].type == 1) {
                var jipVO = Manager.pool.create(AttrVO, attr[i].target + "," + attr[i].value);
                var invo = jipVO.getinfo(attr[i].target);
                if (isStarUp) {
                    if (attr[i]) {
                        if (invo.showStar == 1) {
                            HtmlUtil.setTextFlow(this._newList[count], HtmlUtil.addColorTag(invo.desc(), Color.PURPLE_STR));
                        }
                        else {
                            HtmlUtil.setTextFlow(this._newList[count], HtmlUtil.addColorTag(invo.desc(), "#009bfd"));
                        }
                    }
                    else {
                        this._newList[count].text = "";
                    }
                }
                else {
                    if (attr[i]) {
                        if (invo.showStar == 1) {
                            HtmlUtil.setTextFlow(this._oldList[count], HtmlUtil.addColorTag(invo.desc(), Color.PURPLE_STR));
                        }
                        else {
                            HtmlUtil.setTextFlow(this._oldList[count], HtmlUtil.addColorTag(invo.desc(), "#009bfd"));
                        }
                    }
                    else {
                        this._oldList[count].text = "";
                    }
                }
                count--;
            }
        }
        //顶部
        this._itemsData = [null, null, null, null, null];
        this.createTopItem();
        //底部
        var bottomList = this._model.getBottomList(this._itemMaindata);
        this.createBottomScroll(bottomList);
    };
    //创建下方列表
    StarUpView.prototype.createBottomScroll = function (bottomList) {
        this._itemList = bottomList;
        this._curItemCount = this._itemList.length;
        if (this._itemList.length < 6) {
            for (var i = 0; i < 6 - this._curItemCount; i++) {
                var info = new ItemsModelInfo();
                this._itemList.push(info);
            }
        }
        this._hScroll.initBtnListData(StarUpItem, this._itemList, true);
        this._hScroll.itemList.layout.gap = -8;
        this._hScroll.dataProvider(this._itemList);
    };
    StarUpView.prototype.starUp = function (e) {
        var any = e.params;
        //清空上部
        this._itemsData = [null, null, null, null, null];
        this.createTopItem();
        var data;
        if (any.result == 1) {
            //极品属性
            var arr = void 0;
            if (any.type == 1) {
                arr = Manager.model.getItems().equipList.values();
            }
            else if (any.type == 2) {
                arr = Manager.model.getItems().bagList;
            }
            var ln = arr.length;
            for (var i = 0; i < ln; i++) {
                if (any.id == arr[i].id) {
                    data = arr[i];
                }
            }
            this.updateMainEquip(data, true);
        }
        else {
            //刷新底部
            var bottomList = this._model.getBottomList(this._itemMaindata);
            this.createBottomScroll(bottomList);
            //显示新属性（和旧属性相同）
            var attr = this._itemMaindata.infoList;
            var count = 2;
            for (var i = 0; i < attr.length; i++) {
                if (attr[i].type == 1) {
                    var jipVO = Manager.pool.create(AttrVO, attr[i].target + "," + attr[i].value);
                    var invo = jipVO.getinfo(attr[i].target);
                    if (attr[i]) {
                        if (invo.showStar == 1) {
                            HtmlUtil.setTextFlow(this._newList[count], HtmlUtil.addColorTag(invo.desc(), Color.PURPLE_STR));
                        }
                        else {
                            HtmlUtil.setTextFlow(this._newList[count], HtmlUtil.addColorTag(invo.desc(), "#009bfd"));
                        }
                    }
                    else {
                        this._newList[count].text = "";
                    }
                    count--;
                }
            }
        }
    };
    StarUpView.prototype.initData = function () {
        this._thisParent._titleImg.source = "starUp_title_png";
    };
    StarUpView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
    };
    StarUpView.prototype.dispose = function () {
        for (var i = 0; i < 7; i++) {
            this._objList[i].visible = true;
        }
        _super.prototype.dispose.call(this);
        this._thisParent = null;
        ObjectUtil.removes(this._BgImg01, this._BgImg02, this._itemMainBg, this._explainBtn, this._allUpBtn, this._starUpBtn);
        ObjectUtil.disposes(this._success, this._oldTxt01, this._oldTxt02, this._oldTxt03, this._newTxt01, this._newTxt02, this._newTxt03, this._model);
        this._BgImg01.dispose();
        this._BgImg01 = null;
        this._BgImg02.dispose();
        this._BgImg02 = null;
        this._itemMainBg = null;
        this._explainBtn = null;
        this._success = null;
        this._oldTxt01 = null;
        this._oldTxt02 = null;
        this._oldTxt03 = null;
        this._oldList = null;
        this._newTxt01 = null;
        this._newTxt02 = null;
        this._newTxt03 = null;
        this._newList = null;
        this._item01 = null;
        this._item02 = null;
        this._item03 = null;
        this._item04 = null;
        this._item05 = null;
        this._itemTopList = null;
        this._itemsData = null;
        this._itemMain = null;
        this._itemMaindata = null;
        this._allUpBtn = null;
        this._starUpBtn = null;
        this._hScroll.dispose();
        this._hScroll = null;
        this._itemList = null;
        this._curItemCount = null;
        this._topItemList = null;
        this._model = null;
        this._cvo = null;
    };
    return StarUpView;
}(UIComponent));
__reflect(StarUpView.prototype, "StarUpView");
//# sourceMappingURL=StarUpView.js.map