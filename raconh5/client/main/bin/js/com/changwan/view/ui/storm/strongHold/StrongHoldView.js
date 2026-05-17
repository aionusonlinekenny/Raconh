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
 * 江湖风云区域视图
 * luzh
 * 2018-4.20
 */
var StrongHoldView = /** @class */ (function (_super) {
    __extends(StrongHoldView, _super);
    function StrongHoldView() {
        return _super.call(this) || this;
    }
    StrongHoldView.prototype.start = function () {
        _super.prototype.start.call(this);
        this._back = Manager.pool.create(BitmapRemote);
        this._back.y = 100;
        this.addChild(this._back);
        this._icon1 = BitmapRes.create("storm_icon_1");
        this.addChild(this._icon1);
        this._icon2 = BitmapRes.create("storm_icon_2");
        this.addChild(this._icon2);
        this._icon3 = BitmapRes.create("storm_icon_3");
        this.addChild(this._icon3);
        this._items = [];
        var item;
        for (var i = 0; i < 7; i++) {
            item = ObjectUtil.createObj(StrongHoldItem);
            this.addChild(item);
            this._items.push(item);
        }
        this._infoView = ObjectUtil.createObj(StormInfoView);
        this.addChild(this._infoView);
    };
    Object.defineProperty(StrongHoldView.prototype, "fieldID", {
        set: function (value) {
            var cvos = StormStrongHoldCVO.getCVOsByFieldID(value);
            for (var i = 0; i < 7; i++) {
                this._items[i].cvo = cvos[i];
            }
        },
        enumerable: true,
        configurable: true
    });
    StrongHoldView.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
        this.touchChildren = true;
    };
    StrongHoldView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.pushes(this._back, this._icon1, this._icon2, this._icon3, this._infoView);
        for (var i = this._items.length - 1; i >= 0; i--) {
            ObjectUtil.dispose(this._items[i]);
        }
        this._back = null;
        this._icon1 = null;
        this._icon2 = null;
        this._icon3 = null;
        this._items = null;
        this._infoView = null;
    };
    return StrongHoldView;
}(RenderSprite));
//# sourceMappingURL=StrongHoldView.js.map