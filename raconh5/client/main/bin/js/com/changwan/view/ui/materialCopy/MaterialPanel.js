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
 * 缥缈录
 * Simon
 * 2018.3.14
 */
var MaterialPanel = /** @class */ (function (_super) {
    __extends(MaterialPanel, _super);
    function MaterialPanel() {
        var _this = _super.call(this) || this;
        _this._isMoving = false;
        _this._isRemoveItem = false;
        _this.skinName = Manager.path.getSkinName("material", "MaterialPanelSkin");
        return _this;
    }
    MaterialPanel.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._model = Manager.model.getMaterialCopy();
        this._mapGroup.touchEnabled = false;
        this._itemGroup.touchEnabled = false;
        this.basePanel.title = "material_title_png";
        if (!this._mapView) {
            this._mapView = new MaterialMapView(this);
            this._mapView.anchorOffsetX = Math.round(MaterialMapView.MAPIMG_WIDTH / 2);
            this._mapView.anchorOffsetY = MaterialMapView.MAPIMG_HEIGHT + 700;
            this._mapView.x = Math.round(this.width / 2);
            this._mapView.y = MaterialMapView.MAPIMG_HEIGHT + 780;
            this._mapGroup.addChild(this._mapView);
        }
        this._mapGroup.mask = new egret.Rectangle(5, 118, 712, 1157);
        this._itemGroup.mask = new egret.Rectangle(5, 118, 712, 1157);
        this._itemLocalList = [
            MaterialPanel.ITEMS_LOCAL_LIST1,
            MaterialPanel.ITEMS_LOCAL_LIST2,
            MaterialPanel.ITEMS_LOCAL_LIST1,
            MaterialPanel.ITEMS_LOCAL_LIST2
        ];
        this._noUseItemList = [];
        for (var i = 0; i < 2; i++) {
            var item = new MaterialCheckPointItem();
            item.x = 670;
            item.y = 380 + i * 300;
            this._noUseItemList.push(item);
        }
        var value = "<font color='" + Color.RED_STR + "'>0/0</font>";
        HtmlUtil.setTextFlow(this._star, value);
    };
    MaterialPanel.prototype.initData = function () {
        _super.prototype.initData.call(this);
        Manager.control.getMaterialCopy().getAwardCell();
    };
    MaterialPanel.prototype.onMapLoadComplete = function () {
        this.initItem();
        this.playInitAnimation();
        this.updateItemInfo();
    };
    /**初始化大关卡项 */
    MaterialPanel.prototype.initItem = function () {
        this._itemList = [];
        var list = this._itemLocalList[0];
        for (var i = 0; i < list.length; i++) {
            var item = new MaterialCheckPointItem();
            item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickItemHandler, this);
            this._itemList.push(item);
        }
    };
    /**播放初始化动画 */
    MaterialPanel.prototype.playInitAnimation = function () {
        this._isRemoveItem = true;
        var recommendCell = this._model.getRecommendCell();
        if (recommendCell != 0) {
            var localPage = Math.ceil(recommendCell / MaterialPanel.ITEM_COUNT);
            this._curRotation = 24 - (localPage - 1) * 12;
            this._curIndex = localPage - 1;
        }
        else {
            this._curRotation = 24;
            this._curIndex = 0;
        }
        this._mapView.rotation = this._curRotation - 12;
        if (this._mapView.rotation < -12)
            this._mapView.rotation = -12;
        this._isMoving = true;
        if (this._isMove && this._mapView.rotation != this._curRotation)
            egret.Tween.get(this._mapView).to({ rotation: this._curRotation }, 1000).call(this.onTouchComplete, this);
        else {
            this._mapView.rotation = this._curRotation;
            this.onTouchComplete();
        }
    };
    MaterialPanel.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._box.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._mapView.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginTouchHandler, this);
        this._model.addEventListener(MaterialEvent.MATERIAL_GET_AWARD_CELL, this.onGetAwardCellUpdateHandler, this);
    };
    MaterialPanel.prototype.removeEvent = function () {
        this._box.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._mapView.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginTouchHandler, this);
        this._mapView.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveHandler, this);
        this._mapView.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEndTouchHandler, this);
        this._mapView.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEndTouchHandler, this);
        this._model.removeEventListener(MaterialEvent.MATERIAL_GET_AWARD_CELL, this.onGetAwardCellUpdateHandler, this);
        if (this._itemList) {
            for (var i = 0; i < this._itemList.length; i++) {
                this._itemList[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickItemHandler, this);
            }
        }
        _super.prototype.removeEvent.call(this);
    };
    MaterialPanel.prototype.onClickHandler = function (e) {
        switch (e.currentTarget) {
            case this.basePanel.backBtn:
                break;
            case this.basePanel.closeBtn:
                Manager.view.hide(128 /* MaterialPanel */);
                break;
            case this._box:
                if (this._model.getAwardId != MaterialCopyDataCVO.MAX_ID)
                    Manager.view.show(133 /* MaterialGetBoxView */);
                break;
        }
    };
    MaterialPanel.prototype.onClickItemHandler = function (e) {
        var index = this._itemList.indexOf(e.currentTarget);
        if (index == -1)
            return;
        //正在缥缈录引导中
        if (Manager.model.getGuide().curID == GuideID.MATERIAL) {
            if (this._suggestInex != index)
                Manager.control.getTask().hideGuide();
            else
                this._notRemoveGuide = true;
        }
        Manager.view.show(129 /* MaterialSecondView */, (index + 1) + this._curIndex * MaterialPanel.ITEM_COUNT);
        Manager.view.hide(128 /* MaterialPanel */);
    };
    MaterialPanel.prototype.onBeginTouchHandler = function (e) {
        if (this._isMoving)
            return;
        this._beginPoint = e.stageX;
        this._mapView.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginTouchHandler, this);
        this._mapView.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveHandler, this);
        this._mapView.addEventListener(egret.TouchEvent.TOUCH_END, this.onEndTouchHandler, this);
        this._mapView.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEndTouchHandler, this);
    };
    MaterialPanel.prototype.onMoveHandler = function (e) {
        var offset = this._beginPoint - e.stageX;
        var tmpRotation = this._curRotation - (offset / 720 * 16);
        if (tmpRotation < -24)
            tmpRotation = -24;
        else if (tmpRotation > 24)
            tmpRotation = 24;
        if (Math.abs(tmpRotation - this._curRotation) > 0.8 && !this._isRemoveItem) {
            this._isRemoveItem = true;
            this.removeItems();
        }
        this._mapView.rotation = tmpRotation;
    };
    MaterialPanel.prototype.onEndTouchHandler = function (e) {
        this._mapView.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginTouchHandler, this);
        this._mapView.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveHandler, this);
        this._mapView.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEndTouchHandler, this);
        this._mapView.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEndTouchHandler, this);
        if (this._mapView.rotation >= 16) {
            this._curRotation = 24;
            this._curIndex = 0;
        }
        else if (this._mapView.rotation < 16 && this._mapView.rotation >= 0) {
            this._curRotation = 8;
            this._curIndex = 1;
        }
        else if (this._mapView.rotation < 0 && this._mapView.rotation >= -16) {
            this._curRotation = -8;
            this._curIndex = 2;
        }
        else if (this._mapView.rotation < -16) {
            this._curRotation = -24;
            this._curIndex = 3;
        }
        if (this._mapView.rotation != this._curRotation) {
            this._isMoving = true;
            egret.Tween.get(this._mapView).to({ rotation: this._curRotation }, 200).call(this.onTouchComplete, this);
        }
    };
    MaterialPanel.prototype.onTouchComplete = function () {
        egret.Tween.removeTweens(this._mapView);
        this._isMoving = false;
        if (this._isRemoveItem) {
            this._isRemoveItem = false;
            this.showItems();
            this.updateItemInfo();
        }
    };
    MaterialPanel.prototype.showItems = function () {
        for (var i = 0; i < this._itemList.length; i++) {
            if (this._itemList[i]) {
                this._itemList[i].x = this._itemLocalList[this._curIndex][i].x;
                this._itemList[i].y = this._itemLocalList[this._curIndex][i].y;
                this._itemList[i].redIcon.visible = false;
                this._itemGroup.addChild(this._itemList[i]);
            }
        }
        if (this._curIndex < 3) {
            for (var i = 0; i < this._noUseItemList.length; i++) {
                if (this._noUseItemList[i])
                    this._itemGroup.addChild(this._noUseItemList[i]);
            }
        }
        var isShowRedIcon = false;
        for (var i = 0; i < this._itemList.length; i++) {
            var id = (i * MaterialCopyModel.CELL_MAX_COUNT + 1) + this._curIndex * MaterialPanel.ITEM_COUNT * MaterialCopyModel.CELL_MAX_COUNT;
            var cvo = MaterialCopyCVO.getCellInfo(id);
            if (cvo) {
                this._itemList[i].name = cvo.name;
                this._itemList[i].star = 0;
                if (!isShowRedIcon) {
                    var list = this._model.passList[cvo.type1];
                    for (var j = id; j < id + 3; j++) {
                        if (list.indexOf(j) == -1) {
                            var info = MaterialCopyCVO.getCellInfo(j);
                            if (info) {
                                isShowRedIcon = Manager.model.self.attrInfo.fight >= info.fight && Manager.model.self.attrInfo.level >= info.conds.value;
                                this._itemList[i].redIcon.visible = isShowRedIcon;
                                break;
                            }
                        }
                    }
                }
                else
                    this._itemList[i].redIcon.visible = false;
                if (this._model.getPassCellByType(cvo.type1) > 0) {
                    for (var j = id + 14; j >= id; j--) {
                        if (j <= this._model.getPassCellByType(cvo.type1)) {
                            var info = MaterialCopyCVO.getCellInfo(j);
                            if (info)
                                this._itemList[i].star = info.star;
                            break;
                        }
                    }
                }
            }
            else {
                if (this._itemList[i] && this._itemList[i].parent)
                    this._itemList[i].parent.removeChild(this._itemList[i]);
            }
        }
    };
    MaterialPanel.prototype.removeItems = function () {
        for (var i = 0; i < this._itemList.length; i++) {
            if (this._itemList[i] && this._itemList[i].parent)
                this._itemList[i].parent.removeChild(this._itemList[i]);
        }
        for (var i = 0; i < this._noUseItemList.length; i++) {
            if (this._noUseItemList[i] && this._noUseItemList[i].parent)
                this._noUseItemList[i].parent.removeChild(this._noUseItemList[i]);
        }
    };
    MaterialPanel.prototype.updateItemInfo = function () {
        var type = this._model.getCommendItem();
        if (type != 0) {
            for (var i = 0; i < this._itemList.length; i++) {
                var id = (i + 1) + this._curIndex * MaterialPanel.ITEM_COUNT;
                if (type == id) {
                    this._itemList[i].showTuijian = true;
                    //引导
                    if (Manager.model.getGuide().curID == GuideID.MATERIAL && this._itemList[i].parent != null) {
                        this._suggestInex = i;
                        var pos = this._itemList[i].parent.localToGlobal(this._itemList[i].x, this._itemList[i].y);
                        Manager.control.getTask().showGuide(pos, this._itemList[i].width >> 1, this._itemList[i].height >> 1, this.guideCB, this, false);
                    }
                }
                else
                    this._itemList[i].showTuijian = false;
            }
        }
    };
    MaterialPanel.prototype.onGetAwardCellUpdateHandler = function (e) {
        var color;
        var value;
        var nextInfo = MaterialCopyDataCVO.getInfo(this._model.getAwardId + 1);
        this._redIcon.visible = false;
        if (nextInfo) {
            if (this._model.curStar >= nextInfo.star) {
                color = Color.WHITE_STR;
                this._redIcon.visible = true;
            }
            else
                color = Color.RED_STR;
            value = "<font color='" + color + "'>" + this._model.curStar + "/" + nextInfo.star + "</font>";
            this._getAll.visible = false;
        }
        else {
            color = Color.WHITE_STR;
            value = "<font color='" + color + "'>" + this._model.curStar + "/" + this._model.curStar + "</font>";
            this._getAll.visible = true;
        }
        HtmlUtil.setTextFlow(this._star, value);
    };
    MaterialPanel.prototype.guideCB = function () {
        this._notRemoveGuide = true;
        Manager.view.show(129 /* MaterialSecondView */, (this._suggestInex + 1) + this._curIndex * MaterialPanel.ITEM_COUNT);
        Manager.view.hide(128 /* MaterialPanel */);
    };
    MaterialPanel.prototype.show = function (tabIndex, isMove) {
        if (tabIndex === void 0) { tabIndex = 0; }
        if (isMove === void 0) { isMove = true; }
        this._isMove = isMove;
        _super.prototype.show.call(this, tabIndex);
    };
    MaterialPanel.prototype.dispose = function () {
        egret.Tween.removeTweens(this._mapView);
        if (!this._notRemoveGuide && Manager.model.getGuide().curID == GuideID.MATERIAL)
            Manager.control.getTask().hideGuide();
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._mapGroup, this._mapView, this._itemGroup, this._box, this._star, this._getAll, this._redIcon);
        this._mapGroup = null;
        if (this._mapView)
            this._mapView.dispose();
        this._mapView = null;
        this._itemGroup = null;
        this._box = null;
        if (this._star)
            this._star.dispose();
        this._star = null;
        this._getAll = null;
        this._redIcon = null;
        if (this._itemList) {
            for (var i = 0; i < this._itemList.length; i++) {
                this._itemList[i].dispose();
                this._itemList[i] = null;
            }
            this._itemList = null;
        }
        this._itemLocalList = null;
        if (this._noUseItemList) {
            for (var i = 0; i < this._noUseItemList.length; i++) {
                this._noUseItemList[i].dispose();
                this._noUseItemList[i] = null;
            }
            this._noUseItemList = null;
        }
        this._model = null;
        this._suggestInex = -1;
        this._notRemoveGuide = false;
    };
    /**每页显示大关数 */
    MaterialPanel.ITEM_COUNT = 13;
    MaterialPanel.ITEMS_LOCAL_LIST1 = [
        new egret.Point(50, 280), new egret.Point(270, 370), new egret.Point(500, 250),
        new egret.Point(110, 500), new egret.Point(410, 470), new egret.Point(540, 520),
        new egret.Point(60, 700), new egret.Point(300, 740), new egret.Point(480, 720),
        new egret.Point(70, 1000), new egret.Point(230, 950), new egret.Point(410, 1000), new egret.Point(600, 900)
    ];
    MaterialPanel.ITEMS_LOCAL_LIST2 = [
        new egret.Point(110, 280), new egret.Point(410, 370), new egret.Point(540, 250),
        new egret.Point(50, 500), new egret.Point(270, 470), new egret.Point(500, 520),
        new egret.Point(70, 700), new egret.Point(230, 740), new egret.Point(410, 720),
        new egret.Point(60, 1000), new egret.Point(300, 950), new egret.Point(480, 1000), new egret.Point(600, 970)
    ];
    return MaterialPanel;
}(Panel));
//# sourceMappingURL=MaterialPanel.js.map