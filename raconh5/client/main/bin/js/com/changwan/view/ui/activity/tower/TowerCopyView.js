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
 * 爬塔副本视图
 * liangyan
 * create 2017-12-27
 */
var TowerCopyView = /** @class */ (function (_super) {
    __extends(TowerCopyView, _super);
    function TowerCopyView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("activity", "TowerCopyViewSkin");
        _this.touchChildren = true;
        return _this;
    }
    TowerCopyView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._model = Manager.model.getCopy().towerModel;
        this._cvo = CopyCVO.getCVO(CopyConst.ID_TOWER);
        this._back = Manager.pool.create(BitmapRemote, Manager.path.getActivityPath("activity_copy_tower_bg.jpg"));
        this._back.y = 110;
        this.addChildAt(this._back, 0);
        this._txtPreNeed = Manager.pool.create(NumImgView2);
        this._txtPreNeed.x = 25;
        this._groupUnlock.addChild(this._txtPreNeed);
        var str = LangCVO.getContent("activity4"); //4	查看排名
        HtmlUtil.setTextFlow(this._txtLink, HtmlUtil.addUTag(str));
        this._tiaozhanImg.touchEnabled = this._saodangImg.touchEnabled = false;
    };
    TowerCopyView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._txtLink.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._model.addEventListener(CopyEvent.UPDATE_TOWER_INFO, this.updateInfo, this);
        Manager.model.getCopy().addEventListener(CopyEvent.UPDATE_RANK, this.updateRank, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL, this.onAttrUpdateHandler, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.FIGHT, this.onAttrUpdateHandler, this);
    };
    TowerCopyView.prototype.removeEvent = function () {
        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._txtLink.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._model.removeEventListener(CopyEvent.UPDATE_TOWER_INFO, this.updateInfo, this);
        Manager.model.getCopy().removeEventListener(CopyEvent.UPDATE_RANK, this.updateRank, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.LEVEL, this.onAttrUpdateHandler, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.FIGHT, this.onAttrUpdateHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    TowerCopyView.prototype.initData = function () {
        _super.prototype.initData.call(this);
        this.onAttrUpdateHandler(null);
    };
    TowerCopyView.prototype.onClickHandler = function (e) {
        switch (e.currentTarget) {
            case this._btn:
                if (this._canSaodang) {
                    Manager.control.getCopy().saoDang(CopyConst.ID_TOWER);
                    return;
                }
                if (!this._cvo.isAllCondSatisfy(true))
                    return;
                if (!Manager.model.self.canJoinActive(true))
                    return;
                var callBack = Manager.pool.create(CallBackInfo, this.enterCopy, this, this._cvo.id);
                if (Manager.model.getBag().isTooLittle(true, callBack))
                    return;
                else
                    this.enterCopy(this._cvo.id, false);
                break;
            case this._txtLink:
                Manager.control.getCopy().showRank(this._cvo.id);
                break;
        }
    };
    TowerCopyView.prototype.enterCopy = function (id, oneKeyFusoin) {
        if (oneKeyFusoin === void 0) { oneKeyFusoin = true; }
        if (this._towerCvo && !this._towerCvo.isAllCondSatisfy(true))
            return;
        Manager.control.getCopy().enter(id);
        Manager.view.hide(10 /* ActivityPanel */);
    };
    TowerCopyView.prototype.updateInfo = function (e) {
        this.invalidate("updateInfo");
    };
    TowerCopyView.prototype.updateRank = function (e) {
        // [id, index, infos]
        if (e.params[0] == CopyConst.ID_TOWER) {
            this._rankInfos = e.params[2];
            this.invalidate("updateRank");
        }
    };
    TowerCopyView.prototype.onAttrUpdateHandler = function (e) {
        if (e && e.type == GameObjectAttrEvent.LEVEL)
            this.drawVisible();
        this._tipsIcon.visible = this._model.canSaodang || this._model.canChallenge();
    };
    TowerCopyView.prototype.drawByInfo = function () {
        this._towerCvo = TowerCopyCVO.getCVO(this._model.curLvl + 1);
        if (this._towerCvo == null)
            this._towerCvo = TowerCopyCVO.getCVO(this._model.curLvl);
        Manager.control.getCopy().getRank(CopyConst.ID_TOWER, 0);
        this.drawBoss();
        this.drawUnlock();
        this.drawRewards();
        this.drawVisible();
    };
    TowerCopyView.prototype.drawRank = function () {
        var str = "";
        var len = this._rankInfos.length < 3 ? this._rankInfos.length : 3;
        for (var i = 0; i < len; i++) {
            str += this._rankInfos[i].rank + ". " + this._rankInfos[i].name + ":" + this._rankInfos[i].value + LangCVO.getContent("activity5") + "\n"; //5	关
        }
        this._txtRank.text = str;
    };
    TowerCopyView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid("updateInfo"))
            this.drawByInfo();
        if (this.isInvalid("updateRank"))
            this.drawRank();
    };
    TowerCopyView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawByInfo();
    };
    /**阶段解锁 */
    TowerCopyView.prototype.drawUnlock = function () {
        if (this._towerCvo.unlockDesc[0] == "") {
            this._groupPre.visible = false;
            return;
        }
        // this._txtPreNeed.text = this._towerCvo.unlockDesc[0];
        this._txtPreNeed.setValue(parseInt(this._towerCvo.unlockDesc[0]), "nums_count_", 15);
        this._unlock1.x = this._txtPreNeed.x + this._txtPreNeed.width + 5;
        var goodsID = Number(this._towerCvo.unlockDesc[1]);
        if (goodsID > 10) //大于10显示物品
         {
            var goodsInfo = new ItemsModelInfo();
            goodsInfo.base_id = goodsID;
            goodsInfo.bind = true;
            goodsInfo.quantity = 0;
            if (goodsInfo) {
                this._txtPreName.text = goodsInfo.cvo.name;
                if (this._unlockGoods)
                    Manager.pool.push(this._unlockGoods);
                this._unlockGoods = Manager.pool.create(Goods);
                this._unlockGoods.data = goodsInfo;
                this._unlockGoods.x = this._txtPreName.x + 5;
                this._unlockGoods.y = this._txtPreName.y - 127;
                this._groupPre.addChild(this._unlockGoods);
            }
        }
        else {
            this._txtPreName.text = "命格槽位";
            if (!this._unlockGrid) {
                this._unlockGrid = Manager.pool.create(LifeGridBallItem);
                this._unlockGrid.x = this._txtPreName.x + 17;
                this._unlockGrid.y = this._txtPreName.y - 113;
                this._unlockGrid.id = parseInt(this._towerCvo.unlockDesc[1]);
                this._groupPre.addChild(this._unlockGrid);
            }
        }
    };
    /**boss相关 */
    TowerCopyView.prototype.drawBoss = function () {
        this._txtName.text = this._towerCvo.monster.name;
        this._txtLvl.text = LangCVO.getContent("copy1", this._towerCvo.cell); //第{0}关
        if (this._bossAni)
            Manager.pool.push(this._bossAni);
        this._bossAni = Manager.animation.createEffectAnimation(this._towerCvo.monster.showID);
        this._bossAni.move(95, 230);
        this.addChildAt(this._bossAni, 1);
    };
    /**物品奖励 */
    TowerCopyView.prototype.drawRewards = function () {
        this._items = [];
        var item;
        var rewards = this._model.curLvl > this._model.history ? this._towerCvo.firstRewards : this._towerCvo.saodangRewards;
        for (var i = 0; i < rewards.length; i++) {
            item = Manager.pool.create(Goods);
            item.x = 128 + i * 128;
            item.y = 845;
            item.data = rewards[i].item;
            this.addChild(item);
            this._items.push(item);
        }
    };
    /**显示/隐藏 */
    TowerCopyView.prototype.drawVisible = function () {
        if (this._model.history >= TowerCopyCVO.MAX_CELL && this._model.curLvl >= this._model.history) {
            this._labelFinish.visible = true;
            this._tipsIcon.visible = this._btn.visible = this._txtTiaozhan.visible
                = this._saodangImg.visible = this._tiaozhanImg.visible = false;
        }
        else {
            this._labelFinish.visible = false;
            this._canSaodang = this._model.canSaodang;
            this._tipsIcon.visible = this._btn.visible = this._canSaodang || this._towerCvo.isAllCondSatisfy();
            this._txtTiaozhan.visible = !this._btn.visible;
            this._saodangImg.visible = this._canSaodang && this._btn.visible;
            this._tiaozhanImg.visible = !this._canSaodang && this._btn.visible;
            //<font color='{0}'>达到{1}级可挑战</font>
            var str = StringUtils.setParam(LangCVO.getContent("copy2"), Color.RED_STR, this._towerCvo.conditions[0].value);
            HtmlUtil.setTextFlow(this._txtTiaozhan, str);
        }
    };
    TowerCopyView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._txtPreName, this._txtPreNeed, this._txtName, this._txtLvl, this._txtLink, this._btn, this._tiaozhanImg, this._saodangImg, this._txtTiaozhan, this._tipsIcon, this._unlockGoods, this._unlockGrid, this._labelFinish);
        ObjectUtil.dispose(this._back);
        this._back = null;
        this._txtPreName.dispose();
        this._txtPreName = null;
        if (this._txtPreNeed)
            Manager.pool.push(this._txtPreNeed);
        this._txtPreNeed = null;
        this._txtName.dispose();
        this._txtName = null;
        this._txtLvl.dispose();
        this._txtLvl = null;
        this._txtRank.dispose();
        this._txtRank = null;
        this._txtLink.dispose();
        this._txtLink = null;
        this._btn.dispose();
        this._btn = null;
        this._tiaozhanImg.bitmapData = null;
        this._tiaozhanImg = null;
        this._saodangImg.bitmapData = null;
        this._saodangImg = null;
        this._txtTiaozhan.dispose();
        this._txtTiaozhan = null;
        this._tipsIcon.bitmapData = null;
        this._tipsIcon = null;
        if (this._unlockGoods)
            Manager.pool.push(this._unlockGoods);
        this._unlockGoods = null;
        if (this._unlockGrid)
            Manager.pool.push(this._unlockGrid);
        this._unlockGrid = null;
        this._groupPre = null;
        this._labelFinish = null;
        for (var i = this._items.length - 1; i >= 0; i--) {
            this._items[i].dispose();
        }
        this._items = null;
        if (this._bossAni)
            Manager.pool.push(this._bossAni);
        this._bossAni = null;
        this._model = null;
        this._cvo = null;
        this._towerCvo = null;
        this._rankInfos = null;
    };
    return TowerCopyView;
}(UIComponent));
//# sourceMappingURL=TowerCopyView.js.map