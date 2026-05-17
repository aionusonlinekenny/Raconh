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
 * 魔神降临结算面板
 * liangyan
 * create 2018-04-10
*/
var DevilResultView = /** @class */ (function (_super) {
    __extends(DevilResultView, _super);
    function DevilResultView() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("devil", "DevilResultViewSkin");
        return _this;
    }
    DevilResultView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        if (this._back == null) {
            var path = Manager.path.getRelicStuffPath("relicStuffdi2");
            this._back = Manager.pool.create(BitmapRemote, path);
            this._back.y = 165;
            this.addChildAt(this._back, 0);
        }
        if (this._title == null) {
            var path = Manager.path.getDevilPath("king_title");
            this._title = Manager.pool.create(BitmapRemote, path);
            this._title.x = 91;
            this._title.y = 95;
            this.addChildAt(this._title, this.getChildIndex(this._back) + 1);
        }
        if (this._fightNum == null) {
            this._fightNum = Manager.pool.create(NumImgView2);
            this._fightNum.x = this._fightImg.x + 150;
            this._fightNum.y = this._fightImg.y + 15;
            this.addChild(this._fightNum);
        }
    };
    DevilResultView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
    };
    DevilResultView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
    };
    DevilResultView.prototype.initData = function () {
        _super.prototype.initData.call(this);
        this.onResizeHandler(null);
    };
    DevilResultView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    DevilResultView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    DevilResultView.prototype.drawData = function () {
        var resultInfo = Manager.model.getDevil().resultInfo;
        if (resultInfo == null)
            return;
        //霸主名字
        this._nameTxt.text = resultInfo.kingInfo.name;
        //霸主外形
        if (this._role != null) {
            Manager.pool.push(this._role);
            this._role = null;
        }
        this._role = Manager.pool.create(RoleAnimation, resultInfo.kingInfo.clothes, resultInfo.kingInfo.weapon, resultInfo.kingInfo.wing);
        this._role.x = -280;
        this._role.y = -100;
        this.addChildAt(this._role, this.getChildIndex(this._title) + 1);
        //霸主战力
        this._fightNum.setValue(resultInfo.kingInfo.fight, "nums_fighting_", 25);
        //我的积分和排名
        HtmlUtil.setTextFlow(this._myScoreTxt, LangCVO.getContent("devil2", Color.GREEN_STR_2, resultInfo.myScore));
        HtmlUtil.setTextFlow(this._myRankTxt, LangCVO.getContent("devil3", Color.GREEN_STR_2, resultInfo.myRank));
        //获得物品
        var len = resultInfo.rewards != null ? resultInfo.rewards.length : 0;
        var offsetX = (720 - (141 * len)) / 2;
        var offsetY = 940;
        this._itemObject = Manager.pool.create(ItemObject, resultInfo.rewards, len, 0);
        this._itemObject.touchChildren = true;
        this._itemObject.x = offsetX;
        this._itemObject.y = offsetY;
        this.addChild(this._itemObject);
    };
    DevilResultView.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
        this.y = Math.round(Manager.global.gameMain.stage.stageHeight - this.height) / 2;
    };
    DevilResultView.prototype.onTouchHandler = function (e) {
        Manager.view.hide(142 /* DevilResultView */);
    };
    DevilResultView.prototype.show = function () {
        if (this.parent == null) {
            this.invalidate(InvalidationType.DATA);
            Manager.layer.tipsLayer.addChild(this);
        }
    };
    DevilResultView.prototype.hide = function () {
        if (this.parent != null)
            this.dispose();
    };
    DevilResultView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._nameTxt, this._fightImg, this._myScoreTxt, this._myRankTxt, this._confirmBtn, this._itemObject);
        this._nameTxt.dispose();
        this._nameTxt = null;
        this._fightImg = null;
        this._myScoreTxt.dispose();
        this._myScoreTxt = null;
        this._myRankTxt.dispose();
        this._myRankTxt = null;
        this._confirmBtn.dispose();
        this._confirmBtn = null;
        if (this._back != null)
            Manager.pool.push(this._back);
        this._back = null;
        if (this._role != null)
            Manager.pool.push(this._role);
        this._role = null;
        if (this._title != null)
            Manager.pool.push(this._title);
        this._title = null;
        if (this._fightNum != null)
            Manager.pool.push(this._fightNum);
        this._fightNum = null;
        if (this._itemObject != null)
            this._itemObject.dispose();
        this._itemObject = null;
    };
    return DevilResultView;
}(UIComponent));
//# sourceMappingURL=DevilResultView.js.map