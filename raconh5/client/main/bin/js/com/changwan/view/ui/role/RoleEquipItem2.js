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
var RoleEquipItem2 = /** @class */ (function (_super) {
    __extends(RoleEquipItem2, _super);
    function RoleEquipItem2(pos) {
        var _this = _super.call(this) || this;
        _this._pos = pos;
        _this.touchChildren = false;
        _this.touchEnabled = true;
        _this.start();
        _this.addEvent();
        return _this;
    }
    RoleEquipItem2.prototype.start = function () {
        this._equipItem = Manager.pool.create(EquipItem);
        this._equipItem.width = 141;
        this._equipItem.height = 141;
        this._equipItem.skinName = "BaseGoodsSkin";
        this._equipItem.clear();
        this.addChild(this._equipItem);
        this._addImg = BitmapRes.create("role_add_png", 38, 38, 65, 65);
        this.addChild(this._addImg);
    };
    RoleEquipItem2.prototype.addEvent = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    RoleEquipItem2.prototype.removeEvent = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    RoleEquipItem2.prototype.onClickHandler = function (e) {
        if (this._equipItem && this._equipItem.baseId > 0) {
            Manager.view.show(45 /* EquipTips */, this._equipItem.cvo, this._equipItem._data);
        }
        else {
            var info = Manager.model.getItems().getCanUseBestEquip(this._pos);
            if (info) {
                Manager.control.getItems().moveItems(info.storagetype, ItemsType.EQUIE, info.pos);
            }
        }
    };
    RoleEquipItem2.prototype.dispose = function () {
        if (this.parent != null)
            this.parent.removeChild(this);
        if (this._equipItem != null) {
            Manager.pool.push(this._equipItem);
            this._equipItem = null;
        }
        if (this._addImg != null) {
            Manager.pool.push(this._addImg);
            this._addImg = null;
        }
    };
    RoleEquipItem2.prototype.clear = function () {
        this._equipItem.clear();
        this._equipItem.selected = false;
        this._addImg.visible = true;
    };
    RoleEquipItem2.prototype.updateRoleInfo = function (info) {
        this._equipItem.data = info;
        this._addImg.visible = false;
    };
    return RoleEquipItem2;
}(egret.DisplayObjectContainer));
//# sourceMappingURL=RoleEquipItem2.js.map