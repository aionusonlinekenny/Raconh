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
 * 特权卡体验
 * pzx
 *
 */
var Sysprivilege_ExperienceView = (function (_super) {
    __extends(Sysprivilege_ExperienceView, _super);
    function Sysprivilege_ExperienceView() {
        var _this = _super.call(this) || this;
        _this._type = 1;
        _this.touchChildren = true;
        _this.start();
        _this.addEvent();
        _this.onResizeHandler(null);
        return _this;
    }
    Sysprivilege_ExperienceView.prototype.start = function () {
        _super.prototype.start.call(this);
        this._timeCD = 60;
        this.width = 720;
        this.height = 1280;
        this._bgBit = Manager.pool.create(BitmapRemote);
        this._bgBit.y = 240;
        this.addChild(this._bgBit);
        this._bgBit.load(Manager.path.getPanelSysPrivilegePath("sysprivilege_tequanka", ".png"));
        this._bg2Bit = Manager.pool.create(BitmapRemote);
        this._bg2Bit.y = 140;
        this.addChild(this._bg2Bit);
        this._bg2Bit.load(Manager.path.getPanelSysPrivilegePath("sysprivilege_nv", ".png"));
        this._okBtn = new Button();
        this._okBtn.skinName = "Button2Skin";
        this._okBtn.x = 383;
        this._okBtn.y = 693;
        this.addChild(this._okBtn);
        this._okImg = BitmapRes.create("sysprivilege_lijitiyan_png", 418, 717, 181, 52);
        this.addChild(this._okImg);
        this._img1 = BitmapRes.create("sysprivilege_chengwei_png", 243, 381, 440, 39);
        this.addChild(this._img1);
        this._img2 = BitmapRes.create("common_point_png", 272, 436, 22, 22);
        this.addChild(this._img2);
        this._img3 = BitmapRes.create("common_point_png", 272, 475, 22, 22);
        this.addChild(this._img3);
        this._img4 = BitmapRes.create("common_point_png", 272, 514, 22, 22);
        this.addChild(this._img4);
        this._img5 = BitmapRes.create("common_point_png", 272, 553, 22, 22);
        this.addChild(this._img5);
        this._img6 = BitmapRes.create("common_point_png", 272, 592, 22, 22);
        this.addChild(this._img6);
        this._img7 = BitmapRes.create("sysprivilege_gengduotequan_png", 248, 629);
        this.addChild(this._img7);
        this._txt1 = TextField.create(369, 30);
        this._txt1.move(295, 432);
        this._txt1.fontFamily = "Microsoft YaHei";
        this.addChild(this._txt1);
        this._txt2 = TextField.create(369, 30);
        this._txt2.move(295, 471);
        this._txt2.fontFamily = "Microsoft YaHei";
        this.addChild(this._txt2);
        this._txt3 = TextField.create(369, 30);
        this._txt3.move(295, 510);
        this._txt3.fontFamily = "Microsoft YaHei";
        this.addChild(this._txt3);
        this._txt4 = TextField.create(369, 30);
        this._txt4.move(295, 549);
        this._txt4.fontFamily = "Microsoft YaHei";
        this.addChild(this._txt4);
        this._txt5 = TextField.create(369, 30);
        this._txt5.move(295, 588);
        this._txt5.fontFamily = "Microsoft YaHei";
        this.addChild(this._txt5);
        this.setDesc(1);
        Manager.render.add(this.activityHandler, this, 1000);
    };
    Sysprivilege_ExperienceView.prototype.activityHandler = function () {
        this._timeCD--;
        if (this._timeCD < 0) {
            Manager.render.remove(this.activityHandler, this);
            this.onTouchCloseHandler();
        }
    };
    Sysprivilege_ExperienceView.prototype.setDesc = function (value) {
        for (var i = 1; i < 6; i++) {
            this["_txt" + i].text = LangCVO.getContent("SysPrivilege" + value + i);
        }
    };
    Sysprivilege_ExperienceView.prototype.addEvent = function () {
        this._okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseHandler, this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        _super.prototype.addEvent.call(this);
    };
    Sysprivilege_ExperienceView.prototype.removeEvent = function () {
        this._okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseHandler, this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    Sysprivilege_ExperienceView.prototype.onTouchCloseHandler = function () {
        if (this._type == 1) {
            Manager.control.getSysPrivilege().experience();
        }
        else {
            Manager.view.show(73 /* SysPrivilegePane */);
        }
        Manager.view.hide(156 /* Sysprivilege_ExperienceView */);
    };
    Sysprivilege_ExperienceView.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
        if (!this.visible)
            this.visible = true;
    };
    Sysprivilege_ExperienceView.prototype.show = function (value) {
        this._type = value;
        Manager.layer.tipsLayer.addChild(this);
    };
    Sysprivilege_ExperienceView.prototype.hide = function () {
        this.dispose();
    };
    Sysprivilege_ExperienceView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.disposes(this._okBtn);
        Manager.pool.push(this._okImg);
        Manager.pool.push(this._bgBit);
        Manager.pool.push(this._bg2Bit);
        for (var i = 1; i < 8; i++) {
            Manager.pool.push(this["_img" + i]);
            if (i < 6) {
                this["_txt" + i].dispose();
            }
        }
        this._okBtn = null;
        this._okImg = null;
        this._img1 = null;
        this._img2 = null;
        this._img3 = null;
        this._img4 = null;
        this._img5 = null;
        this._img6 = null;
        this._img7 = null;
        this._txt1 = null;
        this._txt2 = null;
        this._txt3 = null;
        this._txt4 = null;
        this._txt5 = null;
        this._bgBit = null;
        this._bg2Bit = null;
    };
    return Sysprivilege_ExperienceView;
}(Sprite));
__reflect(Sysprivilege_ExperienceView.prototype, "Sysprivilege_ExperienceView");
//# sourceMappingURL=Sysprivilege_ExperienceView.js.map