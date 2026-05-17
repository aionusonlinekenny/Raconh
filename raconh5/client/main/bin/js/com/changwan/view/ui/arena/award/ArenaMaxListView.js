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
 *author Anydo
 *create 2018-1-5
 *description
*/
var ArenaMaxListView = /** @class */ (function (_super) {
    __extends(ArenaMaxListView, _super);
    function ArenaMaxListView() {
        var _this = _super.call(this) || this;
        _this._needSetScrollH = true;
        _this.skinName = Manager.path.getSkinName("arena", "ArenaMaxListViewSkin");
        _this.touchChildren = true;
        return _this;
    }
    ArenaMaxListView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        var maxCVOs = ArenaMaxRankCVO.cvos;
        this._items = [];
        for (var i = maxCVOs.length - 1; i >= 0; i--) {
            var item = new ArenaMaxListItem();
            item.setCVO(maxCVOs[i]);
            item.x = i * 162;
            item.y = 2;
            this._group.addChild(item);
            this._items.push(item);
        }
        this._scroll.validateNow();
        this._scroll.scrollPolicyV = eui.ScrollPolicy.OFF;
    };
    ArenaMaxListView.prototype.initData = function () {
        // Manager.control.getArena().cmdMaxRankAward(0);
        this.updateGetData();
    };
    ArenaMaxListView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.getArena().addEventListener(ArenaEvent.UPDATE_MAX_RANK_AWARD, this.updateGetData, this);
    };
    ArenaMaxListView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        Manager.model.getArena().removeEventListener(ArenaEvent.UPDATE_MAX_RANK_AWARD, this.updateGetData, this);
    };
    ArenaMaxListView.prototype.updateGetData = function (e) {
        if (e === void 0) { e = null; }
        for (var i = 0; i < this._items.length; i++) {
            this._items[i].updateGetData();
        }
        if (this._needSetScrollH) {
            this._needSetScrollH = false;
            var maxCVOs = ArenaMaxRankCVO.cvos;
            var index = 0;
            for (; index < maxCVOs.length; index++) {
                if (Manager.model.getArena().maxGetedIDs.indexOf(maxCVOs[index].id) == -1)
                    break;
            }
            if (index > maxCVOs.length)
                index = maxCVOs.length;
            var differ = ArenaMaxListItem.WIDTH * index;
            if (differ > (this._scroll.viewport.contentWidth - this._scroll.viewport.width))
                this._scroll.viewport.scrollH = this._scroll.viewport.contentWidth - this._scroll.viewport.width;
            else if (differ < 0)
                this._scroll.viewport.scrollH = 0;
            else
                this._scroll.viewport.scrollH = differ;
        }
    };
    ArenaMaxListView.prototype.clearItems = function () {
        for (var i = 0; i < this._items.length; i++) {
            this._items[i].dispose();
        }
        this._items = [];
    };
    ArenaMaxListView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._scroll.dispose();
        this._scroll = null;
        this.clearItems();
        this._group = null;
    };
    return ArenaMaxListView;
}(UIComponent));
//# sourceMappingURL=ArenaMaxListView.js.map