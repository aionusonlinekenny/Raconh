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
 * 称号界面
 * liangyan
 * create 2017-11-28
*/
var FashionView2 = /** @class */ (function (_super) {
    __extends(FashionView2, _super);
    function FashionView2(showItemID) {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this._showCVO = FashionCVO.getCVO(showItemID);
        _this.start();
        _this.addEvent();
        return _this;
    }
    FashionView2.prototype.start = function () {
        _super.prototype.start.call(this);
        this._model = Manager.model.getDress().fashionModel;
        this._bgImg = BitmapRes.create("common_pnl_back1_png", 248, 292, 467, 818);
        this._bgImg.scale9Grid = new egret.Rectangle(28, 28, 27, 16);
        this.addChild(this._bgImg);
        this._leftBgImg = Manager.pool.create(BitmapRemote);
        this._leftBgImg.x = 5;
        this._leftBgImg.y = 292;
        this.addChild(this._leftBgImg);
        this._leftBgImg.load(PathInfo.getPath("res/common/common_pnl_back2.png", LoaderType.IMAGE), 238, 817);
        this._rightBgImg = Manager.pool.create(BitmapRemote);
        this._rightBgImg.x = 248;
        this._rightBgImg.y = 292;
        this.addChild(this._rightBgImg);
        this._rightBgImg.load(PathInfo.getPath("res/common/dress_player_back.png", LoaderType.IMAGE), 467, 685);
        this._nameBackImg = BitmapRes.create("common_name_back_png", 256, 312, 80, 394);
        this.addChild(this._nameBackImg);
        this._fightBg = BitmapRes.create("common_fighting_png", 305, 906, 441, 65);
        this.addChild(this._fightBg);
        this._fightImg = BitmapRes.create("common_zhanli_png", 347, 914, 102, 57);
        this.addChild(this._fightImg);
        this._skillBack = BitmapRes.create("skill_back1_png", 565, 350, 140, 89);
        this._skillBack.scale9Grid = new egret.Rectangle(17, 4, 108, 26);
        this.addChild(this._skillBack);
        this._btn0 = new Button();
        this._btn0.skinName = "Button1Skin";
        this._btn0.move(273, 1000);
        this._btn0.setSize(197, 90);
        this.addChild(this._btn0);
        this._btn1 = new Button();
        this._btn1.skinName = "Button2Skin";
        this._btn1.move(495, 1000);
        this._btn1.setSize(197, 90);
        this.addChild(this._btn1);
        this._btnLabel0 = BitmapRes.create("common_label_png", 281, 1019, 181, 52);
        this.addChild(this._btnLabel0);
        this._btnLabel1 = BitmapRes.create("common_active_png", 503, 1019, 181, 52);
        this.addChild(this._btnLabel1);
        this._name = Manager.pool.create(BitmapRemote);
        this._name.x = 278;
        this._name.y = 352;
        this.addChild(this._name);
        this._txtAttr = TextField.create(140, 75);
        this._txtAttr.move(560, 356);
        this._txtAttr.textColor = 0x7e6c62;
        this._txtAttr.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._txtAttr.textAlign = egret.HorizontalAlign.RIGHT;
        this._txtAttr.fontFamily = "Microsoft YaHei";
        this._txtAttr.size = 22;
        this._txtAttr.lineSpacing = 6;
        this.addChild(this._txtAttr);
        this._txtTime = TextField.create(202, 29);
        this._txtTime.move(272, 971);
        this._txtTime.textColor = 0x7e6c62;
        this._txtTime.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._txtTime.textAlign = egret.HorizontalAlign.CENTER;
        this._txtTime.fontFamily = "Microsoft YaHei";
        this._txtTime.size = 22;
        this._txtTime.text = "剩余：";
        this.addChild(this._txtTime);
        this._txtCost = TextField.create(212, 29);
        this._txtCost.move(479, 971);
        this._txtCost.textColor = 0x7e6c62;
        this._txtCost.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._txtCost.textAlign = egret.HorizontalAlign.CENTER;
        this._txtCost.fontFamily = "Microsoft YaHei";
        this._txtCost.size = 22;
        this._txtCost.text = "消耗：";
        this.addChild(this._txtCost);
        this._starView = Manager.pool.create(FashionStarView, 11, 178);
        this._starView.backAlpha = 0;
        this._starView.move(394, 309);
        this.addChild(this._starView);
        this._fighting = Manager.pool.create(NumImgView2);
        this._fighting.x = this._fightImg.x + 110;
        this._fighting.y = this._fightImg.y + 5;
        this.addChild(this._fighting);
        var arr = FashionCVO.TYPE_ARR;
        var cvos;
        var dataArr = [];
        for (var i = 0; i < arr.length; i++) {
            cvos = FashionCVO.getCvosByTypeAndCareer(arr[i], Manager.model.self.attrInfo.career);
            dataArr.push({ btn: FashionListBtn2, item: FashionListItem2, datas: cvos, label: cvos });
        }
        this._list = Manager.pool.create(BaseAccordionList, dataArr, 817, 60);
        this._list.x = 5;
        this._list.y = 290;
        this._list.width = 238;
        this._list.height = 817;
        this.addChildAt(this._list, this.getChildIndex(this._leftBgImg) + 1);
    };
    FashionView2.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
    };
    FashionView2.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
        if (this.isInvalid("drawWearing"))
            this.drawWearing();
        if (this.isInvalid("drawUpdate"))
            this.drawUpdate();
    };
    FashionView2.prototype.drawData = function () {
        if (this._cvo == null)
            return;
        // this._name.load(PathManager.get);
        this.showAni();
        this.drawUpdate();
        this.drawWearing();
    };
    FashionView2.prototype.showAni = function () {
        this.clearAni();
        var attrInfo = Manager.model.self.attrInfo;
        this._roleModel = Manager.pool.create(RoleAnimation, this._cvo.resID, attrInfo.weapon);
        this._roleModel.move(-150, 50);
        var index = this.getChildIndex(this._fightImg);
        this.addChildAt(this._roleModel, index - 1);
    };
    FashionView2.prototype.clearAni = function () {
        if (this._roleModel) {
            Manager.pool.push(this._roleModel);
            this._roleModel = null;
        }
    };
    FashionView2.prototype.drawWearing = function () {
        if (this._cvo == null)
            return;
        this._btnLabel0.source = this._cvo.isWearing ? "common_takeoff_label_png" : "common_label_png";
    };
    FashionView2.prototype.drawUpdate = function () {
        if (this._cvo == null)
            return;
        var curStarCVO = this._cvo.star > 0 ? FashionStarCVO.getCVO(this._cvo.id, this._cvo.star) : null;
        this._nextStarCVO = this._cvo.star < FashionStarCVO.MAX_STAR ? FashionStarCVO.getCVO(this._cvo.id, this._cvo.star + 1) : null;
        Manager.render.remove(this.countdown, this);
        this._name.load(Manager.path.getFashionPath("name/" + this._cvo.nameID + ".png"));
        this._starView.level = this._cvo.star;
        //属性
        var attrVo = curStarCVO ? curStarCVO.attrVo : this._nextStarCVO.attrVo;
        var infos = attrVo.attrInfos;
        var str = "";
        for (var i = 0, len = infos.length; i < len; i++) {
            str += infos[i].desc();
            if (i < len)
                str += "\n";
        }
        HtmlUtil.setTextFlow(this._txtAttr, str);
        this._fighting.setValue(attrVo.getFighting(), "nums_fighting_", 25); //战力
        this.drawItemUpdate();
        if (!this._cvo.isActived) {
            this._btnLabel1.source = "common_active_png";
            this._txtTime.text = "";
        }
        else if (this._cvo.isForever) {
            this._btnLabel1.source = "common_upgrade_label_png";
            this._txtTime.text = "有效期：永久";
        }
        else if (this._cvo.leftTime <= 0) {
            this._btnLabel1.source = "commony_label_xs_png";
            this._txtTime.text = "有效期：已过期";
        }
        else {
            this._btnLabel1.source = "commony_label_xs_png";
            Manager.render.add(this.countdown, this, 1000);
            this.countdown();
        }
    };
    FashionView2.prototype.countdown = function () {
        if (this._cvo == null)
            return;
        var left = this._cvo.leftTime;
        if (left > 0) {
            this._txtTime.text = "有效期：" + cw.DateUtil.formatStr(this._cvo.endTime, cw.DateUtil.MM_DD_HH_MM);
        }
        else
            Manager.render.remove(this.countdown, this);
    };
    FashionView2.prototype.drawItemUpdate = function () {
        if (this._nextStarCVO) {
            var isEnough = this._nextStarCVO.loss.isEnough();
            // this._redIcon.visible = isEnough;
            var str = "" + this._nextStarCVO.loss.selfCount;
            str = HtmlUtil.addColorTag(str, isEnough ? Color.DEF_STR : Color.RED_STR);
            str = "消耗：" + this._nextStarCVO.loss.name + "(" + str + "/" + this._nextStarCVO.loss.num + ")";
            HtmlUtil.setTextFlow(this._txtCost, str);
        }
        else {
            this._txtCost.text = "";
            // this._redIcon.visible = false;
        }
    };
    FashionView2.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._btn0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._model.addEventListener(FashionEvent.UPDATE, this.onUpdate, this);
        this._model.addEventListener(FashionEvent.WEARING, this.onWearing, this);
        this._model.addEventListener(FashionEvent.SELECTED, this.onSelected, this);
        Manager.model.addEventListener(BaseUIEvent.ACCORDION_COMPOSING_COMPLETE, this.onAccordionHandler, this);
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onItemUpdate, this);
    };
    FashionView2.prototype.removeEvent = function () {
        this._btn0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._btn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._model.removeEventListener(FashionEvent.UPDATE, this.onUpdate, this);
        this._model.removeEventListener(FashionEvent.WEARING, this.onWearing, this);
        this._model.removeEventListener(FashionEvent.SELECTED, this.onSelected, this);
        Manager.model.removeEventListener(BaseUIEvent.ACCORDION_COMPOSING_COMPLETE, this.onAccordionHandler, this);
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onItemUpdate, this);
        _super.prototype.removeEvent.call(this);
    };
    FashionView2.prototype.onTouchHandler = function (e) {
        switch (e.currentTarget) {
            case this._btn0:
                this.wearing();
                break;
            case this._btn1:
                this.activeOrUp();
                break;
        }
    };
    FashionView2.prototype.wearing = function () {
        if (!this._cvo.isActived) {
            FloatTips.addTips("该服饰还没激活");
            return;
        }
        Manager.control.getDress().fashionWear(this._cvo.id);
    };
    FashionView2.prototype.activeOrUp = function () {
        if (this._nextStarCVO && !this._nextStarCVO.loss.isEnough()) {
            // FloatTips.addTips(this._nextStarCVO.loss.name + "不足");
            Manager.view.show(9 /* ItemsTips */, this._nextStarCVO.loss.item);
            return;
        }
        if (this._cvo.isActived) {
            if (this._cvo.star >= FashionStarCVO.MAX_STAR) {
                FloatTips.addTips("已升到最高星级");
                return;
            }
            Manager.control.getDress().fashionUp(this._cvo.id);
        }
        else
            Manager.control.getDress().fashionActive(this._cvo.id);
    };
    FashionView2.prototype.onUpdate = function (e) {
        if (this._cvo == null)
            return;
        if (this._cvo.id == e.params.id)
            this.invalidate("drawUpdate");
    };
    FashionView2.prototype.onWearing = function (e) {
        this.invalidate("drawWearing");
    };
    FashionView2.prototype.onSelected = function (e) {
        this.cvo = e.params;
    };
    Object.defineProperty(FashionView2.prototype, "cvo", {
        set: function (value) {
            if (this._cvo == value)
                return;
            this._cvo = value;
            this.invalidate(InvalidationType.DATA);
        },
        enumerable: true,
        configurable: true
    });
    FashionView2.prototype.onAccordionHandler = function (e) {
        if (!this._showCVO) {
            var cvos = FashionCVO.getCvosByCareer(Manager.model.self.attrInfo.career);
            var target = void 0;
            for (var i = 0; i < cvos.length; i++) {
                if (cvos[i].canActiveOrUp || cvos[i].isWearing) {
                    target = cvos[i];
                    break;
                }
            }
            if (!target)
                target = cvos[0];
            Manager.model.getDress().fashionModel.defaultData = target;
            this._cvo = target;
        }
        else {
            Manager.model.getDress().fashionModel.defaultData = this._showCVO;
            this._cvo = this._showCVO;
        }
        // this.invalidate(InvalidationType.DATA);
        this.drawData();
        this._list.setdefault(Manager.model.getDress().fashionModel.defaultData);
    };
    FashionView2.prototype.onItemUpdate = function (e) {
        if (e.params == ItemsType.BAG)
            this.invalidate("drawItemUpdate");
    };
    FashionView2.prototype.disposeSelf = function () {
        _super.prototype.disposeSelf.call(this);
        ObjectUtil.removes(this._bgImg, this._leftBgImg, this._rightBgImg, this._nameBackImg, this._fightBg, this._fightImg, this._skillBack, this._btn0, this._btn1, this._btnLabel0, this._btnLabel1, this._txtAttr, this._txtTime, this._txtCost, this._starView, this._fighting, this._list);
        if (this._bgImg)
            Manager.pool.push(this._bgImg);
        this._bgImg = null;
        if (this._leftBgImg)
            Manager.pool.push(this._leftBgImg);
        this._leftBgImg = null;
        if (this._rightBgImg)
            Manager.pool.push(this._rightBgImg);
        this._rightBgImg = null;
        if (this._nameBackImg)
            Manager.pool.push(this._nameBackImg);
        this._nameBackImg = null;
        if (this._fightBg)
            Manager.pool.push(this._fightBg);
        this._fightBg = null;
        if (this._fightImg)
            Manager.pool.push(this._fightImg);
        this._fightImg = null;
        if (this._skillBack)
            Manager.pool.push(this._skillBack);
        this._skillBack = null;
        if (this._btn0)
            this._btn0.dispose();
        this._btn0 = null;
        if (this._btn1)
            this._btn1.dispose();
        this._btn1 = null;
        if (this._btnLabel0)
            Manager.pool.push(this._btnLabel0);
        this._btnLabel0 = null;
        if (this._btnLabel1)
            Manager.pool.push(this._btnLabel1);
        this._btnLabel1 = null;
        if (this._name)
            Manager.pool.push(this._name);
        this._name = null;
        if (this._txtAttr)
            Manager.pool.push(this._txtAttr);
        this._txtAttr = null;
        if (this._txtTime)
            Manager.pool.push(this._txtTime);
        this._txtTime = null;
        if (this._txtCost)
            Manager.pool.push(this._txtCost);
        this._txtCost = null;
        if (this._starView)
            Manager.pool.push(this._starView);
        this._starView = null;
        if (this._fighting)
            Manager.pool.push(this._fighting);
        this._fighting = null;
        if (this._list)
            this._list.dispose();
        this._list = null;
        this._model = null;
        this._showCVO = null;
        this._cvo = null;
        this._nextStarCVO = null;
        if (this._roleModel)
            Manager.pool.push(this._roleModel);
        this._roleModel = null;
    };
    return FashionView2;
}(RenderSprite));
//# sourceMappingURL=FashionView2.js.map