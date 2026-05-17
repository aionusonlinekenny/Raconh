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
 * 日常视图
 * luzhihong
 * create 2017-11-23
 */
var MainCopyView = /** @class */ (function (_super) {
    __extends(MainCopyView, _super);
    function MainCopyView() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("sysnotice", "MainCopyViewSkin");
        return _this;
    }
    MainCopyView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._model = Manager.model.getCopy();
        this._cvo = CopyCVO.getCVO(CopyConst.ID_MAIN);
        this._bg.load(Manager.path.getActivityPath("activity_copy_back.jpg"));
        this._txtPreNeed = Manager.pool.create(NumImgView2);
        this._txtPreNeed.x = 25;
        this._groupUnlock.addChild(this._txtPreNeed);
        var str = LangCVO.getContent("activity4"); //4	查看排名
        HtmlUtil.setTextFlow(this._txtLink, HtmlUtil.addUTag(str));
        this._items = [];
        var item;
        var len = this._cvo.show.length;
        for (var i = 0; i < len; i++) {
            item = Manager.pool.create(Goods);
            item.x = 128 + i * 128;
            item.y = 845;
            item.data = this._cvo.show[i].item;
            this.addChild(item);
            this._items.push(item);
        }
        //引导
        if (Manager.model.getGuide().curID == GuideID.TASK || Manager.model.getGuide().curID == GuideID.TASK_NORMAL) {
            this._btn.x = 241;
            var pos = this._btn.parent.localToGlobal(this._btn.x, this._btn.y);
            Manager.control.getTask().showGuide(pos, 119, 53, this.guideCB, this, false);
        }
    };
    MainCopyView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._txtLink.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._model.addEventListener(CopyEvent.UPDATE_SINGLE, this.updateInfo, this);
        this._model.addEventListener(CopyEvent.UPDATE_RANK, this.updateRank, this);
    };
    MainCopyView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._txtLink.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._model.removeEventListener(CopyEvent.UPDATE_SINGLE, this.updateInfo, this);
        this._model.removeEventListener(CopyEvent.UPDATE_RANK, this.updateRank, this);
    };
    MainCopyView.prototype.onClickHandler = function (e) {
        switch (e.currentTarget) {
            case this._btn:
                this.clickBtn(e);
                break;
            case this._txtLink:
                Manager.control.getCopy().showRank(this._cvo.id);
                break;
        }
    };
    MainCopyView.prototype.clickBtn = function (e) {
        if (e != null && (Manager.model.getGuide().curID == GuideID.TASK || Manager.model.getGuide().curID == GuideID.TASK_NORMAL))
            return;
        if (!this._cvo.isAllCondSatisfy(true))
            return;
        if (!Manager.model.self.canJoinActive(true))
            return;
        var cbi = Manager.pool.create(CallBackInfo, this.enterCopy, this, this._cvo.id);
        if (Manager.model.getBag().isTooLittle(true, cbi))
            return;
        else
            this.enterCopy(this._cvo.id);
    };
    MainCopyView.prototype.enterCopy = function (id) {
        var taskInfo = Manager.model.getTask().getcurTask();
        if (taskInfo != null && taskInfo.id < this._mainCVO.taskID) {
            // var taskCVO:TaskCvoInfo = TaskCVO.getinfo(taskInfo.id);
            FloatTips.addTips(LangCVO.getContent("activity7")); //先完成任务
            return;
        }
        Manager.control.getCopy().enter(id);
        Manager.view.hide(80 /* SysNoticePanel */);
    };
    MainCopyView.prototype.updateInfo = function (e) {
        if (e.data.id == this._cvo.id) {
            this.invalidate("updateInfo");
        }
    };
    MainCopyView.prototype.updateRank = function (e) {
        // [id, index, infos]
        if (e.params[0] == CopyConst.ID_MAIN) {
            this._rankInfos = e.params[2];
            this.invalidate("updateRank");
        }
    };
    MainCopyView.prototype.drawByInfo = function () {
        this._mainCVO = MainCopyCVO.getCVO(this._cvo.cell + 1);
        if (this._mainCVO == null)
            this._mainCVO = MainCopyCVO.getCVO(this._cvo.cell);
        this._txtName.text = this._mainCVO.name;
        this._txtBoss.text = this._mainCVO.monCVO.name;
        if (this._mainCVO.sysID > 0) {
            this._groupPre.visible = true;
            var sysCVO = SysNoteiceCVO.getCvo(this._mainCVO.sysID);
            this._imgPre.load(Manager.path.getSysnoticePath("icon/" + sysCVO.icon));
            // this._txtPreNeed.text = sysCVO.pass+"";
            this._txtPreName.text = sysCVO.name;
            this._txtPreNeed.setValue(sysCVO.pass, "nums_count_", 0);
            this._unlock1.x = this._txtPreNeed.x + this._txtPreNeed.width + 5;
        }
        else
            this._groupPre.visible = false;
        if (this._bossAni)
            Manager.pool.push(this._bossAni);
        this._bossAni = Manager.animation.createEffectAnimation(this._mainCVO.monCVO.showID);
        this._bossAni.move(95, 230);
        this.addChildAt(this._bossAni, 1);
        Manager.control.getCopy().getRank(CopyConst.ID_MAIN, 0);
    };
    MainCopyView.prototype.drawRank = function () {
        var str = "";
        var len = this._rankInfos.length < 3 ? this._rankInfos.length : 3;
        for (var i = 0; i < len; i++) {
            str += this._rankInfos[i].rank + ". " + this._rankInfos[i].name + ":" + this._rankInfos[i].value + LangCVO.getContent("activity5") + "\n"; //5	关
        }
        this._txtRank.text = str;
    };
    MainCopyView.prototype.guideCB = function () {
        this.clickBtn(null);
        Manager.control.getTask().hideGuide();
    };
    MainCopyView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid("updateInfo"))
            this.drawByInfo();
        if (this.isInvalid("updateRank"))
            this.drawRank();
    };
    MainCopyView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawByInfo();
    };
    MainCopyView.prototype.dispose = function () {
        if (Manager.model.getGuide().curID == GuideID.TASK || Manager.model.getGuide().curID == GuideID.TASK_NORMAL)
            Manager.control.getTask().hideGuide();
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._groupPre, this._groupUnlock, this._unlock1);
        ObjectUtil.disposes(this._bg, this._txtPreName, this._txtName, this._txtBoss, this._txtRank, this._txtLink, this._btn);
        this._bg = null;
        this._txtPreName = null;
        if (this._txtPreNeed)
            Manager.pool.push(this._txtPreNeed);
        this._txtPreNeed = null;
        this._txtName = null;
        this._txtBoss = null;
        this._txtRank = null;
        this._txtLink = null;
        this._btn = null;
        this._groupPre = null;
        this._groupUnlock = null;
        this._unlock1 = null;
        for (var i = this._items.length - 1; i >= 0; i--) {
            this._items[i].dispose();
        }
        this._items = null;
        if (this._bossAni)
            Manager.pool.push(this._bossAni);
        this._bossAni = null;
        this._model = null;
        this._cvo = null;
        this._mainCVO = null;
        this._rankInfos = null;
    };
    return MainCopyView;
}(UIComponent));
//# sourceMappingURL=MainCopyView.js.map