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
 * 盟主战匹配
 */
var ClubLeaderWarMatchingView = /** @class */ (function (_super) {
    __extends(ClubLeaderWarMatchingView, _super);
    function ClubLeaderWarMatchingView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("clubLeaderWar", "ClubLeaderWarMatchingViewSkin");
        _this.visible = false;
        _this.touchChildren = true;
        return _this;
    }
    ClubLeaderWarMatchingView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.visible = true;
        this._sp = new egret.Sprite();
        this._sp.graphics.beginFill(0, 1);
        this._sp.graphics.drawRect(0, 0, this._items.width, this._items.height);
        this._sp.graphics.endFill();
        this._sp.x = this._items.x;
        this._sp.y = this._items.y;
        this._items.parent.addChild(this._sp);
        this._items.mask = this._sp;
        this._itemList = [];
        for (var i = 0; i < ClubLeaderWarMatchingView.ITEM_NUMS; i++) {
            var item = new ClubLeaderWarMatchingItem();
            item.y = i * ClubLeaderWarMatchingView.ITEM_HEIGHT;
            this._items.addChild(item);
            this._itemList.push(item);
        }
        this.onResizeHandler();
    };
    ClubLeaderWarMatchingView.prototype.initData = function () {
        this._data = [];
        for (var i = 0; i < 9; i++) {
            this._data.push(LangCVO.getContent("clubLeaderWar1" + (i + 1)));
        }
        this._stopIndex = 0;
        this._isStop = false;
        var local = 0;
        for (var i = 0; i < this._itemList.length; i++) {
            this._dataLocal = local;
            if (this._dataLocal >= this._data.length) {
                local = 0;
                this._dataLocal = local;
            }
            this._itemList[i].setValue(this._data[this._dataLocal]);
            local += 1;
        }
        Manager.render.add(this.run, this, ClubLeaderWarMatchingView.ITEM_MOVE_FRAME1);
        if (this._showType == ClubLeaderWarMatchingView.TYPE_CLUB_LEADER_WAR)
            Manager.render.add(this.stop, this, ClubLeaderWarMatchingView.STOP_TIME);
    };
    ClubLeaderWarMatchingView.prototype.run = function () {
        for (var i = 0; i < this._itemList.length; i++) {
            this._itemList[i].y -= ClubLeaderWarMatchingView.ITEM_MOVE_STEP;
            if (this._itemList[i].y <= -ClubLeaderWarMatchingView.ITEM_HEIGHT) {
                this._itemList[i].y = ClubLeaderWarMatchingView.ITEM_HEIGHT * (ClubLeaderWarMatchingView.ITEM_NUMS - 1);
                this._dataLocal += 1;
                if (this._dataLocal >= this._data.length)
                    this._dataLocal = 0;
                this._itemList[i].dataIndex = this._dataLocal;
                this._itemList[i].setValue(this._data[this._dataLocal]);
            }
            if (this._isStop) {
                if (this._itemList[i].dataIndex == this._stopIndex && this._itemList[i].y == ClubLeaderWarMatchingView.ITEM_HEIGHT * 2) {
                    Manager.render.remove(this.run, this);
                    if (this._showType == ClubLeaderWarMatchingView.TYPE_CLUB_LEADER_WAR)
                        Manager.render.add(this.waitClose, this, ClubLeaderWarMatchingView.CLOSE_VIEW_TIME);
                    else if (this._showType == ClubLeaderWarMatchingView.TYPE_FIRE_EYE)
                        Manager.render.add(this.waitCloseII, this, 1000);
                    this._isStop = false;
                }
            }
        }
    };
    ClubLeaderWarMatchingView.prototype.stop = function () {
        this._isStop = true;
        Manager.render.remove(this.stop, this);
        Manager.render.remove(this.run, this);
        if (this._showType == ClubLeaderWarMatchingView.TYPE_FIRE_EYE) {
            this._stopIndex = Math.floor(this._itemList.length * Math.random());
        }
        Manager.render.add(this.run, this, ClubLeaderWarMatchingView.ITEM_MOVE_FRAME2);
    };
    ClubLeaderWarMatchingView.prototype.waitClose = function () {
        Manager.control.getClubLeaderWar().matchingQuery();
        Manager.render.remove(this.waitClose, this);
        Manager.view.hide(105 /* ClubLeaderWarMatchingView */);
        // Manager.layer.panelDarkLayer.visible = false;
        // Manager.layer.uiLayer.visible = false;
        // Manager.layer.effectLayer.visible = false;
        Manager.view.hide(38 /* ClubPanel */);
        ObjectUtil.remove(Manager.layer.panelDarkLayer);
        ObjectUtil.remove(Manager.layer.uiLayer);
        ObjectUtil.remove(Manager.layer.effectLayer);
    };
    /**火眼金睛匹配成功 */
    ClubLeaderWarMatchingView.prototype.waitCloseII = function () {
        Manager.link.link(LinkType.PANEL_FIRE_EYE, 1);
        Manager.render.remove(this.waitCloseII, this);
        Manager.view.hide(105 /* ClubLeaderWarMatchingView */);
    };
    ClubLeaderWarMatchingView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    ClubLeaderWarMatchingView.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    ClubLeaderWarMatchingView.prototype.onResizeHandler = function (e) {
        this.width = Manager.global.gameMain.stage.stageWidth;
    };
    ClubLeaderWarMatchingView.prototype.show = function (type) {
        if (type === void 0) { type = ClubLeaderWarMatchingView.TYPE_CLUB_LEADER_WAR; }
        this._showType = type;
        Manager.layer.tipsLayer.addChild(this);
    };
    ClubLeaderWarMatchingView.prototype.hide = function () {
        this.dispose();
    };
    ClubLeaderWarMatchingView.prototype.dispose = function () {
        Manager.render.remove(this.run, this);
        Manager.render.remove(this.stop, this);
        Manager.render.remove(this.waitClose, this);
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._items, this._sp);
        this._data = null;
        this._items = null;
        if (this._itemList) {
            for (var i = 0; i < this._itemList.length; i++) {
                this._itemList[i].dispose();
                this._itemList[i] = null;
            }
            this._itemList = null;
        }
        this._sp = null;
    };
    /**内容高度 */
    ClubLeaderWarMatchingView.ITEM_HEIGHT = 50;
    /**内容数量 */
    ClubLeaderWarMatchingView.ITEM_NUMS = 6;
    /**内容移动间距 */
    ClubLeaderWarMatchingView.ITEM_MOVE_STEP = 5;
    /**内容移动帧间隔 */
    ClubLeaderWarMatchingView.ITEM_MOVE_FRAME1 = 5;
    ClubLeaderWarMatchingView.ITEM_MOVE_FRAME2 = 20;
    /**滚动停止时间 */
    ClubLeaderWarMatchingView.STOP_TIME = 2000;
    /**关闭界面时间 */
    ClubLeaderWarMatchingView.CLOSE_VIEW_TIME = 2000;
    ClubLeaderWarMatchingView.TYPE_CLUB_LEADER_WAR = 1;
    ClubLeaderWarMatchingView.TYPE_FIRE_EYE = 2;
    return ClubLeaderWarMatchingView;
}(UIComponent));
//# sourceMappingURL=ClubLeaderWarMatchingView.js.map