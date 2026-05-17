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
 * 转生条件子项
 * liangyan
 * create 2017-12-14
*/
var ReinConditionItem = /** @class */ (function (_super) {
    __extends(ReinConditionItem, _super);
    function ReinConditionItem() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this.touchChildren = false;
        _this.skinName = Manager.path.getSkinName("rein", "ReinConditionItemSkin");
        return _this;
    }
    ReinConditionItem.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
    };
    ReinConditionItem.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
    };
    ReinConditionItem.prototype.removeEvent = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    ReinConditionItem.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawLayout();
        this.drawData();
    };
    ReinConditionItem.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.LAYOUT))
            this.drawLayout();
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    ReinConditionItem.prototype.drawLayout = function () {
        if (!this._strip2) {
            this._group = ObjectUtil.createConainer(false, false);
            this._group.x = 20;
            this._group.y = 45;
            // this._strip = Manager.pool.create(StripView, null, "strip_back_png", "strip_yellow_png", 284, 21, 280, 17, 2, 2, true);
            this._strip2 = StripView2.create(this._group, this._group, "strip_back_png", "strip_yellow_png", 284, 21, 280, 17, 2, 2, true, false, 22);
            // this._strip.x = 20;
            // this._strip.y = 45;
            this.addChildAt(this._group, this.getChildIndex(this._icon) - 1);
        }
    };
    ReinConditionItem.prototype.drawData = function () {
        if (!this._vo)
            return;
        var str;
        var linkStr;
        if (this._vo instanceof ConditionVO) {
            var visible = this._vo.isSatisfy();
            this._icon.visible = visible;
            this._goTxt.visible = !visible;
            var self_1 = Manager.model.self;
            switch (this._vo.type) {
                case ConditionVO.LEVEL:
                    str = LangCVO.getContent("rein1", this._vo.value); //角色达到{0}级
                    linkStr = HtmlUtil.addUTag(HtmlUtil.addColorTag(LangCVO.getContent("rein5"), Color.GREEN_STR)); //挂机
                    this._strip2.update(self_1.attrInfo.level, this._vo.value);
                    break;
                case ConditionVO.COPY_PASS:
                    str = LangCVO.getContent("rein2", this._vo.value2); //副本达到{0}层
                    linkStr = HtmlUtil.addUTag(HtmlUtil.addColorTag(LangCVO.getContent("rein6"), Color.GREEN_STR)); //前往
                    var copyCvo = CopyCVO.getCVO(this._vo.value);
                    this._strip2.update(copyCvo.cell, this._vo.value2);
                    break;
                case ConditionVO.REIN_BOSS:
                    str = LangCVO.getContent("rein3", this._vo.value); //挑战boss{0}次
                    linkStr = HtmlUtil.addUTag(HtmlUtil.addColorTag(LangCVO.getContent("rein6"), Color.GREEN_STR)); //前往
                    if (visible)
                        this._strip2.update(this._vo.value, this._vo.value);
                    else
                        this._strip2.update(Manager.model.getRein().bossCount, this._vo.value);
                    break;
            }
        }
        else if (this._vo instanceof GainLossVO) {
            var visible = this._vo.isEnough();
            this._icon.visible = visible;
            this._goTxt.visible = !visible;
            var goods = ItemsCVO.getCvo(this._vo.baseId);
            str = StringUtils.setParam(LangCVO.getContent("rein4"), HtmlUtil.addColorTag(goods.name, Color.getColorStrByQuality(goods.quality)), this._vo.num); //收集{0}{1}个
            linkStr = HtmlUtil.addUTag(HtmlUtil.addColorTag(LangCVO.getContent("rein7"), Color.GREEN_STR)); //获取
            var bagCount = Manager.model.getItems().getCountItemById(this._vo.baseId);
            this._strip2.update(bagCount, this._vo.num);
        }
        HtmlUtil.setTextFlow(this._descTxt, str);
        HtmlUtil.setTextFlow(this._goTxt, linkStr);
    };
    ReinConditionItem.prototype.onTouchHandler = function (e) {
        if (this.isFinish)
            return;
        if (Manager.model.getTask().isAutoTask) {
            FloatTips.addTips(LangCVO.getContent("rein11"), Color.RED);
            return;
        }
        var mapInfo = MapCVO.getCVO(Manager.model.getMap().getId());
        if (mapInfo) {
            if (mapInfo.type == 2 || mapInfo.type == 3) {
                FloatTips.addTips(LangCVO.getContent("rein9"), Color.RED);
                return;
            }
        }
        if (this._vo instanceof ConditionVO) {
            switch (this._vo.type) {
                case ConditionVO.LEVEL:
                    if (Manager.model.getMap().getId() == Manager.model.getTask().curVerseMapID)
                        FloatTips.addTips(LangCVO.getContent("rein10"), Color.RED);
                    else
                        Manager.control.getMap().cmdEnterMap(Manager.model.getTask().curVerseMapID);
                    break;
                case ConditionVO.COPY_PASS:
                    Manager.view.show(80 /* SysNoticePanel */, 1);
                    break;
                case ConditionVO.REIN_BOSS:
                    Manager.view.show(30 /* BossPanel */);
                    break;
            }
        }
        else if (this._vo instanceof GainLossVO) {
            var cvo = ItemsCVO.getCvo(this._vo.baseId);
            Manager.view.show(9 /* ItemsTips */, cvo);
        }
    };
    Object.defineProperty(ReinConditionItem.prototype, "vo", {
        set: function (value) {
            // if(this._vo == value) return;
            this._vo = value;
            this.invalidate(InvalidationType.DATA);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReinConditionItem.prototype, "isFinish", {
        get: function () {
            if (!this._vo)
                return false;
            if (this._vo instanceof ConditionVO)
                return this._vo.isSatisfy();
            else if (this._vo instanceof GainLossVO)
                return this._vo.isEnough();
            return false;
        },
        enumerable: true,
        configurable: true
    });
    ReinConditionItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._descTxt, this._goTxt, this._icon);
        this._descTxt.dispose();
        this._descTxt = null;
        this._goTxt.dispose();
        this._goTxt = null;
        this._icon.bitmapData = null;
        this._icon = null;
        // Manager.pool.push(this._strip);
        this._strip2.dispose();
        this._strip2 = null;
        if (this._group) {
            this._group.parent.removeChild(this._group);
            this._group = null;
        }
        this._vo = null;
    };
    return ReinConditionItem;
}(UIComponent));
//# sourceMappingURL=ReinConditionItem.js.map