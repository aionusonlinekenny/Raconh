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
 * 江湖风云
 * luzh
 * 2018-4.20
 */
var StormView = /** @class */ (function (_super) {
    __extends(StormView, _super);
    function StormView() {
        return _super.call(this) || this;
    }
    StormView.prototype.start = function () {
        _super.prototype.start.call(this);
        this._back = Manager.pool.create(BitmapRemote, Manager.path.getStormPath("back.jpg"));
        this._back.y = 115;
        this.addChild(this._back);
        this._items = [];
        var cvos = StormFieldCVO.getCVOs();
        var cvo;
        var item;
        for (var key in cvos) {
            cvo = cvos[key];
            item = ObjectUtil.createObj(StormFieldItem, cvo.id, cvo.pos);
            this.addChild(item);
            this._items.push(item);
        }
        this._infoView = ObjectUtil.createObj(StormInfoView);
        this.addChild(this._infoView);
        this._txt = TextField.create(300, 40, Color.DEF, 26);
        this._txt.move(18, 120);
        this._txt.text = LangCVO.getContent("storm1") + Manager.model.self.attrInfo.guildName;
        this.addChild(this._txt);
    };
    StormView.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
        this.touchChildren = true;
    };
    StormView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.disposes(this._back, this._infoView);
        for (var i = this._items.length - 1; i >= 0; i--) {
            ObjectUtil.dispose(this._items[i]);
        }
        this._back = null;
        this._items = null;
        this._infoView = null;
    };
    return StormView;
}(RenderSprite));
//# sourceMappingURL=StormView.js.map