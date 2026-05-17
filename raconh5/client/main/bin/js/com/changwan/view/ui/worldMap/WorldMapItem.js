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
 * luzhihong
 * create 2017-11-01
 */
var WorldMapItem = /** @class */ (function (_super) {
    __extends(WorldMapItem, _super);
    function WorldMapItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("worldMap", "WorldMapItemSkin");
        return _this;
    }
    WorldMapItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.addEvent();
    };
    WorldMapItem.prototype.dataChanged = function () {
        this._cvo = this.data;
        if (this._cvo == null)
            return;
        this._txtName.text = this._cvo.name;
        //var verseInfo:TaskSectionCvoInfo = TaskCVO.getVerselInfo(this._cvo.chapter);
        this._txtOpen.text = LangCVO.getContent("worldMap2", this._cvo.chapter);
        this.onEnterMap();
    };
    WorldMapItem.prototype.addEvent = function () {
        // this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        // GameDispatcher.getInstance().addEventListener(GlobalEvent.ENTER_SCENE, this.onEnterMap, this);
    };
    WorldMapItem.prototype.removeEvent = function () {
        // this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        // GameDispatcher.getInstance().addEventListener(GlobalEvent.ENTER_SCENE, this.onEnterMap, this);
    };
    // private onClickHandler(e:egret.TouchEvent):void
    // {
    //     if(this._cvo.id == Manager.model.getMap().getId()) return;
    //     Manager.control.getMap().cmdEnterMap(this._cvo.id);
    //     Manager.view.hide(ViewID.MapPanel);
    // }
    WorldMapItem.prototype.onEnterMap = function (e) {
        if (e === void 0) { e = null; }
        var curVerseMapID = Manager.model.getTask().curVerseMapID;
        if (this._cvo.id == curVerseMapID) {
            this._labelHook.visible = true;
            this._icon.source = "world_icon_boss_png";
            this._back.source = "common_wordBg_selected_png";
            this._txtName.textColor = this._txtOpen.textColor = 0x7C6E62;
        }
        else if (this._cvo.id < curVerseMapID) {
            this._labelHook.visible = false;
            this._icon.source = "world_icon_boss_png";
            this._back.source = "common_wordBg_normal_png";
            this._txtName.textColor = this._txtOpen.textColor = 0x7C6E62;
        }
        else {
            this._labelHook.visible = false;
            this._icon.source = "world_icon_lock_png";
            this._back.source = "common_wordBg_disables_png";
            this._txtName.textColor = this._txtOpen.textColor = 0x666666;
        }
    };
    WorldMapItem.prototype.dispose = function () {
        this.removeEvent();
        _super.prototype.dispose.call(this);
        this._cvo = null;
        this._back.parent.removeChild(this._back);
        this._back = null;
        this._icon.parent.removeChild(this._icon);
        this._icon = null;
        this._labelHook.parent.removeChild(this._labelHook);
        this._labelHook = null;
        this._txtName.dispose();
        this._txtName = null;
        this._txtOpen.dispose();
        this._txtOpen = null;
    };
    return WorldMapItem;
}(ItemRenderer));
//# sourceMappingURL=WorldMapItem.js.map