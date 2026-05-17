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
 * 魔神降临主界面
 * liangyan
 * create 2018-04-10
*/
var DevilView = /** @class */ (function (_super) {
    __extends(DevilView, _super);
    function DevilView() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("devil", "DevilViewSkin");
        return _this;
    }
    DevilView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        Manager.control.getDevil().askInfo();
        if (this._head == null) {
            this._head = Manager.pool.create(BitmapRemote);
            this._head.x = 573;
            this._head.y = 135;
            this.addChild(this._head);
        }
        var rewards = DailyActivityCVO.getCVO(ActIconID.DEVIL).rewards;
        var len = rewards != null ? rewards.length : 0;
        this.cleanItemInfoList();
        this._itemInfoList = [];
        for (var i = 0; i < len; i++) {
            var info = Manager.pool.create(ItemsModelInfo);
            info.id = i + 1;
            info.base_id = rewards[i].item.base_id;
            this._itemInfoList.push(info);
        }
        this._itemObject = Manager.pool.create(ItemObject, this._itemInfoList, len, -10);
        this._itemObject.touchChildren = true;
        this._itemObject.x = 148;
        this._itemObject.y = 847;
        this.addChild(this._itemObject);
    };
    DevilView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._ruleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._goBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        Manager.model.getDevil().addEventListener(DevilEvent.DEVIL_LAST_KING_UPDATE, this.onUpdateHandler, this);
    };
    DevilView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._ruleBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._goBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        Manager.model.getDevil().removeEventListener(DevilEvent.DEVIL_LAST_KING_UPDATE, this.onUpdateHandler, this);
    };
    DevilView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    DevilView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    DevilView.prototype.drawData = function () {
        var info = Manager.model.getDevil().lastKingInfo;
        if (info == null)
            return;
        HtmlUtil.setTextFlow(this._timeTxt, LangCVO.getContent("devil1"));
        this._nameTxt.text = info.name;
        this._head.load(Manager.path.getRoleHeadPath(2, info.career, 0));
    };
    DevilView.prototype.onTouchHandler = function (e) {
        if (e.currentTarget == this._ruleBtn)
            Manager.view.show(148 /* DevilRuleView */);
        else if (e.currentTarget == this._goBtn) {
            var actCvo = Manager.model.getActIcon().getIDByType(ActIconID.DEVIL);
            if (actCvo) {
                if (!actCvo.isAllCondSatisfy(true))
                    return;
                else if (!actCvo.isInTime) {
                    FloatTips.addTips(LangCVO.getContent("activity10"), Color.RED); //活动未开启
                    return;
                }
                else if (Manager.model.self.canJoinActive(true)) {
                    Manager.control.getDevil().enterDevil();
                    Manager.view.hide(30 /* BossPanel */);
                }
            }
        }
    };
    DevilView.prototype.onUpdateHandler = function (e) {
        this.invalidate(InvalidationType.DATA);
    };
    DevilView.prototype.cleanItemInfoList = function () {
        if (this._itemInfoList) {
            for (var i = 0; i < this._itemInfoList.length; i++) {
                if (this._itemInfoList[i])
                    Manager.pool.push(this._itemInfoList[i]);
                this._itemInfoList[i] = null;
            }
        }
        this._itemInfoList = null;
    };
    DevilView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._nameTxt, this._timeTxt, this._goBtn, this._itemObject);
        this._nameTxt.dispose();
        this._nameTxt = null;
        this._timeTxt.dispose();
        this._timeTxt = null;
        this._goBtn.dispose();
        this._goBtn = null;
        if (this._head != null)
            Manager.pool.push(this._head);
        this._head = null;
        if (this._itemObject)
            this._itemObject.dispose();
        this._itemObject = null;
        this.cleanItemInfoList();
    };
    return DevilView;
}(UIComponent));
//# sourceMappingURL=DevilView.js.map