var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 主界面左上角玩家头像视图
 * luzh
 * create 2018.2.27
 * @update devil 2018 04 17
*/
var Head = (function () {
    function Head(homeImageLayer, homeLayer) {
        this._countAddFight = 0;
        this._homeImageLayer = ObjectUtil.createConainer();
        homeImageLayer.addChild(this._homeImageLayer);
        this._homeLayer = ObjectUtil.createConainer();
        homeLayer.addChild(this._homeLayer);
        this._visible = false;
    }
    Head.prototype.dispatchRender = function () {
        Manager.render.add(this.draw, this, 0, 1);
    };
    Head.prototype.draw = function () {
        if (this._drawName) {
            this.drawName();
            this._drawName = false;
        }
        if (this._drawVipLevel) {
            this.drawVipLevel();
            this._drawVipLevel = false;
        }
        if (this._drawVipRewards) {
            this.drawVipRewards();
            this._drawVipRewards = false;
        }
        if (this._drawFightUpdate) {
            this.drawFightUpdate();
            this._drawFightUpdate = false;
        }
        if (this._drawCoin) {
            this.drawCoin();
            this._drawCoin = false;
        }
        if (this._drawGold) {
            this.drawGold();
            this._drawGold = false;
        }
    };
    Head.prototype.drawName = function () {
        var nick = Manager.model.self.getName();
        var arr = nick.split(".");
        var nickName = "";
        if (arr.length == 2)
            nickName = arr[1];
        else
            nickName = nick;
        if (Manager.model.self.attrInfo.zhuanshu != 0) {
            this._nickName.text = LangCVO.getContent("common57", nickName, Manager.model.self.attrInfo.zhuanshu, Manager.model.self.attrInfo.level);
        }
        else {
            this._nickName.text = LangCVO.getContent("common58", nickName, Manager.model.self.attrInfo.level);
        }
        // this._nickName.cacheAsBitmap = true;
    };
    Head.prototype.drawVipLevel = function () {
        this._vipNum.setValue(Manager.model.self.attrInfo.vipLevel, "nums_sysnontic_", 14);
    };
    Head.prototype.drawVipRewards = function () {
        if (Manager.model.getVip().hasCanFatch) {
            if (this._vipRedIcon == null) {
                this._vipRedIcon = Manager.pool.create(BitmapRes, "main_red_icon_png");
                this._vipRedIcon.x = this._vipBtn.x + 56;
                this._vipRedIcon.y = this._vipBtn.y;
                this._homeImageLayer.addChild(this._vipRedIcon);
            }
        }
        else {
            if (this._vipRedIcon) {
                Manager.pool.push(this._vipRedIcon);
                this._vipRedIcon = null;
            }
        }
    };
    Head.prototype.drawFightUpdate = function () {
        var fighting = 0;
        if (Manager.model.self && Manager.model.self.attrInfo)
            fighting = Manager.model.self.attrInfo.fight;
        this._fighting.setValue(fighting, "nums_fighting_", 20);
        if (this._countAddFight > 0) {
            this._fightUpgradeView = Manager.pool.create(FightUpgradeView, this._countAddFight, this.onShowFightCompleteCallback, this);
            // this._homeLayer.addChild(this._fightUpgradeView);
            if (this._fightUpgradeView)
                Manager.layer.uiLayer.addChild(this._fightUpgradeView);
            this._countAddFight = 0;
        }
    };
    Head.prototype.drawCoin = function () {
        this._coin.text = StringUtils.getBigNum(Manager.model.self.attrInfo.coin);
    };
    Head.prototype.drawGold = function () {
        this._gold.text = StringUtils.getBigNum(Manager.model.self.attrInfo.gold);
    };
    Head.prototype.onShowFightCompleteCallback = function (thisObj) {
        if (this._fightUpgradeView) {
            Manager.pool.push(this._fightUpgradeView);
            this._fightUpgradeView = null;
        }
    };
    Head.prototype.switch = function (visible) {
        if (this._visible == visible)
            return;
        this._visible = visible;
        if (this._visible) {
            this._back1 = BitmapRes.create("main_headBg_png", 0, 0, 465, 134);
            this._homeImageLayer.addChild(this._back1);
            this._back2 = BitmapRes.create("panel_top_itemBg_png", 164, 9, 105, 30);
            this._homeImageLayer.addChild(this._back2);
            this._back3 = BitmapRes.create("panel_top_itemBg_png", 298, 9, 105, 30);
            this._homeImageLayer.addChild(this._back3);
            this._back4 = BitmapRes.create("main_mapIcon1_png", 130, -4);
            this._homeImageLayer.addChild(this._back4);
            this._back5 = BitmapRes.create("playRes_gold_54_png", 270, -5);
            this._homeImageLayer.addChild(this._back5);
            this._headImg = BitmapRes.create("main_sex1_png", 11, -6, 103, 126);
            this._headImg.touchEnabled = true;
            this._headImg.source = "main_sex" + Manager.model.self.attrInfo.career + "_png";
            this._homeImageLayer.addChild(this._headImg);
            this._sysChargeBtn = BitmapRes.create("main_addImg_png", 406, 3);
            this._sysChargeBtn.touchEnabled = true;
            this._homeImageLayer.addChild(this._sysChargeBtn);
            this._sound = BitmapRes.create("main_sound_open_png", 99, 88, 37, 42);
            this._sound.touchEnabled = true;
            this._homeImageLayer.addChild(this._sound);
            this._vipBtn = BitmapRes.create("main_VIP_png", 425, 43);
            this._vipBtn.touchEnabled = true;
            this._homeImageLayer.addChild(this._vipBtn);
            this._back6 = BitmapRes.create("main_vipImg_png", 448, 87, 30, 20);
            this._homeImageLayer.addChild(this._back6);
            this._worldLvlIcon = BitmapRes.create("main_world_level_png", 375, 40);
            this._worldLvlIcon.touchEnabled = true;
            this._homeLayer.addChild(this._worldLvlIcon);
            this._gold = TextField.create(100, 24, 0xffffff, 22, "right");
            this._gold.move(297, 12);
            this._homeLayer.addChild(this._gold);
            this._coin = TextField.create(100, 24, 0xffffff, 22, "right");
            this._coin.move(162, 12);
            this._homeLayer.addChild(this._coin);
            this._nickName = TextField.create(232, 26, 0xD1CCC8, 24);
            this._nickName.move(144, 47);
            this._homeLayer.addChild(this._nickName);
            this._vip = new eui.Group();
            this._vip.width = 165;
            this._vip.height = 31;
            this._vip.x = 281;
            this._vip.y = 5;
            this._homeLayer.addChild(this._vip);
            this._fightingEffect = Manager.animation.createEffectAnimation("main_fighting");
            this._fightingEffect.x = 122;
            this._fightingEffect.y = 36;
            this._homeLayer.addChild(this._fightingEffect);
            this._vipNum = Manager.pool.create(NumImgView2);
            this._vipNum.x = this._vipBtn.x + 52;
            this._vipNum.y = this._vipBtn.y + 44;
            this._homeLayer.addChild(this._vipNum);
            this._vipNum.scaleX = this._vipNum.scaleY = 0.6;
            this._fighting = Manager.pool.create(NumImgView2);
            this._fighting.x = 220;
            this._fighting.y = 82;
            this._homeLayer.addChild(this._fighting);
            this._vipAni = Manager.animation.createEffectAnimation("vip");
            this._vipAni.x = this._vipBtn.x - 19;
            this._vipAni.y = this._vipBtn.y - 23;
            this._homeLayer.addChild(this._vipAni);
            this.addEvent();
            this._drawName = true;
            this._drawVipLevel = true;
            this._drawVipRewards = true;
            this._drawFightUpdate = true;
            this._drawCoin = true;
            this._drawGold = true;
            this.dispatchRender();
        }
        else {
            this.removeEvent();
            Manager.pool.push(this._back1);
            this._back1 = null;
            Manager.pool.push(this._back2);
            this._back2 = null;
            Manager.pool.push(this._back3);
            this._back3 = null;
            Manager.pool.push(this._back4);
            this._back4 = null;
            Manager.pool.push(this._back5);
            this._back5 = null;
            Manager.pool.push(this._headImg);
            this._headImg = null;
            Manager.pool.push(this._sysChargeBtn);
            this._sysChargeBtn = null;
            Manager.pool.push(this._sound);
            this._sound = null;
            Manager.pool.push(this._vipBtn);
            this._vipBtn = null;
            Manager.pool.push(this._back6);
            this._back6 = null;
            Manager.pool.push(this._worldLvlIcon);
            this._worldLvlIcon = null;
            Manager.pool.push(this._gold);
            this._gold = null;
            Manager.pool.push(this._coin);
            this._coin = null;
            Manager.pool.push(this._nickName);
            this._nickName = null;
            this._vip.parent.removeChild(this._vip);
            this._vip = null;
            Manager.pool.push(this._fightingEffect);
            this._fightingEffect = null;
            this._vipNum.dispose();
            this._vipNum = null;
            this._fighting.dispose();
            this._fighting = null;
            this._vipAni.dispose();
            this._vipAni = null;
            if (this._vipRedIcon) {
                Manager.pool.push(this._vipRedIcon);
                this._vipRedIcon = null;
            }
            Manager.render.remove(this.draw, this);
        }
    };
    Head.prototype.addEvent = function () {
        Manager.model.self.addEventListener(GameObjectAttrEvent.NICKNAME, this.onNameLevelUpdateHandler, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL, this.onNameLevelUpdateHandler, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.TURN_LIVE, this.onNameLevelUpdateHandler, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.VIP_LEVEL, this.onVipUpdateHandler, this);
        Manager.model.getVip().addEventListener(VipEvent.REWARDS_UPDATE, this.onVipRewardsUpdate, this);
        this._headImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._vip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._vipBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._sound.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._sysChargeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._worldLvlIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.FIGHT, this.onFightUpdateHandler, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.GOLD, this.onGoldUpdateHandler, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.COIN, this.onCoinUpdateHandler, this);
    };
    Head.prototype.removeEvent = function () {
        Manager.model.self.removeEventListener(GameObjectAttrEvent.NICKNAME, this.onNameLevelUpdateHandler, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.LEVEL, this.onNameLevelUpdateHandler, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.TURN_LIVE, this.onNameLevelUpdateHandler, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.VIP_LEVEL, this.onVipUpdateHandler, this);
        Manager.model.getVip().removeEventListener(VipEvent.REWARDS_UPDATE, this.onVipRewardsUpdate, this);
        this._headImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._vip.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._vipBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._sound.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._sysChargeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._worldLvlIcon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.FIGHT, this.onFightUpdateHandler, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.GOLD, this.onGoldUpdateHandler, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.COIN, this.onCoinUpdateHandler, this);
    };
    Head.prototype.onNameLevelUpdateHandler = function (e) {
        this._drawName = true;
        this.dispatchRender();
    };
    Head.prototype.onVipUpdateHandler = function (e) {
        this._drawVipLevel = true;
        this._drawVipRewards = true;
        this.dispatchRender();
    };
    Head.prototype.onVipRewardsUpdate = function (e) {
        if (e === void 0) { e = null; }
        this._drawVipRewards = true;
        this.dispatchRender();
    };
    Head.prototype.onFightUpdateHandler = function (e) {
        var dis = Number(e.params);
        if (dis > 0)
            this._countAddFight += dis;
        this._drawFightUpdate = true;
        this.dispatchRender();
    };
    Head.prototype.onGoldUpdateHandler = function (e) {
        this._drawGold = true;
        this.dispatchRender();
    };
    Head.prototype.onCoinUpdateHandler = function (e) {
        this._drawCoin = true;
        this.dispatchRender();
    };
    Head.prototype.onClickHandler = function (e) {
        switch (e.currentTarget) {
            case this._headImg:
                Manager.view.show(41 /* RenameView */);
                break;
            case this._vipBtn:
                Manager.view.show(51 /* VipPanel */);
                break;
            case this._sound:
                this.setSound(!Manager.sound.noMute);
                break;
            case this._vip:
            case this._sysChargeBtn:
                KeyManager.bol = true;
                Manager.render.add(this.test, this, 3000, 1);
                Manager.link.link(LinkType.PANEL_RECHARGE);
                break;
            case this._worldLvlIcon:
                Manager.view.show(137 /* WorldLevelView */);
                break;
        }
    };
    Head.prototype.test = function () {
        KeyManager.bol = false;
    };
    Head.prototype.setSound = function (noMute) {
        Manager.sound.noMute = noMute;
        if (!noMute) {
            this._sound.source = "main_sound_close_png";
        }
        else {
            this._sound.source = "main_sound_open_png";
        }
    };
    return Head;
}());
__reflect(Head.prototype, "Head");
//# sourceMappingURL=Head.js.map