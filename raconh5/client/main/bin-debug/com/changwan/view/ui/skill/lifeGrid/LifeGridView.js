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
 * 命格界面
 * pzx
 * create 2017-12-21
*/
var LifeGridView = (function (_super) {
    __extends(LifeGridView, _super);
    function LifeGridView() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("lifeGrid", "LifeGridViewSkin");
        return _this;
    }
    LifeGridView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        if (!this._bg) {
            this._bg = Manager.pool.create(BitmapRemote);
            this._bg.x = 5;
            this._bg.y = 118;
            this._bg.load(PathInfo.getPath("res/common/common_back4.png", LoaderType.IMAGE), 710, 223);
            this.addChildAt(this._bg, 0);
        }
        LifeGridView.view = this;
        this._bgImg.load(Manager.path.getPanelLifeGridPath("lifeGrid_ditu.jpg", "", LoaderType.IMAGE));
    };
    LifeGridView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._funList.itemList.addEventListener(eui.UIEvent.CHANGE, this.onFunSelectHandler, this);
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onIconShowHandler, this);
        Manager.model.getCopy().towerModel.addEventListener(CopyEvent.UPDATE_TOWER_INFO, this.onIconShowHandler, this);
        Manager.model.getLifeGrid().addEventListener(LifeGridEvent.LIFEGRID_UPDATE_FREECD_EVENT, this.onIconShowHandler, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.SOUL, this.onIconShowHandler, this);
    };
    LifeGridView.prototype.removeEvent = function () {
        this._funList.itemList.removeEventListener(eui.UIEvent.CHANGE, this.onFunSelectHandler, this);
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onIconShowHandler, this);
        Manager.model.getCopy().towerModel.removeEventListener(CopyEvent.UPDATE_TOWER_INFO, this.onIconShowHandler, this);
        Manager.model.getLifeGrid().removeEventListener(LifeGridEvent.LIFEGRID_UPDATE_FREECD_EVENT, this.onIconShowHandler, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.SOUL, this.onIconShowHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    LifeGridView.prototype.setPromptSign = function (index) {
        if (this._funList) {
            var dis = this._funList.itemList.getElementAt(index);
            return dis;
        }
        return null;
    };
    LifeGridView.prototype.onIconShowHandler = function (e) {
        var btn;
        if (e.type == GameObjectAttrEvent.SOUL || e.type == ItemsEvent.ITEM_UPDATE_EVENT || e.type == CopyEvent.UPDATE_TOWER_INFO) {
            btn = this.setPromptSign(0);
            var boo = Manager.model.getLifeGrid().isUpgrade() || Manager.model.getLifeGrid().getIsAware() || Manager.model.getLifeGrid().getIsSenior();
            if (btn)
                btn.showRedIcon(boo);
            var fejjieBoo = Manager.model.getItems().checkLifeGridBagAmple() || Manager.model.getLifeGrid().checkSeparate();
            btn = this.setPromptSign(1);
            if (btn)
                btn.showRedIcon(fejjieBoo);
        }
        if (e.type == LifeGridEvent.LIFEGRID_UPDATE_FREECD_EVENT) {
            btn = this.setPromptSign(3);
            if (btn)
                btn.showRedIcon(Manager.model.getLifeGrid().isFree());
        }
    };
    LifeGridView.prototype.initData = function () {
        _super.prototype.initData.call(this);
    };
    LifeGridView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawLayout();
    };
    LifeGridView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.LAYOUT))
            this.drawLayout();
    };
    LifeGridView.prototype.drawLayout = function () {
        var boo1 = Manager.model.getLifeGrid().isUpgrade() || Manager.model.getLifeGrid().getIsAware() || Manager.model.getLifeGrid().getIsSenior();
        var lieming = Manager.model.getLifeGrid().isFree();
        var fejjieBoo = Manager.model.getLifeGrid().checkSeparate() || Manager.model.getItems().checkLifeGridBagAmple();
        if (!this._menuBtnContent) {
            this._menuBtnContent = [
                { typeImg: "lifeGrid_mingge1_png", redShow: boo1 },
                { typeImg: "lifeGrid_fenjie_png", redShow: fejjieBoo },
                { typeImg: "lifeGrid_duihuan_png" },
                { typeImg: "lifeGrid_lieming_png", redShow: lieming }
            ];
        }
        this._funList.initBtnListData(DressTypeBtn, this._menuBtnContent);
        this._funList.itemList.layout.gap = 13;
    };
    LifeGridView.prototype.onFunSelectHandler = function (e) {
        var index = this._funList.itemList.selectedIndex;
        if (index == -1)
            return;
        if (this._curView) {
            this._curView.dispose();
            this._curView = null;
        }
        switch (index) {
            case LifeGridType.LIFEGRID:
                this._panel.title = "lifeGrid_mg_png";
                this._panel.setBottomBackTop(1280);
                this._curView = Manager.pool.create(LifeGridContainer);
                this._bgImg.visible = true;
                var str = "bodydz" + Manager.model.self.attrInfo.career + "001";
                if (this._bodydzAni == null) {
                    this._bodydzAni = Manager.animation.createPanelLifeGridAnimation(str);
                    this.addChild(this._bodydzAni);
                    this._bodydzAni.x = -35;
                    this._bodydzAni.y = 330;
                    this._dazuoAni = Manager.animation.createPanelLifeGridAnimation("lifeGriddazuo");
                    this.addChild(this._dazuoAni);
                    this._dazuoAni.x = 215;
                    this._dazuoAni.y = 650;
                }
                this._bodydzAni.visible = true;
                this._bodydzAni.play();
                this._dazuoAni.visible = true;
                this._dazuoAni.play();
                break;
            case LifeGridType.RESOLVE:
                this._panel.title = "lifeGrid_fj_png";
                this._panel.setBottomBackTop(982);
                this._bgImg.visible = false;
                this._bodydzAni.visible = false;
                this._bodydzAni.stop();
                this._curView = Manager.pool.create(LifeGridSeparate);
                this._dazuoAni.visible = false;
                this._dazuoAni.stop();
                break;
            case LifeGridType.BUY:
                this._panel.title = "common_dh_png";
                this._panel.setBottomBackTop(982);
                this._bgImg.visible = false;
                this._bodydzAni.visible = false;
                this._bodydzAni.stop();
                this._curView = Manager.pool.create(LifeGridBuy, this);
                this._dazuoAni.visible = false;
                this._dazuoAni.stop();
                break;
            case LifeGridType.HUNT:
                this._panel.title = "lifeGrid_lm_png";
                this._panel.setBottomBackTop(1280);
                this._bgImg.visible = true;
                this._bodydzAni.visible = true;
                this._bodydzAni.play();
                this._curView = Manager.pool.create(LifeGridHunt);
                this._dazuoAni.visible = true;
                this._dazuoAni.play();
                break;
        }
        if (this._curView && !this._curView.parent)
            this.addChild(this._curView);
    };
    LifeGridView.prototype.setTap = function (index) {
        this._funList.itemList.selectedIndex = index;
        this.onFunSelectHandler(null);
    };
    LifeGridView.prototype.reuse = function (baePanel) {
        _super.prototype.reuse.call(this);
        this._panel = baePanel;
        this._funList.itemList.selectedIndex = LifeGridType.LIFEGRID;
        this.onFunSelectHandler(null);
    };
    LifeGridView.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this._funList.dispose();
        this._funList = null;
        this._menuBtnContent.length = 0;
        this._menuBtnContent = null;
        this._curView.dispose();
        this._curView = null;
    };
    LifeGridView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        LifeGridView.view = null;
        ObjectUtil.removes(this._bg);
        if (this._bg)
            Manager.pool.push(this._bg);
        this._bg = null;
        Manager.pool.push(this._bgImg);
        this._bgImg = null;
        this._funList.dispose();
        this._funList = null;
        this._menuBtnContent.length = 0;
        this._menuBtnContent = null;
        this._panel = null;
        if (this._curView) {
            this._curView.dispose();
            this._curView = null;
        }
        if (this._bodydzAni) {
            this.removeChild(this._bodydzAni);
            Manager.pool.push(this._bodydzAni);
            this._bodydzAni = null;
        }
        if (this._dazuoAni) {
            this.removeChild(this._dazuoAni);
            Manager.pool.push(this._dazuoAni);
            this._dazuoAni = null;
        }
    };
    return LifeGridView;
}(UIComponent));
__reflect(LifeGridView.prototype, "LifeGridView");
//# sourceMappingURL=LifeGridView.js.map