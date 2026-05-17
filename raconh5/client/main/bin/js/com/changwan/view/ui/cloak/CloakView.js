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
 * pzx
 * 17.11.29
 * 披风
 */
var CloakView = /** @class */ (function (_super) {
    __extends(CloakView, _super);
    function CloakView() {
        var _this = _super.call(this) || this;
        _this._currentIndex = 0;
        _this.skinName = Manager.path.getSkinName("cloak", "CloakViewSkin");
        _this.touchChildren = true;
        return _this;
    }
    CloakView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        // this._currentIndex=-1;
        this._actImg.touchEnabled = this._putonImg.touchEnabled = this._takeoffImg.touchEnabled = this._upgradeImg.touchEnabled = false;
        this._bgImg = Manager.pool.create(BitmapRemote);
        this._bgImg.x = 0;
        this._bgImg.y = 0;
        this._bgImg.load(Manager.path.getPanelUiImgPath("cloak/cloak_di3", "png"), 454, 629);
        this._diGroup.addChild(this._bgImg);
        if (!this._leftBgImg) {
            this._leftBgImg = Manager.pool.create(BitmapRemote);
            this._leftBgImg.x = 6;
            this._leftBgImg.y = 124;
            this.addChildAt(this._leftBgImg, 3);
            this._leftBgImg.load(PathInfo.getPath("res/common/common_pnl_back2.png", LoaderType.IMAGE), 244, 853);
        }
        this._model = Manager.model.getCloak();
        this._goods.clear();
        if (!this._fighting) {
            this._fighting = Manager.pool.create(NumImgView2);
            this._fighting.y = 686;
            this.addChild(this._fighting);
        }
    };
    CloakView.prototype.initData = function () {
        this._vscroll.initBtnListData(CloakItem, this._model.getList(), true);
        if (this._currentIndex != -1)
            Manager.render.add(this.initSelect, this, 100);
    };
    CloakView.prototype.initSelect = function () {
        Manager.render.remove(this.initSelect, this);
        this.onSelectItemHandler();
    };
    CloakView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._vscroll.itemList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onitemListHandler, this);
        this._activeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onActiveHandler, this);
        this._putonBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onWareHandler, this);
        this._model.addEventListener(CloakEvent.CLOAK_UPDATE_EVENT, this.updateData, this);
        this._model.addEventListener(CloakEvent.CLOAK_WARE_EVENT, this.onUpdateWareHandler, this);
    };
    CloakView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._vscroll.itemList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onitemListHandler, this);
        this._activeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onActiveHandler, this);
        this._putonBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onWareHandler, this);
        this._model.removeEventListener(CloakEvent.CLOAK_UPDATE_EVENT, this.updateData, this);
        this._model.removeEventListener(CloakEvent.CLOAK_WARE_EVENT, this.onUpdateWareHandler, this);
        this._pifeng.removeEventListener(GlobalEvent.ANIMATION_LOAD_COMPLETE, this.onpifengLoadComplete, this);
    };
    CloakView.prototype.onpifengLoadComplete = function (e) {
        this._pifeng.play();
        this._pifeng.removeEventListener(GlobalEvent.ANIMATION_LOAD_COMPLETE, this.onpifengLoadComplete, this);
    };
    //升星，激活
    CloakView.prototype.onActiveHandler = function () {
        if (this._cvo.num > 0) {
            //升星
            if (this._cvo.num >= 3) {
                FloatTips.addTips("已满星", Color.RED);
                //Manager.tips.showTips("已满星",null,false);
                return;
            }
            var starCvo = this._cvo.starArr[this._cvo.num];
            var loss = new GainLossVO(starCvo.loss);
            if (loss.isEnough()) {
                Manager.control.getCloak().upgradeStar(this._cvo.id);
            }
            else {
                var cvo = ItemsCVO.getCvo(loss.baseId);
                Manager.view.show(9 /* ItemsTips */, cvo);
            }
            return;
        }
        // 激活
        var less = this._cvo.losse;
        if (less.isEnough()) {
            var actList = this._cvo.act_cond;
            var str = "";
            for (var _i = 0, actList_1 = actList; _i < actList_1.length; _i++) {
                var con = actList_1[_i];
                if (!con.isSatisfy) {
                    if (con.type == ConditionVO.REIN) {
                        str = con.value + "转可激活";
                    }
                    else if (con.type == ConditionVO.VIP) {
                        str = "VIP" + con.value + "可激活";
                    }
                    else if (con.type == ConditionVO.LEVEL) {
                        str = con.value + "级可激活";
                    }
                    break;
                }
            }
            if (str.length > 0) {
                Manager.tips.showTips(str, null, false);
            }
            else {
                Manager.control.getCloak().activate(this._cvo.id);
            }
        }
        else {
            var cvo = ItemsCVO.getCvo(less.baseId);
            Manager.view.show(9 /* ItemsTips */, cvo);
        }
    };
    //穿戴
    CloakView.prototype.onWareHandler = function () {
        if (this._cvo.id == this._model.currentId) {
            Manager.control.getCloak().rawe(0);
        }
        else {
            Manager.control.getCloak().rawe(this._cvo.id);
        }
    };
    CloakView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.updateData();
    };
    CloakView.prototype.updateData = function () {
        this._vscroll.itemList.selectedIndex = 0;
        if (this._cvo == null) {
            if (this._model.currentId == 0) {
                this._cvo = this._model.getList()[0];
            }
            else {
                for (var _i = 0, _a = this._model.getList(); _i < _a.length; _i++) {
                    var info = _a[_i];
                    if (info.id == this._model.currentId) {
                        this._cvo = info;
                        break;
                    }
                }
            }
        }
        if (this._cvo) {
            this.updateView();
            this._model.pitchId = this._cvo.id;
        }
    };
    CloakView.prototype.onitemListHandler = function (e) {
        if (e === void 0) { e = null; }
        var index = this._vscroll.itemList.selectedIndex;
        if (this._currentIndex == index)
            return;
        this._currentIndex = index;
        this.onSelectItemHandler();
    };
    CloakView.prototype.onSelectItemHandler = function () {
        var item = this._vscroll.itemList.getElementAt(this._currentIndex);
        this._cvo = item.data;
        this._model.pitchId = this._cvo.id;
        this._model.dispatchEvent(new CloakEvent(CloakEvent.CLOAK_TAP_EVENT, this._cvo.id));
        this.updateView();
    };
    CloakView.prototype.updateView = function () {
        if (this._pifeng) {
            this._pifeng.unuse();
        }
        this._pifeng = Manager.animation.createPanelCloakAnimation("" + this._cvo.res_id);
        this._pifeng.addEventListener(GlobalEvent.ANIMATION_LOAD_COMPLETE, this.onpifengLoadComplete, this);
        if (!this._pifeng.parent) {
            this.addChild(this._pifeng);
            var posArr = this._cvo.res_posetion.split(",");
            this._pifeng.x = Number(posArr[0]);
            this._pifeng.y = Number(posArr[1]);
        }
        this._nameImg.load(Manager.path.getPanelUiImgPath("cloak/cloak_label_" + this._cvo.res_id, "png")); //.source = "cloak_label_"+this._cvo.res_id+"_png"
        for (var j = 1; j < 4; j++) {
            this["_star" + j].visible = j <= this._cvo.num;
        }
        if (this._cvo.num == 0) {
            //未激活的
            this._actImg.visible = true;
            this._upgradeImg.visible = false;
            this._takeoffImg.visible = false;
            this._putonImg.visible = true;
            FilterUtil.setGrayFilter(this._putonBtn);
            FilterUtil.setGrayFilter(this._putonImg);
        }
        else {
            this._putonBtn.filters = null;
            this._putonImg.filters = null;
            this._actImg.visible = false;
            this._upgradeImg.visible = true;
            if (this._cvo.id == this._model.currentId) {
                this._takeoffImg.visible = true;
                this._putonImg.visible = false;
            }
            else {
                this._takeoffImg.visible = false;
                this._putonImg.visible = true;
            }
        }
        var attr = this._cvo.getattrVO();
        var attrList = attr.attrInfos;
        var i = 1;
        var fightNum = 0;
        for (var _i = 0, attrList_1 = attrList; _i < attrList_1.length; _i++) {
            var info = attrList_1[_i];
            if (info) {
                if (this["_attrTxt" + i])
                    this["_attrTxt" + i].text = info.desc();
                i++;
            }
        }
        this._fighting.setValue(attr.getFighting(), "nums_fighting_", 25);
        //this._fightImg.x = this. _ditImg.x + (464 - this._fightImg.width - this._fighting.width)/2;
        this._fighting.x = this._fightImg.x + this._fightImg.width;
        var index = this._cvo.num + 1;
        if (this._cvo.num >= 3) {
            index = 3;
        }
        var starCvo = this._cvo.starArr[index];
        var less = new GainLossVO(starCvo.loss);
        this._goods.baseId = less.baseId;
        this._goods.count = 1;
        var bagCount = Manager.model.getItems().getCountItemById(less.baseId);
        var numloss;
        if (less.isEnough()) {
            numloss = bagCount + "/" + less.num;
        }
        else {
            numloss = HtmlUtil.addColorTag("" + bagCount, "#ff0000") + "/" + less.num;
        }
        this._numTxt.textFlow = new egret.HtmlTextParser().parse(numloss);
    };
    CloakView.prototype.onUpdateWareHandler = function () {
        if (this._cvo.id == this._model.currentId) {
            this._putonImg.visible = false;
            this._takeoffImg.visible = true;
        }
        else {
            this._putonImg.visible = true;
            this._takeoffImg.visible = false;
        }
    };
    CloakView.prototype.reuse = function (value) {
        if (value === void 0) { value = -1; }
        _super.prototype.reuse.call(this);
        if (value != -1)
            this._currentIndex = value - 1;
    };
    CloakView.prototype.unuse = function () {
        Manager.render.remove(this.initSelect, this);
        _super.prototype.unuse.call(this);
    };
    CloakView.prototype.dispose = function () {
        Manager.render.remove(this.initSelect, this);
        _super.prototype.dispose.call(this);
        if (!this._loadComplete)
            return;
        ObjectUtil.removes(this._actImg, this._putonImg, this._star3, this._star1, this._star2, this._takeoffImg, this._upgradeImg, this._bgImg, this._diGroup, this._leftBgImg);
        if (this._leftBgImg)
            Manager.pool.push(this._leftBgImg);
        this._leftBgImg = null;
        if (this._bgImg)
            Manager.pool.push(this._bgImg);
        this._bgImg = null;
        this._diGroup = null;
        this._putonBtn.dispose();
        this._activeBtn.dispose();
        this._actImg = null;
        this._putonImg = null;
        this._goods.dispose();
        this._attrTxt1.dispose();
        this._attrTxt2.dispose();
        this._attrTxt3.dispose();
        this._star3 = null;
        this._star1 = null;
        this._star2 = null;
        this._takeoffImg = null;
        this._upgradeImg = null;
        this._vscroll.dispose();
        if (this._fighting)
            Manager.pool.push(this._fighting);
        this._fighting = null;
        this._putonBtn = null;
        this._activeBtn = null;
        this._goods = null;
        this._attrTxt1 = null;
        this._attrTxt2 = null;
        this._attrTxt3 = null;
        this._vscroll = null;
        this._nameImg.dispose();
        this._nameImg = null;
        this._model = null;
        this._cvo = null;
        Manager.pool.push(this._pifeng);
        this._pifeng = null;
        this._numTxt.dispose();
        this._numTxt = null;
    };
    return CloakView;
}(UIComponent));
//# sourceMappingURL=CloakView.js.map