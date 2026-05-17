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
 * Simon
 * create 2018-4-13
*/
var TitleView2 = /** @class */ (function (_super) {
    __extends(TitleView2, _super);
    function TitleView2(showItemID) {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this._showCVO = TitleCVO.getCVO(showItemID);
        _this.start();
        _this.addEvent();
        return _this;
    }
    TitleView2.prototype.start = function () {
        _super.prototype.start.call(this);
        this._bgImg = BitmapRes.create("common_pnl_back1_png", 248, 292, 467, 817);
        this._bgImg.scale9Grid = new egret.Rectangle(29, 26, 24, 19);
        this.addChild(this._bgImg);
        if (!this._leftBgImg) {
            this._leftBgImg = Manager.pool.create(BitmapRemote);
            this._leftBgImg.x = 5;
            this._leftBgImg.y = 290;
            this.addChild(this._leftBgImg);
            this._leftBgImg.load(PathInfo.getPath("res/common/common_pnl_back2.png", LoaderType.IMAGE), 238, 817);
        }
        if (!this._rightBgImg) {
            this._rightBgImg = Manager.pool.create(BitmapRemote);
            this._rightBgImg.x = 243;
            this._rightBgImg.y = 292;
            this.addChild(this._rightBgImg);
            this._rightBgImg.load(PathInfo.getPath("res/common/dress_player_back.png", LoaderType.IMAGE), 457, 685);
        }
        this._fightBg = BitmapRes.create("common_fighting_png", 305, 906, 441, 65);
        this.addChild(this._fightBg);
        this._fightImg = BitmapRes.create("common_zhanli_png", 347, 914, 102, 57);
        this.addChild(this._fightImg);
        this._skillBack = BitmapRes.create("skill_back1_png", 565, 350, 140, 89);
        this._skillBack.scale9Grid = new egret.Rectangle(17, 4, 108, 26);
        this.addChild(this._skillBack);
        this._titleImg = Manager.pool.create(BitmapRemote);
        this._titleImg.x = 385;
        this._titleImg.y = 310;
        this.addChild(this._titleImg);
        this._actBtn = new Button();
        this._actBtn.skinName = "Button2Skin";
        this._actBtn.move(391, 1000);
        this._actBtn.setSize(197, 90);
        this.addChild(this._actBtn);
        this._actImg = BitmapRes.create("active_label_png", 399, 1019, 181, 52);
        this.addChild(this._actImg);
        this._wearImg = BitmapRes.create("common_label_png", 399, 1019, 181, 52);
        this._takeoffImg = BitmapRes.create("common_takeoff_label_png", 399, 1019, 181, 52);
        this._redIcon = BitmapRes.create("common_red_icon_png", 553, 998, 35, 35);
        this._attrTxt = TextField.create(140, 75);
        this._attrTxt.move(560, 358);
        this._attrTxt.textColor = 0x7e6c62;
        this._attrTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._attrTxt.textAlign = egret.HorizontalAlign.RIGHT;
        this._attrTxt.fontFamily = "Microsoft YaHei";
        this._attrTxt.size = 22;
        this.addChild(this._attrTxt);
        this._lossTxt = TextField.create(474, 29);
        this._lossTxt.move(248, 971);
        this._lossTxt.textColor = 0x7e6c62;
        this._lossTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._lossTxt.textAlign = egret.HorizontalAlign.CENTER;
        this._lossTxt.fontFamily = "Microsoft YaHei";
        this._lossTxt.size = 22;
        this.addChild(this._lossTxt);
        this._fighting = Manager.pool.create(NumImgView2);
        this._fighting.x = this._fightImg.x + 100;
        this._fighting.y = this._fightImg.y + 8;
        this.addChild(this._fighting);
    };
    TitleView2.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawLayout();
        this.drawData();
    };
    TitleView2.prototype.draw = function () {
        _super.prototype.draw.call(this);
        // if(this.isInvalid(InvalidationType.LAYOUT)) this.drawLayout();
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    TitleView2.prototype.drawLayout = function () {
        this.showAni();
        var arr = TitleCVO.TITLE_TYPE_ARR;
        var dataArr = [];
        var cvos;
        for (var i = 0; i < arr.length; i++) {
            cvos = TitleCVO.getCvosByType(arr[i]);
            dataArr.push({ btn: TitleListBtn2, item: TitleListItem2, datas: cvos, label: arr[i] });
        }
        this._titleList = Manager.pool.create(BaseAccordionList, dataArr, 817, 60);
        this._titleList.x = 5;
        this._titleList.y = 290;
        this._titleList.width = 238;
        this._titleList.height = 817;
        this.addChild(this._titleList);
        this._titleImg.reuse(null);
    };
    TitleView2.prototype.showAni = function () {
        var attrInfo = Manager.model.self.attrInfo;
        if (!this._roleModel) {
            this._roleModel = Manager.pool.create(RoleAnimation, attrInfo.clothes, attrInfo.weapon, attrInfo.wing);
            var index = this.getChildIndex(this._fightImg);
            this.addChildAt(this._roleModel, index - 1);
        }
        this._roleModel.x = -150;
        this._roleModel.y = 70;
    };
    TitleView2.prototype.drawData = function () {
        if (!this._cvo)
            return;
        if (Manager.render.contains(this.countdown, this))
            Manager.render.remove(this.countdown, this);
        if (this._cvo.isActived) {
            if (this._cvo.isTimeLimited)
                Manager.render.add(this.countdown, this, 1000);
            else
                this._lossTxt.text = "剩余时间：永久";
            if (this._cvo.isUsing)
                this.setBtnLabel(3);
            else
                this.setBtnLabel(2);
        }
        else {
            var bagCount = Manager.model.getItems().getCountItemById(this._cvo.loss.baseId);
            if (bagCount >= this._cvo.loss.num)
                HtmlUtil.setTextFlow(this._lossTxt, "激活：" + this._cvo.name + " (<font color='" + Color.DEF_STR + "'>" + bagCount + "</font>/" + this._cvo.loss.num + ")");
            else
                HtmlUtil.setTextFlow(this._lossTxt, "激活：" + this._cvo.name + " (<font color='" + Color.RED_STR + "'>" + bagCount + "</font>/" + this._cvo.loss.num + ")");
            this.setBtnLabel(1);
        }
        var str = "";
        var info;
        var infos = this._cvo.baseAttr.attrInfos;
        for (var i = 0; i < infos.length; i++) {
            info = infos[i];
            if (i != infos.length - 1)
                str += info.desc() + "\n";
            else
                str += info.name + "+" + info.num;
        }
        HtmlUtil.setTextFlow(this._attrTxt, str);
        this._fighting.setValue(this._cvo.baseAttr.getFighting(), "nums_fighting_", 25);
        this.setBtnSkin(!this._cvo.isActived);
    };
    TitleView2.prototype.countdown = function () {
        if (!this._cvo)
            return;
        var now = Math.round(Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
        var second = this._cvo.time - now;
        if (second <= 0) {
            Manager.render.remove(this.countdown, this);
            return;
        }
        this._lossTxt.text = "剩余时间：" + cw.DateUtil.formatStr(second, cw.DateUtil.LEFT_DD_HH_MM, true);
    };
    TitleView2.prototype.setBtnLabel = function (type) {
        if (this._redIcon.parent)
            this._redIcon.parent.removeChild(this._redIcon);
        switch (type) {
            case 1:
                if (this._wearImg.parent)
                    this._wearImg.parent.removeChild(this._wearImg);
                if (this._takeoffImg.parent)
                    this._takeoffImg.parent.removeChild(this._takeoffImg);
                this.addChild(this._actImg);
                if (this._cvo && this._cvo.loss.isEnough())
                    this.addChild(this._redIcon);
                break;
            case 2:
                if (this._actImg.parent)
                    this._actImg.parent.removeChild(this._actImg);
                if (this._takeoffImg.parent)
                    this._takeoffImg.parent.removeChild(this._takeoffImg);
                this.addChild(this._wearImg);
                break;
            case 3:
                if (this._actImg.parent)
                    this._actImg.parent.removeChild(this._actImg);
                if (this._wearImg.parent)
                    this._wearImg.parent.removeChild(this._wearImg);
                this.addChild(this._takeoffImg);
                break;
        }
    };
    TitleView2.prototype.setBtnSkin = function (isAct) {
        var upImg = this._actBtn.getChildAt(0);
        if (upImg)
            upImg.source = isAct ? "common_btn1_1_png" : "common_btn2_1_png";
        var downImg = this._actBtn.skin.states[1].overrides[0];
        if (downImg)
            downImg.value = isAct ? "common_btn1_2_png" : "common_btn2_2_png";
    };
    TitleView2.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._actBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        Manager.model.getDress().titleModel.addEventListener(TitleEvent.TITLE_SELECTED, this.onSelectedHandler, this);
        Manager.model.getDress().titleModel.addEventListener(TitleEvent.TITLE_ACT_SUCC, this.onTitleHandler, this);
        Manager.model.getDress().titleModel.addEventListener(TitleEvent.TITLE_WEAR, this.onTitleHandler, this);
        Manager.model.getDress().titleModel.addEventListener(TitleEvent.TITLE_TAKE_OFF, this.onTitleHandler, this);
        Manager.model.getDress().titleModel.addEventListener(TitleEvent.TITLE_GAIN, this.onTitleHandler, this);
        Manager.model.getDress().titleModel.addEventListener(TitleEvent.TITLE_DELETE, this.onTitleHandler, this);
        Manager.model.addEventListener(BaseUIEvent.ACCORDION_COMPOSING_COMPLETE, this.onAccordionHandler, this);
    };
    TitleView2.prototype.removeEvent = function () {
        this._actBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        Manager.model.getDress().titleModel.removeEventListener(TitleEvent.TITLE_SELECTED, this.onSelectedHandler, this);
        Manager.model.getDress().titleModel.removeEventListener(TitleEvent.TITLE_ACT_SUCC, this.onTitleHandler, this);
        Manager.model.getDress().titleModel.removeEventListener(TitleEvent.TITLE_WEAR, this.onTitleHandler, this);
        Manager.model.getDress().titleModel.removeEventListener(TitleEvent.TITLE_TAKE_OFF, this.onTitleHandler, this);
        Manager.model.getDress().titleModel.removeEventListener(TitleEvent.TITLE_GAIN, this.onTitleHandler, this);
        Manager.model.getDress().titleModel.removeEventListener(TitleEvent.TITLE_DELETE, this.onTitleHandler, this);
        Manager.model.removeEventListener(BaseUIEvent.ACCORDION_COMPOSING_COMPLETE, this.onAccordionHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    TitleView2.prototype.onTouchHandler = function (e) {
        switch (e.currentTarget) {
            case this._actBtn:
                if (!this._cvo)
                    return;
                if (!this._cvo.isActived) {
                    var bagCount = Manager.model.getItems().getCountItemById(this._cvo.loss.baseId);
                    if (bagCount < this._cvo.loss.num) {
                        var cvo = ItemsCVO.getCvo(this._cvo.loss.baseId);
                        Manager.view.show(9 /* ItemsTips */, cvo);
                    }
                    else {
                        var goods = ItemsCVO.getCvo(this._cvo.loss.baseId);
                        Manager.control.getDress().actTitle(goods.type, goods.id);
                    }
                }
                else {
                    if (this._cvo.isUsing)
                        Manager.control.getDress().takeoffTitle(this._cvo.templateID);
                    else
                        Manager.control.getDress().wearTitle(this._cvo.templateID);
                }
                break;
        }
    };
    TitleView2.prototype.onSelectedHandler = function (e) {
        this._cvo = TitleCVO.getCVO(e.params);
        if (!this._cvo)
            return;
        this._titleImg.load(Manager.path.getTitlePath(this._cvo.resID));
        this.invalidate(InvalidationType.DATA);
    };
    TitleView2.prototype.onTitleHandler = function (e) {
        if (e.type == TitleEvent.TITLE_LIST || e.params == this._cvo.templateID)
            this.invalidate(InvalidationType.DATA);
    };
    TitleView2.prototype.onAccordionHandler = function (e) {
        if (!this._showCVO) {
            var cvos = TitleCVO.getAll();
            var target = void 0;
            for (var i = 0; i < cvos.length; i++) {
                if (cvos[i].loss.isEnough() || cvos[i].isUsing) {
                    target = cvos[i];
                    break;
                }
            }
            if (!target)
                target = cvos[0];
            Manager.model.getDress().titleModel.defaultData = target;
        }
        else {
            Manager.model.getDress().titleModel.defaultData = this._showCVO;
            this._cvo = this._showCVO;
            this._titleImg.load(Manager.path.getTitlePath(this._cvo.resID));
            this.invalidate(InvalidationType.DATA);
        }
        this._titleList.setdefault(Manager.model.getDress().titleModel.defaultData);
    };
    TitleView2.prototype.disposeSelf = function () {
        _super.prototype.disposeSelf.call(this);
        ObjectUtil.removes(this._bgImg, this._leftBgImg, this._rightBgImg, this._fightBg, this._fightImg, this._skillBack, this._titleImg, this._actBtn, this._actImg, this._wearImg, this._takeoffImg, this._redIcon, this._attrTxt, this._lossTxt, this._fighting, this._roleModel, this._titleList);
        if (this._bgImg)
            Manager.pool.push(this._bgImg);
        this._bgImg = null;
        if (this._leftBgImg)
            Manager.pool.push(this._leftBgImg);
        this._leftBgImg = null;
        if (this._rightBgImg)
            Manager.pool.push(this._rightBgImg);
        this._rightBgImg = null;
        if (this._fightBg)
            Manager.pool.push(this._fightBg);
        this._fightBg = null;
        if (this._fightImg)
            Manager.pool.push(this._fightImg);
        this._fightImg = null;
        if (this._skillBack)
            Manager.pool.push(this._skillBack);
        this._skillBack = null;
        if (this._titleImg)
            Manager.pool.push(this._titleImg);
        this._titleImg = null;
        if (this._actBtn)
            this._actBtn.dispose();
        this._actBtn = null;
        if (this._actImg)
            Manager.pool.push(this._actImg);
        this._actImg = null;
        if (this._wearImg)
            Manager.pool.push(this._wearImg);
        this._wearImg = null;
        if (this._takeoffImg)
            Manager.pool.push(this._takeoffImg);
        this._takeoffImg = null;
        if (this._redIcon)
            Manager.pool.push(this._redIcon);
        this._redIcon = null;
        if (this._attrTxt)
            Manager.pool.push(this._attrTxt);
        this._attrTxt = null;
        if (this._lossTxt)
            Manager.pool.push(this._lossTxt);
        this._lossTxt = null;
        if (this._fighting)
            Manager.pool.push(this._fighting);
        this._fighting = null;
        if (this._roleModel)
            Manager.pool.push(this._roleModel);
        this._roleModel = null;
        if (this._titleList)
            this._titleList.dispose();
        this._titleList = null;
        this._showCVO = null;
        this._cvo = null;
    };
    return TitleView2;
}(RenderSprite));
//# sourceMappingURL=TitleView2.js.map