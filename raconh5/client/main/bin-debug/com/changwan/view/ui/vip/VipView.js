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
 * vip视图
 * liangyan
 * create 2017-12-20
*/
var VipView = (function (_super) {
    __extends(VipView, _super);
    function VipView() {
        var _this = _super.call(this) || this;
        _this.STRIP = "strip";
        _this.PAGE = "page";
        _this.REWARDS = "rewards";
        _this._setPage = false;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("vip", "VipViewSkin");
        return _this;
    }
    VipView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        if (!this._bg) {
            this._bg = Manager.pool.create(BitmapRemote);
            this._bg.x = 5;
            this._bg.y = 118;
            this._bg.load(PathInfo.getPath("res/common/common_back4.png", LoaderType.IMAGE), 710, 325);
            this.addChildAt(this._bg, 0);
        }
        this._rightsBg.load(Manager.path.getVipPath("vip_back"));
        if (!this._curLvl) {
            this._curLvl = Manager.pool.create(NumImgView2);
            this._curLvl.x = this._curImg.x + 130;
            this._curLvl.y = this._curImg.y + 5;
            this.addChild(this._curLvl);
        }
        if (!this._nextLvl) {
            this._nextLvl = Manager.pool.create(NumImgView2);
            this._nextLvl.x = this._nextImg.x + 130;
            this._nextLvl.y = this._nextImg.y + 5;
            this.addChild(this._nextLvl);
        }
        if (!this._curLvl2) {
            this._curLvl2 = Manager.pool.create(NumImgView2);
            this._curLvl2.x = this._titleImg.x + 55;
            this._curLvl2.y = this._titleImg.y + 2;
            this.addChild(this._curLvl2);
        }
        if (!this._strip2) {
            this._strip2 = StripView2.create(this, this, "strip_back2_png", "strip_blue2_png", 603, 53, 564, 32, 19, 10, true, true);
            this._strip2.move(59, 194);
        }
        this._fetchedImg.touchEnabled = false;
    };
    VipView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._preBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._nextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._rechargeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._fetchBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.VIP_LEVEL, this.onEventUpdateHander, this);
        Manager.model.getVip().addEventListener(VipEvent.EXP_UPDATE, this.onEventUpdateHander, this);
        Manager.model.getVip().addEventListener(VipEvent.REWARDS_UPDATE, this.onEventUpdateHander, this);
    };
    VipView.prototype.removeEvent = function () {
        this._preBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._nextBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._rechargeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._fetchBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.VIP_LEVEL, this.onEventUpdateHander, this);
        Manager.model.getVip().removeEventListener(VipEvent.EXP_UPDATE, this.onEventUpdateHander, this);
        Manager.model.getVip().removeEventListener(VipEvent.REWARDS_UPDATE, this.onEventUpdateHander, this);
        _super.prototype.removeEvent.call(this);
    };
    VipView.prototype.initData = function () {
        _super.prototype.initData.call(this);
        var vipLvl = Manager.model.self.attrInfo.vipLevel;
        if (!this._setPage) {
            this._curPage = vipLvl;
        }
        this._totalPage = VipLevelCVO.MAX_LEVEL;
        this._curLvl.setValue(this._curPage, "nums_vip_", 25);
        var next = this._curPage + 1;
        next = next > this._totalPage ? this._totalPage : next;
        this._nextLvl.setValue(next, "nums_vip_", 25);
        this.drawCost();
    };
    VipView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawStrip();
        this._curPage = this.getCanFetchPage();
        this.drawPage();
    };
    VipView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(this.STRIP))
            this.drawStrip();
        if (this.isInvalid(this.PAGE))
            this.drawPage();
        if (this.isInvalid(this.REWARDS))
            this.drawRewards();
    };
    /**进度条 */
    VipView.prototype.drawStrip = function () {
        if (!this._curCvo)
            return;
        var cvo;
        if (!this._curCvo.isMax) {
            var cur = Manager.model.getVip().exp;
            // this._strip.update(cur, this._curCvo.nextLimit);
            this._strip2.update(cur, this._curCvo.nextLimit);
        }
        else {
            cvo = VipLevelCVO.getCVO(this._curCvo.level - 1);
            // this._strip.update(cvo.nextLimit, cvo.nextLimit);
            this._strip2.update(cvo.nextLimit, cvo.nextLimit);
        }
    };
    /**翻页 */
    VipView.prototype.drawPage = function () {
        this._preBtn.visible = this._curPage > 0;
        this._nextBtn.visible = this._curPage >= 0 && this._curPage < this._totalPage;
        this.drawRewards();
        this.drawRight();
        this._curLvl2.setValue(this._curPage, "nums_count_", 16);
        if (this._curPage <= this._curCvo.level)
            return;
        var next = this._curPage;
        next = next > this._totalPage ? this._totalPage : next;
        this._nextLvl.setValue(next, "nums_vip_", 25);
        this.drawCost();
    };
    /**充值数值 */
    VipView.prototype.drawCost = function () {
        if (!this._curCvo)
            return;
        var cvo = VipLevelCVO.getCVO(this._curPage > this._curCvo.level ? this._curPage - 1 : this._curCvo.level);
        if (!cvo)
            return;
        var cur = Manager.model.getVip().exp;
        var str;
        if (!this._curCvo.isMax) {
            if (cvo.isMax)
                cvo = VipLevelCVO.getCVO(this._curPage - 1);
            str = StringUtils.setParam(LangCVO.getContent("vip1"), cvo.nextLimit - cur, cvo.level + 1); //再充值{0}元宝成为VIP{1}
        }
        else
            str = LangCVO.getContent("vip2"); //已达VIP最高级
        HtmlUtil.setTextFlow(this._nextTxt, str);
    };
    /**特权文本 */
    VipView.prototype.drawRight = function () {
        var cvo = VipLevelCVO.getCVO(this._curPage);
        if (!cvo)
            return;
        var vipDatas = [];
        var obj;
        if (cvo.newItem != "") {
            var arr = cvo.newItem.split("|");
            for (var i = 0; i < arr.length; i++) {
                obj = { str: arr[i], isNew: true };
                vipDatas.push(obj);
            }
        }
        if (cvo.rightsDesc != "") {
            var arr = cvo.rightsDesc.split("|");
            for (var j = 0; j < arr.length; j++) {
                obj = { str: arr[j], isNew: false };
                vipDatas.push(obj);
            }
        }
        if (this._isInit) {
            this._list.initBtnListData(VipRightItem, vipDatas, true);
            this._list.itemList.layout.gap = 0;
            this._isInit = false;
        }
        else
            this._list.dataProvider(vipDatas);
    };
    /**物品奖励 */
    VipView.prototype.drawRewards = function () {
        var cvo = VipRightsCVO.getCVO(this._curPage);
        if (!cvo)
            return;
        this._rewardsBg.load(Manager.path.getVipPath("vip_reward_back" + this._curPage, Extension.JPG));
        var status = Manager.model.getVip().getRewardsStatus(cvo.level);
        this._fetchBtn.visible = this._fetchedImg.visible = this._redIcon.visible = false;
        switch (status) {
            case VipRewardsStatus.NOT_REACH:
                break;
            case VipRewardsStatus.UN_FETCH:
                this._fetchBtn.visible = this._redIcon.visible = true;
                break;
            case VipRewardsStatus.HAS_FETCH:
                this._fetchedImg.visible = true;
                break;
        }
        var lvlCvo = VipLevelCVO.getCVO(this._curPage);
        if (!lvlCvo)
            return;
        this.clearGoods();
        var rewards = lvlCvo.rewards;
        var goodsLen = rewards.length;
        var child;
        var offsetX = 295;
        var offsetY = 895;
        for (var i = 0; i < goodsLen; i++) {
            child = Manager.pool.create(BaseGoods);
            // child.clear();
            child.baseId = rewards[i].baseId;
            child.count = rewards[i].num;
            child.x = offsetX + (111 * i);
            child.y = offsetY;
            this._goods.push(child);
            this.addChild(child);
        }
    };
    VipView.prototype.onTouchHandler = function (e) {
        switch (e.currentTarget) {
            case this._preBtn:
                this.prePage();
                break;
            case this._nextBtn:
                this.nextPage();
                break;
            case this._rechargeBtn:
                Manager.link.link(LinkType.PANEL_RECHARGE);
                break;
            case this._fetchBtn:
                Manager.control.getVip().getRewardsByLevel(this._curPage);
                break;
        }
    };
    VipView.prototype.prePage = function () {
        if (this._curPage <= 0)
            return;
        this._curPage--;
        this.invalidate(this.PAGE);
    };
    VipView.prototype.nextPage = function () {
        if (this._curPage >= this._totalPage)
            return;
        this._curPage++;
        this.invalidate(this.PAGE);
    };
    VipView.prototype.setPage = function (value) {
        this._curPage = value;
        this._setPage = true;
        this.invalidate(this.PAGE);
    };
    VipView.prototype.onEventUpdateHander = function (e) {
        switch (e.type) {
            case GameObjectAttrEvent.VIP_LEVEL:
                this._curPage = Manager.model.self.attrInfo.vipLevel;
                this._curLvl.setValue(this._curPage, "nums_vip_", 25);
                this._curCvo = VipLevelCVO.getCVO(this._curPage);
                this.invalidate(this.PAGE);
                break;
            case VipEvent.EXP_UPDATE:
                this.invalidate(this.STRIP);
                break;
            case VipEvent.REWARDS_UPDATE:
                // this.invalidate(this.REWARDS);
                this._curPage = this.getCanFetchPage();
                this.invalidate(this.PAGE);
                break;
        }
    };
    VipView.prototype.getCanFetchPage = function () {
        var page = this._curPage;
        var status = -1;
        while (page >= 0) {
            status = Manager.model.getVip().getRewardsStatus(page);
            if (status == VipRewardsStatus.UN_FETCH)
                break;
            page--;
        }
        if (status == VipRewardsStatus.HAS_FETCH)
            page = this._curCvo.level == VipLevelCVO.MAX_LEVEL ? this._curCvo.level : this._curCvo.level + 1;
        return page;
    };
    VipView.prototype.clear = function (isRemove) {
        if (isRemove === void 0) { isRemove = false; }
        if (isRemove) {
            ObjectUtil.removes(this._rightsBg, this._rewardsBg, this._list, this._curImg, this._nextImg, this._nextTxt, this._rechargeBtn, this._titleImg, this._preBtn, this._nextBtn, this._fetchBtn, this._fetchedImg, this._curLvl, this._nextLvl, this._curLvl2, this._redIcon, this._bg);
        }
        //Manager.pool.push(this._rightsBg);
        this._rightsBg.dispose();
        this._rightsBg = null;
        //Manager.pool.push(this._rewardsBg);
        this._rewardsBg.dispose();
        this._rewardsBg = null;
        this._list.dispose();
        this._list = null;
        this._curImg.bitmapData = null;
        this._curImg = null;
        this._nextImg.bitmapData = null;
        this._nextImg = null;
        this._nextTxt.dispose();
        this._nextTxt = null;
        this._rechargeBtn.dispose();
        this._rechargeBtn = null;
        this._titleImg.bitmapData = null;
        this._titleImg = null;
        this._preBtn.dispose();
        this._preBtn = null;
        this._nextBtn.dispose();
        this._nextBtn = null;
        this._fetchBtn.dispose();
        this._fetchBtn = null;
        this._fetchedImg.bitmapData = null;
        this._fetchedImg = null;
        if (this._curLvl)
            Manager.pool.push(this._curLvl);
        this._curLvl = null;
        if (this._nextLvl)
            Manager.pool.push(this._nextLvl);
        this._nextLvl = null;
        if (this._curLvl2)
            Manager.pool.push(this._curLvl2);
        this._curLvl2 = null;
        // if(this._strip) Manager.pool.push(this._strip);
        // this._strip = null;
        // this._strip2.pool();
        if (this._strip2) {
            this._strip2.dispose();
            this._strip2 = null;
        }
        this._redIcon = null;
        if (this._bg)
            Manager.pool.push(this._bg);
        this._bg = null;
        this.clearGoods();
        this._curPage = this._totalPage = 0;
    };
    VipView.prototype.clearGoods = function () {
        if (this._goods) {
            this._goods.forEach(function (goods, i) {
                ObjectUtil.remove(goods);
                Manager.pool.push(goods);
                goods = null;
            });
            this._goods.length = 0;
        }
    };
    VipView.prototype.reuse = function () {
        this._goods = [];
        this._curCvo = VipLevelCVO.getCVO(Manager.model.self.attrInfo.vipLevel);
        this._isInit = true;
        _super.prototype.reuse.call(this);
    };
    VipView.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.clear();
    };
    VipView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.clear(true);
    };
    return VipView;
}(UIComponent));
__reflect(VipView.prototype, "VipView");
//# sourceMappingURL=VipView.js.map