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
 * 世界地图面板
 * luzhihong
 * create 2017-11-01
 */
var MapPanel = /** @class */ (function (_super) {
    __extends(MapPanel, _super);
    function MapPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("worldMap", "MapSkin");
        return _this;
    }
    MapPanel.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.basePanel.setBottomBackTop(1200);
        this.basePanel.title = "world_title_png";
        var btnDatas = [
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "world_btn_world_png", imgClick: "world_btn_world_png" }
        ];
        this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, btnDatas);
        this.basePanel.scrollerList.itemList.layout.gap = 0;
        // 填充数据
        var cvos = MapCVO.getCVOsByType(MapConst.TYPE_FIELD);
        this._contentList.initBtnListData(WorldMapItem, cvos, true);
        this._contentList.itemList.layout.gap = -5;
        //定位
        var curVerseMapID = Manager.model.getTask().curVerseMapID;
        var index = 0;
        for (index = 0; index < cvos.length; index++) {
            if (cvos[index].id == curVerseMapID)
                break;
        }
        this._contentList.scroller.validateNow();
        var differ = index * 142 - 400;
        // if(differ > 0) this._contentList.scroller.viewport.scrollV = differ;
        this._tempTime = egret.setTimeout(this.delayMove, this, 150, differ);
    };
    MapPanel.prototype.delayMove = function (differ) {
        if (differ > 0)
            this._contentList.scroller.viewport.scrollV = differ;
    };
    MapPanel.prototype.onClickHandler = function (e) {
        _super.prototype.onClickHandler.call(this, e);
        switch (e.currentTarget) {
            case this.basePanel.closeBtn:
            case this.basePanel.backBtn:
                Manager.view.hide(15 /* MapPanel */);
                break;
        }
    };
    MapPanel.prototype.onFuncBtnChangeHandler = function (e) {
        _super.prototype.onFuncBtnChangeHandler.call(this, e);
        var index = this.basePanel.scrollerList.itemList.selectedIndex;
        if (index == -1)
            return;
        // switch(index)
        // {
        // 	case 0:
        // 		break;
        // 	case 1:
        // 		break;
        // 	case 2:
        // 		break;
        // 	case 3:
        // 		break;
        // }
    };
    MapPanel.prototype.dispose = function () {
        egret.clearTimeout(this._tempTime);
        _super.prototype.dispose.call(this);
    };
    return MapPanel;
}(Panel));
//# sourceMappingURL=MapPanel.js.map