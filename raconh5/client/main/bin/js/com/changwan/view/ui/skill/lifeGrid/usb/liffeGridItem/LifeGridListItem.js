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
var LifeGridListItem = /** @class */ (function (_super) {
    __extends(LifeGridListItem, _super);
    function LifeGridListItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("lifeGrid/lifegridview", "LifeGridListItemSkin");
        _this._list = [];
        _this._txtList = [];
        _this._itemInfoList = [];
        return _this;
    }
    LifeGridListItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    LifeGridListItem.prototype.dataChanged = function () {
        var arr = this.data;
        var con = arr[0].condition;
        var condit = new ConditionVO(con);
        this._titleTxt.text = StringUtils.setParam(LangCVO.getContent("lifeGrid4"), condit.value2);
        var ln = arr.length > this._list.length ? arr.length : this._list.length;
        for (var i = 0; i < ln; i++) {
            if (this._list[i] == null) {
                this._list[i] = Manager.pool.create(ItemObject);
                this._list[i].x = i % 4 * 150;
                this._list[i].y = Math.floor(i / 4) * 150 + 50;
                this.addChild(this._list[i]);
            }
            var goods = this._list[i];
            if (this._txtList[i] == null) {
                this._txtList[i] = Manager.pool.create(egret.TextField);
                this._txtList[i].x = goods.x;
                this._txtList[i].y = goods.y + 130;
                this._txtList[i].width = 141;
                this._txtList[i].textAlign = "center";
                this._txtList[i].textColor = 0x7C6E62;
                this._txtList[i].fontFamily = "Microsoft YaHei";
                this.addChild(this._txtList[i]);
            }
            var txt = this._txtList[i];
            if (arr[i]) {
                var itemInfo = Manager.pool.create(ItemsModelInfo);
                itemInfo.id = i + 1;
                itemInfo.base_id = arr[i].id;
                this._itemInfoList.push(itemInfo);
                goods.updateItemInfo([itemInfo]);
                txt.text = arr[i].name;
                goods.visible = true;
                txt.visible = true;
            }
            else {
                goods.visible = false;
                txt.visible = false;
            }
        }
        this.height = this._txtList[arr.length - 1].y + 35;
    };
    LifeGridListItem.prototype.dispose = function () {
        var _this = this;
        _super.prototype.dispose.call(this);
        this._titleTxt.dispose();
        this._titleTxt = null;
        this._txtList.forEach(function (obj, i) {
            _this.removeChild(obj);
            Manager.pool.push(obj);
        });
        this._txtList = null;
        this._list.forEach(function (obj, i) {
            _this.removeChild(obj);
            Manager.pool.push(obj);
        });
        this._list = null;
        if (this._itemInfoList) {
            for (var _i = 0, _a = this._itemInfoList; _i < _a.length; _i++) {
                var info = _a[_i];
                if (info)
                    Manager.pool.push(info);
                info = null;
            }
            this._itemInfoList = null;
        }
    };
    return LifeGridListItem;
}(ItemRenderer));
//# sourceMappingURL=LifeGridListItem.js.map