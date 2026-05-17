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
 * pzx
 * 命格背包item
 * create 17.12.26
 */
var LifeGridBagItem = /** @class */ (function (_super) {
    __extends(LifeGridBagItem, _super);
    function LifeGridBagItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("lifeGrid/lifegridview", "LifeGridBagItemSkin");
        _this.touchChildren = false;
        _this.touchEnabled = true;
        return _this;
    }
    LifeGridBagItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    LifeGridBagItem.prototype.dataChanged = function () {
        var lifeCvo = this.data;
        var cvo = ItemsCVO.getCvo(lifeCvo.base_id);
        this._goods.setCvo(cvo);
        var name1 = HtmlUtil.addColorTag(cvo.name + " Lv." + lifeCvo.lev, cvo.colorStr);
        HtmlUtil.setTextFlow(this._nameTxt, name1);
        this._cvo = lifeCvo;
        var attvo = Manager.pool.create(AttrVO, lifeCvo.attr);
        var attArr = attvo.attrInfos;
        if (attArr[0]) {
            HtmlUtil.setTextFlow(this._attrTxt0, attArr[0].desc(false, Color.GREEN_STR));
        }
        else {
            this._attrTxt0.text = "";
        }
        if (attArr[1]) {
            HtmlUtil.setTextFlow(this._attrTxt1, attArr[1].desc(false, Color.GREEN_STR));
        }
        else {
            this._attrTxt1.text = "";
        }
        var arr = Manager.model.getItems().lifeGridList;
        var n = 0;
        var m = 0;
        var info;
        for (var i = 1; i < arr.length; i++) {
            if (arr[i]) {
                var attrItemsinfo = arr[i].infoList[0];
                var bagItemCvo = arr[i].cvo;
                var lifeCvo_1 = LifeGridCVO.getInfo(bagItemCvo.id, attrItemsinfo.value);
                var awerattArr = lifeCvo_1.attrVos();
                n = this.getqeual(awerattArr, attArr);
                if (n != 0) {
                    m = n;
                    var aln = awerattArr.length;
                    var bln = attArr.length;
                    if (aln == bln && aln == n) {
                        //(一毛一样的属性组)
                        info = arr[i];
                        break;
                    }
                }
            }
        }
        if (info) {
            if (cvo.quality > info.cvo.quality) {
                this._tuijianImg.visible = true;
                this._yiyouImg.visible = false;
                return;
            }
        }
        Manager.pool.push(attvo);
        this._yiyouImg.visible = !(m == 0);
        this._tuijianImg.visible = false;
    };
    /** 返回i个相同，0表示无相同 */
    LifeGridBagItem.prototype.getqeual = function (value1, value2) {
        var i = 0;
        for (var j = 0; j < value2.length; j++) {
            if (value1[0]) {
                if (value1[0].id == value2[j].id) {
                    i++;
                }
            }
            if (value1[1]) {
                if (value1[0].id == value2[j].id) {
                    i++;
                }
            }
        }
        return i;
    };
    Object.defineProperty(LifeGridBagItem.prototype, "cvo", {
        get: function () {
            return this._cvo;
        },
        enumerable: true,
        configurable: true
    });
    LifeGridBagItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.disposes(this._nameTxt, this._attrTxt0, this._attrTxt1);
        Manager.pool.push(this._goods);
        this._goods = null;
        this._nameTxt = null;
        this._attrTxt0 = null;
        this._attrTxt1 = null;
        this._cvo = null;
        this.removeChild(this._yiyouImg);
        this._yiyouImg = null;
        this.removeChild(this._tuijianImg);
        this._tuijianImg = null;
    };
    return LifeGridBagItem;
}(ItemRenderer));
//# sourceMappingURL=LifeGridBagItem.js.map