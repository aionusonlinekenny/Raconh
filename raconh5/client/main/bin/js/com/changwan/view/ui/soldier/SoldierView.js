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
 * 兵魂
 * Simon
 * 2017.12.19
 */
var SoldierView = /** @class */ (function (_super) {
    __extends(SoldierView, _super);
    function SoldierView() {
        var _this = _super.call(this) || this;
        _this._currentIndex = 0;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("soldier", "SoldierViewSkin");
        return _this;
    }
    SoldierView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._actImg.touchEnabled = this._putonImg.touchEnabled = this._takeoffImg.touchEnabled = this._upgradeImg.touchEnabled = false;
        this._takeoffImg.visible = this._upgradeImg.visible = false;
        this._leftBgImg = Manager.pool.create(BitmapRemote);
        this._leftBgImg.x = 6;
        this._leftBgImg.y = 124;
        this.addChildAt(this._leftBgImg, 0);
        this._leftBgImg.load(PathInfo.getPath("res/common/common_pnl_back2.png", LoaderType.IMAGE), 244, 853);
        this._bgImg = Manager.pool.create(BitmapRemote);
        this._bgImg.x = 0;
        this._bgImg.y = 0;
        this._bgImg.load(Manager.path.getPanelUiImgPath("cloak/cloak_di3", "png"), 454, 629);
        this._diGroup.addChild(this._bgImg);
        this._backStarList = [];
        this._starList = [];
        for (var i = 0; i < 10; i++) {
            var img = BitmapRes.create("common_star_grey_png", 290 + i * 40, 146, 32, 30);
            this.addChild(img);
            this._backStarList.push(img);
            var img2 = BitmapRes.create("common_star_bright_png", 290 + i * 40, 146, 32, 30);
            this._starList.push(img2);
        }
        // this._goods = Manager.pool.create(BaseGoods);
        // this._goods.x = 530;
        // this._goods.y = 807;
        // this.addChildAt(this._goods, this.getChildIndex(this._numTxt) - 1);
        this._numTxt.touchEnabled = false;
        this._fighting = Manager.pool.create(NumImgView2);
        this._fighting.x = this._fightImg.x + this._fightImg.width + 10;
        this._fighting.y = this._fightImg.y + 10;
        this.addChild(this._fighting);
        this._fighting.setValue(0, "nums_fighting_", 25);
        // this._currentIndex = -1;
        this._model = Manager.model.getSoldier();
    };
    SoldierView.prototype.initData = function () {
        this._scroller.initBtnListData(SoldierItem, this._model.getList(), true);
        this._localId = this._model.canUpgradeLocal;
        if (this._currentIndex != -1)
            Manager.render.add(this.initSelect, this, 500);
        else
            Manager.control.getSoldier().query();
    };
    SoldierView.prototype.initSelect = function () {
        Manager.render.remove(this.initSelect, this);
        this.onSelectItemHandler();
        // this._model.canUpgradeLocal = 0;
        this._localId = 0;
    };
    SoldierView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._scroller.itemList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClickItemHandler, this);
        this._activeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onActiveHandler, this);
        this._putonBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPutonHandler, this);
        this._model.addEventListener(SoldierEvent.SOLDIER_INFO_UPDATE, this.onUpdateInfoHandler, this);
        this._model.addEventListener(SoldierEvent.SOLDIER_UPGRADE_STAR, this.onUpdateInfoHandler, this);
        this._model.addEventListener(SoldierEvent.SOLDIER_PUTON, this.onUpdatePutonHandler, this);
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onUpdateItemHandler, this);
    };
    SoldierView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._scroller.itemList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClickItemHandler, this);
        this._activeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onActiveHandler, this);
        this._putonBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPutonHandler, this);
        this._model.removeEventListener(SoldierEvent.SOLDIER_INFO_UPDATE, this.onUpdateInfoHandler, this);
        this._model.removeEventListener(SoldierEvent.SOLDIER_UPGRADE_STAR, this.onUpdateInfoHandler, this);
        this._model.removeEventListener(SoldierEvent.SOLDIER_PUTON, this.onUpdatePutonHandler, this);
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onUpdateItemHandler, this);
        if (this._soldier)
            this._soldier.removeEventListener(GlobalEvent.ANIMATION_LOAD_COMPLETE, this.onSoldierLoadComplete, this);
    };
    SoldierView.prototype.onUpdateInfoHandler = function (e) {
        this._scroller.itemList.selectedIndex = 0;
        if (this._cvo == null || this._localId != 0) {
            if (this._localId != 0) {
                var index = 0;
                for (var _i = 0, _a = this._model.getList(); _i < _a.length; _i++) {
                    var info = _a[_i];
                    if (info.id == this._localId) {
                        this._cvo = info;
                        this._currentIndex = index;
                        break;
                    }
                    index += 1;
                }
            }
            else {
                if (this._model.currentId == 0) {
                    this._cvo = this._model.getList()[0];
                }
                else {
                    var index = 0;
                    for (var _b = 0, _c = this._model.getList(); _b < _c.length; _b++) {
                        var info = _c[_b];
                        if (info.id == this._model.currentId) {
                            this._cvo = info;
                            this._currentIndex = index;
                            break;
                        }
                        index += 1;
                    }
                }
            }
        }
        if (this._cvo) {
            this._model.selectId = this._cvo.id;
            this.updateView();
        }
    };
    SoldierView.prototype.updateView = function () {
        if (this._soldier)
            Manager.pool.push(this._soldier);
        this._soldier = Manager.animation.createPanelShenbingAnimation("" + this._cvo.resId);
        this._soldier.addEventListener(GlobalEvent.ANIMATION_LOAD_COMPLETE, this.onSoldierLoadComplete, this);
        if (!this._soldier.parent)
            this.addChild(this._soldier);
        this._soldier.x = -110;
        this._soldier.y = -200;
        var id = String(this._model.selectId);
        this._nameImg.source = "soldier_name" + (id.substr(id.length - 1, 1)) + "_png";
        for (var i_1 = 1; i_1 <= 10; i_1++) {
            if (i_1 <= this._cvo.soldierStarNum)
                this.addChild(this._starList[i_1 - 1]);
            else {
                if (this._starList[i_1 - 1].parent)
                    this._starList[i_1 - 1].parent.removeChild(this._starList[i_1 - 1]);
            }
        }
        if (this._cvo.soldierStarNum == 0) {
            //未激活的
            this._actImg.visible = true;
            this._upgradeImg.visible = false;
            this._putonImg.visible = true;
            this._takeoffImg.visible = false;
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
        var attr = this._cvo.getAttrVO();
        var attrList = attr.attrInfos;
        var i = 1;
        var fightNum = 0;
        for (var _i = 0, attrList_1 = attrList; _i < attrList_1.length; _i++) {
            var info = attrList_1[_i];
            if (info) {
                if (this["_attrTxt" + i])
                    this["_attrTxt" + i].text = info.desc();
                i += 1;
            }
        }
        this._fighting.setValue(attr.getFighting(), "nums_fighting_", 25);
        this._fighting.x = this._fightImg.x + this._fightImg.width - 10;
        var index = this._cvo.soldierStarNum + 1;
        if (this._cvo.soldierStarNum >= 10)
            index = 10;
        var starCvo = this._cvo.starInfoList[index];
        var less = new GainLossVO(starCvo.loss);
        this._goods.baseId = less.baseId;
        this._goods.count = 1;
        var bagCount = Manager.model.getItems().getCountItemById(less.baseId);
        var numloss;
        if (less.isEnough())
            numloss = bagCount + "/" + less.num;
        else
            numloss = HtmlUtil.addColorTag("" + bagCount, "#ff0000") + "/" + less.num;
        this._numTxt.textFlow = new egret.HtmlTextParser().parse(numloss);
    };
    SoldierView.prototype.onSoldierLoadComplete = function (e) {
        this._soldier.removeEventListener(GlobalEvent.ANIMATION_LOAD_COMPLETE, this.onSoldierLoadComplete, this);
        this._soldier.play();
    };
    SoldierView.prototype.onUpdateItemHandler = function (e) {
        this.onSelectItemHandler();
    };
    SoldierView.prototype.onClickItemHandler = function (e) {
        var index = this._scroller.itemList.selectedIndex;
        if (this._currentIndex == index)
            return;
        this._currentIndex = index;
        this.onSelectItemHandler();
    };
    SoldierView.prototype.onSelectItemHandler = function () {
        var item = this._scroller.itemList.getElementAt(this._currentIndex);
        this._cvo = item.data;
        this._model.selectId = this._cvo.id;
        this._model.dispatchEvent(new SoldierEvent(SoldierEvent.SOLDIER_ITEM_CLICK_EVENT, this._cvo.id));
        this.updateView();
    };
    //激活/升星
    SoldierView.prototype.onActiveHandler = function (e) {
        if (this._cvo.soldierStarNum > 0) {
            //升星
            if (this._cvo.soldierStarNum >= 10) {
                // Manager.tips.showTips(LangCVO.getContent("soldier1"), null, false);
                FloatTips.addTips(LangCVO.getContent("soldier1"), Color.RED);
                return;
            }
            var starCvo = this._cvo.starInfoList[this._cvo.soldierStarNum + 1];
            var loss = new GainLossVO(starCvo.loss);
            if (loss.isEnough()) {
                Manager.control.getSoldier().upgradeStar(this._cvo.id);
            }
            else {
                var cvo = ItemsCVO.getCvo(loss.baseId);
                Manager.view.show(9 /* ItemsTips */, cvo);
            }
        }
        else {
            // 激活
            if (this._cvo.actConsume) {
                var less = new GainLossVO(this._cvo.actConsume);
                if (less.isEnough()) {
                    // let actList:ConditionVO[] = ConditionVO.getVOList(this._cvo.actCond);
                    // let str:string="";
                    // for(let con of actList)
                    // {
                    //     if(!con.isSatisfy())
                    //     {
                    //         if(con.type == ConditionVO.REIN)
                    //         {
                    //             str = LangCVO.getContent("soldier2", con.value);
                    //         }
                    //         else if(con.type == ConditionVO.VIP)
                    //         {
                    //             str = LangCVO.getContent("soldier3", con.value);
                    //         }
                    //         else if(con.type == ConditionVO.LEVEL)
                    //         {
                    //             str = LangCVO.getContent("soldier4", con.value);
                    //         }
                    //         break;
                    //     }
                    // }
                    // if(str.length>0)
                    // {
                    //     // Manager.tips.showTips(str,null,false);
                    //     FloatTips.addTips(str, Color.RED);
                    // }
                    // else
                    // {
                    Manager.control.getSoldier().activate(this._cvo.id);
                    // }
                }
                else {
                    var cvo = ItemsCVO.getCvo(less.baseId);
                    Manager.view.show(9 /* ItemsTips */, cvo);
                }
            }
            else {
                var starCvo = this._cvo.starInfoList[1];
                var loss = new GainLossVO(starCvo.loss);
                if (loss.isEnough()) {
                    Manager.control.getSoldier().activate(this._cvo.id);
                }
                else {
                    var cvo = ItemsCVO.getCvo(loss.baseId);
                    Manager.view.show(9 /* ItemsTips */, cvo);
                }
            }
        }
    };
    //穿戴
    SoldierView.prototype.onPutonHandler = function (e) {
        if (this._cvo.id == this._model.currentId)
            Manager.control.getSoldier().puton(0);
        else
            Manager.control.getSoldier().puton(this._cvo.id);
    };
    SoldierView.prototype.onUpdatePutonHandler = function (e) {
        this._putonImg.visible = !this._putonImg.visible;
        this._takeoffImg.visible = !this._takeoffImg.visible;
        // if(this._cvo.id == this._model.currentId)
        // {
        //     this._putonImg.visible = false;
        //     this._takeoffImg.visible = true;
        // }
        // else
        // {
        //      this._putonImg.visible = true;
        //     this._takeoffImg.visible = false;
        // }
    };
    SoldierView.prototype.reuse = function (value) {
        if (value === void 0) { value = -1; }
        _super.prototype.reuse.call(this);
        if (value != -1)
            this._currentIndex = value - 1;
    };
    SoldierView.prototype.unuse = function () {
        Manager.render.remove(this.initSelect, this);
        _super.prototype.unuse.call(this);
    };
    SoldierView.prototype.dispose = function () {
        Manager.render.remove(this.initSelect, this);
        ObjectUtil.removes(this._scroller, this._nameImg, this._fightImg, this._attrTxt1, this._attrTxt2, this._attrTxt3, this._goods, this._numTxt, this._putonBtn, this._activeBtn, this._actImg, this._putonImg, this._takeoffImg, this._upgradeImg, this._bgImg, this._diGroup, this._leftBgImg);
        _super.prototype.dispose.call(this);
        if (this._leftBgImg)
            Manager.pool.push(this._leftBgImg);
        this._leftBgImg = null;
        if (this._bgImg)
            Manager.pool.push(this._bgImg);
        this._bgImg = null;
        this._diGroup = null;
        if (this._scroller)
            this._scroller.dispose();
        this._scroller = null;
        this._nameImg = null;
        this._fightImg = null;
        if (this._attrTxt1)
            this._attrTxt1.dispose();
        this._attrTxt1 = null;
        if (this._attrTxt2)
            this._attrTxt2.dispose();
        this._attrTxt2 = null;
        if (this._attrTxt3)
            this._attrTxt3.dispose();
        this._attrTxt3 = null;
        if (this._goods)
            this._goods.dispose();
        this._goods = null;
        if (this._numTxt)
            this._numTxt.dispose();
        this._numTxt = null;
        if (this._putonBtn)
            this._putonBtn.dispose();
        this._putonBtn = null;
        if (this._activeBtn)
            this._activeBtn.dispose();
        this._activeBtn = null;
        this._actImg = null;
        this._putonImg = null;
        this._takeoffImg = null;
        this._upgradeImg = null;
    };
    return SoldierView;
}(UIComponent));
//# sourceMappingURL=SoldierView.js.map